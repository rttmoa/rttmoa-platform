/* eslint-disable strict */
const Controller = require('egg').Controller;


// 上传图片
class UtilsController extends Controller {
  async uploadFiles() {
    const { ctx, service } = this;
    const data = await service.utils.uploadFiles();
    if (data) {
      ctx.body = data;
    } else {
      ctx.body = {
        message: '上传失败',
      };
    }
  }
}

module.exports = UtilsController;
