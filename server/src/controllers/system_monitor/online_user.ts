import { Context } from "koa";
import Basic from "../basic";
const os = require("os");
const si = require("systeminformation");

class OnlineUser extends Basic {
	constructor() {
		super();
	}

	// 伪代码
	// app.use(session({ secret: 'xxx', resave: false, saveUninitialized: true }));//

	// 设置心跳机制（前端每5分钟发一次）
	HeartBeat = (ctx: Context) => {
		return this.handle(ctx, async () => {
			ctx.session.lastActive = Date.now();
			return { message: "ok" };
		});
	};

	// 获取在线用户记录
	// 场景 1：Web 应用（Express/Koa + JWT/Session）
	// 	方案一：基于 session（如 express-session）
	// 		用户登录后建立 session
	// 		每次请求更新 session 最后活跃时间
	// 		定期扫描所有 session，活跃时间小于一定时间内的认为“在线”
	GetOnlineUser = async (ctx: Context) => {
		return this.handle(ctx, async () => { 
			// 判断在线用户（假设10分钟内活跃的算在线）
			function getOnlineUsers(sessions: any) {
				const now = Date.now();
				return Object.values(sessions).filter((s: any) => now - s.lastActive < 10 * 60 * 1000);
			}
			return "";
		});
	};
}

export default new OnlineUser();
