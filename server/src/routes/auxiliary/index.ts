import Router from '@koa/router';
import auxiliary_routes from './auxiliary_module';

const router = new Router();

export default (app: any) => {
	auxiliary_routes(app);

	app.use(router.routes()).use(router.allowedMethods());
};
