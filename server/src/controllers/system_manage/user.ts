import { Context } from "koa";
import { config } from "../../config/config";
import Basic from "../basic";
import catArr from "../../config/init_fakeUser";
import jwt from "jsonwebtoken";
const Mock = require("mockjs");

class User extends Basic {
	constructor() {
		super();
		this.DelUser = this.DelUser.bind(this);
		this.FindProTableUser = this.FindProTableUser.bind(this);
		this.DelMoreUser = this.DelMoreUser.bind(this);
		this.FindUserManager = this.FindUserManager.bind(this);
	}

	Login = async (ctx: Context) => {
		try {
			// 判断是用户名还是手机号
			// 查询库中有无
			// 登陆成功后、生成token
			// admin / user
			const { user, password } = ctx.request.body as any;
			if (!user) return { message: "失败，无用户名" };
			if (!password) return { message: "失败，无密码" };
			const findUser = await ctx.mongo.find("__user", { query: { username: user } });
			if (findUser.length) {
				const token = jwt.sign(
					{
						id: findUser[0]._id,
						name: user,
					},
					config.jwtkey,
					{ expiresIn: 60 * 60 * 24 * 365 } // 有效期365天
				);
				return ctx.send({ message: "查询成功", token: token, user: findUser });
			} else {
				const ins = await ctx.mongo.insertOne("__user", { username: user, password: "123456" });
				return ctx.send({ message: "请重试" });
			}
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	Logout = () => {
		// 清空token
	};

	async InsFakeUser(ctx: Context) {
		try {
			const catHead = () => catArr[Math.floor(Math.random() * catArr.length)];
			// ! 26万条
			const users = Mock.mock({
				"data|27500": [
					// 27500 | 267500
					{
						"id|+1": 1,
						username: "@cname", // 用户名
						"sex|0-1": 1, // 性别：1男0女
						"marriage|1": ["未婚", "已婚", "离异"],
						phone: /^1[3-9]\d{9}$/, // 手机号
						email: '@string("lower", 6, 10)@qq.com', // 邮箱
						avatar: '@image("100x100", "#4A7BF7", "white", "User")', // 头像
						head: catHead(),
						city: "@county(true)", // 城市
						"age|18-50": 1, // 年龄在18-60之间
						createdAt: "@datetime", // 注册时间
						"progress|1-100": 1, // 执行进度 1-100
						"progress_status|0-3": 1,
						date: "@date", // 例如："2024-07-15"
						time: "@time", // 例如："14:23:45"
						dateTime: "@datetime", // 例如："2024-07-15 14:23:45"
						"status|1": ["隐身", "在线", "离线", "异常"], // 在线状态
					},
				],
			});
			console.log("users", users);
			// for (const element of users.data) {
			// 	const ins = await ctx.mongo.insertOne("__user", element);
			// }
			const insMany = await ctx.mongo.insertMany("__user", users.data);
			console.log("insMany", insMany);
			return ctx.send(users, undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
	async InsUser(ctx: Context) {
		try {
			let query = ctx.request.query;

			return ctx.send([], undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
	async UpUser(ctx: Context) {
		try {
			let query = ctx.request.query;
			console.log("query", query);

			return ctx.send([], undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// * ProTable 查询参数
	FindProTableUser = async (ctx: Context) => {
		try {
			const currentUser = ctx.state.user;
			console.log("当前用户：", currentUser);

			// if (Object.keys(currentUser).length == 0) {
			// 	return ctx.sendError(401, "Unauthorized access. Please provide a valid token.");
			// }

			const param = ctx.query;
			// console.log("FindProTableUser_params：", param);

			// 查询参数： username、sex、age、status、process、createTime、opreation
			let query: any = {};
			if (param.username) query.username = new RegExp(param.username as string);
			if (param.sex && ["0", "1"].includes(param.sex as string)) query.sex = +param.sex;
			if (param.age) query.age = +param.age;
			if (param.phone) query.phone = new RegExp(param.phone as string);

			// 排序参数：age、status
			let sortParam = {};
			const count = await ctx.mongo.count("__user");
			const result = await ctx.mongo.find("__user", { query: query, sort: {}, page: +param.page || 1, pageSize: +param.pageSize || 10 });
			// throw new Error("失败；；；；；")

			return ctx.send({ message: "获取数据成功", list: result, page: +param.page || 1, pageSize: +param.pageSize || 10, total: count || 0 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	};

	// * UserManager 查询参数
	FindUserManager = async (ctx: Context) => {
		return this.handle(ctx, async () => {
			const param = ctx.query;
			console.log("UserManager Params: ", param);
			// 参数：表单搜索、表头搜索、分页处理
			// * 查询参数： username、sex、age、status、process、createTime、opreation
			let query: any = {};
			if (param.username) query.username = new RegExp(param.username as string);
			if (param.sex && ["0", "1"].includes(param.sex as string)) query.sex = +param.sex;
			if (param.age) query.age = +param.age;
			if (param.phone) query.phone = new RegExp(param.phone as string);

			// 排序参数：age、status
			let sortParam = {};
			const count = await ctx.mongo.count("__user");
			console.log("count", count);
			const result = await ctx.mongo.find("__user", { query: query, sort: {}, page: +param.page, pageSize: +param.pageSize });
			console.log("result", result.length);

			return {
				message: "获取数据成功 s",
				list: result,
				current: param.page || 1,
				pageSize: param.pageSize || 10,
				total: count,
			};
		});
	};

	testThisHandle = (ctx: Context) => {
		console.log(
			"this",
			this.handle(ctx, async () => {})
		);
	};

	// * 删除用户
	async DelUser(ctx: Context) {
		return this.handle(ctx, async () => {
			let { id } = ctx.request.query;
			if (!id) return { message: "失败：id 错误" };
			const result = await ctx.mongo.find("__user", { query: { _id: id } });
			if (result.length == 1) {
				const deleteRes = await ctx.mongo.deleteOne("__user", result[0]._id);
				return { message: deleteRes ? "删除成功" : "删除失败" };
			} else {
				return { message: "失败：未找到要删除的数据" };
			}
		});
	}

	// * 删除多个用户
	async DelMoreUser(ctx: Context) {
		// http.post("/userp/del_more_User/123", { body: params })
		return this.handle(ctx, async () => {
			// console.log('request-id', ctx.params.id);
			console.log("request-body", ctx.request.body);
			let { ids }: any = ctx.request.body;
			if (ids.length) {
				let num = 0;
				for (const element of ids) {
					const result = await ctx.mongo.deleteOne("__user", element);
					console.log("result", result);
					num++;
				}
				return { message: `全部删除完成，删除个数为 ${num}` };
			} else {
				return { message: "失败：ids 为空" };
			}
		});
	}
}

export default new User();
