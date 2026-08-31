import Router = require("@koa/router");
import User from "../../controllers/system_manage/user";
const router = new Router();



router.get("/fakeUser", User.addFakeUser); // 生成500个     http://127.0.0.1:6300/userp/fakeUser

router.post("/addUser", User.addUser);
router.put("/putUser/:id", User.upUser); 
router.delete("/users", User.delUser); // 删除
router.post("/delMoreUsers", User.delMoreUser); // 删除更多用户

 
router.get("/users1", User.findProTableUser); // ProTable 获取用户
router.get("/users2", User.findUserManager); // UserManager 用户管理获取用户

 


export default router;
