/* eslint-disable strict */
// app/core/base_controller.js
const { Controller } = require('egg');

// @ 在此 Controller 中定义一些上级调用的方法、供子类调用
// 使用：
// const Controller = require('../core/base_controller');
// class PostController extends Controller {
//   async list() {
//     const posts = await this.service.listByUser(this.user);
//     this.success(posts);
//   }
// }
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  // Session 的操作直观：直接读取、修改或将其赋值为 null 删除
  async deleteSession() {
    this.ctx.session = null;
  }

  query() {
    // 为了避免Query String 中的 key 重复；例如 GET /posts?category=egg&category=koa
    const key = this.ctx.query.key || '';
    if (key.startsWith('egg')) {
      // ...
    }
  }

  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
