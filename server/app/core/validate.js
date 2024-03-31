/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { Controller } = require('egg');

// 校验异常时，会直接抛出异常，异常状态码为 422，errors 字段包含了详细的验证不通过信息。想要自行处理检查异常，可以通过 try catch 捕获。
class PostController extends Controller {
  async create() {
    const ctx = this.ctx;
    try {
      ctx.validate(createRule);
    } catch (err) {
      ctx.logger.warn(err.errors);
      ctx.body = { success: false };
      return;
    }
  }
}

module.exports = PostController;
