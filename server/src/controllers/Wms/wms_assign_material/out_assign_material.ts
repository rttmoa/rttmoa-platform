import { fourHolesByEnter } from "./assign_material";

const specialCols = new Set([5, 6, 11, 12]);
const specialCols2 = new Set([14, 16]);

// 原料库：出库寻找物料
export function Material_getOutGroupRules(colKey: any) {
	const col = Number(colKey);
	if (specialCols.has(col)) {
		return [
			{ key: "A", rows: [1, 2, 3, 4, 5], order: "desc" },
			{ key: "B", rows: [7, 8, 9, 10, 11, 12, 13, 14], order: "asc" },
			{ key: "C", rows: [17, 18], order: "desc" },
			{ key: "D", rows: [20, 21, 22, 23, 24, 25], order: "asc" },
		];
	}
	if (specialCols2.has(col)) {
		return [
			{ key: "A", rows: [1, 2, 3, 4, 5], order: "desc" },
			{ key: "B", rows: [7, 8, 9, 10, 11], order: "asc" },
			{ key: "C", rows: [12, 13, 14, 15, 16, 17, 18], order: "desc" },
			{ key: "D", rows: [20, 21, 22, 23, 24, 25], order: "asc" },
		];
	}

	return [
		{ key: "A", rows: [1, 2, 3, 4, 5], order: "desc" },
		{ key: "B", rows: [7, 8, 9, 10, 11, 12], order: "asc" },
		{ key: "C", rows: [13, 14, 15, 16, 17, 18], order: "desc" },
		{ key: "D", rows: [20, 21, 22, 23, 24, 25], order: "asc" },
	];
}

function getOutGroupKeyByColAndRow(colKey: any, row: number) {
	const groups = Material_getOutGroupRules(colKey);
	const matched = groups.find(group => group.rows.includes(row));
	return matched?.key;
}

function getPositionMeta(item: any) {
	const position = String(item?.position__c ?? "");
	const col = Number(item?.col__c ?? position.substring(0, 2));
	const row = Number(item?.row__c ?? position.substring(2, 4));
	const lay = Number(item?.lay__c ?? position.substring(4, 6));
	return { col, row, lay };
}

export function sortByOutRules(data: any[], colKey: any) {
	return data.sort((a: any, b: any) => {
		const aMeta = getPositionMeta(a);
		const bMeta = getPositionMeta(b);
		const groups = Material_getOutGroupRules(colKey ?? aMeta.col ?? bMeta.col);
		for (const { rows, order } of groups) {
			const aInGroup = rows.includes(aMeta.row);
			const bInGroup = rows.includes(bMeta.row);
			if (aInGroup && bInGroup) {
				return order === "asc" ? aMeta.row - bMeta.row : bMeta.row - aMeta.row;
			}
		}
		return aMeta.row - bMeta.row;
	});
}
// 对象结构：   列1-12: {分组ABC: {层123: {Array[6排数据]}}}           寻找是按照列升序寻找的：  2: {B: 3: array[6]}    5: {B: 3: array[6]}    8: {B: 3: array[6]}
async function groupByColGroupLayerProduct(data: any, dictionary: any) {
	// node.warn(data.length);
	let tmp: any = {};
	for (const item of data) {
		const { col, row, lay } = getPositionMeta(item);
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
			const currentCol = getPositionMeta(sorted[i].arr[0]).col;
			out[indexToAlphaKey(i)] = sortByOutRules([...sorted[i].arr], currentCol);
			// out[indexToAlphaKey(i)] = sorted[i].arr.map(v => v.production_date__c);
		}
		return out;
	};

	const groupedObj = buildAlphaObjectFromLeafArrays(tmp, "asc");

	return groupedObj;
}

