import Router from '@koa/router';
const router = new Router();
 
import hk_mater_task__c from './hk_mater_task__c';
import hk_mater_wcs_task__c from './hk_mater_wcs_task__c';
import hk_mater_pda_receipt__c from './hk_mater_pda_receipt__c';
import hk_mater_pda_outgoing__c from './hk_mater_pda_outgoing__c';
import hk_mater_interface_record__c from './hk_mater_interface_record__c';

import hk_mater_task_his__c from './hk_mater_task_his__c';
import hk_mater_wcs_task_his__c from './hk_mater_wcs_task_his__c';
import hk_mater_pda_receipt_his__c from './hk_mater_pda_receipt_his__c';
import hk_mater_pda_outgoing_his__c from './hk_mater_pda_outgoing_his__c';
import hk_mater_moves_task__c from './hk_mater_moves_task__c';
 
export default (app: any) => {
  router.use('/mater_task/hk_mater_task__c', hk_mater_task__c.routes()); // 出入库任务

  router.use('/mater_task/hk_mater_wcs_task__c', hk_mater_wcs_task__c.routes()); // 下发WCS任务

  router.use('/mater_task/hk_mater_pda_receipt__c', hk_mater_pda_receipt__c.routes()); 

  router.use('/mater_task/hk_mater_pda_outgoing__c', hk_mater_pda_outgoing__c.routes()); 

  router.use('/mater_task/hk_mater_interface_record__c', hk_mater_interface_record__c.routes()); 
   
  router.use('/mater_task/hk_mater_task_his__c', hk_mater_task_his__c.routes()); 

  router.use('/mater_task/hk_mater_wcs_task_his__c', hk_mater_wcs_task_his__c.routes()); 

  router.use('/mater_task/hk_mater_pda_receipt_his__c', hk_mater_pda_receipt_his__c.routes()); 

  router.use('/mater_task/hk_mater_pda_outgoing_his__c', hk_mater_pda_outgoing_his__c.routes()); 

  router.use('/mater_task/hk_mater_moves_task__c', hk_mater_moves_task__c.routes()); 
  

  app.use(router.routes()).use(router.allowedMethods());
};

