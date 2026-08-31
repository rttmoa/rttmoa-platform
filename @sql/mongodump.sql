! : 备份数据库：命令 — 导出：   

导入整个数据库(删除并导入)
mongorestore  --host 127.0.0.1  --port 27017 --drop  -d rttmoa_platform  C:\rrr\steedos_haikouZY

导入(直接导入)
mongorestore --host=127.0.0.1 --port=27017  -d steedos_haikouZY   C:\rrr\steedos_kedongFH

导入所有表中的某个表
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_nbzy_v2  --collection nb_jk_data__c  C:\rrr\nb_jk_data__c.bson


导出全部数据库：
mongodump -h 127.0.0.1 --port 27017 -d steedos_haikouZY -o    E:\Project\upack\upack-haikouZY@2.1.85\@sql-本地





 

-- 原料库：SAP单据详情、PDA收货表、货架表、库存表、库存条码表、主任务表、WCS任务表、条码规则表
-- 成品库: SAP单据详情、初禹数据、成品货架表、成品库存表、成品条码表
-- 批次主数据、全局批号管理
-- 配置信息等



mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_lay_distribution__c  C:\rrr\steedos_haikouZY\hk_mater_lay_distribution__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_freezing_lay_distribution__c  C:\rrr\steedos_haikouZY\hk_freezing_lay_distribution__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_chilled_lay_distribution__c  C:\rrr\steedos_haikouZY\hk_chilled_lay_distribution__c.bson
  
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_main_mater_data__c  C:\rrr\steedos_haikouZY\hk_main_mater_data__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_main_global_batch__c  C:\rrr\steedos_haikouZY\hk_main_global_batch__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_interface_sap_wms__c  C:\rrr\steedos_haikouZY\hk_interface_sap_wms__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_batch_material_main__c  C:\rrr\steedos_haikouZY\hk_batch_material_main__c.bson
  

mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_stock__c  C:\rrr\steedos_haikouZY\hk_mater_stock__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_stock_detail__c  C:\rrr\steedos_haikouZY\hk_mater_stock_detail__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_stock_detail_barcode__c  C:\rrr\steedos_haikouZY\hk_mater_stock_detail_barcode__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_barcode_rule__c  C:\rrr\steedos_haikouZY\hk_mater_barcode_rule__c.bson 
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_doc__c  C:\rrr\steedos_haikouZY\hk_mater_doc__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_doc_detail__c  C:\rrr\steedos_haikouZY\hk_mater_doc_detail__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_pda_receipt__c  C:\rrr\steedos_haikouZY\hk_mater_pda_receipt__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_pda_outgoing__c  C:\rrr\steedos_haikouZY\hk_mater_pda_outgoing__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_task__c  C:\rrr\steedos_haikouZY\hk_mater_task__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_wcs_task__c  C:\rrr\steedos_haikouZY\hk_mater_wcs_task__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_interface_record__c  C:\rrr\steedos_haikouZY\hk_mater_interface_record__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_doc_his__c  C:\rrr\steedos_haikouZY\hk_mater_doc_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_doc_detail_his__c  C:\rrr\steedos_haikouZY\hk_mater_doc_detail_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_pda_receipt_his__c  C:\rrr\steedos_haikouZY\hk_mater_pda_receipt_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_task_his__c  C:\rrr\steedos_haikouZY\hk_mater_task_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_wcs_task_his__c  C:\rrr\steedos_haikouZY\hk_mater_wcs_task_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_stock_detail_his__c  C:\rrr\steedos_haikouZY\hk_mater_stock_detail_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_stock_detail_barcode_his__c  C:\rrr\steedos_haikouZY\hk_mater_stock_detail_barcode_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_mater_pda_outgoing_his__c  C:\rrr\steedos_haikouZY\hk_mater_pda_outgoing_his__c.bson


mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_doc__c  C:\rrr\steedos_haikouZY\hk_product_doc__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_doc_detail__c  C:\rrr\steedos_haikouZY\hk_product_doc_detail__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_chuyu__c  C:\rrr\steedos_haikouZY\hk_product_chuyu__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_freezing_stock__c  C:\rrr\steedos_haikouZY\hk_freezing_stock__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_freezing_stock_detail__c  C:\rrr\steedos_haikouZY\hk_freezing_stock_detail__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_freezing_stock_detail_barcode__c  C:\rrr\steedos_haikouZY\hk_freezing_stock_detail_barcode__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_chilled_stock__c  C:\rrr\steedos_haikouZY\hk_chilled_stock__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_chilled_stock_detail__c  C:\rrr\steedos_haikouZY\hk_chilled_stock_detail__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_chilled_stock_detail_barcode__c  C:\rrr\steedos_haikouZY\hk_chilled_stock_detail_barcode__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_interface_record__c  C:\rrr\steedos_haikouZY\hk_product_interface_record__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_task__c  C:\rrr\steedos_haikouZY\hk_product_task__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_wcs_task__c  C:\rrr\steedos_haikouZY\hk_product_wcs_task__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_pda_outgoing__c  C:\rrr\steedos_haikouZY\hk_product_pda_outgoing__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_doc_his__c  C:\rrr\steedos_haikouZY\hk_product_doc_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_doc_detail_his__c  C:\rrr\steedos_haikouZY\hk_product_doc_detail_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_chuyu_his__c  C:\rrr\steedos_haikouZY\hk_product_chuyu_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_task_his__c  C:\rrr\steedos_haikouZY\hk_product_task_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_wcs_task_his__c  C:\rrr\steedos_haikouZY\hk_product_wcs_task_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_freezing_stock_detail_his__c  C:\rrr\steedos_haikouZY\hk_freezing_stock_detail_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_freezing_stock_detail_barcode_his__c  C:\rrr\steedos_haikouZY\hk_freezing_stock_detail_barcode_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_chilled_stock_detail_his__c  C:\rrr\steedos_haikouZY\hk_chilled_stock_detail_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_chilled_stock_detail_barcode_his__c  C:\rrr\steedos_haikouZY\hk_chilled_stock_detail_barcode_his__c.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection hk_product_pda_outgoing_his__c  C:\rrr\steedos_haikouZY\hk_product_pda_outgoing_his__c.bson










-- 导入 rttmoa-platform 服务端表
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __dept  C:\rrr\steedos_kedongFH\__dept.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __error  C:\rrr\steedos_kedongFH\__error.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __job  C:\rrr\steedos_kedongFH\__job.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __menu  C:\rrr\steedos_kedongFH\__menu.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __operate  C:\rrr\steedos_kedongFH\__operate.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __role  C:\rrr\steedos_kedongFH\__role.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __sys  C:\rrr\steedos_kedongFH\__sys.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __user  C:\rrr\steedos_kedongFH\__user.bson
mongorestore  --host 127.0.0.1 --port 27017   --drop   -d steedos_haikouZY  --collection __user_manage  C:\rrr\steedos_kedongFH\__user_manage.bson

