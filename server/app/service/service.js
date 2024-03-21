/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable strict */
const Service = require('egg').Service;

class findDocsService extends Service {


  async FIND(params = {}) {
    const { ctx } = this;
    
    // ? 查询
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    const queryCon = params.project ? { project: params.project } : {};
    const countDocuments = await ctx.model.Conifg.Right.Ad.find(
      // 1、可以为空，就是查询全部
      // 2、{name: params.name} 通过名称过滤
      // 3、queryCon
    ).countDocuments();

    const findConfig = await ctx.model.Config.Right.Recommend.find(queryCon).sort({ createTime: -1 }).skip((page - 1) * pageSize)
      .limit(pageSize);
    
    const findOne = await ctx.model.Config.Right.Ad.findOne({ _id: params._id });
    const findOneName = await ctx.model.Categories.findOne({ name: params.name });


    params = ctx.helper.filterEmptyField(params);
    const findArticles = await ctx.model.Articles.find({
      tags: { $eleMatch: { $eq: 'item.name' } },
      tags2: { $all: params.tags.split(',') }, // [vue, react]
    });

    const mustCon = {}; // 省略参数
    const timeQuery = ctx.helper.getTimeQueryCon(params);
    const queryCon2 = {
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
    const totalCount = await ctx.model.Articles.find(queryCon2).countDocuments();

    // ? 创建
    // 广告设置配置信息添加成功
    const create = await ctx.model.Config.Right.Ad.create({ ...params, createTime: ctx.helper.moment().unix() });

    
    // ? 更新
    const findByIdAndUpdate = await ctx.model.Config.Right.Ad.findByIdAndUpdate(
      { _id: params._id }, {/* 要更新的对象参数信息 */}, { new: true, runValidators: true }
    );
    
    await ctx.model.Articles.updateOne({ _id: params.id }, { /* 更新对象信息 */});
    await ctx.model.Articles.updateOne({ _id: params.id }, { status: params.status });
    await ctx.model.Articles.updateOne({ _id: params.id }, { $inc: { comment: -1 } });

    await ctx.model.Articles.updateMany({}, { isCollect: params.isCollect });


    // ? 删除
    const deleteOne = await ctx.model.Config.Right.Recommend.deleteOne({ _id: 'id (查询得到的或者是客户端传递过来的)' });
    
  }
}

module.exports = findDocsService;
