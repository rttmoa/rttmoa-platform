import { Context } from "koa";
import Basic from "../basic";
import { FieldSchema } from "../../types/schema";
import _ from "lodash";

class App extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = "辅料库货架";
	private readonly Collection = "hk_auxiliary_stock__c";

	private FieldSchema = async (ctx: any) => {
		const { FieldSchema }: any = await this.Query_FieldSchema(ctx, this.Collection);
		return FieldSchema;
	};

	private TableOps = {
		allowCreate: true,
		allowEdit: true,
		allowDelete: true,
		allowRowEdit: true,
		allowBatchDelete: true,
		allowBatchEdit: true,
		allowImport: true,
	};

	Query = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;

			const query = this.QueryFilter(data, field_Schema);
			const hasPagination = _.has(data, "pagination.page") && _.has(data, "pagination.pageSize");
			const page = hasPagination ? _.clamp(_.toInteger(_.get(data, "pagination.page")), 1, Number.MAX_SAFE_INTEGER) : undefined;
			const pageSize = hasPagination ? _.clamp(_.toInteger(_.get(data, "pagination.pageSize")), 1, 100) : undefined;

			const sort = _.get(data, "sort", { updateTime: -1, createTime: -1 });
			const findOptions: any = { query, sort };
			if (hasPagination) Object.assign(findOptions, { page, pageSize });

			const [count, list] = await Promise.all([ctx.mongo.count(this.Collection, query), ctx.mongo.find(this.Collection, findOptions)]);

			const schemaObject: FieldSchema = await this.InitSchema(ctx, this.Collection, field_Schema);
			const schema: any = { ...schemaObject, __ops__: this.TableOps };
			const tableInfo = { tableName: this.tableName, collection: this.Collection };

			return ctx.send({ list, page: page || 1, pageSize: pageSize || count, total: count, schema, init_schema: field_Schema, tableInfo });
		} catch (err: any) {
			return ctx.sendError(500, err.message || "Server error");
		}
	};

	Add = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const data: any = ctx.request.body;
			const doc = this.addAndModField(data, field_Schema);
			delete doc.lastModified;
			await ctx.mongo.insertOne(this.Collection, doc);
			return ctx.send("Add success");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	Mod = async (ctx: Context) => {
		try {
			const field_Schema: any = await this.FieldSchema(ctx);
			const id = ctx.params.id;
			if (!id) return ctx.sendError(400, "Missing id");
			const data: any = ctx.request.body;
			const doc = this.addAndModField(data, field_Schema);
			delete doc.lastModified;
			await ctx.mongo.updateOne(this.Collection, id, doc);
			return ctx.send("Modify success");
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
				return ctx.send("Import success");
			}
			return ctx.sendError(400, "No data received");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	Del = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			if (!id) return ctx.sendError(400, "Missing id");

			const docs = await ctx.mongo.find(this.Collection, { query: { _id: id } });
			if (!docs.length) return ctx.sendError(400, "Data not found");

			await ctx.mongo.deleteOne(this.Collection, docs[0]._id);
			return ctx.send("Delete success");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	DelMore = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const _id of data) {
					const docs = await ctx.mongo.find(this.Collection, { query: { _id } });
					if (docs.length) await ctx.mongo.deleteOne(this.Collection, docs[0]._id);
				}
				return ctx.send("Batch delete success");
			}
			return ctx.sendError(400, "Invalid batch delete params");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new App();