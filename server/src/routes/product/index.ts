import Router from "@koa/router";
const router = new Router();

import product_task_routes from "./product_task";
import product_doc_routes from "./product_docment";
import product_stock_routes from "./product_stock";
import product_config_routes from "./product_config";

export default (app: any) => {
	// 成品库模块
	product_doc_routes(app); // 单据模块

	product_task_routes(app); // 任务模块

	product_stock_routes(app); // 库存模块

	product_config_routes(app); // 仓库配置模块
 

	app.use(router.routes()).use(router.allowedMethods());
};





	

// E:\Project\upack\upack-haikouZY@2.1.85\server\src\routes\product\index.ts这个文件下，
  // router.use('/product_doc/hk_product_doc_his__c', hk_product_doc_his__c.routes()); 

  // router.use('/product_doc/hk_product_doc_detail_his__c', hk_product_doc_detail_his__c.routes()); 

  // router.use('/product_doc/hk_product_chuyu_his__c', hk_product_chuyu_his__c.routes()); 

  //  router.use('/product_stock/hk_freezing_stock_detail_his__c', hk_freezing_stock_detail_his__c.routes()) 
  // router.use('/product_stock/hk_freezing_stock_detail_barcode_his__c', hk_freezing_stock_detail_barcode_his__c.routes()) 
  // router.use('/product_stock/hk_chilled_stock_detail_his__c', hk_chilled_stock_detail_his__c.routes()) 
  // router.use('/product_stock/hk_chilled_stock_detail_barcode_his__c', hk_chilled_stock_detail_barcode_his__c.routes()) 

 
  // router.use('/product_task/hk_product_task_his__c', hk_product_task_his__c.routes()); // 成品PDA出库 
  // router.use('/product_task/hk_product_wcs_task_his__c', hk_product_wcs_task_his__c.routes()); // 成品PDA出库 
  // router.use('/product_task/hk_product_pda_outgoing_his__c', hk_product_pda_outgoing_his__c.routes()); // 成品PDA出库 
	//  这些接口根据前端E:\Project\upack\upack-haikouZY@2.1.85\rttmoa-platform-haikouZY\src\view 文件下去找对应的index.tsx文件，并更新访问服务端的接口，替换index.tsx文件中api对象