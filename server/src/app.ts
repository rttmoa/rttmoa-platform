import koa from "koa";
import json from "koa-json";
import bodyparser from "koa-bodyparser";
import winston from "winston";
import { _errorHandle, _sendHandle, _dbHandle, _logger, _CrossDomain, _Security, _Public, _Mongo, _Http } from "./middlewares/index.ts";
import RouterManager from "./routes/index.ts";
import { ensureSchedulerReady } from "./schedule";
import { startAllSchedules } from "./schedule/exec.ts";

const app = new koa();
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
require("dotenv").config({ path: `.env` });

const listenHost = process.env.SERVER_HOST || "0.0.0.0";
const displayHost = listenHost === "0.0.0.0" ? "127.0.0.1" : listenHost;
const portRaw = process.env.SERVER_PORT ?? process.env.PORT;
const portParsed = Number(portRaw);
const listenPort = Number.isFinite(portParsed) && portParsed > 0 ? portParsed : 4001;
app.use(json()); // json中间件
app.use(bodyparser()); // body参数解析中间价
app.use(_Security()); // 安全头
app.use(_CrossDomain()); // 跨域
app.use(_Public()); // 静态资源

app.use(_Mongo()); // 挂载 ctx.mongo
app.use(_Http()); // 挂载 ctx.http
app.use(_sendHandle()); // 挂载 ctx.sendError
// app.use(_dbHandle()); // mysql
app.use(_logger(winston)); //* 请求日志
app.use(_errorHandle); // * 异常中间件

// unprotect(app); // & Router
// protect(app); 

RouterManager(app);

// startPolling()

// let displayHostConfig = "0.0.0.0"
app.listen(listenPort, () => {
	console.dir(`---------------------------------- koa is listening in http://${displayHost}:${listenPort} -------------------------------------`);

	setTimeout(async () => {
		await ensureSchedulerReady();
		startAllSchedules();
	}, 5000);
});
