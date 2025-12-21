import { Context } from 'koa';
import Basic from '../basic';
import { FieldSchema } from '../../types/schema';
import _ from 'lodash';

class App extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = '历史任务-常温库出入库任务表';
	private readonly Collection = 'kd_cwwarm_task_his__c';

	private FieldSchema: FieldSchema = {

		time__c: { label: '时间', type: 'string',width:150, query: true, editable: true },
		instruct_no__c: { label: '指令号', type: 'string', query: true, editable: true },
		pallet__c: { label: '托盘号', type: 'string', query: true, editable: true },
		taskno__c: { label: '任务号', type: 'string', query: true, editable: true },
		instruct_type__c: {
			label: '出入库类型',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '入库任务', value: '入库任务' },
				{ label: '出库任务', value: '出库任务' },
			],
		},
		loc_start__c: { label: '起始位置', type: 'string', query: true, editable: true },
		loc_dest__c: { label: '终点位置', type: 'string', query: true, editable: true },
		priority__c: { label: '优先级', type: 'number', query: true, editable: true, int: true },
		instruct_origin__c: {
			label: '指令来源',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '上位自动', value: '上位自动' },
				{ label: 'WCS手动', value: 'WCS手动' },
			],
		},
		status__c: {
			label: '任务状态',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未执行', value: '未执行', color: '#dddddd' },
				{ label: '正在执行', value: '正在执行', color: '#99ff99' },
				{ label: '已完成', value: '已完成', color: '#abffef' },
				{ label: '创建任务错误', value: '创建任务错误', color: '#ffa489' },
				{ label: '任务取消', value: '任务取消' },
				{ label: '重新执行', value: '重新执行', color: '#dddddd' },
			],
		},
		desc__c: { label: '描述', type: 'string', query: true, editable: true },
		sc_start__c: { label: '起始位置WCS', type: 'string', query: true, editable: true },
		sc_dest__c: { label: '终点位置WCS', type: 'string', query: true, editable: true },
		material_name__c: { label: '物料名称', type: 'string', query: true, editable: true },
		batch__c: { label: '批号', type: 'string', query: true, editable: true },
		production_date__c: { label: '生产日期', type: 'string', query: true, editable: true },
		enter_num__c: { label: '入库数量', type: 'number', query: true, editable: true, int: true },
		out_num__c: { label: '出库数量', type: 'number', query: true, editable: true, int: true },
		create_info__c: { label: '创建提示', type: 'string', query: true, editable: true },
		pallet_arrive__c: {
			label: '托盘到位',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未到达入口', value: '未到达入口', color: '#ff8989' },
				{ label: '已到达入口', value: '已到达入口', color: '#99ff99' },
				{ label: '重新获取托盘状态', value: '重新获取托盘状态', color: '#dddddd' },
			],
		},
		distribution__c: {
			label: '分配货位',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未分配货位', value: '未分配货位', color: '#ff8989' },
				{ label: '已分配货位', value: '已分配货位', color: '#99ff99' },
				{ label: '重新分配货位', value: '重新分配货位', color: '#dddddd' },
			],
		},
		generate_sc_task__c: {
			label: '生成世仓任务',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未生成世仓任务', value: '未生成世仓任务', color: '#ff8989' },
				{ label: '已生成世仓任务', value: '已生成世仓任务', color: '#99ff99' },
				{ label: '重新生成任务', value: '重新生成任务', color: '#dddddd' },
			],
		},
		send_sc__c: {
			label: '下发世仓',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未下发世仓', value: '未下发世仓', color: '#ff8989' },
				{ label: '已下发世仓', value: '已下发世仓', color: '#99ff99' },
				{ label: '重新下发世仓', value: '重新下发世仓', color: '#dddddd' },
			],
		},
		enter_finish__c: {
			label: '托盘入库完成',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '未入库完成', value: '未入库完成', color: '#ff8989' },
				{ label: '已入库完成', value: '已入库完成', color: '#99ff99' },
				{ label: '重新执行', value: '重新执行' },
			],
		},

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
