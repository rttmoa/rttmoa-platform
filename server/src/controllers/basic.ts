import { Context } from "koa";
import { config } from "../config/config";

class Basic { 
	constructor() {}
	// 封装通用处理函数
	async handle(ctx: Context, handler: (ctx: Context) => Promise<any>) {
		try {
			function mapStatusCode(message: string = ""): number {
				if (message.includes("成功")) return 200;
				if (message.includes("失败")) return 500;
				return 0;
			}
			// throw new Error("数据拦截、返回失败信息")
			const response = await handler(ctx);
			response.statusCode = mapStatusCode(response.message); // 根据message、返回状态码
			return ctx.send(response);

			// 返回值格式：ProTable—request的格式
			// 新：return { message: "获取数据成功", list: result, current: param.current, pageSize: param.pageSize, total: result.length};
			// 原：return ctx.send([], undefined, { counts: 1, pagesize: 5, pages: 2, page: 1 });
			// return { message: deleteRes ? "删除成功" : "删除失败" };
		} catch (err: any) {
			// console.log('user error info: ', err.message);
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}
export default Basic;
