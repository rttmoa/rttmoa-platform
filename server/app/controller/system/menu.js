/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

// @功能：菜单 CURD
class MenuController extends Controller {
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
      parendId: {
        type: 'string',
        required: false,
        // allowEmpty: true,
      },
      title: {
        type: 'string',
        require: false,
      },
    };
  }


  // 查询菜单列表
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.system.menu.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 编辑菜单
  async edit() {
    const { ctx, service } = this;
    const data = ctx.params;
    // console.log('编辑菜单：', data);
    // const res = await service.system.user1.edit(data.id);
    // ctx.helper.success({
    //   ctx,
    //   res,
    // });
  }

  // 新建菜单
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // ctx.validate(this.createRule, data);
    const res = await service.system.menu.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更新菜单
  async update() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const data = ctx.request.body;
    // console.log('update', id, data);
    // ctx.validate(this.createRule, data);
    // const res = await service.system.user1.update({ id, ...data });
    // ctx.helper.success({
    //   ctx,
    //   res,
    // });
  }

  // 删除菜单
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    // const res = await service.system.user1.destroy(id);
    // ctx.helper.success({
    //   ctx,
    //   res,
    // });
  }
}

module.exports = MenuController;
