import Router from "@koa/router";
const router = new Router();

import hk_mater_doc__c from "./hk_mater_doc__c";
import hk_mater_doc_detail__c from "./hk_mater_doc_detail__c";
import hk_mater_barcode_rule__c from "./hk_mater_barcode_rule__c";

import hk_mater_doc_his__c from "./hk_mater_doc_his__c";
import hk_mater_doc_detail_his__c from "./hk_mater_doc_detail_his__c";


export default (app: any) => {
	router.use("/mater_doc/hk_mater_doc__c", hk_mater_doc__c.routes());

	router.use("/mater_doc/hk_mater_doc_detail__c", hk_mater_doc_detail__c.routes());

	router.use("/mater_doc/hk_mater_barcode_rule__c", hk_mater_barcode_rule__c.routes()); // 原料库条码规则
 
	router.use("/mater_doc/hk_mater_doc_his__c", hk_mater_doc_his__c.routes());

	router.use("/mater_doc/hk_mater_doc_detail_his__c", hk_mater_doc_detail_his__c.routes());
 
	app.use(router.routes()).use(router.allowedMethods());
};



