import { Product_fourHolesByEnter } from "./assign_product_chilled";

const specialMergeCols = new Set([1, 6, 7, 13]);

export function Product_getOutGroupRules(colKey: any) {
	const col = Number(colKey);
	if (specialMergeCols.has(col)) {
		return [
			{ key: "A", rows: [1, 2, 3, 4, 5, 6, 7], order: "desc" },
			{ key: "B", rows: [9, 10, 11, 12, 13, 14, 15, 16, 17], order: "desc" },
			{ key: "D", rows: [19, 20, 21, 22, 23, 24], order: "asc" },
		];
	}

	return [
		{ key: "A", rows: [1, 2, 3, 4, 5, 6, 7], order: "desc" },
		{ key: "B", rows: [9, 10, 11, 12, 13], order: "asc" },
		{ key: "C", rows: [14, 15, 16, 17], order: "desc" },
		{ key: "D", rows: [19, 20, 21, 22, 23, 24], order: "asc" },
	];
}

function getOutGroupKeyByColAndRow(colKey: any, row: number) {
	const groups = Product_getOutGroupRules(colKey);
	const matched = groups.find(group => group.rows.includes(row));
	return matched?.key;
}

export function sortByOutRules(data: any[], colKey: any) {
	const groups = Product_getOutGroupRules(colKey);
	return data.sort((a: { row__c: number }, b: { row__c: number }) => {
		for (const { rows, order } of groups) {
			const aInGroup = rows.includes(a.row__c);
			const bInGroup = rows.includes(b.row__c);
			if (aInGroup && bInGroup) {
				return order === "asc" ? a.row__c - b.row__c : b.row__c - a.row__c;
			}
		}
		return a.row__c - b.row__c;
	});
}
// 对象结构：   列1-12: {分组ABC: {层123: {Array[6排数据]}}}           寻找是按照列升序寻找的：  2: {B: 3: array[6]}    5: {B: 3: array[6]}    8: {B: 3: array[6]}
async function groupByColGroupLayerProduct(data: any, dictionary: any) {
	// node.warn(data.length);
	let tmp: any = {};
	for (const item of data) {
		const position__c = item.position__c;
		const row = Number(position__c.substring(2, 4));
		const col = Number(position__c.substring(0, 2));
		const lay = Number(position__c.substring(4, 6));
		const groupKey = getOutGroupKeyByColAndRow(col, row);
		if (!groupKey) continue;
		tmp[col] ??= {};
		tmp[col][groupKey] ??= {};
		tmp[col][groupKey][lay] ??= [];
		tmp[col][groupKey][lay].push(item);
	}
	// node.warn(tmp);

	const toDateKey = (value: any) => {
		if (value == null) return Number.POSITIVE_INFINITY;
		const s = String(value).trim();
		if (!s) return Number.POSITIVE_INFINITY;
		const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
		if (!m) return Number.POSITIVE_INFINITY;
		const y = Number(m[1]);
		const mo = Number(m[2]);
		const d = Number(m[3]);
		if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) {
			return Number.POSITIVE_INFINITY;
		}
		return y * 10000 + mo * 100 + d;
	};

	const indexToAlphaKey = (index: number) => {
		let n = index + 1;
		let s = "";
		while (n > 0) {
			n -= 1;
			s = String.fromCharCode(65 + (n % 26)) + s;
			n = Math.floor(n / 26);
		}
		return s;
	};

	const getArrayMeta = (arr: any[]) => {
		const first = Array.isArray(arr) ? arr[0] : null;
		const productionDate = first?.production_date__c ?? null;
		const groupId = first?.group_id__c ?? null;
		const position = first?.position__c ?? null;
		return {
			dateKey: toDateKey(productionDate),
			productionDate: productionDate == null ? "" : String(productionDate),
			groupId: groupId == null ? "" : String(groupId),
			position: position == null ? "" : String(position),
		};
	};

	// 把 obj 的 “第三层数组” 当成一个整体单元，不拆分。
	// 然后按每个数组的 production_date__c 升序排序，排序后依次命名为 A、B、C、D...(可扩展到 AA/AB...)
	const buildAlphaObjectFromLeafArrays = (input: { [s: string]: unknown } | ArrayLike<unknown>, order = "asc") => {
		const dir = order === "desc" ? -1 : 1;
		const arrays = [];
		if (!input || typeof input !== "object") return {};

		for (const groupObj of Object.values(input)) {
			if (!groupObj || typeof groupObj !== "object") continue;
			for (const layerObj of Object.values(groupObj)) {
				if (!layerObj || typeof layerObj !== "object") continue;
				for (const arr of Object.values(layerObj)) {
					if (!Array.isArray(arr) || arr.length === 0) continue;
					arrays.push(arr);
				}
			}
		}

		const sorted = arrays
			.map(arr => ({ arr, meta: getArrayMeta(arr) }))
			.sort((a, b) => {
				if (a.meta.dateKey !== b.meta.dateKey) {
					return a.meta.dateKey < b.meta.dateKey ? -1 * dir : 1 * dir;
				}
				if (a.meta.groupId !== b.meta.groupId) {
					return a.meta.groupId.localeCompare(b.meta.groupId);
				}
				return a.meta.position.localeCompare(b.meta.position);
			});

		const out: any = {};
		// node.warn(sorted);
		for (let i = 0; i < sorted.length; i += 1) {
			out[indexToAlphaKey(i)] = sorted[i].arr;
			// out[indexToAlphaKey(i)] = sorted[i].arr.map(v => v.production_date__c);
		}
		return out;
	};

	const groupedObj = buildAlphaObjectFromLeafArrays(tmp, "asc");

	return groupedObj;
}

