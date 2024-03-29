'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.queryListParamsRules = {
      page: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 1,
      },
      pageSize: {
        type: 'string',
        required: false,
        allowEmpty: true,
        default: 20,
      },
      nickName: {
        type: 'string',
        required: false,
        max: 20,
        allowEmpty: true,
      },
    };
  }

  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    // console.log(ctx.request);
    // console.log('data', data); // data { page: '1', pageSize: '20', nickName: 'zhangsan' }
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.user.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    // console.log('id', id); // undefined
    const res = await service.user.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = UserController;
