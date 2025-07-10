import Router = require("@koa/router");
import Job from "../../controllers/system_manage/job";
const router = new Router();



router.get("/allJob", Job.allJob);  // 查询

router.post("/addJob", Job.addJob); 
router.post("/modifyJob", Job.modifyJob); 
router.delete("/delJob", Job.delJob); 
router.post("/delMoreJob", Job.delMoreJob); 


 
export default router;
