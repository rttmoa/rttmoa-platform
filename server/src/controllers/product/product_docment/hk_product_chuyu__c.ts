import { Context } from "koa";
import Basic from "../../basic";
import { FieldSchema } from "../../../types/schema";
import _ from "lodash";

class App extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = "成品库初禹信息";
	private readonly Collection = "hk_product_chuyu__c";

	private FieldSchema: any = async (ctx: any) => {
		const { FieldSchema }: any = await this.Query_FieldSchema(ctx, this.Collection);
		return FieldSchema;
	};
	private TableOps = {
		allowCreate: true, // 新建
		allowEdit: true, // 编辑
		allowDelete: true, // 删除
		allowRowEdit: true, // 行编辑
		allowBatchDelete: true, // 批量删除
		allowBatchEdit: true, // 批量编辑
		allowImport: true, // 允许导入
	};

	Query = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;

			const query = this.QueryFilter(data, field_Schema);

			const hasPagination = _.has(data, 'pagination.page') && _.has(data, 'pagination.pageSize');
			const page = hasPagination ? _.clamp(_.toInteger(_.get(data, 'pagination.page')), 1, Number.MAX_SAFE_INTEGER) : undefined;
			const pageSize = hasPagination ? _.clamp(_.toInteger(_.get(data, 'pagination.pageSize')), 1, 100) : undefined;

			const sort = _.get(data, 'sort', { updateTime: -1, createTime: -1 });
			const findOptions: any = { query, sort };
			if (hasPagination) Object.assign(findOptions, { page, pageSize });

			const [count, list] = await Promise.all([ctx.mongo.count(this.Collection, query), ctx.mongo.find(this.Collection, findOptions)]);

			const schemaObject: FieldSchema = await this.InitSchema(ctx, this.Collection, field_Schema);
			const schema: any = { ...schemaObject, __ops__: this.TableOps };

			const tableInfo = { tableName: this.tableName, collection: this.Collection };
			return ctx.send({ list, page: page || 1, pageSize: pageSize || count, total: count, schema, init_schema: field_Schema, tableInfo });
		} catch (err: any) {
			return ctx.sendError(500, err.message || "服务器错误");
		}
	};

	Add = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;

			const doc = this.addAndModField(data, field_Schema);
			delete doc.lastModified;
			const ins = await ctx.mongo.insertOne(this.Collection, doc);
			return ctx.send("添加成功");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	Mod = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const id = ctx.params.id;
			if (!id) return ctx.sendError(400, `修改操作：无iD`);
			const data: any = ctx.request.body;
			const doc = this.addAndModField(data, field_Schema);
			delete doc.lastModified;
			await ctx.mongo.updateOne(this.Collection, id, doc);
			return ctx.send("修改成功");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	ImportEx = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const element of data) {
					const doc = this.addAndModField(element, field_Schema);
					await ctx.mongo.insertOne(this.Collection, doc);
				}
				return ctx.send("数据导入成功");
			} else return ctx.sendError(400, `服务端未获取到数据`);
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	Del = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			if (id) {
				const docs = await ctx.mongo.find(this.Collection, { query: { _id: id } });
				if (docs.length) {
					await ctx.mongo.deleteOne(this.Collection, docs[0]._id);
					return ctx.send("删除成功");
				} else {
					return ctx.sendError(400, `删除操作：删除任务失败！根据id未找到数据`);
				}
			} else return ctx.sendError(400, `删除操作：前端未传递id！`);
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	DelMore = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const _id of data) {
					const docs = await ctx.mongo.find(this.Collection, { query: { _id: _id } });
					if (docs.length) {
						await ctx.mongo.deleteOne(this.Collection, docs[0]._id);
					}
				}
				return ctx.send("全部删除完成");
			} else return ctx.sendError(400, `删除更多操作：前端传递的参数不正确！`);
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new App();
