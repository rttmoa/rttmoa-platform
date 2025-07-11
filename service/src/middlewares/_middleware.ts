import { mongoService } from "./mongo/_dbMongoService";



//* 挂载到 ctx 上、这样直接调用ctx就可以了 
// ✅ 总结 步骤：
// ✅ 1	在中间件中挂载 ctx.mongoService
// ✅ 2	确保 app.use(dbMongoService) 被调用
// ✅ 3	使用 TypeScript 类型声明扩展 Koa.Context
// ✅ 4	控制器中即可使用 ctx.mongoService，IDE 自动提示
export default async (ctx: any, next: () => Promise<any>): Promise<any> => {
	// ctx.cookies.get("unique_info")

	ctx.mongo = mongoService; 
	console.log('中间件 ctx 挂载 mongoService')
	await next();
};