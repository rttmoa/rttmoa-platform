import Router = require("@koa/router");
import Student from "../../controllers/system_manage/student";
const router = new Router();

  
router.get("/student", Student.findDept); // 获取学生

router.post("/student", Student.addDept); // 新增 学生
router.put("/student/:id", Student.modifyDept); // 修改 学生
router.delete("/student/:id", Student.DelDept); // 删除 学生（建议软删）

  
export default router;
