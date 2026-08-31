import { Context } from 'koa';
import { config } from '../../config/config';
import Basic from '../basic';
import catArr from '../../config/init_fakeUser';
import _ from 'lodash';

// const Mock = require('mockjs');

class User extends Basic {
	constructor() {
		super();
	}

	// 假数据接口
	addFakeUser = async (ctx: Context) => {
		try {
			const catHead = () => catArr[Math.floor(Math.random() * catArr.length)];
			// ! 26万条
			// const users = Mock.mock({
			// 	'data|360': [
			// 		// 27500 | 267500
			// 		{
			// 			'id|+1': 1,
			// 			username: '@cname', // 用户名
			// 			'sex|0-1': 1, // 性别：1男0女
			// 			'marriage|1': ['未婚', '已婚', '离异'],
			// 			phone: /^1[3-9]\d{9}$/, // 手机号
			// 			email: '@string("lower", 6, 10)@qq.com', // 邮箱
			// 			avatar: '@image("100x100", "#4A7BF7", "white", "User")', // 头像
			// 			head: catHead(),
			// 			city: '@county(true)', // 城市
			// 			'age|18-50': 1, // 年龄在18-60之间
			// 			createdAt: '@datetime', // 注册时间
			// 			'progress|1-100': 1, // 执行进度 1-100
			// 			'progress_status|0-3': 1,
			// 			date: '@date', // 例如："2024-07-15"
			// 			time: '@time', // 例如："14:23:45"
			// 			dateTime: '@datetime', // 例如："2024-07-15 14:23:45"
			// 			'status|1': ['隐身', '在线', '离线', '异常'], // 在线状态
			// 		},
			// 	],
			// });
			// console.log('users', users);
			// await ctx.mongo.insertMany('__user', users.data);
			// return ctx.send(users, undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	addAndModifyField = (data: any) => {
		return {
			username: this.normalize(data?.username, ['string'], null), // 用户名：张三
			// password: _.trim(_.get(data, 'password', '')), // 密码：pwd
			phone: this.normalize(data?.phone, ['string'], null), // 电话：14443322133
			nickname: this.normalize(data?.nickname, ['string'], null), // 昵称：管理员、普通用户
			email: this.normalize(data?.email, ['string'], null), // 邮箱：admin@163.com
			sex: this.normalize(data?.sex, ['number'], 1), // 性别：1 男、0 女

			dept: '', // 部门管理：软件部、财务部
			job: '', // 岗位管理：前端开发、运维管理
			role: this.normalize(data?.role, ['array'], []), // 角色：管理员、普通用户

			is_use: 1, // 是否冻结：1 正常，0 冻结
			token: '', // token
		};
	};

	addUser = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			// console.log('用户新增:', data);

			const user = this.addAndModifyField(data);
			let newUser = {
				...user,
				created_at: new Date(), // 创建时间
			};
			await ctx.mongo.insertOne('__user', newUser);
			return ctx.send({ message: '添加用户成功' });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};
	upUser = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			const data: any = ctx.request.body;
			// console.log('用户更新:', id, data);

			if (!id) return ctx.sendError(400, '更新用户操作：参数id错误');

			const user = this.addAndModifyField(data);
			let newUser = {
				...user,
				updated_at: new Date(), // 更新时间
			};
			await ctx.mongo.updateOne('__user', id, newUser);
			return ctx.send('更新用户成功');
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * ProTable 查询参数
	findProTableUser = async (ctx: Context) => {
		try {
			const currentUser = ctx.state.user;
			// console.log('当前用户：', currentUser);

			// if (Object.keys(currentUser).length == 0) {
			// 	return ctx.sendError(401, "Unauthorized access. Please provide a valid token.");
			// }

			const param = ctx.query;
			// console.log("FindProTableUser_params：", param);

			// 查询参数： username、sex、age、status、process、createTime、opreation
			let query: any = {};
			if (param.username) query.username = new RegExp(param.username as string);
			if (param.sex && ['0', '1'].includes(param.sex as string)) query.sex = +param.sex;
			if (param.age) query.age = +param.age;
			if (param.phone) query.phone = new RegExp(param.phone as string);

			// 排序参数：age、status
			let sortParam = {};
			const count = await ctx.mongo.count('__user', query);
			const result = await ctx.mongo.find('__user', { query: query, sort: {}, page: +param.page || 1, pageSize: +param.pageSize || 10 });

			return ctx.send({ message: '获取数据成功', list: result, page: +param.page || 1, pageSize: +param.pageSize || 10, total: count || 0 });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * UserManager 查询参数
	findUserManager = async (ctx: Context) => {
		return this.handle(ctx, async () => {
			const param = ctx.query;
			console.log('UserManager Params: ', param);
			// 参数：表单搜索、表头搜索、分页处理
			// * 查询参数： username、sex、age、status、process、createTime、opreation
			let query: any = {};
			if (param.username) query.username = new RegExp(param.username as string);
			if (param.sex && ['0', '1'].includes(param.sex as string)) query.sex = +param.sex;
			if (param.age) query.age = +param.age;
			if (param.phone) query.phone = new RegExp(param.phone as string);

			// 排序参数：age、status
			let sortParam = {};
			const count = await ctx.mongo.count('__user');
			console.log('count', count);
			const result = await ctx.mongo.find('__user', { query: query, sort: {}, page: +param.page, pageSize: +param.pageSize });
			console.log('result', result.length);

			return {
				message: '获取数据成功 s',
				list: result,
				current: param.page || 1,
				pageSize: param.pageSize || 10,
				total: count,
			};
		});
	};

	// * 删除用户
	delUser = async (ctx: Context) => {
		try {
			let { id } = ctx.request.query;
			if (!id) return ctx.sendError(400, '删除用户：传递iD错误');

			const result = await ctx.mongo.find('__user', { query: { _id: id } });
			if (result.length == 1) {
				await ctx.mongo.deleteOne('__user', result[0]._id);
				return ctx.send({ message: '删除用户成功' });
			} else {
				return ctx.sendError(400, '删除用户：未找到要删除的数据');
			}
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * 删除多个用户
	delMoreUser = async (ctx: Context) => {
		try {
			let { ids }: any = ctx.request.body;
			if (ids.length) {
				let num = 0;
				for (const element of ids) {
					const result = await ctx.mongo.deleteOne('__user', element);
					console.log('result', result);
					num++;
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
