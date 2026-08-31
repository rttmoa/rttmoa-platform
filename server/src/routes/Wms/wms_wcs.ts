import Router = require("@koa/router");
import Material from "@/src/controllers/Wms/wms_assign_material/wms_wcs_material";
import Product from "@/src/controllers/Wms/wms_assign_product/wms_wcs_product";
const router = new Router();


// 接口前缀： "/api/Wcs/Material_Roundup"
// ====================================================================【原料库 WCS_WMS】====================================================================
// 入库部分
router.post("/Enter_Stock_Receive_Pallet", Material.receive_wcs_raw_material); // 原料库入库分配库位
router.post("/Enter_Stock_Receive_Pallet_Finish", Material.enter_receive_pallet_task_finish); // 原料库入库完成 + 出库完成

// 出库部分
router.post("/Material_OutStock_Find", Material.Material_OutStock_Find); //  执行出库单据，寻找物料  
// router.post("/Material_OutStock_SendWcs", Material.Material_OutStock_SendWcs); // 出库下发WCS

// 盘点部分
router.post("/Material_Roundup", Material.Material_Roundup); // 执行盘点任务


// 其他部分
// router.post("/Test_Material_Enter_Stock_Dis", Material.Test_Material_Enter_Stock_Dis);// 测试 - 原料入库分配,循环调用
// router.post("/Material_Update_Stock_Group", Material.Material_Update_Stock_Group); // 更新货架表组号



// ====================================================================【成品库 WCS_WMS】====================================================================
// 入库部分
router.post("/Enter_Stock_Receive_Pallet_Product", Product.receive_wcs_raw_Product); // 成品库入库分配库位
router.post("/Enter_Stock_Receive_Pallet_Finish_Product", Product.enter_receive_pallet_task_finish); // 成品库入库完成接口 + 出库完成

// 出库部分
router.post("/Product_OutStock_Find", Product.Product_OutStock_Find); // 执行出库单据，寻找物料   
// router.post("/Product_OutStock_SendWcs", Product.Product_OutStock_SendWcs); // 出库下发WCS

// 盘点部分
router.post("/Product_Roundup_Freezing", Material.Product_Roundup_Freezing); //  盘点任务 - 冷冻库
router.post("/Product_Roundup_Chiled", Material.Product_Roundup_Chiled); //  盘点任务 - 冷藏库



// 其他部分
// router.post("/Product_Update_Stock_Group_Product", Material.Product_Update_Stock_Group_Product); // 更新货架表组号
// router.post("/Test_Product_EnterStock_Dis", Product.Enter_Stock_Test_Distruction) // 测试 - 成品入库分配，循环调用，依次查看分配状态
// router.post("/Test_Product_OutStock_Find", Product.Out_Stock_Product); // 测试 - 出库寻找物料
// router.post("/Test_Product_OutStock_SendWcs", Product.Test_Product_OutStock_SendWcs); // 测试 - 出库下发WCS
// router.post("/Move_Stock_Receive_Pallet_Finish_Product", Product.Move_receive_pallet_task_finish); // 成品库：移库完成

export default router;
