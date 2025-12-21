import Router from '@koa/router';
const router = new Router();

import stockRouter from './stock';
import stockRecordRouter from './stock_record';
import stockDetailRouter from './stock_detail';
import stockDetailHisRouter from './stock_detail_his';

export default (app: any) => {
  router.use('/cwwarm/stock', stockRouter.routes());
  router.use('/cwwarm/stockRecord', stockRecordRouter.routes());
  router.use('/cwwarm/stockDetail', stockDetailRouter.routes());
  router.use('/cwwarm/stockDetailHis', stockDetailHisRouter.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
