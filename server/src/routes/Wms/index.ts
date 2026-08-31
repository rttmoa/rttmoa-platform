import Router from "@koa/router";
const router = new Router({ prefix: "/api" });

import ChuYu from "./ChuYu";
import Generate_Doc from "./Generate_Doc";
import Sap from "./Sap";
import PdaRouter from "./Pda";
import Wms_Wcs from "./wms_wcs"; 
import Screen from "./Screen"; 
import GlobalConfig from './globalConfig'
import check_Documents from './Sched_check_doucuments'
import transfer_sap from './Sched_transfer_sap'
import history_task from './Sched_history_task'
import Sched_other_task from "./Sched_other_task";
import Btn_Common from './Btn_Common'

export default (app: any) => {
	
	router.use("/ChuYu", ChuYu.routes());
 
	router.use("/Generate", Generate_Doc.routes()); // 生成单据
 
	router.use("/global", GlobalConfig.routes()) // 获取SAP主数据 及 全局配置 及 Test

	router.use("/Pda", PdaRouter.routes()); // PDA
 
	router.use("/Sap", Sap.routes()); // SAP：前端SAP单据获取单据明细 + SAP主数据同步按钮
	  
	router.use("/Wcs", Wms_Wcs.routes()); // 原料，成品入库分配 + 入库完成回传
  
	router.use("/Screen", Screen.routes()); // 出库大屏接口


 
	


	router.use("/Btn_Common", Btn_Common.routes()) // 前端按钮 ~ 平库入库出库操作，原料外租库，原料二号库，辅料，包材

	router.use("/Scheduled/transfer_sap", transfer_sap.routes()) // 前端按钮 ~ 回传SAP完成

 
		
	// ============================================ 【定时器】 ============================================
	router.use("/Scheduled/check_Documents", check_Documents.routes()) // 定时器：校验单据字段 + 推送生产入库单    ！校验字段不重复更新

	router.use("/Scheduled/other_task", Sched_other_task.routes()) // 定时器： 下发出库WCS + 下发移库WCS + 汇总数量

	router.use("/Scheduled/history_task", history_task.routes()) // 【历史任务】

	app.use(router.routes()).use(router.allowedMethods());
}; 