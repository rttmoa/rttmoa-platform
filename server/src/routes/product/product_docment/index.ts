import Router from '@koa/router';
const router = new Router();

import product_doc from './hk_product_doc__c';
import product_doc_detail from './hk_product_doc_detail__c';
import product_chuyu from './hk_product_chuyu__c';
import product_interface_record from './hk_product_interface_record__c'; 


import hk_product_doc_his__c from './hk_product_doc_his__c'; 
import hk_product_doc_detail_his__c from './hk_product_doc_detail_his__c'; 
import hk_product_chuyu_his__c from './hk_product_chuyu_his__c'; 
// 成品库SAP单据
// 成品库SAP单据详情
// 成品初禹信息
// 成品库 sap_wcs_pad接口记录
export default (app: any) => {
  router.use('/product_doc/product_doc', product_doc.routes());

  router.use('/product_doc/product_doc_detail', product_doc_detail.routes());

  router.use('/product_doc/product_chuyu', product_chuyu.routes());

  router.use('/product_doc/product_interface_record', product_interface_record.routes()); 



 
  router.use('/product_doc/hk_product_doc_his__c', hk_product_doc_his__c.routes()); 

  router.use('/product_doc/hk_product_doc_detail_his__c', hk_product_doc_detail_his__c.routes()); 

  router.use('/product_doc/hk_product_chuyu_his__c', hk_product_chuyu_his__c.routes()); 

  





  app.use(router.routes()).use(router.allowedMethods());
};


 
