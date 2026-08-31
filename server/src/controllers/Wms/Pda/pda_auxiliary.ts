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

	// 辅料库——入库：获取单据，选择单据信息
	hk_auxiliary_obtaion_document = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		// const fDocs = await db.find("hk_auxiliary_doc_detail__c", { query: { cmdtype__c: "入库任务", status__c: { $in: ["未执行", "正在执行"] } } });
		const fDocs = await db.find("hk_auxiliary_doc_detail__c", { query: {} });
		if (fDocs.length) {
			console.log("fDocs", fDocs);
			const d = fDocs.filter(v => {
				let f1 = v.cmdtype__c == "入库任务" && ["未执行", "正在执行"].includes(v.status__c);
				let f2 = v.cmdtype__c == "出库任务" && ["正在执行"].includes(v.status__c) && v.area__c == "线边库" && v.recept_area__c == "辅料库";
				return f1 || f2;
			});

			return ctx.send({ success: true, message: `获取数据成功！`, data: d || [] });
		} else {
			return ctx.send({ success: true, message: `获取数据列表为空！`, data: [] });
		}
	};

	hk_auxiliary_byPallet_isGoods = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const pallet = String(data?.pallet).trim();
		let msg = "";
		if (pallet) {
			const fDocs = await db.find("hk_auxiliary_pda_entry__c", { query: { pallet__c: pallet, status__c: { $in: ["入库完成", "已收货"] } }, sort: { time__c: -1 } });
			if (fDocs.length) {
				return ctx.send({ success: false, message: `此托盘: ${pallet}已收货！` });
			} else {
				const is_stock = await db.find("hk_auxiliary_stock__c", { query: { pallet__c: pallet } });
				if (is_stock.length) {
					msg = `提交错误：此托盘在【辅料库货架表】存在库存！`;
					return ctx.send({ success: false, message: msg });
				}
				const is_stockDetail = await db.find("hk_auxiliary_stock_detail__c", { query: { pallet__c: pallet } });
				if (is_stockDetail.length) {
					msg = `提交错误：此托盘在【辅料库库存详情表】存在库存!`;
					return ctx.send({ success: false, message: msg });
				}
				return ctx.send({ success: true, message: `此托盘: ${pallet}未收货！` });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};
	// 辅料库——入库：提交入库信息，绑定托盘并上架
	hk_auxiliary_enter_submit_pallet_bind_stock = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("辅料库入库提交", data);

		let params = {
			areaOrigin: "辅料库",
			id: "6a5f65ceabfd442d15762f5b",
			materialInfo: {
				id: "6a5f65ceabfd442d15762f5b",
				id__c: "",
				material_code__c: "50247",
				material_name__c: "牛肉(牛霖)",
				batch__c: "",
				produce_date__c: "",
				cabinet__c: "",
				contract__c: "",
			},
			pallet: "00555",
			piece: 20,
			specification: 30,
			total_Amount: 5000.555,
			shelf_barcode: "FL-Y-03-02-L",
		};

		// return ctx.send({ success: false, message: `根据提交的+++++++++++++++++信息，未找到单据信息`, data: [] });

		// 1、校验是否存在扫描的货架条码
		const shelf_barcode = data?.shelf_barcode;
		const Shelf = await db.find("hk_auxiliary_stock__c", { query: { position__c: shelf_barcode } });
		if (Shelf.length == 0) {
			return ctx.send({ success: false, message: `根据扫描的货架条码，在货架表未找到货架号`, data: [] });
		}
		const ShelfInfo = Shelf[0];

		// 校验扫描的托盘是否与货架表的托盘号保持一致
		// const pallet__c = ShelfInfo.pallet__c;
		// const shelf_status = ShelfInfo.shelf_status__c;
		// if (pallet__c) {
		// 	if (pallet__c != data?.pallet) {
		// 		return ctx.send({ success: false, message: `仓位: ${shelf_barcode} 已有库存，绑定的托盘号是：${pallet__c} ，需要扫描绑定的托盘上架`, data: [] });
		// 	}
		// }
		// if (shelf_status != "空闲") {
		// 	return ctx.send({ success: false, message: `仓位: ${shelf_barcode} 货架状态不是空闲, 货架状态是：${shelf_status}`, data: [] });
		// }

		// 获取单据iD、输入的参数、提交到货架表和库存表中。 更新入库数量， 回传SAP
		const Sap_Document = await db.find("hk_auxiliary_doc_detail__c", { query: { _id: data?.materialInfo?.id } });
		if (Sap_Document.length == 0) {
			return ctx.send({ success: false, message: `根据提交的信息，未找到单据信息`, data: [] });
		}
		const Sap_document = Sap_Document[0];

		const mater_count = await db.find("hk_auxiliary_stock_detail__c", { query: { position__c: shelf_barcode, pallet__c: data?.pallet } });

		// PDA 入库表

		const items = Sap_Document[0];
		const Order = Sap_Document[0];
		const today = new Date();
		const today_date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

		let batch = "";
		// const items = Sap_Document[0];
		if (items.batch__c) {
			batch = items.batch__c;
		}
			// batch__c: batch,

		await db.updateOne("hk_auxiliary_stock__c", ShelfInfo._id, {
			shelf_status__c: "占用",
			pallet__c: data?.pallet,
			material_quantity__c: mater_count.length + 1,
			contract__c: Order.contract__c,
			material_code__c: Order.material_code__c,
			entry_stock_date__c: today_date, // element.entry_stock_date__c, 入库日期为今天的日期
			supplier__c: Order.supplier__c,
			production_date__c: Order.production_date__c,
			material_name__c: Order.material_name__c,
			batch__c: batch,
			cabinet__c: Order.cabinet__c,
		});

		await db.insertOne("hk_auxiliary_pda_entry__c", {
			time__c: time(),
			barcode_arr__c: data?.barCodeArr,
			status__c: "入库完成",
			// barcode_quantity__c: n++, // 位置号
			// barcode__c: barcode,
			// weight__c: weight,
			production_date__c: items.production_date__c,
			// input_way__c: way,
			is_tax__c: items?.is_tax__c, // 是否保税
			material_code__c: items?.material_code__c || "", // 物料代码
			contract__c: items?.contract__c || "", // 合同号
			supplier__c: items?.supplier__c || "", // 供应商
			entry_stock_date__c: today_date, // 入库日期
			document_id__c: items?.document_id__c || "",
			doc_instruction__c: items?.doc_instruction__c || "",

			material_name__c: items?.material_name__c || "",

			arrival_date__c: items?.arrival_date__c || "",
			cabinet__c: items?.cabinet__c || "",
			instruction__c: items.instruction__c || "",
			batch__c: batch,
			pallet__c: data?.pallet,
			piece__c: data?.piece,
			spec__c: data?.specification,
			weight__c: data?.total_Amount,
		});

		await db.insertOne("hk_auxiliary_stock_detail__c", {
			time__c: time(),
			loc_name__c: ShelfInfo.loc_name__c,
			position__c: ShelfInfo.position__c,
			// row__c: stock.row__c,
			// col__c: stock.col__c,
			// lay__c: stock.lay__c,
			pallet__c: data?.pallet,
			// group_id__c: stock.group_id__c,
			// priority__c: stock.priority__c,
			production_date__c: items.production_date__c, // 生产日期为货架表的生产日期
			entry_stock_date__c: today_date, // 入库日期

			stock_status__c: "在库",
			// way__c: way,

			document_id__c: Order?.document_id__c,
			document_type__c: Order?.document_type__c,
			line_item__c: Order?.line_item__c,

			material_name__c: Order?.material_name__c,
			material_code__c: Order?.material_code__c,

			batch__c: batch,
			contract__c: Order?.contract__c,
			cabinet__c: Order?.cabinet__c,
			is_tax__c: Order?.is_tax__c,
			cars_info__c: Order?.cars_info__c,
			supplier__c: Order?.supplier__c,

			suggest_order__c: Order?.suggest_order__c,
			sealing_order__c: Order?.sealing_order__c,

			arrival_date__c: Order?.arrival_date__c,

			country__c: Order?.country__c,
			factory_no__c: Order?.factory_no__c,

			now_quantity__c: data?.piece, // 当前箱数
			final_quantity__c: data?.piece,

			weight__c: data?.total_Amount, // 当托重量
			final_weight__c: data?.total_Amount,
		});

		return ctx.send({ success: true, message: `托盘 ${data?.pallet}， 仓位${shelf_barcode}，已经上架成功，已更新库存!`, data: [] });
	};

	// 辅料库——出库：通过货架条码获取托盘数据
	hk_auxiliary_out_obtaion_shelfCode = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		// const shelf_barcode = data?.shelfCode;

		const pda_out = await db.find("hk_auxiliary_pda_out__c", { query: {} });

		let task: any = [];
		if (pda_out.length) {
			const newArr = [...new Set(pda_out.map(v => v.document_id__c))];
			for (const element of newArr) {
				const data = pda_out.filter(v => v.document_id__c == element);
				const data_handle = data.filter(v => v.status__c == "处理库存成功");

				const doc_detail = await db.find("hk_auxiliary_doc_detail__c", { query: { document_id__c: element } });
				const count_piece = data.reduce((prev, cur) => prev + cur.piece__c, 0); // 总件数
				const count_h_piece = data_handle.reduce((prev, cur) => prev + cur.handle_piece__c, 0); // 已出件数
				const count_doc_weight = doc_detail?.[0]?.quantity__c || 0; // 单据重量
				const count_weight = data.reduce((prev, cur) => prev + cur.quantity__c, 0); // 总重量
				const count_h_weight = data_handle.reduce((prev, cur) => prev + cur.final_pick_quantity__c, 0); // 已出重量
				task.push({
					document_id__c: element,
					count_piece,
					count_h_piece,
					count_doc_weight,
					count_weight: count_weight.toFixed(3),
					count_h_weight: count_h_weight.toFixed(3),
				});
			}
		}

		const fDocs = await db.find("hk_auxiliary_pda_out__c", { query: { status__c: "正在出库" } });
		if (fDocs.length == 0) {
			return ctx.send({ success: true, message: `根据【辅料库PDA出库表】，未在表中找到出库数据！`, data: [], task: task });
		}

		return ctx.send({ success: true, message: `根据【辅料库PDA出库表】，获取数据成功！`, data: fDocs, task: task });
	};

	hk_auxiliary_query_stock = async (ctx: Context) => {
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
		// 辅料库出库提交： {
		// 	areaOrigin: '辅料库',
		// 	shelfCode: 'FL-Y-05-01-L',
		// 	loc_name__c: '通道右侧-05货道-01层-里',
		// 	position__c: 'FL-Y-05-01-L',
		// 	material_code__c: '50247',
		// 	material_name__c: '牛肉(牛霖)',
		// 	production_date__c: '',
		// 	total_amount__c: 0,
		// 	out_piece__c: 50,
		// 	out_quantity__c: 28.321,
		// 	id_pda_stock: '6a616743af4fd3d39e388ddb',
		// 	id_stock_detail: '6a606a2def5df91d24cf8b04'
		// }
		console.log("辅料库出库提交：", data);

		// const a = await db.find("hk_auxiliary_pda_out__c", { query: { _id: data?.id_pda_stock } });

		// await db.updateOne("hk_auxiliary_pda_out__c", a[0]._id, {
		// 	handle_piece__c: 1,
		// 	pick_quantity__c: 1,
		// 	surplus_quantity__c: 1,
		// 	final_pick_quantity__c: 1,
		// 	status__c: "处理库存成功",
		// });

		// return ctx.send({ success: true, message: `库存处理成功！`, data: [] });

		// return ctx.send({ success: false, message: `根据提交的单据未找到库存！`, data: [] });
		const stock_D = await db.find("hk_auxiliary_stock_detail__c", { query: { _id: data?.id_stock_detail } });
		const pda_out_D = await db.find("hk_auxiliary_pda_out__c", { query: { _id: data?.id_pda_stock } });

		if (stock_D.length && pda_out_D.length) {
			// const total_amount__c = fDocs[0].total_amount__c;
			// const finiay = total_amount__c - data?.out_quantity__c;
			// if (finiay == 0) {
			// 	// 写入到历史任务中
			// } else {
			// 	// 当前操作扣减的数量也要写入到历史中，描述字段添加当前数量和扣减数量和剩余数量
			// 	await db.updateOne("hk_auxiliary_stock_detail__c", fDocs[0]._id, {
			// 		total_amount__c: finiay,
			// 	});
			// }
			const out_piece__c = data?.out_piece__c;
			const out_quantity__c = data?.out_quantity__c;
			console.log(";pda_out_D,", pda_out_D);
			const quantity__c = pda_out_D[0].quantity__c; // 库存数量
			const Pick = Number((Math.round((Number(quantity__c) - Number(out_quantity__c)) * 1000) / 1000).toFixed(3));
			console.log("splu", Pick);

			// 清空货架信息，
			// 处理库存数量
			// 处理货架数据

			await db.updateOne("hk_auxiliary_pda_out__c", pda_out_D[0]._id, {
				handle_piece__c: out_piece__c,
				pick_quantity__c: out_quantity__c,
				surplus_quantity__c: Pick,
				final_pick_quantity__c: out_quantity__c,
				status__c: "处理库存成功",
			});

			const element_stock_detail = stock_D[0];
			// const position__c = element_stock_detail.position__c;
			if (Pick == 0) {
				await db.insertOne("hk_auxiliary_stock_detail_his__c", { ...element_stock_detail, _id: null });
				await db.deleteOne("hk_auxiliary_stock_detail__c", stock_D[0]._id);
			} else {
				await db.updateOne("hk_auxiliary_stock_detail__c", stock_D[0]._id, {
					now_quantity__c: element_stock_detail.now_quantity__c - out_piece__c,
					final_quantity__c: element_stock_detail.now_quantity__c - out_piece__c,
					weight__c: Pick,
					final_weight__c: Pick,
					stock_status__c: "在库",
				});
			}
			// 查询库存，是否要清除货架表
			const stock_D_s = await db.find("hk_auxiliary_stock_detail__c", { query: { position__c: stock_D[0].position__c } });
			if (stock_D_s.length == 0) {
				const stoc = await db.find("hk_auxiliary_stock__c", { query: { position__c: stock_D[0].position__c } });
				if (stoc.length) {
					await db.updateOne("hk_auxiliary_stock__c", stoc[0]._id, {
						shelf_status__c: "空闲",
						pallet__c: "",
						pallet_status__c: "",
						pallet_use__c: "",
						material_code__c: "",
						material_name__c: "",
						batch__c: "",
						production_date__c: "",
						entry_stock_date__c: "",
						contract__c: "",
						supplier__c: "",
						material_quantity__c: null,
						desc__c: "",
					});
				}
			}
			return ctx.send({ success: true, message: `库存处理成功！`, data: [] });
		} else {
			return ctx.send({ success: false, message: `提交错误：根据提交的数据，查询库存和PDA出库表任务错误！`, data: [] });
		}
	};
}
export default new App();
