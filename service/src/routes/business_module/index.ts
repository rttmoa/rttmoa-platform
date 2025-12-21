import Router from '@koa/router';
const router = new Router();

import Storage_nb from './storage_nb';
import storage_kd_cwwarm from './storage_kd_cwwarm';
import Storage_kd_keepwarm from './storage_kd_keepwarm';

 

export default (app: any) => {
	router.use('/shelf', Storage_nb.routes());
	router.use('/storage_kd_cwwarm', storage_kd_cwwarm.routes());
	router.use('/storage_kd_keepwarm', Storage_kd_keepwarm.routes());

	app.use(router.routes()).use(router.allowedMethods());
};
