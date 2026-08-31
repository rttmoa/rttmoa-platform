import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time } from "@/src/utils";
import mssql from "mssql";

class App extends Basic {
	constructor() {
		super();
	}

	Generate_Sale_Out = async (ctx: Context) => {
		const data: any = ctx.request.body;

		console.log(123);

		const doc =
			Array.isArray(data) && data.length
				? data
				: Array.isArray(data?.doc) && data.doc.length
					? data.doc
					: [
							{
								document_id__c: "XSCK260529CQZC",
								deliver_id__c: "32929799",
								out_date__c: "2026/5/29",
								document_type__c: "销售出库",
								tariff_status__c: "非保税",
								customer_name__c: "重庆紫川食品有限公司",
								receiver__c: "兰俊宜",
								phone__c: "18384229774",
								material_code__c: "16949",
								material_name__c: "海南夫妻肺片（牛肉）",
								specifications__c: "计量称重",
								quantity__c: "2978.994",
								unit__c: "KG",
								piece__c: "186",
								production_date__c: "2026/5/28",
								shelf_life__c: "30",
								expired_date__c: "2026/6/27",
								storage_way__c: "冷藏",
								area__c: "成品冷藏库",
							},
						];

		const first = doc[0] || {};
		const detailRows = [...doc.slice(0, 10), ...Array(Math.max(10 - doc.length, 0)).fill({})];
		const totalQuantity = doc.reduce((sum: number, item: any) => sum + (Number(item.quantity__c) || 0), 0);
		const totalPiece = doc.reduce((sum: number, item: any) => sum + (Number(item.piece__c) || 0), 0);
		const escapeHtml = (value: any) => String(value ?? "").replace(/[&<>'"]/g, (s: string) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[s] as string);
		const rowsHtml = detailRows
			.map(
				(item: any, index: number) => `
				<tr>
					<td class="seq">${index + 1}</td>
					<td>${escapeHtml(item.material_code__c)}</td>
					<td class="name">${escapeHtml(item.material_name__c)}</td>
					<td>${escapeHtml(item.specifications__c)}</td>
					<td>${escapeHtml(item.quantity__c)}</td>
					<td>${escapeHtml(item.unit__c)}</td>
					<td>${escapeHtml(item.piece__c)}</td>
					<td>${escapeHtml(item.production_date__c)}</td>
					<td>${escapeHtml(item.shelf_life__c)}</td>
					<td>${escapeHtml(item.expired_date__c)}</td>
					<td>${escapeHtml(item.storage_way__c)}</td>
					<td>${escapeHtml(item.area__c)}</td>
				</tr>`
			)
			.join("");

		const html = `<!DOCTYPE html>
										<html lang="zh-CN">
										<head>
											<meta charset="UTF-8" />
											<title>调拨出库单</title>
											<style>
												@page { size: 21.5cm 14cm; margin: 0; }
												* { box-sizing: border-box; }
												body { margin: 0; color: #000; font-family: SimSun, "宋体", serif; background: #fff; }
												.print-sheet { width: 21.5cm; height: 14cm; padding: 0.24cm 0.46cm 0.2cm; overflow: hidden; }
												.company { text-align: center; font-size: 18px; font-weight: 700; line-height: 24px; letter-spacing: 2px; }
												.title { text-align: center; font-size: 20px; font-weight: 700; line-height: 28px; letter-spacing: 3px; margin-bottom: 0.12cm; }
												.info { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 13px; margin-bottom: 0.1cm; }
												.info td { height: 0.45cm; padding: 0 4px; vertical-align: middle; white-space: nowrap; }
												.info .label { width: 2.2cm; font-weight: 700; text-align: right; }
												.info .value { width: 4.25cm; font-weight: 700; }
												.info .tip { text-align: center; font-weight: 700; }
												.detail { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }
												.detail th, .detail td { border: 1px solid #000; height: 0.68cm; padding: 1px 3px; text-align: center; vertical-align: middle; word-break: break-all; }
												.detail th { font-weight: 700; height: 0.48cm; }
												.detail .seq { width: 0.72cm; }
												.detail .name { text-align: center; }
												.detail col:nth-child(1) { width: 0.72cm; }
												.detail col:nth-child(2) { width: 1.35cm; }
												.detail col:nth-child(3) { width: 2.78cm; }
												.detail col:nth-child(4) { width: 1.22cm; }
												.detail col:nth-child(5) { width: 1.65cm; }
												.detail col:nth-child(6) { width: 1.2cm; }
												.detail col:nth-child(7) { width: 1.95cm; }
												.detail col:nth-child(8) { width: 1.65cm; }
												.detail col:nth-child(9) { width: 1.25cm; }
												.detail col:nth-child(10) { width: 1.62cm; }
												.detail col:nth-child(11) { width: 1.48cm; }
												.detail col:nth-child(12) { width: 1.48cm; }
												.total td { height: 0.62cm; font-weight: 700; }
												.total-label { text-align: center; letter-spacing: 2px; }
												.footer { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; align-items: end; height: 1.28cm; padding: 0 0.42cm; font-size: 13px; font-weight: 700; }
												@media print { body { width: 21.5cm; height: 14cm; } .print-sheet { page-break-after: always; } }
											</style>
										</head>
										<body>
											<div class="print-sheet">
												<div class="company">海南云紫食品有限公司</div>
												<div class="title">调拨出库单</div>
												<table class="info">
													<tr>
														<td class="label">出库单号：</td><td class="value">${escapeHtml(first.document_id__c)}</td>
														<td class="label">交货单号：</td><td class="value">${escapeHtml(first.deliver_id__c)}</td>
														<td class="label">出库日期：</td><td class="value">${escapeHtml(first.out_date__c)}</td>
													</tr>
													<tr>
														<td class="label">出库类型：</td><td class="value">${escapeHtml(first.document_type__c)}</td>
														<td class="label">关税状态：</td><td class="value">${escapeHtml(first.tariff_status__c)}</td>
														<td class="label">客户名称：</td><td class="value">${escapeHtml(first.customer_name__c)}</td>
													</tr>
													<tr>
														<td class="label">收货联系人：</td><td class="value">${escapeHtml(first.receiver__c)}</td>
														<td class="label">联系电话：</td><td class="value">${escapeHtml(first.phone__c)}</td>
														<td class="tip" colspan="2">请司机师傅先联系收货人预约时间，谢谢！</td>
													</tr>
												</table>
												<table class="detail">
													<colgroup><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/></colgroup>
													<thead>
														<tr>
															<th>序号</th><th>物料编码</th><th>物料名称</th><th>规格</th><th>出库数量</th><th>单位</th><th>出库件数</th><th>生产日期</th><th>保质期</th><th>过期时间</th><th>存储方式</th><th>出库仓库</th>
														</tr>
													</thead>
													<tbody>${rowsHtml}
														<tr class="total">
															<td colspan="4" class="total-label">合计重量</td>
															<td>${totalQuantity ? totalQuantity.toFixed(3) : ""}</td>
															<td>KG</td>
															<td>${totalPiece || ""}</td>
															<td colspan="5"></td>
														</tr>
													</tbody>
												</table>
												<div class="footer">
													<div>制单人：杜安成</div>
													<div>发货确认：杜安成</div>
													<div>调出仓签字：</div>
													<div>调入仓确认：</div>
												</div>
											</div>
											<script>window.onload = function () { window.print(); };</script>
										</body>
										</html>`;

		const isPreview = String(ctx.query.preview || ctx.request.body?.preview || "") === "1";
		if (isPreview) {
			ctx.type = "html";
			ctx.body = html;
			return;
		}

		ctx.body = {
			success: true,
			message: "成功：单据生成完成",
			data: {
				html,
			},
		};
		return;
		return ctx.send({ success: true, message: `成功：单据生成完成`, data: html });
	};

	ByPalletGetChuYuHandle = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		try {
			const sqlConfig = {
				user: "sa", // SQL Server 用户名
				password: "12345678", // SQL Server 密码
				server: "10.30.41.77", // SQL Server 服务器地址
				database: "StoreSystem", // 你想连接的数据库名
				encrypt: false,
			};

			// SQL Server 连接
			async function connectSQLServer() {
				try {
					await mssql.connect(sqlConfig);
					console.log("已连接到初禹 SqlServer!");
				} catch (err: any) {
					console.error("未能连接到初禹 SqlServer:", err.message);
				}
			}
			await connectSQLServer();

			// 示例：从 SQL Server 获取数据
			async function fetchSQLData(pallet: string) {
				try {
					let initArr = [];
					const result = await mssql.query`SELECT * FROM PalletMessageS WHERE  PalletID=${pallet}`;
					const d1 = result?.recordset || [];
					console.log("Users from SQL Server:", d1);
					if (d1.length) {
						const data1 = await db.find("hk_freezing_stock_detail_barcode__c", { query: { pallet__c: pallet } });
						if (data1.length) {
							let totalWeight = 0;
							for (const element of d1) {
								const barcode = String(element?.Barcode || "");
								const weightStr = String(barcode.substring(5, 10));
								let weight = Number(`${weightStr.substring(0, 2)}.${weightStr.substring(2)}`);
								console.log("weight", weight);
								totalWeight += weight;
								const find1 = data1.filter(v => v.barcode__c == barcode);
								if (find1.length) {
									// await db.updateOne("hk_freezing_stock_detail_barcode__c", find1[0]._id, { weight__c: weight });
								}
							}
							console.log("totalWeight", totalWeight);
							const data2 = await db.find("hk_freezing_stock_detail__c", { query: { pallet__c: pallet } });
							if (data2.length) {
								// await db.updateOne("hk_freezing_stock_detail__c", data2[0]._id, {
								// 	weight__c: totalWeight,
								// 	final_weight__c: totalWeight,
								// });
							}
						}

						const data3 = await db.find("hk_chilled_stock_detail_barcode__c", { query: { pallet__c: pallet } });
						if (data3.length) {
							let totalWeight = 0;
							for (const element of d1) {
								const barcode = String(element?.Barcode || "");
								const weightStr = String(barcode.substring(5, 10));
								let weight = Number(`${weightStr.substring(0, 2)}.${weightStr.substring(2)}`);
								console.log("weight", weight);
								totalWeight += weight;
								const find1 = data3.filter(v => v.barcode__c == barcode);
								if (find1.length) {
									// await db.updateOne("hk_chilled_stock_detail_barcode__c", find1[0]._id, { weight__c: weight });
								}
							}
							console.log("totalWeight", totalWeight);
							const data4 = await db.find("hk_chilled_stock_detail__c", { query: { pallet__c: pallet } });
							if (data4.length) {
								// await db.updateOne("hk_chilled_stock_detail__c", data4[0]._id, {
								// 	weight__c: totalWeight,
								// 	final_weight__c: totalWeight,
								// });
							}
						}
					}
				} catch (err: any) {
					console.error("Error fetching data from SQL Server:", err.message);
				}
			}
			const result: any = await fetchSQLData("P1");
			return result || [];
			return ctx.send({ success: true, message: `成功：数据处理完成` });
		} catch (err: any) {
			return ctx.sendError(500, err.message || "服务器错误");
		}
	};
}

export default new App();
