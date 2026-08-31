import Router = require("@koa/router");
import globalConfig from "@/src/controllers/Wms/globalConfig";
const router = new Router();




 
router.post("/global_warehouse_info", globalConfig.global_warehouse_info); // 前端获取：获取SAP仓库信息： 库区编码 及 库区 【SAP仓库信息】
 
router.post("/global_material", globalConfig.global_material);  // 前端获取：新建生产入库单/其他出库单 输入物料代码带出物料名称、单位等数据  【SAP物料主数据】

router.post("/global_cost_center", globalConfig.global_cost_center);  // 前端获取：新建生产入库单/其他出库单 输入物料代码带出物料名称、单位等数据  【SAP成本中心】





router.post("/global_latest_Batch", globalConfig.global_latest_Batch); // 原料/成品 入库完成： 获取最新批号函数, 用于生成新批号


router.post("/global_handle_field", globalConfig.global_handle_field); // Apifox调用：获取华炎视图数据库字段 修改UI服务端字段


export default router;