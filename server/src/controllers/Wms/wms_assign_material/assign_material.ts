

// 原料库入库：根据从小到大排序、移库也用到
export function fourHolesByEnter(colKey: any, groupKey: any, layerData?: any) {
	// 获取不同 col 和 group 的排序规则
	function getGroupRules(colKey: any, groupKey: any) {
		const specialCols = [5, 6, 11, 12];
		const specialCols2 = [14, 16];
		if (specialCols.includes(Number(colKey))) {
			return [
				{ rows: [1, 2, 3, 4, 5], order: "asc" },
				{ rows: [7, 8, 9, 10, 11, 12, 13, 14], order: "desc" },
				{ rows: [17, 18], order: "asc" },
				{ rows: [20, 21, 22, 23, 24, 25], order: "desc" },
			];
		}
		if (specialCols2.includes(Number(colKey))) {
			return [
				{ rows: [1, 2, 3, 4, 5], order: "asc" },
				{ rows: [7, 8, 9, 10, 11], order: "desc" },
				{ rows: [12, 13, 14, 15, 16, 17, 18], order: "asc" },
				{ rows: [20, 21, 22, 23, 24, 25], order: "desc" },
			];
		}
		// 默认规则
		return [
			{ rows: [1, 2, 3, 4, 5], order: "asc" },
			{ rows: [7, 8, 9, 10, 11, 12], order: "desc" },
			{ rows: [13, 14, 15, 16, 17, 18], order: "asc" },
			{ rows: [20, 21, 22, 23, 24, 25], order: "desc" },
		];
	}
	// 获取排序规则
	const groups = getGroupRules(colKey, groupKey); // 4 B

	//
	//
	// 通用排序函数：根据 groups 排 row__c
	function sortByGroups(data: any[], groups: { rows: number[]; order: string }[]) {
		return data.sort((a: { row__c: number }, b: { row__c: number }) => {
			for (const { rows, order } of groups) {
				if (rows.includes(a.row__c) || rows.includes(b.row__c)) {
					return order === "asc" ? a.row__c - b.row__c : b.row__c - a.row__c;
				}
			}
			return a.row__c - b.row__c;
		});
	}
	// 排序
	const sorted = sortByGroups(layerData, groups); // Array[6] groups
	return sorted;
}

