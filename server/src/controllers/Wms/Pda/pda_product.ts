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
		const fDocs = await ctx.mongo.find("hk_mater_doc_detail__c", { query: { cmdtype__c: "入库任务", status__c: "正在执行" }, sort: { time__c: -1 } });
		if (fDocs.length) {
			return ctx.send({ success: true, message: `获取数据成功！`, data: fDocs || [] });
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

	hk_product_enter_byPallet_isGoods = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const pallet = String(data?.pallet).trim();
		let msg = "";
		if (pallet) {
			const fDocs = await db.find("hk_product_chuyu__c", { query: { pallet__c: pallet, status__c: { $in: ["收货", "已收货", "已创建", "正在入库"] } }, sort: { time__c: -1 } });
			if (fDocs.length) {
				return ctx.send({ success: false, message: `此托盘: ${pallet}已收货！` });
			} else {
				const is_stock = await db.find("hk_freezing_stock__c", { query: { pallet__c: pallet } });
				if (is_stock.length) {
					msg = `提交错误：此托盘在【成品冷冻库货架表】存在库存！`;
					return ctx.send({ success: false, message: msg });
				}
				const is_stockDetail = await db.find("hk_freezing_stock_detail__c", { query: { pallet__c: pallet } });
				if (is_stockDetail.length) {
					msg = `提交错误：此托盘在【成品冷冻库存详情表】存在库存!`;
					return ctx.send({ success: false, message: msg });
				}
				const is_stock2 = await db.find("hk_chilled_stock__c", { query: { pallet__c: pallet } });
				if (is_stock2.length) {
					msg = `提交错误：此托盘在【成品冷藏货架表】存在库存！`;
					return ctx.send({ success: false, message: msg });
				}
				const is_stockDetail2 = await db.find("hk_chilled_stock_detail__c", { query: { pallet__c: pallet } });
				if (is_stockDetail2.length) {
					msg = `提交错误：此托盘在【成品冷藏库存详情表】存在库存!`;
					return ctx.send({ success: false, message: msg });
				}
				return ctx.send({ success: true, message: `此托盘: ${pallet}未收货！` });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	hk_product_enter_get_document = async (ctx: Context) => {
		const data: any = ctx.request.body;
		const fDocs = await ctx.mongo.find("hk_product_doc_detail__c", { query: { cmdtype__c: "入库任务", status__c: "正在执行" }, sort: { time__c: -1 } });
		if (fDocs.length) {
			return ctx.send({ success: true, message: `获取数据成功！`, data: fDocs || [] });
		} else {
			return ctx.send({ success: true, message: `获取数据列表为空！`, data: [] });
		}
	};

	hk_product_enter_accept_goods = async (ctx: Context) => {
		const data: any = ctx.request.body;
		console.log("成品入库收货传递数据：", data);
		const db = ctx.mongo;

		let data2 = {
			areaOrigin: "成品库",
			materialInfo: {
				id: "6a6c7f721932dfd36205d26b",
				id__c: "",
				material_code__c: "16949",
				material_name__c: "海南夫妻肺片（牛肉）",
				batch__c: "",
				produce_date__c: "2026-08-03",
				cabinet__c: "",
				contract__c: "",
			},
			pallet: "s01",
			barCodeArr: [
				{ barcode: "16949144700101260520122548260000", source: "barcode" },
				{ barcode: "16949131450101260520122635280000", source: "barcode" },
				{ source: "manual", piece: 25, weight: 457.566 },
			],
		};
		// return ctx.send({ success: false, message: "ssss" });

		try {
			let msg = "";

			let entry_way = "";

			if (data?.barCodeArr.length > 0) {
				const result: any[] = [...new Set(data?.barCodeArr?.map((v: any) => v.source))];
				console.log("result", result);
				if (result.length != 1) {
					return ctx.send({ success: false, message: "入库方式只能是自动扫码入库或者手动输入件数和重量入库，不可两种都选择！" });
				}
				entry_way = result[0];
			} else {
				return ctx.send({ success: false, message: "请扫描条码或者输入重量！" });
			}
			console.log("entry_way", entry_way); // barcode | manual

			// return ctx.send({ success: false, message: "ssss" });

			const pallet = String(data?.pallet).trim();
			const is_goods = await db.find("hk_product_chuyu__c", { query: { pallet__c: pallet, status__c: { $in: ["已创建", "正在入库"] } } });
			if (is_goods.length) {
				msg = `提交错误：此托盘已经收过货了，无法重新重获，请处理任务后，再次收货！`;
				return ctx.send({ success: false, message: msg });
			}
			const is_stock = await db.find("hk_freezing_stock__c", { query: { pallet__c: pallet } });
			if (is_stock.length) {
				msg = `提交错误：此托盘在【冷冻库货架表】存在库存！`;
				return ctx.send({ success: false, message: msg });
			}
			const is_stockDetail = await db.find("hk_freezing_stock_detail__c", { query: { pallet__c: pallet } });
			if (is_stockDetail.length) {
				msg = `提交错误：此托盘在【冷冻库库存详情表】存在库存!`;
				return ctx.send({ success: false, message: msg });
			}
			const is_stoc2k2 = await db.find("hk_chilled_stock__c", { query: { pallet__c: pallet } });
			if (is_stoc2k2.length) {
				msg = `提交错误：此托盘在【冷藏库货架表】存在库存！`;
				return ctx.send({ success: false, message: msg });
			}
			const is_stockDetail2 = await db.find("hk_chilled_stock_detail__c", { query: { pallet__c: pallet } });
			if (is_stockDetail2.length) {
				msg = `提交错误：此托盘在【冷藏库库存详情表】存在库存!`;
				return ctx.send({ success: false, message: msg });
			}

			const gwmsD = await db.find("hk_product_doc_detail__c", { query: { _id: data?.materialInfo?.id }, sort: { time__c: -1 } });
			if (gwmsD.length == 1) {
				const items = gwmsD[0];
				// node.warn(items);
				// return

				// 先删除 再写入
				// await this.removeByPallet(ctx, "hk_mater_manual_doc_bind__c", data?.pallet);
				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
				const day = String(now.getDate()).padStart(2, "0");
				const formatted = `${year}-${month}-${day}`;

				if (data?.barCodeArr.length > 0) {
					if (entry_way == "manual") {
						// console.log(123);
						if (data?.barCodeArr.length > 1) {
							return ctx.send({ success: false, message: "提交错误：整托重量数据是一条" });
						}

						let materCode = items.material_code__c;
						let materName = "";
						const materData = await db.find("hk_main_mater_data__c", { query: { material_code__c: materCode }, sort: { time__c: -1 } });
						if (materData.length) {
							materName = materData[0]?.material_name__c;
						}

						let piece = data?.barCodeArr[0].piece;
						let weight = data?.barCodeArr[0].weight;

						await db.insertOne("hk_product_chuyu__c", {
							time__c: time(),
							pallet__c: pallet,
							barcode_arr__c: data?.barCodeArr,
							status__c: "已创建",
							count__c: piece, // 位置号
							barcode__c: "",
							weight__c: weight,
							production_date__c: items?.production_date__c,
							material_code__c: materCode, // 物料代码
							contract__c: items?.contract__c || "", // 合同号
							supplier__c: items?.supplier__c || "", // 供应商
							entry_stock_date__c: formatted, // 入库日期
							document_id__c: items?.document_id__c || "",
							doc_instruction__c: items?.doc_instruction__c || "",

							material_name__c: materName || "",

							arrival_date__c: items?.arrival_date__c || "",
							cabinet__c: items?.cabinet__c || "",
							instruction__c: items.instruction__c || "",
						});
						msg = `成功：数据处理完成, 已收货`;
						return ctx.send({ success: true, message: msg });
					} else {
						const docs = [];
						let n = 1;
						for (const element of data?.barCodeArr) {
							let barcode = element.barcode;

							const materialCode = barcode.slice(0, 5);
							const weightCode = barcode.slice(5, 10);
							const weight = Number(`${weightCode.slice(0, 2)}.${weightCode.slice(2)}`);

							let materName = "";
							const materData = await db.find("hk_main_mater_data__c", { query: { material_code__c: materialCode }, sort: { time__c: -1 } });
							if (materData.length) {
								materName = materData[0]?.material_name__c;
							}
							docs.push({
								time__c: time(),
								pallet__c: pallet,
								barcode_arr__c: data?.barCodeArr,
								status__c: "已创建",
								count__c: n++, // 位置号
								barcode__c: barcode,
								weight__c: weight,
								production_date__c: items?.production_date__c,
								material_code__c: materialCode, // 物料代码
								contract__c: items?.contract__c || "", // 合同号
								supplier__c: items?.supplier__c || "", // 供应商
								entry_stock_date__c: formatted, // 入库日期
								document_id__c: items?.document_id__c || "",
								doc_instruction__c: items?.doc_instruction__c || "",

								material_name__c: materName || "",

								arrival_date__c: items?.arrival_date__c || "",
								cabinet__c: items?.cabinet__c || "",
								instruction__c: items.instruction__c || "",
							});
						}
						await db.insertMany("hk_product_chuyu__c", docs);
						msg = `成功：数据处理完成, 已收货`;
						return ctx.send({ success: true, message: msg });
					}
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
		// 	pallet: 'A',
		// 	barCodeArr: [
		// 		{ produceDate: '2026-05-24', weight: '12.100', source: 'manual' },
		// 		{
		// 			barcode: '16949129800101260517132735040000',
		// 			weight: '12.980',
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			barcode: '16949133000101260517132754050000',
		// 			weight: '13.300',
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			barcode: '16949130900101260517132901070000',
		// 			weight: '13.090',
		// 			source: 'barcode'
		// 		},
		// 		{
		// 			barcode: '16949134350101260517132943090000',
		// 			weight: '13.435',
		// 			source: 'barcode'
		// 		},
		// 		{ produceDate: '2026-05-24', weight: '15.300', source: 'manual' }
		// 	]
		// }
		// return ctx.send({ success: false, message: "ssss" });

		try {
			let msg = "";

			const pallet = data?.pallet;
			const is_goods = await db.find("hk_mater_pda_receipt__c", { query: { pallet__c: pallet } });
			if (is_goods.length) {
				// node.warn("!");
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
				// node.warn("");
				msg = `提交错误：此托盘在【原料库库存详情表】存在库存!`;
				return ctx.send({ success: false, message: msg });
			}

			const gwmsD = await db.find("hk_mater_doc_detail__c", { query: { _id: data?.materialInfo?.id }, sort: { time__c: -1 } });
			if (gwmsD.length == 1) {
				const items = gwmsD[0];
				// node.warn(items);
				// return

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
							production_date__c = element.produceDate;
							weight = Number(element.weight);
							barcode = "";
						} else if (element.source == "barcode") {
							way = "自动识别条码";
							production_date__c = "";
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

	// 成品库——出库-获取托盘拆托表
	hk_product_by_pallet_PdaSplit = async (ctx: Context) => {
		const data: any = ctx.request.body;
		// console.log("data", data);
		if (data?.pallet) {
			const pallet = String(data?.pallet).trim();
			const fDocs = await ctx.mongo.find("hk_product_pda_outgoing__c", { query: { pallet__c: pallet, status__c: "正在出库" }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];
				let entry_way = "";
				let area = element.area__c;
				if (area == "冷冻库") {
					const stock1 = await ctx.mongo.find("hk_freezing_stock_detail__c", { query: { pallet__c: pallet } });
					if (stock1.length) {
						if (stock1[0].enter_way__c) {
							entry_way = stock1[0].enter_way__c;
						} else {
							entry_way = "自动扫码入库";
						}
					}
				} else {
					const stock1 = await ctx.mongo.find("hk_chilled_stock_detail__c", { query: { pallet__c: pallet } });
					if (stock1.length) {
						if (stock1[0].enter_way__c) {
							entry_way = stock1[0].enter_way__c;
						} else {
							entry_way = "自动扫码入库";
						}
					}
				}

				const doc_instruction__c = element.doc_instruction__c;
				const PdaData = await ctx.mongo.find("hk_product_pda_outgoing__c", { query: { doc_instruction__c } });
				const count_pallet_over = PdaData.filter(v => v.status__c == "处理库存成功");
				const count_piece = PdaData.reduce((sum, cur) => sum + cur.piece__c, 0);
				const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
				const count_weight = PdaData.reduce((sum, cur) => sum + cur.quantity__c, 0);
				const count_weight_over = PdaData.reduce((sum, cur) => {
					const qty = Number(cur.final_pick_quantity__c);
					return sum + (isNaN(qty) ? 0 : qty);
				}, 0);
				const DocData = await ctx.mongo.find("hk_product_doc_detail__c", { query: { doc_instruction__c } });
				const docD = DocData?.[0];
				let currPallet = {
					lead_department__c: docD?.lead_department__c,
					sale_organization__c: docD?.sale_organization__c,
					customer_code__c: docD?.customer_code__c,
					customer_name__c: docD?.customer_name__c,
					count_pallet: String(PdaData.length),
					count_pallet_over: String(count_pallet_over.length),
					count_piece: String(count_piece),
					count_piece_over: String(count_piece_over),
					count_demand: String(DocData?.[0]?.quantity__c || 0), // 需求重量
					count_weight: count_weight.toFixed(3), // 出库所有托盘的总重量
					count_weight_over: count_weight_over.toFixed(3), // 已出库数量
					count_current_pallet: element.quantity__c, // 当前托盘数量
					count_current_piece: element.piece__c, // 当前件数
				};
				return ctx.send({ success: true, message: `获取数据成功！`, data: { ...element, ...currPallet, entry_way } });
			} else {
				return ctx.send({ success: false, message: `该托盘已出库！`, data: {} });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	// 成品库——出库-提交 整托/拆托数据
	hk_product_submit_PdaSplit = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("成品库PDA拆托：", data);
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
		// 	codeArr: [
		// 		{
		// 			barcode: '16949144700101260520122548260000',
		// 			weight: 0,
		// 			hasManualWeight: false
		// 		},
		// 		{
		// 			barcode: '16949135400101260520122735300000',
		// 			weight: 0,
		// 			hasManualWeight: false
		// 		},
		// 		{
		// 			barcode: '16949135650101260520122814320000',
		// 			weight: 4,
		// 			hasManualWeight: true
		// 		}
		// 	],
		// 	is_whole: '半托出库',
		// 	is_split: '半托出'
		// }
		// return ctx.send({ success: false, message: `测试++++++++++++++++++++++++++++` });

		// ! 下面需要处理条码表！
		if (data?.is_whole == "整托出库" || data?.is_split == "整托出") {
			const surplus = Number(data?.dest_quantity);

			// 整托出库
			const fDocs = await ctx.mongo.find("hk_product_pda_outgoing__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];

				const area = element.area__c;
				let TStock = "";
				let TSockDetail = "";
				let TStockDetailHis = "";
				let TStockDetailBarcode = "";
				let TStockDetailBarcodeHis = "";
				if (area == "冷藏库") {
					TStock = "hk_chilled_stock__c";
					TSockDetail = "hk_chilled_stock_detail__c";
					TStockDetailHis = "hk_chilled_stock_detail_his__c";
					TStockDetailBarcode = "hk_chilled_stock_detail_barcode__c";
					TStockDetailBarcodeHis = "hk_chilled_stock_detail_barcode_his__c";
				} else if (area == "冷冻库") {
					TStock = "hk_freezing_stock__c";
					TSockDetail = "hk_freezing_stock_detail__c";
					TStockDetailHis = "hk_freezing_stock_detail_his__c";
					TStockDetailBarcode = "hk_freezing_stock_detail_barcode__c";
					TStockDetailBarcodeHis = "hk_freezing_stock_detail_barcode_his__c";
				} else {
					// 查找数据错误
					return ctx.send({ success: false, message: `此托盘在【成品PDA出库表】中获取仓库类型错误!` });
				}

				const p = element.pallet__c;

				const stock = await ctx.mongo.find(TStock, { query: { pallet__c: p } });
				const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
				if (stockDetail.length) {
					await ctx.mongo.updateOne("hk_product_pda_outgoing__c", element._id, {
						status__c: "处理库存成功",
						handle_piece__c: +element.piece__c,
						pick_quantity__c: +element.quantity__c,
						final_pick_quantity__c: +element.quantity__c,
						new_pallet__c: "无",
						new_quantity__c: 0,
					});
					// cur.piece__c, 0);
					// 				const count_piece_over = PdaData.reduce((sum, cur) => sum + cur.handle_piece__c, 0);
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
			const params_weight = data?.weight; // 78.5 库存详情表 扣减重量，
			const codeArr = data?.codeArr; // 库存详情表 扣减件数，扣减的件数和重量要写入到历史任务中，  库存详情条码表 扣减条码， 写入操作的库存详情条码历史表
			// codeArr: [
			// 	{ barcode: '16949133000101260517132754050000' },
			// 	{ barcode: '16949129600101260517132816060000' },
			// 	{ barcode: '16949130900101260517132901070000' },
			// 	{ barcode: '16949130000101260517132919080000' },
			// 	{ barcode: '16949134350101260517132943090000' },
			// 	{ barcode: '16949127150101260517133017100000' }
			// ],

			const fDocs = await ctx.mongo.find("hk_product_pda_outgoing__c", { query: { _id: data?.materialInfo?._id }, sort: { time__c: -1 } });
			if (fDocs.length) {
				const element = fDocs[0];

				const area = element.area__c;
				let TStock = "";
				let TSockDetail = "";
				let TStockDetailHis = "";
				let TStockDetailBarcode = "";
				let TStockDetailBarcodeHis = "";
				if (area == "冷藏库") {
					TStock = "hk_chilled_stock__c";
					TSockDetail = "hk_chilled_stock_detail__c";
					TStockDetailHis = "hk_chilled_stock_detail_his__c";
					TStockDetailBarcode = "hk_chilled_stock_detail_barcode__c";
					TStockDetailBarcodeHis = "hk_chilled_stock_detail_barcode_his__c";
				} else if (area == "冷冻库") {
					TStock = "hk_freezing_stock__c";
					TSockDetail = "hk_freezing_stock_detail__c";
					TStockDetailHis = "hk_freezing_stock_detail_his__c";
					TStockDetailBarcode = "hk_freezing_stock_detail_barcode__c";
					TStockDetailBarcodeHis = "hk_freezing_stock_detail_barcode_his__c";
				} else {
					// 查找数据错误
					return ctx.send({ success: false, message: `此托盘在【成品PDA出库表】中获取仓库类型错误!` });
				}

				const p = element.pallet__c;

				const stock = await ctx.mongo.find(TStock, { query: { pallet__c: p } });
				const stockDetail = await ctx.mongo.find(TSockDetail, { query: { pallet__c: p } });
				if (stockDetail.length) {
					if (data?.entry_way == "手动无码入库") {

						const codeA = data?.codeArr;

						if(codeA.length != 1){
								return ctx.send({ success: false, message: `提交失败：手动无码出库提交一条总件数和总重量` });
						}
						const weight = data?.codeArr[0].weight

							let handleWeight = Number((Math.round((Number(stockDetail[0].weight__c) - Number(weight)) * 1000) / 1000).toFixed(3));
						if (handleWeight < 0) {
							return ctx.send({ success: false, message: `提交失败：出库数量：${weight} 大于库存库存重量：${stockDetail[0].weight__c}` });
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


						let out_stock_piece = data?.codeArr[0].piece
						let piece = stockDetail[0].now_quantity__c - out_stock_piece
						if (handleWeight > 0) {
							// 处理数量
							await db.updateOne(TSockDetail, stockDetail[0]._id, {
								now_quantity__c: piece,
								final_quantity__c: piece,
								weight__c: handleWeight,
								final_weight__c: handleWeight,
								stock_status__c: "已出库（有库存）",
							});

							await ctx.mongo.updateOne("hk_product_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c:out_stock_piece,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${out_stock_piece}`,
							});
						} else if (handleWeight == 0) {
							await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null });
							await db.deleteOne(TSockDetail, stockDetail[0]._id);

							await ctx.mongo.updateOne("hk_product_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c: out_stock_piece,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${out_stock_piece}`,
							});
						}

						console.log("删除写入历史表" + area);
						return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功!` });
					} else {
						// 这里先做数据校验，校验提交的重量与库存重量做对比，提交的件数与库存做对比，提交的拆箱重量与条码表中的重量做对比，
						const StockD = stockDetail[0];
						if (data?.weight > StockD.weight__c) {
							return ctx.send({ success: false, message: `提交失败：拣出重量：${data?.weight} 大于库存数量：${StockD.weight__c}` });
						}
						if (data?.codeArr?.length > StockD.now_quantity__c) {
							return ctx.send({ success: false, message: `提交失败：拣出件数：${data?.codeArr?.length} 大于库存件数：${StockD.now_quantity__c}` });
						}

						const stockDetail_Barcode = await ctx.mongo.find(TStockDetailBarcode, { query: { pallet__c: p } });
						const codeArr_Whole = codeArr.filter((v: { hasManualWeight: Boolean }) => !v.hasManualWeight);
						const codeArr_Split = codeArr.filter((v: { hasManualWeight: Boolean }) => v.hasManualWeight);
						// console.log("codeArr_Whole", codeArr_Whole.length);
						// console.log("codeArr_Split", codeArr_Split.length);
						for (const element of codeArr_Split) {
							const d1 = stockDetail_Barcode.filter(v => v.barcode__c == element.barcode);
							if (d1.length) {
								if (d1[0].weight__c < element.weight) {
									return ctx.send({ success: false, message: `提交失败：拆箱重量：${element.weight} 大于库存条码重量：${d1[0].weight__c}` });
								}
							} else {
								return ctx.send({ success: false, message: `提交失败：在库存中未找到条码：${element.barcode}` });
							}
						}
						for (const element of codeArr_Whole) {
							const d1 = stockDetail_Barcode.filter(v => v.barcode__c == element.barcode);
							if (d1.length == 0) {
								return ctx.send({ success: false, message: `提交失败：在库存中未找到条码：${element.barcode}` });
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
						if (codeArr_Whole.length) {
							for (const ec of codeArr_Whole) {
								const barcode = ec.barcode;
								const ds = stockDetail_Barcode.filter(v => v.barcode__c == barcode);
								if (ds.length) {
									const dsDetail = ds[0];
									await db.insertOne(TStockDetailBarcodeHis, { ...dsDetail, _id: null });
									await db.deleteOne(TStockDetailBarcode, dsDetail._id);
								} else {
									console.log("未取到");
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
										desc__c: `原重量：${dsDetail.weight__c} 扣减重量：${ec.weight} 剩余数量：${splu}`,
									});
								} else {
									console.log("未取到");
								}
							}
						}

						let piece = stockDetail[0].now_quantity__c - codeArr_Whole.length;
						if (handleWeight > 0) {
							// 处理数量
							await db.updateOne(TSockDetail, stockDetail[0]._id, {
								now_quantity__c: piece,
								final_quantity__c: piece,
								weight__c: handleWeight,
								final_weight__c: handleWeight,
								stock_status__c: "已出库（有库存）",
							});

							await ctx.mongo.updateOne("hk_product_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c: codeArr_Whole.length,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr_Whole.length}`,
							});
						} else if (handleWeight == 0) {
							await db.insertOne(TStockDetailHis, { ...stockDetail[0], _id: null });
							await db.deleteOne(TSockDetail, stockDetail[0]._id);

							await ctx.mongo.updateOne("hk_product_pda_outgoing__c", element._id, {
								status__c: "处理库存成功",
								final_pick_quantity__c: params_weight,
								handle_piece__c: codeArr_Whole.length,
								desc__c: `原托盘数量：${stockDetail[0].weight__c}, 实际拿出数量：${params_weight}, 剩余数量：${handleWeight}, 原托盘件数：${stockDetail[0].now_quantity__c}, 拿出件数：${codeArr_Whole.length}`,
							});
						}

						console.log("删除写入历史表" + area);
						return ctx.send({ success: true, message: `此托盘数据处理完成，库存更新成功!` });
					}
				} else {
					return ctx.send({ success: false, message: `此托盘在【货架表】或【货架详情表】中库存错误，未找到相关托盘数据!` });
				}
			} else {
				return ctx.send({ success: false, message: `提交失败：查询数据错误！` });
			}
		}
	};

	// 辅料库——入库：获取单据，选择单据信息
	hk_auxiliary_obtaion_document = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const fDocs = await db.find("hk_auxiliary_doc_detail__c", { query: { cmdtype__c: "入库任务", status__c: { $in: ["未执行", "正在执行"] } } });
		if (fDocs.length) {
			return ctx.send({ success: true, message: `获取数据成功！`, data: fDocs || [] });
		} else {
			return ctx.send({ success: true, message: `获取数据列表为空！`, data: [] });
		}
	};

	// 辅料库——入库：提交入库信息，绑定托盘并上架
	hk_auxiliary_enter_submit_pallet_bind_stock = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("辅料库入库提交", data);

		let params = {
			username__c: "04",
			phone__c: "13312341234",
			areaOrigin: "辅料库",
			materialInfo: {
				id: "6a011ee097a1364bcca4a538",
				id__c: "",
				material_code__c: "10029",
				material_name__c: "夫妻肺片（牛肚）",
				batch__c: "",
				produce_date__c: "",
				cabinet__c: "",
				contract__c: "",
			},
			pallet: "6901236343722",
			piece: 23,
			specification: 50,
			total_Amount: 1000.203,
			shelf_barcode: "010301",
		};

		// 1、校验是否存在扫描的货架条码
		const shelf_barcode = data?.shelf_barcode;
		const Shelf = await db.find("hk_auxiliary_stock__c", { query: { position__c: shelf_barcode } });
		if (Shelf.length == 0) {
			return ctx.send({ success: false, message: `根据扫描的货架条码，在货架表未找到货架号`, data: [] });
		}
		const ShelfInfo = Shelf[0];

		// 校验扫描的托盘是否与货架表的托盘号保持一致
		const pallet__c = ShelfInfo.pallet__c;
		const shelf_status = ShelfInfo.shelf_status__c;
		if (pallet__c) {
			if (pallet__c != data?.pallet) {
				return ctx.send({ success: false, message: `仓位: ${shelf_barcode} 绑定的托盘号是：${pallet__c} ，需要扫描绑定的托盘上架`, data: [] });
			}
		}
		// 获取单据iD、输入的参数、提交到货架表和库存表中。 更新入库数量， 回传SAP
		const Sap_Document = await db.find("hk_auxiliary_doc_detail__c", { query: { _id: data?.materialInfo?.id } });
		if (Sap_Document.length == 0) {
			return ctx.send({ success: false, message: `根据提交的信息，未找到单据信息`, data: [] });
		}
		const Sap_document = Sap_Document[0];

		const mater_count = await db.find("hk_auxiliary_stock_detail__c", { query: { position__c: shelf_barcode, pallet__c: data?.pallet } });
		await db.updateOne("hk_auxiliary_stock__c", ShelfInfo._id, {
			shelf_status__c: "占用",
			pallet__c: data?.pallet,
			material_quantity__c: mater_count.length + 1,
		});

		await db.insertOne("hk_auxiliary_stock_detail__c", {
			time__c: time(),
			loc_name__c: ShelfInfo.loc_name__c,
			position__c: ShelfInfo.position__c,
			ducument_id__c: Sap_document.ducument_id__c,
			ducument_type__c: Sap_document.ducument_type__c,
			material_code__c: Sap_document.material_code__c,

			material_name__c: Sap_document.material_name__c,
			batch__c: Sap_document.batch__c,
			production_date__c: Sap_document.production_date__c,

			pallet__c: data?.pallet,
			piece__c: data?.piece,
			spec__c: data?.specification,
			total_amount__c: data?.total_Amount,
		});

		return ctx.send({ success: true, message: `托盘 ${data?.pallet}， 仓位${shelf_barcode}，已经上架成功，已更新库存!`, data: [] });
	};

	// 辅料库——出库：通过货架条码获取托盘数据
	hk_auxiliary_out_obtaion_shelfCode = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const shelf_barcode = data?.shelfCode;
		const fDocs = await db.find("hk_auxiliary_stock_detail__c", { query: { position__c: shelf_barcode } });
		if (fDocs.length == 0) {
			return ctx.send({ success: false, message: `根据货架条码: ${shelf_barcode}，未在库存中找到入库数据！`, data: [] });
		}

		return ctx.send({ success: true, message: `根据货架条码: ${shelf_barcode}，获取数据成功！`, data: fDocs });
	};

	// 辅料库——出库：物料详情提交出库数量，扣减库存
	hk_auxiliary_out_submit_quantity = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const fDocs = await db.find("hk_auxiliary_stock_detail__c", { query: { _id: data?._id } });
		if (fDocs.length) {
			const total_amount__c = fDocs[0].total_amount__c;
			const finiay = total_amount__c - data?.out_quantity__c;
			if (finiay == 0) {
				// 写入到历史任务中
			} else {
				// 当前操作扣减的数量也要写入到历史中，描述字段添加当前数量和扣减数量和剩余数量
				await db.updateOne("hk_auxiliary_stock_detail__c", fDocs[0]._id, {
					total_amount__c: finiay,
				});
			}

			return ctx.send({ success: true, message: `库存处理成功！`, data: [] });
		} else {
			return ctx.send({ success: false, message: `根据提交的单据未找到库存！`, data: [] });
		}
	};

	// 包材库——入库：获取单据，选择单据信息
	hk_pack_obtaion_document = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const fDocs = await db.find("hk_pack_doc_detail__c", { query: { cmdtype__c: "入库任务", status__c: { $in: ["未执行", "正在执行"] } } });
		if (fDocs.length) {
			return ctx.send({ success: true, message: `获取数据成功！`, data: fDocs || [] });
		} else {
			return ctx.send({ success: true, message: `获取数据列表为空！`, data: [] });
		}
	};

	// 包材库——入库：提交入库信息，绑定托盘并上架
	hk_pack_enter_submit_pallet_bind_stock = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("包材库入库提交", data);

		let params = {
			username__c: "04",
			phone__c: "13312341234",
			areaOrigin: "辅料库",
			materialInfo: {
				id: "6a011ee097a1364bcca4a538",
				id__c: "",
				material_code__c: "10029",
				material_name__c: "夫妻肺片（牛肚）",
				batch__c: "",
				produce_date__c: "",
				cabinet__c: "",
				contract__c: "",
			},
			pallet: "6901236343722",
			piece: 23,
			specification: 50,
			total_Amount: 1000.203,
			// shelf_barcode: "010301",
		};

		// 1、校验是否存在扫描的货架条码
		// const shelf_barcode = data?.shelf_barcode;
		// const Shelf = await db.find("hk_auxiliary_stock__c", { query: { position__c: shelf_barcode } });
		// if (Shelf.length == 0) {
		// 	return ctx.send({ success: false, message: `根据扫描的货架条码，在货架表未找到货架号`, data: [] });
		// }
		// const ShelfInfo = Shelf[0];

		// 校验扫描的托盘是否与货架表的托盘号保持一致
		// const pallet__c = ShelfInfo.pallet__c;
		// const shelf_status = ShelfInfo.shelf_status__c;
		// if (pallet__c) {
		// 	if (pallet__c != data?.pallet) {
		// 		return ctx.send({ success: false, message: `仓位: ${shelf_barcode} 绑定的托盘号是：${pallet__c} ，需要扫描绑定的托盘上架`, data: [] });
		// 	}
		// }
		// 获取单据iD、输入的参数、提交到货架表和库存表中。 更新入库数量， 回传SAP
		const Sap_Document = await db.find("hk_pack_doc_detail__c", { query: { _id: data?.materialInfo?.id } });
		if (Sap_Document.length == 0) {
			return ctx.send({ success: false, message: `根据提交的信息，未找到单据信息`, data: [] });
		}
		const Sap_document = Sap_Document[0];

		// const mater_count = await db.find("hk_auxiliary_stock_detail__c", { query: {  pallet__c: data?.pallet } });
		// await db.updateOne("hk_auxiliary_stock__c", ShelfInfo._id, {
		// 	shelf_status__c: "占用",
		// 	pallet__c: data?.pallet,
		// 	material_quantity__c: mater_count.length + 1,
		// });

		await db.insertOne("hk_pack_stock_detail__c", {
			time__c: time(),
			// loc_name__c: ShelfInfo.loc_name__c,
			// position__c: ShelfInfo.position__c,
			ducument_id__c: Sap_document.ducument_id__c,
			ducument_type__c: Sap_document.ducument_type__c,
			material_code__c: Sap_document.material_code__c,

			material_name__c: Sap_document.material_name__c,
			batch__c: Sap_document.batch__c,
			production_date__c: Sap_document.production_date__c,

			pallet__c: data?.pallet,
			piece__c: data?.piece,
			spec__c: data?.specification,
			total_amount__c: data?.total_Amount,
		});

		return ctx.send({ success: true, message: `托盘 ${data?.pallet}，已经上架成功，已更新库存!`, data: [] });
	};

	// 包材库——出库：通过货架条码获取托盘数据
	hk_pack_out_obtaion_shelfCode = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const shelf_barcode = data?.shelfCode;
		console.log("shelf_barcode", shelf_barcode);

		const fDocs = await db.find("hk_pack_stock_detail__c", { query: { pallet__c: shelf_barcode } });
		if (fDocs.length == 0) {
			return ctx.send({ success: false, message: `根据托盘码: ${shelf_barcode}，未在库存中找到入库数据！`, data: [] });
		}

		return ctx.send({ success: true, message: `根据托盘码: ${shelf_barcode}，获取数据成功！`, data: fDocs });
	};

	// 包材库——出库：物料详情提交出库数量，扣减库存
	hk_pack_out_submit_quantity = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const fDocs = await db.find("hk_pack_stock_detail__c", { query: { _id: data?._id } });
		if (fDocs.length) {
			const total_amount__c = fDocs[0].total_amount__c;
			const finiay = total_amount__c - data?.out_quantity__c;
			if (finiay == 0) {
				// 写入到历史任务中
			} else {
				// 当前操作扣减的数量也要写入到历史中，描述字段添加当前数量和扣减数量和剩余数量
				await db.updateOne("hk_pack_stock_detail__c", fDocs[0]._id, {
					total_amount__c: finiay,
				});
			}

			return ctx.send({ success: true, message: `库存处理成功！`, data: [] });
		} else {
			return ctx.send({ success: false, message: `根据提交的单据未找到库存！`, data: [] });
		}
	};

	hk_auxiliary_obtaion_document4 = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
	};

	hk_auxiliary_obtaion_document5 = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
	};
}

export default new App();
