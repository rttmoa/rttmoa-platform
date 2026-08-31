import Router from '@koa/router';
const router = new Router();
import Monitor from './monitor';
import Operate from './operate';
import ErrorLog from './errorLog';

export default (app: any) => {
	router.use('/error', ErrorLog.routes());
	router.use('/monitor', Monitor.routes());
	router.use('/operate', Operate.routes());

	app.use(router.routes()).use(router.allowedMethods());
};
