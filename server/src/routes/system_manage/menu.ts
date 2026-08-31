import Router = require("@koa/router");
import Menu from "../../controllers/system_manage/menu";
const router = new Router();

router.get("/initMenu", Menu.InitMenu);  // 初始化菜单

router.post("/addMenu", Menu.addMenu); // 新增菜单
router.post("/modMenu", Menu.UpMenu);
router.post("/delMenu", Menu.DelMenu); // 删除菜单

router.post("/delMoreMenu", Menu.DelMoreMenu); // 删除多个菜单

router.get("/allMenu", Menu.findMenu);

 
export default router;
 


// & 菜单结构以目前数据库中的为准、从库中取出处理后结果