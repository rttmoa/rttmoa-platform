import { Context } from "koa";
import Basic from "../basic"; 


class ErrorLog extends Basic {
	constructor() {
		super();
	}
 
	// * 异常在捕获错误处写入表中 （用户、错误事件）
	// 这里查询并返回
	GetErrorLog = async (ctx: Context) => {
		return this.handle(ctx, async () => {
			// 查询异常表中数据返回即可
		});
	};
}

export default new ErrorLog();
