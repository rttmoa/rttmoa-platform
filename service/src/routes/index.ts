import Router from '@koa/router';
const router = new Router(); 

// 导入模块路由聚合器
import tanhuaRoutes from './tanhua';
import systemRoutes from './system_manage';
import monitorRoutes from './system_monitor';
import moduleRoutes from './business_module';

 

export default (app: any) => {
	tanhuaRoutes(app); // tanhua模块路由 - 受保护部分

	moduleRoutes(app); // Module — 现场作业模块
	
	monitorRoutes(app); // Monitor — 系统监控模块路由

	systemRoutes(app); // System — 系统管理

	app.use(router.routes()).use(router.allowedMethods());
};
