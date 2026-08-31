import Router = require("@koa/router");
// import PDA from "@/src/controllers/wcs_wms/pda";
// import Controllers from "../../controllers/wcs_wms/index";
import Scheduled from "../../controllers/Wms/schedule";
const router = new Router();

// * ===============================================================   定时器部分    ===============================================================
// √ gwms详情表 -> 码垛区-手动选择码垛位置
router.post("/gwms_detail/manual_select_md_loc", Scheduled.gwms_detail_selectMdLoc); // 写入码垛位置表：1分钟查一次
 

router.post("/history", Scheduled.history_task); // 处理历史任务

export default router;
