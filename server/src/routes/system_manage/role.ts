import Router = require("@koa/router");
import Role from "../../controllers/system_manage/role";
const router = new Router();

router.get("/findRole", Role.findRole); 

router.post("/addRole", Role.addRole); 
router.post("/modifyRole", Role.modifyRole); 
router.delete("/delRole", Role.delRole); 




export default router;


// * 注意点：角色管理
// permission_menu中是字符串数组、树结构 无父节点：['pageMenu']
// menuList是menu数据库中的数据、用户登陆可直接获取角色菜单