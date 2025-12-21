import { Context } from 'koa';
import Basic from '../basic';
import { FieldSchema } from '../../types/schema';
import _ from 'lodash';

class App extends Basic {
	constructor() {
		super();
	}

	// 查询出入库所有任务
	QueryTask = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;

			const query = {};

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

	// 保温库入库大屏显示 - 1005
	QueryKeepWarm_Enter = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			// console.log('参数“ ', data);

			if (data && data?.location) {
				const total = await ctx.mongo.find('kd_keepwarm_task__c', { query: { instruct_type__c: '入库任务' } });
				const docs = await ctx.mongo.find('kd_keepwarm_task__c', { query: { loc_start__c: data?.location, instruct_type__c: '入库任务' } });
				return ctx.send({ list: docs, total: total.length });
			} else {
				return ctx.send({ list: [] });
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || '服务器错误');
		}
	};

	// 保温库出库大屏显示 - 1015
	QueryKeepWarm_Out = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data?.location) {
				const total = await ctx.mongo.find('kd_keepwarm_task__c', { query: { instruct_type__c: '出库任务' } });
				const docs = await ctx.mongo.find('kd_keepwarm_task__c', { query: { instruct_type__c: '出库任务', loc_dest__c: data?.location } });
				let list = [];
				if (docs.length) {
					for (const item of docs) {
						const subDocs = await ctx.mongo.find('kd_keepwarm_sc_task__c', { query: { instruct_no__c: item.instruct_no__c } });
						if (subDocs.length) {
							for (const sub of subDocs) {
								const listObj = {
									time__c: sub.time__c,
									loc_start__c: sub.loc_start__c,
									pallet__c: sub.pallet__c,
									material_name__c: item.material_name__c,
									batch__c: item.batch__c,
									production_date__c: item.production_date__c,
									send_sc__c: sub.send_sc__c,
								};
								list.push(listObj);
							}
						}
					}
				}
				return ctx.send({ list: list, total: total.length });
			} else {
				return ctx.send({ list: [] });
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || '服务器错误');
		}
	};


	QueryCWWarm_Enter = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body; 
			if (data && data?.location) {
				const total = await ctx.mongo.find('kd_cwwarm_task__c', { query: { instruct_type__c: '入库任务' } });
				const docs = await ctx.mongo.find('kd_cwwarm_task__c', { query: { loc_start__c: data?.location, instruct_type__c: '入库任务' } });
				return ctx.send({ list: docs, total: total.length });
			} else {
				return ctx.send({ list: [] });
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || '服务器错误');
		}
	};

	QueryCWWarm_Out = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data?.location) {
				const total = await ctx.mongo.find('kd_cwwarm_task__c', { query: { instruct_type__c: '出库任务' } });
				const docs = await ctx.mongo.find('kd_cwwarm_task__c', { query: { instruct_type__c: '出库任务', loc_dest__c: data?.location } });
				let list = [];
				if (docs.length) {
					for (const item of docs) {
						const subDocs = await ctx.mongo.find('kd_cwwarm_sc_task__c', { query: { instruct_no__c: item.instruct_no__c } });
						if (subDocs.length) {
							for (const sub of subDocs) {
								const listObj = {
									time__c: sub.time__c,
									loc_start__c: sub.loc_start__c,
									pallet__c: sub.pallet__c,
									material_name__c: item.material_name__c,
									batch__c: item.batch__c,
									production_date__c: item.production_date__c,
									send_sc__c: sub.send_sc__c,
								};
								list.push(listObj);
							}
						}
					}
				}
				return ctx.send({ list: list, total: total.length });
			} else {
				return ctx.send({ list: [] });
			}
		} catch (err: any) {
			return ctx.sendError(500, err.message || '服务器错误');
		}
	};

	private readonly tableName = '';
	private readonly Collection = 'kd_keepwarm_task__c';

	private FieldSchema: FieldSchema = {
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

 
}

export default new App();
