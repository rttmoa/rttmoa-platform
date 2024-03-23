'use strict';
/** @param {Egg.Application} app - egg application */
module.exports = app => {
  const { router, controller, jwt } = app;
  const baseRouter = app.config.baseRouter;

  // 分类管理
  router.resources('category', baseRouter + '/category', jwt, controller.module.category);
};
