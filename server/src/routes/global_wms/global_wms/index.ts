import Router from '@koa/router';
const router = new Router();
 
import hk_main_global__c from './hk_main_global__c';
import hk_main_global_batch__c from './hk_main_global_batch__c';
import hk_main_global_country__c from './hk_main_global_country__c';
import hk_batch_material_main__c from './hk_batch_material_main__c';
import hk_phone_account__c from './hk_phone_account__c';
import hk_interface_sap_wms__c from './hk_interface_sap_wms__c';

 
export default (app: any) => {
  router.use('/global_wms/hk_batch_material_main__c', hk_batch_material_main__c.routes());

  router.use('/global_wms/hk_main_global__c', hk_main_global__c.routes());

  router.use('/global_wms/hk_main_global_batch__c', hk_main_global_batch__c.routes());

  router.use('/global_wms/hk_main_global_country__c', hk_main_global_country__c.routes());
  
  router.use('/global_wms/hk_phone_account__c', hk_phone_account__c.routes());
 
  router.use('/global_wms/hk_phone_account__c', hk_phone_account__c.routes());

  router.use('/global_wms/hk_interface_sap_wms__c', hk_interface_sap_wms__c.routes());
 

  app.use(router.routes()).use(router.allowedMethods());
};
