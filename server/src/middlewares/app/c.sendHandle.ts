import { Context, Next } from "koa";

// & ctx.send、ctx.sendError 使用
// try {
//  let starList = await ctx.executeSql(`select * from dt_users where mobile='${ctx.state.user.name}'`);
// 	return ctx.send(starList, undefined, { counts, pagesize, pages, page });
// } catch (err) {
// 	return ctx.sendError(config.resCodes.serverError, err.message);

const sendHandle = () => {
	const render = (ctx: Context) => {
		return (data: any, msg = "请求成功", page: any) => {
			ctx.status = 200; // 所有成功都用 HTTP 200
			ctx.set("Content-Type", "application/json");
			ctx.body = {
				code: 200, // 自定义业务成功码，通常是 0 或 200
				msg,
				data,
				...page,
			};
		};
	};
	// 客户端传参错误 → 400
	// 未登录 → 401
	// 权限不足 → 403
	// 服务端出错 → 500
	const renderError = (ctx: Context) => {
		return (code: number, msg = "请求失败", statusCode = 400) => {
			ctx.status = statusCode;
			ctx.set("Content-Type", "application/json");
			ctx.body = {
				code, // 业务码，比如 10001、10002 或者直接用 statusCode
				data: null,
				msg,
			};
		};
	};
	function success({ ctx, res = null }: any) {
		ctx.status = res.status ? res.status : 200;
		if (res.status) {
			delete res.status;
		}
		ctx.body = {
			...res,
			data: res.data ? res.data : null,
			code: res.code ? res.code : 0, // 0 代表成功，其他代表失败
			msg: res.msg ? res.msg : "请求成功",
		};
	}
	return async (ctx: Context, next: Next) => {
		ctx.send = render(ctx);
		ctx.sendError = renderError(ctx);
		await next();
	};
};
export default sendHandle;

// const error = renderError(ctx);
// // 1. 客户端参数不合法
// if (!ctx.query.id) {
// 	return error(10001, "缺少必要参数 id", 400);
// }
// // 2. 未认证
// if (!ctx.state.user) {
// 	return error(401, "请先登录", 401);
// }
// // 3. 无权限
// if (!hasPermission) {
// 	return error(403, "无权限访问该资源", 403);
// }
// // 4. 服务内部错误
// try {
// 	await something();
// } catch (e) {
// 	return error(500, "服务器错误", 500);
// }
