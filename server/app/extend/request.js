// 框架会将 app/extend/request.js 中定义的对象与内置 request 的 prototype 对象进行合并，在处理请求时会基于扩展后的 prototype 生成 request 对象
'use strict';
module.exports = {
  get foos() {
    console.log('request fooss', this.get('x-request-foo'));
    return this.get('x-request-foo');
  },
};
