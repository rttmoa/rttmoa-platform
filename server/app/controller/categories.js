'use strict';

const Controller = require('egg').Controller;

class CategoriesController extends Controller {
  constructor(ctx) {
    super(ctx);
    // 查询数据参数规则
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
      // 分类名称
      name: {
        type: 'string',
        required: false,
        min: 2,
        max: 20,
        allowEmpty: true,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };
    // 创建规则
    this.createRule = {
      name: {
        type: 'string',
        min: 2,
        max: 20,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
    };
  }

  // 查询：查询规则（queryListParamsRules）
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    // const res = await service.categories.index({ page: 1, pageSize: 50, name: '其他' });
    const res = await service.categories.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 创建：创建规则（createRule）
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // console.log('data', data); // data { name: '动物' }
    ctx.validate(this.createRule, data);
    const res = await service.categories.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更新：创建规则（createRule）
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.categories.update({
      id,
      name: data.name,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 删除
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.categories.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CategoriesController;
