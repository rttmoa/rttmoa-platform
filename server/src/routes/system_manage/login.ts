import Router = require("@koa/router");
import Login from "../../controllers/system_manage/login";
const router = new Router();

 
 
router.post("/login", Login.login); // 登陆
router.post("/logout", Login.logout);  // 退出
router.post("/register", Login.register);  // 注册



export default router;
