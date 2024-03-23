'use strict';
/** @param {Egg.Application} app - egg application */
// TODO: 路由配置：https://www.eggjs.org/zh-CN/basics/router
module.exports = app => {
  const { router, controller, jwt } = app;
  // console.log('app', app);
  // app {
  //   env: 'local',
  //   name: 'server',
  //   baseDir: '\\Project\\\server',
  //   subdomainOffset: 2,
  //   config: '<egg config>',
  //   controller: '<egg controller>',
  //   httpclient: '<egg httpclient>',
  //   loggers: '<egg loggers>',
  //   middlewares: '<egg middlewares>',
  //   router: '<egg router>',
  //   serviceClasses: '<egg serviceClasses>'
  // }

  //  -->  /api/v1
  const baseRouter = app.config.baseRouter;

  require('./routerCategory')(app);
  router.resources('product', baseRouter + '/product', jwt, controller.module.product); // 产品管理
  router.resources('user1', baseRouter + '/user1', jwt, controller.system.user1); // 产品管理

  router.post(baseRouter + '/upload', jwt, controller.utils.uploadFiles); // 上传文件到七牛云

  router.post(baseRouter + '/admin/login', controller.admin.adminLogin);
  router.post(baseRouter + '/admin/logout', controller.admin.adminLogout);

  router.resources('articles', baseRouter + '/articles', jwt, controller.articles); // 文章
  router.put(baseRouter + '/articles/status/:id', jwt, controller.articles.changeStatus); // 启用，停用
  router.put(baseRouter + '/articles/publishStatus/:id', jwt, controller.articles.changePublishStatus); // 修改发布状态
  router.post(baseRouter + '/articles/collectStatus', jwt, controller.articles.changeCollectStatus); // 一键开启或关闭收藏

  router.resources('categories', baseRouter + '/categories', jwt, controller.categories); // 分类
  router.resources('tags', baseRouter + '/tags', jwt, controller.tags); // 标签
  router.put(baseRouter + '/tags/status/:id', jwt, controller.tags.updateStatus); // 更新标签状态

  // RESTful 风格URL定义: https://www.eggjs.org/zh-CN/basics/router#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89
  router.resources('about', baseRouter + '/about', jwt, controller.about); // 关于
  router.resources('user', baseRouter + '/user', jwt, controller.user); // 用户管理
  router.resources('comment', baseRouter + '/comment', jwt, controller.comment); // 评论管理

  router.resources('home', baseRouter + '/config/home', jwt, controller.config.home); // 网页配置-首页配置
  router.resources('hf', baseRouter + '/config/hf', jwt, controller.config.hf); // 网页配置-Header/Footer配置
  router.resources('right_introduction', baseRouter + '/config/right/introduction', jwt, controller.config.right.introduction); // 网页配置-侧栏配置-个人简介
  router.resources('right_ad', baseRouter + '/config/right/ad', jwt, controller.config.right.ad); // 网页配置-侧栏配置-广告设置
  router.resources('right_recommend', baseRouter + '/config/right/recommend', jwt, controller.config.right.recommend); // 网页配置-侧栏配置-推荐设置
};
// ModelProcess -->   router ->  controller -> validate ->  auth ->  service -> model -> helper -> error_handler
