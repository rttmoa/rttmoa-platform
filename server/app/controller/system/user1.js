/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

class User1Controller extends Controller {
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
        default: 10,
      },
      userName: {
        type: 'string',
        required: false,
        min: 2,
        max: 15,
        allowEmpty: true,
      },
    };
  }

  // @ 不同用户登陆时，根据Bearer获取用户信息
  async index() {
    const { ctx, service } = this;
    // const data = ctx.request.query;
    // ctx.validate(this.queryListParamsRules, data);
    // const res = await service.system.user1.index(data);
    // ctx.helper.success({
    //   ctx,
    //   res,
    // });


    const secret = ctx.app.config.jwt.secret;
    const authorization = ctx.request.header.authorization;
    const token = authorization.replace('Bearer ', '');
    const decode = await ctx.app.jwt.verify(token, secret);
    const userName = decode._doc.userName;
    const res = `登陆用户为：==========================================> ${userName}`;
    ctx.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    };
  }

  // 新建用户 （加密密码）
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // ctx.validate(this.createRule, data);
    const res = await service.system.user1.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.user.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = User1Controller;
