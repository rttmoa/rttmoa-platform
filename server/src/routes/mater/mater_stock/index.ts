import Router from '@koa/router';
const router = new Router();
 
import hk_mater_stock__c from './hk_mater_stock__c';
import hk_mater_stock_detail__c from './hk_mater_stock_detail__c';
import hk_mater_stock_detail_barcode__c from './hk_mater_stock_detail_barcode__c';

import hk_mater_stock_detail_his__c from './hk_mater_stock_detail_his__c';
import hk_mater_stock_detail_barcode_his__c from './hk_mater_stock_detail_barcode_his__c';
 


export default (app: any) => {

  router.use('/mater_stock/hk_mater_stock__c', hk_mater_stock__c.routes()); // 原料一号 货架表

  router.use('/mater_stock/hk_mater_stock_detail__c', hk_mater_stock_detail__c.routes());  // 原料一号 库存表

  router.use('/mater_stock/hk_mater_stock_detail_barcode__c', hk_mater_stock_detail_barcode__c.routes());    // 原料一号 条码表



  router.use('/mater_stock/hk_mater_stock_detail_his__c', hk_mater_stock_detail_his__c.routes());  
  
  router.use('/mater_stock/hk_mater_stock_detail_barcode_his__c', hk_mater_stock_detail_barcode_his__c.routes());  
 

  app.use(router.routes()).use(router.allowedMethods());
};


