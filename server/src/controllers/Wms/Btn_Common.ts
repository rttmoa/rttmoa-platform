import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time, time_horizontal } from "@/src/utils";

class App extends Basic {
	constructor() {
		super();
	}

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

	mater_lei_entry = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("雷马外租入库：", data);
		// 雷马外租入库： {
		// 	_id: '6a5064d853b81e5fc77ab934',
		// 	document_id__c: '4501073909',
		// 	material_code__c: '50247',
		// 	material_name__c: '牛肉(牛霖)',
		// 	quantity__c: 26010,
		// 	piece: 99,
		// 	enter_quantity: 26010
		// }
		const piece = data?.piece;
		const weight = data?.enter_quantity;

		const docs = await db.find("hk_mater_doc_detail__c", { query: { _id: data?._id } });
		if (docs.length) {
			const items = docs[0];

			const status = items?.status__c;
			if (status != "正在执行") {
				return ctx.send({ success: false, message: `该单据号执行状态必须是 正在执行，根据描述提示将执行状态修改为 重新执行` });
			}

			let Name = "原料雷马";
			let table_Pda_Entry = "hk_mater_lei_pda_entry__c";
			let table_Stock_d = "hk_mater_lei_stock_d__c";
			const doc_i = await db.find(table_Pda_Entry, { query: { doc_instruction__c: items.doc_instruction__c } });
			if (doc_i.length) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}  下物料：${items?.material_code__c} 已经入过库了, 可以删除【${Name}入库表】和【${Name}库存详情表】 重新入库！` });
			}

			await db.updateOne("hk_mater_doc_detail__c", items._id, { handle_quantity__c: weight });

			const digits = Math.floor(1000000 + Math.random() * 9000000); // 7位数字（1000000~9999999）
			const pallet = `A${digits}`;

			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
			const day = String(now.getDate()).padStart(2, "0");
			const formatted = `${year}-${month}-${day}`;


			let batch = "";
		// const items = docs[0];
		if (items.batch__c) {
			batch = items.batch__c;
		}
			// batch__c: batch,


			// 写入PDA入库表、写入库存表、更新单据详情出入库数量
			await db.insertOne(table_Pda_Entry, {
				time__c: time(),
				pallet__c: pallet,
				barcode_arr__c: data?.barCodeArr,
				status__c: "入库完成",
				// barcode_quantity__c: n++, // 位置号
				// barcode__c: barcode,
				weight__c: weight,
				production_date__c: items?.production_date__c || "",
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
				batch__c: batch,
			});

			await db.insertOne(table_Stock_d, {
				time__c: time(),
				// loc_name__c: stock.loc_name__c,
				// position__c: stock.position__c,
				// row__c: stock.row__c,
				// col__c: stock.col__c,
				// lay__c: stock.lay__c,
				pallet__c: pallet,
				// group_id__c: stock.group_id__c,
				// priority__c: stock.priority__c,
				production_date__c: items?.production_date__c || "",
				entry_stock_date__c: formatted, // 入库日期
				stock_status__c: "在库",
				// way__c: way,
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
				weight__c: weight, // 当托重量
				final_weight__c: weight,
				instruction__c: "",
			});

			return ctx.send({ success: true, message: "入库完成！" });
		} else {
			return ctx.send({ success: false, message: "根据传递的信息，查询单据失败！" });
		}
	};

	pack_entry = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("包材入库：", data);
		// 包材入库： {
		// 	_id: '6a58a39b02b59e8af2912644',
		// 	document_id__c: '4501088264',
		// 	material_code__c: '41045',
		// 	material_name__c: '复合调味料LM310',
		// 	quantity__c: 2000,
		// 	piece: 2222,
		// 	enter_quantity: 2000
		// }
		const piece = data?.piece;
		const weight = data?.enter_quantity;

		const docs = await db.find("hk_pack_doc_detail__c", { query: { _id: data?._id } });
		if (docs.length) {
			const items = docs[0];

			const status = items?.status__c;
			if (status != "正在执行") {
				return ctx.send({ success: false, message: `该单据号执行状态必须是 正在执行，根据描述提示将执行状态修改为 重新执行` });
			}

			let Name = "包材";
			let table_Pda_Entry = "hk_pack_pda_entry__c";
			let table_Stock_d = "hk_pack_stock_detail__c";
			const doc_i = await db.find(table_Pda_Entry, { query: { doc_instruction__c: items.doc_instruction__c } });
			if (doc_i.length) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}  下物料：${items?.material_code__c} 已经入过库了, 可以删除【${Name}入库表】和【${Name}库存详情表】 重新入库！` });
			}

			await db.updateOne("hk_pack_doc_detail__c", items._id, { handle_quantity__c: weight });

			const digits = Math.floor(1000000 + Math.random() * 9000000); // 7位数字（1000000~9999999）
			const pallet = `A${digits}`;

			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
			const day = String(now.getDate()).padStart(2, "0");
			const formatted = `${year}-${month}-${day}`;


			
		let batch = "";
		// const items = docs[0];
		if (items.batch__c) {
			batch = items.batch__c;
		}
			// batch__c: batch,



			// 写入PDA入库表、写入库存表、更新单据详情出入库数量
			await db.insertOne(table_Pda_Entry, {
				time__c: time(),
				pallet__c: pallet,
				barcode_arr__c: data?.barCodeArr,
				status__c: "入库完成",
				// barcode_quantity__c: n++, // 位置号
				// barcode__c: barcode,
				weight__c: weight,
				production_date__c: items?.production_date__c || "",
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
				batch__c: batch,
			});

			await db.insertOne(table_Stock_d, {
				time__c: time(),
				// loc_name__c: stock.loc_name__c,
				// position__c: stock.position__c,
				// row__c: stock.row__c,
				// col__c: stock.col__c,
				// lay__c: stock.lay__c,
				pallet__c: pallet,
				// group_id__c: stock.group_id__c,
				// priority__c: stock.priority__c,
				production_date__c: items?.production_date__c || "",
				entry_stock_date__c: formatted, // 入库日期
				stock_status__c: "在库",
				// way__c: way,
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
				weight__c: weight, // 当托重量
				final_weight__c: weight,
				instruction__c: "",
			});

			return ctx.send({ success: true, message: "入库完成！" });
		} else {
			return ctx.send({ success: false, message: "根据传递的信息，查询单据失败！" });
		}
	};
	pack_move = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("包材入库：", data);
		// 包材入库： {
		// 	_id: '6a58a39b02b59e8af2912644',
		// 	document_id__c: '4501088264',
		// 	material_code__c: '41045',
		// 	material_name__c: '复合调味料LM310',
		// 	quantity__c: 2000,
		// 	piece: 2222,
		// 	enter_quantity: 2000
		// }
		const piece = data?.piece;
		const weight = data?.enter_quantity;

		const docs = await db.find("hk_pack_doc_detail__c", { query: { _id: data?._id } });
		if (docs.length) {
			const items = docs[0];

			const status = items?.status__c;
			if (status != "未执行") {
				return ctx.send({ success: false, message: `该单据号执行状态必须是 正在执行，根据描述提示将执行状态修改为 重新执行` });
			}

			let Name = "包材";
			let table_Pda_Entry = "hk_pack_pda_entry__c";
			let table_Stock_d = "hk_pack_stock_detail__c";
			const doc_i = await db.find(table_Pda_Entry, { query: { doc_instruction__c: items.doc_instruction__c } });
			if (doc_i.length) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}  下物料：${items?.material_code__c} 已经入过库了, 可以删除【${Name}入库表】和【${Name}库存详情表】 重新入库！` });
			}

			await db.updateOne("hk_pack_doc_detail__c", items._id, { handle_quantity__c: weight ,status__c: "正在执行" });

			const digits = Math.floor(1000000 + Math.random() * 9000000); // 7位数字（1000000~9999999）
			const pallet = `A${digits}`;

			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
			const day = String(now.getDate()).padStart(2, "0");
			const formatted = `${year}-${month}-${day}`;

			// 写入PDA入库表、写入库存表、更新单据详情出入库数量
			await db.insertOne(table_Pda_Entry, {
				time__c: time(),
				pallet__c: pallet,
				barcode_arr__c: data?.barCodeArr,
				status__c: "入库完成",
				// barcode_quantity__c: n++, // 位置号
				// barcode__c: barcode,
				weight__c: weight,
				production_date__c: items?.production_date__c || "",
				// input_way__c: way,
				batch__c: items?.batch__c,
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

			await db.insertOne(table_Stock_d, {
				time__c: time(),
				// loc_name__c: stock.loc_name__c,
				// position__c: stock.position__c,
				// row__c: stock.row__c,
				// col__c: stock.col__c,
				// lay__c: stock.lay__c,
				pallet__c: pallet,
				// group_id__c: stock.group_id__c,
				// priority__c: stock.priority__c,
				production_date__c: items?.production_date__c || "",
				entry_stock_date__c: formatted, // 入库日期
				stock_status__c: "在库",
				// way__c: way,
				document_id__c: items?.document_id__c,
				document_type__c: items?.document_type__c,
				line_item__c: items?.line_item__c,
				material_name__c: items?.material_name__c,
				material_code__c: items?.material_code__c,
				// batch__c: "", // 批次为空
					batch__c: items?.batch__c,
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
				weight__c: weight, // 当托重量
				final_weight__c: weight,
				instruction__c: "",
			});

			return ctx.send({ success: true, message: "入库完成！" });
		} else {
			return ctx.send({ success: false, message: "根据传递的信息，查询单据失败！" });
		}
	};
	mater_lei_out_g = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		// 根据传递的物料代码和批号查询库存

		const material_code__c = data?.material_code__c;
		const batch__c = data?.batch__c;

		let Name = "原料雷马库存";
		const docs = await db.find("hk_mater_lei_stock_d__c", { query: { material_code__c: material_code__c.trim(), batch__c: batch__c.trim() } });
		if (docs.length == 0) {
			return ctx.send({ success: false, message: `${Name} - 根据物料代码：${material_code__c}，批号：${batch__c} 未在库存中获取到数据！` });
		} else if (docs.length == 1) {
			return ctx.send({ success: true, message: `获取数据成功！`, data: docs });
		} else {
			return ctx.send({ success: false, message: `${Name} - 根据物料代码：${material_code__c}，批号：${batch__c} 获取到数据为多条，数据错误，请合并为一条！` });
		}
	};

	pack_out_g = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		// 根据传递的物料代码和批号查询库存

		const material_code__c = data?.material_code__c;
		const batch__c = data?.batch__c;

		let Name = "包材库库存";
		const docs = await db.find("hk_pack_stock_detail__c", { query: { material_code__c: material_code__c?.trim(), batch__c: batch__c?.trim() } });
		if (docs.length == 0) {
			return ctx.send({ success: false, message: `${Name} - 根据物料代码：${material_code__c}，批号：${batch__c} 未在库存中获取到数据！` });
		} else if (docs.length == 1) {
			return ctx.send({ success: true, message: `获取数据成功！`, data: docs });
		} else {
			return ctx.send({ success: false, message: `${Name} - 根据物料代码：${material_code__c}，批号：${batch__c} 获取到数据为多条，数据错误，请合并为一条！` });
		}
	};

	mater_lei_out = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("雷马出库：", data);

		let d = {
			_id: "6a51e94034c374767caa938a",
			time__c: "2026/07/11 14:57:04",
			document_id__c: "33024327",
			line_item__c: "000010",
			supplier__c: null,
			material_code__c: "50247",
			material_name__c: "海南夫妻肺片(牛肚)",
			quantity__c: 5240.029,
			unit__c: "KG",
			doc_instruction__c: "9302404867",
			document_type__c: "销售出库单",
			cmdtype__c: "出库任务",
			area__c: "原料雷马外租冻库",
			export_loc__c: "2号口",
			space: "61c51b8f4cada30031994f3d",
			created_by: "63dc7de4902db72a48e718f2",
			owner: "63dc7de4902db72a48e718f2",
			created: "2026-07-11T06:57:04.049Z",
			desc__c: "未执行状态可以执行出库！",
			lastModified: "2026-07-11T08:30:10.497Z",
			status__c: "未执行",
			batch__c: "333333",
			handle_quantity__c: 0,
			modified: "2026-07-11T07:11:53.656Z",
			modified_by: "63dc7de4902db72a48e718f2",
			stock_id: "6a50cfff4779d810f27bad71",
			now_quantity__c: 99,
			weight__c: 26010,
			piece: 40,
			out_quantity: 4000.231,
		};

		// return ctx.send({ success: false, message: `该单据号执行状态必须是 正在执行，根据描述提示将执行状态修改为 重新执行` });

		const piece = Number(data?.piece); // 出库件数
		const weight = Number(data?.out_quantity); // 出库数量
		const stock_now_quantity = Number(data?.now_quantity__c);
		const stock_weight = Number(data?.weight__c);
		const material_code = data?.material_code__c;
		const batch = data?.batch__c;

		const docs = await db.find("hk_mater_doc_detail__c", { query: { _id: data?._id } });
		if (docs.length) {
			const items = docs[0];

			const status = items?.status__c;
			if (status != "未执行") {
				return ctx.send({ success: false, message: `该单据号执行状态必须是 未执行，根据描述提示将执行状态修改为 重新执行` });
			}

			let Name = "原料雷马";
			let table_Pda_Entry = "hk_mater_lei_pda_out__c";
			let table_Stock_d = "hk_mater_lei_stock_d__c";
			let table_Stock_d_his = "hk_mater_lei_stock_d_his__c";

			const doc_i = await db.find(table_Pda_Entry, { query: { doc_instruction__c: items.doc_instruction__c } });
			if (doc_i.length) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}  物料代码：${material_code}，批次：${batch} 已经出过库了, 可以删除【${Name}出库表】和 还原【${Name}库存详情表】库存， 并重新入库！` });
			}
			const doc_d = await db.find(table_Stock_d, { query: { material_code__c: data?.material_code__c, batch__c: data?.batch__c } });
			if (doc_d.length == 0) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}   物料代码：${material_code}，批次：${batch}, 已经无库存了！` });
			}
			const item_stock_detail = doc_d?.[0];

			await db.updateOne("hk_mater_doc_detail__c", items._id, { handle_quantity__c: Number(weight), status__c: "正在执行" });

			// PDA出库，计算库存是否为0，如果为0删除数据，否则扣减库存

			const surplusPiece = Number((Math.round((Number(stock_now_quantity) - Number(piece || 0)) * 1000) / 1000).toFixed(3));
			const surplusWeight = Number((Math.round((Number(stock_weight) - Number(weight || 0)) * 1000) / 1000).toFixed(3));

			await db.insertOne(table_Pda_Entry, {
				time__c: time(),
				document_id__c: items?.document_id__c,
				document_type__c: items?.document_type__c,
				department__c: items?.department__c,
				doc_instruction__c: items?.doc_instruction__c,

				instruction__c: "",
				area__c: items?.area__c,

				material_code__c: item_stock_detail.material_code__c,
				material_name__c: item_stock_detail.material_name__c,
				batch__c: item_stock_detail.batch__c,
				production_date__c: item_stock_detail.production_date__c,

				customer__c: item_stock_detail?.customer__c,
				contract__c: item_stock_detail?.contract__c,

				pallet__c: item_stock_detail?.pallet__c,
				status__c: "处理库存成功",
				desc__c: "",

				piece__c: stock_now_quantity,
				handle_piece__c: piece, // 拿出件数

				quantity__c: stock_weight, // 库存数量
				pick_quantity__c: weight, // 拿出数量
				surplus_quantity__c: surplusWeight, // 剩余数量
				final_pick_quantity__c: weight, // 出库数量
				whole__c: "整托出库",
			});

			if (surplusWeight == 0) {
				await db.insertOne(table_Stock_d_his, { ...item_stock_detail, _id: null });
				await db.deleteOne(table_Stock_d, item_stock_detail?._id);
			} else {
				await db.updateOne(table_Stock_d, item_stock_detail?._id, {
					now_quantity__c: surplusPiece, // 当前箱数
					final_quantity__c: surplusPiece,
					weight__c: surplusWeight, // 当托重量
					final_weight__c: surplusWeight,
				});
			}

			return ctx.send({ success: true, message: "库存处理完成！" });
		} else {
			return ctx.send({ success: false, message: "根据传递的信息，查询单据失败！" });
		}
	};

	pack_out = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("包材出库：", data);

		let d = {
			_id: "6a5f5e738f7bd9461195df80",
			time__c: "2026/07/21 19:56:35",
			document_id__c: "33041110",
			line_item__c: "000010",
			supplier__c: null,
			material_code__c: "40097",
			material_name__c: "海南夫妻肺片（牛肉）",
			quantity__c: 3653.3,
			unit__c: "KG",
			doc_instruction__c: "9499568817",
			document_type__c: "销售出库单",
			cmdtype__c: "出库任务",
			area__c: "包材库",
			export_loc__c: "2号口",
			space: "61c51b8f4cada30031994f3d",
			created_by: "63dc7de4902db72a48e718f2",
			owner: "63dc7de4902db72a48e718f2",
			created: "2026-07-21T11:56:35.689Z",
			batch__c: "2026",
			lastModified: "2026-07-21T11:57:11.192Z",
			stock_id: "6a5f4e2561ff6e482bfadca0",
			now_quantity__c: 4000,
			weight__c: 42000,
			piece: 500,
			out_quantity: 20000,
		};

		// return ctx.send({ success: false, message: `该单据号执行状态必须是 正在执行，根据描述提示将执行状态修++++++++++++++++++++改为 重新执行` });

		const piece = Number(data?.piece); // 出库件数
		const weight = Number(data?.out_quantity); // 出库数量
		const stock_now_quantity = Number(data?.now_quantity__c); // 库存件数
		const stock_weight = Number(data?.weight__c); // 库存重量
		const material_code = data?.material_code__c;
		const batch = data?.batch__c;

		const docs = await db.find("hk_pack_doc_detail__c", { query: { _id: data?._id } });
		if (docs.length) {
			const items = docs[0];

			const status = items?.status__c;
			if (status != "未执行") {
				return ctx.send({ success: false, message: `该单据号执行状态必须是 未执行，根据描述提示将执行状态修改为 重新执行` });
			}

			let Name = "包材库";
			let table_Pda_Entry = "hk_pack_pda_out__c";
			let table_Stock_d = "hk_pack_stock_detail__c";
			let table_Stock_d_his = "hk_pack_stock_detail_his__c";

			const doc_i = await db.find(table_Pda_Entry, { query: { doc_instruction__c: items.doc_instruction__c } });
			if (doc_i.length) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}  下物料代码：${material_code}，批次：${batch} 已经出过库了, 可以删除【${Name}出库表】和 还原【${Name}库存详情表】库存， 并重新入库！` });
			}
			const doc_d = await db.find(table_Stock_d, { query: { material_code__c: data?.material_code__c, batch__c: data?.batch__c } });
			if (doc_d.length == 0) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}  下物料代码：${material_code}，批次：${batch}, 已经无库存了！` });
			}
			const item_stock_detail = doc_d?.[0];

			await db.updateOne("hk_pack_doc_detail__c", items._id, { handle_quantity__c: Number(weight), status__c: "正在执行" });

			// PDA出库，计算库存是否为0，如果为0删除数据，否则扣减库存

			const surplusPiece = Number((Math.round((Number(stock_now_quantity) - Number(piece || 0)) * 1000) / 1000).toFixed(3));
			const surplusWeight = Number((Math.round((Number(stock_weight) - Number(weight || 0)) * 1000) / 1000).toFixed(3));

			await db.insertOne(table_Pda_Entry, {
				time__c: time(),
				document_id__c: items?.document_id__c,
				document_type__c: items?.document_type__c,
				department__c: items?.department__c,
				doc_instruction__c: items?.doc_instruction__c,

				instruction__c: "",
				area__c: items?.area__c,

				material_code__c: item_stock_detail.material_code__c,
				material_name__c: item_stock_detail.material_name__c,
				batch__c: item_stock_detail.batch__c,
				production_date__c: item_stock_detail.production_date__c,

				customer__c: item_stock_detail?.customer__c,
				contract__c: item_stock_detail?.contract__c,

				pallet__c: item_stock_detail?.pallet__c,
				status__c: "处理库存成功",
				desc__c: "",

				piece__c: stock_now_quantity,
				handle_piece__c: piece, // 拿出件数

				quantity__c: stock_weight, // 库存数量
				pick_quantity__c: weight, // 拿出数量
				surplus_quantity__c: surplusWeight, // 剩余数量
				final_pick_quantity__c: weight, // 出库数量
				whole__c: "整托出库",
			});

			if (surplusWeight == 0) {
				await db.insertOne(table_Stock_d_his, { ...item_stock_detail, _id: null });
				await db.deleteOne(table_Stock_d, item_stock_detail?._id);
			} else {
				await db.updateOne(table_Stock_d, item_stock_detail?._id, {
					now_quantity__c: surplusPiece, // 当前箱数
					final_quantity__c: surplusPiece,
					weight__c: surplusWeight, // 当托重量
					final_weight__c: surplusWeight,
				});
			}

			return ctx.send({ success: true, message: "库存处理完成！" });
		} else {
			return ctx.send({ success: false, message: "根据传递的信息，查询单据失败！" });
		}
	};

	mater_tie_out_g = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("data", data);

		// 根据传递的物料代码和批号查询库存

		const material_code__c = data?.material_code__c;
		const batch__c = data?.batch__c;

		let Name = "原料中铁库存";
		const docs = await db.find("hk_mater_tie_stock_d__c", { query: { material_code__c: material_code__c.trim(), batch__c: batch__c.trim() } });
		if (docs.length == 0) {
			return ctx.send({ success: false, message: `${Name} - 根据物料代码：${material_code__c}，批号：${batch__c} 未在库存中获取到数据！` });
		} else if (docs.length == 1) {
			return ctx.send({ success: true, message: `获取数据成功！`, data: docs });
		} else {
			return ctx.send({ success: false, message: `${Name} - 根据物料代码：${material_code__c}，批号：${batch__c} 获取到数据为多条，数据错误，请合并为一条！` });
		}
	};

	mater_tie_out = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("雷马出库：", data);

		let d = {
			_id: "6a51e94034c374767caa938a",
			time__c: "2026/07/11 14:57:04",
			document_id__c: "33024327",
			line_item__c: "000010",
			supplier__c: null,
			material_code__c: "50247",
			material_name__c: "海南夫妻肺片(牛肚)",
			quantity__c: 5240.029,
			unit__c: "KG",
			doc_instruction__c: "9302404867",
			document_type__c: "销售出库单",
			cmdtype__c: "出库任务",
			area__c: "原料雷马外租冻库",
			export_loc__c: "2号口",
			space: "61c51b8f4cada30031994f3d",
			created_by: "63dc7de4902db72a48e718f2",
			owner: "63dc7de4902db72a48e718f2",
			created: "2026-07-11T06:57:04.049Z",
			desc__c: "未执行状态可以执行出库！",
			lastModified: "2026-07-11T08:30:10.497Z",
			status__c: "未执行",
			batch__c: "333333",
			handle_quantity__c: 0,
			modified: "2026-07-11T07:11:53.656Z",
			modified_by: "63dc7de4902db72a48e718f2",
			stock_id: "6a50cfff4779d810f27bad71",
			now_quantity__c: 99,
			weight__c: 26010,
			piece: 40,
			out_quantity: 4000.231,
		};

		// return ctx.send({ success: false, message: `该单据号执行状态必须是 正在执行，根据描述提示将执行状态修改为 重新执行` });

		const piece = Number(data?.piece); // 出库件数
		const weight = Number(data?.out_quantity); // 出库数量
		const stock_now_quantity = Number(data?.now_quantity__c);
		const stock_weight = Number(data?.weight__c);
		const material_code = data?.material_code__c;
		const batch = data?.batch__c;

		const docs = await db.find("hk_mater_doc_detail__c", { query: { _id: data?._id } });
		if (docs.length) {
			const items = docs[0];

			const status = items?.status__c;
			if (status != "未执行") {
				return ctx.send({ success: false, message: `该单据号执行状态必须是 未执行，根据描述提示将执行状态修改为 重新执行` });
			}

			let Name = "原料中铁";
			let table_Pda_Entry = "hk_mater_tie_pda_out__c";
			let table_Stock_d = "hk_mater_tie_stock_d__c";
			let table_Stock_d_his = "hk_mater_tie_stock_d_his__c";

			const doc_i = await db.find(table_Pda_Entry, { query: { doc_instruction__c: items.doc_instruction__c } });
			if (doc_i.length) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}   下物料代码：${material_code}，批次：${batch} 已经出过库了, 可以删除【${Name}出库表】和 还原【${Name}库存详情表】库存， 并重新入库！` });
			}
			const doc_d = await db.find(table_Stock_d, { query: { material_code__c: data?.material_code__c, batch__c: data?.batch__c } });
			if (doc_d.length == 0) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c}   下物料代码：${material_code}，批次：${batch}, 已经无库存了！` });
			}
			const item_stock_detail = doc_d?.[0];

			await db.updateOne("hk_mater_doc_detail__c", items._id, { handle_quantity__c: Number(weight), status__c: "正在执行" });

			// PDA出库，计算库存是否为0，如果为0删除数据，否则扣减库存

			const surplusPiece = Number((Math.round((Number(stock_now_quantity) - Number(piece || 0)) * 1000) / 1000).toFixed(3));
			const surplusWeight = Number((Math.round((Number(stock_weight) - Number(weight || 0)) * 1000) / 1000).toFixed(3));

			await db.insertOne(table_Pda_Entry, {
				time__c: time(),
				document_id__c: items?.document_id__c,
				document_type__c: items?.document_type__c,
				department__c: items?.department__c,
				doc_instruction__c: items?.doc_instruction__c,

				instruction__c: "",
				area__c: items?.area__c,

				material_code__c: item_stock_detail.material_code__c,
				material_name__c: item_stock_detail.material_name__c,
				batch__c: item_stock_detail.batch__c,
				production_date__c: item_stock_detail.production_date__c,

				customer__c: item_stock_detail?.customer__c,
				contract__c: item_stock_detail?.contract__c,

				pallet__c: item_stock_detail?.pallet__c,
				status__c: "处理库存成功",
				desc__c: "",

				piece__c: stock_now_quantity,
				handle_piece__c: piece, // 拿出件数

				quantity__c: stock_weight, // 库存数量
				pick_quantity__c: weight, // 拿出数量
				surplus_quantity__c: surplusWeight, // 剩余数量
				final_pick_quantity__c: weight, // 出库数量
				whole__c: "整托出库",
			});

			if (surplusWeight == 0) {
				await db.insertOne(table_Stock_d_his, { ...item_stock_detail, _id: null });
				await db.deleteOne(table_Stock_d, item_stock_detail?._id);
			} else {
				await db.updateOne(table_Stock_d, item_stock_detail?._id, {
					now_quantity__c: surplusPiece, // 当前箱数
					final_quantity__c: surplusPiece,
					weight__c: surplusWeight, // 当托重量
					final_weight__c: surplusWeight,
				});
			}

			return ctx.send({ success: true, message: "库存处理完成！" });
		} else {
			return ctx.send({ success: false, message: "根据传递的信息，查询单据失败！" });
		}
	};

	meter_tie_enter = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("中铁外租入库：", data);
		// 雷马外租入库： {
		// 	_id: '6a5064d853b81e5fc77ab934',
		// 	document_id__c: '4501073909',
		// 	material_code__c: '50247',
		// 	material_name__c: '牛肉(牛霖)',
		// 	quantity__c: 26010,
		// 	piece: 99,
		// 	enter_quantity: 26010
		// }
		const piece = data?.piece;
		const weight = data?.enter_quantity;

		const docs = await db.find("hk_mater_doc_detail__c", { query: { _id: data?._id } });
		if (docs.length) {
			const items = docs[0];

			const status = items?.status__c;
			if (status != "正在执行") {
				return ctx.send({ success: false, message: `该单据号执行状态必须是 正在执行，根据描述提示将执行状态修改为 重新执行` });
			}

			let Name = "原料中铁";
			let table_Pda_Entry = "hk_mater_tie_pda_entry__c";
			let table_Stock_d = "hk_mater_tie_stock_d__c";
			const doc_i = await db.find(table_Pda_Entry, { query: { doc_instruction__c: items.doc_instruction__c } });
			if (doc_i.length) {
				return ctx.send({ success: false, message: `该单据号：${items.document_id__c}  单据指令号：${items.doc_instruction__c} 下物料：${items?.material_code__c} 已经入过库了, 可以删除【${Name}入库表】和【${Name}库存详情表】 重新入库！` });
			}

			await db.updateOne("hk_mater_doc_detail__c", items._id, { handle_quantity__c: weight });

			const digits = Math.floor(1000000 + Math.random() * 9000000); // 7位数字（1000000~9999999）
			const pallet = `A${digits}`;

			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份从0开始
			const day = String(now.getDate()).padStart(2, "0");
			const formatted = `${year}-${month}-${day}`;


			
			let batch = "";
		// const items = docs[0];
		if (items.batch__c) {
			batch = items.batch__c;
		}
			// batch__c: batch,

			// 写入PDA入库表、写入库存表、更新单据详情出入库数量
			await db.insertOne(table_Pda_Entry, {
				time__c: time(),
				pallet__c: pallet,
				barcode_arr__c: data?.barCodeArr,
				status__c: "入库完成",
				// barcode_quantity__c: n++, // 位置号
				// barcode__c: barcode,
				weight__c: weight,
				production_date__c: items?.production_date__c || "",
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
				batch__c: batch,
			});

			await db.insertOne(table_Stock_d, {
				time__c: time(),
				// loc_name__c: stock.loc_name__c,
				// position__c: stock.position__c,
				// row__c: stock.row__c,
				// col__c: stock.col__c,
				// lay__c: stock.lay__c,
				pallet__c: pallet,
				// group_id__c: stock.group_id__c,
				// priority__c: stock.priority__c,
				production_date__c: items?.production_date__c || "",
				entry_stock_date__c: formatted, // 入库日期
				stock_status__c: "在库",
				// way__c: way,
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
				weight__c: weight, // 当托重量
				final_weight__c: weight,
				instruction__c: "",
			});

			return ctx.send({ success: true, message: "入库完成！" });
		} else {
			return ctx.send({ success: false, message: "根据传递的信息，查询单据失败！" });
		}
	};

	auxiliary_out = async (ctx: Context) => {
		this.logTimerOnce("Material_Send_WCS", "定时器 > 其他任务 > 原料库下发WCS任务");

		const db = ctx.mongo;
		const data: any = ctx.request.body;
		console.log("辅料库出库：，", data);
		//  {
		// 		selectedRows: [
		// 			{
		// 				_id: '6a601d3ef103c23a79c4d99c',
		// 				time__c: '2026/07/22 09:30:38',
		// 				document_id__c: '33042597',
		// 				line_item__c: '000010',
		// 				supplier__c: null,
		// 				material_code__c: '16949',
		// 				material_name__c: '海南夫妻肺片（牛肉）',
		// 				quantity__c: 3188.875,
		// 				unit__c: 'KG',
		// 				doc_instruction__c: '9383876435',
		// 				document_type__c: '销售出库单',
		// 				cmdtype__c: '出库任务',
		// 				area__c: '辅料库',
		// 				export_loc__c: '2号口',
		// 				space: '61c51b8f4cada30031994f3d',
		// 				created_by: '63dc7de4902db72a48e718f2',
		// 				owner: '63dc7de4902db72a48e718f2',
		// 				created: '2026-07-22T01:30:38.764Z',
		// 				handle_quantity__c: 0,
		// 				lastModified: '2026-07-22T09:30:22.003Z',
		// 				desc__c: '未执行状态可以执行出库！',
		// 				status__c: '未执行',
		// 				modified: '2026-07-22T08:23:39.251Z',
		// 				modified_by: '63dc7de4902db72a48e718f2',
		// 				production_date__c: '2026-05-12',
		// 				batch__c: '2605120001'
		// 			}
		// 		]
		// 	}
		const docs = data?.selectedRows;
		// const docs = [
		// 	{
		// 		_id: "2362345234234",
		// 		doc_instruction__c: "123123",
		// 		document_id__c: "123123123",
		// 		department__c: "1231241",

		// 		document_type__c: "销售出库单",
		// 		status__c: "未执行",
		// 		quantity__c: 178.213,
		// 		batch__c: "2026",
		// 		material_code__c: "50055",
		// 	},
		// ];

		// return ctx.send({ success: false, message: `+++++` });
		if (docs.length) {
			for (const element of docs) {
				const docType = ["其他出库单", "销售出库单", "需求出库单"];
				if (docType.includes(element?.document_type__c)) {
					if (element?.status__c == "未执行") {
						// 根据前端传递的 物料代码和批次进行出库

						const demandQuantity = element?.quantity__c;

						let stock_D = await db.find("hk_auxiliary_stock_detail__c", {
							query: {
								material_code__c: element?.material_code__c, // 只根据物料代码匹配
								batch__c: element?.batch__c,
								stock_status__c: "在库",
							},
							sort: { production_date__c: 1 },
						});
						console.log("stock_D", stock_D.length);
						// 【出库大于库存数，也要出库】
						if (stock_D.length) {
							// const sumWeight = stock_D.reduce((prev, cur) => prev + cur.weight__c, 0); // 50  出 10
							const sumWeight = stock_D.reduce((prev, cur) => {
								return Math.round((prev + Number(cur.weight__c)) * 1000) / 1000;
							}, 0); // 50  出 10
							if (demandQuantity <= sumWeight) {
								// - 从哪个 pallet__c 取
								// - 取多少重量 takeWeight
								// - 是否整托 isWholePallet
								function roundWeight(value: number, precision = 3) {
									const factor = 10 ** precision;
									return Math.round((Number(value || 0) + Number.EPSILON) * factor) / factor;
								}

								function allocateByWeight(list: any, demandWeight: any) {
									let remain = roundWeight(demandWeight);
									const result = [];

									for (const item of list) {
										if (remain <= 0) break;

										const palletWeight = roundWeight(item?.weight__c);

										if (palletWeight <= 0) continue;

										const takeWeight = roundWeight(Math.min(remain, palletWeight));

										result.push({
											id: item?._id,
											pallet__c: item?.pallet__c || "",
											mater_code: item?.material_code__c,
											takeWeight,
											palletWeight,
											isWholePallet: takeWeight === palletWeight,
										});

										remain = roundWeight(remain - takeWeight);
									}

									return {
										demandWeight: roundWeight(demandWeight),
										allocatedWeight: roundWeight(Number(demandWeight || 0) - remain),
										remain: roundWeight(remain),
										result,
									};
								}

								const allocationResult = allocateByWeight(stock_D, demandQuantity);
								console.log("allocationResult", allocationResult);
								// return ctx.send({ success: false, message: `++++++++++++++++++++` });
								// {
								// 	"demandWeight": 72.301,
								// 	"allocatedWeight": 72.301,
								// 	"remain": 0,
								// 	"result": [
								// 		{
								// 			"pallet__c": "M1",
								// 			"takeWeight": 36,
								// 			"palletWeight": 36,
								// 			"isWholePallet": true
								// 		},
								// 		{
								// 			"pallet__c": "M2",
								// 			"takeWeight": 24,
								// 			"palletWeight": 24,
								// 			"isWholePallet": true
								// 		},
								// 		{
								// 			"pallet__c": "M3", // 托盘号
								// 			"takeWeight": 12.301, // 拿出重量
								// 			"palletWeight": 24, // 库存重量
								// 			"isWholePallet": false // 是否整托出库
								// 		}
								// 	]
								// }
								const results = allocationResult.result;
								// for (const ele of results) {
								// 	// 查询托盘号是否重复
								// 	let pallet_data = await db.find("hk_auxiliary_stock_detail__c", { query: { pallet__c: ele?.pallet__c } });
								// 	if (pallet_data.length > 1) {
								// 		return ctx.send({ success: false, message: `错误原因：托盘号：${ele?.pallet__c} 在库存中重复` });
								// 	}
								// }

								for (const item of results) {
									let isWholePallet = "";
									if (item.isWholePallet) {
										isWholePallet = "整托出库";
									} else {
										isWholePallet = "半托出库";
									}
									// let pallet_data = await db.find("hk_auxiliary_stock_detail__c", { query: { pallet__c: item.pallet__c } });
									let pallet_data = await db.find("hk_auxiliary_stock_detail__c", { query: { _id: item.id } });
									if (pallet_data.length) {
										const stockD = pallet_data[0];

										const Pick = Number((Math.round((stockD.weight__c - item.takeWeight) * 1000) / 1000).toFixed(3));

										// 扣减库存
										await db.updateOne("hk_auxiliary_stock_detail__c", stockD._id, {
											stock_status__c: "正在出库",
											final_weight__c: Pick,
										});

										const doc_instruct = `${element?.doc_instruction__c}`;
										const uuid6 = `66${String(+new Date()).substring(8)}${Math.floor(Math.random() * 90) + 10}`;

										// 写入出库表中
										await db.insertOne("hk_auxiliary_pda_out__c", {
											time__c: time(),
											id__c: item?.id,
											document_id__c: element?.document_id__c,
											document_type__c: element?.document_type__c,
											department__c: element?.department__c, // 领用部门

											loc_name__c: stockD.loc_name__c, 
											position__c: stockD.position__c,
											
											doc_instruction__c: doc_instruct,
											instruction__c: uuid6,
											area__c: "",
											material_code__c: stockD.material_code__c,
											material_name__c: stockD.material_name__c,
											batch__c: stockD.batch__c,
											production_date__c: stockD.production_date__c,
											customer__c: stockD?.customer__c,
											pallet__c: item.pallet__c,
											status__c: "正在出库",
											desc__c: "",
											piece__c: stockD.now_quantity__c,
											handle_piece__c: 0,
											quantity__c: Number(stockD.weight__c),
											pick_quantity__c: Number(item.takeWeight),
											surplus_quantity__c: Pick,
											final_pick_quantity__c: 0,
											whole__c: isWholePallet,
										});
									}
								}
								await db.updateOne("hk_auxiliary_doc_detail__c", element?._id, { time__c: time(), status__c: "正在执行", desc__c: "" });

								return ctx.send({ success: true, message: `执行成功：托盘正在出库，请查看手持机界面内容！` });
							} else {
								await db.updateOne("hk_auxiliary_doc_detail__c", element?._id, { time__c: time(), status__c: "执行错误", desc__c: "错误原因：出库重量大于库存重量" });
								return ctx.send({ success: false, message: `错误原因：出库重量大于库存重量` });
							}
						} else {
							await db.updateOne("hk_auxiliary_doc_detail__c", element?._id, { time__c: time(), status__c: "执行错误", desc__c: "错误原因：在库存中未找到匹配的物料！" });
							return ctx.send({ success: false, message: `错误原因：在库存中未找到匹配的物料！` });
						}
					} else {
						await db.updateOne("hk_auxiliary_doc_detail__c", element?._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：执行状态必须是未执行！` });
						return ctx.send({ success: false, message: `执行错误：执行状态必须是未执行！` });
					}
				} else {
					await db.updateOne("hk_auxiliary_doc_detail__c", element?._id, { time__c: time(), status__c: "执行错误", desc__c: `执行错误：单据类型需是: ${docType.join(",")}` });
					return ctx.send({ success: false, message: `执行错误：单据类型需是: ${docType.join(",")}` });
				}
			}
			return ctx.send({ success: true, message: "执行成功：查看数据信息！" });
		} else {
			return ctx.send({ success: false, message: "失败：未读取到出库的任务！" });
		}
	};
}

export default new App();
