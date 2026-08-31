import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time } from "@/src/utils";

class App extends Basic {
	constructor() {
		super();
	}

	private loggedTimers = new Set<string>();
	private logTimerOnce(key: string, message: string) {
		if (!this.loggedTimers.has(key)) {
			console.log(message);
			this.loggedTimers.add(key);
		}
	}

	// 入库任务中，根据单据类型分别去处理入库任务和出库任务的数据！
	material_document = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_document", "定时器 > 历史任务 > 原料库出入库任务（单据表 + 收货表）");

		let doc_detail = "hk_mater_doc_detail__c";
		let doc_detail_his = "hk_mater_doc_detail_his__c";

		const docs = await db.find(doc_detail, {
			query: {
				$and: [{ document_type__c: { $in: ["采购入库单", "其他出库单", "需求出库单", "销售出库单"] } }, { status__c: "已完成" }],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (element.document_type__c == "采购入库单") {
					const d1 = await db.find("hk_mater_pda_receipt__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne("hk_mater_pda_receipt_his__c", { ...item, _id: null });
							await db.deleteOne("hk_mater_pda_receipt__c", item._id);
						}
					}
					await db.insertOne(doc_detail_his, { ...element, _id: null });
					await db.deleteOne(doc_detail, element._id);
				}
				if (["其他出库单", "需求出库单", "销售出库单"].includes(element.document_type__c)) {
					const d1 = await db.find("hk_mater_pda_outgoing__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne("hk_mater_pda_outgoing_his__c", { ...item, _id: null });
							await db.deleteOne("hk_mater_pda_outgoing__c", item._id);
						}
					}
					await db.insertOne(doc_detail_his, { ...element, _id: null });
					await db.deleteOne(doc_detail, element._id);
				}
			}
		}

		const doc = await db.find("hk_mater_doc__c", { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find("hk_mater_doc_detail__c", { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne("hk_mater_doc_his__c", { ...element, _id: null });
					await db.deleteOne("hk_mater_doc__c", element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	// 原料雷马
	material_document_lei = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_document_lei", "定时器 > 历史任务 > 原料雷马");

		let table_doc = "hk_mater_doc__c"; // 单据表
		let table_doc_his = "hk_mater_doc_his__c"; // 单据历史表
		let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
		let table_doc_detail_his = "hk_mater_doc_detail_his__c"; // 单据详情历史表
		let table_pda_entry = "hk_mater_lei_pda_entry__c"; // PDA 入库
		let table_pda_entry_his = "hk_mater_lei_pda_entry_his__c";
		let table_pda_out = "hk_mater_lei_pda_out__c"; // PDA 出库
		let table_pda_out_his = "hk_mater_lei_pda_out_his__c";

		// let table_doc_detail = "hk_mater_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { area__c: "原料雷马外租冻库", status__c: "已完成" } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne(table_pda_entry_his, { ...item, _id: null });
							await db.deleteOne(table_pda_entry, item._id);
						}
					} else {
						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					}
				} else if (element.cmdtype__c == "出库任务") {
					let f1 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料一号冻库";
					let f2 = element.area__c == "原料雷马外租冻库" && element.recept_area__c == "原料二号冻库";
					if (f1 || f2) {
						const d0 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d0.length > 0) {
							for (const item of d0) {
								await db.insertOne(table_pda_out_his, { ...item, _id: null });
								await db.deleteOne(table_pda_out, item._id);
							}
						}
						let table_re = "";
						let table_re_his = "";
						if (element.recept_area__c == "原料一号冻库") {
							table_re = "hk_mater_pda_receipt__c";
							table_re_his = "hk_mater_pda_receipt_his__c";
						} else if (element.recept_area__c == "原料二号冻库") {
							table_re = "hk_mater_two_pda_entry__c";
							table_re_his = "hk_mater_two_pda_entry_his__c";
						}
						const d1 = await db.find(table_re, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_re_his, { ...item, _id: null });
								await db.deleteOne(table_re, item._id);
							}
						}

						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					} else {
						const d1 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_out_his, { ...item, _id: null });
								await db.deleteOne(table_pda_out, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					}
				}
			}
		}

		const doc = await db.find("hk_mater_doc__c", { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find("hk_mater_doc_detail__c", { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne("hk_mater_doc_his__c", { ...element, _id: null });
					await db.deleteOne("hk_mater_doc__c", element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	material_document_tie = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_document_tie", "定时器 > 历史任务 > 原料中铁");

		let table_doc = "hk_mater_doc__c"; // 单据表
		let table_doc_his = "hk_mater_doc_his__c"; // 单据历史表
		let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
		let table_doc_detail_his = "hk_mater_doc_detail_his__c"; // 单据详情历史表
		let table_pda_entry = "hk_mater_tie_pda_entry__c"; // PDA 入库
		let table_pda_entry_his = "hk_mater_tie_pda_entry_his__c";
		let table_pda_out = "hk_mater_tie_pda_out__c"; // PDA 出库
		let table_pda_out_his = "hk_mater_tie_pda_out_his__c";

		// let table_doc_detail = "hk_mater_doc_detail__c";
		const docs = await db.find(table_doc_detail, { query: { area__c: "原料中铁外租冻库", status__c:  "已完成"  } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne(table_pda_entry_his, { ...item, _id: null });
							await db.deleteOne(table_pda_entry, item._id);
						}
					} else {
						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					}
				} else if (element.cmdtype__c == "出库任务") {
					let f1 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料一号冻库";
					let f2 = element.area__c == "原料中铁外租冻库" && element.recept_area__c == "原料二号冻库";
					if (f1 || f2) {
						const d0 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d0.length > 0) {
							for (const item of d0) {
								await db.insertOne(table_pda_out_his, { ...item, _id: null });
								await db.deleteOne(table_pda_out, item._id);
							}
						}
						let table_re = "";
						let table_re_his = "";
						if (element.recept_area__c == "原料一号冻库") {
							table_re = "hk_mater_pda_receipt__c";
							table_re_his = "hk_mater_pda_receipt_his__c";
						} else if (element.recept_area__c == "原料二号冻库") {
							table_re = "hk_mater_two_pda_entry__c";
							table_re_his = "hk_mater_two_pda_entry_his__c";
						}
						const d1 = await db.find(table_re, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_re_his, { ...item, _id: null });
								await db.deleteOne(table_re, item._id);
							}
						}

						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					} else {
						const d1 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_out_his, { ...item, _id: null });
								await db.deleteOne(table_pda_out, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					}
				}
			}
		}

		const doc = await db.find("hk_mater_doc__c", { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find("hk_mater_doc_detail__c", { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne("hk_mater_doc_his__c", { ...element, _id: null });
					await db.deleteOne("hk_mater_doc__c", element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};
	material_document_two = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_document_two", "定时器 > 历史任务 > 原料库二号库");

		let table_doc = "hk_mater_doc__c"; // 单据表
		let table_doc_his = "hk_mater_doc_his__c"; // 单据历史表
		let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
		let table_doc_detail_his = "hk_mater_doc_detail_his__c"; // 单据详情历史表
		let table_pda_entry = "hk_mater_two_pda_entry__c"; // PDA 入库
		let table_pda_entry_his = "hk_mater_two_pda_entry_his__c";
		let table_pda_out = "hk_mater_two_pda_out__c"; // PDA 出库
		let table_pda_out_his = "hk_mater_two_pda_out_his__c";

		const docs = await db.find(table_doc_detail, { query: { status__c: "已完成" } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务" && element.area__c == "原料二号冻库") {
					const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne(table_pda_entry_his, { ...item, _id: null });
							await db.deleteOne(table_pda_entry, item._id);
						}
					} else {
						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "原料二号冻库") {
						const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_entry_his, { ...item, _id: null });
								await db.deleteOne(table_pda_entry, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					} else {
						if (element.area__c == "原料二号冻库") {
							const d1 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (d1.length > 0) {
								for (const item of d1) {
									await db.insertOne(table_pda_out_his, { ...item, _id: null });
									await db.deleteOne(table_pda_out, item._id);
								}
							} else {
								await db.insertOne(table_doc_detail_his, { ...element, _id: null });
								await db.deleteOne(table_doc_detail, element._id);
							}
						}
					}
				}
			}
		}

		const doc = await db.find("hk_mater_doc__c", { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find("hk_mater_doc_detail__c", { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne("hk_mater_doc_his__c", { ...element, _id: null });
					await db.deleteOne("hk_mater_doc__c", element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	material_document_mater = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_document", "定时器 > 历史任务 > 原料库");

		let table_doc = "hk_mater_doc__c"; // 单据表
		let table_doc_his = "hk_mater_doc_his__c"; // 单据历史表
		let table_doc_detail = "hk_mater_doc_detail__c"; // 单据详情表
		let table_doc_detail_his = "hk_mater_doc_detail_his__c"; // 单据详情历史表
		let table_pda_entry = "hk_mater_pda_receipt__c"; // PDA 入库
		let table_pda_entry_his = "hk_mater_pda_receipt_his__c";
		let table_pda_out = "hk_mater_pda_outgoing__c"; // PDA 出库
		let table_pda_out_his = "hk_mater_pda_outgoing_his__c";

		const docs = await db.find(table_doc_detail, { query: { status__c: "已完成" } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务" && element.area__c == "原料一号冻库") {
					const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne(table_pda_entry_his, { ...item, _id: null });
							await db.deleteOne(table_pda_entry, item._id);
						}
					} else {
						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "原料一号冻库") {
						const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_entry_his, { ...item, _id: null });
								await db.deleteOne(table_pda_entry, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					} else {
						if (element.area__c == "原料一号冻库") {
							const d1 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
							if (d1.length > 0) {
								for (const item of d1) {
									await db.insertOne(table_pda_out_his, { ...item, _id: null });
									await db.deleteOne(table_pda_out, item._id);
								}
							} else {
								await db.insertOne(table_doc_detail_his, { ...element, _id: null });
								await db.deleteOne(table_doc_detail, element._id);
							}
						}
					}
				}
			}
		}

		const doc = await db.find("hk_mater_doc__c", { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find("hk_mater_doc_detail__c", { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne("hk_mater_doc_his__c", { ...element, _id: null });
					await db.deleteOne("hk_mater_doc__c", element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	// 包材库
	pack_document = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("pack_document", "定时器 > 历史任务 > 包材库");

		let table_doc = "hk_pack_doc__c"; // 单据表
		let table_doc_his = "hk_pack_doc_his__c"; // 单据历史表
		let table_doc_detail = "hk_pack_doc_detail__c"; // 单据详情表
		let table_doc_detail_his = "hk_pack_doc_detail_his__c"; // 单据详情历史表
		let table_pda_entry = "hk_pack_pda_entry__c"; // PDA 入库
		let table_pda_entry_his = "hk_pack_pda_entry_his__c";
		let table_pda_out = "hk_pack_pda_out__c"; // PDA 出库
		let table_pda_out_his = "hk_pack_pda_out_his__c";

		const docs = await db.find(table_doc_detail, { query: { status__c: "已完成" } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne(table_pda_entry_his, { ...item, _id: null });
							await db.deleteOne(table_pda_entry, item._id);
						}
					} else {
						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "包材库") {
						const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_entry_his, { ...item, _id: null });
								await db.deleteOne(table_pda_entry, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					} else {
						const d1 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_out_his, { ...item, _id: null });
								await db.deleteOne(table_pda_out, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					}
				}
			}
		}

		const doc = await db.find(table_doc, { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne(table_doc_his, { ...element, _id: null });
					await db.deleteOne(table_doc, element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	Auxilliry_document = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("Auxilliry_document", "定时器 > 历史任务 > 辅料库");

		let table_doc = "hk_auxiliary_doc__c"; // 单据表
		let table_doc_his = "hk_auxiliary_doc_his__c"; // 单据历史表
		let table_doc_detail = "hk_auxiliary_doc_detail__c"; // 单据详情表
		let table_doc_detail_his = "hk_auxiliary_doc_detail_his__c"; // 单据详情历史表
		let table_pda_entry = "hk_auxiliary_pda_entry__c"; // PDA 入库
		let table_pda_entry_his = "hk_auxiliary_pda_entry_his__c";
		let table_pda_out = "hk_auxiliary_pda_out__c"; // PDA 出库
		let table_pda_out_his = "hk_auxiliary_pda_out_his__c";

		const docs = await db.find(table_doc_detail, { query: { status__c: "已完成" } }); // 原料库单据详情
		if (docs.length) {
			for (const element of docs) {
				if (element.cmdtype__c == "入库任务") {
					const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne(table_pda_entry_his, { ...item, _id: null });
							await db.deleteOne(table_pda_entry, item._id);
						}
					} else {
						await db.insertOne(table_doc_detail_his, { ...element, _id: null });
						await db.deleteOne(table_doc_detail, element._id);
					}
				} else if (element.cmdtype__c == "出库任务") {
					if (element.area__c == "线边库" && element.recept_area__c == "辅料库") {
						const d1 = await db.find(table_pda_entry, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_entry_his, { ...item, _id: null });
								await db.deleteOne(table_pda_entry, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					} else {
						const d1 = await db.find(table_pda_out, { query: { doc_instruction__c: element.doc_instruction__c } });
						if (d1.length > 0) {
							for (const item of d1) {
								await db.insertOne(table_pda_out_his, { ...item, _id: null });
								await db.deleteOne(table_pda_out, item._id);
							}
						} else {
							await db.insertOne(table_doc_detail_his, { ...element, _id: null });
							await db.deleteOne(table_doc_detail, element._id);
						}
					}
				}
			}
		}

		const doc = await db.find(table_doc, { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find(table_doc_detail, { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne(table_doc_his, { ...element, _id: null });
					await db.deleteOne(table_doc, element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	Product_document = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("Product_document", "定时器 > 历史任务 > 成品库出入库任务（单据表 + 收货表）");

		let doc_detail = "hk_product_doc_detail__c";
		let doc_detail_his = "hk_product_doc_detail_his__c";

		const docs = await db.find(doc_detail, {
			query: {
				$and: [{ document_type__c: { $in: ["生产入库单", "其他出库单", "需求出库单", "销售出库单"] } }, { status__c: "已完成" }],
			},
		});
		if (docs.length) {
			for (const element of docs) {
				if (element.document_type__c == "生产入库单") {
					const d1 = await db.find("hk_product_chuyu__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne("hk_product_chuyu_his__c", { ...item, _id: null });
							await db.deleteOne("hk_product_chuyu__c", item._id);
						}
					}
					await db.insertOne(doc_detail_his, { ...element, _id: null });
					await db.deleteOne(doc_detail, element._id);
				}
				if (["其他出库单", "需求出库单", "销售出库单"].includes(element.document_type__c)) {
					const d1 = await db.find("hk_product_pda_outgoing__c", { query: { doc_instruction__c: element.doc_instruction__c } });
					if (d1.length > 0) {
						for (const item of d1) {
							await db.insertOne("hk_product_pda_outgoing_his__c", { ...item, _id: null });
							await db.deleteOne("hk_product_pda_outgoing__c", item._id);
						}
					}
					await db.insertOne(doc_detail_his, { ...element, _id: null });
					await db.deleteOne(doc_detail, element._id);
				}
			}
		}

		const doc = await db.find("hk_product_doc__c", { query: {} });
		if (doc.length) {
			for (const element of doc) {
				const docD = await db.find("hk_product_doc_detail__c", { query: { document_id__c: element.document_id__c } });
				if (docD.length == 0) {
					await db.insertOne("hk_product_doc_his__c", { ...element, _id: null });
					await db.deleteOne("hk_product_doc__c", element._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	material_wms_wcs_task = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("material_wms_wcs_task", "定时器 > 历史任务 >  原料库： 出入库主任务 + 下发WCS");

		let ProductTask = "hk_mater_task__c";
		let ProductWcsTask = "hk_mater_wcs_task__c";

		let ProductTaskHis = "hk_mater_task_his__c";
		let ProductWcsTaskHis = "hk_mater_wcs_task_his__c";

		// 入库任务部分
		const docs1 = await db.find(ProductTask, { query: { cmdtype__c: "入库任务", status__c: "已完成" } });
		if (docs1.length) {
			for (const item of docs1) {
				const instruction__c = item.instruction__c;
				const Fdocs = await db.find(ProductWcsTask, { query: { instruction__c } });
				if (Fdocs.length) {
					await db.insertOne(ProductTaskHis, { ...item, _id: null });
					await db.deleteOne(ProductTask, item._id);

					const element = Fdocs[0];
					await db.insertOne(ProductWcsTaskHis, { ...element, _id: null });
					await db.deleteOne(ProductWcsTask, element._id);
				} else {
					await db.insertOne(ProductTaskHis, { ...item, _id: null });
					await db.deleteOne(ProductTask, item._id);
				}
			}
		}

		// 出库任务部分
		const docs2 = await db.find(ProductTask, {
			query: {
				$and: [{ cmdtype__c: { $in: ["出库任务", "移库任务"] } }, { send_wcs__c: "已下发WCS" }],
			},
		});
		if (docs2.length) {
			for (const item of docs2) {
				const instruction__c = item.instruction__c;

				const Fdocs = await db.find(ProductWcsTask, { query: { instruction__c } });
				if (Fdocs.length) {
					const allTrue = Fdocs.every(item => item.status__c === "任务已完成");
					if (allTrue) {
						await db.insertOne(ProductTaskHis, { ...item, _id: null });
						await db.deleteOne(ProductTask, item._id);

						for (const element of Fdocs) {
							await db.insertOne(ProductWcsTaskHis, { ...element, _id: null });
							await db.deleteOne(ProductWcsTask, element._id);
						}
					}
				} else {
					await db.insertOne(ProductTaskHis, { ...item, _id: null });
					await db.deleteOne(ProductTask, item._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};

	Product_wms_wcs_task = async (ctx: Context) => {
		const db = ctx.mongo;

		this.logTimerOnce("Product_wms_wcs_task", "定时器 > 历史任务 >  成品库： 出入库主任务 + 下发WCS");

		let ProductTask = "hk_product_task__c";
		let ProductWcsTask = "hk_product_wcs_task__c";

		let ProductTaskHis = "hk_product_task_his__c";
		let ProductWcsTaskHis = "hk_product_wcs_task_his__c";

		// 入库任务部分
		const docs1 = await db.find(ProductTask, { query: { cmdtype__c: "入库任务", status__c: "已完成" } });
		if (docs1.length) {
			for (const item of docs1) {
				const instruction__c = item.instruction__c;
				const Fdocs = await db.find(ProductWcsTask, { query: { instruction__c } });
				if (Fdocs.length) {
					await db.insertOne(ProductTaskHis, { ...item, _id: null });
					await db.deleteOne(ProductTask, item._id);

					const element = Fdocs[0];
					await db.insertOne(ProductWcsTaskHis, { ...element, _id: null });
					await db.deleteOne(ProductWcsTask, element._id);
				} else {
					await db.insertOne(ProductTaskHis, { ...item, _id: null });
					await db.deleteOne(ProductTask, item._id);
				}
			}
		}

		// 出库任务部分
		const docs2 = await db.find(ProductTask, {
			query: {
				$and: [{ cmdtype__c: { $in: ["出库任务", "移库任务"] } }, { send_wcs__c: "已下发WCS" }],
			},
		});

		if (docs2.length) {
			for (const item of docs2) {
				const instruction__c = item.instruction__c;

				const Fdocs = await db.find(ProductWcsTask, { query: { instruction__c } });
				if (Fdocs.length) {
					const allTrue = Fdocs.every(item => item.status__c === "任务已完成");
					if (allTrue) {
						await db.insertOne(ProductTaskHis, { ...item, _id: null });
						await db.deleteOne(ProductTask, item._id);

						for (const element of Fdocs) {
							await db.insertOne(ProductWcsTaskHis, { ...element, _id: null });
							await db.deleteOne(ProductWcsTask, element._id);
						}
					}
				} else {
					await db.insertOne(ProductTaskHis, { ...item, _id: null });
					await db.deleteOne(ProductTask, item._id);
				}
			}
		}

		return ctx.send({ success: true, message: "OK" });
	};
}

export default new App();
