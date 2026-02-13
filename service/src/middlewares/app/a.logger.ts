import { Context } from "koa";
import { transports, format } from "winston";
import * as path from "path";
import { config } from '../../config/config';
import { getBrowser, getIpLocation } from "../../utils";
import { mongoService } from "./m.mongoService";

//* 将日志写入到文本中
//* 记录器中间件(在路由之前) ->  status >= 500 || status >= 400 || status >= 200
// logger: 	warn: GET - /friends/visitors - 401 - 9ms
// 					info: GET - /shelf/all_shelf?uname=zhangsan - 200 - 86ms
const logger = (winstonInstance: any): any => {
	winstonInstance.configure({
		level: config.debugLogging ? "debug" : "info", // 是否开发模式
		transports: [
			new transports.File({ filename: path.resolve(__dirname, "../../log/errorLog.log"), level: "error" }), // 仅写入 error 级别的日志
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
			ctx.status = err?.status || 500;
			ctx.body = err?.message;
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
		
		

		// ctx.ip 可能是 "::ffff:127.0.0.1" → 记得处理
		const ip = (ctx.get("X-Forwarded-For") || ctx.ip).replace('::ffff:', '');
		const location = await getIpLocation(ip); // 吉林： 111.26.3.255

		const brow = getBrowser(ctx.get("User-Agent"));
		let requestInfo = {
			name: ctx?.state?.user?.name || "",
			ip: ctx.ip, // 真实 IP
			ip_source: ctx.get("X-Forwarded-For") || ctx.get("x-real-ip") ||  ctx.ip,
			desc:  ctx.originalUrl,
			browser:  `${brow.browser} ${brow.version}`,
			req_time: `${ms}ms`,
			req_method: ctx.method,
			req_status: ctx.status,  
			req_url: ctx.originalUrl,
			created: new Date(),
		}
		// 缺少请求参数、GET、POST
		// const result = await mongoService.insertOne("__operate", requestInfo)

		const msg = `${ctx.method} - ${ctx.originalUrl} - ${ctx.status} - ${ms}ms`;
		winstonInstance.log(logLevel, msg);
	};
};
export default logger