import Router = require("@koa/router"); 
import Btn_Common from "@/src/controllers/Wms/Btn_Common";
const router = new Router();



 

// ========================================================== 【原料外租库】 ==========================================================
router.post("/mater_lei_entry", Btn_Common.mater_lei_entry); // 原料雷马入库         "/Btn_Common/mater_lei_entry"
router.post("/mater_lei_out_g", Btn_Common.mater_lei_out_g); // 原料雷马出库获取库存         "/Btn_Common/mater_lei_out_g"
router.post("/mater_lei_out", Btn_Common.mater_lei_out); // 原料雷马出库         "/Btn_Common/mater_lei_out"

router.post("/meter_tie_enter", Btn_Common.meter_tie_enter); // 原料中铁入库         "/Btn_Common/meter_tie_enter"
router.post("/mater_tie_out_g", Btn_Common.mater_tie_out_g); // 原料中铁出库获取库存         "/Btn_Common/mater_lei_entry"
router.post("/mater_tie_out", Btn_Common.mater_tie_out); // 原料中铁出库         "/Btn_Common/meter_tie_enter"







// ========================================================== 【辅料库】 ==========================================================
// 辅料入库使用PDA入库
// 出库点击按钮出库
router.post("/auxiliary_out", Btn_Common.auxiliary_out); // 辅料库执行出库按钮    "/Btn_Common/auxiliary_out"



// ========================================================== 【包材库】 ==========================================================
// 入库
router.post("/pack_entry", Btn_Common.pack_entry); // 包材入库         "/Btn_Common/pack_entry"
// 移库
router.post("/pack_move", Btn_Common.pack_move); // 包材移库        "/Btn_Common/pack_move"
// 出库
router.post("/pack_out_g", Btn_Common.pack_out_g); // 包材出库获取库存         "/Btn_Common/pack_out_g"
router.post("/pack_out", Btn_Common.pack_out); // 包材库执行出库按钮
 






export default router;