export async function OutWarehouse(db: any, fDocs: any, outTotalQuantity: number, stockDetailTable: string) {
	if (!fDocs || !fDocs.length) return { success: false, message: `查询错误：在库存中未找到匹配的物料` };
	// node.warn(fDocs);

	//*  计算库存中 寻找相同物料的当前数量 累加
	const stockQuantity = fDocs.reduce((sum: any, item: { weight__c: any }) => {
		return Math.round((sum + Number( item.weight__c)) * 1000) / 1000;
		// sum + (item.weight__c || 0)
	}, 0);

	if (outTotalQuantity <= stockQuantity) {
		// const groupByColGroupLayerProduct = flow.get("groupByColGroupLayerProduct")
		// console.log('fDocs', fDocs);
		const grouped = await groupByColGroupLayerProduct(fDocs, "out_find_materials");
		// console.log('grouped', grouped);

		// return { success: false, message: `查询错误：根据出库重量，查询 库存不足，没有足够的重量进行出库！+++++++` };

		let outStockQuantity = outTotalQuantity;
		let finiallyArr = [];

		for (const key in grouped) {
			if (grouped.hasOwnProperty(key)) {
				const sameGroupData = grouped[key];
				const currentCol = sameGroupData[0]?.col__c;
				const dataSort = sortByOutRules(sameGroupData, currentCol);
				if (dataSort.length) {
					for (const item of dataSort) {
						if (outStockQuantity <= item.weight__c) {
							// 要出库的数量 <= 托盘上的物料总数量
							// 更新库存
							// 并且是半托回库num.toFixed(3);
							const finialWeight = Number((Math.round((item.weight__c - outStockQuantity) * 1000) / 1000).toFixed(3));
							finiallyArr.push({ ...item, final_weight__c: finialWeight, stock_status__c: "正在出库" });
							const suplt = Number((Math.round((stockQuantity - outStockQuantity) * 1000) / 1000).toFixed(3));
							// node.warn(`库存总数量：${stockQuantity}, 出库数量：${outTotalQuantity}, 剩余库存数量：${suplt}, 选择托盘数量：${finiallyArr.length}`);

							await db.updateOne(stockDetailTable, item._id, { final_weight__c: finialWeight, stock_status__c: "正在出库" });

							return { success: true, data: finiallyArr, message: "查找成功" };
						} else {
							outStockQuantity = Number((Math.round((outStockQuantity - item.weight__c) * 1000) / 1000).toFixed(3));
							finiallyArr.push({ ...item, final_weight__c: 0, stock_status__c: "正在出库" });

							await db.updateOne(stockDetailTable, item._id, { final_weight__c: 0, stock_status__c: "正在出库" });
						}
					}
				}
			}
		}
	} else {
		return { success: false, message: `查询错误：根据出库重量，查询 库存不足，没有足够的重量进行出库！` };
	}
}

// 出库描述
// 这个文件中，我先描述现在的写法，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有不同的地方是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配 入库分配是这样。  但是目前是出库，需求根据传递的数据进行出库，出库是1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。但是1列、6列、7列、13列的9到17排，需要改成9到17排为一组。帮我优化下代码。

// 出库下发WCS描述
// 这个文件中，我先描述规则是什么样的，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有不同的地方是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配 入库分配是这样。  但是目前是出库下发WCS任务，需求根据传递的数据进行出库，出库是1到7排为一组降序发送，9到13排为一组升序发送，14到17排为一组降序发送，19到24排为一组升序发送。但是1列、6列、7列、13列的9到17排，需要改成9到17排为一组并且降序发送任务。其他列还是按照原来的，帮我优化下代码。

