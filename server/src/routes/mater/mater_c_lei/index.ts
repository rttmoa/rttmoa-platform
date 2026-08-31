import Router from '@koa/router';
const router = new Router();
 
import hk_mater_lei_pda_entry__c from './hk_mater_lei_pda_entry__c';
import hk_mater_lei_stock_d__c from './hk_mater_lei_stock_d__c';
import hk_mater_lei_pda_out__c from './hk_mater_lei_pda_out__c';

import hk_mater_lei_pda_entry_his__c from './hk_mater_lei_pda_entry_his__c';
import hk_mater_lei_stock_d_his__c from './hk_mater_lei_stock_d_his__c';
import hk_mater_lei_pda_out_his__c from './hk_mater_lei_pda_out_his__c';

// hk_mater_lei_pda_entry__c
// hk_mater_lei_stock_d__c
// hk_mater_lei_pda_out__c
// hk_mater_lei_pda_entry_his__c
// hk_mater_lei_stock_d_his__c
// hk_mater_lei_pda_out_his__c


export default (app: any) => {

  router.use('/mater_c_lei/hk_mater_lei_pda_entry__c', hk_mater_lei_pda_entry__c.routes());

  router.use('/mater_c_lei/hk_mater_lei_stock_d__c', hk_mater_lei_stock_d__c.routes());

  router.use('/mater_c_lei/hk_mater_lei_pda_out__c', hk_mater_lei_pda_out__c.routes());  
  

  router.use('/mater_c_lei/hk_mater_lei_pda_entry_his__c', hk_mater_lei_pda_entry_his__c.routes());

  router.use('/mater_c_lei/hk_mater_lei_stock_d_his__c', hk_mater_lei_stock_d_his__c.routes());

  router.use('/mater_c_lei/hk_mater_lei_pda_out_his__c', hk_mater_lei_pda_out_his__c.routes());  

  
  
  app.use(router.routes()).use(router.allowedMethods());
};




