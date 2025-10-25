import Router from '@koa/router';
import koajwt from 'koa-jwt';
const router = new Router();
import { config } from '../config/config';
import user from './tanhua/user';
import my from './tanhua/my';
import friends from './tanhua/friends';
import qz from './tanhua/qz';
import message from './tanhua/message';
import Storage_nb from './business_module/storage_nb';
import Storage_kd from './business_module/storage_kd';
import User from './system_manage/user';
import Menu from './system_manage/menu';
import Monitor from './system_monitor/monitor';
import Job from './system_manage/job';
import Role from './system_manage/role';
import Dept from './system_manage/dept';
import restApi from './system_manage/restApi';
import Operate from './system_monitor/operate';
import ErrorLog from './system_monitor/errorLog'; 
import Login from './system_manage/login'; 
import Sys from './system_manage/sys'; 

export const unprotect = (app: any) => {
	router.use('/restApi', restApi.routes()); // RESTful 格式的 API
	router.use('/shelf', Storage_nb.routes());
	router.use('/storage_kd', Storage_kd.routes());
	router.use('/userp', User.routes());
	router.use('/login', Login.routes());
	router.use('/role', Role.routes());

	router.use('/error', ErrorLog.routes());
	router.use('/monitor', Monitor.routes());
	router.use('/operate', Operate.routes()); // * 操作日志
	router.use('/sys', Sys.routes()); // * 操作日志
	
	app.use(router.routes()).use(router.allowedMethods());
};

// 无 ctx.state.name、需要将路由放在 koajwt 后面

// 不保护的路由需要放在 koajwt 前面
export const protect = (app: any) => {
	const jwtMiddleware: any = koajwt({ secret: config.jwtkey }).unless({
		path: ['/user/login', '/userp/login', '/user/loginVerification', '/swagger.html'] as any,
	});
	router.use(jwtMiddleware);

	router.use('/user', user.routes());
	router.use('/friends', friends.routes());
	router.use('/qz', qz.routes());
	router.use('/message', message.routes());
	router.use('/my', my.routes());

	router.use('/dept', Dept.routes()); // 部门
	router.use('/jb', Job.routes()); // * 岗位模板
	router.use('/menu', Menu.routes());

	app.use(router.routes()).use(router.allowedMethods());
};
