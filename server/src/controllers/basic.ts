/* eslint-disable no-inner-declarations */
import { Context } from "koa";
import { config } from "../config/config";
import _ from "lodash";
import { FieldSchema } from "../types/schema";

class Basic {
	constructor() {}

	async getUserById(id: string, ctx: Context) {
		try {
			const userInfo = await ctx.mongo.find("__user_manage", { query: { _id: id } });
			if (userInfo.length) return userInfo[0];
			else return null;
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// * 初始化 __schema  以及转换 __schema 展示前端表格字段以及表头字段
	InitSchema = async (ctx: Context, tableName: string, FieldSchema: Object) => {
		const schema = await ctx.mongo.find("__schema", { query: { object: tableName } });
		if (schema.length == 0) {
			let sort: number = 1;
			const SchemaConfig: any = FieldSchema;
			for (const key in SchemaConfig) {
				const sObject = SchemaConfig[key];
				await ctx.mongo.insert("__schema", {
					object: tableName,
					name: key,
					label: sObject?.label || null,
					type: sObject?.type || null,
					query: sObject?.query || null,
					editable: sObject?.editable || null,
					width: sObject?.width || null,
					options: sObject?.options || null,
					sort: sort++,
				});
			}
			const Init_schema = await ctx.mongo.find("__schema", { query: { object: tableName } });
			const data = Init_schema.slice()
				.sort((a, b) => a.sort - b.sort)
				.reduce((obj, item) => {
					const { _id, object, name, label, type, query, editable, width, options } = item;
					obj[name] = {
						_id,
						object,
						label,
						type,
						query,
						editable,
						...(width != null ? { width } : {}),
						...(options != null ? { options } : {}),
					};
					return obj;
				}, {});
			return data;
		} else {
			const data = schema
				.slice()
				.sort((a, b) => a.sort - b.sort)
				.reduce((obj, item) => {
					const { _id, object, name, label, type, query, editable, width, options } = item;
					obj[name] = {
						_id,
						object,
						label,
						type,
						query,
						editable,
						...(width != null ? { width } : {}),
						...(options != null ? { options } : {}),
					};
					return obj;
				}, {});
			return data;
		}
	};

	// 传递表名，获取表的列表视图字段，代替 this.FieldSchema{} 对象
	Query_FieldSchema = async (ctx: Context, table_name: string) => {
		const db = ctx.mongo;

		const delTableName = table_name;

		const objects = await db.find("objects", { query: { name: delTableName } }); // 表名 + 表

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
		return { FieldSchema: o };
		return ctx.send({
			label: tableName,
			FieldSchema: o,
		});
	};

	// * 查询时处理query查询条件（优化）
	QueryFilter = (data: any, FieldSchema: FieldSchema) => {
		const query: Record<string, any> = {};
		const search = _.get(data, "search", {});

		Object.entries(FieldSchema).forEach(([field, config]) => {
			if (!config.query) return; // 不参与查询

			const value = search[field];
			if (value === undefined || value === null || value === "") return;

			// 如果是字符串
			if (config.type == "string") {
				query[field] = { $regex: _.trim(value), $options: "i" };
			}
			// 如果是数字：搜索数字类型
			if (config.type == "number") {
				// "2-20"
				if (_.isString(value) && value.includes("-")) {
					const [min, max] = value.split("-").map((n: any) => _.toNumber(n));
					query[field] = { $gte: min, $lte: max };
				}

				// [2,20]
				if (_.isArray(value) && value.length === 2) {
					query[field] = { $gte: _.toNumber(value[0]), $lte: _.toNumber(value[1]) };
				}

				// 单个数字 20
				const num = _.toNumber(value);
				if (!_.isNaN(num)) query[field] = num;
			}
			// 如果是日期：传递的是时间戳
			if (config.type == "date") {
				if (!Array.isArray(value) || value.length !== 2) return null;
				const [start, end] = value;

				if (_.isNumber(start) && _.isNumber(end)) {
					query[field] = { $gte: new Date(start), $lte: new Date(end) };
				}
			}
			// 如果是选择框
			if (config.type == "select") {
				query[field] = value; // 一般 select 精确匹配
			}
		});

		return query;
	};

	// * Add 新增或修改时（优化）
	addAndModField(data: any, FieldSchema: FieldSchema) {
		const doc: Record<string, any> = {};

		// ①先处理用户提交的数据 → 转换格式
		for (const field in FieldSchema) {
			const cfg: any = FieldSchema[field];
			const val = data[field];
			  
			if (val === undefined || val === null) continue; // 结束本次循环

			switch (cfg.type) {
				case "string":
					doc[field] = String(val).trim();
					break;
				case "number":
					if (!isNaN(val)) doc[field] = val;
					break;
				case "date": {
					const d: any = new Date(val);
					if (!isNaN(d.getTime())) doc[field] = d;
					break;
				}
				case "select": {
					if (cfg.options.map((v: any) => v?.value).includes(val)) {
						doc[field] = val;
					}
					break;
				}
				default:
					break;
			}
		}
		// ②处理 schema.sync —— 自动字段映射
		for (const field in FieldSchema) {
			const cfg = FieldSchema[field];

			if (!cfg.sync) continue;

			// sync = "product_name__c" || 名称
			if (typeof cfg.sync === "string") {
				doc[field] = data[cfg.sync] ?? "名称";
			}
		}

		return doc;
	}

	// 新增或编辑时
	// private addAndModifyField = (data: any) => {
	// 	return {
	// 		postCode: this.normalize(data?.postName, ['string'], null),
	// 		postName: this.normalize(data?.postName, ['string'], null), // 产品经理 | 前端开发 | 会计
	// 		postSort: this.normalize(data?.postSort, ['number'], 1), // 排序
	// 		status: this.normalize(data?.status, ['string'], null), // 开关：开启/关闭
	// 		desc: this.normalize(data?.desc, ['string'], null),
	// 		flag: false,
	// 	};
	// };
	normalize(value: any, types: Array<"string" | "number" | "array" | "boolean">, defaultValue: any = null) {
		if (_.isNil(value)) return defaultValue;

		// 如果支持 number 类型
		if (types.includes("number")) {
			if (value === 0 || value === "0") return 0;
			const num = _.toNumber(value);
			if (!_.isNaN(num)) return num;
		}

		// 如果支持 boolean 类型
		if (types.includes("boolean")) {
			if (_.isBoolean(value)) return value;
			if (_.isString(value)) {
				const lower = value.toLowerCase();
				if (["true", "1", "yes"].includes(lower)) return true;
				if (["false", "0", "no"].includes(lower)) return false;
			}
			if (_.isNumber(value)) {
				if (value === 1) return true;
				if (value === 0) return false;
			}
		}

		// 如果支持 string 类型
		if (types.includes("string")) {
			const str = _.trim(_.toString(value));
			if (!_.isEmpty(str)) return str;
		}
		if (types.includes("array")) {
			if (_.isArray(value)) {
				return value.length === 0 ? defaultValue : value;
			}
			// 如果传的是字符串（用逗号分隔），也转成数组
			if (_.isString(value)) {
				const arr = _.compact(value.split(",").map((v: any) => _.trim(v)));
				return arr.length === 0 ? defaultValue : arr;
			}
			return defaultValue;
		}
		return defaultValue;
	}

	// 失效：封装通用处理函数
	async handle(ctx: Context, handler: (ctx: Context) => Promise<any>) {
		try {
			function mapStatusCode(message: string = ""): number {
				if (message.includes("成功")) return 200;
				if (message.includes("失败")) return 500;
				return 0;
			}
			// throw new Error("数据拦截、返回失败信息")
			const response = await handler(ctx);
			response.statusCode = mapStatusCode(response.message); // 根据message、返回状态码
			return ctx.send(response);

			// 返回值格式：ProTable—request的格式
			// 新：return { message: "获取数据成功", list: result, current: param.current, pageSize: param.pageSize, total: result.length};
			// 原：return ctx.send([], undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
			// return { message: deleteRes ? "删除成功" : "删除失败" };
		} catch (err: any) {
			// console.log('user error info: ', err.message);
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}
export default Basic;
