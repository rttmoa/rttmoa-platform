import koa, { Response, Context } from 'koa'
import Router from '@koa/router'
import	bodyparser from 'koa-bodyparser'
import { errorHandle, sendHandle, dbHandle } from './middlewares/index.ts' 
import routers from './router.ts' 
const router = new Router();
const	app = new koa()
	
app.use(bodyparser());  // body参数解析中间价
app.use(sendHandle());  // 响应中间件
app.use(dbHandle());// 数据库处理中间件
app.use(errorHandle); // 异常中间件 

router.use('/api', routers.routes()); 
app.use(router.routes()).use(router.allowedMethods());



app.listen(9089, () => {
	console.dir('---------------------------------- koa is listening in 9089 -------------------------------------');
})  
