import { Context } from 'koa';
import { getBrowser } from '../../utils'; 
import { mongoService } from './m.mongoService';

// * 错误处理中间件
const errorHandle = async (ctx: Context, next: () => Promise<any>) => {
  await next(); 

  // ====== 日志采集字段 ======
  // 用户名、IP、IP来源、描述、状态码、浏览器、创建日期、异常详情
  const brow =  getBrowser(ctx.get("User-Agent"));
  const logData = {
    name: ctx.state.user?.name || 'Anonymous', // 如果你用 JWT 或 session，可以提前存到 ctx.state
    ip: ctx.ip, // 真实 IP
    ip_source: ctx.get("X-Forwarded-For") || ctx.ip, // 结合代理头
    desc: ctx.request.url, // 当前访问接口
    status: ctx.status, // 状态码
    browser:  `${brow.browser} ${brow.version}`, // 浏览器信息
    created: new Date(), // 创建时间
    // msg: err.message || err.stack // 错误详情
  };
 
  // console.error("错误日志：", logData);
  try {
    if (ctx.status !== 200) { 
      const body: any = ctx.body 
      const status = body?.code;
      const msg = body?.msg;
      const info = {status, msg}
      // const result = await mongoService.insertOne("__error", {...logData, ...info})
    }

    // 如果下游没有处理响应
    if (ctx.status === 404 && !ctx.body) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: "Error Handle Not Found"
      };
    }
  } catch (err: any) {
    console.log('middlewares/app/errorHandle 捕捉错误 ==> ', err.message);

    if (ctx.status !== 200) {
      const body: any = ctx.body
      const status = err.status;
      const msg = err.message || err.stack;
      const info = {status, msg}
      // 用户名、IP、IP来源、描述、状态码、浏览器、创建日期、异常详情
      const result = await mongoService.insertOne("error", {...logData, ...info})
    }

    if (err.status === 401 && err.name === 'UnauthorizedError') {
      ctx.status = 401;

      let message;
      if (err.message.includes('expired')) {
        message = 'Token expired. Please log in again.';
      } else {
        message = err.message;
      }

      return ctx.sendError(401, message);
    } else {
      ctx.status = err.status || 500;
      return ctx.sendError(ctx.status, err.message || 'Server error.');
    }
  }
};

export default errorHandle;