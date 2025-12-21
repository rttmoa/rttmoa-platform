import Router from '@koa/router';
const router = new Router();

// 导入模块路由聚合器
import tanhuaRoutes from './tanhua';
import systemRoutes from './system_manage';
import screenRoutes from './screen'
import monitorRoutes from './system_monitor';
import moduleRoutes from './business_module';

import keepwarmDocRoutes from './keepwarm_doc';
import keepwarmStockRoutes from './keepwarm_stock';
import keepwarmConfigRoutes from './keepwarm_config';
import keepwarmTaskRoutes from './keepwarm_task';

import cwwarmDocRoutes from './cwwarm_doc'
import cwwarmStockRoutes from './cwwarm_stock'
import cwwarmConfigRoutes from './cwwarm_config'
import cwwarmTaskRoutes from './cwwarm_task'

export default (app: any) => {
	// tanhuaRoutes(app); // tanhua模块路由 - 受保护部分


	screenRoutes(app) // 数据大屏 + 出入库大屏显示接口

	moduleRoutes(app); // Module — 库存可视化模块

	// 【保温库管理】
	keepwarmDocRoutes(app); // keepwarm_doc — 保温库单据管理
	keepwarmStockRoutes(app); // keepwarm_stock — 保温库库存模块
  keepwarmConfigRoutes(app); // keepwarm_config — 保温库配置模块
  keepwarmTaskRoutes(app); // keepwarm_task — 保温库任务模块

	// 【常温库管理】
	cwwarmDocRoutes(app);  
	cwwarmStockRoutes(app);  
  cwwarmConfigRoutes(app);  
  cwwarmTaskRoutes(app);  


	monitorRoutes(app); // Monitor — 系统监控模块路由

	systemRoutes(app); // System — 系统管理

	app.use(router.routes()).use(router.allowedMethods());
};
