'use strict';

/** @type Egg.EggPlugin */
// TODO: Plugin: https://www.eggjs.org/basics/plugin
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

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

  // 插件列表：https://www.eggjs.org/zh-CN/basics/plugin#%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8

  // 使用插件： https://www.eggjs.org/zh-CN/basics/plugin#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },
  // 这样就可以直接使用插件提供的功能：
  // app.mysql.query(sql, values);

};