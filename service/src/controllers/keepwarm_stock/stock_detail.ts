import { Context } from 'koa';
import Basic from '../basic';
import { FieldSchema } from '../../types/schema';
import _ from 'lodash';

class App extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = '保温库库存详情';
	private readonly Collection = 'kd_keepwarm_stock_detail__c';

	private FieldSchema: FieldSchema = {
		// name: { label: '名称', type: 'string', sync: 'loc_name__c' },

		time__c: { label: '时间', type: 'string', width: 150, query: true, editable: true, order: 1 },
		loc_name__c: { label: '位置名称', type: 'string', query: true, editable: true },
		position__c: { label: '仓位', type: 'string', query: true, editable: true },
		location__c: { label: '库位（世仓）', type: 'string', query: true, editable: true },
		row__c: { label: '排', type: 'number', query: true, editable: true, int: true },
		col__c: { label: '列', type: 'number', query: true, editable: true, int: true },
		lay__c: { label: '层', type: 'number', query: true, editable: true, int: true },
		pallet__c: { label: '托盘号', type: 'string', query: true, editable: true },
		stock_status__c: {
			label: '库存状态',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '在库', value: '在库', color: '#ffa489' },
				{ label: '正在入库', value: '正在入库', color: '#bbffee' },
				{ label: '正在出库', value: '正在出库', color: '#bbffee' },
				{ label: '已出库（有库存）', value: '已出库（有库存）', color: '#ccbbff' },
			],
		},
		material_name__c: { label: '物料名称', type: 'string', query: true, editable: true },
		batch__c: { label: '批号', type: 'string', query: true, editable: true },
		production_date__c: { label: '生产日期', type: 'string', query: true, editable: true },
		now_quantity__c: { label: '当前数量', type: 'number', query: true, editable: true, int: true },
		final_quantity__c: { label: '最终数量', type: 'number', query: true, editable: true, int: true },

		created: { label: '创建时间', type: 'date', width: 150, query: true, editable: false },
		modified: { label: '修改时间', type: 'date', width: 150, query: true, editable: false },
		lastModified: { label: '最后修改时间', type: 'date', width: 150, query: true, editable: false },
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
			const data: any = ctx.request.body;

			const query = this.QueryFilter(data, this.FieldSchema);

			const page = _.clamp(_.toInteger(_.get(data, 'pagination.page', 1)), 1, Number.MAX_SAFE_INTEGER);
			const pageSize = _.clamp(_.toInteger(_.get(data, 'pagination.pageSize', 10)), 1, 100);

			const sort = _.get(data, 'sort', { updateTime: -1, createTime: -1 });

			const [count, list] = await Promise.all([ctx.mongo.count(this.Collection, query), ctx.mongo.find(this.Collection, { query, page, pageSize, sort })]);

			const schema: any = { ...this.FieldSchema, __ops__: this.TableOps };
			const tableInfo = { tableName: this.tableName, collection: this.Collection };
			return ctx.send({ list, page, pageSize, total: count, schema, tableInfo });
		} catch (err: any) {
			return ctx.sendError(500, err.message || '服务器错误');
		}
	};

	Add = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;

			const doc = this.addAndModField(data, this.FieldSchema);
			delete doc.lastModified;
			const ins = await ctx.mongo.insertOne(this.Collection, doc);
			return ctx.send('添加成功');
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	Mod = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			if (!id) return ctx.sendError(400, `修改操作：无iD`);
			const data: any = ctx.request.body;
			const doc = this.addAndModField(data, this.FieldSchema); 
			delete doc.lastModified;
			await ctx.mongo.updateOne(this.Collection, id, doc);
			return ctx.send('修改成功');
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	ImportEx = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const element of data) {
					const doc = this.addAndModField(element, this.FieldSchema); 
					await ctx.mongo.insertOne(this.Collection, doc);
				}
				return ctx.send('数据导入成功');
			} else return ctx.sendError(400, `服务端未获取到数据`);
		} catch (err) {
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
					return ctx.send('删除成功');
				} else {
					return ctx.sendError(400, `删除操作：删除任务失败！根据id未找到数据`);
				}
			} else return ctx.sendError(400, `删除操作：前端未传递id！`);
		} catch (err) {
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
				return ctx.send('全部删除完成');
			} else return ctx.sendError(400, `删除更多操作：前端传递的参数不正确！`);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new App();
