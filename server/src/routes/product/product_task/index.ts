import Router from '@koa/router';
const router = new Router();
 
import product_task from './hk_product_task__c';
import product_task_send_wcs from './hk_product_wcs_task__c'; 
import product_pda_outgoing from './hk_product_pda_outgoing__c'

import hk_product_task_his__c from './hk_product_task_his__c'
import hk_product_wcs_task_his__c from './hk_product_wcs_task_his__c'
import hk_product_pda_outgoing_his__c from './hk_product_pda_outgoing_his__c'

import hk_product_moves_task__c from './hk_product_moves_task__c'

// 成品库出入库任务表
// 成品库发送WCS任务表
export default (app: any) => { 

  router.use('/product_task/product_task', product_task.routes());  // 成品出入库任务表

  router.use('/product_task/product_task_send_wcs', product_task_send_wcs.routes()); // 成品发送WCS任务表

  router.use('/product_task/product_pda_outgoing', product_pda_outgoing.routes()); // 成品PDA出库 
 


  router.use('/product_task/hk_product_task_his__c', hk_product_task_his__c.routes()); // 成品PDA出库 
  router.use('/product_task/hk_product_wcs_task_his__c', hk_product_wcs_task_his__c.routes()); // 成品PDA出库 
  router.use('/product_task/hk_product_pda_outgoing_his__c', hk_product_pda_outgoing_his__c.routes()); // 成品PDA出库 


  router.use('/product_task/hk_product_moves_task__c', hk_product_moves_task__c.routes()); // 成品PDA出库 






  app.use(router.routes()).use(router.allowedMethods());
};
 