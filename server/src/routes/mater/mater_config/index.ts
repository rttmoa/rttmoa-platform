import Router from '@koa/router';
const router = new Router();
 
import hk_mater_assign__c from './hk_mater_assign__c';
import hk_mater_assign_col__c from './hk_mater_assign_col__c';
import hk_mater_lay_distribution__c from './hk_mater_lay_distribution__c';







export default (app: any) => {

  router.use('/mater_config/hk_mater_assign__c', hk_mater_assign__c.routes());

  router.use('/mater_config/hk_mater_assign_col__c', hk_mater_assign_col__c.routes());

  router.use('/mater_config/hk_mater_lay_distribution__c', hk_mater_lay_distribution__c.routes());  
  
  app.use(router.routes()).use(router.allowedMethods());
};