// 移库
export async function handle_Move_Product(db: any, start_stockD: any[], start_quantity: number, dest_group: any, dest_column: number, Table_Stock_Name: string) {
	// if (!start_stockD || !start_stockD.length) return { success: false, message: `查询错误：在库存中未找到匹配的物料` };
	// node.warn(fDocs);

	const grouped = await groupByColGroupLayerProduct(start_stockD, "out_find_materials");

	// 出库找到数组并返回、入库也需要找到哪些数组，找到最内侧的位置并标记为预占用

	let k = 0;
	for (const key in grouped) {
		if (grouped.hasOwnProperty(key)) {
			const sameGroupData = grouped[key];
			const currentCol = sameGroupData[0]?.col__c;
			const dataSort = sortByOutRules(sameGroupData, currentCol);

			if (dataSort.length) {
				for (const element of dataSort) { 
					if (k == 0) {
						// 判断起始位置的物料字段 是否 与目标物料字段一致
						const dest_stockD_Info = await db.find(Table_Stock_Name, { query: { group_id__c: dest_group, shelf_status__c: "占用" } }); // 目标组
						if (dest_stockD_Info.length) {
							const compareFields = [
								{ key: "material_code__c", label: "物料代码" },
								{ key: "production_date__c", label: "生产日期" },
								// { key: "contract__c", label: "合同号" },
								{ key: "batch__c", label: "批号" },
								// { key: "is_tax__c", label: "是否保税" },
							];
							const normalizeValue = (value: any) => (value == null ? "" : String(value).trim());
							const inconsistentFields = compareFields.filter(({ key }) => {
								const values = [element, ...dest_stockD_Info].map(item => normalizeValue(item?.[key]));
								return new Set(values).size > 1;
							});
							if (inconsistentFields.length) {
								return { success: false, message: `起始组与目标组物料字段不一致：${inconsistentFields.map(item => item.label).join("、")}！` };
							}
						}
					}
				}
			}
		}
	}

	let n = 0;
	let finiallyArr: any = [];
	// 开始位置、目标位置、托盘号、开始组号、目标组号
	for (const key in grouped) {
		if (grouped.hasOwnProperty(key)) {
			const sameGroupData = grouped[key];
			const currentCol = sameGroupData[0]?.col__c;
			const dataSort = sortByOutRules(sameGroupData, currentCol);

			// console.log("start_quantity", start_quantity);
			if (dataSort.length) {
				for (const element of dataSort) {
					n++;
					// console.log(n);
					if (n == start_quantity) {
						const dest_stock = await db.find(Table_Stock_Name, { query: { group_id__c: dest_group, shelf_status__c: "空闲" } });
						console.log("dest_stock", dest_stock);
						if (dest_stock.length) {
							const fill = Product_fourHolesByEnter(dest_column, 0, dest_stock);
							await db.updateOne(Table_Stock_Name, fill[0]._id, { shelf_status__c: "预占用", pallet__c: element.pallet__c });
							const sk = await db.find(Table_Stock_Name, { query: { position__c: element.position__c, pallet__c: element.pallet__c } });
							if (sk.length) {
								await db.updateOne(Table_Stock_Name, sk[0]._id, { shelf_status__c: "待出库" });
							}
							finiallyArr.push({
								pallet__c: element.pallet__c,
								start_position: element.position__c,
								start_group_id: element.group_id__c,
								start_priority: element.priority__c,
								dest_position: fill[0].position__c,
								dest_group_id: fill[0].group_id__c,
								dest_priority: fill[0].priority__c,
							});
							return { success: true, data: finiallyArr, message: "查找成功" };
						} else {
							console.log("目标组无空闲222");
							return { success: false, message: "处理数据错误！" };
						}
					} else {
						const dest_stock = await db.find(Table_Stock_Name, { query: { group_id__c: dest_group, shelf_status__c: "空闲" } });
						console.log("dest_stock", dest_stock);
						if (dest_stock.length) {
							const fill = Product_fourHolesByEnter(dest_column, 0, dest_stock);
							await db.updateOne(Table_Stock_Name, fill[0]._id, { shelf_status__c: "预占用", pallet__c: element.pallet__c });
							const sk = await db.find(Table_Stock_Name, { query: { position__c: element.position__c, pallet__c: element.pallet__c } });
							if (sk.length) {
								await db.updateOne(Table_Stock_Name, sk[0]._id, { shelf_status__c: "待出库" });
							}
							finiallyArr.push({
								pallet__c: element.pallet__c,
								start_position: element.position__c,
								start_group_id: element.group_id__c,
								start_priority: element.priority__c,
								dest_position: fill[0].position__c,
								dest_group_id: fill[0].group_id__c,
								dest_priority: fill[0].priority__c,
							});
						} else {
							console.log("目标组无空闲");
						}
					}
				}
			}
		}
	}
}
