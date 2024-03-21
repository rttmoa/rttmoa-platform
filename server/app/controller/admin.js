'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      userName: {
        type: 'string',
        min: 5,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{5,20}$/,
      },
      password: {
        type: 'password',
        // compare: "re-password",
        min: 6,
        max: 20,
        format: /^[A-Za-z0-9_]{6,20}$/,
      },
    };
  }

  // 登陆
  async adminLogin() {
    const { ctx, service } = this;
    // console.log('this', this); // AdminController { ctx: {}, service: {} }
    // console.log('service', service.admin.adminLogin); // this中服务都可以 点 出来

    const data = ctx.request.body;
    console.log(ctx.request.body); // { userName: 'admin', password: '123456' }
    ctx.validate(this.createRule, data);
    const res = await service.admin.adminLogin(data);
    ctx.helper.success({ ctx, res });
  }

  // 退出
  async adminLogout() {
    const { ctx, service } = this;
    const res = await service.admin.adminLogout();
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = AdminController;
