/* eslint-disable eqeqeq */
/* eslint-disable strict */
const Service = require('egg').Service;

class ProductService extends Service {

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
        await ctx.model.Categories.update({ name: item.name }, { articleNum }); // 更新分类数量
      });
    }
  }

  // 更新标签文章数量
  async updateTagsActicleNum() {
    const { ctx } = this;
    const tags = await ctx.model.Tags.find();
    if (tags && tags.length > 0) {
      tags.forEach(async item => {
        const articleNum = await ctx.model.Articles.find({
          tags: { $elemMatch: { $eq: item.name } },
          status: 1,
          publishStatus: 1,
        }).countDocuments();
        await ctx.model.Tags.update({ name: item.name }, { articleNum }); // 更新标签数量
      });
    }
  }

  // 商品查询：判断有无iD，如果无iD那么查全部、如果有iD那么根据产品iD查询详情信息
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    console.log('params', params);
    params = ctx.helper.filterEmptyField(params);

    const mustCon = {};
    if (params.productPrice) { mustCon.productPrice = params.productPrice; }
    if (params.productOnsale) { mustCon.productOnsale = params.productOnsale; }
    // if (params.tags) { mustCon.tags = { $all: params.tags.split(',') }; } // [vue, react]
    // console.log(mustCon); // { productName: 'web3', productPrice: '15' }

    const timeQuery = ctx.helper.getTimeQueryCon(params);
    const queryCon = {
      $and: [
        mustCon,
        timeQuery,
        {
          productName: {
            $regex: params.productName ? new RegExp(params.productName, 'i') : '',
          },
        },
      ],
    };

    const totalCount = await ctx.model.Module.Product.find(queryCon).countDocuments();

    const data = await ctx.model.Module.Product.find(queryCon)
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

  // 商品添加
  async create(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Module.Product.findOne({ productName: params.productName });
    if (oldArticles) return { msg: '该文章已存在' };
    // console.log(oldArticles);
    const data = {
      ...params,
      updateTime: Date.now(),
      createTime: Date.now(),
    };
    const res = await ctx.model.Module.Product.create(data);
    // await this.updateCategoriesActicleNum();
    // await this.updateTagsActicleNum();
    return {
      msg: '文章添加成功',
      data: res,
    };
  }

  // 商品更新
  async update(params) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Module.Product.findOne({ _id: params.id });
    // console.log('oldArticles', oldArticles)
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }
    const updateData = {
      ...params,
      updateTime: Date.now(),
    };
    await ctx.model.Module.Product.updateOne({ _id: params.id }, updateData);
    // await this.updateCategoriesActicleNum();
    // await this.updateTagsActicleNum();
    return {
      msg: '文章修改成功 update',
    };
  }

  // 商品删除
  async destroy(id) {
    const { ctx } = this;
    const oldArticles = await ctx.model.Module.Product.findOne({ _id: id });
    if (!oldArticles) {
      return {
        msg: '文章不存在',
      };
    }
    // await ctx.model.Module.Product.deleteOne({ _id: id });
    // await this.updateCategoriesActicleNum();
    // await this.updateTagsActicleNum();
    return {
      msg: '文章删除成功',
    };
  }


  async changeStatus(params) { // ------------------------->  文章状态 （开关）
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: params.id });
    if (!oldArticles) return { msg: '文章不存在' };
    await ctx.model.Articles.updateOne({ _id: params.id }, { status: params.status });
    return {
      msg: `文章${params.status === 1 ? '启用' : '停用'}成功`,
    };
  }


  async changePublishStatus(params) { // ------------------------->  操作：发布 / 下线
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


  async changeCollectStatus(params) { // ------------------------->  顶部：一键开启 / 一键关闭收藏 （更新全部收藏的内容）
    const { ctx } = this;
    await ctx.model.Articles.updateMany({}, { isCollect: params.isCollect });
    return {
      msg: `文章 ${params.isCollect ? '一键开启' : '一键取消'} 收藏成功`,
    };
  }


  async edit(id) { // ------------------------->  点击编辑按钮：获取此iD数据返回给前台去渲染
    const { ctx } = this;
    const oldArticles = await ctx.model.Articles.findOne({ _id: id });
    if (!oldArticles) return { msg: '文章不存在' };
    return {
      msg: '文章详情获取成功',
      data: oldArticles,
    };
  }
}

module.exports = ProductService;
