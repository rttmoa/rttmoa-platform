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

	hk_pack_byPallet_isGoods = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		const pallet = data?.pallet;
		let msg = "";
		if (pallet) {
			const is_stockDetail = await db.find("hk_pack_stock_detail__c", { query: { pallet__c: String(pallet).trim() } });
			if (is_stockDetail.length) {
				msg = `提交错误：此托盘：${data?.pallet} 在【包材库库存详情表】存在库存!`;
				return ctx.send({ success: false, message: msg });
			} else {
				return ctx.send({ success: true, message: `此托盘: ${pallet}未收货！` });
			}
		} else {
			return ctx.send({ success: false, message: `接口返回错误：未传递托盘号！`, data: {} });
		}
	};

	// 包材库——入库：提交入库信息，绑定托盘并上架
	hk_pack_enter_submit_pallet_bind_stock = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("包材库入库提交", data);

		let params = {
			areaOrigin: "包材库",
			id: "6a37401578ec3cdfd4bb6b66",
			materialInfo: {
				id: "6a37401578ec3cdfd4bb6b66",
				id__c: "",
				material_code__c: "50055",
				material_name__c: "通用外箱570*400*220mm（外径）",
				batch__c: "2606210001",
				produce_date__c: "2026-06-02",
				cabinet__c: "",
				contract__c: "",
			},
			pallet: "88448",
			piece: 12,
			specification: 24,
			total_Amount: 36,
		};
		let docDetail = "hk_pack_doc_detail__c";
		// let docDetail = "hk_mater_doc_detail__c"
		const gwmsD = await db.find(docDetail, { query: { _id: data?.materialInfo?.id } });
		if (gwmsD.length == 0) {
			return ctx.send({ success: false, message: `根据提交的信息，未找到单据信息`, data: [] });
		}
		const items = gwmsD[0];
		const Order = gwmsD[0];

		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
		const day = String(now.getDate()).padStart(2, "0");
		const formatted = `${year}-${month}-${day}`;

		await db.insertOne("hk_pack_pda_entry__c", {
			time__c: time(),
			barcode_arr__c: data?.barCodeArr,
			status__c: "收货",
			// barcode_quantity__c: n++, // 位置号
			// barcode__c: barcode,
			// weight__c: weight,
			production_date__c: items.production_date__c,
			// input_way__c: way,
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

			pallet__c: data?.pallet,
			piece__c: data?.piece,
			spec__c: data?.specification,
			weight__c: data?.total_Amount,
		});

		await db.insertOne("hk_pack_stock_detail__c", {
			time__c: time(),
			// loc_name__c: stock.loc_name__c,
			// position__c: stock.position__c,
			// row__c: stock.row__c,
			// col__c: stock.col__c,
			// lay__c: stock.lay__c,
			pallet__c: data?.pallet,
			// group_id__c: stock.group_id__c,
			// priority__c: stock.priority__c,
			production_date__c: items.production_date__c, // 生产日期为货架表的生产日期
			entry_stock_date__c: formatted, // 入库日期

			stock_status__c: "在库",
			// way__c: way,

			document_id__c: Order?.document_id__c,
			document_type__c: Order?.document_type__c,
			line_item__c: Order?.line_item__c,

			material_name__c: Order?.material_name__c,
			material_code__c: Order?.material_code__c,

			batch__c: "", // 批次为空
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

			// instruction__c: Instruction_BarCode,
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

	// 包材库——出库：获取出库列表
	hk_pack_get_out_list = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;

		const fDocs = await db.find("hk_pack_pda_out__c", { query: { status__c: "正在出库" } });
		if (fDocs.length == 0) {
			return ctx.send({ success: false, message: `未获取到出库列表！`, data: [] });
		}
		return ctx.send({ success: true, message: `获取出库列表成功！`, data: fDocs });
	};

	// 包材库——出库：物料详情提交出库数量，扣减库存
	hk_pack_out_submit_quantity = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		let a = {
			areaOrigin: "包材库",
			shelfCode: "",
			loc_name__c: "",
			position__c: "",
			material_code__c: "50055",
			material_name__c: "通用外箱570*400*220mm（外径）",
			production_date__c: "2026-06-02",
			out_piece__c: 10,
			out_quantity__c: 33.545,
			_id: "6a3e2fb50fd00b402fe9fa91",
		};

		// return ctx.send({ success: false, message: `库存处理成功！`, data: [] });

		const fDocs = await db.find("hk_pack_pda_out__c", { query: { _id: data?._id } });
		if (fDocs.length) {
			console.log("fDocs", fDocs);
			const element_pda_out = fDocs[0];

			const take_piece = data?.out_piece__c;
			const take_quantity = data?.out_quantity__c;

			const StockDetail = await db.find("hk_pack_stock_detail__c", { query: { pallet__c: element_pda_out.pallet__c, stock_status__c: "正在出库" } });
			if (StockDetail.length) {
				const element_stock_detail = StockDetail[0];

				await db.updateOne("hk_pack_pda_out__c", fDocs[0]._id, {
					handle_piece__c: take_piece,
					final_pick_quantity__c: take_quantity,
					status__c: "处理库存成功",
				});

				const Pick = Number(Math.round((element_stock_detail.weight__c - take_quantity) * 1000) / 1000);
				if (Pick == 0) {
					await db.insertOne("hk_pack_stock_detail_his__c", { ...element_stock_detail, _id: null });
					await db.deleteOne("hk_pack_stock_detail__c", StockDetail[0]._id);
				} else {
					await db.updateOne("hk_pack_stock_detail__c", StockDetail[0]._id, {
						now_quantity__c: element_stock_detail.now_quantity__c - take_piece,
						final_quantity__c: element_stock_detail.now_quantity__c - take_piece,
						weight__c: Pick,
						final_weight__c: Pick,
						stock_status__c: "在库",
					});
				}
				return ctx.send({ success: true, message: `库存处理成功！`, data: [] });
			} else {
				return ctx.send({ success: false, message: `根据提交的单据寻找库存错误！`, data: [] });
			}
		} else {
			return ctx.send({ success: false, message: `根据提交的单据未找到出库列表数据！`, data: [] });
		}
	};
}
export default new App();
