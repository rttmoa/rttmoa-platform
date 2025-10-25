import Router from '@koa/router';
import koajwt from 'koa-jwt';
const router = new Router();
import { config } from '../config/config';

// 导入模块路由聚合器
import tanhuaRoutes from './tanhua';
import businessRoutes from './business_module';
import systemManageRoutes from './system_manage';
import systemMonitorRoutes from './system_monitor';

export const unprotect = (app: any) => {
	// 系统管理模块路由 - 未受保护部分
	router.use('/restApi', systemManageRoutes.restApi.routes());
	router.use('/userp', systemManageRoutes.user.routes());
	router.use('/login', systemManageRoutes.login.routes());
	router.use('/role', systemManageRoutes.role.routes());
	router.use('/sys', systemManageRoutes.sys.routes());
	
	// 业务模块路由
	router.use('/shelf', businessRoutes.storage_nb.routes());
	router.use('/storage_kd', businessRoutes.storage_kd.routes());
	
	// 系统监控模块路由
	router.use('/error', systemMonitorRoutes.errorLog.routes());
	router.use('/monitor', systemMonitorRoutes.monitor.routes());
	router.use('/operate', systemMonitorRoutes.operate.routes());
	
	app.use(router.routes()).use(router.allowedMethods());
};

// 无 ctx.state.name、需要将路由放在 koajwt 后面

// 不保护的路由需要放在 koajwt 前面
export const protect = (app: any) => {
	const jwtMiddleware: any = koajwt({ secret: config.jwtkey }).unless({
		path: ['/user/login', '/userp/login', '/user/loginVerification', '/swagger.html'] as any,
	});
	router.use(jwtMiddleware);

	// tanhua模块路由 - 受保护部分
	router.use('/user', tanhuaRoutes.user.routes());
	router.use('/friends', tanhuaRoutes.friends.routes());
	router.use('/qz', tanhuaRoutes.qz.routes());
	router.use('/message', tanhuaRoutes.message.routes());
	router.use('/my', tanhuaRoutes.my.routes());
	
	// 系统管理模块路由 - 受保护部分
	router.use('/dept', systemManageRoutes.dept.routes());
	router.use('/jb', systemManageRoutes.job.routes());
	router.use('/menu', systemManageRoutes.menu.routes());

	app.use(router.routes()).use(router.allowedMethods());
};