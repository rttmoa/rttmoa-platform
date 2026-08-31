import Router = require("@koa/router");
import Sap from "@/src/controllers/Wms/Sap";
const router = new Router();
 
router.get("/GetData", Sap.GetToekn);


// ! 前端同步按钮：
router.get("/Get_Unit", Sap.Get_Unit); // 前端同步按钮：获取单位    /api/Sap/Get_Unit
router.get("/Get_wareHouse", Sap.Get_wareHouse); // 前端同步按钮：获取仓库
router.get("/Get_Leading", Sap.Get_Leading); //前端同步按钮： 获取领用部门
router.get("/Get_Cost_Center", Sap.Get_Cost_Center); // 前端同步按钮：获取成本中心
router.get("/Get_Material", Sap.Get_Material); // 前端同步按钮：获取物料主数据



// ! 原料SAP单据、成品SAP单据获取单据列表 + 单据明细
// router.post("/Common_Filter_by_date_demand", Sap.Common_Filter_by_date_demand); // 查询单号列表：其他函数中调用此函数，通过日期范围查询单号
// router.post("/Common_demand_detail", Sap.Common_demand_detail); // 单据明细：采购入库单、需求出库单、销售出库单



// ============================= 成品库 - 入库 - 生产入库单=============================
router.post("/Product_prod_verify", Sap.Product_prod_verify); // 成品入库：校验 生产入库单 √
router.post("/Product_prod_send", Sap.Product_prod_send); // 成品入库：推送单据给SAP √
router.post("/Product_prod_finish", Sap.Product_prod_finish); // 成品入库：入库完成数据推送SAP √

// ============================= 成品库 - 出库 - 其他出库 =============================  
router.post("/Product_Out_Other_SendSAP", Sap.Product_Out_Other_SendSAP); // 成品出库：其他出、回传SAP

// ============================= 原料库 - 出库 - 获取销售订单明细 ============================= 
router.post("/Product_sale_detail", Sap.Product_sale_detail); // 成品出库：获取销售订单明细 
router.post("/Product_sale_finish", Sap.Product_sale_finish); // 成品出库：销售订单完成回传SAP
 
// ============================= 原料库 - 出库 - 需求出库(生产领料单) =============================
router.post("/Material_demand_detail", Sap.Material_demand_detail); // 获取明细
router.post("/Material_demand_finish", Sap.Material_demand_finish); // 入库完成回传SAP



// ============================= 原料库 - 采购入库 =============================
router.post("/Material_purchase_get", Sap.Material_purchase_get); // 获取明细
router.post("/Material_purchase_finish", Sap.Material_purchase_finish); // 入库完成回传SAP


// ============================= 原料库 - 获取销售退货订单 ============================= 
router.post("/Product_sale_back_detail", Sap.Product_sale_back_detail); // 成品出库：获取销售订单明细 
router.post("/Product_sale_back_finish", Sap.Product_sale_back_finish); // 成品出库：销售订单完成回传SAP



// ============================= 原料库 - 其他入库回传SAP =============================  
router.post("/Product_Enter_Other_SendSap", Sap.Product_Enter_Other_SendSap);  // 成品入库：其他入、回传SAP

 



// 根据范围查询单据信息：
router.post("/Filter_by_date_sale", Sap.Filter_by_date_sale); // 销售订单 范围过滤
router.post("/Filter_by_date_purchase", Sap.Filter_by_date_purchase); // 采购订单 范围过滤
router.post("/Filter_by_date_demand", Sap.Filter_by_date_demand); // 需求出库 范围过滤

 




export default router;

