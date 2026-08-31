import Router from "@koa/router";
const router = new Router();

// 导入模块路由聚合器
import systemRoutes from "./system_manage";
import monitorRoutes from "./system_monitor";
import moduleRoutes from "./business_module";
 import configRoutes from './config'
import router_material from './mater/index'
import router_product from './product/index'
import router_global from './global_wms'
import router_pack from './pack'
import router_auxiliary from './auxiliary'
import Wcs_Wms_PDA from "./Wms"; 

export default (app: any) => {

	configRoutes(app) // 表格配置相关

	moduleRoutes(app); // Module — 库存可视化模块

	monitorRoutes(app); // Monitor — 系统监控模块路由
 
	systemRoutes(app); // System — 系统管理

	router_material(app)  // 原料库模块
	router_product(app)  // 成品库模块
	router_pack(app)  // 包材库模块
	router_auxiliary(app)  // 辅料库模块
	router_global(app) // SAP主数据 + WMS主数据	
  

	Wcs_Wms_PDA(app); // PDA - WCS


	app.use(router.routes()).use(router.allowedMethods());
};
 
	
// {
//   "code": 200,
//   "msg": "请求成功",
//   "data": {
//     "success": true,
//    "message": "回传SAP成功，任务结束！"
//   }
// }
// {
//   "code": 200,
//   "msg": "请求成功",
//   "data": {
//     "success": false,
//     "message": "状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！"
//   }
// }
// {
//   "code": 500,
//   "data": null,
//   "msg": "connect ETIMEDOUT 117.135.61.175:8042"
// }