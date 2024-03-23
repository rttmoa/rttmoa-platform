'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.page = {
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
    };
    this.default = {
      productName: {
        type: 'string',
        required: false,
        min: 2,
        max: 200,
        allowEmpty: true,
      },
      productImg: {
        type: 'string',
        required: false,
        // default: '',
      },
      productPrice: {
        type: 'string',
        required: false,
        // default: 0,
      },
      productOnsale: {
        type: 'string',
        required: false,
      },
      productDesc: {
        type: 'string',
        min: 10,
        max: 500,
        required: false,
      },
      createTime: {
        type: Date,
        required: false,
        // default: Date.now(),
      },
      updateTime: {
        type: Date,
        required: false,
        // default: Date.now(),
      },
    };
    // 查询数据参数规则
    this.queryListParamsRules = {
      ...this.page,
      ...this.default,
    };
    // 创建规则
    this.createRule = {
      ...this.default,
    };
    // 改变状态规则
    this.changeStatusRule = {
      status: {
        type: 'number',
        default: 1,
      },
    };
    // 改变发布状态规则
    this.changePublishStatusRule = {
      publishStatus: {
        type: 'number',
        default: 2,
      },
    };
  }

  // 查询产品
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    // console.log('data', data);
    const res = await service.module.product.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 创建产品
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    console.log('data', data);
    const res = await service.module.product.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更新产品
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.module.product.update({ id, ...data });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 删除产品
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.module.product.destroy(id);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 启用，停用  改变状态规则（changeStatusRule）
  async changeStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.changeStatusRule, data);
    const res = await service.articles.changeStatus({
      id,
      status: data.status,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 改变发布状态：changePublishStatusRule
  async changePublishStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    // console.log('data', data);
    ctx.validate(this.changePublishStatusRule, data);
    const res = await service.articles.changePublishStatus({
      id,
      publishStatus: data.publishStatus,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 改变收集状态
  async changeCollectStatus() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const res = await service.articles.changeCollectStatus(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 编辑
  async edit() {
    const { ctx, service } = this;
    const data = ctx.params;
    const res = await service.articles.edit(data.id); // TODO: 编辑文章时，根据地址栏iD获取文章详情
    ctx.helper.success({
      ctx,
      res,
    });
  }
}

module.exports = ProductController;
