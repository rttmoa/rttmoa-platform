/* eslint-disable no-unused-vars */
'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    // 查询数据参数规则: 页、页数、分类名称
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
      // 分类名称
      name: {
        type: 'string',
        required: false,
        min: 2,
        max: 20,
        allowEmpty: true,
        format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
      parentId: {
        type: 'string',
        required: true,
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
      // parentId: {
      //   type: 'string',
      //   required: true,
      // },
    };
  }

  // 查询：查询规则（queryListParamsRules）
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    // console.log('data', data); // { parentId: '0', name: '乳制品' }
    ctx.validate(this.queryListParamsRules, data);
    // ctx.app.log('ctx、service等等参数');
    // ctx.app.request.foos()
    const res = await service.module.category.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 创建：创建规则（createRule）
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    // console.log('data', data); // { parentId: '65fbed951ef97f5be8252a4b', name: '三星' }
    // return
    ctx.validate(this.createRule, data);
    const res = await service.module.category.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更新：创建规则（createRule）
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id; // /api/v1/category/:id
    const qid = ctx.query.parentId;
    const _id = ctx.query._id;
    ctx.validate(this.createRule, data);
    // console.log(id, data);
    // return;
    const res = await service.module.category.update({
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
    const res = await service.module.category.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = CategoryController;
