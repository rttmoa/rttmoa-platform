import { Context } from "koa";
import Basic from "../basic"; 


class RequestLog extends Basic {
	constructor() {
		super();
	}

	// 获取请求日志记录：用户请求服务器的地址及参数（用户、请求URL）
	GetRequestLog = async (ctx: Context) => {
		return this.handle(ctx, async () => {

			// 将请求参数存储至数据库
			// 此处将数据库内容取出并返回


			const info = { };

			console.log(info);
			return info;
		});
	};
}

export default new RequestLog();
