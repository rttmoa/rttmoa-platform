import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time, time_horizontal } from "@/src/utils";
const path = require("path");
const fs = require("fs");

class App extends Basic {
	constructor() {
		super();
	}

	global_warehouse_info = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("hk_main_warehouse__c", { query: {} });
		// console.log("data", data);
		console.log("调用SAP仓库信息接口");

		return ctx.send({ success: true, message: `成功：数据处理完成`, data: data });
		let dataR = {
			code: 200,
			msg: "请求成功",
			data: {
				success: true,
				message: "成功：数据处理完成",
				data: [
					{
						_id: "6a0876f107652002d45bb8a9",
						factory__c: "7600",
						area_code__c: "7601",
						area__c: "原料一号冻库",
						space: "61c51b8f4cada30031994f3d",
						created_by: "63dc7de4902db72a48e718f2",
						owner: "63dc7de4902db72a48e718f2",
						created: "2026-05-16T13:53:53.514Z",
					},
				],
			},
		};
	};

	global_material = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("hk_main_mater_data__c", { query: {} });
		// console.log("data", data);
		console.log("调用SAP仓库信息接口");

		return ctx.send({ success: true, message: `成功：数据处理完成`, data: data });
		let dataR = {
			code: 200,
			msg: "请求成功",
			data: {
				success: true,
				message: "成功：数据处理完成",
				data: [
					{
						_id: "6a2fc9f405b8afa85f718d45",
						time__c: "2026/06/15 17:46:28",
						factory__c: "7600",
						material_code__c: "10001",
						material_name__c: "百味鸡",
						unit__c: "KG",
						material_type__c: "Z001",
						mhdrz__c: "1",
						mhdhb__c: "365",
						space: "61c51b8f4cada30031994f3d",
						created_by: "63dc7de4902db72a48e718f2",
						owner: "63dc7de4902db72a48e718f2",
						created: "2026-06-15T09:46:28.244Z",
					},
					{
						_id: "6a2fc9f405b8afa85f718d46",
						time__c: "2026/06/15 17:46:28",
						factory__c: "7600",
						material_code__c: "10002",
						material_name__c: "紫燕鹅",
						unit__c: "KG",
						material_type__c: "Z001",
						mhdrz__c: "1",
						mhdhb__c: "365",
						space: "61c51b8f4cada30031994f3d",
						created_by: "63dc7de4902db72a48e718f2",
						owner: "63dc7de4902db72a48e718f2",
						created: "2026-06-15T09:46:28.245Z",
					},
					{
						_id: "6a2fc9f405b8afa85f718d47",
						time__c: "2026/06/15 17:46:28",
						factory__c: "7600",
						material_code__c: "10004",
						material_name__c: "藤椒鸡",
						unit__c: "KG",
						material_type__c: "Z001",
						mhdrz__c: "1",
						mhdhb__c: "365",
						space: "61c51b8f4cada30031994f3d",
						created_by: "63dc7de4902db72a48e718f2",
						owner: "63dc7de4902db72a48e718f2",
						created: "2026-06-15T09:46:28.245Z",
					},
					{
						_id: "6a2fc9f405b8afa85f718d48",
						time__c: "2026/06/15 17:46:28",
						factory__c: "7600",
						material_code__c: "10005",
						material_name__c: "香酥鸭",
						unit__c: "KG",
						material_type__c: "Z001",
						mhdrz__c: "1",
						mhdhb__c: "730",
						space: "61c51b8f4cada30031994f3d",
						created_by: "63dc7de4902db72a48e718f2",
						owner: "63dc7de4902db72a48e718f2",
						created: "2026-06-15T09:46:28.245Z",
					},
				],
			},
		};
	};

	global_cost_center = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("hk_main_cost_center__c", { query: {} });
		// console.log("data", data);

		return ctx.send({ success: true, message: `成功：数据处理完成`, data: data });
		let dataR = {
			code: 200,
			msg: "请求成功",
			data: {
				success: true,
				message: "成功：数据处理完成",
				data: [
					{
						_id: "6a2fca0005b8afa85f719bc8",
						time__c: "2026/06/15 17:46:40",
						department_code__c: "76080000",
						factory__c: "7600",
						department__c: "海南云紫采购部",
						space: "61c51b8f4cada30031994f3d",
						created_by: "63dc7de4902db72a48e718f2",
						owner: "63dc7de4902db72a48e718f2",
						created: "2026-06-15T09:46:40.331Z",
					},
				],
			},
		};
	};

	global_latest_Batch = async (ctx: Context) => {
		const db = ctx.mongo;

		// const today = new Date();
		// const dateStr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
		// console.log('dateStr', dateStr); // 当前日期：dateStr 2026-06-28
		const dateStr = "2026-05-30";

		const batchDate = dateStr.replace(/-/g, "").slice(2);
		const data = await db.find("hk_main_global_batch__c", { query: { current_date__c: dateStr } });

		const maxQuantity = data.reduce((max: number, item: any) => {
			const quantity = Number(item?.quantity__c || 0);
			return quantity > max ? quantity : max;
		}, 0);
		const nextQuantity = maxQuantity + 1;
		const latestBatch = `${batchDate}${String(nextQuantity).padStart(4, "0")}`;

		const insertData = {
			time__c: time(),
			current_date__c: dateStr,
			latest_batch__c: latestBatch,
			quantity__c: nextQuantity,
		};

		await db.insertOne("hk_main_global_batch__c", insertData);

		return ctx.send({ success: true, message: `成功：数据处理完成`, data: insertData });
	};

	Common_global_latest_Batch = async (ctx: Context, date: string, desc: string) => {
		const db = ctx.mongo;

		// const today = new Date();
		// const dateStr =  today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
		const dateStr = date;
		const batchDate = dateStr.replace(/-/g, "").slice(2);
		const data = await db.find("hk_main_global_batch__c", { query: { current_date__c: dateStr } });

		const maxQuantity = data.reduce((max: number, item: any) => {
			const quantity = Number(item?.quantity__c || 0);
			return quantity > max ? quantity : max;
		}, 0);
		const nextQuantity = maxQuantity + 1;
		const latestBatch = `${batchDate}${String(nextQuantity).padStart(4, "0")}`;

		const insertData = {
			time__c: time(),
			current_date__c: dateStr,
			latest_batch__c: latestBatch,
			quantity__c: nextQuantity,
			desc__c: desc || "",
		};

		await db.insertOne("hk_main_global_batch__c", insertData);

		return { insertData };

		// batch_data {
		// 	insertData: {
		// 		time__c: '2026/06/10 11:30:10',
		// 		current_date__c: '2026-06-10',
		// 		latest_batch__c: '2606100001',
		// 		quantity__c: 1,
		// 		_id: '6a28da42e142cba65eff939c'
		// 	}
		// }
	};

	global_handle_field = async (ctx: Context) => {
		const db = ctx.mongo;

		const data: any = ctx.request.body;
		console.log("data", data);

		const delTableName = data?.table;

		const objects = await db.find("objects", { query: { name: delTableName } }); // 表名 + 表
		// node.warn(objects);

		let tableName = objects[0].label;

		const object_fields = await db.find("object_fields", { query: { object: delTableName } }); // 对象下所有字段：文本字段、数字字段、选择框字段

		const object_listviews = await db.find("object_listviews", { query: { object_name: delTableName } }); // 对象的列表视图、字段显示

		let addArr = [];
		for (const item of object_listviews) {
			if (item.label == "所有") {
				const columns = item.columns;
				for (const col of columns) {
					const col_field = col.field;
					const col_width = col.width;
					const find_object_field = object_fields.filter(v => v.name == col_field);
					if (find_object_field.length) {
						const item_field = find_object_field[0];

						let type = "";
						if (item_field.type == "text") {
							type = "string";
						} else {
							type = item_field.type;
						}

						let options = [];
						if (item_field.type == "select") {
							options = item_field.options;
						}
						addArr.push({
							name: item_field.name,
							label: item_field.label,
							type: type,
							width: col_width || null,
							options,
							query: true,
							editable: true,
						});
					}
				}
			}
		}

		let o = addArr.reduce((acc: any, item) => {
			let { name, width, options, ...rest } = item;
			let current: any = { ...rest };

			if (width != null) {
				current.width = Number(width);
			}

			if (Array.isArray(options) && options.length > 0) {
				current.options = options.map(({ _id, color, ...optionRest }) => ({
					...optionRest,
					...(color ? { color: color.startsWith("#") ? color : `#${color}` } : {}),
				}));
			}

			acc[name] = current;
			return acc;
		}, {});

		// node.warn(o);

		return ctx.send({
			label: tableName,
			FieldSchema: o,
		});
	};
}

export default new App();
