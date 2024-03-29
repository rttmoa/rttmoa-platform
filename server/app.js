/* eslint-disable no-unused-vars */
// eslint-disable-next-line strict
const moment = require('moment');
module.exports = app => {
  app.once('server', server => {
    // websocket 相关操作
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    console.dir(`(··················································${time}··服务已开启·······················································)`);
    // console.log('server ==> ', server);
  });
  app.on('error', err => {
    // 上报错误
    console.error('error ========> ', err);
  });
  app.on('request', ctx => {
    // 记录收到的请求
    // console.log('request ========> ', ctx);
  });
  app.on('response', ctx => {
    if (ctx.response.status === 200) {
      // console.log('response ========> ', ctx.response.header);
      // console.log('response ========> ', ctx.response.body);
    }
    const used = Date.now() - ctx.starttime;
    // 记录请求总耗时
    console.log('总耗时：', used + 'ms');
  });
};
