import Router from '@koa/router';
const router = new Router();

import stockRouter from './stock';
import stockRecordRouter from './stock_record';
import stockDetailRouter from './stock_detail';
import stockDetailHisRouter from './stock_detail_his';

export default (app: any) => {
  router.use('/keepwarm/stock', stockRouter.routes());
  router.use('/keepwarm/stockRecord', stockRecordRouter.routes());
  router.use('/keepwarm/stockDetail', stockDetailRouter.routes());
  router.use('/keepwarm/stockDetailHis', stockDetailHisRouter.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
