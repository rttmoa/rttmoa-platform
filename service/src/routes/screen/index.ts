import Router from '@koa/router';
const router = new Router();

import screenDisplay from './screen';


export default (app: any) => {
  router.use('/screen/display', screenDisplay.routes());
  
  app.use(router.routes()).use(router.allowedMethods());
};