// *** 出库选择好物料后：更新库存详情表  {stock_status__c: "正在出库"}
// *** 已完成：控制寻找物料时的列顺序： Object.keys(tmp).sort((a, b) => Number(a) - Number(b));
export async function handle_Outgoing_Materials(db: any, fDocs: any[], outTotalQuantity: number) {
	if (!fDocs || !fDocs.length) return { success: false, message: `查询错误：在库存中未找到匹配的物料` };
	// node.warn(fDocs);

	//*  计算库存中 寻找相同物料的当前数量 累加
	const stockQuantity = fDocs.reduce((sum: any, item: { weight__c: any }) => {
		return Math.round((sum + Number(item.weight__c)) * 1000) / 1000;
	}, 0);

	// Math.round((prev + cur.weight__c) * 1000) / 1000

	if (outTotalQuantity <= stockQuantity) {
		// const groupByColGroupLayerProduct = flow.get("groupByColGroupLayerProduct")
		// console.log('fDocs',fDocs);

		const grouped = await groupByColGroupLayerProduct(fDocs, "out_find_materials");
		// console.log('grouped', grouped);

		let outStockQuantity = outTotalQuantity;
		let finiallyArr = [];

		for (const key in grouped) {
			if (grouped.hasOwnProperty(key)) {
				const sameGroupData = grouped[key];
				const currentCol = sameGroupData[0]?.col__c;
				const dataSort = sortByOutRules(sameGroupData, currentCol);
				// const dataSort = sameGroupData
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

							await db.updateOne("hk_mater_stock_detail__c", item._id, { final_weight__c: finialWeight, stock_status__c: "正在出库" });

							return { success: true, data: finiallyArr, message: "查找成功" };
						} else {
							outStockQuantity = Number((Math.round((outStockQuantity - item.weight__c) * 1000) / 1000).toFixed(3));
							finiallyArr.push({ ...item, final_weight__c: 0, stock_status__c: "正在出库" });

							await db.updateOne("hk_mater_stock_detail__c", item._id, { final_weight__c: 0, stock_status__c: "正在出库" });
						}
					}
				}
			}
		}
	} else {
		return { success: false, message: `查询错误：根据出库重量，查询 库存不足，没有足够的重量进行出库！` };
	}
}

// 移库
export async function handle_Move_Materials(db: any, start_stockD: any[], start_quantity: number, dest_group: any, dest_column: number, Table_Stock_Name: string) {
	// if (!start_stockD || !start_stockD.length) return { success: false, message: `查询错误：在库存中未找到匹配的物料` };
	// node.warn(fDocs);

	const grouped = await groupByColGroupLayerProduct(start_stockD, "out_find_materials");

	let k = 0;
	for (const key in grouped) {
		if (grouped.hasOwnProperty(key)) {
			const sameGroupData = grouped[key];
			const currentCol = sameGroupData[0]?.col__c;
			// const dataSort = sortByOutRules(sameGroupData, currentCol);
			const dataSort = sortByOutRules(sameGroupData, currentCol);

			if (dataSort.length) {
				for (const element of dataSort) {
					if (k == 0) {
						const dest_stockD_Info = await db.find(Table_Stock_Name, { query: { group_id__c: dest_group, shelf_status__c: "占用" } }); // 目标组
						if (dest_stockD_Info.length) {
							console.log("dest_stockD_Info", dest_stockD_Info);
							const compareFields = [
								{ key: "material_code__c", label: "物料代码" },
								{ key: "production_date__c", label: "生产日期" },
								{ key: "contract__c", label: "合同号" },
								{ key: "batch__c", label: "批号" },
								{ key: "is_tax__c", label: "是否保税" },
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

	// 出库找到数组并返回、入库也需要找到哪些数组，找到最内侧的位置并标记为预占用

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
							const fill = fourHolesByEnter(dest_column, 0, dest_stock);
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
							const fill = fourHolesByEnter(dest_column, 0, dest_stock);
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

//  这段入库分配代码有问题，这个文件中，我先描述现在的写法，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到17列，1到25排，1到3层，现在入库分配是这样，先分1层一层全部分完二层再分三层，一层中先分一列再分二列一直到17列，1层按照1列分，1到5排为一组，7到12排为一组，13到18排为一组，20到25排为一组。其中先分入库1到5排入库升序，再分7到12排入库降序，再分13到18排入库升序，再分20到25排入库降序。现在的需求是，其他列都是正常分配的，有几列需要单独处理，只是5列、6列、11列、12列的7到18排，需要改成7到14排为一组入库降序，17到18排为一组入库升序分配. 然后14列和16列。7到18排中，是7到11排为一组，入库降序分配，12到18排为一组升序入库分配，上面是入库的分配。 出库反过来出库，其中先查找出库1到5排出库降序，再查找7到12排出库升序，再查找13到18排出库降序，再查找20到25排出库升序。其他列都是正常分配的，有几列需要单独处理，需要处理的列有5列、6列、11列、12列的7到18排，需要改成7到14排为一组出库升序，17到18排为一组出库降序查找. 需要处理的列有14列和16列。7到18排中，是7到11排为一组，出库升序分配，12到18排为一组降序查找。
