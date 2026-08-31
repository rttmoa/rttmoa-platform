import { Context } from 'koa';
import { config } from '../../config/config';
import Basic from '../basic';
import { FieldSchema } from '../../types/schema';
import catArr from '../../config/init_fakeUser';
import _ from 'lodash';

// const Mock = require('mockjs');

class User extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = '用户管理';
	private readonly Collection = '__user_manage';


	private FieldSchema_System: Record<
		string,
		{
			label: string;
			type: 'string' | 'number' | 'date' | 'select';
			query?: boolean;
			editable?: boolean;
			width?: number;
			options?: { label: string; value: any }[];
			order?: number;
			sorter?: boolean;
		}
	> = {
		username: { label: '用户名', type: 'string', query: true, editable: true },
		user_auth: { label: '用户权限字符', type: 'string', query: true, editable: true },
		phone: { label: '手机号', type: 'string', query: true, editable: true },
		nickname: { label: '昵称', type: 'string', query: true, editable: true },
		password: { label: '密码', type: 'string', query: true, editable: true }, 
		is_use: {
			label: '账号状态',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '正常', value: 1 },
				{ label: '冻结', value: 0 },
			],
		},
	};

	private TableOps = {
		allowCreate: true,
		allowEdit: true,
		allowDelete: true,
		allowRowEdit: true,
		allowBatchDelete: true,
		allowBatchEdit: true,
		allowImport: false,
	};

	private async mapRoles(ctx: Context, data: any) {
		const roleIds: string[] = Array.isArray(data?.role_ids) ? data.role_ids : [];
		const roleStrs: string[] = Array.isArray(data?.role) ? data.role : [];

		let rolesDocs: any[] = [];
		if (roleIds.length > 0) {
			rolesDocs = await ctx.mongo.find('__role', { query: { _id: { $in: roleIds } } });
		} else if (roleStrs.length > 0) {
			rolesDocs = await ctx.mongo.find('__role', { query: { permission_str: { $in: roleStrs } } });
		}
		const validIds = rolesDocs.map(r => r._id);
		const validStrs = rolesDocs.map(r => r.permission_str);
		const validNames = rolesDocs.map(r => r.role_name);
		return { role_ids: validIds, role: validStrs, role_names: validNames };
	}

	private async buildUserDoc(ctx: Context, data: any) {
		const field_Schema: any = await this.FieldSchema_System;
		const doc = this.addAndModField(data, field_Schema);
		const roles = await this.mapRoles(ctx, data);
		// console.log('roles', roles);
		return { ...doc, ...roles };
	}

	Add = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			const user = await this.buildUserDoc(ctx, data);
			const newUser = { ...user, createTime: new Date() };
			await ctx.mongo.insertOne(this.Collection, newUser);
			return ctx.send({ message: '添加用户成功' });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};
	Mod = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			const data: any = ctx.request.body;
			if (!id) return ctx.sendError(400, '更新用户操作：参数id错误');
			const user = await this.buildUserDoc(ctx, data);
			const newUser = { ...user, updateTime: new Date() };
			await ctx.mongo.updateOne(this.Collection, id, newUser);
			return ctx.send('更新用户成功');
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * 查询用户（支持 create_order 风格 search/pagination）
Query = async (ctx: Context) => {
		try {
			const body: any = ctx.request.body || {};
			const hasSearch = !!body.search;
			let query: any = {};
			if (hasSearch) {
				query = this.QueryFilter(body, this.FieldSchema_System);
			} else {
				const param = ctx.query;
				if (param.username) query.username = new RegExp(param.username as string);
				if (param.sex && ['0', '1'].includes(param.sex as string)) query.sex = +param.sex;
				if (param.phone) query.phone = new RegExp(param.phone as string);
				if (param.is_use) query.is_use = ['0', '1'].includes(param.is_use as string) ? +param.is_use : param.is_use;
			}

			const page = _.clamp(_.toInteger(_.get(body, 'pagination.page', ctx.query.page || 1)), 1, Number.MAX_SAFE_INTEGER);
			const pageSize = _.clamp(_.toInteger(_.get(body, 'pagination.pageSize', ctx.query.pageSize || 10)), 1, 100);
			const sort = _.get(body, 'sort', { updated_at: -1, created_at: -1 });

			const [count, list] = await Promise.all([ctx.mongo.count(this.Collection, query), ctx.mongo.find(this.Collection, { query, page, pageSize, sort })]);

			const schema: any = { ...this.FieldSchema_System, __ops__: this.TableOps };
			const tableInfo = { tableName: this.tableName, collection: this.Collection };
			return ctx.send({ list, page, pageSize, total: count || 0, schema, tableInfo });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};
	Del = async (ctx: Context) => {
		try {
			let { id } = ctx.request.query;
			if (!id) return ctx.sendError(400, '删除用户：传递iD错误');

			const result = await ctx.mongo.find(this.Collection, { query: { _id: id } });
			if (result.length == 1) {
				await ctx.mongo.deleteOne(this.Collection, result[0]._id);
				return ctx.send({ message: '删除用户成功' });
			} else {
				return ctx.sendError(400, '删除用户：未找到要删除的数据');
			}
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	DelMore = async (ctx: Context) => {
		try {
			let { ids }: any = ctx.request.body;
			if (ids.length) {
				for (const element of ids) {
					const result = await ctx.mongo.deleteOne(this.Collection, element);
					console.log('result', result);
				}
				return ctx.send({ message: '删除用户成功' });
			} else {
				return ctx.sendError(400, '删除多个用户：没有传递正确的参数');
			}
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};
}

export default new User();
