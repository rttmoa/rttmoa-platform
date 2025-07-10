import * as Koa from "koa";
const cors = require("@koa/cors");

const crossDomain = {
	INIT(app: Koa): void {
		// ! 允许跨域请求 【简单、安全】
		app.use(
			cors({
				origin: "*", // 可设置为指定域名，例如：http://localhost:9527
				// origin: (ctx: any) => {
				// 	const allowedOrigins = ['http://localhost:9527', 'http://127.0.0.1:9527']
				// 	if (allowedOrigins.includes(ctx.request.header.origin)) { return ctx.request.header.origin }
				// 	return 'http://localhost:9527'
				// },
				credentials: true, // 如果需要支持 cookie
				allowMethods: ["GET", "POST", "PUT", "DELETE"],
				allowHeaders: ["Content-Type", "Authorization"],
			})
		);

		// 截获所有请求处理跨域 【不推荐】
		// app.use(async (ctx, next) => {
		// 	const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1", "http://157.122.54.189:9090", "http://192.168.50.2:9091", "http://172.16.2.23:9091", "http://103.44.145.245", "http://localhost:9089", "http://localhost:9527", "http://127.0.0.1:9527"];

		// 	const origin = ctx.request.header.origin;
		// 	if (allowedOrigins.includes(origin)) {
		// 		ctx.set("Access-Control-Allow-Origin", origin);
		// 	}
		// 	ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		// 	ctx.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		// 	ctx.set("Access-Control-Allow-Credentials", "true");

		// 	if (ctx.method === "OPTIONS") {
		// 		ctx.status = 204;
		// 	} else {
		// 		await next();
		// 	}
		// });
	},
};

export default crossDomain;
