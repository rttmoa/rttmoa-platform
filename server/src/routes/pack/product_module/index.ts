import Router from '@koa/router';
const router = new Router();
 
import hk_pack_doc__c from './hk_pack_doc__c';
import hk_pack_doc_detail__c from './hk_pack_doc_detail__c'; 
import hk_pack_doc_detail_his__c from './hk_pack_doc_detail_his__c'
import hk_pack_doc_his__c from './hk_pack_doc_his__c'
import hk_pack_interface_record__c from './hk_pack_interface_record__c'
import hk_pack_pda_entry__c from './hk_pack_pda_entry__c'
import hk_pack_pda_entry_his__c from './hk_pack_pda_entry_his__c'
import hk_pack_pda_out__c from './hk_pack_pda_out__c'
import hk_pack_pda_out_his__c from './hk_pack_pda_out_his__c'
import hk_pack_stock_detail__c from './hk_pack_stock_detail__c'
import hk_pack_stock_detail_his__c from './hk_pack_stock_detail_his__c' 
 





export default (app: any) => { 
  router.use('/pack/hk_pack_doc__c', hk_pack_doc__c.routes());  
  router.use('/pack/hk_pack_doc_detail__c', hk_pack_doc_detail__c.routes());  
  router.use('/pack/hk_pack_doc_detail_his__c', hk_pack_doc_detail_his__c.routes()); 
  router.use('/pack/hk_pack_doc_his__c', hk_pack_doc_his__c.routes()); 
  router.use('/pack/hk_pack_interface_record__c', hk_pack_interface_record__c.routes()); 
  router.use('/pack/hk_pack_pda_entry__c', hk_pack_pda_entry__c.routes()); 
  router.use('/pack/hk_pack_pda_entry_his__c', hk_pack_pda_entry_his__c.routes()); 
  router.use('/pack/hk_pack_pda_out__c', hk_pack_pda_out__c.routes()); 
  router.use('/pack/hk_pack_pda_out_his__c', hk_pack_pda_out_his__c.routes()); 
  router.use('/pack/hk_pack_stock_detail__c', hk_pack_stock_detail__c.routes()); 
  router.use('/pack/hk_pack_stock_detail_his__c', hk_pack_stock_detail_his__c.routes()); 




  app.use(router.routes()).use(router.allowedMethods());
};
 

// 根据服务端的路由接口E:\Project\upack\upack-haikouZY@2.1.85\server\src\routes\pack\product_module\index.ts这个文件中，在客户端E:\Project\upack\upack-haikouZY@2.1.85\rttmoa-platform-haikouZY\src\views\pack文件下找对应的文件，更新index.tsx文件中的api对象路由接口,接口写到E:\Project\upack\upack-haikouZY@2.1.85\rttmoa-platform-haikouZY\src\api\modules\pack.ts这个文件中