/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

// @功能：
// CURD：增加、修改、删除、查询(有参、无参)
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
  async new() {
    const { ctx, service } = this;
    const secret = ctx.app.config.jwt.secret;
    const authorization = ctx.request.header.authorization;
    const token = authorization.replace('Bearer ', '');
    const decode = await ctx.app.jwt.verify(token, secret);
    const userName = decode._doc.userName;

    console.log('session', ctx.session);
    console.log('cookies', ctx.cookies.get('token'));
    console.log('cookies:result', (await ctx.app.jwt.verify(ctx.cookies.get('token'), secret))._doc.userName);
    const res = `登陆用户为：==========================================> ${userName}`;
    ctx.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    };
  }

  // @ 查看this实例
  async show() {
    const { ctx, service } = this;
    const params = ctx.params;
    // console.log('author', ctx.session.userId);
    // console.log('this', this.logger.info('日志信息')); // logger 对象
    // console.log('this', this.logger.warn('日志警告'));
    // console.log('this', this.logger.error('日志错误'));
    // console.log('this', this.config); // 应用运行时的 配置项。
    // console.log('this', this.app.config.env);
    // console.log('this', this.service); // 应用定义的 Service。通过它，我们可以访问到其他业务层
    // console.log('this', this.app); // 当前应用 Application 对象实例
    // console.log('this', this.ctx); // 当前请求的上下文 Context 对象实例

    // Header: https://www.eggjs.org/zh-CN/basics/controller#header
    // console.log('header: ', ctx.host); // 127.0.0.1:7001
    // console.log('header: ', ctx.protocol); // http
    // console.log('header: ', ctx.ips); // []
    // console.log('header: ', ctx.ip); // 127.0.0.1

    // Session: https://www.eggjs.org/zh-CN/basics/controller#session
    // console.log('session', ctx.session);
    // console.log('cookies', ctx.cookies.get('token'));

    const res = await service.system.user1.show(params);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 查询用户列表
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    // console.log('query', data); // { userName: '张三', marry: '1', page: 1, pageSize: 10 }
    const res = await service.system.user1.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 编辑用户
  async edit() {
    const { ctx, service } = this;
    const data = ctx.params;
    // console.log('编辑用户：', data);
    const res = await service.system.user1.edit(data.id);
    ctx.helper.success({
      ctx,
      res,
    });
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

  // 更新用户
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    // console.log('update', id, data);
    // ctx.validate(this.createRule, data);
    const res = await service.system.user1.update({ id, ...data });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 删除用户
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    // console.log('id', id);
    const res = await service.system.user1.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = User1Controller;
