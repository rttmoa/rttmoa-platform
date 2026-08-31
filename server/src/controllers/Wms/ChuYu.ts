import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time, time_horizontal } from "@/src/utils";
import mssql from "mssql";
const path = require("path");
const fs = require("fs");

class App extends Basic {
	constructor() {
		super();
	}

	ByPalletGetChuYu = async (ctx: Context) => {
		const db = ctx.mongo;
		const data: any = ctx.request.body;
		try {
			// SQL Server 连接配置
			// // connectionString="data source=127.0.0.1;initial catalog=StoreSystem;persist security info=True;user id=sa;password=12345678;
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
						for (const element of d1) {
							const result2 = await mssql.query`SELECT TOP 1000 [ID], [ProductName], [ProductCode], [Describe] FROM [StoreSystem].[dbo].[Products] WHERE ID = ${element.nProduct_ID}`;
							const d2 = result2?.recordset || [];
							console.log("result2", d2);
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
					// if (d1.length) {
					// 	const data1 = await db.find("hk_freezing_stock_detail_barcode__c", { query: { pallet__c: pallet } });
					// 	if (data1.length) {
					// 		let totalWeight = 0;
					// 		for (const element of d1) {
					// 			const barcode = String(element?.Barcode || "");
					// 			const weightStr = String(barcode.substring(5, 10));
					// 			let weight = Number(`${weightStr.substring(0, 2)}.${weightStr.substring(2)}`);
					// 			console.log("weight", weight);
					// 			totalWeight += weight;
					// 			const find1 = data1.filter(v => v.barcode__c == barcode);
					// 			if (find1.length) {
					// 				// await db.updateOne("hk_freezing_stock_detail_barcode__c", find1[0]._id, { weight__c: weight });
					// 			}
					// 		}
					// 		console.log("totalWeight", totalWeight);
					// 		const data2 = await db.find("hk_freezing_stock_detail__c", { query: { pallet__c: pallet } });
					// 		if (data2.length) {
					// 			// await db.updateOne("hk_freezing_stock_detail__c", data2[0]._id, {
					// 			// 	weight__c: totalWeight,
					// 			// 	final_weight__c: totalWeight,
					// 			// });
					// 		}
					// 	}

					// 	const data3 = await db.find("hk_chilled_stock_detail_barcode__c", { query: { pallet__c: pallet } });
					// 	if (data3.length) {
					// 		let totalWeight = 0;
					// 		for (const element of d1) {
					// 			const barcode = String(element?.Barcode || "");
					// 			const weightStr = String(barcode.substring(5, 10));
					// 			let weight = Number(`${weightStr.substring(0, 2)}.${weightStr.substring(2)}`);
					// 			console.log("weight", weight);
					// 			totalWeight += weight;
					// 			const find1 = data3.filter(v => v.barcode__c == barcode);
					// 			if (find1.length) {
					// 				// await db.updateOne("hk_chilled_stock_detail_barcode__c", find1[0]._id, { weight__c: weight });
					// 			}
					// 		}
					// 		console.log("totalWeight", totalWeight);
					// 		const data4 = await db.find("hk_chilled_stock_detail__c", { query: { pallet__c: pallet } });
					// 		if (data4.length) {
					// 			// await db.updateOne("hk_chilled_stock_detail__c", data4[0]._id, {
					// 			// 	weight__c: totalWeight,
					// 			// 	final_weight__c: totalWeight,
					// 			// });
					// 		}
					// 	}
					// }
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

	ChuyuDataStore = () => {
		let ChuyuData = [
			{
				ID: "295191",
				PalletID: "CP7625090631",
				Barcode: "16988220140101260531193705920000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:37:45.367Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295192",
				PalletID: "CP7625090631",
				Barcode: "16988205340101260531193729930000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:38:01.650Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295193",
				PalletID: "CP7625090631",
				Barcode: "16988218540101260531194033940000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:41:01.907Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295194",
				PalletID: "CP7625090631",
				Barcode: "16988199840101260531194059950000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:41:28.270Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295195",
				PalletID: "CP7625090631",
				Barcode: "16988207090101260531194131960000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:41:59.673Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295196",
				PalletID: "CP7625090631",
				Barcode: "16988224340101260531194223970000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:42:51.900Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295197",
				PalletID: "CP7625090631",
				Barcode: "16988213590101260531194247980000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:43:16.407Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295198",
				PalletID: "CP7625090631",
				Barcode: "16988201140101260531194316990000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:43:45.547Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295199",
				PalletID: "CP7625090631",
				Barcode: "16988216590101260531194346010000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:44:15.483Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295200",
				PalletID: "CP7625090631",
				Barcode: "16988222640101260531194446020000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:45:15.497Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295201",
				PalletID: "CP7625090631",
				Barcode: "16988205390101260531194515030000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:45:44.500Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295202",
				PalletID: "CP7625090631",
				Barcode: "16988210990101260531194534040000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:46:03.917Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295203",
				PalletID: "CP7625090631",
				Barcode: "16988207540101260531194601050000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:46:29.860Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295204",
				PalletID: "CP7625090631",
				Barcode: "16988216390101260531194630060000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:46:59.047Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295205",
				PalletID: "CP7625090631",
				Barcode: "16988216840101260531194721070000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:47:49.850Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295206",
				PalletID: "CP7625090631",
				Barcode: "16988229590101260531194803080000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:48:32.557Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295207",
				PalletID: "CP7625090631",
				Barcode: "16988224690101260531194837090000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:50:05.113Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295208",
				PalletID: "CP7625090631",
				Barcode: "16988231140101260531194951100000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:50:56.563Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295209",
				PalletID: "CP7625090631",
				Barcode: "16988201790101260531195017110000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:51:12.640Z",
				nProduct_ID: "10006",
			},
			{
				ID: "295210",
				PalletID: "CP7625090631",
				Barcode: "16988212940101260531195034120000",
				Statuas: 4,
				BoxStamp: "2026-05-31T19:53:39.820Z",
				nProduct_ID: "10006",
			},
		];

		const bodyData: any = {};

		try {
			// 保存数据出错、不影响后续程序执行！
			const pallet_id = String(ChuyuData[0].PalletID); // 文件名：托盘号
			const storeContent = ChuyuData; // 需要存储的数据
			const filename = `${time_horizontal()}_${ChuyuData || ""}.json`; // 文件名：时间+托盘号
			const filePath = path.join("D:", "api_accept_Chuyu", filename); // 文件夹名
			const dir = path.dirname(filePath);
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir, { recursive: true });
			}
			const dataToSave = JSON.stringify(storeContent, null, 2);
			fs.writeFileSync(filePath, dataToSave, "utf8");
		} catch (error: any) {
			console.error("保存数据时出错:", error);
		}

		console.log(123);
	};
}

export default new App();
