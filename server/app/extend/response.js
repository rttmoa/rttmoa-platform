// 框架会将 app/extend/response.js 中定义的对象与内置 response 的 prototype 对象合并，在处理请求时基于扩展后的 prototype 生成 response 对象
'use strict';
module.exports = {
  set foos(value) {
    this.set('x-response-foo', value);
  },
};
