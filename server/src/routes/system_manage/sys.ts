import Router = require("@koa/router");
import routes from "../../controllers/system_manage/sys";
const router = new Router();

// Sys 测试模块

router.post("/query", routes.Query);  // 查询

router.post("/add", routes.Add); // 增加

router.put("/mod/:id", routes.Mod); // 修改

router.delete("/del/:id", routes.Del);  // 删除

router.post("/delMore", routes.DelMore);  // 删除更多

router.post("/importEx", routes.ImportEx);  // 导入Excel表格

 
export default router;
