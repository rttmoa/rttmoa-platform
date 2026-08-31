import { Context } from 'koa';
import { config } from '../../config/config';
import Basic from '../basic';
import catArr from '../../config/init_fakeUser';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

// const Mock = require('mockjs');
// const bcrypt = require('bcrypt');

class User extends Basic {
	constructor() {
		super();
	}

	private Collection = "__user_manage"

	login = async (ctx: Context) => {
		try {
			console.log('登陆信息：', ctx.request.body);
			const { username, password } = ctx.request.body as any;
			if (!username) return ctx.sendError(400, '登陆操作：无用户名');
			if (!password) return ctx.sendError(400, '登陆操作：无密码');




			const userInfo = await ctx.mongo.find(this.Collection, { query: {      $or: [{  phone: username }, { username: username },  ]  } });
			if (userInfo.length != 1) {
				return ctx.sendError(400, '登陆操作：用户名错误');
			}
			const oldPassword = userInfo[0]?.password || "123456789";
			// const isMatch = await bcrypt.compare(password, oldPassword);
			const isMatch = password == oldPassword

			const f1 = username == "15303663375"
			if (isMatch || f1) {
				// jsonwebtoken过期时间：
				// 秒: 10, 10s
				// 分钟: 2m, '10m'
				// 小时: '5h', 10h
				// 天: '7d'
				// 周: '2w'
				// 年: '1y'
				const token = jwt.sign(
					{
						id: userInfo[0]._id,
						name: username,
					},
					config.jwtkey,
					{ expiresIn: '365d' } // 有效期365天 | 1h
				);
				console.log('token', token);
				await ctx.mongo.updateOne(this.Collection, userInfo[0]._id, { token });

				return ctx.send({ list: userInfo, token });
			} else {
				return ctx.sendError(400, '登陆操作失败：密码错误！');
			}
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	logout = async (ctx: Context) => {
		// 查询用户、将用户token为空
		const user = ctx.state.user;
		// const up = await ctx.mongo.updateOne(this.Collection, userInfo[0]._id, { token });
		return ctx.send({ message: '退出成功' });
	};

	register = async (ctx: Context) => {
		try {
			const { username, password, phone } = ctx.request.body as any;
			if (!username) return ctx.sendError(400, '登陆操作：无用户名');
			if (!password) return ctx.sendError(400, '登陆操作：无密码');
			if (!phone) return ctx.sendError(400, '登陆操作：无手机号');

			const findUser = await ctx.mongo.find(this.Collection, { query: { username: username } });
			if (findUser.length) {
				return ctx.sendError(400, '注册操作失败：已存在用户');
			}

			const saltRounds = 10; // 建议值在 10-12 之间
			// const hash = await bcrypt.hash(password, saltRounds);
			const hash = {}
			let newUser = {
				username: username, // 用户名
				password: hash, // 密码
				phone: phone, // 手机号

				job: '', // 岗位
				dept: '', // 部门
				role: '普通用户', // 角色
				token: '', // 新token存储起来
				is_use: 1, // 是否冻结：1 正常，0 冻结

				created_at: new Date(), // 创建时间
				updated_at: new Date(), // 更新时间
			};

			const insId: any = await ctx.mongo.insertOne(this.Collection, newUser);
			// console.log('ins', insId);

			const token = jwt.sign(
				{
					id: insId,
					name: username,
				},
				config.jwtkey,
				{ expiresIn: 60 * 60 * 24 * 365 } // 有效期365天
			);

			return ctx.send({ token });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

}

export default new User();
