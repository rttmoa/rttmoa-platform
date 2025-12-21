import Router from '@koa/router';
const router = new Router();

import distributeLayRouter from './distribute_lay';
import distributeLocRouter from './distribute_loc';
import distributeColRouter from './distribute_col';

export default (app: any) => {
  router.use('/keepwarm/config/distributeLay', distributeLayRouter.routes());
  router.use('/keepwarm/config/distributeLoc', distributeLocRouter.routes());
  router.use('/keepwarm/config/distributeCol', distributeColRouter.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
