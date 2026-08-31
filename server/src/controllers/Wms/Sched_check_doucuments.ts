import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time } from "@/src/utils";
import axios from "axios";
import Sap from "./Sap";

class App extends Basic {
	constructor() {
		super();
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

	static async writeInterfaceReceive(ctx: Context, insInfo: any) {
		const Record = async (obj: any) => await ctx.mongo.insertOne("hk_interface_sap_wms__c", { ...insInfo, ...obj });
		const UpdateRecord = async (id: string, obj: any) => await ctx.mongo.updateOne("hk_interface_sap_wms__c", id, { ...obj });
		const ErrorInfo = async (obj: any) => await ctx.mongo.insertOne("hk_interface_sap_wms__c", { ...insInfo, ...obj });
		return { Record, UpdateRecord, ErrorInfo };
	}
	// const insInfo = {
	// 	time__c: time(),
	// 	interface_name__c: "推送SAP-生产入库单",
	// params__c: ``, // 参数
	// results__c: "", // 返回结果
	// status__c: "", // 状态：成功或失败
	// desc__c: "", // 描述
	// error_info__c: "", // 失败消息
	// success_info__c: "", // 成功消息
	// };
	// const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
	// const interfaceId = await Record({ desc__c: "WCS入库申请上报托盘号" });
	// await UpdateRecord(interfaceId, { status__c: "失败",results__c: JSON.stringify(payload),  error_info__c: "" });
	// await UpdateRecord(interfaceId, { status__c: "成功",results__c: JSON.stringify(payload),  success_info__c: "" });

	// 成品库 - 手动 - 生产入库单
	Product_send_production = async (ctx: Context) => {
		this.logTimerOnce("Product_send_production", "定时器 > 推送SAP > 成品入库：生产入库单");

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
		// console.log("成品入库：生产入库单", docs.length);
		if (docs.length) {
			// 推送SAP结果、 入库推送单据，入库结果回传推送
			// 推送SAP结果、出库结果回传推送

			const element = docs[0];

			await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: "正在更新" });

			const sap_date = element.sap_date__c.replaceAll("-", "");

			const payload = {
				Matnr: element.material_code__c, // 物料代码
				Pwerk: "7600", //  工厂
				Meins: element.unit__c, // 单位
				Psmng: String(element?.quantity__c), // 订单数量
				// Aufnr: element.document_id__c, // 订单号
				Dgltp: sap_date, // sap订单日期
			};
			console.log("参数", payload);

			const insInfo = {
				time__c: element.time__c ? element.time__c : time(),
				interface_name__c: "推送SAP-生产入库单",
				// params__c: ``, // 参数
				// results__c: "", // 返回结果
				//  status__c: "",
				// desc__c: "", // 描述
				// error_info__c: "", // 失败消息
				// success_info__c: "", // 成功消息
			};
			const { Record, UpdateRecord } = await App.writeInterfaceReceive(ctx, insInfo);
			const interfaceId = await Record({ params__c: JSON.stringify(payload) });
			// await UpdateRecord(interfaceId, { status__c: "失败",results__c: JSON.stringify(payload),  error_info__c: "" });

			const targetUrl = `${this.sap_address}/sap/opu/odata/sap/ZODATA_YUZ_002_SRV/HEADERSet`;
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
					console.log("d1", d);

					if (code == "0") {
						await UpdateRecord(interfaceId, { status__c: "成功", results__c: JSON.stringify(resp.data), success_info__c: resp.data.d.ErrMsg });
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: resp.data.d.ErrMsg, document_id__c: d.Aufnr });
					} else {
						await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: d.ErrMsg || "单据回传失败！" });
						await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: `错误：${d.ErrMsg}`, document_id__c: d.Aufnr });
					}
					return ctx.send({ success: true, message: "成功", data: resp.data });
				} else {
					const error = resp.data.error;
					const error_message = resp.data.error.message.value;
					console.log("错误信息 error_message：", error_message);
					await UpdateRecord(interfaceId, { status__c: "失败", results__c: JSON.stringify(resp.data), error_info__c: error_message });
					return ctx.send({ success: false, message: error_message });
				}
			} catch (err: any) {
				await UpdateRecord(interfaceId, { status__c: "失败", error_info__c: err?.message });
				await db.updateOne("hk_product_doc_detail__c", element._id, { doc_send_info__c: err?.message });
				return ctx.sendError(500, err?.message || "请求 SAP 失败");
			}
		} else {
			return ctx.send({ success: true, message: "无生成订单数据" });
		}
	};

	// 成品库 - 手动 - 其他入库单
	Product_e_production = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("Product_e_production", "定时器 > 校验字段 > 成品入库：生产入库单");

		const docs = await db.find("hk_product_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: "生产入库单" },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			const element = docs[0];

			if (!element.material_code__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入物料代码" });
				return null;
			}
			if (!element.unit__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入单位" });
				return null;
			}
			if (!element.quantity__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入数量" });
				return null;
			}
			if (!element.production_date__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入生产日期" });
				return null;
			}
			if (!element.sap_date__c) {
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入sap订单日期" });
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
				await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "生产日期格式不正确，格式 2026-05-15" });
				return null;
			}

			// 格式化批号
			function formatBatchNo(prodDate: { split: (arg0: string) => [any, any, any] }) {
				const [year, month, day] = prodDate.split("-");
				return year.slice(2) + month + day;
			}
			const batch_format = formatBatchNo(element.production_date__c);

			const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

			await db.updateOne("hk_product_doc_detail__c", element._id, {
				time__c: element.time__c ? element.time__c : time(),
				desc__c: "",
				doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
				// document_id__c: `TASK${document_format}0001`,
				document_id__c: "",
				// batch__c: `${batch_format}0001`,
				cmdtype__c: "入库任务",
				status__c: "正在执行", // 手动
			});
		}
	};

	// 成品库 - 手动 - 其他出库单
	Product_o_other = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("Product_o_other", "定时器 > 校验字段 > 成品出库：其他出库单");

		const docs = await db.find("hk_product_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: "其他出库单" },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.material_code__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入物料代码！" });
					return null;
				}
				if (!element.area__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择冷藏库还是冷冻库！" });
					return null;
				}
				if (!element.quantity__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入数量！" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入单位！" });
					return null;
				}
				if (!element.type_move__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择移动类型！" });
					return null;
				}
				if (element.type_move__c == "Z05 成本中心发料") {
					if (!element.cost_center__c) {
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 成本中心！" });
						return null;
					}
				}

				if (element.type_move__c == "311 库存调拨") {
					if (!element.recept_area__c) {
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 入库仓库|接收仓库！" });
						return null;
					}
				}
				if (!element.export_way__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择【出库方式】！" });
					return null;
				}
				if (["指定生产日期"].includes(element.export_way__c)) {
					if (!element.production_date__c) {
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择【生产日期】！" });
						return null;
					}
				}

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, "0");
				const day = String(today.getDate()).padStart(2, "0");
				const formattedDate = `${year}${month}${day}`;
				const randomNum = Math.floor(Math.random() * 9000) + 1000;

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_product_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					document_id__c: `TASK${formattedDate}${randomNum}`,
					cmdtype__c: "出库任务",
					// export_way__c: "日期先进先出",
					status__c: "未执行",
				});
			}
		}
	};

	private N_Product_o_compound = 1;
	// 成品库 - 自动 - 销售出、需求出
	Product_o_compound = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("Product_o_compound", "定时器 > 校验字段 > 成品出库：销售出、需求出 ");

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
				if (!element.export_way__c) {
					await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择【出库方式】！" });
					return null;
				}
				if (["指定生产日期"].includes(element.export_way__c)) {
					if (!element.production_date__c) {
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择【生产日期】！" });
						return null;
					}
				}
				if (["指定组"].includes(element.export_way__c)) {
					if (!element.export_group__c) {
						await db.updateOne("hk_product_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未输入【组号】！" });
						return null;
					}
				}

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, "0");
				const day = String(today.getDate()).padStart(2, "0");
				const formattedDate = `${year}${month}${day}`;
				const randomNum = Math.floor(Math.random() * 9000) + 1000;

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_product_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					// document_id__c: `TASK${formattedDate}${randomNum}`,
					cmdtype__c: "出库任务",
					// export_way__c: "日期先进先出",
					status__c: "未执行",
				});
			}
		}
	};

	// 原料库 - 手动 - 其他入
	material_e_manual = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_e_manual", "定时器 > 校验字段 > 原料入库：其他入库单");

		const docs = await db.find("hk_mater_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: "其他入库单" },
					{ status__c: "其他入库单" },
					// {
					// 	$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					// },
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
						time__c: element.time__c ? element.time__c : time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
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
	// 原料库 - 自动 - 采购入
	material_e_auto = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_e_auto", "定时器 > 校验字段 > 原料入库：采购入、销售退");

		const docs = await db.find("hk_mater_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["采购入库单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}

				if (["原料一号冻库", "原料二号冻库", "原料雷马外租冻库", "原料中铁外租冻库"].includes(element.area__c)) {
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

					const barcode_rule = await db.find("hk_mater_barcode_rule__c", {
						query: { material_code__c: element.material_code__c, country__c: element.country__c.trim(), factory_no__c: String(element.factory_no__c).trim() },
					});
					if (barcode_rule.length == 0) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据物料代码：${element.material_code__c}, 国家：${element.country__c.trim()} 厂号：${String(element.factory_no__c).trim()},  未维护【条码维护表】截取位置！` });
						return null;
					} else if (barcode_rule.length > 1) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据物料代码：${element.material_code__c}, 国家：${element.country__c.trim()} 厂号：${String(element.factory_no__c).trim()},  未维护【条码维护表】数据重复！` });
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
						time__c: element.time__c ? element.time__c : time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
						// document_id__c: `TASK${todayDate()}0001`,
						// batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",
					});
				} else {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "库区错误" });
					return null;
				}
			}
		}
	};

	auxiliry_e_auto = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("auxiliry_e_auto", "定时器 > 校验字段 > 辅料入库：采购入、销售退");

		const docs = await db.find("hk_auxiliary_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["采购入库单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}

				if (["辅料库"].includes(element.area__c)) {
					if (!element.line_item__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【行号】 字段" });
						return null;
					}
					if (!element.material_code__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】 字段" });
						return null;
					}
					if (!element.production_date__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【生产日期】 字段" });
						return null;
					}
					// if (!element.country__c) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【国家】 字段" });
					// 	return null;
					// }
					// if (!element.factory_no__c) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【厂号】 字段" });
					// 	return null;
					// }

					// if (!element.is_tax__c) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【是否保税】 字段" });
					// 	return null;
					// }
					// if (element.is_tax__c) {
					// 	if (element.is_tax__c == "保税") {
					// 		if (!element.contract__c) {
					// 			await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "保税，无 【合同号】 字段" });
					// 			return null;
					// 		}
					// 	}
					// 	if (element.is_tax__c == "非保税") {
					// 		if (!element.supplier__c) {
					// 			await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "非保税，无 【供应商】 字段" });
					// 			return null;
					// 		}
					// 	}
					// }

					if (!element.unit__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】 字段" });
						return null;
					}

					if (!element.quantity__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】 字段" });
						return null;
					}

					// const barcode_rule = await db.find("hk_mater_barcode_rule__c", {
					// 	query: { material_code__c: element.material_code__c, country__c: element.country__c.trim(), factory_no__c: String(element.factory_no__c).trim() },
					// });
					// if (barcode_rule.length == 0) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据物料代码：${element.material_code__c}, 国家：${element.country__c.trim()} 厂号：${String(element.factory_no__c).trim()},  未维护【条码维护表】截取位置！` });
					// 	return null;
					// } else if (barcode_rule.length > 1) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据物料代码：${element.material_code__c}, 国家：${element.country__c.trim()} 厂号：${String(element.factory_no__c).trim()},  未维护【条码维护表】数据重复！` });
					// 	return null;
					// }

					// 校验生产日期
					function isValidProductionDate(dateStr: string) {
						const regex = /^\d{4}-\d{2}-\d{2}$/;
						if (!regex.test(dateStr)) return false;
						const [year, month, day] = dateStr.split("-").map(Number);
						const date = new Date(year, month - 1, day);
						return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
					}
					if (!isValidProductionDate(element.production_date__c)) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【生产日期】格式不正确，格式：2026-05-15" });
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

					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, {
						time__c: element.time__c ? element.time__c : time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
						// document_id__c: `TASK${todayDate()}0001`,
						// batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",
					});
				} else {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "库区错误" });
					return null;
				}
			}
		}
	};

	pack_e_auto = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("pack_e_auto", "定时器 > 校验字段 > 包材入库：采购入、销售退");

		const docs = await db.find("hk_pack_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["采购入库单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}

				if (["包材库"].includes(element.area__c)) {
					if (!element.line_item__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【行号】 字段" });
						return null;
					}
					if (!element.material_code__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】 字段" });
						return null;
					}
					if (!element.production_date__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【生产日期】 字段" });
						return null;
					}
					// if (!element.country__c) {
					// 	await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【国家】 字段" });
					// 	return null;
					// }
					// if (!element.factory_no__c) {
					// 	await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【厂号】 字段" });
					// 	return null;
					// }

					// if (!element.is_tax__c) {
					// 	await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【是否保税】 字段" });
					// 	return null;
					// }
					// if (element.is_tax__c) {
					// 	if (element.is_tax__c == "保税") {
					// 		if (!element.contract__c) {
					// 			await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "保税，无 【合同号】 字段" });
					// 			return null;
					// 		}
					// 	}
					// 	if (element.is_tax__c == "非保税") {
					// 		if (!element.supplier__c) {
					// 			await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "非保税，无 【供应商】 字段" });
					// 			return null;
					// 		}
					// 	}
					// }

					if (!element.unit__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】 字段" });
						return null;
					}

					if (!element.quantity__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】 字段" });
						return null;
					}

					// const barcode_rule = await db.find("hk_mater_barcode_rule__c", {
					// 	query: { material_code__c: element.material_code__c, country__c: element.country__c.trim(), factory_no__c: String(element.factory_no__c).trim() },
					// });
					// if (barcode_rule.length == 0) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据物料代码：${element.material_code__c}, 国家：${element.country__c.trim()} 厂号：${String(element.factory_no__c).trim()},  未维护【条码维护表】截取位置！` });
					// 	return null;
					// } else if (barcode_rule.length > 1) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据物料代码：${element.material_code__c}, 国家：${element.country__c.trim()} 厂号：${String(element.factory_no__c).trim()},  未维护【条码维护表】数据重复！` });
					// 	return null;
					// }

					// 校验生产日期
					function isValidProductionDate(dateStr: string) {
						const regex = /^\d{4}-\d{2}-\d{2}$/;
						if (!regex.test(dateStr)) return false;
						const [year, month, day] = dateStr.split("-").map(Number);
						const date = new Date(year, month - 1, day);
						return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
					}
					if (!isValidProductionDate(element.production_date__c)) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【生产日期】格式不正确，格式：2026-05-15" });
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

					await db.updateOne("hk_pack_doc_detail__c", element._id, {
						time__c: element.time__c ? element.time__c : time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
						// document_id__c: `TASK${todayDate()}0001`,
						// batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",
					});
				} else {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "库区错误" });
					return null;
				}
			}
		}
	};
	// 销售退
	material_e_sale_back = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_e_auto", "定时器 > 校验字段 > 原料入库：销售退");

		const docs = await db.find("hk_mater_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["销售退货单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}
				if (["原料一号冻库", "原料二号冻库", "原料雷马外租冻库", "原料中铁外租冻库"].includes(element.area__c)) {
					if (!element.material_code__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】 字段" });
						return null;
					}
					if (!element.batch__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】 字段，输入批号，获取【批次主数据表】中字段数据！" });
						return null;
					}

					// 根据批次获取批次主数据，然后获取是否有字段，然后更新下面必须要的字段
					const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
					if (Batch_Docs.length == 0) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
						return null;
					}
					const elementBatchMain = Batch_Docs[0]; // 批次主数据详情数据

					if (!elementBatchMain.production_date__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【生产日期】 字段" });
						return null;
					}
					if (!elementBatchMain.country__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【国家】 字段" });
						return null;
					}

					if (!elementBatchMain.factory_no__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【厂号】 字段" });
						return null;
					}

					if (!elementBatchMain.is_tax__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【是否保税】 字段" });
						return null;
					}
					if (elementBatchMain.is_tax__c) {
						if (elementBatchMain.is_tax__c == "保税") {
							if (!elementBatchMain.contract__c) {
								await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "保税，无 【合同号】 字段" });
								return null;
							}
						}
						if (elementBatchMain.is_tax__c == "非保税") {
							if (!elementBatchMain.supplier__c) {
								await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "非保税，无 【供应商】 字段" });
								return null;
							}
						}
					}

					if (!elementBatchMain.unit__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】 字段" });
						return null;
					}

					if (!elementBatchMain.quantity__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】 字段" });
						return null;
					}

					const barcode_rule = await db.find("hk_mater_barcode_rule__c", {
						query: { material_code__c: elementBatchMain.material_code__c, country__c: elementBatchMain.country__c, factory_no__c: elementBatchMain.factory_no__c },
					});
					if (barcode_rule.length == 0) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未维护【条码维护表】截取位置！" });
						return null;
					} else if (barcode_rule.length > 1) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【条码维护表】数据维护数据重复！" });
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
					if (!isValidProductionDate(elementBatchMain.production_date__c)) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【生产日期】格式不正确，格式：2026-05-15" });
						return null;
					}

					// // 格式化批号
					// function formatBatchNo(prodDate: { split: (arg0: string) => [any, any, any] }) {
					// 	const [year, month, day] = prodDate.split("-");
					// 	return year.slice(2) + month + day;
					// }
					// const batch_format = formatBatchNo(elementBatchMain.production_date__c); // 260607

					// function todayDate() {
					// 	const today = new Date();
					// 	const year = today.getFullYear();
					// 	const month = String(today.getMonth() + 1).padStart(2, "0");
					// 	const day = String(today.getDate()).padStart(2, "0");
					// 	const formattedDate = `${year}${month}${day}`;
					// 	return formattedDate;
					// }

					const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

					await db.updateOne("hk_mater_doc_detail__c", element._id, {
						time__c: element.time__c ? element.time__c : time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
						// document_id__c: `TASK${todayDate()}0001`,
						// batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",

						material_name__c: elementBatchMain?.material_name__c,
						production_date__c: elementBatchMain.production_date__c,
						country__c: elementBatchMain.country__c,
						factory_no__c: elementBatchMain.factory_no__c,
						is_tax__c: elementBatchMain.is_tax__c,
						contract__c: elementBatchMain.contract__c || "",
						supplier__c: elementBatchMain.supplier__c || "",
						unit__c: elementBatchMain.unit__c,
						cabinet__c: elementBatchMain.cabinet__c, // 柜号
						suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
						sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
					});
				} else {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "除 原料一号库，其他未开发好" });
					return null;
				}
			}
		}
	};
	auxiliry_e_sale_back = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("auxiliry_e_sale_back", "定时器 > 校验字段 > 辅料入库：销售退");

		const docs = await db.find("hk_auxiliary_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["销售退货单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}
				if (["辅料"].includes(element.area__c)) {
					if (!element.material_code__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】 字段" });
						return null;
					}
					if (!element.batch__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】 字段，输入批号，获取【批次主数据表】中字段数据！" });
						return null;
					}

					// 根据批次获取批次主数据，然后获取是否有字段，然后更新下面必须要的字段
					const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
					if (Batch_Docs.length == 0) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
						return null;
					}
					const elementBatchMain = Batch_Docs[0]; // 批次主数据详情数据
					// console.log('elementBatchMain', elementBatchMain);
					// return

					if (!elementBatchMain.production_date__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【生产日期】 字段" });
						return null;
					}
					// if (!elementBatchMain.country__c) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【国家】 字段" });
					// 	return null;
					// }

					// if (!elementBatchMain.factory_no__c) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【厂号】 字段" });
					// 	return null;
					// }

					// if (!elementBatchMain.is_tax__c) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【是否保税】 字段" });
					// 	return null;
					// }
					// if (elementBatchMain.is_tax__c) {
					// 	if (elementBatchMain.is_tax__c == "保税") {
					// 		if (!elementBatchMain.contract__c) {
					// 			await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "保税，无 【合同号】 字段" });
					// 			return null;
					// 		}
					// 	}
					// 	if (elementBatchMain.is_tax__c == "非保税") {
					// 		if (!elementBatchMain.supplier__c) {
					// 			await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "非保税，无 【供应商】 字段" });
					// 			return null;
					// 		}
					// 	}
					// }

					if (!elementBatchMain.unit__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】 字段" });
						return null;
					}

					if (!elementBatchMain.quantity__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】 字段" });
						return null;
					}

					// const barcode_rule = await db.find("hk_mater_barcode_rule__c", {
					// 	query: { material_code__c: elementBatchMain.material_code__c, country__c: elementBatchMain.country__c, factory_no__c: elementBatchMain.factory_no__c },
					// });
					// if (barcode_rule.length == 0) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未维护【条码维护表】截取位置！" });
					// 	return null;
					// } else if (barcode_rule.length > 1) {
					// 	await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【条码维护表】数据维护数据重复！" });
					// 	return null;
					// }

					// 校验生产日期
					function isValidProductionDate(dateStr: string) {
						const regex = /^\d{4}-\d{2}-\d{2}$/;
						if (!regex.test(dateStr)) return false;
						const [year, month, day] = dateStr.split("-").map(Number);
						const date = new Date(year, month - 1, day);
						return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
					}
					if (!isValidProductionDate(elementBatchMain.production_date__c)) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【生产日期】格式不正确，格式：2026-05-15" });
						return null;
					}

					// // 格式化批号
					// function formatBatchNo(prodDate: { split: (arg0: string) => [any, any, any] }) {
					// 	const [year, month, day] = prodDate.split("-");
					// 	return year.slice(2) + month + day;
					// }
					// const batch_format = formatBatchNo(elementBatchMain.production_date__c); // 260607

					// function todayDate() {
					// 	const today = new Date();
					// 	const year = today.getFullYear();
					// 	const month = String(today.getMonth() + 1).padStart(2, "0");
					// 	const day = String(today.getDate()).padStart(2, "0");
					// 	const formattedDate = `${year}${month}${day}`;
					// 	return formattedDate;
					// }

					const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, {
						time__c: element.time__c ? element.time__c : time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
						// document_id__c: `TASK${todayDate()}0001`,
						// batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",

						production_date__c: elementBatchMain.production_date__c,
						country__c: elementBatchMain.country__c,
						factory_no__c: elementBatchMain.factory_no__c,
						is_tax__c: elementBatchMain.is_tax__c,
						contract__c: elementBatchMain.contract__c || "",
						supplier__c: elementBatchMain.supplier__c || "",
						unit__c: elementBatchMain.unit__c,

						cabinet__c: elementBatchMain.cabinet__c, // 柜号
						suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
						sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
					});
				} else {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "库区错误" });
					return null;
				}
			}
		}
	};

	pack_e_sale_back = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("pack_e_sale_back", "定时器 > 校验字段 > 包材入库：销售退");

		const docs = await db.find("hk_pack_doc_detail__c", {
			query: {
				$and: [
					{ document_type__c: { $in: ["销售退货单"] } },
					{
						$or: [{ status__c: "重新执行" }, { status__c: { $exists: false } }, { status__c: null }],
					},
				],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】 字段" });
					return null;
				}
				if (["包材库"].includes(element.area__c)) {
					if (!element.material_code__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】 字段" });
						return null;
					}
					if (!element.batch__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】 字段，输入批号，获取【批次主数据表】中字段数据！" });
						return null;
					}

					// 根据批次获取批次主数据，然后获取是否有字段，然后更新下面必须要的字段
					const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
					if (Batch_Docs.length == 0) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
						return null;
					}
					const elementBatchMain = Batch_Docs[0]; // 批次主数据详情数据
					// console.log('elementBatchMain', elementBatchMain);
					// return

					if (!elementBatchMain.production_date__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【生产日期】 字段" });
						return null;
					}
					// if (!elementBatchMain.country__c) {
					// 	await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【国家】 字段" });
					// 	return null;
					// }

					// if (!elementBatchMain.factory_no__c) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【厂号】 字段" });
					// 	return null;
					// }

					// if (!elementBatchMain.is_tax__c) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【是否保税】 字段" });
					// 	return null;
					// }
					// if (elementBatchMain.is_tax__c) {
					// 	if (elementBatchMain.is_tax__c == "保税") {
					// 		if (!elementBatchMain.contract__c) {
					// 			await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "保税，无 【合同号】 字段" });
					// 			return null;
					// 		}
					// 	}
					// 	if (elementBatchMain.is_tax__c == "非保税") {
					// 		if (!elementBatchMain.supplier__c) {
					// 			await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "非保税，无 【供应商】 字段" });
					// 			return null;
					// 		}
					// 	}
					// }

					if (!elementBatchMain.unit__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】 字段" });
						return null;
					}

					if (!elementBatchMain.quantity__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】 字段" });
						return null;
					}

					// const barcode_rule = await db.find("hk_mater_barcode_rule__c", {
					// 	query: { material_code__c: elementBatchMain.material_code__c, country__c: elementBatchMain.country__c, factory_no__c: elementBatchMain.factory_no__c },
					// });
					// if (barcode_rule.length == 0) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未维护【条码维护表】截取位置！" });
					// 	return null;
					// } else if (barcode_rule.length > 1) {
					// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【条码维护表】数据维护数据重复！" });
					// 	return null;
					// }

					// 校验生产日期
					function isValidProductionDate(dateStr: string) {
						const regex = /^\d{4}-\d{2}-\d{2}$/;
						if (!regex.test(dateStr)) return false;
						const [year, month, day] = dateStr.split("-").map(Number);
						const date = new Date(year, month - 1, day);
						return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
					}
					if (!isValidProductionDate(elementBatchMain.production_date__c)) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "【生产日期】格式不正确，格式：2026-05-15" });
						return null;
					}

					// // 格式化批号
					// function formatBatchNo(prodDate: { split: (arg0: string) => [any, any, any] }) {
					// 	const [year, month, day] = prodDate.split("-");
					// 	return year.slice(2) + month + day;
					// }
					// const batch_format = formatBatchNo(elementBatchMain.production_date__c); // 260607

					// function todayDate() {
					// 	const today = new Date();
					// 	const year = today.getFullYear();
					// 	const month = String(today.getMonth() + 1).padStart(2, "0");
					// 	const day = String(today.getDate()).padStart(2, "0");
					// 	const formattedDate = `${year}${month}${day}`;
					// 	return formattedDate;
					// }

					const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

					await db.updateOne("hk_pack_doc_detail__c", element._id, {
						time__c: element.time__c ? element.time__c : time(),
						status__c: "正在执行",
						desc__c: "",
						doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
						// document_id__c: `TASK${todayDate()}0001`,
						// batch__c: `${batch_format}0001`,
						cmdtype__c: "入库任务",

						production_date__c: elementBatchMain.production_date__c,
						country__c: elementBatchMain.country__c,
						factory_no__c: elementBatchMain.factory_no__c,
						is_tax__c: elementBatchMain.is_tax__c,
						contract__c: elementBatchMain.contract__c || "",
						supplier__c: elementBatchMain.supplier__c || "",
						unit__c: elementBatchMain.unit__c,

						cabinet__c: elementBatchMain.cabinet__c, // 柜号
						suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
						sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
					});
				} else {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "库区错误" });
					return null;
				}
			}
		}
	};

	// 原料库 - 手动 - 其他出
	material_o_manual = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_o_manual", "定时器 > 校验字段 > 原料出库：其他出 ");

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
			// 其他出库单创建时：表单必填字段是：只展示这些字段就可以，库区area__c、物料代码material_code__c、批号batch__c、出库数量quantity__c、单位unit__c、移动类型type_move__c、如果移动类型选择"Z05 成本中心发料"，那么需要填成本中心cost_center__c、如果移动类型选择"311 库存调拨"，那么需要填接收仓库recept_area__c
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
				// if (!element.contract__c) {
				// 	await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【合同号】字段" });
				// 	return null;
				// }
				if (!element.quantity__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】字段" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】字段" });
					return null;
				}
				if (!element.type_move__c) {
					await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择移动类型！" });
					return null;
				}
				if (element.type_move__c == "Z05 成本中心发料") {
					if (!element.cost_center__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 成本中心！" });
						return null;
					}
				}
				let updateDoc = {};
				if (element.type_move__c == "311 库存调拨") {
					if (!element.recept_area__c) {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 入库仓库|接收仓库！" });
						return null;
					}
					// let updateDoc = {};
					let f1 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料一号冻库";
					let f2 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料二号冻库";
					let f3 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料一号冻库";
					let f4 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料二号冻库";
					let f5 = element.area__c == "线边库" && element.recept_area__c == "原料一号冻库";
					let f6 = element.area__c == "线边库" && element.recept_area__c == "原料二号冻库";

					let m1 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "线边库";
					let m2 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "线边库";
					let m3 = element.area__c == "原料一号冻库" && element.recept_area__c == "线边库";
					let m4 = element.area__c == "原料二号冻库" && element.recept_area__c == "线边库";
					if (f1 || f2 || f3 || f4 || f5 || f6) {
						const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c?.trim(), material_code__c: element.material_code__c } });
						if (Batch_Docs.length == 0) {
							await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
							return null;
						}
						let status = "未执行";
						let desc = "未执行状态可以执行出库！";
						if (f5 || f6) {
							status = "正在执行";
							desc = "线边库移库使用手持机入库！";
						}
						const elementBatchMain = Batch_Docs[0];
						updateDoc = {
							production_date__c: elementBatchMain.production_date__c,
							country__c: elementBatchMain.country__c,
							factory_no__c: elementBatchMain.factory_no__c,
							is_tax__c: elementBatchMain.is_tax__c,
							contract__c: elementBatchMain.contract__c || "",
							supplier__c: elementBatchMain.supplier__c || "",
							unit__c: elementBatchMain.unit__c,
							cabinet__c: elementBatchMain.cabinet__c, // 柜号
							suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
							sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
							status__c: status,
							desc__c: desc,
						};
					} else if (m1 || m2 || m3 || m4) {
					} else {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "选择的发出仓库和入库仓库错误！" });
						return null;
					}
				}

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, "0");
				const day = String(today.getDate()).padStart(2, "0");
				const formattedDate = `${year}${month}${day}`;
				const randomNum = Math.floor(Math.random() * 9000) + 1000;

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_mater_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					document_id__c: `TASK${formattedDate}${randomNum}`,
					cmdtype__c: "出库任务",
					// export_way__c: "日期先进先出",
					status__c: "未执行",
					export_loc__c: "3号口",
					...updateDoc,
				});
			}
		}
	};

	auxiliry_o_manual = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("auxiliry_o_manual", "定时器 > 校验字段 > 辅料出库：其他出 ");

		const docs = await db.find("hk_auxiliary_doc_detail__c", {
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
			// 其他出库单创建时：表单必填字段是：只展示这些字段就可以，库区area__c、物料代码material_code__c、批号batch__c、出库数量quantity__c、单位unit__c、移动类型type_move__c、如果移动类型选择"Z05 成本中心发料"，那么需要填成本中心cost_center__c、如果移动类型选择"311 库存调拨"，那么需要填接收仓库recept_area__c
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】字段" });
					return null;
				}

				if (!element.material_code__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】字段" });
					return null;
				}
				if (!element.batch__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】字段" });
					return null;
				}
				if (!element.quantity__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】字段" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】字段" });
					return null;
				}
				if (!element.type_move__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择移动类型！" });
					return null;
				}
				if (element.type_move__c == "Z05 成本中心发料") {
					if (!element.cost_center__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 成本中心！" });
						return null;
					}
				}

				let updateDoc = {};
				if (element.type_move__c == "311 库存调拨") {
					if (!element.recept_area__c) {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 入库仓库|接收仓库！" });
						return null;
					}
					if (element.area__c == "辅料库" && element.recept_area__c == "线边库") {
					} else if (element.area__c == "线边库" && element.recept_area__c == "辅料库") {
						const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
						if (Batch_Docs.length == 0) {
							await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
							return null;
						}
						const elementBatchMain = Batch_Docs[0];
						updateDoc = {
							production_date__c: elementBatchMain.production_date__c,
							country__c: elementBatchMain.country__c,
							factory_no__c: elementBatchMain.factory_no__c,
							is_tax__c: elementBatchMain.is_tax__c,
							contract__c: elementBatchMain.contract__c || "",
							supplier__c: elementBatchMain.supplier__c || "",
							unit__c: elementBatchMain.unit__c,
							cabinet__c: elementBatchMain.cabinet__c, // 柜号
							suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
							sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
							status__c: "正在执行",
							desc__c: "库存调拨使用手持机选择单据入库！",
						};
					} else {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "选择的发出仓库和入库仓库错误！" });
						return null;
					}
				}

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, "0");
				const day = String(today.getDate()).padStart(2, "0");
				const formattedDate = `${year}${month}${day}`;
				const randomNum = Math.floor(Math.random() * 9000) + 1000;

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_auxiliary_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					document_id__c: `TASK${formattedDate}${randomNum}`,
					cmdtype__c: "出库任务",
					// export_way__c: "日期先进先出",
					status__c: "未执行",
					export_loc__c: "3号口",
					...updateDoc,
				});
			}
		}
	};
	pack_o_manual = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("pack_o_manual", "定时器 > 校验字段 > 包材出库：其他出 ");

		const docs = await db.find("hk_pack_doc_detail__c", {
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
			// 其他出库单创建时：表单必填字段是：只展示这些字段就可以，库区area__c、物料代码material_code__c、批号batch__c、出库数量quantity__c、单位unit__c、移动类型type_move__c、如果移动类型选择"Z05 成本中心发料"，那么需要填成本中心cost_center__c、如果移动类型选择"311 库存调拨"，那么需要填接收仓库recept_area__c
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】字段" });
					return null;
				}

				if (!element.material_code__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】字段" });
					return null;
				}
				if (!element.batch__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】字段" });
					return null;
				}
				if (!element.quantity__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】字段" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】字段" });
					return null;
				}
				if (!element.type_move__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "未选择移动类型！" });
					return null;
				}
				if (element.type_move__c == "Z05 成本中心发料") {
					if (!element.cost_center__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 成本中心！" });
						return null;
					}
				}

				let updateDoc = {};
				if (element.type_move__c == "311 库存调拨") {
					if (!element.recept_area__c) {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "其他出库未选择 入库仓库|接收仓库！" });
						return null;
					}
					// let updateDoc = {};
					if (element.area__c == "包材库" && element.recept_area__c == "线边库") {
					} else if (element.area__c == "线边库" && element.recept_area__c == "包材库") {
						const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
						if (Batch_Docs.length == 0) {
							await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
							return null;
						}
						const elementBatchMain = Batch_Docs[0];
						updateDoc = {
							production_date__c: elementBatchMain.production_date__c,
							country__c: elementBatchMain.country__c,
							factory_no__c: elementBatchMain.factory_no__c,
							is_tax__c: elementBatchMain.is_tax__c,
							contract__c: elementBatchMain.contract__c || "",
							supplier__c: elementBatchMain.supplier__c || "",
							unit__c: elementBatchMain.unit__c,
							cabinet__c: elementBatchMain.cabinet__c, // 柜号
							suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
							sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
						};
					} else {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "选择的发出仓库和入库仓库错误！" });
						return null;
					}
				}

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, "0");
				const day = String(today.getDate()).padStart(2, "0");
				const formattedDate = `${year}${month}${day}`;
				const randomNum = Math.floor(Math.random() * 9000) + 1000;

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_pack_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					document_id__c: `TASK${formattedDate}${randomNum}`,
					cmdtype__c: "出库任务",
					status__c: "未执行",
					export_loc__c: "3号口",
					...updateDoc,
				});
			}
		}
	};

	// 原料库 - 自动- 销售出、需求出
	material_o_auto = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_o_auto", "定时器 > 校验字段 > 原料出库：销售出、需求出");

		const docs = await db.find("hk_mater_doc_detail__c", {
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

				let updateDoc = {};
				if (element.document_type__c == "需求出库单") {
					let f1 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料一号冻库";
					let f2 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料二号冻库";
					let f3 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料一号冻库";
					let f4 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料二号冻库";
					let f5 = element.area__c == "线边库" && element.recept_area__c == "原料一号冻库";
					let f6 = element.area__c == "线边库" && element.recept_area__c == "原料二号冻库";

					let m1 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "线边库";
					let m2 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "线边库";
					let m3 = element.area__c == "原料一号冻库" && element.recept_area__c == "线边库";
					let m4 = element.area__c == "原料二号冻库" && element.recept_area__c == "线边库";
					if (f1 || f2 || f3 || f4 || f5 || f6) {
						const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
						if (Batch_Docs.length == 0) {
							await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
							return null;
						}
						let status = "未执行";
						let desc = "未执行状态可以执行出库！";
						if (f5 || f6) {
							status = "正在执行";
							desc = "线边库移库使用手持机入库！";
						}
						const elementBatchMain = Batch_Docs[0];
						updateDoc = {
							production_date__c: elementBatchMain.production_date__c,
							country__c: elementBatchMain.country__c,
							factory_no__c: elementBatchMain.factory_no__c,
							is_tax__c: elementBatchMain.is_tax__c,
							contract__c: elementBatchMain.contract__c || "",
							supplier__c: elementBatchMain.supplier__c || "",
							unit__c: elementBatchMain.unit__c,
							cabinet__c: elementBatchMain.cabinet__c, // 柜号
							suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
							sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
							status__c: status,
							desc__c: desc,
						};
					} else if (m1 || m2 || m3 || m4) {
					} else {
						await db.updateOne("hk_mater_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "选择的发出仓库和入库仓库错误！" });
						return null;
					}
				}

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_mater_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					cmdtype__c: "出库任务",
					status__c: "未执行",
					...updateDoc,
				});
			}
		}
	};

	auxiliry_o_auto = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("auxiliry_o_auto", "定时器 > 校验字段 > 辅料出库：销售出、需求出");

		const docs = await db.find("hk_auxiliary_doc_detail__c", {
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
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】字段" });
					return null;
				}

				if (!element.material_code__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】字段" });
					return null;
				}
				if (!element.batch__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】字段" });
					return null;
				}

				if (!element.quantity__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】字段" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】字段" });
					return null;
				}

				let updateDoc = {};
				if (element.document_type__c == "需求出库单") {
					if (element.area__c == "辅料库" && element.recept_area__c == "线边库") {
					} else if (element.area__c == "线边库" && element.recept_area__c == "辅料库") {
						const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
						if (Batch_Docs.length == 0) {
							await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
							return null;
						}
						const elementBatchMain = Batch_Docs[0];
						updateDoc = {
							production_date__c: elementBatchMain.production_date__c,
							country__c: elementBatchMain.country__c,
							factory_no__c: elementBatchMain.factory_no__c,
							is_tax__c: elementBatchMain.is_tax__c,
							contract__c: elementBatchMain.contract__c || "",
							supplier__c: elementBatchMain.supplier__c || "",
							unit__c: elementBatchMain.unit__c,
							cabinet__c: elementBatchMain.cabinet__c, // 柜号
							suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
							sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
							status__c: "正在执行",
							desc__c: "库存调拨使用手持机选择单据入库！",
						};
					} else {
						await db.updateOne("hk_auxiliary_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "选择的发出仓库和入库仓库错误！" });
						return null;
					}
				}

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_auxiliary_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					cmdtype__c: "出库任务",
					status__c: "未执行",
					...updateDoc,
				});
			}
		}
	};
	pack_o_auto = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("pack_o_auto", "定时器 > 校验字段 > 包材出库：销售出、需求出");

		const docs = await db.find("hk_pack_doc_detail__c", {
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
			for (const element of docs) {
				if (!element.area__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【库区】字段" });
					return null;
				}

				if (!element.material_code__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【物料代码】字段" });
					return null;
				}
				if (!element.batch__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【批号】字段" });
					return null;
				}
				if (!element.quantity__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【数量】字段" });
					return null;
				}
				if (!element.unit__c) {
					await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "无 【单位】字段" });
					return null;
				}
				let updateDoc = {};
				if (element.document_type__c == "需求出库单") {
					if (element.area__c == "包材库" && element.recept_area__c == "线边库") {
					} else if (element.area__c == "线边库" && element.recept_area__c == "包材库") {
						const Batch_Docs = await db.find("hk_batch_material_main__c", { query: { batch__c: element.batch__c.trim(), material_code__c: element.material_code__c } });
						if (Batch_Docs.length == 0) {
							await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: `根据批号:${element.batch__c}和物料代码: ${element.material_code__c} 未在【批次主数据表】中找到相应的数据！` });
							return null;
						}
						const elementBatchMain = Batch_Docs[0];
						updateDoc = {
							production_date__c: elementBatchMain.production_date__c,
							country__c: elementBatchMain.country__c,
							factory_no__c: elementBatchMain.factory_no__c,
							is_tax__c: elementBatchMain.is_tax__c,
							contract__c: elementBatchMain.contract__c || "",
							supplier__c: elementBatchMain.supplier__c || "",
							unit__c: elementBatchMain.unit__c,
							cabinet__c: elementBatchMain.cabinet__c, // 柜号
							suggest_order__c: elementBatchMain.suggest_order__c, // 提单号
							sealing_order__c: elementBatchMain.sealing_order__c, // 封签号
						};
					} else {
						await db.updateOne("hk_pack_doc_detail__c", element._id, { status__c: "任务创建错误", desc__c: "选择的发出仓库和入库仓库错误！" });
						return null;
					}
				}

				const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;

				await db.updateOne("hk_pack_doc_detail__c", element._id, {
					time__c: element.time__c ? element.time__c : time(),
					desc__c: "未执行状态可以执行出库！",
					doc_instruction__c: element.doc_instruction__c ? element.doc_instruction__c : uuid6,
					cmdtype__c: "出库任务",
					status__c: "未执行",
					...updateDoc,
				});
			}
		}
	};
}

export default new App();
