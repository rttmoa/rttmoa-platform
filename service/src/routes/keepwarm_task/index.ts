import Router from '@koa/router';
const router = new Router();

import moveTaskRouter from './move_task';
import scRecordRouter from './sc_record';
import scTaskRouter from './sc_task';
import taskRouter from './task';
import taskHisRouter from './task_his';
import scTaskHisRouter from './sc_task_his';

export default (app: any) => {
  router.use('/keepwarm/task/moveTask', moveTaskRouter.routes());
  router.use('/keepwarm/task/scRecord', scRecordRouter.routes());
  router.use('/keepwarm/task/scTask', scTaskRouter.routes());
  router.use('/keepwarm/task/task', taskRouter.routes());
  router.use('/keepwarm/task/taskHis', taskHisRouter.routes());
  router.use('/keepwarm/task/scTaskHis', scTaskHisRouter.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
