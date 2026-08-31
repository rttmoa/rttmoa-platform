import { Context } from "koa";
import Basic from "../../basic";
import _ from "lodash";
import { time, time_h, time_horizontal } from "@/src/utils";
import { Distribution_Raw_Material } from "../wms_assign_material/assign_material";
import { Distribution_Raw_Product_Freezing } from "./assign_product_freezing";
const t = time;
import mssql from "mssql";
import { Distribution_Raw_Product_Chilled } from "./assign_product_chilled";
import { OutWarehouse } from "./out_assign_product";
import TransFer from "../globalConfig";
const path = require("path");
const fs = require("fs");

const sqlConfig: any = {
	user: "sa",
	password: "12345678",
	server: "10.30.41.77",
	database: "StoreSystem",
	encrypt: false,
	connectionTimeout: 5000,
};

let chuyuPoolPromise: Promise<any> | null = null;
const getChuyuPool = async () => {
	if (!chuyuPoolPromise) {
		chuyuPoolPromise = mssql.connect(sqlConfig);
	}
	try {
		return await chuyuPoolPromise;
	} catch (err: any) {
		chuyuPoolPromise = null;
		throw err;
	}
};

class App extends Basic {
	constructor() {
		super();
	}

	ByPalletGetChuYu = async (ctx: Context, pallet: string) => {
		try {
			async function fetchSQLData(pallet: string) {
				try {
					await getChuyuPool();
					let initArr: any = [];
					const result = await mssql.query`SELECT * FROM PalletMessageS WHERE  PalletID=${pallet}`;
					const palletInfoArr = result?.recordset || [];
					console.log("Users from SQL Server:", palletInfoArr);
					// [
					// 	{
					// 		ID: "12",
					// 		PalletID: "P004566",
					// 		Barcode: "16949213340101260428082344010004",
					// 		Statuas: 1,
					// 		BoxStamp: "2026-04-03T00:00:00.000Z",
					// 		nProduct_ID: "1",
					// 	},
					// ];
					if (palletInfoArr.length) {
						const productIds = palletInfoArr.filter((item: any) => item.Statuas == 1);

						try {
							// 保存数据出错、不影响后续程序执行！
							const pallet_id = String(productIds[0].PalletID); // 文件名：托盘号
							const storeContent = productIds; // 需要存储的数据
							const filename = `${time_horizontal()}_${pallet_id || ""}.json`; // 文件名：时间+托盘号
							const filePath = path.join("D:", "api_accept_Chuyu", filename); // 文件夹名
							const dir = path.dirname(filePath);
							if (!fs.existsSync(dir)) {
								fs.mkdirSync(dir, { recursive: true });
							}
							const dataToSave = JSON.stringify(storeContent, null, 2);
							fs.writeFileSync(filePath, dataToSave, "utf8");
						} catch (error: any) {
							console.error("保存数据时出错:", error);
						}

						if (productIds.length) {
							function formatUTC(boxStampStr: string) {
								const date = new Date(boxStampStr);
								const year = date.getUTCFullYear();
								const month = String(date.getUTCMonth() + 1).padStart(2, "0");
								const day = String(date.getUTCDate()).padStart(2, "0");
								const hours = String(date.getUTCHours()).padStart(2, "0");
								const minutes = String(date.getUTCMinutes()).padStart(2, "0");
								const seconds = String(date.getUTCSeconds()).padStart(2, "0");
								return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
							}

							for (const element of productIds) {
								const result2 = await mssql.query`SELECT TOP 1000 [ID], [ProductName], [ProductCode], [Describe] FROM [StoreSystem].[dbo].[Products] WHERE ID = ${element.nProduct_ID}`;
								const d2 = result2?.recordset || [];
								// const d2 = [
								// 	{
								// 		ID: "4",
								// 		ProductName: "夫妻肺片（牛肉）",
								// 		ProductCode: "16949",
								// 		Describe: "432425266",
								// 	},
								// ];
								let weight: any = 0;
								let production_date = "";
								const barcode = String(element?.Barcode || "");
								if (barcode.length >= 28 && barcode.length <= 32) {
									const weightStr = String(barcode.substring(5, 10));
									weight = Number(`${weightStr.substring(0, 2)}.${weightStr.substring(2)}`);
									const date = barcode.substring(14, 20);
									production_date = `20${date.substring(0, 2)}-${date.substring(2, 4)}-${date.substring(4, 6)}`;
								}
								let baseObj = {
									pallet__c: element.PalletID,
									barcode__c: element.Barcode,
									product_id__c: element.nProduct_ID,
									production_date__c: production_date,
									weight__c: weight,
									product_time: formatUTC(String(element.BoxStamp)),
								};
								if (d2.length) {
									const ProductInfo = d2[0];
									initArr.push({ ...baseObj, material_code__c: ProductInfo.ProductCode, material_name__c: ProductInfo.ProductName });
								} else {
									initArr.push({ ...baseObj, material_code__c: "", material_name__c: "" });
								}
							}
							await mssql.query`UPDATE PalletMessageS SET Statuas = 4 WHERE PalletID = ${pallet}`;
							console.log("更新成功");
						}
					}
					return initArr;
				} catch (err: any) {
					console.error("Error fetching data from SQL Server:", err.message);
				}
			}
			const result: any = await fetchSQLData(pallet);
			return result || [];
		} catch (err: any) {
			return [];
		}
	};

	checkPallet = (docs: any) => {
		let materialCodeArr = [];
		let materNameArr = [];
		let producttionDateArr = [];
		let weightArr = [];
		for (const item of docs) {
			materialCodeArr.push(item.material_code__c || "");
			materNameArr.push(item.material_name__c || "");
			producttionDateArr.push(item.production_date__c || "");
			weightArr.push(item.weight__c || 0);
		}

		function checkUniqueNotFalsy(arr: any) {
			const unique = [...new Set(arr)];
			return unique.length === 1 && unique[0] !== "" && unique[0] !== 0;
		}
		if (!checkUniqueNotFalsy(materialCodeArr)) {
			return { success: false, message: "获取初禹系统，物料代码不为空，且等于一种" };
		} else if (!checkUniqueNotFalsy(materNameArr)) {
			return { success: false, message: "获取初禹系统，物料名称不为空，且等于一种" };
		} else if (!checkUniqueNotFalsy(producttionDateArr)) {
			return { success: false, message: "获取初禹系统，生产日期不为空，且等于一种" };
		}

		for (const element of weightArr) {
			if (element == 0) {
				return { success: false, message: "获取初禹系统，物料重量存在等于0的数据" };
			}
		}

		let materialCode = materialCodeArr[0];
		let materialName = materNameArr[0];
		let production_date = producttionDateArr[0];

		return { success: true, data: { materialCode, materialName, production_date } };
	};

	ByChuYuGetMaterInfo = async (db: any, ChuyuData: any, hk_product_chuyu__c: any, area: string) => {
		let success = true;
		let message = "";
		let materialCode = "";
		let materialName = "";
		let production_date = "";
		let batch = "";
		if (ChuyuData.length > 0) {
			// 2、校验同一个托盘是否是同一种物料代码、物料名称、生产日期
			let stauts = "";
			const checkData: any = this.checkPallet(ChuyuData);
			if (checkData?.success) {
				materialCode = checkData?.data.materialCode;
				materialName = checkData?.data.materialName;
				production_date = checkData?.data.production_date; // 生产日期
				stauts = "已创建";

				batch = ``;
			} else {
				stauts = "数据异常";
			}

			let count = 1;
			for (const element of ChuyuData) {
				await db.insertOne("hk_product_chuyu__c", {
					time__c: time(),
					pallet__c: element.pallet__c,
					barcode__c: element.barcode__c,
					product_id__c: element.product_id__c,
					material_code__c: element.material_code__c,
					material_name__c: element.material_name__c,
					production_date__c: element.production_date__c, // 生产日期
					weight__c: element.weight__c,
					stack_time__c: element.product_time, // 码垛时间
					area__c: area,
					status__c: stauts,
					count__c: count++,
					batch__c: batch,
				});
			}
			if (stauts == "数据异常") {
				success = false;
				message = `创建任务错误：${checkData.message}`;
			}
		} else if (hk_product_chuyu__c.length > 0) {
			materialCode = hk_product_chuyu__c[0]?.material_code__c;
			materialName = hk_product_chuyu__c[0]?.material_name__c;
			production_date = hk_product_chuyu__c[0]?.production_date__c;
		}

		return {
			success,
			message,
			materialCode,
			materialName,
			production_date,
		};
	};

