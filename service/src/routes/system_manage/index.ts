import Router from '@koa/router';
const router = new Router();
import User from './user';
import Menu from './menu';
import Job from './job';
import Role from './role';
import Dept from './dept';
import restApi from './restApi';
import Login from './login';
import Sys from './sys';
import koajwt from 'koa-jwt';
import { config } from '../../config/config';

 

export default (app: any) => {
	router.use('/restApi', restApi.routes());
	
	router.use('/sys', Sys.routes());  // sys 模块

	router.use('/userp', User.routes());
	router.use('/login', Login.routes());
	router.use('/role', Role.routes());
	

	const jwtMiddleware: any = koajwt({ secret: config.jwtkey }).unless({
		path: ['/user/login', '/userp/login', '/user/loginVerification', '/swagger.html'] as any,
	});
	router.use(jwtMiddleware);

	router.use('/dept', Dept.routes()); // 部门
	router.use('/jb', Job.routes()); // 岗位
	router.use('/menu', Menu.routes()); // 菜单

	app.use(router.routes()).use(router.allowedMethods());
};
