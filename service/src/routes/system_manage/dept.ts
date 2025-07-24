import Router = require("@koa/router");
import Dept from "../../controllers/system_manage/dept";
const router = new Router();

 
// router.get("/departments/:id"); // 查询单个部门详情
router.get("/departments", Dept.findDept); // 获取部门树列表

router.post("/department", Dept.addDept); // 新增部门
router.put("/department/:id", Dept.modifyDept); // 修改部门
router.delete("/department/:id", Dept.DelDept); // 删除部门（建议软删）



router.get("/departmentsTest", Dept.TestData); //    http://127.0.0.1:6300/dept/departmentsTest?username=zsss


export default router;


// 注意：删除部门时、如果两个部门名重复(错误问题)、无法删除子部门、需要不同的key才可以