	static async writeInterfaceReceive(ctx: Context, insInfo: any) {
		const Record = async (obj: any) => await ctx.mongo.insertOne("hk_product_interface_record__c", { ...insInfo, ...obj });
		const UpdateRecord = async (id: string, obj: any) => await ctx.mongo.updateOne("hk_product_interface_record__c", id, { ...obj });
		const ErrorInfo = async (obj: any) => await ctx.mongo.insertOne("hk_product_interface_record__c", { ...insInfo, ...obj });
		return { Record, UpdateRecord, ErrorInfo };
	}

	receive_wcs_raw_Product = async (ctx: Context) => {
		const tt = { time__c: time() };
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const site = data?.site;
		const siteConfigMap: any = {
			B01: { area: "冷冻库", stockName: "hk_freezing_stock__c", stockDetailName: "hk_freezing_stock_detail__c" },
			B02: { area: "冷冻库", stockName: "hk_freezing_stock__c", stockDetailName: "hk_freezing_stock_detail__c" },
			B03: { area: "冷藏库", stockName: "hk_chilled_stock__c", stockDetailName: "hk_chilled_stock_detail__c" },
			B04: { area: "冷藏库", stockName: "hk_chilled_stock__c", stockDetailName: "hk_chilled_stock_detail__c" },
		};
		const siteConfig = siteConfigMap[site];

		const insInfo = {
			time__c: time(),
			interface_name__c: "成品库入库申请",
			params__c: `${data?.pallet} , ${site}, ${siteConfig?.area || ""}`,
			desc__c: "", // 描述
			error_info__c: "", // 失败原因
		};
		const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
		const interfaceId = await Record({ desc__c: "WCS入库申请上报托盘号" });

		const fail = async (message: string) => {
			const results = { success: false, message };
			await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: message });
			return ctx.send(results);
		};

		const sendSuccess = async (area: string, pallet: string, Stock: any, taskId: string) => {
			const wcsData = { pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId };
			const responseData = { ...wcsData, area__c: area };
			await UpdateRecord(interfaceId, { status__c: "成功", success_info__c: `WCS入库申请，【${area}】WMS返回托盘数据 ${JSON.stringify(wcsData)}` });
			return ctx.send({
				success: true,
				message: `处理完成：库位分配成功  托盘号：${pallet}`,
				data: responseData,
			});
		};

		const makeInstruction = () => `2${Math.floor(1e9 + Math.random() * 9e9).toString()}`;

		const allocateStock = async (area: string, params: any) => {
			if (area == "冷冻库") {
				return Distribution_Raw_Product_Freezing(params, db, data?.height, site); // 只按照批次去分配库位
			}
			if (area == "冷藏库") {
				return Distribution_Raw_Product_Chilled(params, db, data?.height, site); // 只按照批次去分配库位
			}
			return null;
		};

		// 创建
		const createInboundTask = async ({ area, stockName, params, taskType = "入库任务", beforeCreateTask }: any) => {
			const pallet = params.pallet__c;
			const existsStocks = await db.find(stockName, { query: { pallet__c: pallet } });
			if (existsStocks.length == 1) {
				const message = existsStocks[0].shelf_status__c == "预占用" ? "分配错误：此托盘已经分配过货位了！" : "分配错误：此托盘在库中已有库存了！";
				return fail(message);
			}
			if (existsStocks.length > 1) {
				return fail("分配错误：此托盘在库存中有两条数据！");
			}

			const res: any = await allocateStock(area, params);
			if (!res?.success) {
				return fail("分配错误：没有空库位了");
			}

			const position = res?.data?.position__c;
			const stockDocs = await db.find(stockName, { query: { position__c: position } });
			const Stock = stockDocs[0];
			if (!Stock) {
				return fail("分配错误：根据分配库位未找到货架数据");
			}

			if (beforeCreateTask) {
				await beforeCreateTask(Stock);
			}

			await db.updateOne(stockName, Stock._id, {
				time__c: time(),
				shelf_status__c: "预占用",
				pallet__c: pallet,
				material_name__c: params.material_name__c,
				material_code__c: params.material_code__c,
				production_date__c: params.production_date__c,
				batch__c: params.batch__c,
			});

			const taskInfo = {
				...tt,
				loc_start__c: "xxx",
				loc_dest__c: Stock.position__c,
				group_id__c: Stock.group_id__c,
				priority__c: Stock.priority__c,
				...params,
				area__c: params.area__c, // 库区
				instruct_origin__c: "上位自动",
				cmdtype__c: "入库任务",
				task_type__c: taskType,
				send_wcs__c: "已下发WCS",
			};

			await db.insertOne("hk_product_task__c", {
				...taskInfo,
				status__c: "正在执行",
			});
			await db.insertOne("hk_product_wcs_task__c", {
				...taskInfo,
				status__c: "已下发WCS",
			});

			return sendSuccess(area, pallet, Stock, params.instruction__c);
		};

		const createSapInboundTask = async (area: string, stockName: string, ChuyuData: any[], hk_product_chuyu__c: any[]) => {
			const checkData: any = await this.ByChuYuGetMaterInfo(db, ChuyuData, hk_product_chuyu__c, area);
			if (!checkData?.success) {
				return fail(checkData?.message || "创建任务错误：初禹数据校验失败");
			}

			const { materialCode, materialName, production_date } = checkData;
			const doc_detail = await db.find("hk_product_doc_detail__c", { query: { document_type__c: "生产入库单", cmdtype__c: "入库任务", material_code__c: materialCode, production_date__c: production_date, status__c: "正在执行" } });
			if (doc_detail.length == 0) {
				return fail("根据初禹数据在【成品库SAP单据详情表】未找到手动创建的手动任务！");
			}
			const docDetail = doc_detail?.[0];
			let batch = "";
			if (docDetail.batch__c) {
				batch = docDetail.batch__c;
			} else {
				const batch_data = (await TransFer.Common_global_latest_Batch(ctx, production_date, `成品库更新批号: 采购订单号：${docDetail.document_id__c} 物料代码：${docDetail.material_code__c}`)) as any;
				batch = batch_data.insertData.latest_batch__c; // 2606100001
			}

			const pallet = data.pallet || Math.floor(1e9 + Math.random() * 9e9).toString();
			const instruction = makeInstruction();
			const params = {
				time__c: time(),
				material_code__c: materialCode,
				material_name__c: materialName,
				production_date__c: production_date,
				batch__c: batch,
				area__c: area,
				pallet__c: pallet,
				instruct_type__c: "入库任务",
				instruction__c: instruction,
				taskno__c: instruction,
				doc_instruction__c: docDetail.doc_instruction__c,
			};

			return createInboundTask({
				area,
				stockName,
				params,
				taskType: "入库任务",
				beforeCreateTask: async () => {
					const cyData = await db.find("hk_product_chuyu__c", { query: { pallet__c: data?.pallet, status__c: "已创建" } });
					for (const element of cyData) {
						await db.updateOne("hk_product_chuyu__c", element._id, {
							status__c: "正在入库",
							batch__c: params.batch__c,
							area__c: params.area__c,
							doc_instruction__c: docDetail.doc_instruction__c,
							document_id__c: docDetail.document_id__c,
						});
					}
					await db.updateOne("hk_product_doc_detail__c", docDetail._id, { material_name__c: params.material_name__c, batch__c: batch });
				},
			});
		};

		if (!data?.pallet || !site || !siteConfig) {
			return fail(`参数错误：当前参数为： pallet: ${data?.pallet},  site:${site}`);
		}

		if (["B02", "B03"].includes(site)) {
			const existStocks = await db.find(siteConfig.stockName, { query: { pallet__c: data?.pallet } });
			if (existStocks.length > 0) {
				return fail("分配错误：此托盘已经分配过货位了！");
			}

			// 1、查询初禹数据库取数据
			const ChuyuData: any = await this.ByPalletGetChuYu(ctx, data?.pallet);
			const hk_product_chuyu__c = await db.find("hk_product_chuyu__c", { query: { pallet__c: data?.pallet, status__c: "已创建" } });
			if (ChuyuData.length == 0 && hk_product_chuyu__c.length == 0) {
				return fail("创建任务错误：根据托盘号获取不到初禹数据");
			}

			return createSapInboundTask(siteConfig.area, siteConfig.stockName, ChuyuData, hk_product_chuyu__c);
		}

		// B01/B04：优先处理盘点回库、半托回库；没有库存详情时，按手动收货入库处理。
		const pallet = data?.pallet;
		const stock = await db.find(siteConfig.stockName, { query: { pallet__c: pallet } });
		if (stock.length > 0) {
			return fail(`此托盘号在${siteConfig.area}货架表中存在数据：托盘未出库，货架状态为：${stock[0].shelf_status__c}`);
		}

		const stockDetail = await db.find(siteConfig.stockDetailName, { query: { pallet__c: pallet, stock_status__c: { $in: ["盘点（已出库）", "已出库（有库存）"] } } });
		if (stockDetail.length > 1) {
			return fail(`此托盘号在${siteConfig.area}库存详情表表中库存错误，有多条托盘记录！`);
		}

		// * 半托回库 * 盘点回库
		if (stockDetail.length == 1) {
			const element = stockDetail[0];
			const taskTypeMap: any = {
				"盘点（已出库）": "盘点回库",
				"已出库（有库存）": "半托回库",
			};
			const taskType = taskTypeMap[element.stock_status__c];
			if (!taskType) {
				return fail(`此托盘号在${siteConfig.area}库存详情表表中货位状态为：${element.stock_status__c}, 托盘未出库！`);
			}

			const instruction = makeInstruction();
			const params = {
				area__c: siteConfig.area,
				material_name__c: element.material_name__c,
				material_code__c: element.material_code__c,
				production_date__c: element.production_date__c,
				batch__c: element.batch__c,
				pallet__c: pallet,
				instruct_type__c: "入库任务",
				instruction__c: instruction,
				taskno__c: instruction,
			};

			return createInboundTask({
				area: siteConfig.area,
				stockName: siteConfig.stockName,
				params,
				taskType,
				beforeCreateTask: async () => {
					await db.updateOne(siteConfig.stockDetailName, element._id, { stock_status__c: "正在入库" });
				},
			});
		}

		// 1、查询初禹数据库取数据
		// const ChuyuData: any = await this.ByPalletGetChuYu(ctx, data?.pallet);
		const hk_product_chuyu__c = await db.find("hk_product_chuyu__c", { query: { pallet__c: data?.pallet, status__c: "已创建" } });
		if ( hk_product_chuyu__c.length == 0) {
			return fail(`创建任务错误：托盘号：${data?.pallet} 未使用手持机收货！`);
		}

		return createSapInboundTask(siteConfig.area, siteConfig.stockName, [], hk_product_chuyu__c);
	};

	enter_receive_pallet_task_finish = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		// ! cmdtype:  0-入库完成, 1-出库完成, 2-冷藏半托回库，3-冷冻半托回库

		const pallet = data?.pallet;
		const taskId = data?.taskId;
		const insInfo = {
			time__c: time(),
			interface_name__c: "成品库任务完成接口",
			params__c: data?.taskId,
			desc__c: "",
		};
		let msg = "";
		const { Record, UpdateRecord, ErrorInfo } = await App.writeInterfaceReceive(ctx, insInfo);
		const interfaceId = await Record({ desc__c: "WCS入库出库完成上报指令号" });

		if (taskId) {
			const findTaskNo = await db.find("hk_product_wcs_task__c", { query: { taskno__c: taskId }, sort: { time__c: -1 } });
			if (findTaskNo.length == 0) {
				let results = { success: false, message: `任务错误：根据未找到数据数据`, cmdType: "" };
				await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
				return ctx.send(results);
			}

			const cmdType = findTaskNo[0].cmdtype__c;
			const taskType = findTaskNo[0].task_type__c; // 任务类型
			if (cmdType == "入库任务") {
				const instruction__c = findTaskNo[0].instruction__c;
				const doc_instruction__c = findTaskNo[0].doc_instruction__c;

				if (taskType == "入库任务") {
					const fDocs = await db.find("hk_product_task__c", { query: { instruction__c: instruction__c, status__c: "正在执行" }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const hkTask = fDocs[0];
						const pallet = hkTask.pallet__c;

						let stockName = "";
						let stockDetailName = "";
						let stockDetailBarcodeName = "";

						if (hkTask.area__c == "冷冻库") {
							stockName = "hk_freezing_stock__c";
							stockDetailName = "hk_freezing_stock_detail__c";
							stockDetailBarcodeName = "hk_freezing_stock_detail_barcode__c";
						} else if (hkTask.area__c == "冷藏库") {
							stockName = "hk_chilled_stock__c";
							stockDetailName = "hk_chilled_stock_detail__c";
							stockDetailBarcodeName = "hk_chilled_stock_detail_barcode__c";
						}

						const Stocks = await db.find(stockName, { query: { pallet__c: pallet, shelf_status__c: "预占用" }, sort: { time__c: -1 } });
						if (Stocks.length) {
							const stock = Stocks[0];

							await db.updateOne("hk_product_task__c", hkTask._id, { status__c: "已完成" });

							await db.updateOne(stockName, stock._id, { time__c: time(), shelf_status__c: "占用", pallet_status__c: "在库" });

							const ChuYu = await db.find("hk_product_chuyu__c", { query: { pallet__c: pallet, status__c: "正在入库" }, sort: { time__c: -1 } });
							if (ChuYu.length) {
								const Instruction_BarCode = `6${Math.floor(1e9 + Math.random() * 9e9).toString()}`;

								let piece = 0;
								let entryWay = ""
								if (ChuYu.length == 1) {
									if (!ChuYu[0].barcode__c) {
										piece = ChuYu[0].count__c;
										entryWay = "手动无码入库"
									} else {
										piece = ChuYu.length;
										entryWay = "自动扫码入库"
									}
								} else {
									piece = ChuYu.length;
									entryWay = "自动扫码入库"
								}

								let allWeight = 0; // 总重量
								let n = 1;
								for (const item of ChuYu) {
									allWeight = Number((Math.round((Number(allWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));

									await db.insertOne(stockDetailBarcodeName, {
										time__c: time(),
										instruction__c: Instruction_BarCode,
										pallet__c: stock.pallet__c,
										weight__c: item?.weight__c,
										production_date__c: item?.production_date__c,
										batch__c: item?.batch__c,
										barcode__c: item?.barcode__c,
										barcode_quantity__c: n++,
										desc__c: "",
									});
									await db.updateOne("hk_product_chuyu__c", item._id, { status__c: "入库完成" });
								}

								// 下发WCS表
								const wcsTask = await db.find("hk_product_wcs_task__c", { query: { pallet__c: pallet }, sort: { time__c: -1 } });
								if (wcsTask.length) {
									for (const item of wcsTask) {
										await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "任务已完成" });
									}
								}

								const orderInfo = await db.find("hk_product_doc_detail__c", { query: { doc_instruction__c: doc_instruction__c }, sort: { time__c: -1 } });
								const Order = orderInfo?.[0];

								await db.insertOne(stockDetailName, {
									time__c: time(),
									loc_name__c: stock.loc_name__c,
									position__c: stock.position__c,
									row__c: stock.row__c,
									col__c: stock.col__c,
									lay__c: stock.lay__c,
									pallet__c: stock.pallet__c,
									group_id__c: stock.group_id__c,
									priority__c: stock.priority__c,

									stock_status__c: "在库",

									document_id__c: Order?.document_id__c,
									document_type__c: Order?.document_type__c,

									material_name__c: ChuYu[0]?.material_name__c,
									material_code__c: ChuYu[0]?.material_code__c,
									production_date__c: ChuYu[0]?.production_date__c, // 生产日期
									batch__c: Order?.batch__c, // 批次为空

									contract__c: Order?.contract__c,
									cabinet__c: Order?.cabinet__c,
									is_tax__c: Order?.is_tax__c, // 是否保税
									cars_info__c: Order?.cars_info__c,
									supplier__c: Order?.supplier__c,

									entry_stock_date__c: Order?.entry_stock_date__c,
									arrival_date__c: Order?.arrival_date__c,

									now_quantity__c: piece, // 当前箱数
									final_quantity__c: piece,

									weight__c: allWeight, // 当托重量
									final_weight__c: allWeight,
									enter_way__c: entryWay,

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
					// 更新 货架表 状态 占用
					// 更新 库存表 状态 在库 + 组号+仓位+位置名称
					const fDocs = await db.find("hk_product_task__c", { query: { instruction__c: instruction__c, status__c: "正在执行" }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const hkTask = fDocs[0];
						const pallet = hkTask.pallet__c;

						let stockName = "";
						let stockDetailName = "";
						let stockDetailBarcodeName = "";

						if (hkTask.area__c == "冷冻库") {
							stockName = "hk_freezing_stock__c";
							stockDetailName = "hk_freezing_stock_detail__c";
							stockDetailBarcodeName = "hk_freezing_stock_detail_barcode__c";
						} else if (hkTask.area__c == "冷藏库") {
							stockName = "hk_chilled_stock__c";
							stockDetailName = "hk_chilled_stock_detail__c";
							stockDetailBarcodeName = "hk_chilled_stock_detail_barcode__c";
						}

						const Stocks = await db.find(stockName, { query: { pallet__c: pallet, shelf_status__c: "预占用" }, sort: { time__c: -1 } });
						if (Stocks.length) {
							const stock = Stocks[0];

							await db.updateOne("hk_product_task__c", hkTask._id, { status__c: "已完成" });

							await db.updateOne(stockName, stock._id, { time__c: time(), shelf_status__c: "占用", pallet_status__c: "在库" });

							const wcsTask = await db.find("hk_product_wcs_task__c", { query: { pallet__c: pallet }, sort: { time__c: -1 } });
							if (wcsTask.length) {
								for (const item of wcsTask) {
									await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "任务已完成" });
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
					const fDocs = await db.find("hk_product_wcs_task__c", { query: { taskno__c: instruction__c }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const element = fDocs[0];

						await db.updateOne("hk_product_wcs_task__c", element._id, { status__c: "任务已完成" });

						let stockName = "";
						let stockDetailName = "";
						if (element.area__c == "冷藏库") {
							stockName = "hk_chilled_stock__c";
							stockDetailName = "hk_chilled_stock_detail__c";
						} else if (element.area__c == "冷冻库") {
							stockName = "hk_freezing_stock__c";
							stockDetailName = "hk_freezing_stock_detail__c";
						}

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
					const fDocs = await db.find("hk_product_wcs_task__c", { query: { taskno__c: instruction__c }, sort: { time__c: -1 } });
					if (fDocs.length) {
						const element = fDocs[0];

						await db.updateOne("hk_product_wcs_task__c", element._id, { status__c: "任务已完成" });

						let stockName = "";
						let stockDetailName = "";
						if (element.area__c == "冷藏库") {
							stockName = "hk_chilled_stock__c";
							stockDetailName = "hk_chilled_stock_detail__c";
						} else if (element.area__c == "冷冻库") {
							stockName = "hk_freezing_stock__c";
							stockDetailName = "hk_freezing_stock_detail__c";
						}

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

						const stockD = await ctx.mongo.find(stockDetailName, { query: { pallet__c: element.pallet__c } });
						if (stockD.length) {
							await db.updateOne(stockDetailName, stockD[0]._id, {
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

				const fDocs = await db.find("hk_product_wcs_task__c", { query: { taskno__c: instruction__c }, sort: { time__c: -1 } });
				if (fDocs.length) {
					const element = fDocs[0];
					// console.log("element", element);
					// return;
					await db.updateOne("hk_product_wcs_task__c", element._id, { status__c: "任务已完成" });

					//  {
					// 	_id: '6a43b2e22a300712588e9fc7',
					// 	time__c: '2026/06/30 20:13:22',
					// 	instruction__c: '660292233',
					// 	taskno__c: '775893457856',
					// 	pallet__c: 'YL7625090280',
					// 	loc_start__c: '011503',
					// 	loc_dest__c: '061303',
					// 	group_id__c: 'GROUP_138',
					// 	priority__c: 3,
					// 	area__c: '冷冻库',
					// 	instruct_origin__c: '上位自动',
					// 	cmdtype__c: '移库任务',
					// 	task_type__c: '移库任务',
					// 	status__c: '任务发送异常',
					// 	desc__c: 'timeout of 3000ms exceeded',
					// 	space: '61c51b8f4cada30031994f3d',
					// 	created_by: '63dc7de4902db72a48e718f2',
					// 	owner: '63dc7de4902db72a48e718f2',
					// 	created: 2026-06-30T12:13:22.926Z,
					// 	lastModified: 2026-06-30T12:13:45.082Z,
					// 	send_time__c: '2026/06/30 20:13:45'
					// }

					// 获取起始位置 更新起始位置数据

					// 获取终点位置 更新终点位置数据

					// 将终点位置 信息更新到 库存中
					let area = "";

					let stockName = "";
					let stockDetailName = "";
					if (element.area__c == "冷冻库") {
						stockName = "hk_freezing_stock__c";
						stockDetailName = "hk_freezing_stock_detail__c";
					} else if (element.area__c == "冷藏库") {
						stockName = "hk_chilled_stock__c";
						stockDetailName = "hk_chilled_stock_detail__c";
					}

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

	// WCS上报出库完成接口
	Out_Stock_Task_Success_Product = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const insInfo = {
			time__c: time(),
			interface_name__c: "成品库出库-WCS上报下发四向车成功",
			params__c: data?.taskId,
			desc__c: "",
		};
		let msg = "";
		const { Record, ErrorInfo } = await App.writeInterfaceReceive(ctx, insInfo);
		await Record({ desc__c: "WCS上报-四项车任务发送成功完成上报指令号" });

		const taskId = data?.taskId;

		const fDocs = await db.find("hk_product_wcs_task__c", { query: { taskno__c: taskId }, sort: { time__c: -1 } });
		if (fDocs.length) {
			await db.updateOne("hk_product_wcs_task__c", fDocs[0]._id, {
				status__c: "已下发WCS,WCS上报成功",
			});
			let results = { success: true, message: "任务更新完成" };
			return ctx.send(results);
		} else {
			let results = { success: false, message: "根据传递的指令号未找到【成品发送WCS任务】中的任务" };
			return ctx.send(results);
		}
	};

	// WCS上报出库完成接口
	Out_receive_pallet_task_finish = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const insInfo = {
			time__c: time(),
			interface_name__c: "成品库出库-WCS上报出库完成",
			params__c: data?.taskId,
			desc__c: "",
		};
		let msg = "";
		const { Record, ErrorInfo } = await App.writeInterfaceReceive(ctx, insInfo);
		await Record({ desc__c: "WCS上报-出库完成" });

		const taskId = data?.taskId;

		const fDocs = await db.find("hk_product_wcs_task__c", { query: { taskno__c: taskId }, sort: { time__c: -1 } });
		if (fDocs.length) {
			await db.updateOne("hk_product_wcs_task__c", fDocs[0]._id, {
				status__c: "任务已完成",
			});
			let results = { success: true, message: "任务更新完成" };
			return ctx.send(results);
		} else {
			let results = { success: false, message: "根据传递的指令号未找到【成品发送WCS任务】中的任务" };
			return ctx.send(results);
		}
	};

	Enter_Stock_Test_Distruction = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const insInfo = {
			time__c: time(),
			interface_name__c: "成品库出库-WCS上报出库完成",
			params__c: data?.taskId,
			desc__c: "",
		};
		let msg = "";
		const { Record, UpdateRecord, ErrorInfo } = await App.writeInterfaceReceive(ctx, insInfo);
		const interfaceId = await Record({ desc__c: "WCS上报-出库完成" });

		const area__c: any = "冷冻库";
		const tt = { time__c: time() };
		const Pallet = data.pallet || Math.floor(1e9 + Math.random() * 9e9).toString();
		const Instruction = `2${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
		// 接收参数：成功或失败都需要添加上
		let params = {
			time__c: time(),
			material_code__c: "112333",
			material_name__c: "冷冻牛肉",
			production_date__c: "2026-05-20",
			batch__c: "2026-05-20",
			area__c: area__c,
			pallet__c: Pallet,
			instruct_type__c: "入库任务",
			instruction__c: Instruction,
			taskno__c: Instruction,
			doc_instruction__c: "",
		};

		if (area__c == "冷冻库") {
			const fDocs = await db.find("hk_freezing_stock__c", { query: { pallet__c: Pallet } });
			if (fDocs.length == 0) {
				const res: any = await Distribution_Raw_Product_Freezing(params, db, data?.height, data?.site); // 只按照批次去分配库位
				// return ctx.send({ success: false, message: "分配错误：没有空库位了+++++++++++++++++++++" });

				if (res?.success) {
					const position = res?.data?.position__c;
					const fDocs = await db.find("hk_freezing_stock__c", { query: { position__c: position } });
					const Stock = fDocs[0];

					// let material_name = "";
					// const cyData2 = await db.find("hk_product_chuyu__c", { query: { pallet__c: data?.pallet, status__c: "已创建" } });
					// if (cyData2.length) {
					// 	for (const element of cyData2) {
					// 		await db.updateOne("hk_product_chuyu__c", element._id, { status__c: "正在入库", batch__c: batch__c, area__c: params.area__c, doc_instruction__c, document_id__c });
					// 	}
					// }

					// await db.updateOne("hk_product_doc_detail__c", doc_detail[0]._id, {
					// 	// 更新单据中的初禹物料名称
					// 	material_name__c: params.material_name__c,
					// });

					await db.updateOne("hk_freezing_stock__c", Stock._id, {
						time__c: time(),
						shelf_status__c: "预占用",
						pallet__c: Pallet,
						material_name__c: params.material_name__c,
						material_code__c: params.material_code__c,
						production_date__c: params.production_date__c,
						batch__c: params.batch__c,
					});
					// 写入出入库任务表
					await db.insertOne("hk_product_task__c", {
						...tt,
						loc_start__c: "xxx",
						loc_dest__c: Stock.position__c,
						status__c: "正在执行",
						group_id__c: Stock.group_id__c,
						priority__c: Stock.priority__c,
						...params,
						area__c: params.area__c, // 库区
						instruct_origin__c: "上位自动",
						cmdtype__c: "入库任务",
						send_wcs__c: "已下发WCS",
					});
					await db.insertOne("hk_product_wcs_task__c", {
						...tt,
						loc_start__c: "xxx",
						loc_dest__c: Stock.position__c,
						group_id__c: Stock.group_id__c,
						priority__c: Stock.priority__c,

						...params,
						area__c: params.area__c, // 库区
						status__c: "已下发WCS",
						instruct_origin__c: "上位自动",
						cmdtype__c: "入库任务",
						send_wcs__c: "已下发WCS",
					});

					await UpdateRecord(interfaceId, { status__c: "成功", success_info__c: `WCS入库申请，【冷冻库】WMS返回托盘数据 ${JSON.stringify({ pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction })}` });

					return ctx.send({
						success: true,
						message: `处理完成：库位分配成功  托盘号：${Pallet}`,
						data: { pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction },
					});
				} else {
					const fDocs = await db.find("hk_product_task__c", { query: { pallet__c: Pallet } });
					if (fDocs.length == 0) {
						// await db.insertOne("hk_product_task__c", { ...tt, ...params, status__c: "创建任务错误", desc__c: "分配错误：没有空库位了" });
						let results = { success: false, message: "分配错误：没有空库位了" };
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					} else {
						let results = { success: false, message: "分配错误：没有空库位了" };
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					}
				}
			} else if (fDocs.length == 1) {
				const status = fDocs[0].shelf_status__c;
				if (status == "预占用") {
					let results = { success: false, message: "分配错误：此托盘已经分配过货位了！" };
					await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
					return ctx.send(results);
				} else {
					let results = { success: false, message: "分配错误：此托盘在库中已有库存了！" };
					await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
					return ctx.send(results);
				}
			} else {
				// await db.insertOne("hk_product_task__c", { ...tt, ...params, status__c: "任务异常", desc__c: "分配错误：此托盘在库存中有两条数据！" });
				let results = { success: false, message: "分配错误：此托盘在库存中有两条数据！" };
				await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
				return ctx.send(results);
			}
		} else if (area__c == "冷藏库") {
			console.log("冷藏库");
			const fDocs = await db.find("hk_chilled_stock__c", { query: { pallet__c: Pallet } });
			if (fDocs.length == 0) {
				console.log(123);
				const res: any = await Distribution_Raw_Product_Chilled(params, db, data?.height, data?.site); // 只按照批次去分配库位
				// return ctx.send({ success: false, message: "分配错误：没有空库位了+++++++++++++++++++++" });

				if (res?.success) {
					const position = res?.data?.position__c;
					const fDocs = await db.find("hk_chilled_stock__c", { query: { position__c: position } });
					const Stock = fDocs[0];

					// const cyData2 = await db.find("hk_product_chuyu__c", { query: { pallet__c: data?.pallet, status__c: "已创建" } });
					// if (cyData2.length) {
					// 	for (const element of cyData2) {
					// 		await db.updateOne("hk_product_chuyu__c", element._id, { status__c: "正在入库", batch__c: batch__c, area__c: params.area__c, doc_instruction__c, document_id__c });
					// 	}
					// }

					// await db.updateOne("hk_product_doc_detail__c", doc_detail[0]._id, {
					// 	// 更新单据中的初禹物料名称
					// 	material_name__c: params.material_name__c,
					// });

					await db.updateOne("hk_chilled_stock__c", Stock._id, {
						time__c: time(),
						shelf_status__c: "预占用",
						pallet__c: Pallet,
						material_name__c: params.material_name__c,
						material_code__c: params.material_code__c,
						production_date__c: params.production_date__c,
						batch__c: params.batch__c,
					});
					// 写入出入库任务表
					await db.insertOne("hk_product_task__c", {
						...tt,
						loc_start__c: "xxx",
						loc_dest__c: Stock.position__c,
						status__c: "正在执行",
						group_id__c: Stock.group_id__c,
						priority__c: Stock.priority__c,
						...params,
						area__c: params.area__c, // 库区
						instruct_origin__c: "上位自动",
						cmdtype__c: "入库任务",
						send_wcs__c: "已下发WCS",
					});
					await db.insertOne("hk_product_wcs_task__c", {
						...tt,
						loc_start__c: "xxx",
						loc_dest__c: Stock.position__c,
						group_id__c: Stock.group_id__c,
						priority__c: Stock.priority__c,
						...params,
						area__c: params.area__c, // 库区
						status__c: "已下发WCS",
						instruct_origin__c: "上位自动",
						cmdtype__c: "入库任务",
						send_wcs__c: "已下发WCS",
					});
					await UpdateRecord(interfaceId, { status__c: "成功", success_info__c: `WCS入库申请，【冷藏库】WMS返回托盘数据 ${JSON.stringify({ pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction })}` });
					return ctx.send({
						success: true,
						message: `处理完成：库位分配成功  托盘号：${Pallet}`,
						data: { pallet: Pallet, endNode: Stock.position__c, groupId: Stock.group_id__c, order: Stock.priority__c, taskId: Instruction },
					});
				} else {
					const fDocs = await db.find("hk_product_task__c", { query: { pallet__c: Pallet } });
					if (fDocs.length == 0) {
						// await db.insertOne("hk_product_task__c", { ...tt, ...params, status__c: "创建任务错误", desc__c: "分配错误：没有空库位了" });
						let results = { success: false, message: "分配错误：没有空库位了" };
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					} else {
						let results = { success: false, message: "分配错误：没有空库位了" };
						await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					}
				}
			} else if (fDocs.length == 1) {
				const status = fDocs[0].shelf_status__c;
				if (status == "预占用") {
					let results = { success: false, message: "分配错误：此托盘已经分配过货位了！" };
					await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
					return ctx.send(results);
				} else {
					let results = { success: false, message: "分配错误：此托盘在库中已有库存了！" };
					await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
					return ctx.send(results);
				}
			} else {
				// await db.insertOne("hk_product_task__c", { ...tt, ...params, status__c: "任务异常", desc__c: "分配错误：此托盘在库存中有两条数据！" });
				let results = { success: false, message: "分配错误：此托盘在库存中有两条数据！" };
				await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: results.message });
				return ctx.send(results);
			}
		}
	};

	Product_OutStock_Find = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("dasssssta", data?.selectedRows);

		// const docs = await db.find("hk_product_doc_detail__c", {
		// 	query: {
		// 		$and: [
		// 			{ document_type__c: { $in: ["其他出库单", "销售出库单", "需求出库单"] } },
		// 			{ cmdtype__c: "出库任务" },
		// 			{
		// 				$or: [{ status__c: "未执行" }, { status__c: null }, { status__c: { $exists: false } }],
		// 			},
		// 		],
		// 	},
		// });

		const docs = data?.selectedRows;
		if (docs.length) {
			for (const element of docs) {
				const docType = ["其他出库单", "销售出库单", "需求出库单"];
				if (docType.includes(element.document_type__c)) {
					if (element.status__c == "未执行") {
						if (element.export_way__c) {
							let area = "";
							let sotck = "";
							let stockDetail = "";
							let flowFnName = "";
							if (element.area__c == "冷冻库") {
								area = "冷冻库";
								sotck = "hk_freezing_stock__c";
								stockDetail = "hk_freezing_stock_detail__c";
								flowFnName = "handle_Outgoing_Product";
							} else if (element.area__c == "冷藏库") {
								area = "冷藏库";
								sotck = "hk_chilled_stock__c";
								stockDetail = "hk_chilled_stock_detail__c";
								flowFnName = "handle_Outgoing_Product";
							}

							let stock_D = [];
							let exportWay = element.export_way__c;
							if (exportWay == "日期先进先出") {
								stock_D = await db.find(stockDetail, {
									query: {
										material_code__c: element.material_code__c, // 只根据物料代码匹配
										stock_status__c: "在库",
									},
									sort: { production_date__c: 1 },
								});
							} else if (exportWay == "指定生产日期") {
								if (!element.production_date__c) {
									await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：出库方式，没有生产日期` });
									return ctx.send({ success: false, message: `执行错误：出库方式，没有生产日期` });
								}
								stock_D = await db.find(stockDetail, {
									query: {
										material_code__c: element.material_code__c, // 只根据物料代码匹配
										stock_status__c: "在库",
										production_date__c: element.production_date__c,
									},
									sort: { production_date__c: 1 },
								});
							} else if (exportWay == "指定组") {
								const group_id = element.export_group__c;
								stock_D = await db.find(stockDetail, {
									query: {
										material_code__c: element.material_code__c, // 只根据物料代码匹配
										stock_status__c: "在库",
										group_id__c: group_id,
									},
									sort: { production_date__c: 1 },
								});
							}

							if (stock_D.length) {
								for (const element of stock_D) {
									if (!element.batch__c) {
										await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：出库的物料中无批次！` });
										return ctx.send({ success: false, message: `执行错误：出库的物料中无批次！` });
									}
								}
							}

							// 【出库大于库存数，也要出库】
							if (stock_D.length) {
								const sumWeight = stock_D.reduce((prev, cur) => {
									return Math.round((prev +Number(cur.weight__c)) * 1000) / 1000;
								}, 0); // 50  出 10
								console.log("ssssss", sumWeight, element.quantity__c)
								if (element.quantity__c <= sumWeight) {
									// const OutWarehouse = flow.get(flowFnName) // 查询冷冻库
									const res: any = await OutWarehouse(db, stock_D, element.quantity__c, stockDetail);
									// node.warn(`出库托盘数量结果：${res.data.length}`);

									if (res?.success) {
										// 校验一下出库的托盘号是否在库存中是唯一一条
										await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "正在执行", desc__c: "" });

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
												const ids = await db.insertOne("hk_product_task__c", {
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
													is_tax__c: item?.is_tax__c, // 是否保税
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
											await db.insertOne("hk_product_wcs_task__c", {
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
											});

											const Pick = Number((Math.round((item.weight__c - item.final_weight__c) * 1000) / 1000).toFixed(3));
											await db.insertOne("hk_product_pda_outgoing__c", {
												time__c: times,
												// ducument_id__c: element.ducument_id__c, // 单号
												document_id__c: element?.document_id__c,
												document_type__c: element?.document_type__c,
												department__c: element?.department__c, // 部门

												lead_department__c: element?.lead_department__c, // 领用部门
												customer_name__c: element?.customer_name__c, // 客户名称
												customer_code__c: element?.customer_code__c, // 客户编码

												doc_instruction__c: doc_instruct,
												instruction__c: uuid6,
												area__c: area,

												material_code__c: item.material_code__c,
												material_name__c: item.material_name__c,
												batch__c: item.batch__c,
												production_date__c: item.production_date__c,

												customer__c: item?.customer__c,

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
											const fDocs = await db.find("hk_product_task__c", { query: { instruction__c: item.instruct_no__c } });
											if (fDocs.length) {
												const f2 = await db.find("hk_product_wcs_task__c", { query: { instruction__c: item.instruct_no__c } });
												await db.updateOne("hk_product_task__c", fDocs[0]._id, { desc__c: `出库任务数量：${f2.length || 0}` });
											}
										}
										return ctx.send({ success: true, message: "执行成功：查看数据信息！" });
									} else {
										await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：${res?.message}` });
										return ctx.send({ success: false, message: `执行错误：${res?.message}` });
									}
								} else {
									await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: "错误原因：出库重量大于库存重量" });
									return ctx.send({ success: false, message: `错误原因：出库重量大于库存重量` });
								}
							} else {
								await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: "错误原因：在库存中未找到匹配的物料！" });
								return ctx.send({ success: false, message: `错误原因：在库存中未找到匹配的物料！` });
							}
						} else {
							await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：没有出库方式字段：是先进先出还是指定日期` });
							return ctx.send({ success: false, message: `执行错误：没有出库方式字段：是先进先出还是指定日期！` });
						}
					} else {
						await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：执行状态必须是未执行！` });
						return ctx.send({ success: false, message: `执行错误：执行状态必须是未执行！` });
					}
				} else {
					await db.updateOne("hk_product_doc_detail__c", element._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：单据类型需是: ${docType.join(",")}` });
					return ctx.send({ success: false, message: `执行错误：单据类型需是: ${docType.join(",")}` });
				}
			}

			return ctx.send({ success: true, message: "执行成功：查看数据信息！" });
		} else {
			return ctx.send({ success: false, message: "失败：未读取到出库的任务！" });
		}
	};

	// Product_OutStock_SendWcs = async (ctx: Context) => {
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

	// 	const docs = await db.find("hk_product_task__c", {
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
	// 		const { _id } = docs[0];

	// 		const item = docs[0];
	// 		const subTask = await db.find("hk_product_wcs_task__c", { query: { instruction__c: item.instruction__c, status__c: "未下发WCS" } });
	// 		if (subTask.length) {
	// 			await db.updateOne("hk_product_task__c", _id, { send_wcs__c: "已下发WCS" }); // 更新主任务、后面async依然可以继续执行

	// 			const mapData = subTask.map(value => {
	// 				const stockLoc = value.loc_start__c;
	// 				const col__c = +stockLoc.substring(0, 2);
	// 				const row__c = +stockLoc.substring(2, 4);
	// 				const lay__c = +stockLoc.substring(4, 6);
	// 				return { row__c, col__c, lay__c, ...value };
	// 			});

	// 			const sortRes = await SortRule01_Product(mapData); // 托盘出库：按列、层、动态排规则发送

	// 			function delay(ms: number | undefined) {
	// 				return new Promise(resolve => setTimeout(resolve, ms));
	// 			}
	// 			(async () => {
	// 				for (let index = 0; index < sortRes.length; index++) {
	// 					const item = sortRes[index];
	// 					// node.warn(item);
	// 					let area = "";
	// 					if (item.area__c == "冷藏库") {
	// 						area = "B04";
	// 					} else if (item.area__c == "冷冻库") {
	// 						area = "B01";
	// 					}
	// 					const Instruction = `77${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
	// 					let data = {
	// 						pallet: item.pallet__c,
	// 						startNode: item.loc_start__c,
	// 						groupId: item.group_id__c,
	// 						order: index + 1,
	// 						taskId: Instruction,
	// 						endNode: area,
	// 					};
	// 					// node.warn(data);

	// 					// const sk = await db.find("hk_freezing_stock__c", { query: { position__c: item.loc_start__c } });
	// 					// 	if (sk.length) {
	// 					// 		await db.updateOne("hk_freezing_stock__c", sk[0]._id, { shelf_status__c: "占用" });
	// 					// 	}

	// 					// await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: "global.ge", desc__c: "" }); // 更新子任务

	// 					let url = "http://10.30.40.221:1880/api/receive/fromWms/product/popTask";
	// 					try {
	// 						const res = await axios.post(url, data, { timeout: 3000 });
	// 						if (res.status == 200) {
	// 							if (res.data.code == 200) {
	// 								await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "已下发WCS", taskno__c: Instruction, priority__c: index + 1, send_time__c: time(), desc__c: "" }); // 更新子任务
	// 							} else {
	// 								const errorMsg = res?.data?.returnInfo || res?.data?.message || `WCS返回异常，code: ${res?.data?.code ?? "未知"}`;
	// 								await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "任务发送异常", desc__c: errorMsg, taskno__c: Instruction, priority__c: index + 1, send_time__c: time() }); // 更新子任务
	// 							}
	// 						} else {
	// 							await db.updateOne("hk_product_wcs_task__c", item._id, {
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
	// 						await db.updateOne("hk_product_wcs_task__c", item._id, {
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
	// 		let results = { success: true, message: "失败：未找到 未下发的WCS任务！" };
	// 		return ctx.send(results);
	// 	}
	// };

	StockGroup = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const insInfo = {
			time__c: time(),
			interface_name__c: "成品库出库-WCS上报出库完成",
			params__c: data?.taskId,
			desc__c: "",
		};
		let msg = "";
		const { Record, ErrorInfo } = await App.writeInterfaceReceive(ctx, insInfo);
		await Record({ desc__c: "WCS上报-出库完成" });

		const fDocs = await db.find("hk_freezing_stock__c", { query: {}, sort: { lay__c: 1, col__c: 1, row__c: 1 } });
		// node.warn(fDocs);
		let n = 1;
		const specialMergeCols = new Set([1, 6, 7, 13]);

		function getGroupRules(col: number) {
			if (specialMergeCols.has(col)) {
				return [
					{ group: 1, start: 1, end: 7, getPriority: (row: number) => row },
					{ group: 2, start: 9, end: 17, getPriority: (row: number) => row - 8 },
					{ group: 3, start: 19, end: 24, getPriority: (row: number) => 25 - row },
				];
			}
			return [
				{ group: 1, start: 1, end: 7, getPriority: (row: number) => row },
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
			// node.warn(item.loc_name__c);
			n++;

			const lay = Number(item.lay__c);
			const col = Number(item.col__c);
			const row = Number(item.row__c);
			const group = getGroup(col, row);
			const priority = getPriority(col, row);
			if (group == null || priority == null) continue;
			const groupIndex = getGroupIndex(lay, col, group);
			const groupId = `GROUP_${String(groupIndex).padStart(2, "0")}`;
			await db.updateOne("hk_freezing_stock__c", item._id, { group_id__c: groupId, priority__c: priority });
		}
	};

	// WCS上报移库完成接口
	Move_receive_pallet_task_finish = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const pallet = data?.pallet;
		const instruction__c = data?.taskId;
		const insInfo = {
			time__c: time(),
			interface_name__c: "成品库移库完成",
			params__c: data?.taskId,
			desc__c: "",
		};
		let msg = "";
		const { Record, ErrorInfo } = await App.writeInterfaceReceive(ctx, insInfo);
		await Record({ desc__c: "WCS移库完成上报指令号" });

		console.log("object");
		await Record({ status__c: "成功", desc__c: "WCS 移库完成返回WCS成功" });
		let results = { success: true, message: "成功" };
		return ctx.send(results);

		if (instruction__c) {
			const Inter = Math.floor(1e9 + Math.random() * 9e9).toString();
			// console.log("object");
			// return ctx.send({ success: false, message: `任务错误：根据托 s据` });

			const fDocs = await db.find("hk_product_task__c", { query: { instruction__c: instruction__c, status__c: "正在执行" }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const hkTask = fDocs[0];
				const pallet = hkTask.pallet__c;

				if (hkTask.area__c == "冷冻库") {
					const Stocks = await db.find("hk_freezing_stock__c", { query: { pallet__c: pallet, shelf_status__c: "预占用" }, sort: { time__c: -1 } });
					if (Stocks.length) {
						const stock = Stocks[0];

						const ChuYu = await db.find("hk_product_chuyu__c", { query: { pallet__c: pallet, status__c: "正在入库" }, sort: { time__c: -1 } });
						if (ChuYu.length) {
							const Instruction_BarCode = `6${Math.floor(1e9 + Math.random() * 9e9).toString()}`;

							let instruction = ""; // 指令号
							let allWeight = 0; // 总重量
							let n = 1;
							for (const item of ChuYu) {
								allWeight += item.weight__c || 0;
								instruction = item.instruction__c;

								await db.insertOne("hk_freezing_stock_detail_barcode__c", {
									time__c: time(),
									instruction__c: Instruction_BarCode,
									pallet__c: stock.pallet__c,
									weight__c: item?.weight__c,
									production_date__c: item?.production_date__c,
									batch__c: item?.batch__c,
									barcode__c: item?.barcode__c,
									barcode_quantity__c: n++,
									desc__c: "",
								});
								await db.updateOne("hk_product_chuyu__c", item._id, { status__c: "入库完成" });
							}
							await db.updateOne("hk_product_task__c", hkTask._id, { status__c: "已完成" });
							await db.updateOne("hk_freezing_stock__c", stock._id, { time__c: time(), shelf_status__c: "占用", pallet_status__c: "在库" });

							console.log("allWeight", allWeight);

							// 下发WCS表
							const wcsTask = await db.find("hk_product_wcs_task__c", { query: { pallet__c: pallet }, sort: { time__c: -1 } });
							if (wcsTask.length) {
								for (const item of wcsTask) {
									await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "任务已完成" });
								}
							}

							const orderInfo = await db.find("hk_product_doc_detail__c", { query: { instruction__c: instruction }, sort: { time__c: -1 } });
							const Order = orderInfo?.[0] || {};

							await db.insertOne("hk_freezing_stock_detail__c", {
								time__c: time(),
								loc_name__c: stock.loc_name__c,
								position__c: stock.position__c,
								row__c: stock.row__c,
								col__c: stock.col__c,
								lay__c: stock.lay__c,
								pallet__c: stock.pallet__c,
								group_id__c: stock.group_id__c,

								stock_status__c: "在库",

								ducument_id__c: Order?.ducument_id__c,
								ducument_type__c: Order?.ducument_type__c,

								material_name__c: ChuYu[0]?.material_name__c,
								material_code__c: ChuYu[0]?.material_code__c,
								production_date__c: ChuYu[0]?.production_date__c,
								batch__c: ChuYu[0]?.batch__c,

								contract__c: Order?.contract__c,
								cabinet__c: Order?.cabinet__c,
								is_tax__c: Order?.is_tax__c, // 是否保税
								cars_info__c: Order?.cars_info__c,
								supplier__c: Order?.supplier__c,

								entry_stock_date__c: Order?.entry_stock_date__c,
								arrival_date__c: Order?.arrival_date__c,

								now_quantity__c: ChuYu.length, // 当前箱数
								final_quantity__c: ChuYu.length,

								weight__c: allWeight, // 当托重量
								final_weight__c: allWeight,

								instruction__c: Instruction_BarCode,
							});

							await Record({ status__c: "成功", desc__c: "WCS入库完成返回WCS成功" });
							let results = { success: true, message: "成功" };
							return ctx.send(results);
						} else {
							let results = { success: false, message: `任务错误：根据托盘号未在【原料手动建单托盘绑定表】中查到托盘 ${data?.pallet} 数据` };
							await ErrorInfo({ status__c: "失败", error_info__c: results.message });
							return ctx.send(results);
						}
					} else {
						let results = { success: false, message: "任务处理错误：根据托盘查询库位错误" };
						await ErrorInfo({ status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					}
				} else if (hkTask.area__c == "冷藏库") {
					const Stocks = await db.find("hk_chilled_stock__c", { query: { pallet__c: pallet, shelf_status__c: "预占用" }, sort: { time__c: -1 } });
					if (Stocks.length) {
						const stock = Stocks[0];

						const ChuYu = await db.find("hk_product_chuyu__c", { query: { pallet__c: pallet, status__c: "正在入库" }, sort: { time__c: -1 } });
						if (ChuYu.length) {
							const Instruction_BarCode = `6${Math.floor(1e9 + Math.random() * 9e9).toString()}`;

							let instruction = ""; // 指令号
							let allWeight = 0; // 总重量
							let n = 1;
							for (const item of ChuYu) {
								allWeight += item.weight__c || 0;
								instruction = item.instruction__c;

								await db.insertOne("hk_chilled_stock_detail_barcode__c", {
									time__c: time(),
									instruction__c: Instruction_BarCode,
									pallet__c: stock.pallet__c,
									weight__c: item?.weight__c,
									production_date__c: item?.production_date__c,
									batch__c: item?.batch__c,
									barcode__c: item?.barcode__c,
									barcode_quantity__c: n++,
									desc__c: "",
								});
								await db.updateOne("hk_product_chuyu__c", item._id, { status__c: "入库完成" });
							}
							await db.updateOne("hk_product_task__c", hkTask._id, { status__c: "已完成" });
							await db.updateOne("hk_chilled_stock__c", stock._id, { time__c: time(), shelf_status__c: "占用", pallet_status__c: "在库" });

							console.log("allWeight", allWeight);

							// 下发WCS表
							const wcsTask = await db.find("hk_product_wcs_task__c", { query: { pallet__c: pallet }, sort: { time__c: -1 } });
							if (wcsTask.length) {
								for (const item of wcsTask) {
									await db.updateOne("hk_product_wcs_task__c", item._id, { status__c: "任务已完成" });
								}
							}

							const orderInfo = await db.find("hk_product_doc_detail__c", { query: { instruction__c: instruction }, sort: { time__c: -1 } });
							const Order = orderInfo?.[0] || {};

							await db.insertOne("hk_chilled_stock_detail__c", {
								time__c: time(),
								loc_name__c: stock.loc_name__c,
								position__c: stock.position__c,
								row__c: stock.row__c,
								col__c: stock.col__c,
								lay__c: stock.lay__c,
								pallet__c: stock.pallet__c,
								group_id__c: stock.group_id__c,

								stock_status__c: "在库",

								ducument_id__c: Order?.ducument_id__c,
								ducument_type__c: Order?.ducument_type__c,

								material_name__c: ChuYu[0]?.material_name__c,
								material_code__c: ChuYu[0]?.material_code__c,
								production_date__c: ChuYu[0]?.production_date__c,
								batch__c: ChuYu[0]?.batch__c,

								contract__c: Order?.contract__c,
								cabinet__c: Order?.cabinet__c,
								is_tax__c: Order?.is_tax__c, // 是否保税
								cars_info__c: Order?.cars_info__c,
								supplier__c: Order?.supplier__c,

								entry_stock_date__c: Order?.entry_stock_date__c,
								arrival_date__c: Order?.arrival_date__c,

								now_quantity__c: ChuYu.length, // 当前箱数
								final_quantity__c: ChuYu.length,

								weight__c: allWeight, // 当托重量
								final_weight__c: allWeight,

								instruction__c: Instruction_BarCode,
							});

							await Record({ status__c: "成功", desc__c: "WCS入库完成返回WCS成功" });

							let results = { success: true, message: "成功" };
							return ctx.send(results);
						} else {
							let results = { success: false, message: `任务错误：根据托盘号未在【原料手动建单托盘绑定表】中查到托盘 ${data?.pallet} 数据` };
							await ErrorInfo({ status__c: "失败", error_info__c: results.message });
							return ctx.send(results);
						}
					} else {
						let results = { success: false, message: "任务处理错误：根据托盘查询库位错误" };
						await ErrorInfo({ status__c: "失败", error_info__c: results.message });
						return ctx.send(results);
					}
				} else {
					console.log("仓库类型错误");
				}
			} else {
				let results = { success: false, message: "入库完成接口：根据传递的参数为找到此托盘正在执行的任务" };
				await ErrorInfo({ status__c: "失败", error_info__c: results.message });
				return ctx.send(results);
			}
		} else {
			let results = { success: false, message: "任务处理错误：未传递指令号" };
			await ErrorInfo({ status__c: "失败", error_info__c: results.message });
			return ctx.send(results);
		}
	};
}

export default new App();
