'use strict';

/** @type Egg.EggPlugin */


// TODO: Plugin: https://www.eggjs.org/zh-CN/basics/plugin
module.exports = {
  // had enabled by egg
  static: {
    enable: true,
  },
  assets: {
    enable: true,
    package: 'egg-view-assets',
  },

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  // 参数校验：在获取用户请求的参数后，不可避免要进行一些校验。
  // 通过 ctx.validate(rule, [body]) 直接对参数校验
  // ctx.validate(createRule, ctx.request.body);
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },
  // 这样就可以直接使用插件提供的功能： app.mysql.query(sql, values);
};
