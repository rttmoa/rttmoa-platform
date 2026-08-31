import Router from '@koa/router';
const router = new Router();
 
import hk_main_cost_center__c from './hk_main_cost_center__c';
import hk_main_leading_departments__c from './hk_main_leading_departments__c';
import hk_main_mater_data__c from './hk_main_mater_data__c';
import hk_main_unit__c from './hk_main_unit__c';
import hk_main_warehouse__c from './hk_main_warehouse__c';


export default (app: any) => {
  
  router.use('/global_sap/hk_mater_assign__c', hk_main_cost_center__c.routes());

  router.use('/global_sap/hk_main_leading_departments__c', hk_main_leading_departments__c.routes());

  router.use('/global_sap/hk_main_mater_data__c', hk_main_mater_data__c.routes());

  router.use('/global_sap/hk_main_unit__c', hk_main_unit__c.routes());

  router.use('/global_sap/hk_main_warehouse__c', hk_main_warehouse__c.routes());
 
  app.use(router.routes()).use(router.allowedMethods());
};
