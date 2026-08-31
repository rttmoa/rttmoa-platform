const specialMergeCols = new Set([1, 6, 7, 13]);

function getEnterGroupRules(colKey: any) {
	const col = Number(colKey);
	// console.log('col', col);
	// console.log('specialMergeCols.has(col)', specialMergeCols.has(col));
	if (specialMergeCols.has(col)) {
		return [
			{ key: "A", rows: [1, 2, 3, 4, 5, 6, 7], order: "asc" },
			{ key: "B", rows: [9, 10, 11, 12, 13, 14, 15, 16, 17], order: "asc" },
			{ key: "D", rows: [19, 20, 21, 22, 23, 24], order: "desc" },
		];
	}

	return [
		{ key: "A", rows: [1, 2, 3, 4, 5, 6, 7], order: "asc" },
		{ key: "B", rows: [9, 10, 11, 12, 13], order: "desc" },
		{ key: "C", rows: [14, 15, 16, 17], order: "asc" },
		{ key: "D", rows: [19, 20, 21, 22, 23, 24], order: "desc" },
	];
}

function getGroupKeyByColAndRow(colKey: any, row: number) {
	const groups = getEnterGroupRules(colKey);
	const matched = groups.find(group => group.rows.includes(row));
	return matched?.key;
}

function fourHolesByEnter(colKey: any, groupKey: any, layerData?: any) {
	// 获取排序规则
	const groups = getEnterGroupRules(colKey); // 4 B

	//
	// 通用排序函数：根据 groups 排 row__c
	function sortByGroups(data: any[], groups: { key: string; rows: number[]; order: string }[]) {
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
// 对象结构：   列1-12: {分组ABC: {层123: {Array[6排数据]}}}           寻找是按照列升序寻找的：  2: {B: 3: array[6]}    5: {B: 3: array[6]}    8: {B: 3: array[6]}
async function groupByColGroupLayer(data: any, dictionary: string) {
	const tmp: any = {};
	// ! 层升序、排升序、列升序（分配从列，同一排 层升序分配）
	// for (const item of data) {
	// 	const groupKey: any = groupMap[item.row__c];
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
	// 	const groupKey: any = groupMap[item.row__c];
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
		const groupKey: any = getGroupKeyByColAndRow(item.col__c, item.row__c);
		if (!groupKey) continue;
		const col = item.col__c;
		const lay = item.lay__c;
		tmp[lay] ??= {};
		tmp[lay][col] ??= {};
		tmp[lay][col][groupKey] ??= [];
		tmp[lay][col][groupKey].push(item);
	}
	// console.log('tmp', tmp);
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
		const allStock = await db.find("hk_freezing_stock__c", { query: {} }); // 查询 所有货架表
		// node.warn(allStock);

		const layDistribute = await db.find("hk_freezing_lay_distribution__c", { query: {} }); // 查询 货位层管理表

		const openLays = layDistribute.filter((v: { open__c: string }) => v.open__c === "开启").map((v: { lay__c: any }) => v.lay__c);
		const stock1 = allStock.filter((v: { lay__c: any }) => openLays.includes(v.lay__c)); // 所有货位中 查出开启的层

		if (stock1.length == 0) {
			message = "用户将分配到一层二层三层货位全部关闭了！！！";
			return { success: false, message };
		}

		let allStorage = [];
		let product = await db.find("hk_freezing_assign__c", { query: {} });
		console.log(product.length);
		if (product && product.length) {
			for (let index = 0; index < product.length; index++) {
				const element = product[index];
				let findStore = stock1.filter((v: any) => {
					let f1 = v.col__c == element.col__c; // 列
					let f3 = v.lay__c >= element.start_lay__c && v.lay__c <= element.target_lay__c;
					let f4 = v.row__c >= element.start_row__c && v.row__c <= element.target_row__c;
					// let f5 = v.shelf_status__c === "空闲";
					return f1 && f3 && f4;
				});
				allStorage.push(...findStore);
			}
		}

		console.log('"处理后的货位总数："', allStorage.length);
		if (allStorage.length == 0) {
			message = "根据配置中，货位分配规则没有开启列配置！！！";
			return { success: false, message };
		}
		// console.log('newStock', newStock.length);
		// const groupByColGroupLayer = flow.get("groupByColGroupLayer") // 根据哪些排为一组 1-5、7-12、13-18、20-25
		const grouped: any = await groupByColGroupLayer(allStorage, "enter_empty");
		// console.log("grouped", grouped);
		// return { success: false, message: "测试中！！！" };

		let ts = 1;
		for (const [layKey, colsVal] of grouped) {
			for (const [colKey, groupsVal] of Object.entries(colsVal) as any) {
				for (const [groupKey, layerData] of Object.entries(groupsVal) as any) {
					const result: any = layerData.filter((v: { shelf_status__c: string }) => v.shelf_status__c == "空闲" || v.shelf_status__c == "禁用"); // 寻找货位时：只要货架状态是空闲就可以了
					// console.log("`$", `${colKey}列 - ${groupKey}组 - ${layKey}层  --  ${layerData.length}个`);
					if (layerData.length == result.length) {
						// node.warn(`${colKey}列 - ${groupKey}组 - ${layKey}层  --  ${layerData.length}个`);
						console.log("object", `${colKey}列 - ${groupKey}组 - ${layKey}层  --  ${layerData.length}个`);
						isEmpty = true;
						// 如果是4列、在B组中： 8、9、10、11.....15、16
						// 如果是4列、在C组中： 18、19.....23、24

						// const fourHolesByEnter = flow.get("fourHolesByEnter");
						const sorted = fourHolesByEnter(Number(colKey), groupKey, layerData); // 获取的1、2、3、4、5、6、7、8 是升序寻找货位
						console.log("sorted", sorted[0]);

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
	const res: any = await GetStorage();
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
		const group1 = [1, 2, 3, 4, 5, 6, 7];
		const group2 = [9, 10, 11, 12, 13];
		const group3 = [14, 15, 16, 17];
		const group4 = [19, 20, 21, 22, 23, 24];

		const getGroup = (row: number) => {
			if (group1.includes(row)) return 1;
			if (group2.includes(row)) return 2;
			if (group3.includes(row)) return 3;
			if (group4.includes(row)) return 4;
			return 0;
		};
		const groupA = getGroup(a.row__c);
		const groupB = getGroup(b.row__c);

		if (groupA !== groupB) return groupA - groupB; // 不在同一组，按组顺序排列

		if (groupA === 1) return b.row__c - a.row__c; // 3-8排为降序：group1 = 1
		if (groupA === 3) return b.row__c - a.row__c; // 3-8排为降序：group1 = 1
		return a.row__c - b.row__c; // 其他组升序
	});
	return dataSort;
}

export const Distribution_Raw_Product_Freezing = async (params: any, db: any, height: number, site: string) => {
	// console.log("Params", params);

	let fdoc = await db.find("hk_freezing_stock__c", { query: { material_code__c: params.material_code__c, material_name__c: params.material_name__c, production_date__c: params.production_date__c } });
	console.log("相同物料个数：", fdoc.length);

	if (fdoc.length) {
		let stockSame = await db.find("hk_product_task__c", {
			query: { material_name__c: params.material_name__c, material_code__c: params.material_code__c, production_date__c: params.production_date__c, instruct_type__c: "出库任务", status__c: "正在执行" },
		});

		if (stockSame.length) {
			console.log("库中有正常出库的 相同的物料");
			const findEmpty = await assignEmptyLoc(db, height, site);
			return findEmpty;
		}

		async function FindSameMaterial(sameMaterial: any) {
			const dataSort = await SortRule01(sameMaterial, "enter_find_materials", "desc"); // 从外向内找(5、4、3有货、需要找第6排)、所以为降序

			function isSameMaterial(shelf: any) {
				return shelf?.material_code__c === params.material_code__c && shelf?.material_name__c === params.material_name__c && shelf?.production_date__c === params.production_date__c;
			}

			// ***** 这个循环是处理每列、每层、每排相邻的相同物料是否可以放货
			// 相同物料只能继续往当前组入库方向的外侧分配：
			// 升序组：已有相同物料后面一排是空闲才可分配，不能分配到已有物料前面/中间。
			// 降序组：已有相同物料后面一排是空闲才可分配，不能分配到已有物料前面/中间。
			for (const item of dataSort) {
				const position = item.position__c;
				// console.log("position", position);
				const col = +position.substring(0, 2);
				const row = +position.substring(2, 4);
				const lay = +position.substring(4, 6);

				const groups = getEnterGroupRules(col);
				const group = groups.find(g => g.rows.includes(row));
				if (!group) continue;

				const orderedRows = group.order === "asc" ? [...group.rows] : [...group.rows].slice().reverse();
				const shelfList = await db.find("hk_freezing_stock__c", {
					query: { col__c: col, lay__c: lay, row__c: { $in: orderedRows } },
				});
				if (!Array.isArray(shelfList) || shelfList.length === 0) continue;

				const shelfByRow = new Map<number, any>();
				for (const s of shelfList) {
					shelfByRow.set(Number(s.row__c), s);
				}

				// 同一列、同一层、同一组内如果已经有待出库货位，不能继续贴着相同物料分配，避免入库占用这组库位。
				const hasOutboundInGroup = shelfList.some((s: any) => s?.shelf_status__c === "待出库");
				if (hasOutboundInGroup) continue;

				const sameMaterialIndexes = orderedRows.map((r, index) => (isSameMaterial(shelfByRow.get(r)) ? index : -1)).filter(index => index >= 0);
				if (!sameMaterialIndexes.length) continue;
				const outermostSameMaterialIndex = Math.max(...sameMaterialIndexes);
				const found = shelfByRow.get(orderedRows[outermostSameMaterialIndex + 1]);

				if (found?._id && found?.shelf_status__c === "空闲") {
					let stockSame = await db.find("hk_freezing_lay_distribution__c", { query: { lay__c: found.lay__c, open__c: "开启" } });
					if (stockSame.length) {
						return { success: true, data: found };
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

// 库位分配问题：
// 这个文件中，我先描述现在的写法，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。现在的需求是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配，上面修改的是没问题的，但是除了1,6,7,13列，其他列9-13排分配有问题，现在分配是先分到9排，后面有相同物料分到13,12,11,10，应该是一组空库位先分配13再12,11,10,9这样才对，

// 库位分配：相同物料如果最外侧有物料，不可分配到里面了
// 这个文件中，我先描述现在的写法，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有几个列需要特殊处理，代码已经优化过了   现在的需求是，相同物料如果最外侧有物料，不可分配到里面了，我给你相同物料的数组你来看一下[{"_id":"69eae2866aee677de98d381b","time__c":"2026/05/29 15:17:32","loc_name__c":"1列 - 15排 - 3层","position__c":"011503","location__c":"011503","row__c":15,"col__c":1,"lay__c":3,"shelf_status__c":"空闲","pallet__c":"","pallet_status__c":"空闲","pallet_use__c":"","material_code__c":"","material_name__c":"","production_date__c":"","space":"61c51b8f4cada30031994f3d","created_by":"63dc7de4902db72a48e718f2","owner":"63dc7de4902db72a48e718f2","created":"2026-04-24T03:24:54.956Z","group_id__c":"GROUP_138","lastModified":"2026-05-29T07:17:32.513Z","priority__c":7,"batch__c":"","modified":"2026-05-29T07:46:29.403Z","modified_by":"63dc7de4902db72a48e718f2"},{"_id":"69eae2866aee677de98d3819","time__c":"2026/05/29 15:16:53","loc_name__c":"1列 - 7排 - 3层","position__c":"010703","location__c":"010703","row__c":7,"col__c":1,"lay__c":3,"shelf_status__c":"空闲","pallet__c":"","pallet_status__c":"空闲","pallet_use__c":"","material_code__c":"","material_name__c":"","production_date__c":"","space":"61c51b8f4cada30031994f3d","created_by":"63dc7de4902db72a48e718f2","owner":"63dc7de4902db72a48e718f2","created":"2026-04-24T03:24:54.954Z","group_id__c":"GROUP_137","lastModified":"2026-05-29T07:16:53.400Z","priority__c":7,"batch__c":"","modified":"2026-05-29T07:46:29.827Z","modified_by":"63dc7de4902db72a48e718f2"},{"_id":"69eae2866aee677de98d3818","time__c":"2026/05/26 00:10:12","loc_name__c":"1列 - 6排 - 3层","position__c":"010603","location__c":"010603","row__c":6,"col__c":1,"lay__c":3,"shelf_status__c":"占用","pallet__c":"CP7625090550","pallet_status__c":"在库","pallet_use__c":"","material_code__c":"16988","material_name__c":"海南夫妻肺片牛百叶","production_date__c":"2026-05-25","space":"61c51b8f4cada30031994f3d","created_by":"63dc7de4902db72a48e718f2","owner":"63dc7de4902db72a48e718f2","created":"2026-04-24T03:24:54.953Z","group_id__c":"GROUP_137","lastModified":"2026-05-25T16:10:12.064Z","priority__c":6,"batch__c":"2605250001","modified":"2026-05-20T07:50:36.747Z","modified_by":"63dc7de4902db72a48e718f2"},{"_id":"69eae2866aee677de98d381a","time__c":"2026/05/25 21:14:40","loc_name__c":"1列 - 14排 - 3层","position__c":"011403","location__c":"011403","row__c":14,"col__c":1,"lay__c":3,"shelf_status__c":"占用","pallet__c":"CP7625090367","pallet_status__c":"在库","pallet_use__c":"","material_code__c":"16988","material_name__c":"海南夫妻肺片牛百叶","production_date__c":"2026-05-25","space":"61c51b8f4cada30031994f3d","created_by":"63dc7de4902db72a48e718f2","owner":"63dc7de4902db72a48e718f2","created":"2026-04-24T03:24:54.955Z","group_id__c":"GROUP_138","lastModified":"2026-05-25T13:14:40.190Z","priority__c":6,"batch__c":"2605250001","modified":"2026-05-20T07:52:43.082Z","modified_by":"63dc7de4902db72a48e718f2"},{"_id":"69eae2866aee677de98d381d","time__c":"2026/05/25 22:20:24","loc_name__c":"1列 - 17排 - 3层","position__c":"011703","location__c":"011703","row__c":17,"col__c":1,"lay__c":3,"shelf_status__c":"占用","pallet__c":"CP7625090356","pallet_status__c":"在库","pallet_use__c":"","material_code__c":"16988","material_name__c":"海南夫妻肺片牛百叶","production_date__c":"2026-05-25","space":"61c51b8f4cada30031994f3d","created_by":"63dc7de4902db72a48e718f2","owner":"63dc7de4902db72a48e718f2","created":"2026-04-24T03:24:54.959Z","group_id__c":"GROUP_138","lastModified":"2026-05-25T14:20:24.894Z","priority__c":9,"batch__c":"2605250001"},{"_id":"69eae2866aee677de98d381c","time__c":"2026/05/25 21:57:42","loc_name__c":"1列 - 16排 - 3层","position__c":"011603","location__c":"011603","row__c":16,"col__c":1,"lay__c":3,"shelf_status__c":"占用","pallet__c":"CP7625090772","pallet_status__c":"在库","pallet_use__c":"","material_code__c":"16988","material_name__c":"海南夫妻肺片牛百叶","production_date__c":"2026-05-25","space":"61c51b8f4cada30031994f3d","created_by":"63dc7de4902db72a48e718f2","owner":"63dc7de4902db72a48e718f2","created":"2026-04-24T03:24:54.958Z","group_id__c":"GROUP_138","lastModified":"2026-05-25T13:57:42.919Z","priority__c":8,"batch__c":"2605250001"}]
