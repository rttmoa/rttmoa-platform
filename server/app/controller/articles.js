'use strict';

const Controller = require('egg').Controller;

class ArticlesController extends Controller {
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
      title: {
        type: 'string',
        required: false,
        min: 2,
        max: 200,
        allowEmpty: true,
      },
      categories: {
        type: 'string',
        required: false,
        default: '',
      },
      articles: {
        type: 'string', // vue,react
        required: false,
        default: '',
      },

      cover: {
        type: 'string',
        required: false,
      },
      introduction: {
        type: 'string',
        min: 10,
        max: 500,
        required: false,
      },
      status: {
        type: 'string',
        default: '0',
        required: false,
      },
      publishStatus: {
        type: 'string',
        default: '0',
        required: false,
      },
      createStartTime: {
        type: 'string',
        required: false,
        default: 0,
      },
      createEndTime: {
        type: 'string',
        required: false,
        default: 0,
      },
      updateStartTime: {
        type: 'string',
        required: false,
        default: 0,
      },
      updateEndTime: {
        type: 'string',
        required: false,
        default: 0,
      },
    };
    // 创建规则
    this.createRule = {
      title: {
        type: 'string',
        min: 2,
        max: 200,
        // format: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
      cover: {
        type: 'url',
      },
      introduction: {
        type: 'string',
        min: 10,
        max: 500,
      },
      categories: {
        type: 'string',
        min: 2,
        max: 20,
      },
      tags: {
        type: 'array',
        itemType: 'string',
      },
      content: {
        type: 'string',
      },
      views: {
        type: 'number',
        default: 1,
      },
      comment: {
        type: 'number',
        default: 0,
      },
      like: {
        type: 'number',
        default: 0,
      },
      collect: {
        type: 'number',
        default: 0,
      },
      isComment: {
        type: 'boolean',
        default: true,
      },
      isLike: {
        type: 'boolean',
        default: true,
      },
      isCollect: {
        type: 'boolean',
        default: false,
      },
      // 是否开启打赏
      isReward: {
        type: 'boolean',
        default: false,
      },
      status: {
        type: 'number',
        default: 1,
      },
      publishStatus: {
        type: 'number',
        default: 2,
      },
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

  // 查询
  async index() {
    const { ctx, service } = this;
    const data = ctx.request.query;
    ctx.validate(this.queryListParamsRules, data);
    const res = await service.articles.index(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 创建：创建规则（createRule）
  async create() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    ctx.validate(this.createRule, data);
    const res = await service.articles.create(data);
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 更新：更新规则（createRule）
  async update() {
    const { ctx, service } = this;
    const data = ctx.request.body;
    const id = ctx.params.id;
    ctx.validate(this.createRule, data);
    const res = await service.articles.update({
      id,
      ...data,
    });
    ctx.helper.success({
      ctx,
      res,
    });
  }

  // 删除：删除
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const res = await service.articles.destroy(id);
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

module.exports = ArticlesController;
