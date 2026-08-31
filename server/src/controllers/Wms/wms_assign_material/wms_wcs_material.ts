import { Context } from "koa";
import Basic from "../../basic";
import _ from "lodash";
import { time } from "@/src/utils";
import { Distribution_Raw_Material } from "./assign_material";
import { handle_Outgoing_Materials } from "./out_assign_material";

const t = time;
class App extends Basic {
	constructor() {
		super();
	}

	static async writeInterfaceReceive(ctx: Context, insInfo: any) {
		const Record = async (obj: any) => await ctx.mongo.insertOne("hk_mater_interface_record__c", { ...insInfo, ...obj });
		const UpdateRecord = async (id: string, obj: any) => await ctx.mongo.updateOne("hk_mater_interface_record__c", id, { ...obj });
		const ErrorInfo = async (obj: any) => await ctx.mongo.insertOne("hk_mater_interface_record__c", { ...insInfo, ...obj });
		return { Record, UpdateRecord, ErrorInfo };
	}
	// const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
	// const interfaceId = await Record({ desc__c: "WCS入库申请上报托盘号" });
	// await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });

	receive_wcs_raw_material = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const insInfo = {
			time__c: time(),
			interface_name__c: "原料库入库申请",
			params__c: `${data?.pallet} , ${data?.site}`,
			desc__c: "", // 描述

			error_info__c: "", // 失败原因
		};
		let msg = "";
		const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
		const interfaceId = await Record({ desc__c: "WCS入库申请上报托盘号" });

