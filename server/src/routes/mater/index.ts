import Router from "@koa/router";
const router = new Router();

import mater_task_routes from "./mater_task";
import mater_doc_routes from "./mater_docment";
import mater_stock_routes from "./mater_stock";
import mater_config_routes from "./mater_config";

import mater_common_lei_routes from './mater_c_lei'
import mater_common_tie_routes from './mater_c_tie'
import mater_common_two_routes from './mater_c_two'

export default (app: any) => {


 	mater_doc_routes(app); // 原料库单据模块

	mater_task_routes(app); // 任务模块：原料一号、原料二号、雷马、中铁 - PDA

	mater_stock_routes(app); // 库存模块，原料一号、原料二号、雷马、中铁 - 库存
	
	mater_config_routes(app); // 仓库配置模块

	

	mater_common_lei_routes(app)  // 雷马库

	mater_common_tie_routes(app)  // 中铁库
	
	mater_common_two_routes(app)  // 二号库


	app.use(router.routes()).use(router.allowedMethods());
};




// E:\Project\upack\upack-haikouZY@2.1.85\server\src\routes\mater\index.ts这个文件下，
// 	router.use("/mater_doc/hk_mater_doc_his__c", hk_mater_doc_his__c.routes());

// 	router.use("/mater_doc/hk_mater_doc_detail_his__c", hk_mater_doc_detail_his__c.routes());
//     router.use('/mater_stock/hk_mater_stock_detail_his__c', hk_mater_stock_detail_his__c.routes());  
  
//   router.use('/mater_stock/hk_mater_stock_detail_barcode_his__c', hk_mater_stock_detail_barcode_his__c.routes());  

  
//   router.use('/mater_task/hk_mater_task_his__c', hk_mater_task_his__c.routes()); 

//   router.use('/mater_task/hk_mater_wcs_task_his__c', hk_mater_wcs_task_his__c.routes()); 

//   router.use('/mater_task/hk_mater_pda_receipt_his__c', hk_mater_pda_receipt_his__c.routes()); 

//   router.use('/mater_task/hk_mater_pda_outgoing_his__c', hk_mater_pda_outgoing_his__c.routes()); 这些接口根据前端E:\Project\upack\upack-haikouZY@2.1.85\rttmoa-platform-haikouZY\src\view 文件下去找对应的index.tsx文件，并更新访问服务端的接口，替换index.tsx文件中api对象