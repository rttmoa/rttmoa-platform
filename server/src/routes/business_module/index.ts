import Router from '@koa/router';
const router = new Router();

import Storage_nb from './storage_nb';
import storage_kd_cwwarm from './storage_kd_cwwarm';
import Storage_kd_keepwarm from './storage_kd_keepwarm';

 
import visual_product_freezing from './visual_product_freezing';
import visual_product_chilled from './visual_product_chilled';
import visual_material from './visual_material';




export default (app: any) => {
	router.use('/shelf', Storage_nb.routes());
	router.use('/storage_kd_cwwarm', storage_kd_cwwarm.routes());
	router.use('/storage_kd_keepwarm', Storage_kd_keepwarm.routes());


	router.use('/visual_product_freezing', visual_product_freezing.routes());

	router.use('/visual_product_chilled', visual_product_chilled.routes()); 


	router.use('/visual_material', visual_material.routes());  // 原料库
 

	app.use(router.routes()).use(router.allowedMethods());
};