		if (data?.pallet && data?.site) {
			let tt = { time__c: time() };

			let Pallet = data?.pallet;

			let Name = "原料库";
			let stockName = "hk_mater_stock__c";
			let stockDetailName = "hk_mater_stock_detail__c";

			const stock = await db.find(stockName, { query: { pallet__c: Pallet } });
			if (stock.length > 0) {
				let results = { success: false, message: `此托盘号在${Name}货架表中存在数据：托盘未出库，货架状态为：${stock[0].shelf_status__c}` };
				await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
				return ctx.send(results);
			}
			const stockDetail = await db.find(stockDetailName, { query: { pallet__c: Pallet, stock_status__c: { $in: ["盘点（已出库）", "已出库（有库存）"] } } });
			if (stockDetail.length == 1) {
				let status = "";
				const element = stockDetail[0];
				if (element.stock_status__c == "盘点（已出库）") {
					status = "盘点回库";
				} else if (element.stock_status__c == "已出库（有库存）") {
					status = "半托回库";
				}
				if (status) {
					const Instruction = `2${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
					let params = {
						time__c: time(),
						is_tax__c: element?.is_tax__c, // ! 国内外:  国外（入库日期、合同号、物料代码、生产日期）  | 国内（入库日期、物料代码、生产日期、供应商）
						contract__c: element.contract__c,
						material_code__c: element.material_code__c,
						entry_stock_date__c: element.entry_stock_date__c, // element.entry_stock_date__c, 入库日期为今天的日期
						supplier__c: element.supplier__c,
						production_date__c: element.production_date__c,
						pallet__c: Pallet,

						material_name__c: element.material_name__c,
						batch__c: element.batch__c,

						enter_quantity__c: element.quantity,
						weight__c: element.weight,
						cabinet__c: element.cabinet__c,
						cmdtype__c: "入库任务",
						instruction__c: Instruction,
						taskno__c: Instruction,
						height: data?.height, // 高度
						doc_instruction__c: "", // 单据指令号
					};

					let res = await Distribution_Raw_Material(params, db, data?.height, data?.site); // 只按照批次去分配库位
					if (res?.success) {
						const position = res?.data?.position__c;
						const fDocs = await db.find(stockName, { query: { position__c: position } });
						const Stock = fDocs[0];

						await db.updateOne(stockDetailName, stockDetail[0]._id, { stock_status__c: "正在入库" });

						await db.updateOne(stockName, Stock._id, {
							time__c: time(),
							shelf_status__c: "预占用",
							pallet__c: Pallet,
							is_tax__c: params?.is_tax__c,
							material_code__c: params.material_code__c, // 物料代码
							material_name__c: params.material_name__c, // 物料名称
							entry_stock_date__c: params.entry_stock_date__c, // 入库日期
							production_date__c: params.production_date__c, // 生产日期
							contract__c: params.contract__c, // 合同号
							supplier__c: params.supplier__c, // 供应商
							cabinet__c: params.cabinet__c, // 柜号
							batch__c: params.batch__c, // 批次
						});

						await db.insertOne("hk_mater_task__c", {
							...tt,
							loc_start__c: "xxx",
							loc_dest__c: Stock.position__c,
							status__c: "正在执行",
							group_id__c: Stock.group_id__c,
							priority__c: Stock.priority__c,
							...params,
							// area__c: params.area__c, // 库区
							instruct_origin__c: "上位自动",
							cmdtype__c: "入库任务", // 半托回库、盘点回库
							task_type__c: status, // 半托回库、盘点回库
							send_wcs__c: "已下发WCS",
						});
						await db.insertOne("hk_mater_wcs_task__c", {
							...tt,
							loc_start__c: "xxx",
							loc_dest__c: Stock.position__c,
							group_id__c: Stock.group_id__c,
							priority__c: Stock.priority__c,
							...params,
							// area__c: params.area__c, // 库区
							status__c: "已下发WCS",
							instruct_origin__c: "上位自动",
							cmdtype__c: "入库任务", // 半托回库、盘点回库
							task_type__c: status, // 半托回库、盘点回库
							send_wcs__c: "已下发WCS",
						});

						await UpdateRecord(interfaceId, { status__c: "成功", success_info__c: `WCS入库申请，【${Name}库】WMS返回托盘数据 ${JSON.stringify({ pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction })}` });

						return ctx.send({
							success: true,
							message: `处理完成：库位分配成功  托盘号：${Pallet}`,
							data: { pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction, area__c: Name },
						});
					} else {
						let results = { success: false, message: "分配错误：没有空库位了" };
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					}
				} else {
					let results = { success: false, message: `此托盘号在${Name}库存详情表表中货位状态为：${element.stock_status__c}, 托盘未出库！` };
					await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
					return ctx.send(results);
				}
			} else if (stockDetail.length > 1) {
				let results = { success: false, message: `此托盘号在${Name}库存详情表表中库存错误，有多条托盘记录！` };
				await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
				return ctx.send(results);
			} else {
				// 在这里判断是国内的还是国外的、国外的分配逻辑 、国内的一套分配逻辑
				// 查询收货表，如果存在托盘数据，那么直接更新收货的数据，分配库位
				const palletData = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: data?.pallet }, sort: { time__c: -1 } });
				if (palletData.length) {
					const docDetail = await db.find("hk_mater_doc_detail__c", { query: { doc_instruction__c: palletData[0].doc_instruction__c, status__c: "正在执行" } });
					if (docDetail.length == 0) {
						let msg = "查询数据错误：根据PDA收货表中单据指令号未未找到【正在执行】单据任务！";
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: msg });
						let results = { success: false, message: msg };
						return ctx.send(results);
					}

					const element = docDetail[0];

					const Pallet = data.pallet || Math.floor(1e9 + Math.random() * 9e9).toString(); // ! 测试用。先关掉
					// const Pallet = Math.floor(1e9 + Math.random() * 9e9).toString(); // ! 测试用。先关掉
					const Instruction = `2${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
					const today = new Date();
					const today_date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
					let params = {
						time__c: time(),
						is_tax__c: element?.is_tax__c, // ! 国内外:  国外（入库日期、合同号、物料代码、生产日期）  | 国内（入库日期、物料代码、生产日期、供应商）
						contract__c: element.contract__c,
						material_code__c: element.material_code__c,
						entry_stock_date__c: today_date, // element.entry_stock_date__c, 入库日期为今天的日期
						supplier__c: element.supplier__c,
						production_date__c: element.production_date__c,
						pallet__c: Pallet,

						material_name__c: element.material_name__c,
						batch__c: element.batch__c,
						enter_quantity__c: element.quantity,
						weight__c: element.weight,
						cabinet__c: element.cabinet__c,
						cmdtype__c: "入库任务",
						instruction__c: Instruction,
						taskno__c: Instruction,
						height: data?.height, // 高度
						doc_instruction__c: palletData[0].doc_instruction__c, // 单据指令号
					};

					const fDocs = await db.find("hk_mater_stock__c", { query: { pallet__c: Pallet } });
					if (fDocs.length == 0) {
						// console.log("params", params);
						const res: any = await Distribution_Raw_Material(params, db, data?.height, data?.site); // 只按照批次去分配库位

						if (res?.success) {
							const position = res?.data?.position__c;
							const fDocs = await db.find("hk_mater_stock__c", { query: { position__c: position } });
							const Stock = fDocs[0];

							for (const element of palletData) {
								await db.updateOne("hk_mater_pda_receipt__c", element._id, { status__c: "正在入库" });
							}
							// 写入出入库任务表
							await db.insertOne("hk_mater_task__c", {
								...tt,
								loc_start__c: "xxx",
								loc_dest__c: Stock.position__c,
								group_id__c: Stock.group_id__c,
								priority__c: Stock.priority__c,
								status__c: "正在执行",
								instruct_origin__c: "上位自动",
								send_wcs__c: "已下发WCS",
								task_type__c: "入库任务", // 半托回库、盘点回库
								...params,
							});
							await db.insertOne("hk_mater_wcs_task__c", {
								...tt,
								loc_start__c: "xxx",
								loc_dest__c: Stock.position__c,
								group_id__c: Stock.group_id__c,
								priority__c: Stock.priority__c,
								...params,
								// area__c: params.area__c, // 库区
								status__c: "已下发WCS",
								instruct_origin__c: "上位自动",
								cmdtype__c: "入库任务",
								task_type__c: "入库任务", // 半托回库、盘点回库
								send_wcs__c: "已下发WCS",
							});

							await db.updateOne("hk_mater_stock__c", Stock._id, {
								time__c: time(),
								shelf_status__c: "预占用",
								pallet__c: Pallet,
								is_tax__c: params?.is_tax__c,
								material_code__c: params.material_code__c, // 物料代码
								material_name__c: params.material_name__c, // 物料名称
								entry_stock_date__c: params.entry_stock_date__c, // 入库日期
								production_date__c: params.production_date__c, // 生产日期
								contract__c: params.contract__c, // 合同号
								supplier__c: params.supplier__c, // 供应商
							});

							await UpdateRecord(interfaceId, { status__c: "成功", success_info__c: `WCS入库申请，【原料库】WMS返回托盘数据 ${JSON.stringify({ pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction })}` });

							return ctx.send({
								success: true,
								message: `处理完成：库位分配成功  托盘号：${Pallet}`,
								data: { pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction },
							});
						} else {
							const fDocs = await db.find("hk_mater_task__c", { query: { pallet__c: Pallet } });
							if (fDocs.length == 0) {
								await db.insertOne("hk_mater_task__c", {
									...tt,
									status__c: "任务异常",
									desc__c: "分配错误：没有空库位了",
									...params,
								});
								let msg = "分配错误：没有空库位了";
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: msg });
								let results = { success: false, message: msg };
								return ctx.send(results);
							} else {
								let msg = "分配错误：没有空库位了";
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: msg });
								let results = { success: false, message: msg };
								return ctx.send(results);
							}
						}
					} else if (fDocs.length == 1) {
						const status = fDocs[0].shelf_status__c;
						if (status == "预占用") {
							let msg = "分配错误：此托盘已经分配过货位了！";
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: msg });
							let results = { success: false, message: msg };
							return ctx.send(results);
						} else {
							let msg = "分配错误：此托盘在库中已有库存了！";
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: msg });
							let results = { success: false, message: msg };
							return ctx.send(results);
						}
					} else {
						let msg = "分配错误：此托盘在库存中有两条数据！";
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: msg });
						let results = { success: false, message: msg };
						return ctx.send(results);
					}
				} else {
					let msg = "错误信息：没有在【原料库PDA收货表】中查到托盘数据，托盘未收货！";
					await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: msg });
					let results = { success: false, message: msg };
					return ctx.send(results);
				}
			}
		} else {
			if (!data?.pallet) {
				let results = { success: false, message: "参数错误：缺少参数： 托盘号" };
				return ctx.send(results);
			}
			if (!data?.height) {
				let results = { success: false, message: "参数错误：缺少参数： 高度" };
				return ctx.send(results);
			}
			if (!data?.site) {
				let results = { success: false, message: "参数错误：缺少参数： 站点" };
				return ctx.send(results);
			}
		}
	};
	// 测试 - 原料入库分配,循环调用
	Test_Material_Enter_Stock_Dis = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const tt = { time__c: time() };
		const Pallet = data.pallet || Math.floor(1e9 + Math.random() * 9e9).toString();
		const Instruction = `2${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
		const element: any = {};
		let params = {
			time__c: time(),
			is_tax__c: "国外进口", // 国内外:  国外（入库日期、合同号、物料编码）  | 国内（入库日期、物料编码、物料名称、供应商）
			contract__c: "20260521",
			material_code__c: "110123",
			entry_stock_date__c: "2026-05-21",
			material_name__c: element.material_name__c,
			supplier__c: element.supplier__c,

			batch__c: element.batch__c,
			production_date__c: element.production_date__c,
			enter_quantity__c: element.quantity,
			weight__c: element.weight,
			cabinet__c: element.cabinet__c,
			pallet__c: Pallet,
			cmdtype__c: "入库任务",
			instruction__c: Instruction,
			height: data?.height, // 高度

			// instruction__c: element.instruction__c,
		};

		const fDocs = await db.find("hk_mater_stock__c", { query: { pallet__c: Pallet } });
		if (fDocs.length == 0) {
			const res: any = await Distribution_Raw_Material(params, db, 1800, "1005"); // 只按照批次去分配库位

			if (res?.success) {
				const position = res?.data?.position__c;
				const fDocs = await db.find("hk_mater_stock__c", { query: { position__c: position } });
				const Stock = fDocs[0];

				// 写入出入库任务表
				await db.insertOne("hk_mater_task__c", {
					...tt,
					loc_start__c: "xxx",
					loc_dest__c: Stock.position__c,
					group_id__c: Stock.group_id__c,
					priority__c: Stock.priority__c,
					status__c: "正在执行",
					instruct_origin__c: "上位自动",
					send_wcs__c: "未下发WCS",
					...params,
				});

				// ! 更新货位表状态, 判断是国内还是国外 去更新对应的字段
				if (params?.is_tax__c == "国外进口") {
					await db.updateOne("hk_mater_stock__c", Stock._id, {
						time__c: time(),
						shelf_status__c: "预占用",
						pallet__c: Pallet,
						entry_stock_date__c: params.entry_stock_date__c,
						contract__c: params.contract__c,
						material_name__c: "",
						material_code__c: params.material_code__c,
						is_tax__c: params?.is_tax__c,
						supplier__c: "",
					});
				} else if (params.is_tax__c == "国内采购") {
					await db.updateOne("hk_mater_stock__c", Stock._id, {
						time__c: time(),
						shelf_status__c: "预占用",
						pallet__c: Pallet,
						entry_stock_date__c: params.entry_stock_date__c,
						material_code__c: params.material_code__c,
						material_name__c: params.material_name__c,
						supplier__c: params.supplier__c,
						is_tax__c: params?.is_tax__c,
						contract__c: "",
					});
				}

				return ctx.send({
					success: true,
					message: `处理完成：库位分配成功  托盘号：${Pallet}`,
					data: { pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction },
				});
			} else {
				const fDocs = await db.find("hk_mater_task__c", { query: { pallet__c: Pallet } });
				if (fDocs.length == 0) {
					await db.insertOne("hk_mater_task__c", {
						...tt,
						status__c: "任务异常",
						desc__c: "分配错误：没有空库位了",
						...params,
					});
					let results = { success: false, message: "分配错误：没有空库位了" };
					return ctx.send(results);
				} else {
					let results = { success: false, message: "分配错误：没有空库位了" };
					return ctx.send(results);
				}
			}
		} else if (fDocs.length == 1) {
			const status = fDocs[0].shelf_status__c;
			if (status == "预占用") {
				let results = { success: false, message: "分配错误：此托盘已经分配过货位了！" };
				return ctx.send(results);
			} else {
				let results = { success: false, message: "分配错误：此托盘在库中已有库存了！" };
				return ctx.send(results);
			}
		} else {
			await db.insertOne("hk_mater_task__c", {
				...tt,
				status__c: "任务异常",
				desc__c: "分配错误：此托盘在库存中有两条数据！",
				...params,
			});
			let results = { success: false, message: "分配错误：此托盘在库存中有两条数据！" };
			return ctx.send(results);
		}
	};

	// 执行出库单据，寻找物料
	Material_OutStock_Find = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		// console.log("dasssssta", data?.selectedRows);

		// const docs = await db.find("hk_mater_doc_detail__c", {
		// 	query: {
		// 		$and: [
		// 			{ document_type__c: { $in: ["销售出库单", "需求出库单", "其他出库单"] } },
		// 			{ cmdtype__c: "出库任务" },
		// 			{
		// 				$or: [{ status__c: "未执行" }, { status__c: null }, { status__c: { $exists: false } }],
		// 			},
		// 		],
		// 	},
		// });

		// const s1 = await db.find("hk_mater_stock_detail__c", {
		// 	query: { stock_status__c: "正在出库" },
		// });
		// if (s1.length) {
		// 	for (const element of s1) {
		// 		await db.updateOne("hk_mater_stock_detail__c", element._id, { stock_status__c: "在库" });
		// 	}
		// }

		// const s2 = await db.find("hk_mater_stock__c", {
		// 	query: { shelf_status__c: "待出库" },
		// });
		// if (s2.length) {
		// 	for (const element of s2) {
		// 		await db.updateOne("hk_mater_stock__c", element._id, { shelf_status__c: "占用" });
		// 	}
		// }

		const docs = data?.selectedRows;
		console.log("接口尝试", docs.length);
		if (docs.length) {
			for (const element of docs) {
				if (element.area__c != "原料一号冻库") {
					return ctx.send({ success: false, message: `错误原因：出库仓库必须是原料一号冻库` });
				}

				const docType = ["销售出库单", "需求出库单", "其他出库单"];
				if (docType.includes(element.document_type__c)) {
					if (element.status__c == "未执行") {
						let area = "";
						let sotck = "hk_mater_stock__c";
						let stockDetail = "hk_mater_stock_detail__c";
						let stock_D = [];

						if (element.contract__c) {
							stock_D = await db.find(stockDetail, {
								query: {
									material_code__c: element.material_code__c,
									batch__c: element.batch__c,
									contract__c: element.contract__c,
									stock_status__c: "在库",
								},
								sort: { production_date__c: 1 },
							});
						} else {
							stock_D = await db.find(stockDetail, {
								query: {
									material_code__c: element.material_code__c,
									batch__c: element.batch__c,
									// $or: [{ contract__c: "" }, { contract__c: null }, { contract__c: { $exists: false } }],
									stock_status__c: "在库",
								},
								sort: { production_date__c: 1 },
							});
						}

						if (stock_D.length) {
							const sumWeight = stock_D.reduce((prev, cur) => {
								return Math.round((prev + Number(cur.weight__c)) * 1000) / 1000;
							}, 0); // 50  出 10
							const outQuanatiy = element.quantity__c
							if (outQuanatiy <= sumWeight) {
								// const OutWarehouse = flow.get(flowFnName) // 查询冷冻库
								const res: any = await handle_Outgoing_Materials(db, stock_D, outQuanatiy);
								// node.warn(`出库托盘数量结果：${res.data.length}`);
								console.log("`出库托盘数量结果：${res.data.length}`", `出库托盘数量结果：${res.data.length}`);
								if (res?.success) {
									// 校验一下出库的托盘号是否在库存中是唯一一条
									await db.updateOne("hk_mater_doc_detail__c", element._id, { time__c: time(), status__c: "正在执行", desc__c: "" });

									let TaskGroup = [];

									for (const item of res?.data) {
										const doc_instruct = `${element?.doc_instruction__c}`;
										const pallet = item.pallet__c;
										const locStart = item.position__c;
										const sk = await db.find(sotck, { query: { position__c: locStart, pallet__c: pallet } });
										if (sk.length) {
											await db.updateOne(sotck, sk[0]._id, { shelf_status__c: "待出库" });
										}
										const stock_GroupID = item?.group_id__c;
										const stock_priority = item?.priority__c; // 从库存中获取

										const cmdtype = "出库任务";
										const times = time();
										const uuid6 = `66${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;

										const taskG = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
										if (taskG.length == 0) {
											// 原料库出入库任务表
											const ids = await db.insertOne("hk_mater_task__c", {
												time__c: times,
												doc_instruction__c: doc_instruct,
												instruction__c: uuid6,

												pallet__c: "xxx",
												loc_start__c: "xxx",
												loc_dest__c: "xxx",
												status__c: "正在执行",
												instruct_origin__c: "上位自动",
												cmdtype__c: "出库任务", // 出入库类型
												task_type__c: "出库任务", // 任务类型
												send_wcs__c: "未下发WCS",
												group_id__c: stock_GroupID,
												priority__c: 0,
												area__c: area,

												material_code__c: item.material_code__c,
												material_name__c: item.material_name__c,
												batch__c: item.batch__c,
												production_date__c: item.production_date__c,
												entry_stock_date__c: item.entry_stock_date__c,
												enter_quantity__c: item.enter_quantity__c,
												weight__c: item.weight__c,
												contract__c: item.contract__c,
												cabinet__c: item.cabinet__c,
												instruct_type__c: cmdtype,
												height: 1600,
												is_tax__c: item.is_tax__c,

												desc__c: ``,
											});

											TaskGroup.push({
												group_id__c: stock_GroupID,
												instruct_no__c: uuid6,
												ids: ids,
											});
										}

										const taskNo = `33${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
										const mainTask = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
										await db.insertOne("hk_mater_wcs_task__c", {
											time__c: times,
											doc_instruction__c: doc_instruct,
											instruction__c: mainTask?.[0]?.instruct_no__c,

											taskno__c: taskNo,

											pallet__c: pallet,
											loc_start__c: locStart,
											loc_dest__c: "xxx",
											group_id__c: stock_GroupID,
											priority__c: stock_priority,
											area__c: area,

											instruct_origin__c: "上位自动",
											cmdtype__c: "出库任务",
											task_type__c: "出库任务", // 任务类型
											status__c: "未下发WCS",
											desc__c: "",
											export_loc__c: element?.export_loc__c,
										});

										const Pick = Number((Math.round((item.weight__c - item.final_weight__c) * 1000) / 1000).toFixed(3));
										await db.insertOne("hk_mater_pda_outgoing__c", {
											time__c: times,
											document_id__c: element?.document_id__c,
											document_type__c: element?.document_type__c,
											department__c: element?.department__c, // 领用部门

											doc_instruction__c: doc_instruct,
											instruction__c: uuid6,
											area__c: area,

											material_code__c: item.material_code__c,
											material_name__c: item.material_name__c,
											batch__c: item.batch__c,
											production_date__c: item.production_date__c,

											customer__c: item?.customer__c,
											contract__c: item?.contract__c,

											pallet__c: pallet,
											status__c: "正在出库",
											desc__c: "",

											piece__c: item.now_quantity__c,
											handle_piece__c: 0,

											quantity__c: Number(item.weight__c),
											pick_quantity__c: Pick,
											surplus_quantity__c: Number(item.final_weight__c),
											final_pick_quantity__c: 0,
											whole__c: item.final_weight__c == 0 ? "整托出库" : "半托出库",
										});
									}

									for (const item of TaskGroup) {
										const fDocs = await db.find("hk_mater_task__c", { query: { instruction__c: item.instruct_no__c } });
										if (fDocs.length) {
											const f2 = await db.find("hk_mater_wcs_task__c", { query: { instruction__c: item.instruct_no__c } });
											await db.updateOne("hk_mater_task__c", fDocs[0]._id, { desc__c: `出库任务数量：${f2.length || 0}` });
										}
									}
									return ctx.send({ success: true, message: "执行成功：查看单据信息！" });
								} else {
									await db.updateOne("hk_mater_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：${res?.message}` });
									return ctx.send({ success: false, message: `执行错误：${res?.message}` });
								}
							} else {
								await db.updateOne("hk_mater_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `错误原因：出库重量${element.quantity__c} 大于库存重量${sumWeight}` });
								return ctx.send({ success: false, message: `错误原因：出库重量${element.quantity__c} 大于库存重量${sumWeight}` });
							}
						} else {
							await db.updateOne("hk_mater_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: "错误原因：在库存中未找到匹配的物料！" });
							return ctx.send({ success: false, message: `错误原因：在库存中未找到匹配的物料！` });
						}
					} else {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: "错误原因：执行状态必须是未执行状态！" });
						return ctx.send({ success: false, message: `错误原因：执行状态必须是未执行状态！` });
					}
				} else {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `错误原因：单据类型需是: ${docType.join(",")}！` });
					return ctx.send({ success: false, message: `错误原因：单据类型需是: ${docType.join(",")}！` });
				}
			}
			return ctx.send({ success: true, message: "执行成功：查看单据信息！" });
		} else {
			return ctx.send({ success: false, message: "失败：未读取到出库任务！" });
		}
	};

	Material_Roundup = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		console.log("dasssssta", data?.selectedRows);

		// const docs = await db.find("hk_mater_stock_detail__c", {
		// 	query: {
		// 		$and: [
		// 			// { document_type__c: { $in: ["销售出库单", "需求出库单", "其他出库单"] } },
		// 			{ entry_stock_date__c: "2026-06-11" },
		// 			// {
		// 			// 	$or: [{ status__c: "未执行" }, { status__c: null }, { status__c: { $exists: false } }],
		// 			// },
		// 		],
		// 	},
		// });
		// // console.log(docs.length);
		// // return
		const docs = data?.selectedRows;
		console.log("接口尝试", docs.length);
		if (docs.length) {
			// 1、获取前端勾选的数据
			// 2、库存状态为在库
			// 3、处理完数据之后、更新库存、更新货架表、写入WCS任务

			// 、校验数据
			// 截取这里、判断是否都是在库的托盘、如果有需要提示前端
			for (const element of docs) {
				if (element.stock_status__c != "在库") {
					return ctx.send({ success: true, message: `选择的数据中存在 库存状态不等于 在库，状态为：${element.stock_status__c}` });
				}
			}

			let TaskGroup = [];

			let area = "";
			let sotck = "hk_mater_stock__c";
			let stockDetail = "hk_mater_stock_detail__c";
			let table_main_task = "hk_mater_task__c"; // 出入库任务表
			let table_wcs_task = "hk_mater_wcs_task__c"; // 下发WCS任务表

			for (const item of docs) {
				await db.updateOne(stockDetail, item._id, { stock_status__c: "盘点（正在出库）" });

				const pallet = item.pallet__c;
				const locStart = item.position__c;
				const sk = await db.find(sotck, { query: { position__c: locStart, pallet__c: pallet } });
				if (sk.length) {
					await db.updateOne(sotck, sk[0]._id, { shelf_status__c: "待出库" });
				}
				const stock_GroupID = item?.group_id__c;
				const stock_priority = item?.priority__c; // 从库存中获取

				const cmdtype = "出库任务";
				const times = time();
				const uuid6 = `66${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;

				const taskG = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
				if (taskG.length == 0) {
					// 原料库出入库任务表
					const ids = await db.insertOne(table_main_task, {
						time__c: times,
						doc_instruction__c: "",
						instruction__c: uuid6,

						pallet__c: "xxx",
						loc_start__c: "xxx",
						loc_dest__c: "xxx",
						status__c: "正在执行",
						instruct_origin__c: "上位自动",
						cmdtype__c: "出库任务", // 出入库类型
						task_type__c: "盘点出库", // 任务类型
						send_wcs__c: "未下发WCS",
						group_id__c: stock_GroupID,
						priority__c: 0,
						area__c: area,

						material_code__c: item.material_code__c,
						material_name__c: item.material_name__c,
						batch__c: item.batch__c,
						production_date__c: item.production_date__c,
						entry_stock_date__c: item.entry_stock_date__c,
						enter_quantity__c: item.enter_quantity__c,
						weight__c: item.weight__c,
						contract__c: item.contract__c,
						cabinet__c: item.cabinet__c,
						instruct_type__c: cmdtype,
						height: 1600,
						is_tax__c: item.is_tax__c,

						desc__c: ``,
					});

					TaskGroup.push({
						group_id__c: stock_GroupID,
						instruct_no__c: uuid6,
						ids: ids,
					});
				}

				const taskNo = `33${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
				const mainTask = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
				await db.insertOne(table_wcs_task, {
					time__c: times,
					doc_instruction__c: "",
					instruction__c: mainTask?.[0]?.instruct_no__c,

					taskno__c: taskNo,

					pallet__c: pallet,
					loc_start__c: locStart,
					loc_dest__c: "xxx",
					group_id__c: stock_GroupID,
					priority__c: stock_priority,
					area__c: area,

					instruct_origin__c: "上位自动",
					cmdtype__c: "出库任务",
					task_type__c: "盘点出库", // 任务类型
					status__c: "未下发WCS",
					desc__c: "",
				});
			}

			for (const item of TaskGroup) {
				const fDocs = await db.find(table_main_task, { query: { instruction__c: item.instruct_no__c } });
				if (fDocs.length) {
					const f2 = await db.find(table_wcs_task, { query: { instruction__c: item.instruct_no__c } });
					await db.updateOne(table_main_task, fDocs[0]._id, { desc__c: `出库任务数量：${f2.length || 0}` });
				}
			}

			return ctx.send({ success: true, message: "执行成功：查看单据信息！" });
		} else {
			return ctx.send({ success: false, message: "失败：未读取到出库任务！" });
		}
	};

	Product_Roundup_Freezing = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		// console.log("dasssssta", data?.selectedRows);

		// const docs = await db.find("hk_freezing_stock_detail__c", {
		// 	query: {
		// 		$and: [
		// 			// { document_type__c: { $in: ["销售出库单", "需求出库单", "其他出库单"] } },
		// 			{ material_code__c: "16956" },
		// 			// {
		// 			// 	$or: [{ status__c: "未执行" }, { status__c: null }, { status__c: { $exists: false } }],
		// 			// },
		// 		],
		// 	},
		// });
		// // console.log(docs.length);
		// // return
		const docs = data?.selectedRows;
		console.log("接口尝试", docs.length);
		if (docs.length) {
			// 1、获取前端勾选的数据
			// 2、库存状态为在库
			// 3、处理完数据之后、更新库存、更新货架表、写入WCS任务

			// 、校验数据
			// 截取这里、判断是否都是在库的托盘、如果有需要提示前端
			for (const element of docs) {
				if (element.stock_status__c != "在库") {
					return ctx.send({ success: true, message: `选择的数据中存在 库存状态不等于 在库，状态为：${element.stock_status__c}` });
				}
			}

			let TaskGroup = [];

			let area = "冷冻库";
			let sotck = "hk_freezing_stock__c";
			let stockDetail = "hk_freezing_stock_detail__c";
			let table_main_task = "hk_product_task__c"; // 出入库任务表
			let table_wcs_task = "hk_product_wcs_task__c"; // 下发WCS任务表

			for (const item of docs) {
				await db.updateOne(stockDetail, item._id, { stock_status__c: "盘点（正在出库）" });

				const pallet = item.pallet__c;
				const locStart = item.position__c;
				const sk = await db.find(sotck, { query: { position__c: locStart, pallet__c: pallet } });
				if (sk.length) {
					await db.updateOne(sotck, sk[0]._id, { shelf_status__c: "待出库" });
				}
				const stock_GroupID = item?.group_id__c;
				const stock_priority = item?.priority__c; // 从库存中获取

				const cmdtype = "出库任务";
				const times = time();
				const uuid6 = `66${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;

				const taskG = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
				if (taskG.length == 0) {
					// 原料库出入库任务表
					const ids = await db.insertOne(table_main_task, {
						time__c: times,
						doc_instruction__c: "",
						instruction__c: uuid6,

						pallet__c: "xxx",
						loc_start__c: "xxx",
						loc_dest__c: "xxx",
						status__c: "正在执行",
						instruct_origin__c: "上位自动",
						cmdtype__c: "出库任务", // 出入库类型
						task_type__c: "盘点出库", // 任务类型
						send_wcs__c: "未下发WCS",
						group_id__c: stock_GroupID,
						priority__c: 0,
						area__c: area,

						material_code__c: item.material_code__c,
						material_name__c: item.material_name__c,
						batch__c: item.batch__c,
						production_date__c: item.production_date__c,
						entry_stock_date__c: item.entry_stock_date__c,
						enter_quantity__c: item.enter_quantity__c,
						weight__c: item.weight__c,
						contract__c: item.contract__c,
						cabinet__c: item.cabinet__c,
						instruct_type__c: cmdtype,
						height: 1600,
						is_tax__c: item.is_tax__c,

						desc__c: ``,
					});

					TaskGroup.push({
						group_id__c: stock_GroupID,
						instruct_no__c: uuid6,
						ids: ids,
					});
				}

				const taskNo = `33${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
				const mainTask = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
				await db.insertOne(table_wcs_task, {
					time__c: times,
					doc_instruction__c: "",
					instruction__c: mainTask?.[0]?.instruct_no__c,

					taskno__c: taskNo,

					pallet__c: pallet,
					loc_start__c: locStart,
					loc_dest__c: "xxx",
					group_id__c: stock_GroupID,
					priority__c: stock_priority,
					area__c: area,

					instruct_origin__c: "上位自动",
					cmdtype__c: "出库任务",
					task_type__c: "盘点出库", // 任务类型
					status__c: "未下发WCS",
					desc__c: "",
				});
			}

			for (const item of TaskGroup) {
				const fDocs = await db.find(table_main_task, { query: { instruction__c: item.instruct_no__c } });
				if (fDocs.length) {
					const f2 = await db.find(table_wcs_task, { query: { instruction__c: item.instruct_no__c } });
					await db.updateOne(table_main_task, fDocs[0]._id, { desc__c: `出库任务数量：${f2.length || 0}` });
				}
			}

			return ctx.send({ success: true, message: "执行成功：查看单据信息！" });
		} else {
			return ctx.send({ success: false, message: "失败：未读取到出库任务！" });
		}
	};

	Product_Roundup_Chiled = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		// console.log("dasssssta", data?.selectedRows);

		// const docs = await db.find("hk_chilled_stock_detail__c", {
		// 	query: {
		// 		$and: [
		// 			// { document_type__c: { $in: ["销售出库单", "需求出库单", "其他出库单"] } },
		// 			{ material_code__c: "1694900" },
		// 			// {
		// 			// 	$or: [{ status__c: "未执行" }, { status__c: null }, { status__c: { $exists: false } }],
		// 			// },
		// 		],
		// 	},
		// });
		// // console.log(docs.length);
		// // return
		const docs = data?.selectedRows;
		console.log("接口尝试", docs.length);
		if (docs.length) {
			// 1、获取前端勾选的数据
			// 2、库存状态为在库
			// 3、处理完数据之后、更新库存、更新货架表、写入WCS任务

			// 、校验数据
			// 截取这里、判断是否都是在库的托盘、如果有需要提示前端
			for (const element of docs) {
				if (element.stock_status__c != "在库") {
					return ctx.send({ success: true, message: `选择的数据中存在 库存状态不等于 在库，状态为：${element.stock_status__c}` });
				}
			}

			let TaskGroup = [];

			let area = "冷藏库";
			let sotck = "hk_chilled_stock__c";
			let stockDetail = "hk_chilled_stock_detail__c";
			let table_main_task = "hk_product_task__c"; // 出入库任务表
			let table_wcs_task = "hk_product_wcs_task__c"; // 下发WCS任务表

			for (const item of docs) {
				await db.updateOne(stockDetail, item._id, { stock_status__c: "盘点（正在出库）" });

				const pallet = item.pallet__c;
				const locStart = item.position__c;
				const sk = await db.find(sotck, { query: { position__c: locStart, pallet__c: pallet } });
				if (sk.length) {
					await db.updateOne(sotck, sk[0]._id, { shelf_status__c: "待出库" });
				}
				const stock_GroupID = item?.group_id__c;
				const stock_priority = item?.priority__c; // 从库存中获取

				const cmdtype = "出库任务";
				const times = time();
				const uuid6 = `66${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;

				const taskG = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
				if (taskG.length == 0) {
					// 原料库出入库任务表
					const ids = await db.insertOne(table_main_task, {
						time__c: times,
						doc_instruction__c: "",
						instruction__c: uuid6,

						pallet__c: "xxx",
						loc_start__c: "xxx",
						loc_dest__c: "xxx",
						status__c: "正在执行",
						instruct_origin__c: "上位自动",
						cmdtype__c: "出库任务", // 出入库类型
						task_type__c: "盘点出库", // 任务类型
						send_wcs__c: "未下发WCS",
						group_id__c: stock_GroupID,
						priority__c: 0,
						area__c: area,

						material_code__c: item.material_code__c,
						material_name__c: item.material_name__c,
						batch__c: item.batch__c,
						production_date__c: item.production_date__c,
						entry_stock_date__c: item.entry_stock_date__c,
						enter_quantity__c: item.enter_quantity__c,
						weight__c: item.weight__c,
						contract__c: item.contract__c,
						cabinet__c: item.cabinet__c,
						instruct_type__c: cmdtype,
						height: 1600,
						is_tax__c: item.is_tax__c,

						desc__c: ``,
					});

					TaskGroup.push({
						group_id__c: stock_GroupID,
						instruct_no__c: uuid6,
						ids: ids,
					});
				}

				const taskNo = `33${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;
				const mainTask = TaskGroup.filter(v => v?.group_id__c == stock_GroupID);
				await db.insertOne(table_wcs_task, {
					time__c: times,
					doc_instruction__c: "",
					instruction__c: mainTask?.[0]?.instruct_no__c,

					taskno__c: taskNo,

					pallet__c: pallet,
					loc_start__c: locStart,
					loc_dest__c: "xxx",
					group_id__c: stock_GroupID,
					priority__c: stock_priority,
					area__c: area,

					instruct_origin__c: "上位自动",
					cmdtype__c: "出库任务",
					task_type__c: "盘点出库", // 任务类型
					status__c: "未下发WCS",
					desc__c: "",
				});
			}

			for (const item of TaskGroup) {
				const fDocs = await db.find(table_main_task, { query: { instruction__c: item.instruct_no__c } });
				if (fDocs.length) {
					const f2 = await db.find(table_wcs_task, { query: { instruction__c: item.instruct_no__c } });
					await db.updateOne(table_main_task, fDocs[0]._id, { desc__c: `出库任务数量：${f2.length || 0}` });
				}
			}

			return ctx.send({ success: true, message: "执行成功：查看单据信息！" });
		} else {
			return ctx.send({ success: false, message: "失败：未读取到出库任务！" });
		}
	};

	// Material_OutStock_SendWcs = async (ctx: Context) => {
	// 	const db = ctx.mongo;
	// 	const data: any = ctx.request.body;
	// 	// 这个文件中，我先描述规则是什么样的，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到18列，1到24排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到7排为一组，9到13排为一组，14到17排为一组，19到24排为一组。其中入库1到7排入库升序，9到13排入库降序，14到17排入库升序，19到24排入库降序。有不同的地方是，其他列都是正常分配的，只是1列、6列、7列、13列的9到17排，需要改成9到17排为一组，并且是升序分配 入库分配是这样。  但是目前是出库下发WCS任务，需求根据传递的数据进行出库，出库是1到7排为一组降序发送，9到13排为一组升序发送，14到17排为一组降序发送，19到24排为一组升序发送。但是1列、6列、7列、13列的9到17排，需要改成9到17排为一组并且降序发送任务。其他列还是按照原来的，帮我优化下代码。

	// 	async function SortRule01_Product(sortArr: any[]) {
	// 		const getGroupInfo = (col: number, row: number) => {
	// 			const groups = getOutGroupRules(col);
	// 			const groupIndex = groups.findIndex(group => group.rows.includes(row));
	// 			if (groupIndex === -1) return null;
	// 			return {
	// 				groupIndex,
	// 				order: groups[groupIndex].order,
	// 			};
	// 		};

	// 		return sortArr.sort((a: { col__c: number; lay__c: number; row__c: number }, b: { col__c: number; lay__c: number; row__c: number }) => {
	// 			if (a.col__c !== b.col__c) return a.col__c - b.col__c; // 列升序发送
	// 			if (a.lay__c !== b.lay__c) return a.lay__c - b.lay__c; // 层升序发送

	// 			const groupA = getGroupInfo(a.col__c, a.row__c);
	// 			const groupB = getGroupInfo(b.col__c, b.row__c);
	// 			if (!groupA && !groupB) return a.row__c - b.row__c;
	// 			if (!groupA) return 1;
	// 			if (!groupB) return -1;

	// 			if (groupA.groupIndex !== groupB.groupIndex) return groupA.groupIndex - groupB.groupIndex;
	// 			return groupA.order === "asc" ? a.row__c - b.row__c : b.row__c - a.row__c;
	// 		});
	// 	}

	// 	const docs = await db.find("hk_mater_task__c", {
	// 		query: {
	// 			$and: [
	// 				{ status__c: "正在执行" },
	// 				{ cmdtype__c: "出库任务" },
	// 				{
	// 					$or: [{ send_wcs__c: "未下发WCS" }, { send_wcs__c: { $exists: false } }, { send_wcs__c: null }],
	// 				},
	// 			],
	// 		},
	// 	});
	// 	if (docs.length) {
	// 		const { _id, instruct_type__c } = docs[0];

	// 		const item = docs[0];
	// 		const subTask = await db.find("hk_mater_wcs_task__c", { query: { instruction__c: item.instruction__c, status__c: "未下发WCS" } });
	// 		if (subTask.length) {
	// 			await db.updateOne("hk_mater_task__c", _id, { send_wcs__c: "已下发WCS" }); // 更新主任务、后面async依然可以继续执行

	// 			const mapData = subTask.map(value => {
	// 				const stockLoc = value.loc_start__c;
	// 				const col__c = +stockLoc.substring(0, 2);
	// 				const row__c = +stockLoc.substring(2, 4);
	// 				const lay__c = +stockLoc.substring(4, 6);
	// 				return { row__c, col__c, lay__c, ...value };
	// 			});

	// 			// const sortRule = flow.get("SortRule01_Product")
	// 			const sortRes = await SortRule01_Product(mapData); // 托盘出库：按列、层、动态排规则发送

	// 			// node.warn(sortRes.length);

	// 			function delay(ms: number | undefined) {
	// 				return new Promise(resolve => setTimeout(resolve, ms));
	// 			}
	// 			(async () => {
	// 				for (let index = 0; index < sortRes.length; index++) {
	// 					const item = sortRes[index];
	// 					const Instruction = `77${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
	// 					let data = {
	// 						pallet: item.pallet__c,
	// 						startNode: item.loc_start__c,
	// 						groupId: item.group_id__c,
	// 						order: index + 1,
	// 						taskId: Instruction,
	// 						endNode: "A03", // A02 A03
	// 					};
	// 					console.log("object", data);
	// 					let url = "http://10.30.40.221:1880/api/receive/fromWms/material/popTask";
	// 					try {
	// 						const res = await axios.post(url, data, { timeout: 3000 });
	// 						if (res.status == 200) {
	// 							if (res.data.code == 200) {
	// 								await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: time(), desc__c: "" }); // 更新子任务
	// 							} else {
	// 								const errorMsg = res?.data?.returnInfo || res?.data?.message || `WCS返回异常，code: ${res?.data?.code ?? "未知"}`;
	// 								await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "任务发送异常", desc__c: errorMsg, taskno__c: Instruction, priority__c: index + 1, send_time__c: time() }); // 更新子任务
	// 							}
	// 						} else {
	// 							await db.updateOne("hk_mater_wcs_task__c", item._id, {
	// 								status__c: "任务发送异常",
	// 								desc__c: `HTTP状态异常: ${res.status}`,
	// 								taskno__c: Instruction,
	// 								priority__c: index + 1,
	// 								send_time__c: time(),
	// 							}); // 更新子任务
	// 						}
	// 					} catch (error: any) {
	// 						const responseMsg = error?.response?.data?.returnInfo || error?.response?.data?.message;
	// 						const statusMsg = error?.response?.status ? `HTTP ${error.response.status}` : "";
	// 						const errorMsg = responseMsg || error?.message || "WCS通讯错误";
	// 						const desc = [statusMsg, errorMsg].filter(Boolean).join(" - ");
	// 						await db.updateOne("hk_mater_wcs_task__c", item._id, {
	// 							status__c: "任务发送异常",
	// 							desc__c: desc,
	// 							taskno__c: Instruction,
	// 							priority__c: index + 1,
	// 							send_time__c: time(),
	// 						}); // 更新子任务
	// 					}
	// 					await delay(2000);
	// 				}
	// 			})();

	// 			let results = { success: true, message: "成功：下发WCS成功！" };
	// 			return ctx.send(results);
	// 		}
	// 	} else {
	// 		let results = { success: true, message: "失败：未找到WCS未下发的任务" };
	// 		return ctx.send(results);
	// 	}
	// };

	enter_receive_pallet_task_finish = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const pallet = data?.pallet;
		const taskId = data?.taskId;
		const insInfo = {
			time__c: time(),
			interface_name__c: "原料库任务完成接口",
			params__c: data?.taskId,
			desc__c: "",
		};
		let msg = "";
		const { Record, UpdateRecord, ErrorInfo } = await App.writeInterfaceReceive(ctx, insInfo);
		const interfaceId = await Record({ desc__c: "WCS入库出库完成上报指令号" });

		// ! cmdtype:  0-入库完成, 1-出库完成, 2-冷藏半托回库，3-冷冻半托回库

		if (taskId) {
			const Inter = Math.floor(1e9 + Math.random() * 9e9).toString();

			const findTaskNo = await db.find("hk_mater_wcs_task__c", { query: { taskno__c: taskId }, sort: { time__c: -1 } });
			if (findTaskNo.length == 0) {
				let results = { success: false, message: `任务错误：根据未找到【正在执行】数据数据`, cmdType: "" };
				await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
				return ctx.send(results);
			}

			const cmdType = findTaskNo[0].cmdtype__c; // 出入库类型
			const taskType = findTaskNo[0].task_type__c; // 任务类型

			if (cmdType == "入库任务") {
				const instruction__c = findTaskNo[0].instruction__c;
				const doc_instruction__c = findTaskNo[0].doc_instruction__c;

				if (taskType == "入库任务") {
					const fDocs = await db.find("hk_mater_task__c", { query: { instruction__c, status__c: "正在执行" }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const hkTask = fDocs[0];
						const pallet = hkTask.pallet__c;

						const Stocks = await db.find("hk_mater_stock__c", { query: { pallet__c: pallet, shelf_status__c: "预占用" }, sort: { time__c: -1 } });
						if (Stocks.length) {
							const stock = Stocks[0];

							const ChuYu = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: pallet }, sort: { time__c: -1 } });
							if (ChuYu.length) {
								const Instruction_BarCode = `6${Math.floor(1e9 + Math.random() * 9e9).toString()}`;

								let instruction = ""; // 指令号
								let allWeight = 0; // 总重量
								let n = 1;
								for (const item of ChuYu) {
									allWeight = Number((Math.round((Number(allWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
									instruction = item.instruction__c;

									await db.insertOne("hk_mater_stock_detail_barcode__c", {
										time__c: time(),
										instruction__c: Instruction_BarCode,
										way__c: item?.input_way__c,
										pallet__c: stock.pallet__c || "",
										weight__c: item?.weight__c || 0,
										production_date__c: item?.production_date__c || "",
										batch__c: item?.batch__c || "",
										barcode__c: item?.barcode__c || "",
										barcode_quantity__c: n++,
										desc__c: "",
									});
									await db.updateOne("hk_mater_pda_receipt__c", item._id, { status__c: "入库完成" });
								}

								await db.updateOne("hk_mater_task__c", hkTask._id, { status__c: "已完成" });
								await db.updateOne("hk_mater_stock__c", stock._id, { time__c: time(), shelf_status__c: "占用", pallet_status__c: "在库" });

								// 下发WCS表
								const wcsTask = await db.find("hk_mater_wcs_task__c", { query: { pallet__c: pallet }, sort: { time__c: -1 } });
								if (wcsTask.length) {
									for (const item of wcsTask) {
										await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "任务已完成" });
									}
								}

								const orderInfo = await db.find("hk_mater_doc_detail__c", { query: { doc_instruction__c: doc_instruction__c }, sort: { time__c: -1 } });
								const Order = orderInfo?.[0];

								let way = "";
								const wayStr = ChuYu[0].input_way__c;
								if (["条码自动识别", "条码自动生成"].includes(wayStr)) {
									way = "条码自动识别";
								} else {
									way = "手动OCR识别";
								}

								let batch = "";
		// const items = docs[0];
		if (Order.batch__c) {
			batch = Order.batch__c;
		}
			// batch__c: batch,



								await db.insertOne("hk_mater_stock_detail__c", {
									time__c: time(),
									loc_name__c: stock.loc_name__c,
									position__c: stock.position__c,
									row__c: stock.row__c,
									col__c: stock.col__c,
									lay__c: stock.lay__c,
									pallet__c: stock.pallet__c,
									group_id__c: stock.group_id__c,
									priority__c: stock.priority__c,
									production_date__c: stock?.production_date__c, // 生产日期为货架表的生产日期
									entry_stock_date__c: stock?.entry_stock_date__c, // 入库日期

									stock_status__c: "在库",
									way__c: way,

									document_id__c: Order?.document_id__c,
									document_type__c: Order?.document_type__c,
									line_item__c: Order?.line_item__c,

									material_name__c: Order?.material_name__c,
									material_code__c: Order?.material_code__c,

									// batch__c: "", // 批次为空
									batch__c: batch,
									contract__c: Order?.contract__c,
									cabinet__c: Order?.cabinet__c,
									is_tax__c: Order?.is_tax__c,
									cars_info__c: Order?.cars_info__c,
									supplier__c: Order?.supplier__c,

									suggest_order__c: Order?.suggest_order__c,
									sealing_order__c: Order?.sealing_order__c,

									purchase_organization__c: Order?.purchase_organization__c,
									prepare_name__c: Order?.prepare_name__c,
									prepare_code__c: Order?.prepare_code__c,
									report_order_one__c: Order?.report_order_one__c,
									report_order_two__c: Order?.report_order_two__c,
									report_contract__c: Order?.report_contract__c,

									arrival_date__c: Order?.arrival_date__c,

									country__c: Order?.country__c,
									factory_no__c: Order?.factory_no__c,

									now_quantity__c: ChuYu.length, // 当前箱数
									final_quantity__c: ChuYu.length,

									weight__c: allWeight, // 当托重量
									final_weight__c: allWeight,

									instruction__c: Instruction_BarCode,
								});

								await UpdateRecord(interfaceId, { status__c: "成功", success_info__c: "WCS入库完成返回WCS成功" });
								let results = { success: true, message: "成功", cmdType: 0 };
								return ctx.send(results);
							} else {
								let results = { success: false, message: `任务错误：根据托盘号未在【原料手动建单托盘绑定表】中查到托盘 ${data?.pallet} 数据`, cmdType: 0 };
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
								return ctx.send(results);
							}
						} else {
							let results = { success: false, message: "任务处理错误：根据托盘查询库位错误", cmdType: 0 };
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
							return ctx.send(results);
						}
					} else {
						let results = { success: false, message: "入库完成接口：根据传递的参数为找到此托盘正在执行的任务", cmdType: 0 };
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					}
				} else if (["半托回库", "盘点回库"].includes(taskType)) {
					const fDocs = await db.find("hk_mater_task__c", { query: { instruction__c: instruction__c, status__c: "正在执行" }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const hkTask = fDocs[0];
						const pallet = hkTask.pallet__c;

						let stockName = "hk_mater_stock__c";
						let stockDetailName = "hk_mater_stock_detail__c";

						const Stocks = await db.find(stockName, { query: { pallet__c: pallet, shelf_status__c: "预占用" }, sort: { time__c: -1 } });
						if (Stocks.length) {
							const stock = Stocks[0];

							await db.updateOne("hk_mater_task__c", hkTask._id, { status__c: "已完成" });

							await db.updateOne(stockName, stock._id, { time__c: time(), shelf_status__c: "占用", pallet_status__c: "在库" });

							const wcsTask = await db.find("hk_mater_wcs_task__c", { query: { pallet__c: pallet }, sort: { time__c: -1 } });
							if (wcsTask.length) {
								for (const item of wcsTask) {
									await db.updateOne("hk_mater_wcs_task__c", item._id, { status__c: "任务已完成" });
								}
							}

							const StockDs = await db.find(stockDetailName, { query: { pallet__c: pallet }, sort: { time__c: -1 } });
							if (StockDs.length) {
								await db.updateOne(stockDetailName, StockDs[0]._id, {
									time__c: time(),
									loc_name__c: stock.loc_name__c,
									position__c: stock.position__c,
									row__c: stock.row__c,
									col__c: stock.col__c,
									lay__c: stock.lay__c,
									pallet__c: stock.pallet__c,
									group_id__c: stock.group_id__c,

									stock_status__c: "在库",
								});
							}

							await UpdateRecord(interfaceId, { status__c: "成功", success_info__c: "WCS入库完成返回WCS成功" });
							let results = { success: true, message: "成功", cmdType: 0 };
							return ctx.send(results);
						}
					}
				}
			}
			if (cmdType == "出库任务") {
				const instruction__c = taskId;

				if (taskType == "出库任务") {
					const fDocs = await db.find("hk_mater_wcs_task__c", { query: { taskno__c: instruction__c }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const element = fDocs[0];

						await db.updateOne("hk_mater_wcs_task__c", element._id, { status__c: "任务已完成" });

						let stockName = "hk_mater_stock__c";

						const stock = await ctx.mongo.find(stockName, { query: { pallet__c: element.pallet__c } });
						if (stock.length) {
							await db.updateOne(stockName, stock[0]._id, {
								time__c: time(),
								shelf_status__c: "空闲",
								pallet__c: "",
								pallet_status__c: "空闲",
								contract__c: "",
								material_code__c: "",
								material_name__c: "",
								batch__c: "",
								production_date__c: "",
								entry_stock_date__c: "",
								supplier__c: "",
								is_tax__c: "",
								cabinet__c: "",
								desc__c: "",
							});
						}
						let results = { success: true, message: "任务更新完成", cmdType: 1 };
						return ctx.send(results);
					} else {
						let results = { success: false, message: "根据传递的指令号未找到【成品发送WCS任务】中的任务", cmdType: 1 };
						return ctx.send(results);
					}
				} else if (taskType == "盘点出库") {
					const fDocs = await db.find("hk_mater_wcs_task__c", { query: { taskno__c: instruction__c }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const element = fDocs[0];

						await db.updateOne("hk_mater_wcs_task__c", element._id, { status__c: "任务已完成" });

						let stockName = "hk_mater_stock__c";
						let stockDetilName = "hk_mater_stock_detail__c";

						const stock = await ctx.mongo.find(stockName, { query: { pallet__c: element.pallet__c } });
						if (stock.length) {
							await db.updateOne(stockName, stock[0]._id, {
								time__c: time(),
								shelf_status__c: "空闲",
								pallet__c: "",
								pallet_status__c: "空闲",
								contract__c: "",
								material_code__c: "",
								material_name__c: "",
								batch__c: "",
								production_date__c: "",
								entry_stock_date__c: "",
								supplier__c: "",
								is_tax__c: "",
								cabinet__c: "",
								desc__c: "",
							});
						}

						const stockD = await ctx.mongo.find(stockDetilName, { query: { pallet__c: element.pallet__c } });
						if (stockD.length) {
							await db.updateOne(stockDetilName, stockD[0]._id, {
								time__c: time(),
								stock_status__c: "盘点（已出库）",
							});
						}

						let results = { success: true, message: "任务更新完成", cmdType: 1 };
						return ctx.send(results);
					} else {
						let results = { success: false, message: "根据传递的指令号未找到【成品发送WCS任务】中的任务", cmdType: 1 };
						return ctx.send(results);
					}
				}
			}

			if (cmdType == "移库任务") {
				const instruction__c = taskId;

				const fDocs = await db.find("hk_mater_wcs_task__c", { query: { taskno__c: instruction__c }, sort: { time__c: -1 } });
				if (fDocs.length) {
					const element = fDocs[0];
					// console.log("element", element);
					await db.updateOne("hk_mater_wcs_task__c", element._id, { status__c: "任务已完成" });

					// {
					// 	_id: '6a423b035815414e9c2507ff',
					// 	time__c: '2026/06/29 17:29:39',
					// 	instruction__c: '667919556',
					// 	taskno__c: '337919856',
					// 	pallet__c: 'YL7625090509',
					// 	loc_start__c: '080701',
					// 	loc_dest__c: '060201',
					// 	group_id__c: 'GROUP_30',
					// 	priority__c: 6,
					// 	area__c: '原料库',
					// 	instruct_origin__c: '上位自动',
					// 	cmdtype__c: '移库任务',
					// 	task_type__c: '移库任务',
					// }

					// 获取起始位置 更新起始位置数据

					// 获取终点位置 更新终点位置数据

					// 将终点位置 信息更新到 库存中
					let stockName = "hk_mater_stock__c";
					let stockDetailName = "hk_mater_stock_detail__c";

					const stock = await ctx.mongo.find(stockName, { query: { position__c: element.loc_start__c, shelf_status__c: "待出库" } });
					if (stock.length) {
						const ele_s = stock[0];
						console.log("ele_s", ele_s);

						const stock_dest = await ctx.mongo.find(stockName, { query: { position__c: element.loc_dest__c } });
						// console.log( 'stock_dest',stock_dest);
						// return
						await db.updateOne(stockName, stock_dest[0]._id, {
							time__c: time(),
							shelf_status__c: "占用",
							pallet__c: ele_s.pallet__c,
							pallet_status__c: "在库",
							contract__c: ele_s.contract__c,
							material_code__c: ele_s.material_code__c,
							material_name__c: ele_s.material_name__c,
							batch__c: ele_s.batch__c,
							production_date__c: ele_s.production_date__c,
							entry_stock_date__c: ele_s.entry_stock_date__c,
							supplier__c: ele_s.supplier__c,
							is_tax__c: ele_s.is_tax__c,
							cabinet__c: ele_s.cabinet__c,
							desc__c: "",
						});

						const stock_Detail = await ctx.mongo.find(stockDetailName, { query: { pallet__c: ele_s.pallet__c } });
						await db.updateOne(stockDetailName, stock_Detail[0]._id, {
							time__c: time(),
							loc_name__c: stock_dest[0].loc_name__c,
							position__c: stock_dest[0].position__c,
							group_id__c: stock_dest[0].group_id__c,
							priority__c: stock_dest[0].priority__c,
						});

						await db.updateOne(stockName, ele_s._id, {
							time__c: time(),
							shelf_status__c: "空闲",
							pallet__c: "",
							pallet_status__c: "空闲",
							contract__c: "",
							material_code__c: "",
							material_name__c: "",
							batch__c: "",
							production_date__c: "",
							entry_stock_date__c: "",
							supplier__c: "",
							is_tax__c: "",
							cabinet__c: "",
							desc__c: "",
						});
					}
					let results = { success: true, message: "任务更新完成", cmdType: 1 };
					return ctx.send(results);
				} else {
					let results = { success: false, message: "根据传递的指令号未找到【成品发送WCS任务】中的任务", cmdType: 1 };
					return ctx.send(results);
				}
			}
		} else {
			let results = { success: false, message: "任务处理错误：未传递指令号", cmdType: "" };
			await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
			return ctx.send(results);
		}
	};

	Material_Update_Stock_Group = async (ctx: Context) => {
		const db = ctx.mongo;

		// 我先描述现在的写法，然后我描述一下我要怎么改，现在的这样，立体库中总共有1到17列，1到25排，1到3层，现在入库分配是这样，先分1层，1层按照1列分，1到5排为一组，7到12排为一组，13到18排为一组，20到25排为一组。现在的需求是，有几列需要单独处理，第一个处理的是5列、6列、11列、12列的7到18排，需要改成7到14排为一组，17到18排为一组. 第二个处理的是14列和16列。7到18排中，是7到11排为一组，12到18排为一组

		const fDocs = await db.find("hk_mater_stock__c", { query: {}, sort: { lay__c: 1, col__c: 1, row__c: 1 } });
		// node.warn(fDocs);
		let n = 1;
		const specialCols = new Set([5, 6, 11, 12]);
		const specialCols2 = new Set([14, 16]);

		function getGroupRules(col: number) {
			if (specialCols.has(col)) {
				return [
					{ group: 1, start: 1, end: 5, getPriority: (row: number) => row }, // 升序
					{ group: 2, start: 7, end: 14, getPriority: (row: number) => 15 - row }, // 降序 14->1, 7->8
					{ group: 3, start: 17, end: 18, getPriority: (row: number) => row - 16 }, // 升序 17->1, 18->2
					{ group: 4, start: 20, end: 25, getPriority: (row: number) => 26 - row }, // 降序 25->1
				];
			}
			if (specialCols2.has(col)) {
				return [
					{ group: 1, start: 1, end: 5, getPriority: (row: number) => row }, // 升序
					{ group: 2, start: 7, end: 11, getPriority: (row: number) => 12 - row }, // 降序 11->1
					{ group: 3, start: 12, end: 18, getPriority: (row: number) => row - 11 }, // 升序 12->1
					{ group: 4, start: 20, end: 25, getPriority: (row: number) => 26 - row }, // 降序
				];
			}
			return [
				{ group: 1, start: 1, end: 5, getPriority: (row: number) => row }, // 升序
				{ group: 2, start: 7, end: 12, getPriority: (row: number) => 13 - row }, // 降序
				{ group: 3, start: 13, end: 18, getPriority: (row: number) => row - 12 }, // 升序
				{ group: 4, start: 20, end: 25, getPriority: (row: number) => 26 - row }, // 降序
			];
		}

		function getGroup(col: number, row: number) {
			const matched = getGroupRules(col).find(rule => row >= rule.start && row <= rule.end);
			return matched?.group ?? null;
		}

		function getPriority(col: number, row: number) {
			const matched = getGroupRules(col).find(rule => row >= rule.start && row <= rule.end);
			return matched ? matched.getPriority(row) : null;
		}

		const groupsPerLay = Array.from({ length: 17 }, (_, index) => getGroupRules(index + 1).length).reduce((sum, count) => sum + count, 0);

		function getGroupIndex(lay: number, col: number, group: number) {
			let groupsBeforeCol = 0;
			for (let currentCol = 1; currentCol < col; currentCol++) {
				groupsBeforeCol += getGroupRules(currentCol).length;
			}
			return (lay - 1) * groupsPerLay + groupsBeforeCol + group;
		}

		for (const item of fDocs) {
			n++;
			const lay = Number(item.lay__c);
			const col = Number(item.col__c);
			const row = Number(item.row__c);
			const group = getGroup(col, row);
			const priority = getPriority(col, row);
			if (group == null || priority == null) continue;
			const groupIndex = getGroupIndex(lay, col, group);
			const groupId = `GROUP_${String(groupIndex).padStart(2, "0")}`;
			await db.updateOne("hk_mater_stock__c", item._id, { group_id__c: groupId, priority__c: priority });
		}
	};

	Product_Update_Stock_Group_Product = async (ctx: Context) => {
		const db = ctx.mongo;

		// ! 更新 冷藏库还是冷冻库
		let tableName = "hk_chilled_stock__c";
		const fDocs = await db.find(tableName, { query: {}, sort: { lay__c: 1, col__c: 1, row__c: 1 } });

		let n = 1;
		const specialMergeCols = new Set([1, 6, 7, 13]);

		function getGroupRules(col: number) {
			if (specialMergeCols.has(col)) {
				return [
					{ group: 1, start: 1, end: 7, getPriority: (row: any) => row },
					{ group: 2, start: 9, end: 17, getPriority: (row: number) => row - 8 },
					{ group: 3, start: 19, end: 24, getPriority: (row: number) => 25 - row },
				];
			}
			return [
				{ group: 1, start: 1, end: 7, getPriority: (row: any) => row },
				{ group: 2, start: 9, end: 13, getPriority: (row: number) => 14 - row },
				{ group: 3, start: 14, end: 17, getPriority: (row: number) => row - 13 },
				{ group: 4, start: 19, end: 24, getPriority: (row: number) => 25 - row },
			];
		}

		function getGroup(col: number, row: number) {
			const matched = getGroupRules(col).find(rule => row >= rule.start && row <= rule.end);
			return matched?.group ?? null;
		}

		function getPriority(col: number, row: number) {
			const matched = getGroupRules(col).find(rule => row >= rule.start && row <= rule.end);
			return matched ? matched.getPriority(row) : null;
		}

		const groupsPerLay = Array.from({ length: 18 }, (_, index) => getGroupRules(index + 1).length).reduce((sum, count) => sum + count, 0);

		function getGroupIndex(lay: number, col: number, group: number) {
			let groupsBeforeCol = 0;
			for (let currentCol = 1; currentCol < col; currentCol++) {
				groupsBeforeCol += getGroupRules(currentCol).length;
			}
			return (lay - 1) * groupsPerLay + groupsBeforeCol + group;
		}

		for (const item of fDocs) {
			n++;

			const lay = Number(item.lay__c);
			const col = Number(item.col__c);
			const row = Number(item.row__c);
			const group = getGroup(col, row);
			const priority = getPriority(col, row);
			if (group == null || priority == null) continue;
			const groupIndex = getGroupIndex(lay, col, group);
			const groupId = `GROUP_${String(groupIndex).padStart(2, "0")}`;

			await db.updateOne(tableName, item._id, { group_id__c: groupId, priority__c: priority });
		}
	};
}

export default new App();
