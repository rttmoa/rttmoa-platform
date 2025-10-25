import Router = require("@koa/router");
import Sys from "../../controllers/system_manage/sys";
const router = new Router();



router.post("/job", Sys.findJob);  // 查询

router.post("/jobAdd", Sys.addJob); // 增加

router.put("/job/:id", Sys.modifyJob); // 修改

router.delete("/job/:id", Sys.delJob);  // 删除

router.post("/jobDel", Sys.delMoreJob);  // 删除更多


router.post("/jobEx", Sys.ExJob);  // 删除更多

 
export default router;
