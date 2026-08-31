import { Context } from "koa";
import Basic from "../../basic";
import Sap from "../../Wms/Sap";
import { FieldSchema } from "../../../types/schema";
import _ from "lodash";
import { time, time_horizontal } from "@/src/utils";
const path = require("path");
const fs = require("fs");

class App extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = "成品库SAP单据";
	private readonly Collection = "hk_product_doc__c";

	private readonly Doc = "hk_product_doc__c";
	private readonly Doc_detail = "hk_product_doc_detail__c";

	private FieldSchema: any = async (ctx: any) => {
		const { FieldSchema }: any = await this.Query_FieldSchema(ctx, this.Collection);
		return FieldSchema;
	};

	private TableOps = {
		allowCreate: true, // 新建
		allowEdit: true, // 编辑
		allowDelete: true, // 删除
		allowRowEdit: true, // 行编辑
		allowBatchDelete: true, // 批量删除
		allowBatchEdit: true, // 批量编辑
		allowImport: true, // 允许导入
	};

	private async getSubmittedRowKeys(ctx: Context, docType: string, docNo: string, year: string) {
		const docs = await ctx.mongo.find(this.Doc_detail, {
			query: { document_id__c: docNo, document_type__c: docType, year__c: year },
		});
		return docs.map((item: any) => _.trim(item.row_signature__c || "")).filter(Boolean);
	}

	Query = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;

			const query = this.QueryFilter(data, field_Schema);

			const hasPagination = _.has(data, 'pagination.page') && _.has(data, 'pagination.pageSize');
			const page = hasPagination ? _.clamp(_.toInteger(_.get(data, 'pagination.page')), 1, Number.MAX_SAFE_INTEGER) : undefined;
			const pageSize = hasPagination ? _.clamp(_.toInteger(_.get(data, 'pagination.pageSize')), 1, 100) : undefined;

			const sort = _.get(data, 'sort', { updateTime: -1, createTime: -1 });
			const findOptions: any = { query, sort };
			if (hasPagination) Object.assign(findOptions, { page, pageSize });

			const [count, list] = await Promise.all([ctx.mongo.count(this.Collection, query), ctx.mongo.find(this.Collection, findOptions)]);

			const schemaObject: FieldSchema = await this.InitSchema(ctx, this.Collection, field_Schema);
			const schema: any = { ...schemaObject, __ops__: this.TableOps };

			const tableInfo = { tableName: this.tableName, collection: this.Collection };
			return ctx.send({ list, page: page || 1, pageSize: pageSize || count, total: count, schema, init_schema: field_Schema, tableInfo });
		} catch (err: any) {
			return ctx.sendError(500, err.message || "服务器错误");
		}
	};

	searchSapDocs = async (ctx: Context) => {
		try {
			const db = ctx.mongo;
			const data: any = ctx.request.body || {};
			console.log("日期筛选单号接口：", data);
			const docType = _.trim(data.docType || "");
			const startData = _.trim(data.startData || "");
			const endDate = _.trim(data.endDate || "");

			if (!docType) return ctx.sendError(400, "请选择单据类型");
			if (!startData) return ctx.sendError(400, "请选择开始日期");
			if (!endDate) return ctx.sendError(400, "请选择结束日期");

			let results: any = [];
			if (["销售出库单", "销售退货单"].includes(docType)) {
				const sapResult = await Sap.Common_Filter_by_date_sale(ctx, startData, endDate);
				if (!sapResult?.success) throw new Error(sapResult?.message || "查询 SAP 单据失败");

				let orders = _.get(sapResult, "data.d.results", []);
				if (orders.length) {
					results = [...new Set(orders.map((v: any) => v.VbelnVl))];
				}
			}
			if (docType == "需求出库单") {
				const sapResult = await Sap.Common_Filter_by_date_demand(ctx, startData, endDate);
				if (!sapResult?.success) throw new Error(sapResult?.message || "查询 SAP 单据失败");

				let orders = _.get(sapResult, "data.d.results", []);
				if (orders.length) {
					results = [
						...new Set(
							orders.map((v: any) => {
								return `${v.ZqqId} # ${v.Zbumen}`;
							})
						),
					];
				}
			}
			if (["采购入库单", "采购退货单"].includes(docType)) {
				const sapResult = await Sap.Common_Filter_by_date_purchase(ctx, startData, endDate);
				if (!sapResult?.success) throw new Error(sapResult?.message || "查询 SAP 单据失败");

				let orders = _.get(sapResult, "data.d.results", []);
				if (orders.length) {
					results = [...new Set(orders.map((v: any) => v.Ebeln))];
				}
			}
			if (results.length) {
				return ctx.send({ success: true, message: "获取单号成功！", results });
			} else {
				return ctx.send({ success: false, message: "根据日期获取单号失败！", results: [] });
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || "查询单据失败");
		}
	};

	private async getSapDocumentResults(ctx: Context, docType: string, docNo: string, year: string) {
		let results: any = [];

		if (["销售出库单", "销售退货单"].includes(docType)) {
			const sapResult = await Sap.Common_Product_sale_detail(ctx, docNo);
			if (!sapResult?.success) throw new Error(sapResult?.message || "查询 SAP 单据失败");
			// return _.get(sapResult, "data.d.results", []);
			// let results: any = [];
			let orders = _.get(sapResult, "data.d.results", []);
			if (orders.length) {
				if (docType == "销售出库单") {
					results = orders.filter((v: any) => v.PstyvVl == "TAN" || v.PstyvVl == "TANN");
					// results = [...new Set(orderList.map((v: any) => v.VbelnVl))];
				}
				if (docType == "销售退货单") {
					results = orders.filter((v: any) => v.PstyvVl == "REN");
					// results = [...new Set(orderList.map((v: any) => v.VbelnVl))];
				}
			}
		}
		if (docType == "需求出库单") {
			const sapResult = await Sap.Common_demand_detail(ctx, docNo, year);
			if (!sapResult?.success) throw new Error(sapResult?.message || "查询 SAP 单据失败");
			return _.get(sapResult, "data.d.results", []);
		}
		if (["采购入库单", "采购退货单"].includes(docType)) {
			const sapResult = await Sap.Common_purchase_get(ctx, docNo);
			if (!sapResult?.success) throw new Error(sapResult?.message || "查询 SAP 单据失败");
			// return _.get(sapResult, "data.d.results", []);
			let orders = _.get(sapResult, "data.d.results", []);
			if (orders.length) {
				if (docType == "采购入库单") {
					results = orders.filter((v: any) => v.Bsart == "ZGNB" || v.Bsart == "ZNB");
					// results = [...new Set(orderList.map((v: any) => v.Ebeln))];
				}
				if (docType == "采购退货单") {
					results = orders.filter((v: any) => v.Bsart == "ZTPO");
					// results = [...new Set(orderList.map((v: any) => v.Ebeln))];
				}
			}
		}

		return results;
	}

	SearchSapDocument = async (ctx: Context) => {
		try {
			const db = ctx.mongo;
			const data: any = ctx.request.body || {};
			console.log("查询单据明细接口：", data);
			const docType = _.trim(data.docType || "");
			const docNo = _.trim(data.docNo || "");
			const year = _.trim(data.year || "");

			if (!docType) return ctx.sendError(400, "请选择单据类型");
			if (!docNo) return ctx.sendError(400, "请输入单号");
			// if (!year) return ctx.sendError(400, "请输入年份");

			let new_doc = "";
			if (docType == "需求出库单") {
				const hasHash = docNo.includes("#");
				if (hasHash) {
					new_doc = docNo.split("#")[0].trim(); // "0000018982"
				} else {
					new_doc = docNo;
				}
			} else {
				new_doc = docNo;
			}

			const results = await this.getSapDocumentResults(ctx, docType, new_doc, year);
			const submittedRowKeys = await this.getSubmittedRowKeys(ctx, docType, new_doc, year);
			if (["采购入库单", "销售退货单"].includes(docType)) {
				const Saved = await db.find(this.Doc_detail, { query: { document_id__c: new_doc } });
				return ctx.send({ success: true, results, submittedRowKeys, Saved });
			} else {
				return ctx.send({ success: true, results, submittedRowKeys, Saved: [] });
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || "查询单据失败");
		}
	};

	// 提交SAP单据
	SubmitSapDocument = async (ctx: Context) => {
		try {
			const db = ctx.mongo;
			const data: any = ctx.request.body || {};
			console.log("data", data);

			const docType = _.trim(data.docType || "");
			const docNo = _.trim(data.docNo || "");
			const year = _.trim(data.year || "");
			const selectedRows = Array.isArray(data.selectedRows) ? data.selectedRows : [];
			// return ctx.send({ success: false, message: "提交成功，单据已保存++++++++++++++++++++++" });

			if (!docType) return ctx.sendError(400, "请选择单据类型");
			if (!docNo) return ctx.sendError(400, "请输入单号");
			// if (!year) return ctx.sendError(400, "请输入年份");
			if (!selectedRows.length) return ctx.sendError(400, "请选择要提交的数据");

			// ! 将获取的数据存储起来，必须全选选择仓库
			// 存储前查询一下，是否已经存储过了
			// 根据每个单子不同字段，存储的数据也不同
			// 此库是原料库、存储的表是【原料库SAP单据详情】

			// 选择仓库不同，仓库区域不同，字段做标记

			// ! 保存提交的Sap接口信息, 原料库
			try {
				// 保存数据出错、不影响后续程序执行！
				const pallet_id = String(docNo); // 文件名：单号
				const storeContent = selectedRows; // 需要存储的数据
				const filename = `${time_horizontal()}_${pallet_id || ""}.json`; // 文件名：时间+托盘号
				const filePath = path.join("D:", "api_accept_Sap_material", filename); // 文件夹名
				const dir = path.dirname(filePath);
				if (!fs.existsSync(dir)) {
					fs.mkdirSync(dir, { recursive: true });
				}
				const dataToSave = JSON.stringify(storeContent, null, 2);
				fs.writeFileSync(filePath, dataToSave, "utf8");
			} catch (error: any) {
				console.error("保存数据时出错:", error);
			}

			let areaEumn: any = {
				"7600": "原料雷马外租冻库",
				"7601": "原料一号冻库",
				"7602": "原料二号冻库",
				"7603": "原料中铁外租冻库",
				"7604": "辅料库",
				"7605": "包材库",
				"7606": "线边库",
				"7607": "冷冻库",
				"7608": "冷藏库",
				"7609": "成品常温库",
			};

			let doc_Table = this.Doc;
			let doc_Detail_Table = this.Doc_detail;

			if (["销售出库单", "销售退货单"].includes(docType)) {
				// 根据数组中内容写入到数据库中即可
				// 入库至仓库，修改库区即可
				let area = "";
				let cmdtype = "入库任务";
				if (docType == "销售出库单") {
					cmdtype = "出库任务";
					area = data?.out_area_code__c || "";
				} else if (docType == "销售退货单") {
					cmdtype = "入库任务";
					area = data?.in_area_code__c || "";
				}
				if (selectedRows.length) {
					for (const element of selectedRows) {
						const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;
						await db.insertOne(doc_Detail_Table, {
							time__c: time(),
							document_id__c: element.VbelnVl,
							line_item__c: element.PosnrVl,
							supplier__c: element.Lifnr,
							material_code__c: element.Matnr,
							material_name__c: element.Maktx,
							quantity__c: Number(element.Lfimg),
							unit__c: element.Vrkme,

							doc_instruction__c: uuid6,
							document_type__c: docType, // 单据类型  Bsart
							cmdtype__c: cmdtype,
							area__c: areaEumn[area],

							// status__c: "未执行",

							// { title: '销售组织', dataIndex: 'Vkorg', key: 'Vkorg', width: 160 },
							// { title: '客户编码', dataIndex: 'Kunnr', key: 'Kunnr', width: 160 },
							// { title: '客户名称', dataIndex: 'Kunnrt', key: 'Kunnrt', width: 160 },
							sale_organization__c: element.Vkorg,
							customer_code__c: element.Kunnr,
							customer_name__c: element.Kunnrt,
						});
					}

					const docs = await db.find(doc_Table, { query: { document_id__c: selectedRows[0].VbelnVl } });
					if (docs.length == 0) {
						await db.insertOne(doc_Table, {
							time__c: time(),
							document_id__c: selectedRows[0].VbelnVl, // 单据编号
							document_type__c: docType, // 单据类型  Bsart
							cmdtype__c: cmdtype,
							area__c: areaEumn[area],
							status__c: "未执行",
						});
					}

					const Saved = await db.find(doc_Detail_Table, { query: { document_id__c: selectedRows[0].VbelnVl } });
					if (cmdtype == "入库任务") {
						return ctx.send({ success: true, message: `提交成功， ${selectedRows.length} 条数据已保存! `, Saved });
					} else if (cmdtype == "出库任务") {
						return ctx.send({ success: true, message: `提交成功， ${selectedRows.length} 条数据已保存! `, Saved: [] });
					}
				} else {
					return ctx.send({ success: false, message: "提交失败， 请选择要提交的数据!" });
				}
			}
			if (docType == "需求出库单") {
				const from_area_code = data?.from_area_code__c || "";
				const to_area_code__c = data?.to_area_code__c || "";

				if (selectedRows.length) {
					for (const element of selectedRows) {
						const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;
						await db.insertOne(doc_Detail_Table, {
							time__c: time(),
							document_id__c: element.ZqqId,
							line_item__c: element.Ebelp,
							supplier__c: element.Lifnr,
							material_code__c: element.Matnr,
							material_name__c: element.Maktx,
							quantity__c: Number(element.Menge),
							unit__c: element.Meins,
							is_tax__c: element.IsBonded,
							factory_no__c: element.FactoryId,
							country__c: element.Country,

							doc_instruction__c: uuid6,
							document_type__c: docType, // 单据类型  Bsart
							cmdtype__c: "出库任务",
							area__c: areaEumn[from_area_code],
							recept_area__c: areaEumn[to_area_code__c],

							// status__c: "未执行",

							lead_department__c: element.Zbumen, // 领用部门
							piece__c: element.Jian, // 件数
							year__c: element.ZqqYear,
						});
					}

					const docs = await db.find(doc_Table, { query: { document_id__c: selectedRows[0].ZqqId } });
					if (docs.length == 0) {
						await db.insertOne(doc_Table, {
							time__c: time(),
							document_id__c: selectedRows[0].ZqqId, // 单据编号
							document_type__c: docType, // 单据类型  Bsart
							cmdtype__c: "出库任务",
							area__c: areaEumn[from_area_code],
							status__c: "未执行",
						});
					}

					return ctx.send({ success: true, message: `提交成功， ${selectedRows.length} 条数据已保存! `, Saved: [] });
				} else {
					return ctx.send({ success: false, message: "提交失败， 请选择要提交的数据!" });
				}
			}
			if (["采购入库单", "采购退货单"].includes(docType)) {
				if (selectedRows.length) {
					let area = "";
					let cmdtype = "入库任务";
					if (docType == "采购入库单") {
						cmdtype = "入库任务";
						area = data?.in_area_code__c || "";
					} else if (docType == "采购退货单") {
						cmdtype = "出库任务";
						area = data?.out_area_code__c || "";
					}

					for (const element of selectedRows) {
						let tax = "";
						const IsBonded = element?.IsBonded || "";
						if (IsBonded == "") {
							tax = "非保税";
						} else if (IsBonded == "X") {
							tax = "保税";
						} else {
							tax = "未识别";
						}

						const uuid6 = `9${String(+new Date()).substring(6)}${Math.floor(Math.random() * 90) + 10}`;
						await db.insertOne(doc_Detail_Table, {
							time__c: time(),
							document_id__c: element.Ebeln,
							line_item__c: element.Ebelp,
							supplier__c: element.Lifnr,
							material_code__c: element.Matnr,
							material_name__c: element.Maktx,
							quantity__c: Number(element.Menge),
							unit__c: element.Meins,
							is_tax__c: tax,
							factory_no__c: element.FactoryId,
							country__c: element.Country,

							doc_instruction__c: uuid6,
							document_type__c: docType,
							cmdtype__c: cmdtype,
							area__c: areaEumn[area],

							// status__c: "未执行",
							contract__c: element.ZhuoGuiHeTongHao,
							cabinet__c: element.ZhuoGuiHao,

							suggest_order__c: element.BioflaNo, // 提单号
							sealing_order__c: element.SealNo, // 封签号
						});
					}

					const docs = await db.find(doc_Table, { query: { document_id__c: selectedRows[0].Ebeln } });
					if (docs.length == 0) {
						await db.insertOne(doc_Table, {
							time__c: time(),
							document_id__c: selectedRows[0].Ebeln, // 单据编号
							document_type__c: docType, // 单据类型  Bsart
							cmdtype__c: cmdtype,
							area__c: areaEumn[area],
							status__c: "未执行",
						});
					}

					const Saved = await db.find(doc_Detail_Table, { query: { document_id__c: selectedRows[0].Ebeln } });
					if (cmdtype == "入库任务") {
						return ctx.send({ success: true, message: `提交成功， ${selectedRows.length} 条数据已保存! `, Saved });
					} else if (cmdtype == "出库任务") {
						return ctx.send({ success: true, message: `提交成功， ${selectedRows.length} 条数据已保存! `, Saved: [] });
					}
				} else {
					return ctx.send({ success: false, message: "提交失败， 请选择要提交的数据!" });
				}
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || "提交单据失败");
		}
	};

	// 提交SAP单据
	byOrderGetHTML = async (ctx: Context) => {
		try {
			const db = ctx.mongo;
			const data: any = ctx.request.body || {};
			console.log("获取打印单据的参数：", data); //  { docNo: '0000034331', docType: '需求出库单' }
			const docNo = _.trim(data.docNo || "");
			const docType = _.trim(data.docType || "");

			const detailQuery: any = { document_id__c: docNo };
			if (docType) detailQuery.document_type__c = docType;

			//  [
			// 	{
			// 		_id: '6a22c2eeb5f092f747958309',
			// 		time__c: '2026/06/05 20:37:02',
			// 		document_id__c: '4501069850',
			// 		line_item__c: '00010',
			// 		supplier__c: '40007220',
			// 		material_code__c: '50723',
			// 		material_name__c: '牛肉（后腱）',
			// 		quantity__c: 10000,
			// 		unit__c: 'KG',
			// 		is_tax__c: '',
			// 		factory_no__c: '',
			// 		country__c: '',
			// 		doc_instruction__c: '9302291989',
			// 		document_type__c: '采购入库单',
			// 		china_and_aboard__c: '国内采购',
			// 		cmdtype__c: '入库任务',
			// 		area__c: '7603',
			// 		status__c: '未执行',
			// 		space: '61c51b8f4cada30031994f3d',
			// 		created_by: '63dc7de4902db72a48e718f2',
			// 		owner: '63dc7de4902db72a48e718f2',
			// 		created: 2026-06-05T12:37:02.920Z
			// 	}
			// ]

			// 采购入库单，根据图片的格式，表格内显示10行序号，字段是：单据编号 document_id__c、供应商  supplier__c、合同 contract__c、柜号 cabinet__c、提单号  suggest_order__c、物料代码  material_code__c 物料名称 material_name__c、批次  batch__c、生产日期  production_date__c、单位  unit__c、国家 country__c、厂号  factory_no__c.

			// 需求出库单：根据图片的格式 "C:\Users\LENOVO\Desktop\需求.png"，把图片的文字都输出出来、数组中没有的字段我后面自己编辑、表格内显示10行序号，字段是：需求单号 document_id__c、物料代码  material_code__c 物料名称 material_name__c、需求数量 quantity__c、单位  unit__c、批次  batch__c、生产日期  production_date__c、出库仓库 recept_area__c、

			// 销售出库单：isMaterial等于'原料'，根据图片的格式 "C:\Users\LENOVO\Desktop\原料销售.png"，把图片的文字都输出出来、数组中没有的字段我后面自己编辑、表格内显示10行序号，字段是：需求单号 document_id__c、物料代码  material_code__c 物料名称 material_name__c、需求数量 quantity__c、单位  unit__c、批次  batch__c、生产日期  production_date__c、出库仓库 recept_area__c、

			// 成品销售出库单，打印纸张的尺寸是长21.5厘米，宽14厘米，byOrderGetHTML 函数中，else if (docType == "销售出库单") {} 根据图片的格式 ""C:\Users\LENOVO\Desktop\成品销售.png""，把图片的内容格式按照HTML打印模板都输出出来、数组中没有的字段我后面自己编辑、表格内显示10行序号，其中表格以上部分以文字输出出来，出库单号为空、交货单号document_id__c、出库日期是今天的日期、出库类型是销售出库、关税状态为空、客户名称为空、收货联系人为空、联系电话为空、海关查验为空、指定出岛港口为空、出岛地址为空、表格部分：物料编码material_code__c、物料名称material_name__c、规格为空、加一行单据数量quantity__c、出库数量handle_quantity__c、单位unit__c、出库件数piece__c、生产日期production_date__c、保质期a__c、过期时间b__c、存储方式截取area__c字段2-4位字符、出库仓库area__c

			let fDocs = await ctx.mongo.find(this.Doc_detail, { query: detailQuery });
			console.log("fDocs", fDocs);

			const escapeHtml = (value: any) => String(value ?? "").replace(/[&<>'"]/g, (s: string) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[s] as string);

			if (fDocs.length) {
				const doc = Array.isArray(fDocs) && fDocs.length ? fDocs : [];
				const first = doc[0] || {};
				const pickValue = (item: any, keys: string[]) => {
					for (const key of keys) {
						const value = _.get(item, key);
						if (value !== undefined && value !== null && String(value) !== "") return value;
					}
					return "";
				};

				if (docType == "采购入库单") {
					const detailRows = [...doc.slice(0, 10), ...Array(Math.max(10 - doc.length, 0)).fill({})];
					const rowsHtml = detailRows
						.map(
							(item: any, index: number) => `
									<tr>
										<td class="seq">${index + 1}</td>
										<td>${escapeHtml(item.material_code__c)}</td>
										<td>${escapeHtml(item.material_name__c)}</td>
										<td>${escapeHtml(pickValue(item, ["product_code__c", "goods_code__c", "sap_code__c"]))}</td>
										<td>${escapeHtml(pickValue(item, ["declare_material_name__c", "customs_material_name__c", "item_name__c"]))}</td>
										<td>${escapeHtml(item.specifications__c)}</td>
										<td>${escapeHtml(item.piece__c)}</td>
										<td>${escapeHtml(item.quantity__c)}</td>
										<td>${escapeHtml(item.unit__c)}</td>
										<td>${escapeHtml(pickValue(item, ["recept_area__c", "area__c"]))}</td>
										<td>${escapeHtml(item.tariff_status__c)}</td>
										<td>${escapeHtml(item.country__c)}</td>
										<td>${escapeHtml(item.factory_no__c)}</td>
										<td>${escapeHtml(item.batch__c)}</td>
										<td>${escapeHtml(item.production_date__c)}</td>
										<td>${escapeHtml(item.shelf_life__c)}</td>
										<td>${escapeHtml(pickValue(item, ["goods_status__c", "cargo_status__c", "status_goods__c"]))}</td>
									</tr>`
						)
						.join("");

					const html = `<!DOCTYPE html>
											<html lang="zh-CN">
											<head>
												<meta charset="UTF-8" />
												<title>原料采购入库单</title>
												<style>
													@page { size: landscape; margin: 0; }
													* { box-sizing: border-box; }
													body { margin: 0; color: #000; font-family: SimSun, "宋体", serif; background: #fff; }
													.print-sheet { width: 100%; padding: 0; }
													.company { text-align: center; font-size: 24px; font-weight: 700; line-height: 30px; margin-top: 4px; }
													.title { text-align: center; font-size: 22px; font-weight: 700; line-height: 30px; margin: 4px 0 8px; }
													table { width: 100%; border-collapse: collapse; table-layout: fixed; }
													.meta, .detail, .footer { font-size: 12px; }
													.meta td { border: none; height: 26px; padding: 2px 4px; vertical-align: middle; }
													.detail th, .detail td, .footer td { border: 1px solid #666; padding: 2px 4px; vertical-align: middle; }
													.detail th, .detail td { height: 28px; text-align: center; word-break: break-all; }
													.detail th { font-weight: 400; white-space: nowrap; }
													.note td { height: 28px; font-size: 12px; }
													.left { text-align: left; }
													.center { text-align: center; }
													.seq { width: 4%; }
													.detail col:nth-child(1) { width: 4%; }
													.detail col:nth-child(2) { width: 7%; }
													.detail col:nth-child(3) { width: 9%; }
													.detail col:nth-child(4) { width: 8%; }
													.detail col:nth-child(5) { width: 9%; }
													.detail col:nth-child(6) { width: 5%; }
													.detail col:nth-child(7) { width: 6%; }
													.detail col:nth-child(8) { width: 7%; }
													.detail col:nth-child(9) { width: 5%; }
													.detail col:nth-child(10) { width: 6%; }
													.detail col:nth-child(11) { width: 6%; }
													.detail col:nth-child(12) { width: 5%; }
													.detail col:nth-child(13) { width: 5%; }
													.detail col:nth-child(14) { width: 7%; }
													.detail col:nth-child(15) { width: 7%; }
													.detail col:nth-child(16) { width: 5%; }
													.detail col:nth-child(17) { width: 6%; }
													.footer td { height: 40px; border-top: none; }
													.footer .spacer { border-left: none; border-right: none; }
													@media print { .print-sheet { page-break-after: always; } }
												</style>
											</head>
											<body>
												<div class="print-sheet">
													<div class="company">海南云紫食品有限公司</div>
													<div class="title">原料采购入库单</div>
													<table class="meta">
														<tr>
															<td class="left">单据编号:</td><td>${escapeHtml(first.document_id__c)}</td><td></td><td></td>
															<td class="left">供应商:</td><td>${escapeHtml(first.supplier__c)}</td><td></td><td></td>
															<td class="left">SAP单号:</td><td>${escapeHtml(pickValue(first, ["sap_doc_no__c", "sap_no__c", "doc_send_back__c"]))}</td><td></td><td></td>
														</tr>
														<tr>
															<td class="left">报关单号:</td><td>${escapeHtml(pickValue(first, ["customs_declaration_no__c", "declare_no__c"]))}</td><td></td><td></td>
															<td class="left">核注清单号:</td><td>${escapeHtml(pickValue(first, ["check_list_no__c", "verification_list_no__c"]))}</td><td></td><td></td>
															<td class="left">合同号:</td><td>${escapeHtml(first.contract__c)}</td><td></td><td></td>
														</tr>
														<tr>
															<td class="left">柜号:</td><td>${escapeHtml(first.cabinet__c)}</td><td></td><td></td>
															<td class="left">标签号:</td><td>${escapeHtml(pickValue(first, ["label_no__c", "label_code__c"]))}</td><td></td><td></td>
															<td class="left">提货号:</td><td>${escapeHtml(first.suggest_order__c)}</td><td></td><td></td>
														</tr>
													</table>
													<table class="note">
														<tr>
															<td class="left">备注: 此单一式三联，白联为收货仓库联，红联为财务联，黄联为客户联。</td>
														</tr>
													</table>
													<table class="detail">
														<colgroup><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/></colgroup>
														<thead>
															<tr>
																<th>序号</th><th>物料编码</th><th>物料名称</th><th>商品编码</th><th>报关料件名称</th><th>规格</th><th>入库件数</th><th>入库数量</th><th>单位</th><th>入库仓库</th><th>关税状态</th><th>国家</th><th>厂号</th><th>批次号</th><th>生产日期</th><th>保质期</th><th>货物状态</th>
															</tr>
														</thead>
														<tbody>${rowsHtml}</tbody>
													</table>
													<div class="footer">
														<table>
															<tr>
																<td class="left">制单人:</td>
																<td class="spacer"></td>
																<td class="left">收货人:</td>
																<td class="spacer"></td>
																<td class="left">入库日期:</td>
															</tr>
														</table>
													</div>
												</div>
												<script>window.onload = function () { window.print(); };</script>
											</body>
											</html>`;

					return ctx.send({ success: true, message: `成功：单据生成完成`, data: html });
				} else if (docType == "需求出库单") {
					const detailRows = [...doc.slice(0, 10), ...Array(Math.max(10 - doc.length, 0)).fill({})];
					const rowsHtml = detailRows
						.map(
							(item: any, index: number) => `
									<tr>
										<td class="seq">${index + 1}</td>
										<td>${escapeHtml(item.material_code__c)}</td>
										<td>${escapeHtml(item.material_name__c)}</td>
										<td>${escapeHtml(item.specifications__c)}</td>
										<td>${escapeHtml(item.quantity__c)}</td>
										<td>${escapeHtml(item.unit__c)}</td>
										<td>${escapeHtml(pickValue(item, ["actual_quantity__c", "real_quantity__c", "out_quantity__c"]))}</td>
										<td>${escapeHtml(pickValue(item, ["piece__c", "actual_piece__c", "real_piece__c"]))}</td>
										<td>${escapeHtml(item.batch__c)}</td>
										<td>${escapeHtml(pickValue(item, ["recept_area__c", "area__c"]))}</td>
										<td>${escapeHtml(item.production_date__c)}</td>
										<td>${escapeHtml(item.shelf_life__c)}</td>
									</tr>`
						)
						.join("");

					const html = `<!DOCTYPE html>
											<html lang="zh-CN">
											<head>
												<meta charset="UTF-8" />
												<title>需求出库单</title>
												<style>
													@page { size: landscape; margin: 0; }
													* { box-sizing: border-box; }
													body { margin: 0; color: #000; font-family: SimSun, "宋体", serif; background: #fff; }
													.print-sheet { width: 100%; padding: 0; }
													.company { text-align: center; font-size: 24px; font-weight: 700; line-height: 30px; margin-top: 4px; }
													.title { text-align: center; font-size: 22px; font-weight: 700; line-height: 30px; margin: 4px 0 8px; }
													table { width: 100%; border-collapse: collapse; table-layout: fixed; }
													.meta, .detail, .footer, .note { font-size: 12px; }
													.meta td { border: none; height: 28px; padding: 2px 4px; vertical-align: middle; }
													.detail th, .detail td, .footer td, .note td { border: 1px solid #666; padding: 2px 4px; vertical-align: middle; }
													.note td { height: 30px; }
													.detail th, .detail td { height: 34px; text-align: center; word-break: break-all; }
													.detail th { font-weight: 400; white-space: nowrap; }
													.left { text-align: left; }
													.detail col:nth-child(1) { width: 5%; }
													.detail col:nth-child(2) { width: 8%; }
													.detail col:nth-child(3) { width: 9%; }
													.detail col:nth-child(4) { width: 6%; }
													.detail col:nth-child(5) { width: 9%; }
													.detail col:nth-child(6) { width: 5%; }
													.detail col:nth-child(7) { width: 8%; }
													.detail col:nth-child(8) { width: 9%; }
													.detail col:nth-child(9) { width: 11%; }
													.detail col:nth-child(10) { width: 11%; }
													.detail col:nth-child(11) { width: 9%; }
													.detail col:nth-child(12) { width: 10%; }
													.footer td { height: 52px; border-top: none; }
													.footer .spacer { border-left: none; border-right: none; }
													@media print { .print-sheet { page-break-after: always; } }
												</style>
											</head>
											<body>
												<div class="print-sheet">
													<div class="company">海南云紫食品有限公司</div>
													<div class="title">需求出库单</div>
													<table class="meta">
														<tr>
															<td class="left">需求日期:</td><td>${escapeHtml(pickValue(first, ["require_date__c", "demand_date__c", "time__c"]))}</td><td></td><td></td>
															<td class="left">需求单号:</td><td>${escapeHtml(first.document_id__c)}</td><td></td><td></td>
															<td class="left">出库日期:</td><td>${escapeHtml(pickValue(first, ["out_date__c", "delivery_date__c"]))}</td><td></td><td></td>
														</tr>
													</table>
													<table class="note">
														<tr>
															<td class="left">备注: 此单一式三联，白联为仓库联，红联为财务联，黄联为生产联。</td>
														</tr>
													</table>
													<table class="detail">
														<colgroup><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/></colgroup>
														<thead>
															<tr>
																<th>序号</th><th>物料代码</th><th>物料名称</th><th>规格</th><th>需求数量</th><th>单位</th><th>实发数量</th><th>实发件数</th><th>批次号</th><th>出库仓库</th><th>生产日期</th><th>保质期</th>
															</tr>
														</thead>
														<tbody>${rowsHtml}</tbody>
													</table>
													<div class="footer">
														<table>
															<tr>
																<td class="left">发货人:</td>
																<td class="spacer"></td>
																<td class="left">领料人:</td>
															</tr>
														</table>
													</div>
												</div>
												<script>window.onload = function () { window.print(); };</script>
											</body>
											</html>`;

					return ctx.send({ success: true, message: `成功：单据生成完成`, data: html });
				} else if (docType == "销售出库单") {
					const detailRows = [...doc.slice(0, 10), ...Array(Math.max(10 - doc.length, 0)).fill({})];
					const today = new Date();
					const todayText = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
					const toNumber = (value: any) => {
						const num = Number(value);
						return Number.isFinite(num) ? num : 0;
					};
					const formatNumber = (value: number) => {
						const fixed = value.toFixed(3);
						return fixed.replace(/\.?0+$/, "");
					};

					const doc_detail = await db.find("hk_product_doc_detail__c", { query: { document_id__c: docNo } });

					const pdaOut = await db.find("hk_product_pda_outgoing__c", { query: { document_id__c: docNo } });

					// 获取当前物料代码和件数
					const GetPiece = (ins: string) => {
						const filter = pdaOut.filter(v => v.doc_instruction__c == ins);
						return Array.isArray(filter) ? filter.reduce((prev: number, curr: any) => prev + toNumber(curr.piece__c), 0) : 0;
					};
					// 获取当前物料代码和 托盘总重量
					const GetPalletQ = (ins: string) => {
						const filter = pdaOut.filter(v => v.doc_instruction__c == ins);
						return Array.isArray(filter) ? filter.reduce((prev: number, curr: any) => Number(Math.round((Number(prev) + Number(curr.quantity__c)) * 1000) / 1000), 0) : 0;
					};

					const sap_main_data = await db.find("hk_main_mater_data__c", { query: {} });
					const getBZQ = (material_code: any) => sap_main_data.filter(v => v.material_code__c == material_code)?.[0].mhdhb__c;

					function calcExpireDate(startDateStr: string | number | Date, days: number) {
						// 1. 解析日期，并设置为本地时间的零点，避免时区偏差
						const date = new Date(startDateStr);
						date.setHours(0, 0, 0, 0);

						// 2. 加上保质期天数（直接加天数）
						date.setDate(date.getDate() + days);

						// 3. 格式化为 YYYY-MM-DD
						const year = date.getFullYear();
						const month = String(date.getMonth() + 1).padStart(2, "0");
						const day = String(date.getDate()).padStart(2, "0");
						return `${year}-${month}-${day}`;
						// console.log(calcExpireDate("2026-07-01", 30)); // 输出: 2026-07-31
					}

					// 汇总部分：单据重量、托盘重量、实际出库重量、出库件数
					const total_doc_quantity = doc_detail.reduce((prev: number, curr: any) => Number(Math.round((Number(prev) + Number(curr.quantity__c)) * 1000) / 1000), 0);
					const total_pallet_quantity = pdaOut.reduce((prev: number, curr: any) => Number(Math.round((Number(prev) + Number(curr.quantity__c)) * 1000) / 1000), 0);
					const total_outStock_quantity = pdaOut.reduce((prev: number, curr: any) => Number(Math.round((Number(prev) + Number(curr.final_pick_quantity__c)) * 1000) / 1000), 0);
					const total_piece = pdaOut.reduce((prev: number, curr: any) => prev + toNumber(curr.piece__c), 0);

					const rowsHtml = detailRows
						.map((item: any, index: number) => {
							const storageMode = item.area__c ? String(item.area__c).substring(0, 2) : "";
							const areaN = item.area__c ? `成品${item.area__c}` : "";
							const palletQ = item.material_code__c ? GetPalletQ(item.doc_instruction__c) : ""; // 托盘汇总总数
							const piece = item.material_code__c ? GetPiece(item.doc_instruction__c) : ""; // 实际出库件数
							const bzq = item.material_code__c ? getBZQ(item.material_code__c) : "";
							const exp = item.material_code__c ? calcExpireDate(item.production_date__c, bzq || 0) : "";
							return `
										<tr>
											<td class="seq">${index + 1}</td>
											<td>${escapeHtml(item.material_code__c)}</td>
											<td>${escapeHtml(item.material_name__c)}</td>
											<td></td>
											<td>${escapeHtml(item.quantity__c)}</td>
											<td>${escapeHtml(palletQ)}</td>
											<td>${escapeHtml(item.handle_quantity__c)}</td>
											<td>${escapeHtml(item.unit__c)}</td>
											<td>${escapeHtml(piece)}</td>
											<td>${escapeHtml(item.production_date__c)}</td>
											<td>${escapeHtml(bzq || "")}</td>
											<td>${escapeHtml(exp || "")}</td>
											<td>${escapeHtml(storageMode)}</td>
											<td>${escapeHtml(areaN)}</td>
										</tr>`;
						})
						.join("");

					const html = `<!DOCTYPE html>
											<html lang="zh-CN">
											<head>
												<meta charset="UTF-8" />
												<title>成品销售出库单</title>
												<style>
													@page { size: 21.5cm 14cm; margin: 0; }
													* { box-sizing: border-box; }
													html, body { width: 21.5cm; height: 14cm; }
													body { margin: 0; color: #000; font-family: SimSun, "宋体", serif; background: #fff; }
													.print-sheet { width: 21.5cm; height: 14cm; padding: 0.08cm 0.18cm; overflow: hidden; }
													.header { position: relative; height: 1.55cm; padding-top: 0.05cm; }
													.company { text-align: center; font-size: 18px; font-weight: 700; line-height: 24px; }
													.title { text-align: center; font-size: 18px; font-weight: 700; line-height: 26px; }
													.notice {
														position: absolute;
														top: 0;
														right: 0.55cm;
														width: 4.8cm;
														padding: 0.06cm 0;
														background: #d9d6d6;
														text-align: center;
														font-size: 10px;
														font-weight: 700;
														line-height: 14px;
													}
													table { width: 100%; border-collapse: collapse; table-layout: fixed; }
													.meta { font-size: 12px; font-weight: 700; margin-bottom: 0.2cm; }
													.meta td { border: none; height: 0.58cm; padding: 0 0.12cm; vertical-align: middle; }
													.meta .label { width: 8%; white-space: nowrap; }
													.meta .value { width: 22%; }
													.meta .wide-value { width: 36%; }
													.tip { text-align: center; white-space: nowrap; }
													.detail { font-size: 8px; font-weight: 700; }
													.detail th, .detail td { border: 1px solid #000; padding: 0 0.04cm; text-align: center; vertical-align: middle; word-break: break-all; }
													.detail th { height: 0.58cm; font-weight: 700; white-space: nowrap; }
													.detail td { height: 0.7cm; }
													.detail .total td { height: 0.66cm; }
													.detail col:nth-child(1) { width: 3%; }
													.detail col:nth-child(2) { width: 6.5%; }
													.detail col:nth-child(3) { width: 14%; }
													.detail col:nth-child(4) { width: 5.5%; }
													.detail col:nth-child(5) { width: 7.5%; }
													.detail col:nth-child(6) { width: 7.5%; }
													.detail col:nth-child(7) { width: 7.5%; }
													.detail col:nth-child(8) { width: 5.5%; }
													.detail col:nth-child(9) { width: 7.5%; }
													.detail col:nth-child(10) { width: 8.3%; }
													.detail col:nth-child(11) { width: 5.5%; }
													.detail col:nth-child(12) { width: 10%; }
													.detail col:nth-child(13) { width: 6%; }
													.detail col:nth-child(14) { width: 8%; }
													.footer { font-size: 12px; font-weight: 700; margin-top: 0.18cm; }
													.footer td { border: none; height: 0.5cm; padding: 0 0.5cm; }
													.left { text-align: left; }
													@media print { .print-sheet { page-break-after: always; } }
												</style>
											</head>
											<body>
												<div class="print-sheet">
													<div class="header">
														<div class="company">海南云紫食品有限公司</div>
														<div class="title">成品销售出库单</div>
														<div class="notice">
															<div>请注意货物是否需要查验</div>
															<div>请注意指定车辆出岛港口</div>
															<div>请注意货物指定查验地址</div>
														</div>
													</div>
													<table class="meta">
														<tr>
															<td class="label left">出库单号:</td><td class="value"></td>
															<td class="label left">交货单号:</td><td class="value">${escapeHtml(first.document_id__c)}</td>
															<td class="label left">出库日期:</td><td class="value">${escapeHtml(todayText)}</td>
														</tr>
														<tr>
															<td class="label left">出库类型:</td><td class="value">销售出库</td>
															<td class="label left">关税状态:</td><td class="value"></td>
															<td class="label left">客户名称:</td><td class="wide-value"></td>
														</tr>
														<tr>
															<td class="label left">收货联系人:</td><td class="value"></td>
															<td class="label left">联系电话:</td><td class="value"></td>
															<td class="tip" colspan="2">请司机师傅先联系收货人预约时间，谢谢！</td>
														</tr>
														<tr>
															<td class="label left">海关查验:</td><td class="value"></td>
															<td class="label left">指定出岛港口:</td><td class="value"></td>
															<td class="label left">出岛地址:</td><td class="wide-value"></td>
														</tr>
													</table>
													<table class="detail">
														<colgroup><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/></colgroup>
														<thead>
															<tr>
																<th>序号</th><th>物料编码</th><th>物料名称</th><th>规格</th><th>单据数量</th><th>出库托盘总数</th><th>实际数量</th><th>单位</th><th>出库件数</th><th>生产日期</th><th>保质期</th><th>过期时间</th><th>存储方式</th><th>出库仓库</th>
															</tr>
														</thead>
														<tbody>
															${rowsHtml}
															<tr class="total">
																<td colspan="4">合计重量</td>
																<td>${escapeHtml(formatNumber(total_doc_quantity))}</td>
																<td>${escapeHtml(formatNumber(total_pallet_quantity))}</td>
																<td>${escapeHtml(formatNumber(total_outStock_quantity))}</td>
																<td>${escapeHtml(first.unit__c)}</td>
																<td>${escapeHtml(formatNumber(total_piece))}</td>
																<td colspan="5"></td>
															</tr>
														</tbody>
													</table>
													<table class="footer">
														<tr>
															<td class="left">发货人:</td>
															<td class="left">客户确认:</td>
															<td class="left">确认知晓是否查验（签名）:</td>
															<td class="left">提货人数量确认:</td>
														</tr>
													</table>
												</div>
												<script>window.onload = function () { window.print(); };</script>
											</body>
											</html>`;

					return ctx.send({ success: true, message: `成功：单据生成完成`, data: html });
				}
			} else {
				return ctx.send({ success: false, message: `失败，根据单号未找到单据详情` });
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || "提交单据失败");
		}
	};

	Add = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;

			const doc = this.addAndModField(data, field_Schema);
			delete doc.lastModified;
			await ctx.mongo.insertOne(this.Collection, doc);
			return ctx.send("添加成功");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	Mod = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const id = ctx.params.id;
			if (!id) return ctx.sendError(400, `修改操作：无iD`);
			const data: any = ctx.request.body;
			const doc = this.addAndModField(data, field_Schema);
			delete doc.lastModified;
			await ctx.mongo.updateOne(this.Collection, id, doc);
			return ctx.send("修改成功");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	ImportEx = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const element of data) {
					const doc = this.addAndModField(element, field_Schema);
					await ctx.mongo.insertOne(this.Collection, doc);
				}
				return ctx.send("数据导入成功");
			} else return ctx.sendError(400, `服务端未获取到数据`);
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	Del = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			if (id) {
				const docs = await ctx.mongo.find(this.Collection, { query: { _id: id } });
				if (docs.length) {
					await ctx.mongo.deleteOne(this.Collection, docs[0]._id);
					return ctx.send("删除成功");
				} else {
					return ctx.sendError(400, `删除操作：删除任务失败！根据id未找到数据`);
				}
			} else return ctx.sendError(400, `删除操作：前端未传递id！`);
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	DelMore = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const _id of data) {
					const docs = await ctx.mongo.find(this.Collection, { query: { _id: _id } });
					if (docs.length) {
						await ctx.mongo.deleteOne(this.Collection, docs[0]._id);
					}
				}
				return ctx.send("全部删除完成");
			} else return ctx.sendError(400, `删除更多操作：前端传递的参数不正确！`);
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new App();
