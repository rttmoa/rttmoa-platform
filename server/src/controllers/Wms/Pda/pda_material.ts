import { Context } from "koa";
import _ from "lodash";
import { time, time_horizontal } from "@/src/utils";
import path from "path";
import Basic from "../../basic";
const fs = require("fs");

class App extends Basic {
	constructor() {
		super();
	}

	private async writeInterfaceReceive(ctx: Context, insInfo: any) {
		await ctx.mongo.insertOne("nb_wcs_wms_interface__c", { ...insInfo });
		const ErrorInfo = async (message: string) => await ctx.mongo.insertOne("bug_info__c", { ...insInfo, error_info__c: message || "" });
		return { insInfo, ErrorInfo };
	}

	PdaLogin = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const Interface_Name = "PDA - 登陆";
		const ParamsDesc = "";
		const jsonData = {
			// 条码: data?.materialcode,
			// 物料代码: Mater,
			// 批号: Bat,
			账号: data?.account,
			密码: data?.password,
		};
		const insInfo = {
			time__c: time(),
			interface_name__c: Interface_Name,
			// barcode__c: data?.materialcode,
			// material_code__c: Mater,
			// batch__c: Bat,
			receive_data__c: JSON.stringify(jsonData),
			desc__c: ParamsDesc,
			warehouse__c: "",
		};
		let msg = "";
		const { ErrorInfo } = await this.writeInterfaceReceive(ctx, insInfo);

