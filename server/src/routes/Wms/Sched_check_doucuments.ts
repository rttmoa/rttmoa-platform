import Router = require("@koa/router");
import CheckDocs from "@/src/controllers/Wms/Sched_check_doucuments";
const router = new Router();


// ============================================ 原料库 【校验字段】 ============================================
// //  定时器 > 校验字段 > 原料入库：其他入库单
// router.post("/material_e_manual", CheckDocs.material_e_manual); // 原料库 - 手动 - 其他入  - 状态(null | 重新执行 -> 正在执行)

//  定时器 > 校验字段 > 原料入库：采购入
router.post("/material_e_auto", CheckDocs.material_e_auto); // 原料库 - 自动 - 采购入、销售退  - 状态(null | 重新执行 -> 正在执行)

// 定时器 > 校验字段 > 原料入库：销售退 | 校验是否有批号，根据批号找到物料主数据中的数据并更新，更新后，是否与采购入库单中的入库字段相同
router.post("/material_e_sale_back", CheckDocs.material_e_sale_back); // 原料库 - 自动 - 采购入、销售退  - 状态(null | 重新执行 -> 正在执行)

// 定时器 > 校验字段 > 原料出库：其他出  
router.post("/material_o_manual", CheckDocs.material_o_manual); // 原料库 - 手动 - 其他出  - 状态(null | 重新执行 -> 未执行)

// 定时器 > 校验字段 > 原料出库：销售出、需求出 
router.post("/material_o_auto", CheckDocs.material_o_auto); // 原料库 - 自动- 销售出、需求出  - 状态(null | 重新执行 -> 未执行)




// ============================================ 成品库 【校验字段】 ============================================
// 定时器 > 校验字段 > 成品入库：生产入库单
router.post("/Product_e_production", CheckDocs.Product_e_production); // 成品库 - 手动 - 生产入库单 - 状态(null | 重新执行 -> 正在执行)

// 定时器 > 校验字段 > 成品出库：其他出库单
router.post("/Product_o_other", CheckDocs.Product_o_other); // 成品库 - 手动 - 其他出库单  - 状态(null | 重新执行 -> 未执行)

// 定时器 > 校验字段 > 成品出库：销售出、需求出
router.post("/Product_o_compound", CheckDocs.Product_o_compound); // 成品库 - 自动 - 销售出、需求出  - 状态(null | 重新执行 -> 未执行)




// ============================================ 成品库 【推送SAP单据】 ============================================
// 定时器 > 推送SAP > 成品入库：生产入库单
router.post("/Product_send_production", CheckDocs.Product_send_production); // 成品库 - 手动 - 生产入库单 推送SAP




// ============================================ 辅料 【校验字段】 ============================================
//  定时器 > 校验字段 > 原料入库：采购入
router.post("/auxiliry_e_auto", CheckDocs.auxiliry_e_auto); // 原料库 - 自动 - 采购入、销售退  - 状态(null | 重新执行 -> 正在执行)

// 定时器 > 校验字段 > 原料入库：销售退 | 校验是否有批号，根据批号找到物料主数据中的数据并更新，更新后，是否与采购入库单中的入库字段相同
router.post("/auxiliry_e_sale_back", CheckDocs.auxiliry_e_sale_back); // 原料库 - 自动 - 采购入、销售退  - 状态(null | 重新执行 -> 正在执行)

// 定时器 > 校验字段 > 原料出库：其他出  
router.post("/auxiliry_o_manual", CheckDocs.auxiliry_o_manual); // 原料库 - 手动 - 其他出  - 状态(null | 重新执行 -> 未执行)

// 定时器 > 校验字段 > 原料出库：销售出、需求出 
router.post("/auxiliry_o_auto", CheckDocs.auxiliry_o_auto); // 原料库 - 自动- 销售出、需求出  - 状态(null | 重新执行 -> 未执行)





// ============================================ 包材 【校验字段】 ============================================
//  定时器 > 校验字段 > 原料入库：采购入
router.post("/pack_e_auto", CheckDocs.pack_e_auto); // 原料库 - 自动 - 采购入、销售退  - 状态(null | 重新执行 -> 正在执行)

// 定时器 > 校验字段 > 原料入库：销售退 | 校验是否有批号，根据批号找到物料主数据中的数据并更新，更新后，是否与采购入库单中的入库字段相同
router.post("/pack_e_sale_back", CheckDocs.pack_e_sale_back); // 原料库 - 自动 - 采购入、销售退  - 状态(null | 重新执行 -> 正在执行)

// 定时器 > 校验字段 > 原料出库：其他出  
router.post("/pack_o_manual", CheckDocs.pack_o_manual); // 原料库 - 手动 - 其他出  - 状态(null | 重新执行 -> 未执行)

// 定时器 > 校验字段 > 原料出库：销售出、需求出 
router.post("/pack_o_auto", CheckDocs.pack_o_auto); // 原料库 - 自动- 销售出、需求出  - 状态(null | 重新执行 -> 未执行)









export default router;
