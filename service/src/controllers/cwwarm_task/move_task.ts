import { Context } from 'koa';
import Basic from '../basic';
import { FieldSchema } from '../../types/schema';
import _ from 'lodash';

class App extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = '常温库移库任务';
	private readonly Collection = 'kd_cwwarm_move_task__c';

	private FieldSchema: FieldSchema = {

		time__c: { label: '时间', type: 'string', width: 150, query: true, editable: true },
		instruct_no__c: { label: '指令号', type: 'string', query: true, editable: true },

		start_col__c: { label: '起始列', type: 'number', query: true, editable: true, int: true },
		start_lay__c: { label: '起始层', type: 'number', query: true, editable: true, int: true },
		start_row1__c: { label: '从起始排', type: 'number', query: true, editable: true, int: true },
		start_row2__c: { label: '到起始排', type: 'number', query: true, editable: true, int: true },
		dest_col__c: { label: '目标列', type: 'number', query: true, editable: true, int: true },
		dest_lay__c: { label: '目标层', type: 'number', query: true, editable: true, int: true },
		dest_row1__c: { label: '从目标排', type: 'number', query: true, editable: true, int: true },
		dest_row2__c: { label: '到目标排', type: 'number', query: true, editable: true, int: true },
    
		start_pallet_num__c: { label: '起始托盘个数', type: 'number', query: true, editable: true, int: true },
		dest_empty_num__c: { label: '目标库位个数', type: 'number', query: true, editable: true, int: true },

		status__c: {
			label: '是否创建？',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未执行', value: '未执行' },
				{ label: '创建成功', value: '创建成功' },
				{ label: '创建失败', value: '创建失败' },
			],
		},
		execute__c: {
			label: '是否执行？',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '立即执行', value: '立即执行' },
				{ label: '取消任务', value: '取消任务' },
				{ label: '正在执行（不可选）', value: '正在执行（不可选）' },
				{ label: '任务完成（不可选）', value: '任务完成（不可选）' },
			],
		},
		task_status__c: {
			label: '任务状态',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未执行', value: '未执行' },
				{ label: '正在执行', value: '正在执行' },
				{ label: '已完成', value: '已完成' },
				{ label: '任务异常', value: '任务异常' },
			],
		},
    
		desc__c: { label: '描述', type: 'string', query: true, editable: true },

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
