import Router from "@koa/router";
const router = new Router();
import Config from "../../controllers/config/index";









export default (app: any) => {


	router.post("/ConFig/TableListView", Config.TableListView); // * 表格：列表视图设置

	router.post("/ConFig/TableListView_Init", Config.TableListView_Init); // * 表格：列表视图设置 初始化

	
	app.use(router.routes()).use(router.allowedMethods());
};
