import Router from '@koa/router';
const router = new Router();

import Storage_nb from './storage_nb';
import Storage_kd from './storage_kd';

 

export default (app: any) => {
	router.use('/shelf', Storage_nb.routes());
	router.use('/storage_kd', Storage_kd.routes());

	app.use(router.routes()).use(router.allowedMethods());
};
