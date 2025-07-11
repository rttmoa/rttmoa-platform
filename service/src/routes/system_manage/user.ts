import Router = require("@koa/router");
import User from "../../controllers/system_manage/user";
const router = new Router();

router.get("/fakeUser", User.InsFakeUser); // 生成500个

router.post("/ins_User", User.InsUser);
router.get("/up_User", User.UpUser);
router.delete("/users", User.DelUser); // 删除
router.post("/delMoreUsers", User.DelMoreUser); // 删除更多用户

 
router.get("/users1", User.FindProTableUser); // ProTable 获取用户
router.get("/users2", User.FindUserManager); // UserManager 用户管理获取用户


 
router.post("/login", User.Login); // 登陆
router.post("/logout", User.Logout);  // 退出
router.post("/register", User.register);  // 注册



export default router;
