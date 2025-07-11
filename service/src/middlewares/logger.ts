import { Context } from "koa";
import { transports, format } from "winston";
import * as path from "path";
import { config } from '../config/config';

//* 将日志写入到文本中
//* 记录器中间件(在路由之前) ->  status >= 500 || status >= 400 || status >= 200
// logger: 	warn: GET - /friends/visitors - 401 - 9ms
// 					info: GET - /shelf/all_shelf?uname=zhangsan - 200 - 86ms
const logger = (winstonInstance: any): any => {
	winstonInstance.configure({
		level: config.debugLogging ? "debug" : "info", // 是否开发模式
		transports: [
			new transports.File({ filename: path.resolve(__dirname, "../../errorLog.log"), level: "error" }), // 仅写入 error 级别的日志
			//
			// - 将指定级别的所有日志写入控制台。 warn、error
			new transports.Console({
				format: format.combine(format.colorize(), format.simple()),
			}),
		],
	});

	return async (ctx: Context, next: () => Promise<any>): Promise<void> => {
		const start = new Date().getTime();
		try { 
			await next();
		} catch (err) { 
			ctx.status = err.status || 500;
			ctx.body = err.message;
		}
		const ms = new Date().getTime() - start;

		let logLevel: string;
		if (ctx.status >= 500) {
			logLevel = "error";
		} else if (ctx.status >= 400) {
			logLevel = "warn";
		} else {
			logLevel = "info";
		}

		ctx.set("X-Response-Time", `${ms}ms`)
		console.log('ctx', ctx.response);
		console.log('ctx', ctx.response.message); 

		const msg = `${ctx.method} - ${ctx.originalUrl} - ${ctx.status} - ${ms}ms`;
		winstonInstance.log(logLevel, msg);
	};
};

export { logger };
