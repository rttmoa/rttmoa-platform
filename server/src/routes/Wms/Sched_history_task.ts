import Router = require("@koa/router");
import history_task from "@/src/controllers/Wms/Sched_history_task";
const router = new Router();








// 单据表 + 单据详情表 + PDA入库表 + PDA出库表
router.post("/material_document_lei", history_task.material_document_lei); // 原料雷马
router.post("/material_document_tie", history_task.material_document_tie); // 原料中铁
router.post("/material_document_two", history_task.material_document_two); // 原料二号库
router.post("/material_document_mater", history_task.material_document_mater); // 原料库


router.post("/material_document", history_task.material_document); // 原料库：单据详情表 + PDA入库表 + PDA出库表
router.post("/Product_document", history_task.Product_document); // 成品库： 单据详情表 + PDA入库表 + PDA出库表

router.post("/pack_document", history_task.pack_document); // 包材库
router.post("/Auxilliry_document", history_task.Auxilliry_document); // 辅料库







// WCS 主任务 + WCS 下发任务
router.post("/material_wms_wcs_task", history_task.material_wms_wcs_task); // 原料库： 出入库主任务 + 发送WCS任务表
router.post("/Product_wms_wcs_task", history_task.Product_wms_wcs_task); // 成品库： 出入库主任务 + 发送WCS任务表





export default router;
