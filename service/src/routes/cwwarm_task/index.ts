import Router from '@koa/router';
const router = new Router();

import moveTaskRouter from './move_task';
import scRecordRouter from './sc_record';
import scTaskRouter from './sc_task';
import taskRouter from './task';
import taskHisRouter from './task_his';
import scTaskHisRouter from './sc_task_his';

export default (app: any) => {
  router.use('/cwwarm/task/moveTask', moveTaskRouter.routes());
  router.use('/cwwarm/task/scRecord', scRecordRouter.routes());
  router.use('/cwwarm/task/scTask', scTaskRouter.routes());
  router.use('/cwwarm/task/task', taskRouter.routes());
  router.use('/cwwarm/task/taskHis', taskHisRouter.routes());
  router.use('/cwwarm/task/scTaskHis', scTaskHisRouter.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
