import { Context } from 'koa';
import { config } from '../../config/config';
import Basic from '../basic';
import catArr from '../../config/init_fakeUser';
import jwt from 'jsonwebtoken';

const Mock = require('mockjs');
const bcrypt = require('bcrypt');

class User extends Basic {
	constructor() {
		super();
	}

	Login = async (ctx: Context) => {
		try {
			const { user, password } = ctx.request.body as any;
			if (!user) return ctx.sendError(400, '登陆操作：无用户名');
			if (!password) return ctx.sendError(400, '登陆操作：无密码');
			const findUser = await ctx.mongo.find('__user', { query: { username: user } });
			if (!findUser.length) {
				return ctx.sendError(400, '登陆操作：用户名错误');
			}
			const oldPassword = findUser[0].password;

			const isMatch = await bcrypt.compare(password, oldPassword);
			if (!isMatch) {
				// jsonwebtoken过期时间：
				// 秒: 10, 10s
				// 分钟: 2m, '10m'
				// 小时: '5h', 10h
				// 天: '7d'
				// 周: '2w'
				// 年: '1y'
				const token = jwt.sign(
					{
						id: findUser[0]._id,
						name: user,
					},
					config.jwtkey,
					{ expiresIn: '1h' } // 有效期365天
				);

				const up = await ctx.mongo.updateOne('__user', findUser[0]._id, { token });

				return ctx.send({ message: '查询成功', list: findUser, token });
			} else {
				return ctx.sendError(400, '登陆操作：密码错误！');
			}
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	Logout = async (ctx: Context) => {
		// 查询用户、将用户token为空
		// const up = await ctx.mongo.updateOne('__user', findUser[0]._id, { token });
		return ctx.send({ message: '退出成功' });
	};

	register = async (ctx: Context) => {
		try {
			const { user, password } = ctx.request.body as any;
			if (!user) return ctx.sendError(400, '登陆操作：无用户名');
			if (!password) return ctx.sendError(400, '登陆操作：无密码');

			const findUser = await ctx.mongo.find('__user', { query: { username: user } });
			if (findUser.length) {
				return ctx.sendError(400, '注册操作：已存在用户');
			}

			const saltRounds = 10; // 建议值在 10-12 之间
			const hash = await bcrypt.hash(password, saltRounds);

			let newUser = {
				'id|+1': 1,
				username: '@cname', // 用户名
				'sex|0-1': 1, // 性别：1男0女
				'marriage|1': ['未婚', '已婚', '离异'],
				phone: /^1[3-9]\d{9}$/, // 手机号
				email: '@string("lower", 6, 10)@qq.com', // 邮箱
				avatar: '@image("100x100", "#4A7BF7", "white", "User")', // 头像
				// head: catHead(),
				city: '@county(true)', // 城市
				'age|18-50': 1, // 年龄在18-60之间
				createdAt: '@datetime', // 注册时间
				'progress|1-100': 1, // 执行进度 1-100
				'progress_status|0-3': 1,
				date: '@date', // 例如："2024-07-15"
				time: '@time', // 例如："14:23:45"
				dateTime: '@datetime', // 例如："2024-07-15 14:23:45"
				'status|1': ['隐身', '在线', '离线', '异常'], // 在线状态

				password: hash, // 密码
				job: '', // 岗位
				dept: '', // 部门
				token: '', // 新token存储起来
				is_use: 1, // 是否冻结：1 正常，0 冻结
			};

			const ins: any = await ctx.mongo.insertOne('__user', newUser);

			const token = jwt.sign(
				{
					id: ins._id,
					name: user,
				},
				config.jwtkey,
				{ expiresIn: 60 * 60 * 24 * 365 } // 有效期365天
			);

			return ctx.send({ message: '注册成功', token: token });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	InsFakeUser = async (ctx: Context) => {
		try {
			const catHead = () => catArr[Math.floor(Math.random() * catArr.length)];
			// ! 26万条
			const users = Mock.mock({
				'data|27500': [
					// 27500 | 267500
					{
						'id|+1': 1,
						username: '@cname', // 用户名
						'sex|0-1': 1, // 性别：1男0女
						'marriage|1': ['未婚', '已婚', '离异'],
						phone: /^1[3-9]\d{9}$/, // 手机号
						email: '@string("lower", 6, 10)@qq.com', // 邮箱
						avatar: '@image("100x100", "#4A7BF7", "white", "User")', // 头像
						head: catHead(),
						city: '@county(true)', // 城市
						'age|18-50': 1, // 年龄在18-60之间
						createdAt: '@datetime', // 注册时间
						'progress|1-100': 1, // 执行进度 1-100
						'progress_status|0-3': 1,
						date: '@date', // 例如："2024-07-15"
						time: '@time', // 例如："14:23:45"
						dateTime: '@datetime', // 例如："2024-07-15 14:23:45"
						'status|1': ['隐身', '在线', '离线', '异常'], // 在线状态
					},
				],
			});
			console.log('users', users);
			// for (const element of users.data) {
			// 	const ins = await ctx.mongo.insertOne("__user", element);
			// }
			const insMany = await ctx.mongo.insertMany('__user', users.data);
			console.log('insMany', insMany);
			return ctx.send(users, undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	InsUser = async (ctx: Context) => {
		try {
			let query = ctx.request.query;
			let newUser = {
				username: '', // 用户名：张三
				password: '', // 密码：pwd
				phone: '', // 电话：14443322133
				nickname: '', // 昵称：管理员、普通用户
				email: '', // 邮箱：admin@163.com
				sex: '', // 性别：1 男、0 女

				dept: '', // 部门管理：软件部、财务部
				job: '', // 岗位管理：前端开发、运维管理
				role: '', // 角色：管理员、普通用户

				is_use: 1, // 是否冻结：1 正常，0 冻结
				token: '', // token
				created_at: new Date(), // 创建时间
				updated_at: new Date(), // 更新时间
			};
			const ins = await ctx.mongo.insertOne('__user', newUser);

			return ctx.send({ message: '新增用户成功' });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};
	UpUser = async (ctx: Context) => {
		try {
			let query: any = ctx.request.query;
			console.log('query', query);
			// 获取用户名、密码、
			if (!query._id) return ctx.sendError(400, '更新用户操作：未获取到iD');

			let newUser = {
				username: '', // 用户名：张三
				password: '', // 密码：pwd
				phone: '', // 电话：14443322133
				nickname: '', // 昵称：管理员、普通用户
				email: '', // 邮箱：admin@163.com
				sex: '', // 性别：1 男、0 女

				dept: '', // 部门管理：软件部、财务部
				job: '', // 岗位管理：前端开发、运维管理
				role: '', // 角色：管理员、普通用户

				is_use: 1, // 是否冻结：1 正常，0 冻结
				token: '', // token
				created_at: new Date(), // 创建时间
				updated_at: new Date(), // 更新时间
			};
			const ins = await ctx.mongo.updateOne('__user', query._id, newUser);

			return ctx.send([], undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * ProTable 查询参数
	FindProTableUser = async (ctx: Context) => {
		try {
			const currentUser = ctx.state.user;
			console.log('当前用户：', currentUser);

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
			const count = await ctx.mongo.count('__user');
			const result = await ctx.mongo.find('__user', { query: query, sort: {}, page: +param.page || 1, pageSize: +param.pageSize || 10 });
			// throw new Error("失败；；；；；")

			return ctx.send({ message: '获取数据成功', list: result, page: +param.page || 1, pageSize: +param.pageSize || 10, total: count || 0 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * UserManager 查询参数
	FindUserManager = async (ctx: Context) => {
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
	DelUser = async (ctx: Context) => {
		return this.handle(ctx, async () => {
			let { id } = ctx.request.query;
			if (!id) return { message: '失败：id 错误' };
			const result = await ctx.mongo.find('__user', { query: { _id: id } });
			if (result.length == 1) {
				const deleteRes = await ctx.mongo.deleteOne('__user', result[0]._id);
				return { message: deleteRes ? '删除成功' : '删除失败' };
			} else {
				return { message: '失败：未找到要删除的数据' };
			}
		});
	};

	// * 删除多个用户
	DelMoreUser = async (ctx: Context) => {
		// http.post("/userp/del_more_User/123", { body: params })
		return this.handle(ctx, async () => {
			// console.log('request-id', ctx.params.id);
			console.log('request-body', ctx.request.body);
			let { ids }: any = ctx.request.body;
			if (ids.length) {
				let num = 0;
				for (const element of ids) {
					const result = await ctx.mongo.deleteOne('__user', element);
					console.log('result', result);
					num++;
				}
				return { message: `全部删除完成，删除个数为 ${num}` };
			} else {
				return { message: '失败：ids 为空' };
			}
		});
	};
}

export default new User();
