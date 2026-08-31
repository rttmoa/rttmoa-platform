import Router = require("@koa/router");
import other_task from "@/src/controllers/Wms/Sched_other_task";
const router = new Router();




router.post("/Material_Barcode_Rule", other_task.Material_Barcode_Rule); // 原料库：更新条码规则

 


// ============================================ 【出库任务】 ============================================
router.post("/Material_Send_WCS", other_task.Material_Send_WCS); // 原料库出库：下发WCS任务    /Scheduled/other_task/Material_Send_WCS

router.post("/Product_Send_WCS", other_task.Product_Send_WCS); // 成品库出库：下发WCS任务


 
// 修改Key

// ============================================ 【移库任务】 ============================================
router.post("/Material_Move_t", other_task.Material_Move_t); // 原料库移库表：校验字段并写入出入库任务表中   /Scheduled/other_task/Material_Move_t

router.post("/Material_Move_Send_WCS", other_task.Material_Move_Send_WCS); // 原料库移库：下发WCS任务    /Scheduled/other_task/Material_Send_WCS

router.post("/Product_Move_t", other_task.Product_Move_t); // 成品库移库表：校验字段并写入出入库任务表中   /Scheduled/other_task/Material_Move_t

router.post("/Product_Move_Send_WCS", other_task.Product_Move_Send_WCS); // 成品库移库：下发WCS任务    /Scheduled/other_task/Material_Send_WCS


 

// ============================================ 【更新sap详情表，出入库数量汇总】 ============================================
router.post("/Material_Summary_lei", other_task.Material_Summary_lei); // 原料库雷马
router.post("/Material_Summary_tie", other_task.Material_Summary_tie); // 原料库中铁
router.post("/Material_Summary_two", other_task.Material_Summary_two); // 原料库二号库
router.post("/Material_Document_Update_Quantity", other_task.Mater_s1); // 原料库
router.post("/Product_Document_Update_Quantity", other_task.Pord_s2); // 成品库
router.post("/Auxilliry_Summary", other_task.Auxilliry_Summary); // 辅料
router.post("/Pack_Summary", other_task.Pack_Summary); // 包材





export default router;