function getGroupKey(col: number, row: number) {
	const specialCols = [5, 6, 11, 12];
	const specialCols2 = [14, 16];
	if (specialCols.includes(Number(col))) {
		if (row >= 1 && row <= 5) return "A";
		if (row >= 7 && row <= 14) return "B";
		if (row >= 17 && row <= 18) return "C";
		if (row >= 20 && row <= 25) return "D";
	} else if (specialCols2.includes(Number(col))) {
		if (row >= 1 && row <= 5) return "A";
		if (row >= 7 && row <= 11) return "B";
		if (row >= 12 && row <= 18) return "C";
		if (row >= 20 && row <= 25) return "D";
	} else {
		if (row >= 1 && row <= 5) return "A";
		if (row >= 7 && row <= 12) return "B";
		if (row >= 13 && row <= 18) return "C";
		if (row >= 20 && row <= 25) return "D";
	}
	return null;
}
// 对象结构：   列1-12: {分组ABC: {层123: {Array[6排数据]}}}           寻找是按照列升序寻找的：  2: {B: 3: array[6]}    5: {B: 3: array[6]}    8: {B: 3: array[6]}
async function groupByColGroupLayer(data: any, dictionary: string) {
	const tmp: any = {};
	// ! 层升序、排升序、列升序（分配从列，同一排 层升序分配）
	// for (const item of data) {
	// 	const groupKey: any = getGroupKey(item.col__c, item.row__c);
	// 	if (!groupKey) continue;
	// 	const col = item.col__c;
	// 	const lay = item.lay__c;
	// 	tmp[col] ??= {};
	// 	tmp[col][groupKey] ??= {};
	// 	tmp[col][groupKey][lay] ??= [];
	// 	tmp[col][groupKey][lay].push(item);
	// }
	// ! 列升序、排升序、层升序（分配从层、同一排 列升序分配）
	// for (const item of data) {
	// 	const groupKey: any = getGroupKey(item.col__c, item.row__c);
	// 	if (!groupKey) continue;
	// 	const col = item.col__c;
	// 	const lay = item.lay__c;
	// 	tmp[lay] ??= {};
	// 	tmp[lay][groupKey] ??= {};
	// 	tmp[lay][groupKey][col] ??= [];
	// 	tmp[lay][groupKey][col].push(item);
	// }
	// ! 排升序、列升序、层升序（分配从层、同一列 排升序分配）
	for (const item of data) {
		const groupKey: any = getGroupKey(item.col__c, item.row__c);
		if (!groupKey) continue;
		const col = item.col__c;
		const lay = item.lay__c;
		tmp[lay] ??= {};
		tmp[lay][col] ??= {};
		tmp[lay][col][groupKey] ??= [];
		tmp[lay][col][groupKey].push(item);
	}
	// return tmp

	// 默认正序： 2、3、5、6、8    【已完成：这里判断出库是按照列升序找还是降序找】
	let orderedCols = [];
	// const mode = await db.find("kd_cwwarm_config_col__c", { query: { dictionary__c: dictionary } })
	// if (mode.length) {
	//     if (mode[0].sort__c == "升序（按照列从小到大排序）") {
	//         orderedCols = Object.keys(tmp).sort((a, b) => Number(a) - Number(b));
	//     } else {
	//         orderedCols = Object.keys(tmp).sort((a, b) => Number(b) - Number(a));
	//     }
	// } else {
	//     orderedCols = Object.keys(tmp).sort((a, b) => Number(a) - Number(b));
	// }
	orderedCols = Object.keys(tmp).sort((a, b) => Number(a) - Number(b));
	const map = new Map();
	for (const col of orderedCols) {
		map.set(Number(col), tmp[col]);
	}
	return map;
}

