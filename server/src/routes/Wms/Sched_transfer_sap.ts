import Router = require("@koa/router");
import transfer_sap from "@/src/controllers/Wms/Sched_transfer_sap";
const router = new Router();



// 先优化代码，后添加 辅料 包材 回传

// 回传SAP  原料雷马、原料中铁、原料二号库、

// ========================================================== 【原料库】 ==========================================================
router.post("/Material_e_purchase", transfer_sap.Material_e_purchase); // 原料入库 - 采购入库单     - 状态(null | 重新执行 -> 未执行)
router.post("/Material_e_sale_back", transfer_sap.Material_e_sale_back); // 原料入库 - 销售退货  - 状态(null | 重新执行 -> 未执行)    从批次主数据取数据
router.post("/Material_o_sale", transfer_sap.Material_o_sale); // 原料出库 - 销售出库单  - 状态(null | 重新执行 -> 未执行)    
router.post("/Material_o_demand", transfer_sap.Material_o_demand); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)    
router.post("/Material_o_other", transfer_sap.Material_o_other); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)   
 

router.post("/Material_o_demand_move01", transfer_sap.m1); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)      原料雷马外租冻库 - 原料一号冻库(出库+入库)
router.post("/Material_o_demand_move02", transfer_sap.m2); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)      原料中铁外租冻库 - 原料一号冻库(出库+入库)
router.post("/Material_o_demand_move03", transfer_sap.m3); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)      原料雷马外租冻库 - 原料二号冻库(出库+入库)
router.post("/Material_o_demand_move04", transfer_sap.m4); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)      原料中铁外租冻库 - 原料二号冻库(出库+入库)
router.post("/Material_o_demand_move05", transfer_sap.m5); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)      线边库 - 原料一号冻库(入库)
router.post("/Material_o_demand_move06", transfer_sap.m6); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)      线边库 - 原料二号冻库(入库)

router.post("/Material_o_other_move01", transfer_sap.o1); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)         原料雷马外租冻库 - 原料一号冻库(出库+入库)
router.post("/Material_o_other_move02", transfer_sap.o2); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)         原料中铁外租冻库 - 原料一号冻库(出库+入库)
router.post("/Material_o_other_move03", transfer_sap.o3); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)         原料雷马外租冻库 - 原料二号冻库(出库+入库)
router.post("/Material_o_other_move04", transfer_sap.o4); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)         原料中铁外租冻库 - 原料二号冻库(出库+入库)
router.post("/Material_o_other_move05", transfer_sap.o5); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)         线边库 - 原料一号冻库(入库)
router.post("/Material_o_other_move06", transfer_sap.o6); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)         线边库 - 原料二号冻库(入库)





 
// ========================================================== 【成品库】 ==========================================================
router.post("/Product_e_production", transfer_sap.Product_e_production); // 成品入库 - 生产入库单  - 状态(null | 重新执行 -> 未执行)   0 
router.post("/Product_o_sale", transfer_sap.Product_o_sale); // 成品出库 - 销售出库单 - 状态(null | 重新执行 -> 未执行)    S 
router.post("/Product_o_demand", transfer_sap.Product_o_demand); // 成品出库 - 需求出库单 - 状态(null | 重新执行 -> 未执行)    0 
router.post("/Product_o_other", transfer_sap.Product_o_other); // 成品出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)    0




// ========================================================== 【辅料库】 ==========================================================
router.post("/Auxiliary_e_purchase", transfer_sap.Auxiliary_e_purchase); // 原料入库 - 采购入库单     - 状态(null | 重新执行 -> 未执行)
router.post("/Auxiliary_e_sale_back", transfer_sap.Auxiliary_e_sale_back); // 原料入库 - 销售退货  - 状态(null | 重新执行 -> 未执行)    从批次主数据取数据
router.post("/Auxiliary_o_sale", transfer_sap.Auxiliary_o_sale); // 原料出库 - 销售出库单  - 状态(null | 重新执行 -> 未执行)    
router.post("/Auxiliary_o_demand", transfer_sap.Auxiliary_o_demand); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)    
router.post("/Auxiliary_o_other", transfer_sap.Auxiliary_o_other); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)   

router.post("/Auxiliary_o_demand_move", transfer_sap.Auxiliary_o_demand_move); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)     "api/Scheduled/transfer_sap/Auxiliary_o_demand_move"
router.post("/Auxiliary_o_other_move", transfer_sap.Auxiliary_o_other_move); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)  
// 在表格中勾选一条数据，如果是采购入库单，将勾选的数据传递到服务端接口"/Scheduled/transfer_sap/Auxiliary_e_purchase",如果是销售退货单传递到服务端接口"/Scheduled/transfer_sap/Auxiliary_e_sale_back"，如果是销售出库单传递到服务端接口"/Scheduled/transfer_sap/Auxiliary_o_sale"，如果是需求出库单传递到服务端接口"/Scheduled/transfer_sap/Auxiliary_o_demand"，如果是其他出库单传递到服务端接口"/Scheduled/transfer_sap/Auxiliary_o_other"，接收到服务单返回的结果后提示信息，并取消勾选的数据



// ========================================================== 【包材库】 ==========================================================
router.post("/Pack_e_purchase", transfer_sap.Pack_e_purchase); // 原料入库 - 采购入库单     - 状态(null | 重新执行 -> 未执行)
router.post("/Pack_e_sale_back", transfer_sap.Pack_e_sale_back); // 原料入库 - 销售退货  - 状态(null | 重新执行 -> 未执行)    从批次主数据取数据
router.post("/Pack_o_sale", transfer_sap.Pack_o_sale); // 原料出库 - 销售出库单  - 状态(null | 重新执行 -> 未执行)    
router.post("/Pack_o_demand", transfer_sap.Pack_o_demand); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)    
router.post("/Pack_o_other", transfer_sap.Pack_o_other); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)   
router.post("/Pack_o_deman_move", transfer_sap.Pack_o_deman_move); // 原料出库 - 需求出库单   - 状态(null | 重新执行 -> 未执行)    线边库到包材库   "api/Scheduled/transfer_sap/Pack_o_deman_move"
router.post("/Pack_o_other_move", transfer_sap.Pack_o_other_move); // 原料出库 - 其他出库单  - 状态(null | 重新执行 -> 未执行)     线边库到包材库



// 在表格中勾选一条数据，如果是采购入库单，将勾选的数据传递到服务端接口"/Scheduled/transfer_sap/Pack_e_purchase",如果是销售退货单传递到服务端接口"/Scheduled/transfer_sap/Pack_e_sale_back"，如果是销售出库单传递到服务端接口"/Scheduled/transfer_sap/Pack_o_sale"，如果是需求出库单传递到服务端接口"/Scheduled/transfer_sap/Pack_o_demand"，如果是其他出库单传递到服务端接口"/Scheduled/transfer_sap/Pack_o_other"，接收到服务单返回的结果后提示信息，并取消勾选的数据








export default router;
