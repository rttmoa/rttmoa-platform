import koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import winston from 'winston';
import { _errorHandle, _sendHandle, _dbHandle, _logger, _CrossDomain, _Security, _Public, _Mongo } from './middlewares/index.ts';
import RouterManager from './routes/index.ts';
import './schedule';   // # 定时任务

const app = new koa();
// require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
require('dotenv').config({ path: `.env` });

app.use(json()); // json中间件
app.use(bodyparser()); // body参数解析中间价
app.use(_Security()); // 安全头 
app.use(_CrossDomain()); // 跨域 
app.use(_Public()); // 静态资源

app.use(_Mongo()); // 挂载 ctx.mongo
app.use(_sendHandle()); // 挂载 ctx.sendError
// app.use(_dbHandle()); // mysql
app.use(_logger(winston)); //* 请求日志
app.use(_errorHandle); // * 异常中间件
 
// unprotect(app); // & Router  
// protect(app);

RouterManager(app)

 
app.listen(6300, () => {
	console.dir('---------------------------------- koa is listening in http://127.0.0.1:6300 -------------------------------------');
});

// log4js
