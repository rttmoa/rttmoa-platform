import Router from "@koa/router";
const router = new Router();

import global_sap from "./global_sap";
import global_wms from "./global_wms";

export default (app: any) => {

	// sap 
	global_sap(app);

	// wms
	global_wms(app);

	app.use(router.routes()).use(router.allowedMethods());
};
