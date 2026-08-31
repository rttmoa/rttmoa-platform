import { Context } from "koa";
import { config } from "../../config/config";
import { options } from "axios";
import Basic from "../basic";

class App extends Basic {
	constructor() {
		super();
	}

	// * 表格：列表视图设置
	TableListView = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			console.log("data", data);

			let data2: any = {
				columns: [
					{
						_id: "6a473f9ebe3ac748fe89e125",
						object: "hk_mater_barcode_rule__c",
						display: true,
						name: "factory_no__c",
						label: "厂号",
						width: 120,
						query: true,
						editable: true,
						sort: 1,
					},
					{
						_id: "6a473f9ebe3ac748fe89e124",
						object: "hk_mater_barcode_rule__c",
						display: true,
						name: "country__c",
						label: "国家",
						width: 240,
						query: true,
						editable: true,
						sort: 2,
					},
				],
				sortRules: [],
			};

			if (data) {
				const columnsConfig = data?.columns;
				const sortRules = data?.sortRules;
				// console.log('columnsConfig', columnsConfig);
				// return ctx.send({ success: false, message: "提交数据失败！" });


				const object_name = data?.columns?.[0]?.object;
				const ObjectName = await ctx.mongo.find("__schema", { query: { object: object_name } });
				// console.log("ObjectName", ObjectName);
				for (const element of ObjectName) {
					await ctx.mongo.deleteOne("__schema", element._id);
				}

				for (const element of columnsConfig) {
					await ctx.mongo.insert("__schema", {
						object: object_name,
						name: element.name,
						label: element.label,
						width: element?.width || null,
						type: element.type || null,
						query: element.query,
						editable: element.editable,
						options: element?.options || null,
						sort: element?.sort,
					});
				}
				return ctx.send({ success: true, message: "列表视图处理成功！" });
			} else {
				return ctx.send({ success: false, message: "提交数据失败！" });
			}

			// const result = await ctx.mongo.find("nb_storage_shelf__c", { query: {} });
			// const stock = await ctx.mongo.find("nb_storage_shelf__c", { query: {zone__c: data.zone__c} });

			return ctx.send({ success: false, message: "ok" });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * 表格：列表视图 初始化
	TableListView_Init = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			console.log("data", data); // data { object: 'hk_mater_barcode_rule__c' }
 
			if (data) {
				const object = data?.object;
				if (!object) return ctx.send({ success: false, message: "缺少 object 参数" });
				const ObjectName = await ctx.mongo.find("__schema", { query: { object: object } });
				for (const element of ObjectName) {
					await ctx.mongo.deleteOne("__schema", element._id);
				}

				const { FieldSchema }: any = await this.Query_FieldSchema(ctx, object);
				let sort = 1;
				for (const [name, item] of Object.entries(FieldSchema || {}) as any) {
					await ctx.mongo.insert("__schema", {
						object,
						name,
						label: item?.label || null,
						type: item?.type || null,
						width: item?.width || null,
						query: item?.query,
						editable: item?.editable,
						options: item?.options || null,
						sort: sort++,
					});
				}

				return ctx.send({ success: true, message: "列表视图处理成功！" });
			} else {
				return ctx.send({ success: false, message: "提交数据失败！" });
			}
  
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};
}

export default new App();
