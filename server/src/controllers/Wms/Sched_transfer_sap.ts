import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time, time_horizontal } from "@/src/utils";
import axios from "axios";
import Sap from "./Sap";
const path = require("path");
const fs = require("fs");
import TransFer from "./globalConfig";
class App extends Basic {
	constructor() {
		super();
	}

	static async writeInterfaceReceive(ctx: Context, insInfo: any) {
		const Record = async (obj: any) => await ctx.mongo.insertOne("hk_interface_sap_wms__c", { ...insInfo, ...obj });
		const UpdateRecord = async (id: string, obj: any) => await ctx.mongo.updateOne("hk_interface_sap_wms__c", id, { ...obj });
		const ErrorInfo = async (obj: any) => await ctx.mongo.insertOne("hk_interface_sap_wms__c", { ...insInfo, ...obj });
		return { Record, UpdateRecord, ErrorInfo };
	}

	// private sap_address = "http://saph4q.ziyanfoods.com:8042";
	private sap_address = "https://erp.ziyanfoods.com";

	private normalizeCookie = (cookie: any) => {
		if (!cookie) return "";
		const merged = Array.isArray(cookie) ? cookie.join("; ") : String(cookie);
		const trimmed = merged.trim();
		if (trimmed.toLowerCase().startsWith("cookie=")) return trimmed.slice("cookie=".length).trim();
		return trimmed;
	};

	private loggedTimers = new Set<string>();
	private logTimerOnce(key: string, message: string) {
		if (!this.loggedTimers.has(key)) {
			console.log(message);
			this.loggedTimers.add(key);
		}
	}