async function assignEmptyLoc(db: any, height: number, site: string) {
	let isEmpty = false; // 是否有空库位
	let isData = null; // 是否找到了一个分配的库位
	let message = "";
	async function GetStorage() {
		const allStock = await db.find("hk_mater_stock__c", { query: {} }); // 查询 所有货架表
		// node.warn(allStock);

		const layDistribute = await db.find("hk_mater_lay_distribution__c", { query: {} }); // 查询 货位层管理表

		const openLays = layDistribute.filter((v: { open__c: string }) => v.open__c === "开启").map((v: { lay__c: any }) => v.lay__c);
		const stock1 = allStock.filter((v: { lay__c: any }) => openLays.includes(v.lay__c)); // 所有货位中 查出开启的层

		if (stock1.length == 0) {
			message = "用户将分配到一层二层三层货位全部关闭了！！！";
			return { success: false, message };
		}

		// let allStorage = [];
		// if (site == "1005") {
		// 	let product = await db.find("hk_mater_assign__c", { query: { material_type__c: "2" } });
		// 	console.log(product.length);
		// 	if (product && product.length) {
		// 		for (let index = 0; index < product.length; index++) {
		// 			const element = product[index];
		// 			let findStore = stock1.filter((v: any) => {
		// 				let f1 = v.col__c == element.col__c; // 列
		// 				let f3 = v.lay__c >= element.start_lay__c && v.lay__c <= element.target_lay__c;
		// 				let f4 = v.row__c >= element.start_row__c && v.row__c <= element.target_row__c;
		// 				// let f5 = v.shelf_status__c === "空闲";
		// 				return f1 && f3 && f4;
		// 			});
		// 			allStorage.push(...findStore);
		// 		}
		// 	}
		// 	// 货位总数：845， 站点1找到的货位是：326， 站点2找到的货位是：397
		// }
		// let newStock = [];
		// if (Number(height) > 1400) {
		// 	newStock = allStorage.filter((v: any) => v.lay__c != 3);
		// } else {
		// 	newStock = allStorage;
		// }
		// if (newStock.length == 0) {
		// 	message = "根据配置中，货位分配规则没有开启列配置！！！";
		// 	return { success: false, message };
		// }

		// const groupByColGroupLayer = flow.get("groupByColGroupLayer") // 根据哪些排为一组 1-5、7-12、13-18、20-25
		const grouped: any = await groupByColGroupLayer(stock1, "enter_empty");

		// return { success: false, message: "测试中！！！" };

		let ts = 1;
		for (const [layKey, layVal] of grouped) {
			for (const [colKey, colVal] of Object.entries(layVal) as any) {
				for (const [groupKey, layerData] of Object.entries(colVal) as any) {
					const result: any = layerData.filter((v: { shelf_status__c: string }) =>  v.shelf_status__c == "空闲" || v.shelf_status__c == "禁用"); // 寻找货位时：只要货架状态是空闲就可以了
					if (layerData.length == result.length) {
						// node.warn(`${layKey}层 - ${colKey}列 - ${groupKey}组  --  ${layerData.length}个`);

						isEmpty = true;
						// 如果是4列、在B组中： 8、9、10、11.....15、16
						// 如果是4列、在C组中： 18、19.....23、24

						// const fourHolesByEnter = flow.get("fourHolesByEnter");
						// 这里必须传真实列号，特殊列 5/6/11/12/14/16 的分组规则才会生效
						const sorted = fourHolesByEnter(colKey, groupKey, layerData); // 获取的1、2、3、4、5、6、7、8 是升序寻找货位

						if (sorted.length > 0) {
							for (const element of sorted) {
								// console.log(`找到数据位置：${found.loc_name__c}`);
								// node.warn(`找到数据位置：${found.loc_name__c}`);
								if (element.shelf_status__c == "空闲") {
									return element;
								}

								// for (const item of sorted) {
								//   // node.warn(item.loc_name__c);
								// 	console.log(item.loc_name__c);
								// }
								// console.log('("=========================");');
								// // node.warn("=========================");

								// ts++
								// if (ts > 20) {
								//   return
								// }
							}
						}
					}
				}
			}
		}
	}
	const res = await GetStorage();
	if (isEmpty) {
		return { success: true, data: res, message: "找到了一个空库位" };
	} else {
		if (!res?.success) {
			return { success: false, message: message };
		}
		return { success: false, message: "没有空库位了" };
	}
}

async function SortRule01(sortArr: any[], dictionary: any, direction: any) {
	// const config = await db.find("kd_keepwarm_config_col__c", { query: { dictionary__c: dictionary } }) // 列升序降序表，控制列顺序

	// ***** 排序规则：根据列升序、层升序、排寻找为 先找3-8排、再找10-15排、17-20排    |    其他的排序会先找10-15排、再17-20排、再3-8排
	const dataSort = sortArr.sort((a: { col__c: number; lay__c: number; row__c: number }, b: { col__c: number; lay__c: number; row__c: number }) => {
		if (a.col__c !== b.col__c) return a.col__c - b.col__c; // 按Distribution层排序
		if (a.lay__c !== b.lay__c) return a.lay__c - b.lay__c; // 按层排序
		// 按排分组排序
		const specialCols = [5, 6, 11, 12];
		const specialCols2 = [14, 16];
		const getGroup = (col: number, row: number) => {
			if (specialCols.includes(Number(col))) {
				if (row >= 1 && row <= 5) return 1;
				if (row >= 7 && row <= 14) return 2;
				if (row >= 17 && row <= 18) return 3;
				if (row >= 20 && row <= 25) return 4;
			} else if (specialCols2.includes(Number(col))) {
				if (row >= 1 && row <= 5) return 1;
				if (row >= 7 && row <= 11) return 2;
				if (row >= 12 && row <= 18) return 3;
				if (row >= 20 && row <= 25) return 4;
			} else {
				if (row >= 1 && row <= 5) return 1;
				if (row >= 7 && row <= 12) return 2;
				if (row >= 13 && row <= 18) return 3;
				if (row >= 20 && row <= 25) return 4;
			}
			return 0;
		};
		const groupA = getGroup(a.col__c, a.row__c);
		const groupB = getGroup(b.col__c, b.row__c);

		if (groupA !== groupB) return groupA - groupB; // 不在同一组，按组顺序排列

		if (groupA === 1) return b.row__c - a.row__c; // 3-8排为降序：group1 = 1
		if (groupA === 3) return b.row__c - a.row__c; // 3-8排为降序：group1 = 1
		return a.row__c - b.row__c; // 其他组升序
	});
	return dataSort;
}

