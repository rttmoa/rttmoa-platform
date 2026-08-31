import Router from '@koa/router';
const router = new Router();

import product_freezing_stock from './hk_freezing_stock__c';
import product_freezing_stock_detail from './hk_freezing_stock_detail__c';
import product_freezing_stock_detail_barcode from './hk_freezing_stock_detail_barcode__c';
import product_chilled_stock from './hk_chilled_stock__c';
import product_chilled_stock_detail from './hk_chilled_stock_detail__c';
import product_chilled_stock_detail_barcode from './hk_chilled_stock_detail_barcode__c';

 
import hk_freezing_stock_detail_his__c from './hk_freezing_stock_detail_his__c';
import hk_freezing_stock_detail_barcode_his__c from './hk_freezing_stock_detail_barcode_his__c';
import hk_chilled_stock_detail_his__c from './hk_chilled_stock_detail_his__c';
import hk_chilled_stock_detail_barcode_his__c from './hk_chilled_stock_detail_barcode_his__c';
export default (app: any) => {
  // 冷冻库
  router.use('/product_stock/product_freezing_stock', product_freezing_stock.routes());
  router.use('/product_stock/product_freezing_stock_detail', product_freezing_stock_detail.routes());
  router.use('/product_stock/product_freezing_stock_detail_barcode', product_freezing_stock_detail_barcode.routes());

  // 冷藏库
  router.use('/product_stock/product_chilled_stock', product_chilled_stock.routes());
  router.use('/product_stock/product_chilled_stock_detail', product_chilled_stock_detail.routes());
  router.use('/product_stock/product_chilled_stock_detail_barcode', product_chilled_stock_detail_barcode.routes()) 


  router.use('/product_stock/hk_freezing_stock_detail_his__c', hk_freezing_stock_detail_his__c.routes()) 
  router.use('/product_stock/hk_freezing_stock_detail_barcode_his__c', hk_freezing_stock_detail_barcode_his__c.routes()) 
  router.use('/product_stock/hk_chilled_stock_detail_his__c', hk_chilled_stock_detail_his__c.routes()) 
  router.use('/product_stock/hk_chilled_stock_detail_barcode_his__c', hk_chilled_stock_detail_barcode_his__c.routes()) 

 




  app.use(router.routes()).use(router.allowedMethods());
};