	private N_Product_send_production = 1;
	// 成品库 - 手动 - 生产入库单
	Product_send_production = async (ctx: Context) => {
		this.N_Product_send_production++;
		if (this.N_Product_send_production <= 2) {
			console.log("定时器 > 成品入库：推送 生产入库单");
		}

		const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
		if (!success) return ctx.sendError(500, message);

		const db = ctx.mongo;
		const docs = await db.find("hk_product_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: "生产入库单" },
					{ cmdtype__c: "入库任务" },
					{ status__c: "正在执行" },
					{
						$or: [{ doc_send_info__c: { $exists: false } }, { doc_send_info__c: null }, { doc_send_info__c: "" }],
					},
				],
			},
		});
		console.log("生成单据数量：", docs.length);
		if (docs.length) {
			// 推送SAP结果、 入库推送单据，入库结果回传推送
			// 推送SAP结果、出库结果回传推送

			const element = docs[0];
			const payload = {
				Matnr: element.material_code__c, // 物料代码
				Pwerk: "7600", //  工厂
				Meins: element.unit__c, // 单位
				Psmng: String(element?.quantity__c), // 订单数量
				// Aufnr: element.document_id__c, // 订单号
			};
			console.log("参数", payload);

			const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/HEADERSet`;
			try {
				const resp = await axios.post(targetUrl, payload, {
					headers: {
						"X-CSRF-Token": token,
						Cookie: this.normalizeCookie(cookie),
						"Content-Type": "application/json",
						Authorization: authHeader,
						Accept: "application/json",
					},
					validateStatus: () => true,
				});
				console.log(`时间：${time()} 推送生产入库单结果：`, resp.data);
				let resp_data2: any = "";
				resp_data2 = {
					error: {
						code: "/IWCOR/CX_DS_EDM_FACET_ERROR/005056A509B11ED1BDCCCC5E8168819D",
						message: {
							lang: "zh",
							value: "Eigenschaft 'Aufnr' an Offset '86' hat ungültigen Wert 'TASK202605260001'",
						},
						innererror: {
							application: [Object],
							transactionid: "EE8A8017AD2E00D0E006A182737A78E3",
							timestamp: "20260530010839.0114670",
							Error_Resolution: [Object],
							errordetails: [],
						},
					},
				};
				resp_data2 = {
					d: {
						__metadata: {
							id: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/HEADERSet('82707761')",
							uri: "http://saph4q.ziyanfoods.com:8042/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/HEADERSet('82707761')",
							type: "ZODATA_YUZ_002_SRV.HEADER",
						},
						Aufnr: "82707761",
						ErrCode: "0",
						ErrMsg: "订单创建成功！",
						Psmng: "5000.000",
						Meins: "KG",
						Matnr: "16957",
						Uebto: "0.0",
						Untto: "0.0",
						Pwerk: "7600",
						Lgort: "",
						Dauat: "",
						Dgltp: "",
					},
				};
				if (resp.status >= 200 && resp.status < 300) {
					const d = resp.data.d;
					const code = d.ErrCode;
					if (code == "0") {
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: resp.data.d.ErrMsg, document_id__c: d.Aufnr });
					} else {
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: `错误：${d.ErrMsg}`, document_id__c: d.Aufnr });
					}
					return ctx.send({ success: true, message: "成功", data: resp.data });
				} else {
					const error = resp.data.error;
					const error_message = resp.data.error.message.value;
					console.log("错误信息 error_message：", error_message);

					return ctx.send({ success: false, message: error_message });
				}
			} catch (err: any) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: err?.message });
				return ctx.sendError(500, err?.message || "请求 SAP 失败");
			}
		} else {
			return ctx.send({ success: true, message: "无生成订单数据" });
		}
	};

	private N_Product_o_compound = 1;
	// 成品库 - 自动 - 销售出、需求出
	Product_o_compound = async (ctx: Context) => {
		const db = ctx.mongo;

		this.N_Product_o_compound++;
		if (this.N_Product_o_compound <= 2) {
			console.log("定时器 > 成品库 - 自动 - 销售出、需求出");
		}

		const docs = await db.find("hk_product_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["销售出库单", "需求出库单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			// const element = docs[0];

			for (const element of docs) {
				if (!element.material_code__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未传递物料代码！" });
					return null;
				}
				if (!element.area__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未传递冷藏库还是冷冻库！" });
					return null;
				}
				if (!element.quantity__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未传递数量！" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未传递单位！" });
					return null;
				}

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, "0");
				const day = String(today.getDate()).padStart(2, "0");
				const formattedDate = `${year}${month}${day}`;
				const randomNum = Math.floor(Math.random() * 9000) + 1000;

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_product_doc_detail__c", element._id, {
					time__c: time(),
					desc__c: "",
					doc_instruction__c: uuid6,
					// document_id__c: `TASK${formattedDate}${randomNum}`,
					cmdtype__c: "出库任务",
					// export_way__c: "日期先进先出",
					status__c: "未执行",
				});
			}
		}
	};

	private N_material_e_manual = 1;
	// 原料库 - 手动 - 其他入
	material_e_manual = async (ctx: Context) => {
		const db = ctx.mongo;

		this.N_material_e_manual++;
		if (this.N_material_e_manual <= 2) {
			console.log("定时器 > 原料库 - 手动 - 其他入");
		}

		const docs = await db.find("hk_mater_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: "其他入库单" },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		// node.warn(docs.length);
		if (docs.length) {
			// const element = docs[0];

			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}

				// 下面是根据 原料库、原料库2、原料外租库 设置不同的字段规则
				if (element.area__c == "原料一号冻库") {
					if (!element.material_code__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】 字段" });
						return null;
					}
					if (!element.production_date__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【生产日期】 字段" });
						return null;
					}
					if (!element.country__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【国家】 字段" });
						return null;
					}
					if (!element.factory_no__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【厂号】 字段" });
						return null;
					}

					if (!element.is_tax__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【是否保税】 字段" });
						return null;
					}
					if (element.is_tax__c) {
						if (element.is_tax__c == "保税") {
							if (!element.contract__c) {
								await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "保税，无 【合同号】 字段" });
								return null;
							}
						}
						if (element.is_tax__c == "非保税") {
							if (!element.supplier__c) {
								await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "非保税，无 【供应商】 字段" });
								return null;
							}
						}
					}

					if (!element.unit__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】 字段" });
						return null;
					}

					if (!element.quantity__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】 字段" });
						return null;
					}

					// 校验生产日期
					function isValidProductionDate(dateStr: string) {
						const regex = /^\d{4}-\d{2}-\d{2}$/;
						if (!regex.test(dateStr)) return false;
						const [year, month, day] = dateStr.split("-").map(Number);
						const date = new Date(year, month - 1, day);
						return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
					}
					if (!isValidProductionDate(element.production_date__c)) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【生产日期】格式不正确，格式：2026-05-15" });
						return null;
					}

					// 格式化批号
					function formatBatchNo(prodDate: { split: (arg0: string) => [any, any, any] }) {
						const [year, month, day] = prodDate.split("-");
						return year.slice(2) + month + day;
					}
					const batch_format = formatBatchNo(element.production_date__c); // 260607

					function todayDate() {
						const today = new Date();
						const year = today.getFullYear();
						const month = String(today.getMonth() + 1).padStart(2, "0");
						const day = String(today.getDate()).padStart(2, "0");
						const formattedDate = `${year}${month}${day}`;
						return formattedDate;
					}

					const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;
					await db.updateOne("hk_mater_doc_detail__c", element._id, {
						time__c: time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: uuid6,
						document_id__c: `TASK${todayDate()}0001`,
						batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",
					});
				} else {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "除 原料一号库，其他未开发好" });
					return null;
				}
			}
		}
	};

	private N_material_e_auto = 1;
	// 原料库 - 自动 - 采购入、销售退
	material_e_auto = async (ctx: Context) => {
		const db = ctx.mongo;

		this.N_material_e_auto++;
		if (this.N_material_e_auto <= 2) {
			console.log("定时器 > 原料库 - 自动 - 采购入、销售退");
		}

		const docs = await db.find("hk_mater_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["采购入库单", "销售退货单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		// console.log("docs", docs.length);
		if (docs.length) {
			// const element = docs[0];
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}

				// 下面是根据 原料库、原料库2、原料外租库 设置不同的字段规则
				if (element.area__c == "原料一号冻库") {
					if (!element.line_item__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【行号】 字段" });
						return null;
					}
					if (!element.material_code__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】 字段" });
						return null;
					}
					if (!element.production_date__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【生产日期】 字段" });
						return null;
					}
					if (!element.country__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【国家】 字段" });
						return null;
					}
					if (!element.factory_no__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【厂号】 字段" });
						return null;
					}

					if (!element.is_tax__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【是否保税】 字段" });
						return null;
					}
					if (element.is_tax__c) {
						if (element.is_tax__c == "保税") {
							if (!element.contract__c) {
								await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "保税，无 【合同号】 字段" });
								return null;
							}
						}
						if (element.is_tax__c == "非保税") {
							if (!element.supplier__c) {
								await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "非保税，无 【供应商】 字段" });
								return null;
							}
						}
					}

					if (!element.unit__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】 字段" });
						return null;
					}

					if (!element.quantity__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】 字段" });
						return null;
					}

					// 校验生产日期
					function isValidProductionDate(dateStr: string) {
						const regex = /^\d{4}-\d{2}-\d{2}$/;
						if (!regex.test(dateStr)) return false;
						const [year, month, day] = dateStr.split("-").map(Number);
						const date = new Date(year, month - 1, day);
						return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
					}
					if (!isValidProductionDate(element.production_date__c)) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【生产日期】格式不正确，格式：2026-05-15" });
						return null;
					}

					// 格式化批号
					function formatBatchNo(prodDate: { split: (arg0: string) => [any, any, any] }) {
						const [year, month, day] = prodDate.split("-");
						return year.slice(2) + month + day;
					}
					const batch_format = formatBatchNo(element.production_date__c); // 260607

					function todayDate() {
						const today = new Date();
						const year = today.getFullYear();
						const month = String(today.getMonth() + 1).padStart(2, "0");
						const day = String(today.getDate()).padStart(2, "0");
						const formattedDate = `${year}${month}${day}`;
						return formattedDate;
					}

					const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;
					await db.updateOne("hk_mater_doc_detail__c", element._id, {
						time__c: time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: uuid6,
						// document_id__c: `TASK${todayDate()}0001`,
						batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",
					});
				} else {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "除 原料一号库，其他未开发好" });
					return null;
				}
			}
		}
	};

	private N_material_o_manual = 1;
	// 原料库 - 手动 - 其他出
	material_o_manual = async (ctx: Context) => {
		const db = ctx.mongo;

		this.N_material_o_manual++;
		if (this.N_material_o_manual <= 2) {
			console.log("定时器 > 原料库 - 手动 - 其他出");
		}

		const docs = await db.find("hk_mater_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["其他出库单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】字段" });
					return null;
				}

				if (!element.material_code__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】字段" });
					return null;
				}
				if (!element.batch__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】字段" });
					return null;
				}

				if (!element.quantity__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】字段" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】字段" });
					return null;
				}

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, "0");
				const day = String(today.getDate()).padStart(2, "0");
				const formattedDate = `${year}${month}${day}`;
				const randomNum = Math.floor(Math.random() * 9000) + 1000;

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_mater_doc_detail__c", element._id, {
					time__c: time(),
					desc__c: "",
					doc_instruction__c: uuid6,
					document_id__c: `TASK${formattedDate}${randomNum}`,
					cmdtype__c: "出库任务",
					// export_way__c: "日期先进先出",
					status__c: "未执行",
				});
			}
		}
	};

	// 原料库 - 自动- 销售出、需求出
	Product_e_production = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Product_e_production", "定时器 > 回传SAP > 成品入库：生产入库单");

		// // 清除原料货架表和库存表
		// const docs = await db.find("hk_product_doc_detail__c", {
		// 	query: {
		// 		$and: [
		// 			{ document_type__c: "生产入库单" },
		// 			{ cmdtype__c: "入库任务" },
		// 			// { status__c: "手动选择单据完成" },
		// 			{
		// 				$or: [{ status__c: "正在执行" }, { status__c: "重新执行" }, { status__c: "回传SAP错误" }],
		// 			},
		// 		],
		// 	},
		// });
		if (docs.length) {
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find("hk_product_chuyu__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// const isWholeFinish = d1.every(v => v.status__c == "入库完成");
						// if (!isWholeFinish) {
						// 	return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘，可以根据单据指令号筛选！` });
						// }

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne("hk_product_doc_detail__c", element._id, { handle_quantity__c: totalWeight });

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

						// const batch_data = (await TransFer.Common_global_latest_Batch(ctx, element.production_date__c, `成品库更新批号: 采购订单号：${element.document_id__c} 物料代码：${element.material_code__c}`)) as any;
						// const latestBatch = batch_data.insertData.latest_batch__c; // 2606100001

						const latestBatch = element?.batch__c;
						if (!latestBatch) {
							return ctx.send({ success: false, message: `回传错误：该单据没有批次号！` });
						}

						const payload = {
							Aufnr: element.document_id__c, // 单据号 - 81828624
							Gstrp: today_date, // 基本开始日期：报工日期 - 20260509
							Werks: "7600", // 工厂号
							TOITEMS: [
								{
									Werks: "7600",
									Aufnr: element.document_id__c, // 单据号 - 81828624
									Matnr: element.material_code__c, // 物料代码 - 10028
									Menge: `${totalWeight}`, // 报工数量 - 12.522
									Meins: element.unit__c, // 单位：不可以是中文，创建单据选择的时候，获取接口选单位
									Charg: latestBatch, // ! 批次：年月日+4位随机数=10位 多条传多个批次
								},
							],
						};
						console.log("payload", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: "回传SAP-成品入库 - 生产入库单",
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/CO11NSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								timeout: 6500,
								validateStatus: () => true,
							});
							console.log("生产入库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									for (const element of d1) {
										if (element.status__c == "入库完成") {
											await db.updateOne("hk_product_chuyu__c", element._id, { status__c: "已完成", desc__c: `已回传SAP` });
										} else {
											await db.updateOne("hk_product_chuyu__c", element._id, { desc__c: `已回传SAP` });
										}
									}
									// const allPallets = [...new Set(d1.map(v => v.pallet__c))];
									// for (const element of d1) {
									// 	await db.updateOne("hk_product_chuyu__c", element._id, { status__c: "已完成", batch__c: latestBatch, desc__c: `已回传SAP，更新批号为：${latestBatch}` });
									// }
									// for (const E_pallet of allPallets) {
									// 	const stock01 = await db.find("hk_freezing_stock__c", { query: { pallet__c: E_pallet } });
									// 	if (stock01.length) {
									// 		await db.updateOne("hk_freezing_stock__c", stock01[0]._id, { batch__c: latestBatch });
									// 	}
									// 	const stock02 = await db.find("hk_chilled_stock__c", { query: { pallet__c: E_pallet } });
									// 	if (stock02.length) {
									// 		await db.updateOne("hk_chilled_stock__c", stock02[0]._id, { batch__c: latestBatch });
									// 	}

									// 	const docDtail = await db.find("hk_freezing_stock_detail__c", { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
									// 	if (docDtail.length) {
									// 		await db.updateOne("hk_freezing_stock_detail__c", docDtail[0]._id, { batch__c: latestBatch });
									// 	}
									// 	const docDtail2 = await db.find("hk_chilled_stock_detail__c", { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
									// 	if (docDtail2.length) {
									// 		await db.updateOne("hk_chilled_stock_detail__c", docDtail2[0]._id, { batch__c: latestBatch });
									// 	}
									// }
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });

									let Pamss = {
										batch__c: latestBatch,
										doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！",
										status_sap__c: "回传成功",
										status__c: "已完成",
										desc__c: `回传SAP入库数量为：${totalWeight}`,
									};

									// 写入批次主数据表中
									await db.insertOne("hk_batch_material_main__c", { ...element, ...Pamss, _id: null, time__c: time(), desc__c: "成品库：入库完成写入批次主数据" });

									await db.updateOne("hk_product_doc_detail__c", element._id, { ...Pamss });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	// 定时器 > 回传SAP > 原料入库 - 采购入库单
	Material_e_purchase = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("采购入库单 接收参数：", docs);
		// return ctx.send({ success: false, message: "++++++++++++++++" });
		this.logTimerOnce("Material_e_purchase", "定时器 > 回传SAP > 原料入库 - 采购入库单");

		// ! 回传SAP后，更新批次全局获取 并更新表数据   原料库多个库都需要更新
		if (docs.length) {
			const AreaW = docs[0].area__c;

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = ""; // 库存表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料一号冻库") {
				table_pda_data = "hk_mater_pda_receipt__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			} else if (AreaW == "原料二号冻库") {
				table_pda_data = "hk_mater_two_pda_entry__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_two_stock_d__c"; // 库存表
			} else if (AreaW == "原料雷马外租冻库") {
				table_pda_data = "hk_mater_lei_pda_entry__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_lei_stock_d__c"; // 库存表
			} else if (AreaW == "原料中铁外租冻库") {
				table_pda_data = "hk_mater_tie_pda_entry__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_tie_stock_d__c"; // 库存表
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的仓库名称错误" });
				return ctx.send({ success: false, message: `采购入库单：传递的仓库名称错误！` });
			}

			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_receipt__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						const isWholeFinish = d1.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘，可以根据单据指令号筛选！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

						const dateStr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");

						const batch_data = (await TransFer.Common_global_latest_Batch(ctx, dateStr, `原料库更新批号: 采购订单号：${element.document_id__c} 行项目号：${element.line_item__c} 物料代码：${element.material_code__c}`)) as any;
						const latestBatch = batch_data.insertData.latest_batch__c; // 2606100001

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};
						const payload = {
							BedatC: today_date, // 订单凭证日期
							Ebeln: element.document_id__c, // 采购订单号
							// 回传多条，
							TOITEMS: [
								{
									Charg: latestBatch, // 批次
									Ebeln: element.document_id__c, // 采购订单号
									Werks: "7600", // 工厂
									Ebelp: element.line_item__c, // 行项目号，
									Matnr: element.material_code__c, // 物料代码
									Lgort: areaEumn[element.area__c], // 仓库代码
									Menge: String(totalWeight), // 入库数量
									Meins: element.unit__c, // 单位
									HsdatC: element.production_date__c.replaceAll("-", ""), // 生产日期，传递时去掉 -
								},
							],
						};
						console.log("payload", payload);
						// return ctx.send({ success: false, message: "++++++++++++++++" });

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name}- 采购入库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								timeout: 6500,
								validateStatus: () => true,
							});
							console.log("生产入库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									// ! 更新批号：获取到批号之后，用指令号查询收货表中有哪些托盘，并更新批号，用单号和托盘号查询库存，全部更新批号

									for (const element of d1) {
										await db.updateOne(table_pda_data, element._id, { status__c: "已完成", batch__c: latestBatch, desc__c: `已回传SAP，更新批号为：${latestBatch}` });
									}
									const allPallets = [...new Set(d1.map(v => v.pallet__c))];
									for (const E_pallet of allPallets) {
										// 更新货架表
										const stockl = await db.find(table_stock, { query: { pallet__c: E_pallet } });
										if (stockl.length) {
											await db.updateOne(table_stock, stockl[0]._id, { batch__c: latestBatch });
										}
										// 更新库存表
										const docDtail = await db.find(table_stock_detail, { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
										if (docDtail.length) {
											await db.updateOne(table_stock_detail, docDtail[0]._id, { batch__c: latestBatch });
										}
									}

									let Params = {
										batch__c: latestBatch,
										doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！",
										status_sap__c: "回传成功",
										status__c: "已完成",
									};

									// 写入批次主数据表中
									await db.insertOne("hk_batch_material_main__c", { ...element, ...Params, _id: null, time__c: time(), desc__c: `${stock_name}：入库完成写入批次主数据` });
									// 回传SAP接口记录
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									// 更新单据状态
									await db.updateOne(table_doc_detail, element._id, { ...Params });

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Auxiliary_e_purchase = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_e_purchase", "定时器 > 回传SAP > 原料入库 - 采购入库单");

		// ! 回传SAP后，更新批次全局获取 并更新表数据   原料库多个库都需要更新
		if (docs.length) {
			let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_auxiliary_pda_entry__c"; // pda 入库 出库表
			let table_stock = "hk_auxiliary_stock__c"; // 货架表
			let table_stock_detail = "hk_auxiliary_stock_detail__c"; // 库存表
			let stock_name = "辅料库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						const isWholeFinish = d1.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘，可以根据单据指令号筛选！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

						const dateStr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");

						const batch_data = (await TransFer.Common_global_latest_Batch(ctx, dateStr, `原料库更新批号: 采购订单号：${element.document_id__c} 行项目号：${element.line_item__c} 物料代码：${element.material_code__c}`)) as any;
						const latestBatch = batch_data.insertData.latest_batch__c; // 2606100001

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};
						const payload = {
							BedatC: today_date, // 订单凭证日期
							Ebeln: element.document_id__c, // 采购订单号
							// 回传多条，
							TOITEMS: [
								{
									Charg: latestBatch, // 批次
									Ebeln: element.document_id__c, // 采购订单号
									Werks: "7600", // 工厂
									Ebelp: element.line_item__c, // 行项目号，
									Matnr: element.material_code__c, // 物料代码
									Lgort: areaEumn[element.area__c], // 仓库代码
									Menge: String(totalWeight), // 入库数量
									Meins: element.unit__c, // 单位
									HsdatC: element.production_date__c.replaceAll("-", ""), // 生产日期，传递时去掉 -
								},
							],
						};
						console.log("payload", payload);
						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name}- 采购入库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								timeout: 6500,
								validateStatus: () => true,
							});
							console.log("生产入库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									// ! 更新批号：获取到批号之后，用指令号查询收货表中有哪些托盘，并更新批号，用单号和托盘号查询库存，全部更新批号

									for (const element of d1) {
										await db.updateOne(table_pda_data, element._id, { status__c: "已完成", batch__c: latestBatch, desc__c: `已回传SAP，更新批号为：${latestBatch}` });
									}
									const allPallets = [...new Set(d1.map(v => v.pallet__c))];
									for (const E_pallet of allPallets) {
										// 更新货架表
										const stockl = await db.find(table_stock, { query: { pallet__c: E_pallet } });
										if (stockl.length) {
											await db.updateOne(table_stock, stockl[0]._id, { batch__c: latestBatch });
										}
										// 更新库存表
										const docDtail = await db.find(table_stock_detail, { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
										if (docDtail.length) {
											await db.updateOne(table_stock_detail, docDtail[0]._id, { batch__c: latestBatch });
										}
									}

									let Params = {
										batch__c: latestBatch,
										doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！",
										status_sap__c: "回传成功",
										status__c: "已完成",
									};

									// 写入批次主数据表中
									await db.insertOne("hk_batch_material_main__c", { ...element, ...Params, _id: null, time__c: time(), desc__c: `${stock_name}：入库完成写入批次主数据` });
									// 回传SAP接口记录
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									// 更新单据状态
									await db.updateOne(table_doc_detail, element._id, { ...Params });

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Pack_e_purchase = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("包材库L   采购入库单 接收参数：", data);

		// return ctx.send({ success: false, message: "+++++++++++++" });

		this.logTimerOnce("Material_e_purchase", "定时器 > 回传SAP > 原料入库 - 采购入库单");

		// ! 回传SAP后，更新批次全局获取 并更新表数据   原料库多个库都需要更新
		if (docs.length) {
			let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_pack_pda_entry__c"; // pda 入库 出库表
			// let table_stock = "hk_pack_pda_out_his__c"; // 货架表
			let table_stock_detail = "hk_pack_stock_detail__c"; // 库存表
			let stock_name = "包材库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						const isWholeFinish = d1.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘，可以根据单据指令号筛选！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

						const dateStr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");

						const batch_data = (await TransFer.Common_global_latest_Batch(ctx, dateStr, `原料库更新批号: 采购订单号：${element.document_id__c} 行项目号：${element.line_item__c} 物料代码：${element.material_code__c}`)) as any;
						const latestBatch = batch_data.insertData.latest_batch__c; // 2606100001

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};
						const payload = {
							BedatC: today_date, // 订单凭证日期
							Ebeln: element.document_id__c, // 采购订单号
							// 回传多条，
							TOITEMS: [
								{
									Charg: latestBatch, // 批次
									Ebeln: element.document_id__c, // 采购订单号
									Werks: "7600", // 工厂
									Ebelp: element.line_item__c, // 行项目号，
									Matnr: element.material_code__c, // 物料代码
									Lgort: areaEumn[element.area__c], // 仓库代码
									Menge: String(totalWeight), // 入库数量
									Meins: element.unit__c, // 单位
									HsdatC: element.production_date__c.replaceAll("-", ""), // 生产日期，传递时去掉 -
								},
							],
						};
						console.log("payload", payload);
						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name}- 采购入库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_005_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								timeout: 6500,
								validateStatus: () => true,
							});
							console.log("生产入库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									// ! 更新批号：获取到批号之后，用指令号查询收货表中有哪些托盘，并更新批号，用单号和托盘号查询库存，全部更新批号

									for (const element of d1) {
										await db.updateOne(table_pda_data, element._id, { status__c: "已完成", batch__c: latestBatch, desc__c: `已回传SAP，更新批号为：${latestBatch}` });
									}
									const allPallets = [...new Set(d1.map(v => v.pallet__c))];
									for (const E_pallet of allPallets) {
										// 更新货架表
										// const stockl = await db.find(table_stock, { query: { pallet__c: E_pallet } });
										// if (stockl.length) {
										// 	await db.updateOne(table_stock, stockl[0]._id, { batch__c: latestBatch });
										// }
										// 更新库存表
										const docDtail = await db.find(table_stock_detail, { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
										if (docDtail.length) {
											await db.updateOne(table_stock_detail, docDtail[0]._id, { batch__c: latestBatch });
										}
									}

									let Params = {
										batch__c: latestBatch,
										doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！",
										status_sap__c: "回传成功",
										status__c: "已完成",
									};

									// 写入批次主数据表中
									await db.insertOne("hk_batch_material_main__c", { ...element, ...Params, _id: null, time__c: time(), desc__c: `${stock_name}：入库完成写入批次主数据` });
									// 回传SAP接口记录
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									// 更新单据状态
									await db.updateOne(table_doc_detail, element._id, { ...Params });

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	// 销售退货单
	Material_e_sale_back = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_e_purchase", "定时器 > 回传SAP > 原料入库 - 销售退库单");

		// ! 回传SAP后，更新批次全局获取 并更新表数据   原料库多个库都需要更新
		if (docs.length) {
			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_receipt__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";

			const AreaW = docs[0].area__c;

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = ""; // 库存表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料一号冻库") {
				table_pda_data = "hk_mater_pda_receipt__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			} else if (AreaW == "原料二号冻库") {
				table_pda_data = "hk_mater_two_pda_entry__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_two_stock_d__c"; // 库存表
			} else if (AreaW == "原料雷马外租冻库") {
				table_pda_data = "hk_mater_lei_pda_entry__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_lei_stock_d__c"; // 库存表
			} else if (AreaW == "原料中铁外租冻库") {
				table_pda_data = "hk_mater_tie_pda_entry__c"; // pda 入库 出库表
				table_stock_detail = "hk_mater_tie_stock_d__c"; // 库存表
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的仓库名称错误" });
				return ctx.send({ success: false, message: `采购入库单：传递的仓库名称错误！` });
			}

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						const isWholeFinish = d1.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘，可以根据单据指令号筛选！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

						// const batch_data = (await TransFer.Common_global_latest_Batch(ctx, `原料库更新批号: 采购订单号：${element.document_id__c} 行项目号：${element.line_item__c} 物料代码：${element.material_code__c}`)) as any;
						const latestBatch = element.batch__c; // 2606100001

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};
						const payload = {
							VbelnVl: element.document_id__c, // 交货
							ErrCode: "",
							ErrMsg: "",
							TOITEMS: [
								{
									VbelnVl: element.document_id__c, // 交货
									PosnrVl: element.line_item__c, // 行号
									Matnr: element.material_code__c, // 物料代码
									Lfimg: String(totalWeight), // 交货数量
									Vrkme: element.unit__c, // 销售单位
									Lgort: areaEumn[element.area__c], // 存储地点：原料冻库
									Werks: "7600", // 工厂
									Charg: latestBatch, // 批次
									BldatC: today_date, // 实际出库日期
								},
							],
						};
						console.log("payload", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 销售退货库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								timeout: 6500,
								validateStatus: () => true,
							});
							console.log("生产入库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									// ! 更新批号：获取到批号之后，用指令号查询收货表中有哪些托盘，并更新批号，用单号和托盘号查询库存，全部更新批号 【直接用单据的批号去更新库存】

									for (const element of d1) {
										await db.updateOne(table_pda_data, element._id, { status__c: "已完成", batch__c: latestBatch, desc__c: `已回传SAP，更新批号为：${latestBatch}` });
									}
									const allPallets = [...new Set(d1.map(v => v.pallet__c))];
									for (const E_pallet of allPallets) {
										const stock01 = await db.find(table_stock, { query: { pallet__c: E_pallet } });
										if (stock01.length) {
											await db.updateOne(table_stock, stock01[0]._id, { batch__c: latestBatch });
										}

										const docDtail = await db.find(table_stock_detail, { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
										if (docDtail.length) {
											await db.updateOne(table_stock_detail, docDtail[0]._id, { batch__c: latestBatch });
										}
									}

									let Params = {
										batch__c: latestBatch,
										doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！",
										status_sap__c: "回传成功",
										status__c: "已完成",
									};

									// 写入批次主数据表中
									await db.insertOne("hk_batch_material_main__c", { ...element, ...Params, _id: null, time__c: time(), desc__c: `${stock_name}：入库完成写入批次主数据` });
									// 回传SAP接口记录
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									// 更新单据状态
									await db.updateOne(table_doc_detail, element._id, { ...Params });

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Auxiliary_e_sale_back = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_e_purchase", "定时器 > 回传SAP > 原料入库 - 销售退库单");

		// ! 回传SAP后，更新批次全局获取 并更新表数据   原料库多个库都需要更新
		if (docs.length) {
			let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_auxiliary_pda_entry__c"; // pda 入库 出库表
			let table_stock = "hk_auxiliary_stock__c"; // 货架表
			let table_stock_detail = "hk_auxiliary_stock_detail__c"; // 库存表
			let stock_name = "辅料库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						const isWholeFinish = d1.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘，可以根据单据指令号筛选！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

						// const batch_data = (await TransFer.Common_global_latest_Batch(ctx, `原料库更新批号: 采购订单号：${element.document_id__c} 行项目号：${element.line_item__c} 物料代码：${element.material_code__c}`)) as any;
						const latestBatch = element.batch__c; // 2606100001

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};
						const payload = {
							VbelnVl: element.document_id__c, // 交货
							ErrCode: "",
							ErrMsg: "",
							TOITEMS: [
								{
									VbelnVl: element.document_id__c, // 交货
									PosnrVl: element.line_item__c, // 行号
									Matnr: element.material_code__c, // 物料代码
									Lfimg: String(totalWeight), // 交货数量
									Vrkme: element.unit__c, // 销售单位
									Lgort: areaEumn[element.area__c], // 存储地点：原料冻库
									Werks: "7600", // 工厂
									Charg: latestBatch, // 批次
									BldatC: today_date, // 实际出库日期
								},
							],
						};
						console.log("payload", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 销售退货库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								timeout: 6500,
								validateStatus: () => true,
							});
							console.log("生产入库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									// ! 更新批号：获取到批号之后，用指令号查询收货表中有哪些托盘，并更新批号，用单号和托盘号查询库存，全部更新批号 【直接用单据的批号去更新库存】

									for (const element of d1) {
										await db.updateOne(table_pda_data, element._id, { status__c: "已完成", batch__c: latestBatch, desc__c: `已回传SAP，更新批号为：${latestBatch}` });
									}
									const allPallets = [...new Set(d1.map(v => v.pallet__c))];
									for (const E_pallet of allPallets) {
										const stock01 = await db.find(table_stock, { query: { pallet__c: E_pallet } });
										if (stock01.length) {
											await db.updateOne(table_stock, stock01[0]._id, { batch__c: latestBatch });
										}

										const docDtail = await db.find(table_stock_detail, { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
										if (docDtail.length) {
											await db.updateOne(table_stock_detail, docDtail[0]._id, { batch__c: latestBatch });
										}
									}

									let Params = {
										batch__c: latestBatch,
										doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！",
										status_sap__c: "回传成功",
										status__c: "已完成",
									};

									// 写入批次主数据表中
									await db.insertOne("hk_batch_material_main__c", { ...element, ...Params, _id: null, time__c: time(), desc__c: `${stock_name}：入库完成写入批次主数据` });
									// 回传SAP接口记录
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									// 更新单据状态
									await db.updateOne(table_doc_detail, element._id, { ...Params });

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Pack_e_sale_back = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_e_purchase", "定时器 > 回传SAP > 原料入库 - 销售退库单");

		// ! 回传SAP后，更新批次全局获取 并更新表数据   原料库多个库都需要更新
		if (docs.length) {
			let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_pack_pda_entry__c"; // pda 入库 出库表
			// let table_stock = ""; // 货架表
			let table_stock_detail = "hk_pack_stock_detail__c"; // 库存表
			let stock_name = "包材库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						const isWholeFinish = d1.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘，可以根据单据指令号筛选！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

						// const batch_data = (await TransFer.Common_global_latest_Batch(ctx, `原料库更新批号: 采购订单号：${element.document_id__c} 行项目号：${element.line_item__c} 物料代码：${element.material_code__c}`)) as any;
						const latestBatch = element.batch__c; // 2606100001

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};
						const payload = {
							VbelnVl: element.document_id__c, // 交货
							ErrCode: "",
							ErrMsg: "",
							TOITEMS: [
								{
									VbelnVl: element.document_id__c, // 交货
									PosnrVl: element.line_item__c, // 行号
									Matnr: element.material_code__c, // 物料代码
									Lfimg: String(totalWeight), // 交货数量
									Vrkme: element.unit__c, // 销售单位
									Lgort: areaEumn[element.area__c], // 存储地点：原料冻库
									Werks: "7600", // 工厂
									Charg: latestBatch, // 批次
									BldatC: today_date, // 实际出库日期
								},
							],
						};
						console.log("payload", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 销售退货库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								timeout: 6500,
								validateStatus: () => true,
							});
							console.log("生产入库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									// ! 更新批号：获取到批号之后，用指令号查询收货表中有哪些托盘，并更新批号，用单号和托盘号查询库存，全部更新批号 【直接用单据的批号去更新库存】

									for (const element of d1) {
										await db.updateOne(table_pda_data, element._id, { status__c: "已完成", batch__c: latestBatch, desc__c: `已回传SAP，更新批号为：${latestBatch}` });
									}
									const allPallets = [...new Set(d1.map(v => v.pallet__c))];
									for (const E_pallet of allPallets) {
										// const stock01 = await db.find(table_stock, { query: { pallet__c: E_pallet } });
										// if (stock01.length) {
										// 	await db.updateOne(table_stock, stock01[0]._id, { batch__c: latestBatch });
										// }

										const docDtail = await db.find(table_stock_detail, { query: { document_id__c: element.document_id__c, pallet__c: E_pallet } });
										if (docDtail.length) {
											await db.updateOne(table_stock_detail, docDtail[0]._id, { batch__c: latestBatch });
										}
									}

									let Params = {
										batch__c: latestBatch,
										doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！",
										status_sap__c: "回传成功",
										status__c: "已完成",
									};

									// 写入批次主数据表中
									await db.insertOne("hk_batch_material_main__c", { ...element, ...Params, _id: null, time__c: time(), desc__c: `${stock_name}：入库完成写入批次主数据` });
									// 回传SAP接口记录
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									// 更新单据状态
									await db.updateOne(table_doc_detail, element._id, { ...Params });

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	// 原料库 - 自动- 销售出、需求出
	Product_o_sale = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("销售出库单 接收参数：", data);
		this.logTimerOnce("Product_o_sale", "定时器 > 回传SAP > 成品出库 - 销售出库单");

		// // 清除原料货架表和库存表
		// const docs = await db.find("hk_product_doc_detail__c", {
		// 	query: {
		// 		$and: [
		// 			{ document_type__c: "销售出库单" },
		// 			{ cmdtype__c: "出库任务" },
		// 			// { status__c: "手动选择单据完成" },
		// 			{
		// 				$or: [{ status__c: "正在执行" }, { status__c: "重新执行" }, { status__c: "回传SAP错误" }],
		// 			},
		// 		],
		// 	},
		// });
		// return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
		if (docs.length) {
			for (const element of docs) {
				// return ctx.send({ success: false, message: `不可回传！` });

				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find("hk_product_pda_outgoing__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find("hk_product_pda_outgoing__c", { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne("hk_product_doc_detail__c", element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find("hk_product_doc_detail__c", { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							// fin_Pda_List.push({ ...ele_docs, line_item__c: ele_docs.line_item__c, unit__c: ele_docs.unit__c });
							fin_Pda_List.push({
								...element,
								line_item__c: ele_docs.line_item__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "line_item__c", "material_code__c", "unit__c", "area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										line_item__c: curr.line_item__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										area__c: curr.area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);
						// console.log('total_Send_Sap_Weight', total_Send_Sap_Weight);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								VbelnVl: value.document_id__c, // 交货
								PosnrVl: value.line_item__c, // 行号
								Matnr: value.material_code__c, // 物料代码
								Vrkme: value.unit__c, // 销售单位
								Lgort: areaEumn[value.area__c], // 存储地点：原料冻库
								Werks: "7600", // 工厂
								Charg: value.batch__c, // 批次
								Lfimg: String(value.final_pick_quantity__c), // 交货数量
								BldatC: today_date, // 实际出库日期
							};
						});

						const payload = {
							VbelnVl: element.document_id__c, // 单据编号
							ErrCode: "",
							ErrMsg: "",
							TOITEMS: sendSapData,
						};
						console.log("payload", payload);
						const insInfo = {
							time__c: time(),
							interface_name__c: "回传SAP-成品出库 - 销售出库单",
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						// return ctx.send({ success: false, message: `不可回传！` });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
									Connection: "close", // 强制短连接，防止复用已失效的 Socket
								},
								timeout: 60000, // 增加超时时间到60秒，SAP处理可能较慢
								validateStatus: () => true,
							});

							console.log("销售出库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "S") {
									const docs_dateil = await db.find("hk_product_doc_detail__c", { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne("hk_product_doc_detail__c", el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg, status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne("hk_product_pda_outgoing__c", element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	// 原料库 - 自动- 销售出、需求出
	Material_o_sale = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_o_sale", "定时器 > 回传SAP > 原料出库 - 销售出库单 ");

		if (docs.length) {
			const AreaW = docs[0].area__c;

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = ""; // 库存表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料一号冻库") {
				table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			} else if (AreaW == "原料二号冻库") {
				table_pda_data = "hk_mater_two_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_two_stock_d__c"; // 库存表
			} else if (AreaW == "原料雷马外租冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_lei_stock_d__c"; // 库存表
			} else if (AreaW == "原料中铁外租冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_tie_stock_d__c"; // 库存表
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的仓库名称错误" });
				return ctx.send({ success: false, message: `采购入库单：传递的仓库名称错误！` });
			}

			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
			// let stock_name = "原料一号冻库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							// fin_Pda_List.push({ ...ele_docs, line_item__c: ele_docs.line_item__c, unit__c: ele_docs.unit__c });
							fin_Pda_List.push({
								...element,
								line_item__c: ele_docs.line_item__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
							});
						}

						const groupFields = ["document_id__c", "line_item__c", "material_code__c", "unit__c", "area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										line_item__c: curr.line_item__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										area__c: curr.area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);
						// console.log('total_Send_Sap_Weight', total_Send_Sap_Weight);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								VbelnVl: value.document_id__c, // 交货
								PosnrVl: value.line_item__c, // 行号
								Matnr: value.material_code__c, // 物料代码
								Vrkme: value.unit__c, // 销售单位
								Lgort: areaEumn[value.area__c], // 存储地点：原料冻库
								Werks: "7600", // 工厂
								Charg: value.batch__c, // 批次
								Lfimg: String(value.final_pick_quantity__c), // 交货数量
								BldatC: today_date, // 实际出库日期
							};
						});

						let payload = {
							VbelnVl: element.document_id__c, // 单据编号
							ErrCode: "",
							ErrMsg: "",
							TOITEMS: sendSapData,
						};

						console.log("payload", payload);
						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 销售出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
									Connection: "close", // 强制短连接，防止复用已失效的 Socket
								},
								timeout: 60000, // 增加超时时间到60秒，SAP处理可能较慢
								validateStatus: () => true,
							});

							console.log("销售出库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "S") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Auxiliary_o_sale = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_o_sale", "定时器 > 回传SAP > 原料出库 - 销售出库单 ");

		if (docs.length) {
			let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_auxiliary_pda_out__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "辅料库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							// fin_Pda_List.push({ ...ele_docs, line_item__c: ele_docs.line_item__c, unit__c: ele_docs.unit__c });
							fin_Pda_List.push({
								...element,
								line_item__c: ele_docs.line_item__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "line_item__c", "material_code__c", "unit__c", "area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										line_item__c: curr.line_item__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										area__c: curr.area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);
						// console.log('total_Send_Sap_Weight', total_Send_Sap_Weight);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								VbelnVl: value.document_id__c, // 交货
								PosnrVl: value.line_item__c, // 行号
								Matnr: value.material_code__c, // 物料代码
								Vrkme: value.unit__c, // 销售单位
								Lgort: areaEumn[value.area__c], // 存储地点：原料冻库
								Werks: "7600", // 工厂
								Charg: value.batch__c, // 批次
								Lfimg: String(value.final_pick_quantity__c), // 交货数量
								BldatC: today_date, // 实际出库日期
							};
						});

						let payload = {
							VbelnVl: element.document_id__c, // 单据编号
							ErrCode: "",
							ErrMsg: "",
							TOITEMS: sendSapData,
						};

						console.log("payload", payload);
						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 销售出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
									Connection: "close", // 强制短连接，防止复用已失效的 Socket
								},
								timeout: 60000, // 增加超时时间到60秒，SAP处理可能较慢
								validateStatus: () => true,
							});

							console.log("销售出库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "S") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Pack_o_sale = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_o_sale", "定时器 > 回传SAP > 原料出库 - 销售出库单 ");

		if (docs.length) {
			let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_pack_pda_out__c"; // pda 入库 出库表
			let table_stock = ""; // 货架表
			let table_stock_detail = "hk_pack_stock_detail__c"; // 库存表
			let stock_name = "包材库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne("hk_mater_doc_detail__c", element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							// fin_Pda_List.push({ ...ele_docs, line_item__c: ele_docs.line_item__c, unit__c: ele_docs.unit__c });
							fin_Pda_List.push({
								...element,
								line_item__c: ele_docs.line_item__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "line_item__c", "material_code__c", "unit__c", "area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										line_item__c: curr.line_item__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										area__c: curr.area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);
						// console.log('total_Send_Sap_Weight', total_Send_Sap_Weight);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								VbelnVl: value.document_id__c, // 交货
								PosnrVl: value.line_item__c, // 行号
								Matnr: value.material_code__c, // 物料代码
								Vrkme: value.unit__c, // 销售单位
								Lgort: areaEumn[value.area__c], // 存储地点：原料冻库
								Werks: "7600", // 工厂
								Charg: value.batch__c, // 批次
								Lfimg: String(value.final_pick_quantity__c), // 交货数量
								BldatC: today_date, // 实际出库日期
							};
						});

						let payload = {
							VbelnVl: element.document_id__c, // 单据编号
							ErrCode: "",
							ErrMsg: "",
							TOITEMS: sendSapData,
						};

						console.log("payload", payload);
						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 销售出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_004_SRV/HEADERSet`;
						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
									Connection: "close", // 强制短连接，防止复用已失效的 Socket
								},
								timeout: 60000, // 增加超时时间到60秒，SAP处理可能较慢
								validateStatus: () => true,
							});

							console.log("销售出库单 回传SAP", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "S") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}

									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	// 原料库 - 自动- 销售出、需求出
	Product_o_demand = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Product_o_demand", "定时器 > 回传SAP > 成品出库 - 需求出库单");

	 
		if (docs.length) {
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find("hk_product_pda_outgoing__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find("hk_product_pda_outgoing__c", { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：成品库 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne("hk_product_doc_detail__c", element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find("hk_product_doc_detail__c", { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};
						const insInfo = {
							time__c: time(),
							interface_name__c: "回传SAP-成品出库 - 需求出库单",
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find("hk_product_doc_detail__c", { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne("hk_product_doc_detail__c", el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne("hk_product_pda_outgoing__c", element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	// 原料库 - 自动- 销售出、需求出
	Material_o_demand = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("", data);
		// return ctx.send({ success: false, message: `` });
		// console.log("", data);
		// return ctx.send({ success: false, message: `` });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		// // 清除原料货架表和库存表
		// const docs = await db.find("hk_mater_doc_detail__c", {
		// 	query: {
		// 		$and: [
		// 			{ document_type__c: "需求出库单" },
		// 			{ cmdtype__c: "出库任务" },
		// 			// { status__c: "手动选择单据完成" },
		// 			{
		// 				$or: [{ status__c: "正在执行" }, { status__c: "重新执行" }, { status__c: "回传SAP错误" }],
		// 			},
		// 		],
		// 	},
		// });
		// console.log("docs", docs.length);
		if (docs.length) {
			const AreaW = docs[0].area__c;

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = ""; // 库存表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料一号冻库") {
				table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			} else if (AreaW == "原料二号冻库") {
				table_pda_data = "hk_mater_two_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_two_stock_d__c"; // 库存表
			} else if (AreaW == "原料雷马外租冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_lei_stock_d__c"; // 库存表
			} else if (AreaW == "原料中铁外租冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_tie_stock_d__c"; // 库存表
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的仓库名称错误" });
				return ctx.send({ success: false, message: `采购入库单：传递的仓库名称错误！` });
			}

			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	m1 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 Material_o_demand_move01", docs);
		// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";

			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}

			// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


						
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						// console.log('doc_whole_task', doc_whole_task);
						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};
						// console.log('payload', payload);
						// 			return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });


						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
  	m2 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 Material_o_demand_move01", docs);
		// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";

			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}

			// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


						
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						// console.log('doc_whole_task', doc_whole_task);
						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};
						// console.log('payload', payload);
						// 			return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });


						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};


		m3 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 Material_o_demand_move01", docs);
		// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";

			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}

			// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


						
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						// console.log('doc_whole_task', doc_whole_task);
						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};
						// console.log('payload', payload);
						// 			return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });


						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};


		m4 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 Material_o_demand_move01", docs);
		// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";

			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}

			// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


						
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						// console.log('doc_whole_task', doc_whole_task);
						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};
						// console.log('payload', payload);
						// 			return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move01` });


						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	m5 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 Material_o_demand_move05", data);
		// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move05` });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");
 
		if (docs.length) {
			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_mater_pda_receipt__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "原料一号冻库";
 

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										weight__c: 0,
									};
								}
								acc[key].weight__c = Number((acc[key].weight__c + Number(curr.weight__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.weight__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.weight__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};

						console.log('weight__c',payload );
								return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move05` });


						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	m6 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 Material_o_demand_move06", data);
		// return ctx.send({ success: false, message: `需求出库单 Material_o_demand_move06` });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

	 
		if (docs.length) {
			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_mater_two_pda_entry__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "原料二号冻库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										weight__c: 0,
									};
								}
								acc[key].weight__c = Number((acc[key].weight__c + Number(curr.weight__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.weight__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.weight__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Auxiliary_o_demand = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_auxiliary_pda_out__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "辅料库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	Auxiliary_o_demand_move = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("采购入库单 接收参数3333：", data);
		// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_auxiliary_pda_entry__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "辅料库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										weight__c: 0,
									};
								}
								acc[key].weight__c = Number((acc[key].weight__c + Number(curr.weight__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.weight__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.weight__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};
						console.log("payload", payload);

						// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Pack_o_demand = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 接收参数：", data);

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_pack_pda_out__c"; // pda 入库 出库表
			let table_stock = ""; // 货架表
			let table_stock_detail = "hk_pack_stock_detail__c"; // 库存表
			let stock_name = "包材库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						// 根据这些字段单据编号document_id__c、行号line_item__c、物料代码material_code__c、销售单位unit__c、存储地点area__c、批次batch__c相同属性，汇总出final_pick_quantity__c的和，怎么写，原来只按照相同批次累加final_pick_quantity__c数量, 累加final_pick_quantity__c要保留三位小数
						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										final_pick_quantity__c: 0,
									};
								}
								acc[key].final_pick_quantity__c = Number((acc[key].final_pick_quantity__c + Number(curr.final_pick_quantity__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.final_pick_quantity__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.final_pick_quantity__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	Pack_o_deman_move = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("需求出库单 调拨 接收参数：", data);
		// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

		this.logTimerOnce("Material_o_demand", "定时器 > 回传SAP > 原料出库 - 需求出库单");

		if (docs.length) {
			let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_pack_pda_entry__c"; // pda 入库 出库表 
			let stock_name = "包材库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						// await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						let fin_Pda_List = [];
						for (const element of doc_whole_task) {
							const docs = await db.find(table_doc_detail, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (docs.length == 0) {
								return ctx.send({ success: false, message: `回传错误：任务处理错误！` });
							}
							const ele_docs = docs[0];
							fin_Pda_List.push({
								...element,
								year__c: ele_docs.year__c,
								unit__c: ele_docs.unit__c,
								material_code__c: ele_docs.material_code__c,
								area__c: ele_docs.area__c,
								recept_area__c: ele_docs.recept_area__c,
							});
						}
						// console.log("fin_Pda_List", fin_Pda_List);

						const groupFields = ["document_id__c", "year__c", "material_code__c", "unit__c", "area__c", "recept_area__c", "batch__c"];
						const result = Object.values(
							fin_Pda_List.reduce((acc, curr) => {
								const key = JSON.stringify(groupFields.map(field => curr[field] ?? ""));
								if (!acc[key]) {
									acc[key] = {
										document_id__c: curr.document_id__c,
										material_code__c: curr.material_code__c,
										unit__c: curr.unit__c,
										year__c: curr.year__c,
										area__c: curr.area__c,
										recept_area__c: curr.recept_area__c,
										batch__c: curr.batch__c,
										weight__c: 0,
									};
								}
								acc[key].weight__c = Number((acc[key].weight__c + Number(curr.weight__c || 0)).toFixed(3));

								return acc;
							}, {})
						);
						console.log("result", result);

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						let total_Send_Sap_Weight = result.reduce((prev: any, curr: any) => Number((prev + Number(curr.weight__c || 0)).toFixed(3)), 0);

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((value: any) => {
							return {
								Charg: value.batch__c, //  批次
								ZqqId: value.document_id__c, // 申请单号
								ZqqYear: value.year__c, // 年度
								Werks: "7600", // 工厂
								Matnr: value.material_code__c, // 物料代码
								Menge: String(value.weight__c), // 出库数量
								Meins: value.unit__c, // 单位
								LgortFc: areaEumn[value.area__c], // 出库仓库
								LgortJs: areaEumn[value.recept_area__c], // 入库仓库： 线面库
							};
						});
						// console.log('sendSapData', sendSapData);
						// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

						let payload = {
							Budat: today_date, // 记账日期: 当天
							ZqqId: element.document_id__c, // 申请单号
							ZqqYear: element.year__c, // 年度
							TOITEMS: sendSapData,
						};

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 需求出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_006_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}

							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});

							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { desc__c: `回传SAP总数为：${total_Send_Sap_Weight}`, doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	// 原料库 - 自动- 销售出、需求出
	Product_o_other = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Product_o_other", "定时器 > 回传SAP > 成品出库 - 其他出库单");
 
		if (docs.length) {
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find("hk_product_pda_outgoing__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find("hk_product_pda_outgoing__c", { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：成品库 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne("hk_product_doc_detail__c", element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: "回传SAP-成品出库 - 其他出库单",
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							console.log("sssss", resp.data);
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find("hk_product_doc_detail__c", { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne("hk_product_doc_detail__c", el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}
									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne("hk_product_pda_outgoing__c", element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	// 原料库 - 自动- 销售出、需求出
	Material_o_other = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
			// let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			// let table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
			// let table_stock = "hk_mater_stock__c"; // 货架表
			// let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			// let stock_name = "原料一号冻库";

			const AreaW = docs[0].area__c;

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = ""; // 库存表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料一号冻库") {
				table_pda_data = "hk_mater_pda_outgoing__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			} else if (AreaW == "原料二号冻库") {
				table_pda_data = "hk_mater_two_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_two_stock_d__c"; // 库存表
			} else if (AreaW == "原料雷马外租冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_lei_stock_d__c"; // 库存表
			} else if (AreaW == "原料中铁外租冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c"; // pda 入库 出库表
				// table_stock_detail = "hk_mater_tie_stock_d__c"; // 库存表
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的仓库名称错误" });
				return ctx.send({ success: false, message: `采购入库单：传递的仓库名称错误！` });
			}

			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	
	o1 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("其他出库单 Material_o_other_move01", data);
		// return ctx.send({ success: false, message: `其他出库单 Material_o_other_move01` });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
		
			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}
			
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


								
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						
						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
 
	o2 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("其他出库单 Material_o_other_move01", data);
		// return ctx.send({ success: false, message: `其他出库单 Material_o_other_move01` });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
		
			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}
			
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


								
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						
						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	o3 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("其他出库单 Material_o_other_move01", data);
		// return ctx.send({ success: false, message: `其他出库单 Material_o_other_move01` });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
		
			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}
			
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


								
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						
						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};


	o4 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("其他出库单 Material_o_other_move01", data);
		// return ctx.send({ success: false, message: `其他出库单 Material_o_other_move01` });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
		
			const AreaW = docs[0].area__c; // 出库仓库
			const Dest_area = docs[0].recept_area__c; // 入库仓库

			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = ""; // pda 出库表
			let table_pda_data_entry = ""; // PDA 入库表
			let stock_name = AreaW; // 库名
			if (AreaW == "原料雷马外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料雷马外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_lei_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料一号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_pda_receipt__c";
			} else if (AreaW == "原料中铁外租冻库" && Dest_area == "原料二号冻库") {
				table_pda_data = "hk_mater_tie_pda_out__c";
				table_pda_data_entry = "hk_mater_two_pda_entry__c";
			} else {
				await db.updateOne(table_doc_detail, docs[0]._id, { status__c: "回传SAP错误", desc__c: "传递的出库仓库和入库仓库错误" });
				return ctx.send({ success: false, message: `传递的出库仓库和入库仓库错误` });
			}
			
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });


								
						let totalWeight_Entry = 0;
						const d1_entry = await db.find(table_pda_data_entry, { query: {document_id__c: element.document_id__c } });
						if (d1_entry.length) {
							const isWholeFinish2 = d1_entry.every(v => v.status__c == "入库完成");
							if(!isWholeFinish2){
								return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
							}
							
							for (const item of d1_entry) {
								totalWeight_Entry = Number((Math.round((Number(totalWeight_Entry) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
							}
							if (totalWeight != totalWeight_Entry) {
										return ctx.send({ success: false, message: `回传错误：托盘出库数量不等于入库数量，出库数量是${totalWeight}，入库数量是：${totalWeight_Entry}！` });
							}  
						} else {
							return ctx.send({ success: false, message: `回传错误：托盘出库，但未入库，入库数量为0！` });
						}


						
						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	o5 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("其他出库单 Material_o_other_move05", data);
		// return ctx.send({ success: false, message: `其他出库单 Material_o_other_move05` });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_mater_pda_receipt__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "原料一号冻库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.weight__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	o6 = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("其他出库单 Material_o_other_move06", data);
		// return ctx.send({ success: false, message: `其他出库单 Material_o_other_move06` });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
			let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_mater_two_pda_entry__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "原料二号冻库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.weight__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Auxiliary_o_other = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
			let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_auxiliary_pda_out__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "辅料库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};

	Auxiliary_o_other_move = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		console.log("采购入库单 接收参数4444：", data);
		// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
			let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_auxiliary_pda_entry__c"; // pda 入库 出库表
			let table_stock = "hk_mater_stock__c"; // 货架表
			let table_stock_detail = "hk_mater_stock_detail__c"; // 库存表
			let stock_name = "辅料库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.weight__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);
						// \	console.log('payload', payload);

						// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Pack_o_other = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数：", data);

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
			let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_pack_pda_out__c"; // pda 入库 出库表
			let table_stock = ""; // 货架表
			let table_stock_detail = "hk_pack_stock_detail__c"; // 库存表
			let stock_name = "包材库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "处理库存成功");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未出库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.final_pick_quantity__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.final_pick_quantity__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
	Pack_o_other_move = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		const docs = data?.selectedRows;
		// console.log("采购入库单 接收参数222：", data);
		// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

		this.logTimerOnce("Material_o_other", "定时器 > 回传SAP > 原料出库 - 其他出库单");

		if (docs.length) {
			let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
			let table_pda_data = "hk_pack_pda_entry__c"; // pda 入库 出库表
			let table_stock = ""; // 货架表
			let table_stock_detail = "hk_pack_stock_detail__c"; // 库存表
			let stock_name = "包材库";
			for (const element of docs) {
				if (["正在执行", "重新执行", "回传SAP错误"].includes(element.status__c)) {
					const d1 = await db.find(table_pda_data, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						// 相同单号下的数据是否全部出库成功了？ 才可回传SAP
						// 回传成功后，更新相同单号的出库任务，都标记完成，防止多次回传！
						const doc_whole_task = await db.find(table_pda_data, { query: { document_id__c: element.document_id__c } });
						if(doc_whole_task.length == 0){
								return ctx.send({ success: false, message: `回传错误：${stock_name} 表单据指令号和单据号错误！` });
						}
						const isWholeFinish = doc_whole_task.every(v => v.status__c == "入库完成");
						if (!isWholeFinish) {
							return ctx.send({ success: false, message: `回传错误：该单号下有未入库完成的托盘！` });
						}

						let totalWeight = 0;
						for (const item of d1) {
							totalWeight = Number((Math.round((Number(totalWeight) + Number(item.weight__c || 0)) * 1000) / 1000).toFixed(3));
						}
						await db.updateOne(table_doc_detail, element._id, { handle_quantity__c: totalWeight });

						const result = Object.values(
							d1.reduce((acc, curr) => {
								if (!acc[curr.batch__c]) {
									acc[curr.batch__c] = { batch: curr.batch__c, quantity: 0 };
								}
								acc[curr.batch__c].quantity += curr.weight__c || 0;

								return acc;
							}, {})
						);
						// [
						// 	{
						// 		batch: "2605270002",
						// 		quantity: 2000,
						// 	},
						// 	{
						// 		batch: "2606090001",
						// 		quantity: 3000,
						// 	},
						// ];

						let areaEumn: any = {
							原料雷马外租冻库: "7600",
							原料一号冻库: "7601",
							原料二号冻库: "7602",
							原料中铁外租冻库: "7603",
							辅料库: "7604",
							包材库: "7605",
							线边库: "7606",
							冷冻库: "7607",
							冷藏库: "7608",
							成品常温库: "7609",
						};

						const today = new Date();
						const today_date = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
						const sendSapData = result.map((v: any) => {
							let Kostl = "";
							if (element.type_move__c == "Z05 成本中心发料") {
								Kostl = element.cost_center__c;
							}
							let lotGout = "";
							if (element.type_move__c == "311 库存调拨") {
								lotGout = areaEumn[element.recept_area__c];
							}
							return {
								Charg: v.batch,
								Menge: String(v.quantity),
								Matnr: element.material_code__c, // 物料代码
								LgortIn: areaEumn[element.area__c], // 冷藏库
								LgortOut: lotGout, // 调拨入库仓库
								Meins: element.unit__c,
								Kostl: Kostl, // 成本中心，76010001
								Zeile: "0010",
								Werks: "7600",
							};
						});

						let payload = {};
						if (element.type_move__c == "Z01 盘亏") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z01", // 出库 - 盘亏 Z01
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z05 成本中心发料") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z05", // 出库 - -成本中心发料 Z05
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z07 报废发货") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z07", // 出库 - -报废发货 Z07
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "Z17 称差库存调整减少") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "Z17", // 出库 - -称差库存调整减少 Z17
								TOITEMS: sendSapData,
							};
						} else if (element.type_move__c == "311 库存调拨") {
							payload = {
								Werks: "7600",
								Budat: today_date,
								TaskNo: element.document_id__c,
								ErrCode: "",
								ErrMsg: "",
								Mjahr: "",
								Mblnr: "",
								Bwart: "311", // 出库 - -库存调拨 311
								TOITEMS: sendSapData,
							};
						}

						console.log("参数：", payload);
						// return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | +++++++++++++++++++++++++++++++" });

						const insInfo = {
							time__c: time(),
							interface_name__c: `回传SAP-${stock_name} - 其他出库单`,
							params__c: ``, // 参数
							results__c: "", // 返回结果
							status__c: "", // 状态：成功或失败
							desc__c: "", // 描述
							error_info__c: "", // 失败消息
							success_info__c: "", // 成功消息
						};
						const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
						const interfaceId = await Record({ params__c: JSON.stringify(payload) });

						const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_003_SRV/HEADERSet`;

						try {
							const { success, token, cookie, authHeader, message } = (await Sap.GetToekn(ctx)) as any;
							if (!success) {
								await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								await db.updateOne(table_doc_detail, element._id, { doc_send_info__c: "通讯失败，获取SAP，token失败，无法传输SAP数据！" });
								return ctx.sendError(500, message);
							}
							const resp = await axios.post(targetUrl, payload, {
								headers: {
									"X-CSRF-Token": token,
									Cookie: this.normalizeCookie(cookie),
									"Content-Type": "application/json",
									Authorization: authHeader,
									Accept: "application/json",
								},
								validateStatus: () => true,
							});
							if (resp.status >= 200 && resp.status < 300) {
								const d = resp.data.d;
								const code = d.ErrCode;
								if (code == "0") {
									const docs_dateil = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
									if (docs_dateil.length) {
										for (const el of docs_dateil) {
											await db.updateOne(table_doc_detail, el._id, { doc_send_back__c: resp.data.d.ErrMsg || "单据回传SAP成功！", status_sap__c: "回传成功", status__c: "已完成" });
										}
									}

									// 回传SAP成功后，PDA出库表 更新状态
									for (const element of doc_whole_task) {
										await db.updateOne(table_pda_data, element._id, { desc__c: "回传SAP成功！", status__c: "已完成" });
									}
									await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg || "单据回传SAP成功！" });
									return ctx.send({ success: true, message: "回传SAP成功，任务结束！" });
								} else {
									await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${d.ErrMsg}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
									await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
									return ctx.send({ success: false, message: `回传SAP失败：${d.ErrMsg}！` });
								}
							} else {
								const error_message = resp.data.error.message.value;
								await db.updateOne(table_doc_detail, element._id, { doc_send_back__c: `错误：${error_message}`, status_sap__c: "回传失败", status__c: "回传SAP错误" });
								await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
								return ctx.send({ success: false, message: error_message });
							}
						} catch (err: any) {
							await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
							return ctx.sendError(500, err?.message || "请求 SAP 失败");
						}
					} else {
						return ctx.send({ success: false, message: `根据单据指令号: ${element.doc_instruction__c} 未找到入库或出库任务！` });
						await db.updateOne(table_doc_detail, element._id, { status__c: "已完成", handle_quantity__c: 0, desc__c: "该单据未获取到初禹入库托盘信息 及 无法回传SAP数据！" });
					}
				} else {
					return ctx.send({ success: false, message: "执行状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！" });
				}
			}
		} else {
			return ctx.send({ success: false, message: "未传递数据！" });
		}
	};
}

export default new App();
