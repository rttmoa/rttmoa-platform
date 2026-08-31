import Router = require("@koa/router");
import Screen from "@/src/controllers/Wms/Screen"; 
const router = new Router();

 

// 原料一号库：入库：
// 原料一号库：出库：


// 原料二号库：入库：
// 原料二号库：出库：



// ====================================================================【原料库 WCS_WMS】====================================================================
router.post("/Mater_One", Screen.Fn1); // 原料一号    "/api/Screen/Mater_One"
router.post("/Mater_Two", Screen.Fn2); // 原料二号     "/api/Screen/Mater_Two"


router.post("/Product_Freezing", Screen.Fn3); // 冷冻    "/api/Screen/Product_Freezing"
router.post("/Product_Chiled", Screen.Fn4); // 冷藏     "/api/Screen/Product_Chiled"
 
export default router;