export const Distribution_Raw_Material = async (params: any, db: any, height: number, site: string) => {
	let findParams = {
		is_tax__c: params.is_tax__c,
		material_code__c: params.material_code__c,
		entry_stock_date__c: params.entry_stock_date__c,
		production_date__c: params.production_date__c,
		contract__c: params.contract__c,
		supplier__c: params.supplier__c,
	};
	// let fdoc = [];
	// if (params?.is_tax__c == "保税") {
	// 	fdoc = await db.find("hk_mater_stock__c", { query: { contract__c: params.contract__c, ...findParams } });
	// } else if (params.is_tax__c == "非保税") {
	// 	fdoc = await db.find("hk_mater_stock__c", { query: { supplier__c: params.supplier__c, ...findParams } });
	// }
	let fdoc = await db.find("hk_mater_stock__c", { query: { ...findParams } });
	console.log("相同物料个数：", fdoc.length);

	if (fdoc.length) {
		console.log("库中有相同的物料");
		let stockSame = await db.find("hk_mater_task__c", {
			query: { ...findParams, instruct_type__c: "出库任务", status__c: "正在执行" },
		});
		// if (params?.is_tax__c == "保税") {
		// 	stockSame = await db.find("hk_mater_task__c", {
		// 		query: { ...findParams, contract__c: params.contract__c, instruct_type__c: "出库任务", status__c: "正在执行" },
		// 	});
		// } else if (params.is_tax__c == "非保税") {
		// 	stockSame = await db.find("hk_mater_task__c", {
		// 		query: { ...findParams, supplier__c: params.supplier__c, instruct_type__c: "出库任务", status__c: "正在执行" },
		// 	});
		// }

		if (stockSame.length) {
			const findEmpty = await assignEmptyLoc(db, height, site);
			return findEmpty;
		}

		async function FindSameMaterial(sameMaterial: any) {
			const dataSort = await SortRule01(sameMaterial, "enter_find_materials", "desc"); // 从外向内找(5、4、3有货、需要找第6排)、所以为降序

			async function FindEmpty(findRow: number, col: number, lay: number) {
				const empty = await db.find("hk_mater_stock__c", {
					query: { row__c: findRow, col__c: col, lay__c: lay }, // 【问题：如果托盘已出库但有库存的：托盘状态可以不用判断、因为重新入库要重新分配货位】
				});
				if (empty.length > 0) {
					const data = empty[0].shelf_status__c;
					return data == "空闲" ? empty[0] : false;
				} else {
					return { _id: "" };
				}
			}
			// ***** 这个循环是处理每列、每层、每排相邻的相同物料是否可以放货  3、4排有货、查找5、6、7、8是否可以放货？？？
			const specialCols = [5, 6, 11, 12];
			const specialCols2 = [14, 16];
			const getRowGroup = (col: number, row: number) => {
				if (specialCols.includes(Number(col))) {
					const rowGroupsSpecial = [
						{ rows: [1, 2, 3, 4, 5], direction: "asc" },
						{ rows: [7, 8, 9, 10, 11, 12, 13, 14], direction: "desc" },
						{ rows: [17, 18], direction: "asc" },
						{ rows: [20, 21, 22, 23, 24, 25], direction: "desc" },
					];
					return rowGroupsSpecial.find(g => g.rows.includes(row));
				} else if (specialCols2.includes(Number(col))) {
					const rowGroupsSpecial2 = [
						{ rows: [1, 2, 3, 4, 5], direction: "asc" },
						{ rows: [7, 8, 9, 10, 11], direction: "desc" },
						{ rows: [12, 13, 14, 15, 16, 17, 18], direction: "asc" },
						{ rows: [20, 21, 22, 23, 24, 25], direction: "desc" },
					];
					return rowGroupsSpecial2.find(g => g.rows.includes(row));
				} else {
					const rowGroupsNormal = [
						{ rows: [1, 2, 3, 4, 5], direction: "asc" },
						{ rows: [7, 8, 9, 10, 11, 12], direction: "desc" },
						{ rows: [13, 14, 15, 16, 17, 18], direction: "asc" },
						{ rows: [20, 21, 22, 23, 24, 25], direction: "desc" },
					];
					return rowGroupsNormal.find(g => g.rows.includes(row));
				}
			};

			for (const item of dataSort) {
				const position = item.position__c;
				const col = +position.substring(0, 2);
				const row = +position.substring(2, 4);
				const lay = +position.substring(4, 6);

				let group = getRowGroup(col, row);
				if (!group) continue;

				const { rows, direction } = group;

				// 同一列、同一层、同一组内如果已经有待出库货位，不能继续贴着相同物料分配，需要重新分配空库位。
				const shelfList = await db.find("hk_mater_stock__c", {
					query: { col__c: col, lay__c: lay, row__c: { $in: rows } },
				});
				const hasOutboundInGroup = Array.isArray(shelfList) && shelfList.some((s: any) => s?.shelf_status__c === "待出库");
				if (hasOutboundInGroup) continue;

				const currentIndex = rows.indexOf(row);
				if (currentIndex === -1) continue;

				// 获取需要检查的“后续排”或“前序排”
				const rowsToCheck = direction === "asc" ? rows.slice(currentIndex + 1) : rows.slice(0, currentIndex).reverse();
				if (!rowsToCheck.length) continue;

				const results = await Promise.all(rowsToCheck.map(r => FindEmpty(r, col, lay))); // 并发检查所有空闲情况

				// 如果都空闲（每个 FindEmpty 返回非 false）
				if (results.every(Boolean)) {
					if (results.length) {
						// 判断_id是原因是：因为有的库位有空缺，比如 7,8,9,10,11,12.    7,8没有的情况下
						if (results[0]?._id) {
							// 找到的肯定是同层的，那么判断层是否开启就可以了
							let stockSame = await db.find("hk_mater_lay_distribution__c", { query: { lay__c: results[0].lay__c, open__c: "开启" } });
							if (stockSame.length) {
								return { success: true, data: results[0] }; // 3/4/5/6/7/8     10/11/12/13/14/15  17/18/19/20
							}
						}
					}
				}
			}
		}

		const result = await FindSameMaterial(fdoc);
		// node.warn(`res: ${result}`); // 如果未找到那就是 undefined
		if (result) {
			return result;
		} else {
			// 如果有相同物料、但是都不 可以分配到一起、那么需要分配一个新库位才可以
			const findEmpty = await assignEmptyLoc(db, height, site);
			return findEmpty;
		}
	} else {
		// node.warn("库中没有相同的物料和批次");
		console.log("库中没有相同的物料和批次", "库中没有相同的物料和批次");
		const findEmpty = await assignEmptyLoc(db, height, site);
		return findEmpty;
	}
};

//  这段入库分配代码有问题，这个文件中，我先描述现在的写法，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到17列，1到25排，1到3层，现在入库分配是这样，先分1层一层全部分完二层再分三层，一层中先分一列再分二列一直到17列，1层按照1列分，1到5排为一组，7到12排为一组，13到18排为一组，20到25排为一组。其中先分入库1到5排入库升序，再分7到12排入库降序，再分13到18排入库升序，再分20到25排入库降序。现在的需求是，其他列都是正常分配的，有几列需要单独处理，只是5列、6列、11列、12列的7到18排，需要改成7到14排为一组入库降序，17到18排为一组入库升序分配. 然后14列和16列。7到18排中，是7到11排为一组，入库降序分配，12到18排为一组升序入库分配。
