import Router from "@koa/router";
import koajwt from 'koa-jwt';
const router = new Router();
import user from "./tanhua/user";
import my from "./tanhua/my";
import friends from "./tanhua/friends";
import qz from "./tanhua/qz";
import message from "./tanhua/message";
import Shelf from "./shelf";
import User from "./system_manage/user";
import Menu from "./system_manage/menu";
import Monitor from "./system_monitor/system_monitor";
import Job from "./system_manage/job";
import Role from "./system_manage/role";
import Dept from "./system_manage/dept";
import restApi from './system_manage/restApi'
import { config } from "../config/config";





export const unprotect = (app: any) => {
	router.use("/restApi", restApi.routes()); // RESTful 格式的 API
	router.use("/shelf", Shelf.routes());
	router.use("/menu", Menu.routes());
	router.use("/userp", User.routes());
	router.use("/monitor", Monitor.routes());
	router.use("/job", Job.routes());
	router.use("/role", Role.routes());
	app.use(router.routes()).use(router.allowedMethods());
};
const jwtMiddleware = koajwt({ secret: config.jwtkey }).unless({
	path: ['/user/login', '/userp/login', '/user/loginVerification', '/swagger.html'] as any,
});
// 不保护的路由需要放在 koajwt 前面
export const protect = (app: any) => {

	router.use(jwtMiddleware)


	router.use("/user", user.routes());
	router.use("/friends", friends.routes());
	router.use("/qz", qz.routes());
	router.use("/message", message.routes());
	router.use("/my", my.routes());
	
	router.use("/dept", Dept.routes());
	


	app.use(router.routes()).use(router.allowedMethods());
};