		if (data?.account && data?.password) {
			const account = data?.account; // 账户可以是用户名、也可以是手机号
			const pwd = data?.password;
			// 返回用户名、手机号、登陆时间、过期时间、是否登陆、
			console.log("Pda登陆 用户名和密码：", account, pwd);
			const docs = await db.find("hk_phone_account__c", { query: { $or: [{ username__c: account }, { phone__c: account }], password__c: pwd } });
			if (docs.length) {
				const item = docs[0];
				const isLogin = item.is_login__c;
				const Now = +new Date();
				const Ago = +new Date(docs[0].login_time__c) || 0;
				const timeDis = Now - Ago; // 当前时间与登陆时间的时长
				const expireTime = 86400000 * docs[0].expire_time__c; // 过期时间
				const f1 = expireTime < timeDis;
				const f2 = docs[0].login_time__c;
				if (f1 || !f2) {
					console.log("已过期, 重新更新一下登录时间即可");

					await db.updateOne("hk_phone_account__c", item._id, { is_login__c: "是", login_time__c: time() });

					let reData = {
						username__c: item.username__c,
						expire_time__c: item.expire_time__c,
						phone__c: item.phone__c,
						is_login__c: "是",
						login_time__c: time(),
					};
					let s = {
						username__c: "fwms01",
						expire_time__c: 1,
						phone__c: "13312341234",
						is_login__c: "是",
						login_time__c: "2026/01/14 13:58:13",
					};
					return ctx.send({ success: true, message: `登陆成功！`, data: reData });
				} else {
					msg = "登陆失败：该用户已经登陆！";
					await ErrorInfo(msg);
					return ctx.send({ success: false, message: msg });
				}
			} else {
				msg = "登陆失败：用户名或密码错误！";
				await ErrorInfo(msg);
				return ctx.send({ success: false, message: msg });
			}
		} else {
			if (!data?.account) {
				msg = "登陆失败：没有填写用户名";
				await ErrorInfo(msg);
				return ctx.send({ success: false, message: msg });
			}
			if (!data?.password) {
				msg = "登陆失败：没有填写密码！";
				await ErrorInfo(msg);
				return ctx.send({ success: false, message: msg });
			}
		}
	};

	PdaLogout = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("退出：", data);
		const userName = data?.userName;
		const docs = await db.find("hk_phone_account__c", { query: { $or: [{ username__c: userName }, { phone__c: userName }] } });
		if (docs.length) {
			await db.updateOne("hk_phone_account__c", docs[0]._id, { is_login__c: "否", login_time__c: "" });
			return ctx.send({ success: true, message: `退出成功！` });
		} else {
			return ctx.send({ success: false, message: `退出失败：根据用户名未找到用户数据！` });
		}
	};

	UserStatus = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		const userName = data?.username__c;
		const docs = await db.find("hk_phone_account__c", { query: { $or: [{ username__c: userName }, { phone__c: userName }] } });
		if (docs.length) {
			if (!docs[0].login_time__c) {
				return ctx.send({ success: false, message: `已过期`, data: { expired: true } });
			}
			const Now = +new Date();
			const Ago = +new Date(docs[0].login_time__c);
			const time = Now - Ago; // 当前时间与登陆时间的时长
			const expireTime = 86400000 * docs[0].expire_time__c; // 过期时间
			if (expireTime < time) {
				console.log("已过期");
				await db.updateOne("hk_phone_account__c", docs[0]._id, { is_login__c: "否", login_time__c: "" });
				return ctx.send({ success: false, message: `已过期`, data: { expired: true } });
			} else {
				return ctx.send({ success: true, message: `成功` });
			}
		} else {
			return ctx.send({ success: false, message: `查找失败：根据用户名未找到用户数据！` });
		}
	};

	hk_mater_enter_get_document = async (ctx: Context) => {
		const data: any = ctx.request.body;
		const db = ctx.mongo;

		// const fDocs = await db.find("hk_auxiliary_doc_detail__c", { query: { cmdtype__c: "入库任务", status__c: { $in: ["未执行", "正在执行"] } } });
		const fDocs = await db.find("hk_mater_doc_detail__c", { query: {} });
		if (fDocs.length) {
			// console.log("fDocs", fDocs);
			const d = fDocs.filter(v => {
				let f1 = v.area__c == "原料一号冻库" && v.cmdtype__c == "入库任务" && ["未执行", "正在执行"].includes(v.status__c);
				let f2 = v.cmdtype__c == "出库任务" && ["正在执行"].includes(v.status__c) && v.area__c == "线边库" && v.recept_area__c == "原料一号冻库";
				let f3 = v.cmdtype__c == "出库任务" && ["正在执行"].includes(v.status__c) && v.area__c == "原料雷马外租冻库" && v.recept_area__c == "原料一号冻库";
				let f4 = v.cmdtype__c == "出库任务" && ["正在执行"].includes(v.status__c) && v.area__c == "原料中铁外租冻库" && v.recept_area__c == "原料一号冻库";
				return f1 || f2 || f3 || f4;
			});
			return ctx.send({ success: true, message: `获取数据成功！`, data: d || [] });
		} else {
			return ctx.send({ success: true, message: `获取数据列表为空！`, data: [] });
		}
	};

	hk_mater_enter_get_doc_t = async (ctx: Context) => {
		const data: any = ctx.request.body;
		const db = ctx.mongo;

		// const fDocs = await db.find("hk_auxiliary_doc_detail__c", { query: { cmdtype__c: "入库任务", status__c: { $in: ["未执行", "正在执行"] } } });
		const fDocs = await db.find("hk_mater_doc_detail__c", { query: {} });
		if (fDocs.length) {
			// console.log("fDocs", fDocs);
			const d = fDocs.filter(v => {
				let f1 = v.area__c == "原料二号冻库" && v.cmdtype__c == "入库任务" && ["未执行", "正在执行"].includes(v.status__c);
				let f2 = v.cmdtype__c == "出库任务" && ["正在执行"].includes(v.status__c) && v.area__c == "线边库" && v.recept_area__c == "原料二号冻库";
				let f3 = v.cmdtype__c == "出库任务" && ["正在执行"].includes(v.status__c) && v.area__c == "原料雷马外租冻库" && v.recept_area__c == "原料二号冻库";
				let f4 = v.cmdtype__c == "出库任务" && ["正在执行"].includes(v.status__c) && v.area__c == "原料中铁外租冻库" && v.recept_area__c == "原料二号冻库";
				return f1 || f2 || f3 || f4;
			});
			return ctx.send({ success: true, message: `获取数据成功！`, data: d || [] });
		} else {
			return ctx.send({ success: true, message: `获取数据列表为空！`, data: [] });
		}
	};

	hk_mater_enter_get_barcode_data = async (ctx: Context) => {
		const data: any = ctx.request.body;
		// console.log("data", data);
		const db = ctx.mongo;
		const doc_instruction__c = data?.doc_instruction__c;
		const fDocs = await db.find("hk_mater_doc_detail__c", { query: { doc_instruction__c } });
		if (fDocs.length) {
			const element = fDocs[0];
			const c = element.country__c;
			const f = element.factory_no__c;
			const m = element.material_code__c;
			const CodeData = await db.find("hk_mater_barcode_rule__c", {
				query: {
					country__c: c,
					factory_no__c: f,
					material_code__c: m,
				},
			});
			if (CodeData.length) {
				const item = CodeData[0];
				if (!item.barcode_start__c) {
					return ctx.send({ success: false, message: `没有输入条码截取的起始位置`, data: [] });
				}
				if (!item.barcode_over__c) {
					return ctx.send({ success: false, message: `没有输入条码截取的终点位置`, data: [] });
				}
				if (!item.barcode_point__c) {
					return ctx.send({ success: false, message: `没有输入条码截取的小数点位置`, data: [] });
				}
				return ctx.send({ success: true, message: `获取数据成功！`, data: CodeData || [] });
			} else {
				return ctx.send({ success: false, message: `在原料库条码规则维护表中未找到国家，厂号，物料代码的维护数据！`, data: [] });
			}
		} else {
			return ctx.send({ success: false, message: `根据指令号在原料库单据详情中获取失败！`, data: [] });
		}
	};

	private async removeByPallet(ctx: Context, collection: string, pallet: string) {
		const fDocs = await ctx.mongo.find(collection, { query: { pallet__c: pallet } });
		if (fDocs.length > 0) {
			for (const e of fDocs) {
				await ctx.mongo.deleteOne(collection, e._id);
			}
		}
	}

	hk_mater_enter_accept_goods = async (ctx: Context) => {
		const data: any = ctx.request.body;
		console.log("收货传递数据：", data);
		const db = ctx.mongo;
		// let data = {
		// 	username__c: '02',
		// 	phone__c: '',
		// 	areaOrigin: '原料库',
		// 	materialInfo: {
		// 		id: '69cb568cb324e38a0944b566',
		// 		id__c: '',
		// 		material_code__c: '50191',
		// 		material_name__c: '牛肉(带心龟腱)',
		// 		batch__c: '2026-03-11',
		// 		produce_date__c: '2026-03-99',
		// 		cabinet__c: 'cabniat',
		// 		contract__c: 'contract_no'
		// 	},
		//  pallet: 'G',
		// 	barCodeArr: [
		// 		{
		// 			barcode: '16949144700101260520122548260000',
		// 			weight: '82.60',
		// 			source: 'barcode' // 条码自动识别
		// 		},
		// 		{
		// 			barcode: '16949131450101260520122635280000',
		// 			weight: '52.80',
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			barcode: '76483303637826565993220951246',
		// 			weight: '12.46',
		// 			source: 'generatedBarcode' // 条码自动生成
		// 		},
		// 		{
		// 			barcode: '97791714795766031753487744545',
		// 			weight: '45.454',
		// 			source: 'generatedBarcode'
		// 		},
		// 		{ produceDate: '2026-05-24', weight: '12.100', source: 'manual' }, // OCR识别
		// 		{ produceDate: '2026-05-24', weight: '15.300', source: 'manual' }
		// 	]
		// }
		// return ctx.send({ success: false, message: "ssss" });

		try {
			let msg = "";

			// const pallet = data?.pallet;
			const pallet = String(data?.pallet).trim();
			const is_goods = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: String(pallet).trim(), status__c: { $in: ["收货", "已收货"] } } });
			if (is_goods.length) {
				msg = `提交错误：此托盘已经收过货了，无法重新重获，请处理任务后，再次收货！`;
				return ctx.send({ success: false, message: msg });
			}
			const is_stock = await db.find("hk_mater_stock__c", { query: { pallet__c: pallet } });
			if (is_stock.length) {
				// node.warn("!");
				msg = `提交错误：此托盘在【原料库货架表】存在库存！`;
				return ctx.send({ success: false, message: msg });
			}
			const is_stockDetail = await db.find("hk_mater_stock_detail__c", { query: { pallet__c: pallet } });
			if (is_stockDetail.length) {
				msg = `提交错误：此托盘在【原料库库存详情表】存在库存!`;
				return ctx.send({ success: false, message: msg });
			}

			const gwmsD = await db.find("hk_mater_doc_detail__c", { query: { _id: data?.materialInfo?.id }, sort: { time__c: -1 } });
			if (gwmsD.length == 1) {
				const items = gwmsD[0];
				// node.warn(items);
				// return

				let batch = "";
				// const items = docs[0];
				if (items.batch__c) {
					batch = items.batch__c;
				}
				// batch__c: batch,

				// 先删除 再写入
				// await this.removeByPallet(ctx, "hk_mater_manual_doc_bind__c", data?.pallet);
				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
				const day = String(now.getDate()).padStart(2, "0");
				const formatted = `${year}-${month}-${day}`;

				if (data?.barCodeArr.length > 0) {
					const docs = [];
					let n = 1;
					for (const element of data?.barCodeArr) {
						// document_id__c: element?.docNo ? element?.docNo?.trim() : "", // ! 修改格式化日期

						let way = "";
						let weight = 0;
						let production_date__c = "";
						let barcode = "";
						if (element.source == "manual") {
							way = "手动OCR识别";
							// production_date__c = element.produceDate;
							production_date__c = items.production_date__c;
							weight = Number(element.weight);
							barcode = "xxx";
						} else if (element.source == "barcode") {
							way = "条码自动识别";
							production_date__c = items.production_date__c;
							weight = Number(element.weight);
							barcode = element.barcode;
						} else if (element.source == "generatedBarcode") {
							way = "条码自动生成";
							production_date__c = items.production_date__c;
							weight = Number(element.weight);
							barcode = element.barcode;
						}

						docs.push({
							time__c: time(),
							pallet__c: pallet,
							barcode_arr__c: data?.barCodeArr,
							status__c: n == 1 ? "已收货" : "收货",
							barcode_quantity__c: n++, // 位置号
							barcode__c: barcode,
							weight__c: weight,
							production_date__c: production_date__c,
							input_way__c: way,
							batch__c: batch,
							is_tax__c: items?.is_tax__c, // 是否保税
							material_code__c: items?.material_code__c || "", // 物料代码
							contract__c: items?.contract__c || "", // 合同号
							supplier__c: items?.supplier__c || "", // 供应商
							entry_stock_date__c: formatted, // 入库日期
							document_id__c: items?.document_id__c || "",
							doc_instruction__c: items?.doc_instruction__c || "",

							material_name__c: items?.material_name__c || "",

							arrival_date__c: items?.arrival_date__c || "",
							cabinet__c: items?.cabinet__c || "",
							instruction__c: items.instruction__c || "",
						});
					}
					await db.insertMany("hk_mater_pda_receipt__c", docs);
					msg = `成功：数据处理完成, 已收货`;
					// await ErrorInfo(msg);
					return ctx.send({ success: true, message: msg });
				} else {
					msg = `错误：传递的物料条码为空`;
					// await ErrorInfo(msg);
					return ctx.send({ success: false, message: msg });
				}
			}
		} catch (err: any) {
			let msg = "";
			msg = `错误：${err.message || "服务器错误"}`;
			// await ErrorInfo(msg);
			return ctx.sendError(500, msg);
		}
	};

	hk_mater_enter_goods_t = async (ctx: Context) => {
		const data: any = ctx.request.body;
		console.log("收货传递数据：", data);
		const db = ctx.mongo;
		let data2 = {
			areaOrigin: "原料库二号冻库",
			materialInfo: {
				id: "6a50bca3f262c8eb2a1bcdb3",
				id__c: "",
				material_code__c: "50055",
				material_name__c: "牛肉（后腱）",
				batch__c: "",
				produce_date__c: "2026-07-16",
				cabinet__c: "PCIU6152799",
				contract__c: "XS202603060028",
			},
			pallet: "X1",
			barCodeArr: [
				{
					barcode: "16949144700101260520122548260000",
					weight: "14.47",
					source: "barcode",
				},
				{
					barcode: "16949131450101260520122635280000",
					weight: "13.14",
					source: "barcode",
				},
				{
					barcode: "365871230",
					weight: "12.3",
					source: "generatedBarcode",
				},
			],
		};
		// return ctx.send({ success: false, message: "ssss" });

		try {
			let msg = "";

			const pallet = String(data?.pallet).trim();
			const is_goods = await db.find("hk_mater_two_pda_entry__c", { query: { pallet__c: String(pallet).trim(), status__c: { $in: ["入库完成"] } } });
			if (is_goods.length) {
				msg = `提交错误：此托盘已经收过货了，无法重新重获，请处理任务后，再次收货！`;
				return ctx.send({ success: false, message: msg });
			}
			const is_stockDetail = await db.find("hk_mater_two_stock_d__c", { query: { pallet__c: pallet } });
			if (is_stockDetail.length) {
				msg = `提交错误：此托盘在【原料库库存详情表】存在库存!`;
				return ctx.send({ success: false, message: msg });
			}

			const gwmsD = await db.find("hk_mater_doc_detail__c", { query: { _id: data?.materialInfo?.id }, sort: { time__c: -1 } });
			if (gwmsD.length == 1) {
				const items = gwmsD[0];

				let batch = "";
				// const items = docs[0];
				if (items.batch__c) {
					batch = items.batch__c;
				}
				// batch__c: batch,

				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
				const day = String(now.getDate()).padStart(2, "0");
				const formatted = `${year}-${month}-${day}`;

				if (data?.barCodeArr.length > 0) {
					// pda 入库表
					const docs = [];
					const docs_barcode = [];
					let n = 0;
					let Instruction_BarCode = `6${Math.floor(1e9 + Math.random() * 9e9).toString()}`;
					let piece = data?.barCodeArr.length;
					let allWeight = data?.barCodeArr.reduce((prev: any, curr: any) => {
						return Number((Math.round((Number(prev) + Number(curr.weight || 0)) * 1000) / 1000).toFixed(3));
					}, 0);
					let entry_way = "";
					for (const element of data?.barCodeArr) {
						// document_id__c: element?.docNo ? element?.docNo?.trim() : "", // ! 修改格式化日期

						let way = "";
						let weight = 0;
						// let production_date__c = "";
						let barcode = "";
						if (element.source == "manual") {
							way = "手动OCR识别";
							// production_date__c = items.production_date__c;
							weight = Number(element.weight);
							barcode = "xxx";
						} else if (element.source == "barcode") {
							way = "条码自动识别";
							// production_date__c = items.production_date__c;
							weight = Number(element.weight);
							barcode = element.barcode;
						} else if (element.source == "generatedBarcode") {
							way = "条码自动生成";
							// production_date__c = items.produc"tion_date__c;
							weight = Number(element.weight);
							barcode = element.barcode;
						}
						n++;
						docs.push({
							time__c: time(),
							pallet__c: pallet,
							barcode_arr__c: data?.barCodeArr,
							status__c: "入库完成",
							barcode_quantity__c: n, // 位置号
							barcode__c: barcode,
							weight__c: weight,
							production_date__c: items?.production_date__c,
							input_way__c: way,
							batch__c: batch,
							is_tax__c: items?.is_tax__c, // 是否保税
							material_code__c: items?.material_code__c || "", // 物料代码
							contract__c: items?.contract__c || "", // 合同号
							supplier__c: items?.supplier__c || "", // 供应商
							entry_stock_date__c: formatted, // 入库日期
							document_id__c: items?.document_id__c || "",
							doc_instruction__c: items?.doc_instruction__c || "",

							material_name__c: items?.material_name__c || "",

							arrival_date__c: items?.arrival_date__c || "",
							cabinet__c: items?.cabinet__c || "",
							instruction__c: items.instruction__c || "",
						});
						docs_barcode.push({
							time__c: time(),
							instruction__c: Instruction_BarCode,
							way__c: way,
							pallet__c: pallet,
							weight__c: weight,
							production_date__c: items?.production_date__c,
							// batch__c: "",
							batch__c: batch,
							barcode__c: barcode,
							barcode_quantity__c: n,
							desc__c: "",
						});
					}
					await db.insertMany("hk_mater_two_pda_entry__c", docs);
					await db.insertMany("hk_mater_two_stock_d_barcode__c", docs_barcode);

					const today = new Date();
					const today_date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
					entry_way = docs[0].input_way__c == "手动OCR识别" ? "手动OCR识别" : "条码自动识别";
					await db.insertOne("hk_mater_two_stock_d__c", {
						time__c: time(),
						// loc_name__c: stock.loc_name__c,
						// position__c: stock.position__c,
						// row__c: stock.row__c,
						// col__c: stock.col__c,
						// lay__c: stock.lay__c,
						pallet__c: pallet,
						// group_id__c: stock.group_id__c,
						// priority__c: stock.priority__c,
						production_date__c: items?.production_date__c, // 生产日期为货架表的生产日期
						entry_stock_date__c: today_date, // 入库日期

						stock_status__c: "在库",
						way__c: entry_way,

						document_id__c: items?.document_id__c,
						document_type__c: items?.document_type__c,
						line_item__c: items?.line_item__c,

						material_name__c: items?.material_name__c,
						material_code__c: items?.material_code__c,

						// batch__c: "", // 批次为空
						batch__c: batch,
						contract__c: items?.contract__c,
						cabinet__c: items?.cabinet__c,
						is_tax__c: items?.is_tax__c,
						cars_info__c: items?.cars_info__c,
						supplier__c: items?.supplier__c,

						suggest_order__c: items?.suggest_order__c,
						sealing_order__c: items?.sealing_order__c,

						purchase_organization__c: items?.purchase_organization__c,
						prepare_name__c: items?.prepare_name__c,
						prepare_code__c: items?.prepare_code__c,
						report_order_one__c: items?.report_order_one__c,
						report_order_two__c: items?.report_order_two__c,
						report_contract__c: items?.report_contract__c,

						arrival_date__c: items?.arrival_date__c,

						country__c: items?.country__c,
						factory_no__c: items?.factory_no__c,

						now_quantity__c: piece, // 当前箱数
						final_quantity__c: piece,

						weight__c: allWeight, // 当托重量
						final_weight__c: allWeight,

						instruction__c: Instruction_BarCode,
					});

					msg = `成功：数据处理完成, 已入库完成！`;
					return ctx.send({ success: true, message: msg });
				} else {
					msg = `错误：传递的物料条码为空`;
					// await ErrorInfo(msg);
					return ctx.send({ success: false, message: msg });
				}
			}
		} catch (err: any) {
			let msg = "";
			msg = `错误：${err.message || "服务器错误"}`;
			// await ErrorInfo(msg);
			return ctx.sendError(500, msg);
		}
	};

	// 原料库——入库-查询收货的托盘数据
	hk_mater_enter_goods_query = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		// console.log("data", data);
		if (data?.pallet) {
			const pallet = data?.pallet;
			const fDocs = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: String(pallet).trim(), status__c: { $in: ["收货", "已收货"] } }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];

				// 展示单据的单号、重量、合同号等字段信息
				const fDocD = await db.find("hk_mater_doc_detail__c", { query: { doc_instruction__c: element.doc_instruction__c }, sort: { time__c: -1 } });
				// node.warn(fDocD);
				const fDocd = fDocD[0];
				// 当前托盘件数
				// 当前托盘重量
				// 当前单号下件数
				// 当前单号下重量
				// 当前单号下所有收货托盘号

				const pda_data_curr = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: String(pallet).trim(), status__c: { $in: ["收货", "已收货", "正在入库"] } }, sort: { time__c: -1 } });
				const count_curr_piece = pda_data_curr.length;
				const count_curr_weight = pda_data_curr.reduce((sum, cur) => sum + Number(cur.weight__c), 0);

				const pda_data_docs = await db.find("hk_mater_pda_receipt__c", { query: { doc_instruction__c: element.doc_instruction__c }, sort: { time__c: -1 } });
				const count_docs_piece = pda_data_docs.length;
				const count_docs_weight = pda_data_docs.reduce((sum, cur) => sum + Number(cur.weight__c), 0);
				const count_docs_pallets = pda_data_docs.map(v => v.pallet__c);
				const unique_pallets = [...new Set(count_docs_pallets)];

				let docInfo = {
					document_id__c: fDocd.document_id__c,
					document_type__c: fDocd.document_type__c,
					contract__c: fDocd.contract__c,
					material_code__c: fDocd.material_code__c,
					material_name__c: fDocd.material_name__c,
					production_date__c: fDocd.production_date__c,
				};

				let palletInfo = {
					count_curr_piece: String(count_curr_piece),
					count_curr_weight: count_curr_weight.toFixed(3),
					count_docs_piece: String(count_docs_piece),
					count_docs_weight: count_docs_weight.toFixed(3),
					unique_pallets,
				};
				const objData = { ...docInfo, ...palletInfo };

				// node.warn(objData);

				return ctx.send({ success: true, message: `获取数据成功！`, data: objData });

				// const doc_instruction__c = element.doc_instruction__c;
				// const PdaData = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { doc_instruction__c } });
				// const count_pallet_over = PdaData.filter(v => v.status__c == "处理库存成功");
				// const count_piece = PdaData.reduce((sum, cur) => sum + cur.piece__c, 0);
				// const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
				// const count_weight = PdaData.reduce((sum, cur) => sum + cur.quantity__c, 0);
				// const count_weight_over = PdaData.reduce((sum, cur) => {
				// 	const qty = Number(cur.final_pick_quantity__c);
				// 	return sum + (isNaN(qty) ? 0 : qty);
				// }, 0);
				// const DocData = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { doc_instruction__c } });
				// let currPallet = {
				// 	count_pallet: String(PdaData.length),
				// 	count_pallet_over: String(count_pallet_over.length),
				// 	count_piece: String(count_piece),
				// 	count_piece_over: String(count_piece_over),
				// 	count_demand: String(DocData?.[0]?.quantity__c || 0), // 单据需求重量
				// 	count_weight: count_weight.toFixed(3), // 出库所有托盘的总重量
				// 	count_weight_over: count_weight_over.toFixed(3), // 已出库数量
				// 	count_current_pallet: String(element.quantity__c), // 当前托盘数量
				// 	count_current_piece: String(element.piece__c), // 当前件数
				// };
				// let startLoc = 0;
				// let endLoc = 0;
				// let pointLoc = 0;

				// let way = "";

				// const stockDetail = await ctx.mongo.find("hk_mater_stock_detail__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
				// if (stockDetail.length) {
				// 	const country__c = stockDetail[0].country__c;
				// 	const factory_no__c = stockDetail[0].factory_no__c;
				// 	const material_code__c = stockDetail[0].material_code__c;

				// 	way = stockDetail[0].way__c;

				// 	const bacodeRule = await ctx.mongo.find("hk_mater_barcode_rule__c", { query: { country__c, factory_no__c, material_code__c } });
				// 	// console.log(bacodeRule);
				// 	if (bacodeRule.length) {
				// 		const u = bacodeRule[0];
				// 		startLoc = u.barcode_start__c;
				// 		endLoc = u.barcode_over__c;
				// 		pointLoc = u.barcode_point__c;
				// 	}
				// }
				// let Intercept = {
				// 	startLoc,
				// 	endLoc,
				// 	pointLoc,
				// };
				// let paramData = { ...element, ...currPallet, ...Intercept, way: way };
				// console.log("paramData", paramData);

				// return ctx.send({ success: true, message: `获取数据成功！`, data: paramData });
			} else {
				return ctx.send({ success: false, message: `此托盘未收货！` });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	hk_mater_enter_goods_query_t = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		// console.log("data", data);
		if (data?.pallet) {
			const pallet = data?.pallet;
			const fDocs = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: String(pallet).trim(), status__c: { $in: ["收货", "已收货"] } }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];

				// 展示单据的单号、重量、合同号等字段信息
				const fDocD = await db.find("hk_mater_doc_detail__c", { query: { doc_instruction__c: element.doc_instruction__c }, sort: { time__c: -1 } });
				// node.warn(fDocD);
				const fDocd = fDocD[0];
				// 当前托盘件数
				// 当前托盘重量
				// 当前单号下件数
				// 当前单号下重量
				// 当前单号下所有收货托盘号

				const pda_data_curr = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: String(pallet).trim(), status__c: { $in: ["收货", "已收货", "正在入库"] } }, sort: { time__c: -1 } });
				const count_curr_piece = pda_data_curr.length;
				const count_curr_weight = pda_data_curr.reduce((sum, cur) => sum + Number(cur.weight__c), 0);

				const pda_data_docs = await db.find("hk_mater_pda_receipt__c", { query: { doc_instruction__c: element.doc_instruction__c }, sort: { time__c: -1 } });
				const count_docs_piece = pda_data_docs.length;
				const count_docs_weight = pda_data_docs.reduce((sum, cur) => sum + Number(cur.weight__c), 0);
				const count_docs_pallets = pda_data_docs.map(v => v.pallet__c);
				const unique_pallets = [...new Set(count_docs_pallets)];

				let docInfo = {
					document_id__c: fDocd.document_id__c,
					document_type__c: fDocd.document_type__c,
					contract__c: fDocd.contract__c,
					material_code__c: fDocd.material_code__c,
					material_name__c: fDocd.material_name__c,
					production_date__c: fDocd.production_date__c,
				};

				let palletInfo = {
					count_curr_piece: String(count_curr_piece),
					count_curr_weight: count_curr_weight.toFixed(3),
					count_docs_piece: String(count_docs_piece),
					count_docs_weight: count_docs_weight.toFixed(3),
					unique_pallets,
				};
				const objData = { ...docInfo, ...palletInfo };

				// node.warn(objData);

				return ctx.send({ success: true, message: `获取数据成功！`, data: objData });

				// const doc_instruction__c = element.doc_instruction__c;
				// const PdaData = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { doc_instruction__c } });
				// const count_pallet_over = PdaData.filter(v => v.status__c == "处理库存成功");
				// const count_piece = PdaData.reduce((sum, cur) => sum + cur.piece__c, 0);
				// const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
				// const count_weight = PdaData.reduce((sum, cur) => sum + cur.quantity__c, 0);
				// const count_weight_over = PdaData.reduce((sum, cur) => {
				// 	const qty = Number(cur.final_pick_quantity__c);
				// 	return sum + (isNaN(qty) ? 0 : qty);
				// }, 0);
				// const DocData = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { doc_instruction__c } });
				// let currPallet = {
				// 	count_pallet: String(PdaData.length),
				// 	count_pallet_over: String(count_pallet_over.length),
				// 	count_piece: String(count_piece),
				// 	count_piece_over: String(count_piece_over),
				// 	count_demand: String(DocData?.[0]?.quantity__c || 0), // 单据需求重量
				// 	count_weight: count_weight.toFixed(3), // 出库所有托盘的总重量
				// 	count_weight_over: count_weight_over.toFixed(3), // 已出库数量
				// 	count_current_pallet: String(element.quantity__c), // 当前托盘数量
				// 	count_current_piece: String(element.piece__c), // 当前件数
				// };
				// let startLoc = 0;
				// let endLoc = 0;
				// let pointLoc = 0;

				// let way = "";

				// const stockDetail = await ctx.mongo.find("hk_mater_stock_detail__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
				// if (stockDetail.length) {
				// 	const country__c = stockDetail[0].country__c;
				// 	const factory_no__c = stockDetail[0].factory_no__c;
				// 	const material_code__c = stockDetail[0].material_code__c;

				// 	way = stockDetail[0].way__c;

				// 	const bacodeRule = await ctx.mongo.find("hk_mater_barcode_rule__c", { query: { country__c, factory_no__c, material_code__c } });
				// 	// console.log(bacodeRule);
				// 	if (bacodeRule.length) {
				// 		const u = bacodeRule[0];
				// 		startLoc = u.barcode_start__c;
				// 		endLoc = u.barcode_over__c;
				// 		pointLoc = u.barcode_point__c;
				// 	}
				// }
				// let Intercept = {
				// 	startLoc,
				// 	endLoc,
				// 	pointLoc,
				// };
				// let paramData = { ...element, ...currPallet, ...Intercept, way: way };
				// console.log("paramData", paramData);

				// return ctx.send({ success: true, message: `获取数据成功！`, data: paramData });
			} else {
				return ctx.send({ success: false, message: `此托盘未收货！` });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	hk_mater_enter_byPallet_isGoods = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const pallet = String(data?.pallet).trim();
		let msg = "";
		if (pallet) {
			const fDocs = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: pallet, status__c: { $in: ["收货", "已收货"] } }, sort: { time__c: -1 } });
			if (fDocs.length) {
				return ctx.send({ success: false, message: `此托盘: ${pallet}已收货！` });
			} else {
				const is_stock = await db.find("hk_mater_stock__c", { query: { pallet__c: pallet } });
				if (is_stock.length) {
					msg = `提交错误：此托盘在【原料库货架表】存在库存！`;
					return ctx.send({ success: false, message: msg });
				}
				const is_stockDetail = await db.find("hk_mater_stock_detail__c", { query: { pallet__c: pallet } });
				if (is_stockDetail.length) {
					msg = `提交错误：此托盘在【原料库库存详情表】存在库存!`;
					return ctx.send({ success: false, message: msg });
				}
				return ctx.send({ success: true, message: `此托盘: ${pallet}未收货！` });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	hk_mater_enter_query_total_q = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const doc_instruction__c = data?.documentInfo?.doc_instruction__c;

		const fDocs = await db.find("hk_mater_pda_receipt__c", { query: { doc_instruction__c } });
		if (fDocs.length) {
			console.log("fDocs", fDocs.length);

			const newArr = [...new Set(fDocs.map(v => v.pallet__c))];
			// const piece = 	 fDocs.reduce((sum, cur) => sum + cur.piece__c, 0);
			const weight = fDocs.reduce((sum, cur) => sum + Number(cur.weight__c), 0);

			return ctx.send({
				success: true,
				data: {
					total_pallet: String(newArr.length),
					total_piece: String(fDocs.length),
					total_weight: String(weight.toFixed(3)),
				},
			});
		} else {
			return ctx.send({
				success: true,
				data: {
					total_pallet: 0,
					total_piece: 0,
					total_weight: 0,
				},
			});
		}
	};

	s1 = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const doc_instruction__c = data?.documentInfo?.doc_instruction__c;

		const fDocs = await db.find("hk_mater_two_pda_entry__c", { query: { doc_instruction__c } });
		if (fDocs.length) {
			console.log("fDocs", fDocs.length);

			const newArr = [...new Set(fDocs.map(v => v.pallet__c))];
			// const piece = 	 fDocs.reduce((sum, cur) => sum + cur.piece__c, 0);
			const weight = fDocs.reduce((sum, cur) => sum + Number(cur.weight__c), 0);

			return ctx.send({
				success: true,
				data: {
					total_pallet: String(newArr.length),
					total_piece: String(fDocs.length),
					total_weight: String(weight.toFixed(3)),
				},
			});
		} else {
			return ctx.send({
				success: true,
				data: {
					total_pallet: 0,
					total_piece: 0,
					total_weight: 0,
				},
			});
		}
	};

	hk_mater_enter_byPallet_t = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const pallet = String(data?.pallet).trim();
		let msg = "";
		if (pallet) {
			const fDocs = await db.find("hk_mater_two_pda_entry__c", { query: { pallet__c: pallet, status__c: { $in: ["收货", "已收货"] } }, sort: { time__c: -1 } });
			if (fDocs.length) {
				return ctx.send({ success: false, message: `此托盘: ${pallet}已收货！` });
			} else {
				// const is_stock = await db.find("hk_mater_stock__c", { query: { pallet__c: pallet } });
				// if (is_stock.length) {
				// 	msg = `提交错误：此托盘在【原料库货架表】存在库存！`;
				// 	return ctx.send({ success: false, message: msg });
				// }
				const is_stockDetail = await db.find("hk_mater_two_stock_d__c", { query: { pallet__c: pallet } });
				if (is_stockDetail.length) {
					msg = `提交错误：此托盘在【原料二号库库存详情表】存在库存!`;
					return ctx.send({ success: false, message: msg });
				}
				return ctx.send({ success: true, message: `此托盘: ${pallet}未收货！` });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	hk_mater_t_sel_doc = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const fDocs = await db.find("hk_mater_doc_detail__c", { query: { area__c: "原料二号冻库", cmdtype__c: "出库任务" } });
		if (fDocs.length) {
			return ctx.send({ success: true, message: `获取原料二号冻库出库单成功！`, data: fDocs });
		} else {
			return ctx.send({ success: false, message: `未获取到原料二号冻库出库单`, data: [] });
		}
	};

	hk_mater_t_query_stock = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		// const fDocs = await db.find("hk_mater_two_stock_d__c", { query: { area__c: "原料二号冻库", cmdtype__c: "出库任务" } });
		const fDocs = await db.find("hk_mater_two_stock_d__c", { query: { material_code__c: data?.material_code__c, batch__c: data?.batch__c } });
		if (fDocs.length) {
			const newArr = [...new Set(fDocs.map(v => v.pallet__c))];
			return ctx.send({ success: true, message: `获取原料二号冻库出库单成功！`, data: newArr });
		} else {
			return ctx.send({ success: false, message: `未获取到原料二号冻库托盘号`, data: [] });
		}
	};

	// 原料库——出库-获取托盘拆托表
	hk_mater_by_pallet_PdaSplit = async (ctx: Context) => {
		const data: any = ctx.request.body;
		// console.log("data", data);
		if (data?.pallet) {
			const pallet = data?.pallet;
			const fDocs = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { pallet__c: String(pallet).trim(), status__c: "正在出库" }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];
				const doc_instruction__c = element.doc_instruction__c;
				const PdaData = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { doc_instruction__c } });
				const count_pallet_over = PdaData.filter(v => v.status__c == "处理库存成功");
				const count_piece = PdaData.reduce((sum, cur) => sum + cur.piece__c, 0);
				const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
				const count_weight = PdaData.reduce((sum, cur) => sum + cur.quantity__c, 0);
				const count_weight_over = PdaData.reduce((sum, cur) => {
					const qty = Number(cur.final_pick_quantity__c);
					return sum + (isNaN(qty) ? 0 : qty);
				}, 0);
				const DocData = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { doc_instruction__c } });
				let currPallet = {
					count_pallet: String(PdaData.length),
					count_pallet_over: String(count_pallet_over.length),
					count_piece: String(count_piece),
					count_piece_over: String(count_piece_over),
					count_demand: String(DocData?.[0]?.quantity__c || 0), // 单据需求重量
					count_weight: count_weight.toFixed(3), // 出库所有托盘的总重量
					count_weight_over: count_weight_over.toFixed(3), // 已出库数量
					count_current_pallet: String(element.quantity__c), // 当前托盘数量
					count_current_piece: String(element.piece__c), // 当前件数
				};
				let startLoc = 0;
				let endLoc = 0;
				let pointLoc = 0;

				let way = "";

				const stockDetail = await ctx.mongo.find("hk_mater_stock_detail__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
				if (stockDetail.length) {
					const country__c = stockDetail[0].country__c;
					const factory_no__c = stockDetail[0].factory_no__c;
					const material_code__c = stockDetail[0].material_code__c;

					way = stockDetail[0].way__c;

					const bacodeRule = await ctx.mongo.find("hk_mater_barcode_rule__c", { query: { country__c, factory_no__c, material_code__c } });
					// console.log(bacodeRule);
					if (bacodeRule.length) {
						const u = bacodeRule[0];
						startLoc = u.barcode_start__c;
						endLoc = u.barcode_over__c;
						pointLoc = u.barcode_point__c;
					}
				}
				let Intercept = {
					startLoc,
					endLoc,
					pointLoc,
				};
				let paramData = { ...element, ...currPallet, ...Intercept, way: way };
				console.log("paramData", paramData);
				return ctx.send({ success: true, message: `获取数据成功！`, data: paramData });
			} else {
				return ctx.send({ success: false, message: `服务器返回错误：根据传递的托盘号未在数据库中找到数据或任务已处理！`, data: {} });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	hk_mater_by_pallet_PdaSplit2 = async (ctx: Context) => {
		const data: any = ctx.request.body;
		// console.log("data", data);
		if (data?.pallet) {
			const pallet = data?.pallet;
			const fDocs = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];
				const doc_instruction__c = element.doc_instruction__c;
				const PdaData = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { doc_instruction__c } });
				const count_pallet_over = PdaData.filter(v => v.status__c == "处理库存成功");
				const count_piece = PdaData.reduce((sum, cur) => sum + cur.piece__c, 0);
				const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
				const count_weight = PdaData.reduce((sum, cur) => sum + cur.quantity__c, 0);
				const count_weight_over = PdaData.reduce((sum, cur) => {
					const qty = Number(cur.final_pick_quantity__c);
					return sum + (isNaN(qty) ? 0 : qty);
				}, 0);
				const DocData = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { doc_instruction__c } });
				let currPallet = {
					count_pallet: String(PdaData.length),
					count_pallet_over: String(count_pallet_over.length),
					count_piece: String(count_piece),
					count_piece_over: String(count_piece_over),
					count_demand: String(DocData?.[0]?.quantity__c || 0), // 单据需求重量
					count_weight: count_weight.toFixed(3), // 出库所有托盘的总重量
					count_weight_over: count_weight_over.toFixed(3), // 已出库数量
					count_current_pallet: String(element.quantity__c), // 当前托盘数量
					count_current_piece: String(element.piece__c), // 当前件数
				};
				let startLoc = 0;
				let endLoc = 0;
				let pointLoc = 0;

				let way = "";

				const stockDetail = await ctx.mongo.find("hk_mater_stock_detail__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
				if (stockDetail.length) {
					const country__c = stockDetail[0].country__c;
					const factory_no__c = stockDetail[0].factory_no__c;
					const material_code__c = stockDetail[0].material_code__c;

					way = stockDetail[0].way__c;

					const bacodeRule = await ctx.mongo.find("hk_mater_barcode_rule__c", { query: { country__c, factory_no__c, material_code__c } });
					// console.log(bacodeRule);
					if (bacodeRule.length) {
						const u = bacodeRule[0];
						startLoc = u.barcode_start__c;
						endLoc = u.barcode_over__c;
						pointLoc = u.barcode_point__c;
					}
				}
				let Intercept = {
					startLoc,
					endLoc,
					pointLoc,
				};
				let paramData = { ...element, ...currPallet, ...Intercept, way: way };
				console.log("paramData", paramData);
				return ctx.send({ success: true, message: `获取数据成功！`, data: paramData });
			} else {
				return ctx.send({ success: false, message: `服务器返回错误：根据传递的托盘号未在数据库中找到数据或任务已处理！`, data: {} });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};
	hk_mater_t_by_pallet_PdaSplit_t = async (ctx: Context) => {
		const data: any = ctx.request.body;
		console.log("原料二号库出库：", data);

		// let data = {
		// 	_id: "6a62fda703b69211cc7de39a",
		// 	document_id__c: "33019582",
		// 	material_code__c: "16956",
		// 	batch__c: "2222",
		// 	quantity__c: 3744.741,
		// 	pallet: "m5",
		// };
		if (data?.pallet) {
			const pallet = data?.pallet;
			const fDocs = await ctx.mongo.find("hk_mater_two_pda_out__c", { query: { pallet__c: String(pallet).trim(), status__c: "正在出库" }, sort: { time__c: -1 } });
			if (fDocs.length || true) {
				const DocData = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { _id: data?._id } });
				const ele_doc = DocData[0];

				let element = { ...ele_doc, whole__c: "半托出库" };
				delete element.quantity__c;

				const PdaData = await ctx.mongo.find("hk_mater_two_pda_out__c", { query: { doc_instruction__c: DocData[0].doc_instruction__c } });
				const count_pallet_over = PdaData.filter(v => v.status__c == "处理库存成功");
				const count_piece = PdaData.reduce((sum, cur) => sum + cur.piece__c, 0);
				const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
				const count_weight = PdaData.reduce((sum, cur) => sum + cur.quantity__c, 0);
				const count_weight_over = PdaData.reduce((sum, cur) => {
					const qty = Number(cur.final_pick_quantity__c);
					return sum + (isNaN(qty) ? 0 : qty);
				}, 0);

				let startLoc = 0;
				let endLoc = 0;
				let pointLoc = 0;

				let way = "";
				let sotckQuantity = 0;

				const stockDetail = await ctx.mongo.find("hk_mater_two_stock_d__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
				if (stockDetail.length) {
					const country__c = stockDetail[0].country__c;
					const factory_no__c = stockDetail[0].factory_no__c;
					const material_code__c = stockDetail[0].material_code__c;

					way = stockDetail[0].way__c;
					sotckQuantity = stockDetail[0].weight__c;
					const bacodeRule = await ctx.mongo.find("hk_mater_barcode_rule__c", { query: { country__c, factory_no__c, material_code__c } });
					console.log(bacodeRule);
					if (bacodeRule.length) {
						const u = bacodeRule[0];
						startLoc = u.barcode_start__c;
						endLoc = u.barcode_over__c;
						pointLoc = u.barcode_point__c;
					}
					let Intercept = {
						startLoc,
						endLoc,
						pointLoc,
					};
					let currPallet = {
						count_pallet: String(PdaData.length),
						count_pallet_over: String(count_pallet_over.length),
						count_piece: String(count_piece),
						count_piece_over: String(count_piece_over),
						count_demand: String(DocData?.[0]?.quantity__c || 0), // 单据需求重量
						count_weight: count_weight.toFixed(3), // 出库所有托盘的总重量
						count_weight_over: count_weight_over.toFixed(3), // 已出库数量
						count_current_pallet: String(stockDetail[0].weight__c || 0), // 当前托盘数量
						count_current_piece: String(stockDetail[0].now_quantity__c || 0), // 当前件数
					};
					let paramData = { ...element, quantity__c: sotckQuantity, ...currPallet, ...Intercept, way: way };
					return ctx.send({ success: true, message: `获取数据成功！`, data: paramData });
				} else {
					return ctx.send({ success: false, message: `该托盘已出库，库存无此托盘号！` });
				}
			} else {
				return ctx.send({ success: false, message: `服务器返回错误：根据传递的托盘号未在数据库中找到数据或任务已处理！`, data: {} });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};
	hk_mater_t_by_pallet_PdaSplit_t2 = async (ctx: Context) => {
		const data: any = ctx.request.body;
		console.log("原料二号库出库：", data);

		// let data = {
		// 	_id: "6a62fda703b69211cc7de39a",
		// 	document_id__c: "33019582",
		// 	material_code__c: "16956",
		// 	batch__c: "2222",
		// 	quantity__c: 3744.741,
		// 	pallet: "m5",
		// };
		if (data?.pallet) {
			const pallet = data?.pallet;
			const fDocs = await ctx.mongo.find("hk_mater_two_pda_out__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const doc_instruction__c = fDocs[0].doc_instruction__c;
				const DocData = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { doc_instruction__c } });
				if (DocData.length == 0) {
					return ctx.send({ success: false, message: `服务器返回错误：未找到单据信息！`, data: {} });
				}
				const ele_doc = DocData?.[0] || {};

				let element = { ...ele_doc, whole__c: "半托出库" };
				delete element.quantity__c;

				const PdaData = await ctx.mongo.find("hk_mater_two_pda_out__c", { query: { doc_instruction__c: DocData?.[0].doc_instruction__c } });
				const count_pallet_over = PdaData.filter(v => v.status__c == "处理库存成功");
				const count_piece = PdaData.reduce((sum, cur) => sum + cur.piece__c, 0);
				const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
				const count_weight = PdaData.reduce((sum, cur) => sum + cur.quantity__c, 0);
				const count_weight_over = PdaData.reduce((sum, cur) => {
					const qty = Number(cur.final_pick_quantity__c);
					return sum + (isNaN(qty) ? 0 : qty);
				}, 0);
				let startLoc = 0;
				let endLoc = 0;
				let pointLoc = 0;

				let way = "";
				let sotckQuantity = 0;

				const stockDetail = await ctx.mongo.find("hk_mater_two_stock_d__c", { query: { pallet__c: String(pallet).trim() }, sort: { time__c: -1 } });
				if (stockDetail.length) {
					const country__c = stockDetail[0].country__c;
					const factory_no__c = stockDetail[0].factory_no__c;
					const material_code__c = stockDetail[0].material_code__c;

					way = stockDetail[0].way__c;
					sotckQuantity = stockDetail[0].weight__c;
					const bacodeRule = await ctx.mongo.find("hk_mater_barcode_rule__c", { query: { country__c, factory_no__c, material_code__c } });
					console.log(bacodeRule);
					if (bacodeRule.length) {
						const u = bacodeRule[0];
						startLoc = u.barcode_start__c;
						endLoc = u.barcode_over__c;
						pointLoc = u.barcode_point__c;
					}
				}
				let Intercept = {
					startLoc,
					endLoc,
					pointLoc,
				};
				
				let currPallet = {
					count_pallet: String(PdaData.length),
					count_pallet_over: String(count_pallet_over.length),
					count_piece: String(count_piece),
					count_piece_over: String(count_piece_over),
					count_demand: String(DocData?.[0]?.quantity__c || 0), // 单据需求重量
					count_weight: count_weight.toFixed(3), // 出库所有托盘的总重量
					count_weight_over: count_weight_over.toFixed(3), // 已出库数量
					count_current_pallet: String(stockDetail?.[0]?.weight__c || 0), // 当前托盘数量
					count_current_piece: String(stockDetail?.[0]?.now_quantity__c || 0), // 当前件数
				};
				console.log(123);
				let paramData = { ...element, quantity__c: sotckQuantity, ...currPallet, ...Intercept, way: way };
				return ctx.send({ success: true, message: `获取数据成功！`, data: paramData });
			} else {
				return ctx.send({ success: false, message: `服务器返回错误：根据传递的托盘号未在数据库中找到数据或任务已处理！`, data: {} });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};
	// 原料库——出库-提交 整托/拆托数据
	hk_mater_submit_PdaSplit = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("原料库PDA拆托：", data);
		//  {
		// 	username__c: '02',
		// 	phone__c: '',
		// 	areaOrigin: '成品库',
		// 	materialInfo: {
		// 		_id: '6a100f4b13f867fd8d99d198',
		// 		time__c: '2026/05/22 16:09:47',
		// 		ducument_id__c: null,
		// 		doc_instruction__c: '141245345',
		// 		instruction__c: '668705759',
		// 		area__c: '冷藏库',
		// 		material_code__c: '16949',
		// 		material_name__c: '夫妻肺片（牛百叶）',
		// 		batch__c: '202022',
		// 		production_date__c: '2026-05-18',
		// 		document_id__c: '999999',
		// 		document_type__c: '其他出库单',
		// 		customer__c: null,
		// 		department__c: null,
		// 		pallet__c: 'CP7625090150',
		// 		status__c: '正在出库',
		// 		desc__c: '',
		// 		piece__c: 25,
		// 		handle_piece__c: 0,
		// 		quantity__c: 338.0849999999999,
		// 		pick_quantity__c: 212.875,
		// 		surplus_quantity__c: 125.21,
		// 		whole__c: '半托出库',
		// 		space: '61c51b8f4cada30031994f3d',
		// 		created_by: '63dc7de4902db72a48e718f2',
		// 		owner: '63dc7de4902db72a48e718f2',
		// 		created: '2026-05-22T08:09:47.058Z',
		// 		count_pallet: '9',
		// 		count_pallet_over: '2',
		// 		count_piece: '225',
		// 		count_piece_over: '50',
		// 		count_weight: '3425.210',
		// 		count_weight_over: '793.330'
		// 	},
		// 	pallet: 'CP7625090150',
		// 	dest_pallet: '',
		// 	pick_quantity: '',
		// 	dest_quantity: 338.0849999999999,
		// 	weight: 32.01,
		// 件数：重量为0才可以减件数，拆箱的不可减件数，拆箱的减条码重量
		//  codeArr: [
		// 		{
		// 			barcode: '16949129800101260517132735040000',
		// 			weight: 12.98,
		// 			splitWeight: 0,
		// 			hasManualWeight: false,
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			barcode: '16949133000101260517132754050000',
		// 			weight: 13.3,
		// 			splitWeight: 2.222,
		// 			hasManualWeight: false,
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			produceDate: '2026-05-24',
		// 			weight: 12.1,
		// 			splitWeight: 0,
		// 			hasManualWeight: true,
		// 			source: 'ocr'
		// 		},
		// 		{
		// 			produceDate: '2026-05-24',
		// 			weight: 15.3,
		// 			splitWeight: 0,
		// 			hasManualWeight: true,
		// 			source: 'ocr'
		// 		}
		// 	],
		// is_whole: '半托出库',
		// is_split: '半托出'
		// }

		// return ctx.send({ success: false, message: `测试++++++++++++++++++++++++++++` });

		// ! 下面需要处理条码表！
		if (data?.is_whole == "整托出库" || data?.is_split == "整托出") {
			const surplus = Number(data?.dest_quantity);

			// 整托出库
			const fDocs = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];

				const area = element.area__c;
				let TStock = "hk_mater_stock__c";
				let TSockDetail = "hk_mater_stock_detail__c";
				let TStockDetailHis = "hk_mater_stock_detail_his__c";
				let TStockDetailBarcode = "hk_mater_stock_detail_barcode__c";
				let TStockDetailBarcodeHis = "hk_mater_stock_detail_barcode_his__c";

				const p = element.pallet__c;

				const stock = await ctx.mongo.find(TStock, { query: { pallet__c: p } });
				const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
				if (stockDetail.length) {
					await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
						status__c: "处理库存成功",
						handle_piece__c: +element.piece__c,
						pick_quantity__c: +element.quantity__c,
						final_pick_quantity__c: +element.quantity__c,
						new_pallet__c: "无",
						new_quantity__c: 0,
					});

					if (stock.length) {
						await db.updateOne(TStock, stock[0]._id, {
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

					const stockDetailBarcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
					if (stockDetailBarcode.length) {
						for (const bacodeData of stockDetailBarcode) {
							await db.insertOne(TStockDetailBarcodeHis, { ...bacodeData, _id: null });
							await db.deleteOne(TStockDetailBarcode, bacodeData._id);
						}
					}

					await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null, time_finish__c: time() }); // 【历史任务中：需要有完成时间、】
					await db.deleteOne(TSockDetail, stockDetail[0]._id);
					console.log("删除写入历史表" + area);
					return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功!` });
				} else {
					return ctx.send({ success: false, message: `此托盘在【货架表】或【货架详情表】中库存错误，未找到相关托盘数据!` });
				}
			} else {
				return ctx.send({ success: false, message: `提交失败：查询数据错误！` });
			}
		} else {
			// const params_weight = data?.weight; // 78.5 库存详情表 扣减重量，
			// const codeArr = data?.codeArr; // 库存详情表 扣减件数，扣减的件数和重量要写入到历史任务中，  库存详情条码表 扣减条码， 写入操作的库存详情条码历史表
			// codeArr: [
			// 	{ barcode: '16949133000101260517132754050000' },
			// 	{ barcode: '16949129600101260517132816060000' },
			// 	{ barcode: '16949130900101260517132901070000' },
			// 	{ barcode: '16949130000101260517132919080000' },
			// 	{ barcode: '16949134350101260517132943090000' },
			// 	{ barcode: '16949127150101260517133017100000' }
			// ],
			const way = data?.materialInfo?.way;
			if (way == "手动OCR识别") {
				const params_weight = Number(data?.pick_quantity);
				const codeArr = data?.codeArr;
				const fDocs = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
				if (fDocs.length) {
					const element = fDocs[0];

					const area = element.area__c;
					let TStock = "hk_mater_stock__c";
					let TSockDetail = "hk_mater_stock_detail__c";
					let TStockDetailHis = "hk_mater_stock_detail_his__c";
					let TStockDetailBarcode = "hk_mater_stock_detail_barcode__c";
					let TStockDetailBarcodeHis = "hk_mater_stock_detail_barcode_his__c";

					const p = element.pallet__c;

					const stock = await ctx.mongo.find(TStock, { query: { pallet__c: p } });
					const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
					if (stockDetail.length) {
						const StockD = stockDetail[0];
						if (data?.weight > StockD.weight__c) {
							return ctx.send({ success: false, message: `提交失败：拣出重量：${data?.weight} 大于库存数量：${StockD.weight__c}` });
						}

						if (stock.length) {
							await db.updateOne(TStock, stock[0]._id, {
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

						if (data?.weight == StockD.weight__c) {
							const stockDetail_Barcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
							if (stockDetail_Barcode.length) {
								for (const element of stockDetail_Barcode) {
									await db.insertOne(TStockDetailBarcodeHis, { ...element, _id: null });
									await db.deleteOne(TStockDetailBarcode, element._id);
								}
							}
							await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c: codeArr,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${0}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr}`,
							});
							await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null });
							await db.deleteOne(TSockDetail, stockDetail[0]._id);
							return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功` });
						}
						if (data?.weight < StockD.weight__c) {
							let piece = stockDetail[0].now_quantity__c - codeArr;
							let handleWeight = Number((Math.round((Number(stockDetail[0].weight__c) - Number(params_weight)) * 1000) / 1000).toFixed(3));

							await db.updateOne(TSockDetail, stockDetail[0]._id, {
								now_quantity__c: piece,
								final_quantity__c: piece,
								weight__c: handleWeight,
								final_weight__c: handleWeight,
								stock_status__c: "已出库（有库存）",
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr}`,
							});

							await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c: codeArr,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${0}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr}`,
							});

							return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功` });
						}

						return ctx.send({ success: false, message: `提交失败：重量信息错误！` });
					} else {
						return ctx.send({ success: false, message: `此托盘在【货架表】或【货架详情表】中库存错误，未找到相关托盘数据!` });
					}
				}
			} else if (way == "条码自动识别") {
				const params_weight = data?.weight; // 78.5 库存详情表 扣减重量，
				const codeArr = data?.codeArr; // 库存详情表 扣减件数，扣减的件数和重量要写入到历史任务中，  库存详情条码表 扣减条码， 写入操作的库存详情条码历史表

				const fDocs = await ctx.mongo.find("hk_mater_pda_outgoing__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
				if (fDocs.length) {
					const element = fDocs[0];

					const area = element.area__c;
					let TStock = "hk_mater_stock__c";
					let TSockDetail = "hk_mater_stock_detail__c";
					let TStockDetailHis = "hk_mater_stock_detail_his__c";
					let TStockDetailBarcode = "hk_mater_stock_detail_barcode__c";
					let TStockDetailBarcodeHis = "hk_mater_stock_detail_barcode_his__c";

					const p = element.pallet__c;

					const stock = await ctx.mongo.find(TStock, { query: { pallet__c: p } });
					const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
					if (stockDetail.length) {
						// 这里先做数据校验，校验提交的重量与库存重量做对比，提交的件数与库存做对比，提交的拆箱重量与条码表中的重量做对比，
						const StockD = stockDetail[0];
						if (data?.weight > StockD.weight__c) {
							return ctx.send({ success: false, message: `提交失败：拣出重量：${data?.weight} 大于库存数量：${StockD.weight__c}` });
						}
						if (data?.codeArr?.length > StockD.now_quantity__c) {
							return ctx.send({ success: false, message: `提交失败：拣出件数：${data?.codeArr?.length} 大于库存件数：${StockD.now_quantity__c}` });
						}

						const stockDetail_Barcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
						const codeArr_Auto = codeArr.filter((v: { source: String }) => v.source == "barcode"); // 先获取是否是自动识别条码
						const codeArr_OCR = codeArr.filter((v: { source: String }) => v.source == "ocr"); // 获取是否是手动输入的重量，未识别到条码的

						// 识别到条码并且无拆箱的
						const codeArr_Whole = codeArr_Auto.filter((v: { splitWeight: number }) => v.splitWeight == 0);
						if (codeArr_Whole.length) {
							for (const element of codeArr_Whole) {
								const d1 = stockDetail_Barcode.filter(v => v.barcode__c == element.barcode);
								if (d1.length == 0) {
									return ctx.send({ success: false, message: `提交失败：在库存中未找到条码：${element.barcode}` });
								}
							}
						}

						// 识别到条码并且有拆箱的
						const codeArr_Split = codeArr_Auto.filter((v: { splitWeight: number }) => v.splitWeight != 0); // 传递的数组中，拆箱的数据
						if (codeArr_Split.length) {
							for (const element of codeArr_Split) {
								const d1 = stockDetail_Barcode.filter(v => v.barcode__c == element.barcode);
								if (d1.length) {
									if (d1?.[0]?.weight__c < element?.splitWeight) {
										return ctx.send({ success: false, message: `提交失败：拆箱重量：${element.splitWeight} 大于库存条码重量：${d1[0].weight__c}` });
									}
								} else {
									return ctx.send({ success: false, message: `提交失败：在库存中未找到条码：${element.barcode}` });
								}
							}
						}

						let handleWeight = Number((Math.round((Number(stockDetail[0].weight__c) - Number(params_weight)) * 1000) / 1000).toFixed(3));
						if (handleWeight < 0) {
							return ctx.send({ success: false, message: `提交失败：出库数量：${params_weight} 大于库存库存重量：${stockDetail[0].weight__c}` });
						}

						// return ctx.send({ success: false, message: `测试++++++++++++++++++++++++++++` });

						if (stock.length) {
							await db.updateOne(TStock, stock[0]._id, {
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

						// const stockDetailBarcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
						// 处理 自动识别条码 数据
						if (codeArr_Whole.length) {
							for (const ec of codeArr_Whole) {
								const barcode = ec.barcode;
								const ds = stockDetail_Barcode.filter(v => v.barcode__c == barcode);
								if (ds.length) {
									const dsDetail = ds[0];
									await db.insertOne(TStockDetailBarcodeHis, { ...dsDetail, _id: null });
									await db.deleteOne(TStockDetailBarcode, dsDetail._id);
								}
							}
						}
						if (codeArr_Split.length) {
							for (const ec of codeArr_Split) {
								const barcode = ec.barcode;
								const ds = stockDetail_Barcode.filter(v => v.barcode__c == barcode);
								if (ds.length) {
									const dsDetail = ds[0];
									const splu = Number((Math.round((Number(dsDetail.weight__c) - Number(ec.splitWeight)) * 1000) / 1000).toFixed(3));
									await db.updateOne(TStockDetailBarcode, dsDetail._id, {
										weight__c: splu,
										desc__c: `原重量：${dsDetail.weight__c} 扣减重量：${ec.splitWeight} 剩余数量：${splu}`,
									});
								} else {
									console.log("未取到");
								}
							}
						}

						if (codeArr_OCR.length) {
							// 处理OCR识别部分
							for (const ec of codeArr_OCR) {
								const weight = ec.weight;
								// const ds = stockDetail_Barcode.filter(v => v.weight__c == weight);
								const ds = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p, weight__c: weight } });
								if (ds.length) {
									const dsDetail = ds[0];
									await db.insertOne(TStockDetailBarcodeHis, { ...dsDetail, _id: null });
									await db.deleteOne(TStockDetailBarcode, dsDetail._id);
								}
							}
						}

						let piece = stockDetail[0].now_quantity__c - codeArr_Whole.length - codeArr_OCR.length;
						const handlePice = codeArr_Whole.length + codeArr_OCR.length;
						if (handleWeight > 0) {
							// 处理数量
							await db.updateOne(TSockDetail, stockDetail[0]._id, {
								now_quantity__c: piece,
								final_quantity__c: piece,
								weight__c: handleWeight,
								final_weight__c: handleWeight,
								stock_status__c: "已出库（有库存）",
							});

							await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c: handlePice,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${handlePice}`,
							});
						} else if (handleWeight == 0) {
							await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null });
							await db.deleteOne(TSockDetail, stockDetail[0]._id);

							await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c: handlePice,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${handlePice}`,
							});
						}

						console.log("删除写入历史表" + area);
						return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功!` });
					} else {
						return ctx.send({ success: false, message: `此托盘在【货架表】或【货架详情表】中库存错误，未找到相关托盘数据!` });
					}
				} else {
					return ctx.send({ success: false, message: `提交失败：查询数据错误！` });
				}
			} else {
				return ctx.send({ success: false, message: `提交错误：未能识别任务是：手动OCR识别还是条码自动识别！` });
			}
		}
	};

	hk_mater_t_submit_PdaSplit_t = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("原料库二号库提交：", data);
		//  {
		// 	username__c: '02',
		// 	phone__c: '',
		// 	areaOrigin: '成品库',
		// 	materialInfo: {
		// 		_id: '6a100f4b13f867fd8d99d198',
		// 		time__c: '2026/05/22 16:09:47',
		// 		ducument_id__c: null,
		// 		doc_instruction__c: '141245345',
		// 		instruction__c: '668705759',
		// 		area__c: '冷藏库',
		// 		material_code__c: '16949',
		// 		material_name__c: '夫妻肺片（牛百叶）',
		// 		batch__c: '202022',
		// 		production_date__c: '2026-05-18',
		// 		document_id__c: '999999',
		// 		document_type__c: '其他出库单',
		// 		customer__c: null,
		// 		department__c: null,
		// 		pallet__c: 'CP7625090150',
		// 		status__c: '正在出库',
		// 		desc__c: '',
		// 		piece__c: 25,
		// 		handle_piece__c: 0,
		// 		quantity__c: 338.0849999999999,
		// 		pick_quantity__c: 212.875,
		// 		surplus_quantity__c: 125.21,
		// 		whole__c: '半托出库',
		// 		space: '61c51b8f4cada30031994f3d',
		// 		created_by: '63dc7de4902db72a48e718f2',
		// 		owner: '63dc7de4902db72a48e718f2',
		// 		created: '2026-05-22T08:09:47.058Z',
		// 		count_pallet: '9',
		// 		count_pallet_over: '2',
		// 		count_piece: '225',
		// 		count_piece_over: '50',
		// 		count_weight: '3425.210',
		// 		count_weight_over: '793.330'
		// 	},
		// 	pallet: 'CP7625090150',
		// 	dest_pallet: '',
		// 	pick_quantity: '',
		// 	dest_quantity: 338.0849999999999,
		// 	weight: 32.01,
		// 件数：重量为0才可以减件数，拆箱的不可减件数，拆箱的减条码重量
		//  codeArr: [
		// 		{
		// 			barcode: '16949129800101260517132735040000',
		// 			weight: 12.98,
		// 			splitWeight: 0,
		// 			hasManualWeight: false,
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			barcode: '16949133000101260517132754050000',
		// 			weight: 13.3,
		// 			splitWeight: 2.222,
		// 			hasManualWeight: false,
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			produceDate: '2026-05-24',
		// 			weight: 12.1,
		// 			splitWeight: 0,
		// 			hasManualWeight: true,
		// 			source: 'ocr'
		// 		},
		// 		{
		// 			produceDate: '2026-05-24',
		// 			weight: 15.3,
		// 			splitWeight: 0,
		// 			hasManualWeight: true,
		// 			source: 'ocr'
		// 		}
		// 	],
		// is_whole: '半托出库',
		// is_split: '半托出'
		// }

		// return ctx.send({ success: false, message: `测试++++++++++++++++++++++++++++` });

		// ! 下面需要处理条码表！
		if (data?.is_whole == "整托出库" || data?.is_split == "整托出") {
			const surplus = Number(data?.dest_quantity);

			// 整托出库
			const fDocs = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];

				const area = element.area__c;
				let TStock = "hk_mater_stock__c";
				let TSockDetail = "hk_mater_two_stock_d__c";
				let TStockDetailHis = "hk_mater_two_stock_d_his__c";
				let TStockDetailBarcode = "hk_mater_two_stock_d_barcode__c";
				let TStockDetailBarcodeHis = "hk_mater_two_stock_d_barcode_his__c";

				const p = data?.pallet;

				const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
				if (stockDetail.length) {
					const ele_stock = stockDetail[0];
					await db.insertOne("hk_mater_two_pda_out__c", {
						time__c: time(),
						document_id__c: element?.document_id__c,
						document_type__c: element?.document_type__c,
						department__c: element?.department__c, // 领用部门

						doc_instruction__c: element?.document_type__c,
						instruction__c: "",
						area__c: area,

						material_code__c: ele_stock?.material_code__c,
						material_name__c: ele_stock?.material_name__c,
						batch__c: ele_stock?.batch__c,
						production_date__c: ele_stock?.production_date__c,

						customer__c: element?.customer__c,
						contract__c: element?.contract__c,

						pallet__c: p,
						status__c: "处理库存成功",
						desc__c: "",

						piece__c: ele_stock.now_quantity__c,
						handle_piece__c: ele_stock.now_quantity__c,

						quantity__c: Number(ele_stock.weight__c),
						pick_quantity__c: Number(ele_stock.weight__c),
						surplus_quantity__c: 0,
						final_pick_quantity__c: Number(ele_stock.weight__c),
						whole__c: "整托出库",
					});
					// return ctx.send({ success: false, message: `测试++++++++++++++++++++++++++++` });

					const stockDetailBarcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
					if (stockDetailBarcode.length) {
						for (const bacodeData of stockDetailBarcode) {
							await db.insertOne(TStockDetailBarcodeHis, { ...bacodeData, _id: null });
							await db.deleteOne(TStockDetailBarcode, bacodeData._id);
						}
					}

					await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null, time_finish__c: time() }); // 【历史任务中：需要有完成时间、】
					await db.deleteOne(TSockDetail, stockDetail[0]._id);
					console.log("删除写入历史表" + area);
					return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功!` });
				} else {
					return ctx.send({ success: false, message: `此托盘在【货架详情表】中库存错误，未找到相关托盘数据!` });
				}
			} else {
				return ctx.send({ success: false, message: `提交失败：查询数据错误！` });
			}
		} else {
			// const params_weight = data?.weight; // 78.5 库存详情表 扣减重量，
			// const codeArr = data?.codeArr; // 库存详情表 扣减件数，扣减的件数和重量要写入到历史任务中，  库存详情条码表 扣减条码， 写入操作的库存详情条码历史表
			// codeArr: [
			// 	{ barcode: '16949133000101260517132754050000' },
			// 	{ barcode: '16949129600101260517132816060000' },
			// 	{ barcode: '16949130900101260517132901070000' },
			// 	{ barcode: '16949130000101260517132919080000' },
			// 	{ barcode: '16949134350101260517132943090000' },
			// 	{ barcode: '16949127150101260517133017100000' }
			// ],
			const way = data?.materialInfo?.way;
			if (way == "手动OCR识别") {
				const params_weight = Number(data?.pick_quantity);
				const codeArr = data?.codeArr;
				const fDocs = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
				if (fDocs.length) {
					const element = fDocs[0];

					const area = element.area__c;
					let TStock = "hk_mater_stock__c";
					let TSockDetail = "hk_mater_two_stock_d__c";
					let TStockDetailHis = "hk_mater_two_stock_d_his__c";
					let TStockDetailBarcode = "hk_mater_two_stock_d_barcode__c";
					let TStockDetailBarcodeHis = "hk_mater_two_stock_d_barcode_his__c";

					const p = element.pallet__c;

					// const stock = await ctx.mongo.find(TStock, { query: { pallet__c: p } });
					const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
					if (stockDetail.length) {
						const StockD = stockDetail[0];
						if (data?.weight > StockD.weight__c) {
							return ctx.send({ success: false, message: `提交失败：拣出重量：${data?.weight} 大于库存数量：${StockD.weight__c}` });
						}

						// if (stock.length) {
						// 	await db.updateOne(TStock, stock[0]._id, {
						// 		time__c: time(),
						// 		shelf_status__c: "空闲",
						// 		pallet__c: "",
						// 		pallet_status__c: "空闲",
						// 		contract__c: "",
						// 		material_code__c: "",
						// 		material_name__c: "",
						// 		batch__c: "",
						// 		production_date__c: "",
						// 		entry_stock_date__c: "",
						// 		supplier__c: "",
						// 		is_tax__c: "",
						// 		cabinet__c: "",
						// 		desc__c: "",
						// 	});
						// }

						await db.insertOne("hk_mater_two_pda_out__c", {
							time__c: time(),
							document_id__c: element?.document_id__c,
							document_type__c: element?.document_type__c,
							department__c: element?.department__c, // 领用部门

							doc_instruction__c: element?.document_type__c,
							instruction__c: "",
							area__c: area,

							material_code__c: stockDetail[0]?.material_code__c,
							material_name__c: stockDetail[0]?.material_name__c,
							batch__c: stockDetail[0]?.batch__c,
							production_date__c: stockDetail[0]?.production_date__c,

							customer__c: element?.customer__c,
							contract__c: element?.contract__c,

							pallet__c: p,
							status__c: "处理库存成功",

							piece__c: stockDetail[0]?.now_quantity__c,
							handle_piece__c: codeArr.length,

							quantity__c: Number(stockDetail[0]?.weight__c),
							pick_quantity__c: params_weight,
							surplus_quantity__c: stockDetail[0]?.weight__c - params_weight,
							final_pick_quantity__c: params_weight,
							whole__c: "半托出库",
							desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${stockDetail[0]?.weight__c - params_weight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr.length}`,
						});

						if (data?.weight == StockD.weight__c) {
							const stockDetail_Barcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
							if (stockDetail_Barcode.length) {
								for (const element of stockDetail_Barcode) {
									await db.insertOne(TStockDetailBarcodeHis, { ...element, _id: null });
									await db.deleteOne(TStockDetailBarcode, element._id);
								}
							}
							// await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
							// 	status__c: "处理库存成功",
							// 	final_pick_quantity__c: params_weight,
							// 	handle_piece__c: codeArr,
							// 	desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${0}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr}`,
							// });
							await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null });
							await db.deleteOne(TSockDetail, stockDetail[0]._id);
							return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功` });
						}
						if (data?.weight < StockD.weight__c) {
							let piece = stockDetail[0].now_quantity__c - codeArr.length;
							let handleWeight = Number((Math.round((Number(stockDetail[0].weight__c) - Number(params_weight)) * 1000) / 1000).toFixed(3));

							await db.updateOne(TSockDetail, stockDetail[0]._id, {
								now_quantity__c: piece,
								final_quantity__c: piece,
								weight__c: handleWeight,
								final_weight__c: handleWeight,
								stock_status__c: "在库",
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr.length}`,
							});

							// await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
							// 	status__c: "处理库存成功",
							// 	final_pick_quantity__c: params_weight,
							// 	handle_piece__c: codeArr,
							// 	desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${0}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr}`,
							// });

							return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功` });
						}

						return ctx.send({ success: false, message: `提交失败：重量信息错误！` });
					} else {
						return ctx.send({ success: false, message: `此托盘在【货架表】或【货架详情表】中库存错误，未找到相关托盘数据!` });
					}
				}
			} else if (way == "条码自动识别") {
				const params_weight = data?.weight; // 78.5 库存详情表 扣减重量，
				const codeArr = data?.codeArr; // 库存详情表 扣减件数，扣减的件数和重量要写入到历史任务中，  库存详情条码表 扣减条码， 写入操作的库存详情条码历史表

				const fDocs = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
				if (fDocs.length) {
					const element = fDocs[0];

					const area = element.area__c;
					let TStock = "hk_mater_stock__c";
					let TSockDetail = "hk_mater_two_stock_d__c";
					let TStockDetailHis = "hk_mater_two_stock_d_his__c";
					let TStockDetailBarcode = "hk_mater_two_stock_d_barcode__c";
					let TStockDetailBarcodeHis = "hk_mater_two_stock_d_barcode_his__c";

					const p = data?.pallet;

					// const stock = await ctx.mongo.find(TStock, { query: { pallet__c: p } });
					const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
					if (stockDetail.length) {
						// 这里先做数据校验，校验提交的重量与库存重量做对比，提交的件数与库存做对比，提交的拆箱重量与条码表中的重量做对比，
						const StockD = stockDetail[0];
						if (data?.weight > StockD.weight__c) {
							return ctx.send({ success: false, message: `提交失败：拣出重量：${data?.weight} 大于库存数量：${StockD.weight__c}` });
						}
						if (data?.codeArr?.length > StockD.now_quantity__c) {
							return ctx.send({ success: false, message: `提交失败：拣出件数：${data?.codeArr?.length} 大于库存件数：${StockD.now_quantity__c}` });
						}

						const stockDetail_Barcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
						const codeArr_Auto = codeArr.filter((v: { source: String }) => v.source == "barcode"); // 先获取是否是自动识别条码
						const codeArr_OCR = codeArr.filter((v: { source: String }) => v.source == "ocr"); // 获取是否是手动输入的重量，未识别到条码的

						// 识别到条码并且无拆箱的
						const codeArr_Whole = codeArr_Auto.filter((v: { splitWeight: number }) => v.splitWeight == 0);
						if (codeArr_Whole.length) {
							for (const element of codeArr_Whole) {
								const d1 = stockDetail_Barcode.filter(v => v.barcode__c == element.barcode);
								if (d1.length == 0) {
									return ctx.send({ success: false, message: `提交失败：在库存中未找到条码：${element.barcode}` });
								}
							}
						}

						// 识别到条码并且有拆箱的
						const codeArr_Split = codeArr_Auto.filter((v: { splitWeight: number }) => v.splitWeight != 0); // 传递的数组中，拆箱的数据
						if (codeArr_Split.length) {
							for (const element of codeArr_Split) {
								const d1 = stockDetail_Barcode.filter(v => v.barcode__c == element.barcode);
								if (d1.length) {
									if (d1?.[0]?.weight__c < element?.splitWeight) {
										return ctx.send({ success: false, message: `提交失败：拆箱重量：${element.splitWeight} 大于库存条码重量：${d1[0].weight__c}` });
									}
								} else {
									return ctx.send({ success: false, message: `提交失败：在库存中未找到条码：${element.barcode}` });
								}
							}
						}

						let handleWeight = Number((Math.round((Number(stockDetail[0].weight__c) - Number(params_weight)) * 1000) / 1000).toFixed(3));
						if (handleWeight < 0) {
							return ctx.send({ success: false, message: `提交失败：出库数量：${params_weight} 大于库存库存重量：${stockDetail[0].weight__c}` });
						}

						// return ctx.send({ success: false, message: `测试++++++++++++++++++++++++++++` });

						// if (stock.length) {
						// 	await db.updateOne(TStock, stock[0]._id, {
						// 		time__c: time(),
						// 		shelf_status__c: "空闲",
						// 		pallet__c: "",
						// 		pallet_status__c: "空闲",
						// 		contract__c: "",
						// 		material_code__c: "",
						// 		material_name__c: "",
						// 		batch__c: "",
						// 		production_date__c: "",
						// 		entry_stock_date__c: "",
						// 		supplier__c: "",
						// 		is_tax__c: "",
						// 		cabinet__c: "",
						// 		desc__c: "",
						// 	});
						// }

						// const stockDetailBarcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
						// 处理 自动识别条码 数据
						if (codeArr_Whole.length) {
							for (const ec of codeArr_Whole) {
								const barcode = ec.barcode;
								const ds = stockDetail_Barcode.filter(v => v.barcode__c == barcode);
								if (ds.length) {
									const dsDetail = ds[0];
									await db.insertOne(TStockDetailBarcodeHis, { ...dsDetail, _id: null });
									await db.deleteOne(TStockDetailBarcode, dsDetail._id);
								}
							}
						}
						if (codeArr_Split.length) {
							for (const ec of codeArr_Split) {
								const barcode = ec.barcode;
								const ds = stockDetail_Barcode.filter(v => v.barcode__c == barcode);
								if (ds.length) {
									const dsDetail = ds[0];
									const splu = Number((Math.round((Number(dsDetail.weight__c) - Number(ec.splitWeight)) * 1000) / 1000).toFixed(3));
									await db.updateOne(TStockDetailBarcode, dsDetail._id, {
										weight__c: splu,
										desc__c: `原重量：${dsDetail.weight__c} 扣减重量：${ec.splitWeight} 剩余数量：${splu}`,
									});
								} else {
									console.log("未取到");
								}
							}
						}

						if (codeArr_OCR.length) {
							// 处理OCR识别部分
							for (const ec of codeArr_OCR) {
								const weight = ec.weight;
								// const ds = stockDetail_Barcode.filter(v => v.weight__c == weight);
								const ds = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p, weight__c: weight } });
								if (ds.length) {
									const dsDetail = ds[0];
									await db.insertOne(TStockDetailBarcodeHis, { ...dsDetail, _id: null });
									await db.deleteOne(TStockDetailBarcode, dsDetail._id);
								}
							}
						}

						let piece = stockDetail[0].now_quantity__c - codeArr_Whole.length - codeArr_OCR.length;
						const handlePice = codeArr_Whole.length + codeArr_OCR.length;

						await db.insertOne("hk_mater_two_pda_out__c", {
							time__c: time(),
							document_id__c: element?.document_id__c,
							document_type__c: element?.document_type__c,
							department__c: element?.department__c, // 领用部门

							doc_instruction__c: element?.document_type__c,
							instruction__c: "",
							area__c: area,

							material_code__c: stockDetail[0]?.material_code__c,
							material_name__c: stockDetail[0]?.material_name__c,
							batch__c: stockDetail[0]?.batch__c,
							production_date__c: stockDetail[0]?.production_date__c,

							customer__c: element?.customer__c,
							contract__c: element?.contract__c,

							pallet__c: p,
							status__c: "处理库存成功",

							piece__c: stockDetail[0]?.now_quantity__c,
							handle_piece__c: handlePice,

							quantity__c: Number(stockDetail[0]?.weight__c),
							pick_quantity__c: params_weight,
							surplus_quantity__c: stockDetail[0]?.weight__c - params_weight,
							final_pick_quantity__c: params_weight,
							whole__c: "半托出库",
							desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${handlePice}`,
						});

						if (handleWeight > 0) {
							// 处理数量
							await db.updateOne(TSockDetail, stockDetail[0]._id, {
								now_quantity__c: piece,
								final_quantity__c: piece,
								weight__c: handleWeight,
								final_weight__c: handleWeight,
								stock_status__c: "在库",
							});

							// await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
							// 	status__c: "处理库存成功",
							// 	final_pick_quantity__c: params_weight,
							// 	handle_piece__c: handlePice,
							// 	desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${handlePice}`,
							// });
						} else if (handleWeight == 0) {
							await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null });
							await db.deleteOne(TSockDetail, stockDetail[0]._id);

							// await ctx.mongo.updateOne("hk_mater_pda_outgoing__c", element._id, {
							// 	status__c: "处理库存成功",
							// 	final_pick_quantity__c: params_weight,
							// 	handle_piece__c: handlePice,
							// 	desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${handlePice}`,
							// });
						}

						console.log("删除写入历史表" + area);
						return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功!` });
					} else {
						return ctx.send({ success: false, message: `此托盘在【货架表】或【货架详情表】中库存错误，未找到相关托盘数据!` });
					}
				} else {
					return ctx.send({ success: false, message: `提交失败：查询数据错误！` });
				}
			} else {
				return ctx.send({ success: false, message: `提交错误：未能识别任务是：手动OCR识别还是条码自动识别！` });
			}
		}
	};
	f1 = async () => {};

	f2 = async () => {};
}

export default new App();
