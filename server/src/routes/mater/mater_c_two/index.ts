import Router from "@koa/router";
const router = new Router();

import hk_mater_two_pda_entry__c from "./hk_mater_two_pda_entry__c";
import hk_mater_two_stock_d__c from "./hk_mater_two_stock_d__c";
import hk_mater_two_pda_out__c from "./hk_mater_two_pda_out__c";

import hk_mater_two_pda_entry_his__c from "./hk_mater_two_pda_entry_his__c";
import hk_mater_two_stock_d_his__c from "./hk_mater_two_stock_d_his__c";
import hk_mater_two_pda_out_his__c from "./hk_mater_two_pda_out_his__c";

import hk_mater_two_stock_d_barcode from "./hk_mater_two_stock_d_barcode";
import hk_mater_two_stock_d_barcode_his from "./hk_mater_two_stock_d_barcode_his";

// hk_mater_two_pda_entry__c
// hk_mater_two_stock_d__c
// hk_mater_two_pda_out__c
// hk_mater_two_pda_entry_his__c
// hk_mater_two_stock_d_his__c
// hk_mater_two_pda_out_his__c
// hk_mater_two_stock_d_barcode   原料二号库存条码表
// hk_mater_two_stock_d_barcode_his   【历史】原料二号库存条码表

export default (app: any) => {
	router.use("/mater_c_two/hk_mater_two_pda_entry__c", hk_mater_two_pda_entry__c.routes());

	router.use("/mater_c_two/hk_mater_two_stock_d__c", hk_mater_two_stock_d__c.routes());

	router.use("/mater_c_two/hk_mater_two_pda_out__c", hk_mater_two_pda_out__c.routes());

	router.use("/mater_c_two/hk_mater_two_pda_entry_his__c", hk_mater_two_pda_entry_his__c.routes());

	router.use("/mater_c_two/hk_mater_two_stock_d_his__c", hk_mater_two_stock_d_his__c.routes());

	router.use("/mater_c_two/hk_mater_two_pda_out_his__c", hk_mater_two_pda_out_his__c.routes());

	
	router.use("/mater_c_two/hk_mater_two_stock_d_barcode", hk_mater_two_stock_d_barcode.routes());
 
	router.use("/mater_c_two/hk_mater_two_stock_d_barcode_his", hk_mater_two_stock_d_barcode_his.routes());


	app.use(router.routes()).use(router.allowedMethods());
};
