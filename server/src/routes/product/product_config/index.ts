import Router from '@koa/router';
const router = new Router();

import product_chilled_assign from './hk_chilled_assign__c';
import product_chilled_assign_col from './hk_chilled_assign_col__c';
import product_chilled_lay_distribution from './hk_chilled_lay_distribution__c';
import product_freezing_assign from './hk_freezing_assign__c';
import product_freezing_assign_col from './hk_freezing_assign_col__c';
import product_freezing_lay_distribution from './hk_freezing_lay_distribution__c';


// 成品库出入库任务表
// 成品库发送WCS任务表
export default (app: any) => {
  router.use('/product_config/product_freezing_assign', product_freezing_assign.routes());

  router.use('/product_config/product_freezing_assign_col', product_freezing_assign_col.routes());

  router.use('/product_config/product_freezing_lay_distribution', product_freezing_lay_distribution.routes()); 

  router.use('/product_config/product_chilled_assign', product_chilled_assign.routes());

  router.use('/product_config/product_chilled_assign_col', product_chilled_assign_col.routes());


  router.use('/product_config/product_chilled_lay_distribution', product_chilled_lay_distribution.routes());
  
  app.use(router.routes()).use(router.allowedMethods());
};
