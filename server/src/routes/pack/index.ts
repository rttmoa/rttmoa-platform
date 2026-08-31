import Router from "@koa/router";
const router = new Router();

import pack_routes from "./product_module"; 









export default (app: any) => { 



	pack_routes(app); // 任务模块 
 

	app.use(router.routes()).use(router.allowedMethods());
};




// 更新前端路由接口：根据服务端的路由接口E:\Project\upack\upack-haikouZY@2.1.85\server\src\routes\pack\product_module\index.ts这个文件中，在客户端E:\Project\upack\upack-haikouZY@2.1.85\rttmoa-platform-haikouZY\src\views\pack文件下找对应的文件，更新index.tsx文件中的api对象路由接口,接口写到E:\Project\upack\upack-haikouZY@2.1.85\rttmoa-platform-haikouZY\src\api\modules\pack.ts这个文件中