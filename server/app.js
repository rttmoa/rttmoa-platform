/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
const moment = require('moment');
const path = require('path');
const fs = require('fs');

module.exports = app => {
  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    // 应用启动前预加载
    // await ctx.service.posts.load();
  });
  app.once('server', server => {
    // websocket 相关操作
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    console.dir(`(··················································${time}··服务已开启·······················································)`);
    // console.log('server ==> ', server);
  });
  app.on('error', err => {
    console.error('error ========> ', err);
  });
  app.on('request', ctx => {
    // console.log('request ========> ', ctx.request);
  });
  app.on('response', ctx => {
    if (ctx.response.status === 200) {
      // console.log('response ========> ', ctx.response.header);
      // console.log('response ========> ', ctx.response.body);
    }
    console.log('总耗时：', Date.now() - ctx.starttime + 'ms');
  });
};
