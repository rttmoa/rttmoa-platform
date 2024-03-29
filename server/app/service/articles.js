/* eslint-disable eqeqeq */
/* eslint-disable strict */
const Service = require('egg').Service;

class ArticlesService extends Service {

  // 更新分类文章数量
  async updateCategoriesActicleNum() {
    const { ctx } = this;
    const categories = await ctx.model.Categories.find();
    if (categories && categories.length > 0) {
      categories.forEach(async item => {
        const articleNum = await ctx.model.Articles.find({
          categories: item.name,
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Categories.update({ name: item.name }, { articleNum });
      });
    }
  }

  // 更新标签文章数量
  async updateTagsActicleNum() {
    const { ctx } = this;
    const tags = await ctx.model.Tags.find();
    // console.log(tags);
    if (tags && tags.length > 0) {
      tags.forEach(async item => {
        const articleNum = await ctx.model.Articles.find({
          tags: { $elemMatch: { $eq: item.name } },
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Tags.update({ name: item.name }, { articleNum });
      });
    }
  }


  // 查询：参数page、pageSize、categories、status、publishStatus、tags
  async index(params) { // ------------------------->  TODO:
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;

    params = ctx.helper.filterEmptyField(params);

    const mustCon = {};
    if (params.categories) { mustCon.categories = params.categories; }
    // @ 严格模式 会查不到
    if (params.status != 0) { mustCon.status = params.status; }
    if (params.publishStatus != 0) { mustCon.publishStatus = params.publishStatus; }
    if (params.tags) { mustCon.tags = { $all: params.tags.split(',') }; } // [vue, react]
    // console.log(mustCon);

    const timeQuery = ctx.helper.getTimeQueryCon(params);

    const queryCon = {
      $and: [
        mustCon,
        timeQuery,
        {
          title: {
            $regex: params.title ? new RegExp(params.title, 'i') : '',
          },
        },
      ],
    };

    const totalCount = await ctx.model.Articles.find(queryCon).countDocuments();

    const data = await ctx.model.Articles.find(queryCon)
      .sort({ createTime: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return {
      data: {
        page,
        pageSize,
        totalCount,
        list: data,
      },
    };
  }

  // 添加：先查询再添加 & 更新标签和分类里面的文章数量
  async create(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ title: params.title });
    if (oldArticles) return { msg: '该文章已存在' };

    const data = {
      ...params,
      createTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Articles.create(data);
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: '文章添加成功',
      data: res,
    };
  }

  // 更新：先查询再更新 & 更新标签和分类里面的文章数量
  async update(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }
    const updateData = {
      ...params,
      updateTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Articles.updateOne({ _id: params.id }, updateData);
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: '文章修改成功 update',
    };
  }

  // 删除：先查询再删除 & 更新标签和分类里面的文章数量
  async destroy(id) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }
    await ctx.model.Articles.deleteOne({ _id: id });
    await this.updateCategoriesActicleNum();
    await this.updateTagsActicleNum();
    return {
      msg: '文章删除成功',
    };
  }

  // 文章状态：开启 / 停用
  async changeStatus(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) return { msg: '文章不存在' };
    await ctx.model.Articles.updateOne({ _id: params.id }, { status: params.status });
    return {
      msg: `文章${params.status === 1 ? '启用' : '停用'}成功`,
    };
  }

  // 文章状态：发布 / 下线
  async changePublishStatus(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }
    await ctx.model.Articles.updateOne({ _id: params.id }, { publishStatus: params.publishStatus });
    return {
      msg: `文章${params.publishStatus === 1 ? '发布' : '下线'}成功`,
    };
  }

  // 文章状态：一键开启 / 一键关闭收藏
  async changeCollectStatus(params) {
    const { ctx } = this;
    await ctx.model.Articles.updateMany({}, { isCollect: params.isCollect });
    return {
      msg: `文章 ${params.isCollect ? '一键开启' : '一键取消'} 收藏成功`,
    };
  }

  // 编辑：根据iD获取文章详情
  async edit(id) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: id });
    if (!oldArticles) return { msg: '文章不存在' };
    return {
      msg: '文章详情获取成功',
      data: oldArticles,
    };
  }
}

module.exports = ArticlesService;
