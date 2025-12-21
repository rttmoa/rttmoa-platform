import Router from '@koa/router';
const router = new Router();

import create_order from './create_order';
import create_order_his from './create_order_his';
import create_order_bind from './bind_task'; 
import create_order_bind_his from './bind_task_his'; 

 

export default (app: any) => {
	router.use('/cwwarm/createOrder', create_order.routes());
	router.use('/cwwarm/createOrderHis', create_order_his.routes());

	router.use('/cwwarm/createOrderBind', create_order_bind.routes()); 
	router.use('/cwwarm/createOrderBindHis', create_order_bind_his.routes()); 

	app.use(router.routes()).use(router.allowedMethods());
};
