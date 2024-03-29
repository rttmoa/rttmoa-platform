/* eslint-disable eqeqeq */
/* eslint-disable strict */
const Service = require('egg').Service;

class CommentService extends Service {

  // 查询：page、pageSize、auditStatus、articleTitle
  async index(params) {
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);
    console.log('评论管理 - 查询', params);

    let mustCon = {};
    if (params.auditStatus !== '0') {
      mustCon = {
        auditStatus: params.auditStatus,
      };
    }
    const queryCon = {
      $and: [
        mustCon,
        { articleTitle: { $regex: params.articleTitle ? new RegExp(params.articleTitle, 'i') : '' } },
      ],
    };
    const totalCount = await ctx.model.Comment.find(queryCon).countDocuments();
    const data = await ctx.model.Comment.find(queryCon)
      .sort({
        createTime: -1,
      })
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

  // 新建：直接存到库中、并处理下文章的数量
  async create(params) {
    const { ctx } = this;
    const data = {
      ...params,
      commentTime: ctx.helper.moment().unix(),
    };
    const res = await ctx.model.Comment.create(data);
    await ctx.model.Articles.updateOne({ _id: params.articlesId }, { $inc: { comment: 1 } });
    return {
      msg: '评论添加成功',
      data: res,
    };
  }

  // 更新：是否一键审核、是否根据iD更新
  async update(params) {
    const { ctx } = this;
    // 一键审核
    if (params.id == 0) {
      // @updateMany
      await ctx.model.Comment.updateMany({}, { auditStatus: params.auditStatus, auditTime: ctx.helper.moment().unix() });
      return {
        msg: `评论一键${params.auditStatus === 1 ? '审核通过' : '驳回'}成功`,
      };
    }
    // 根据iD更新内容
    const oldComment = await ctx.model.Comment.findOne({ _id: params.id });
    if (!oldComment) {
      return {
        msg: '评论不存在',
      };
    }
    const updateData = {
      auditStatus: params.auditStatus,
      auditTime: ctx.helper.moment().unix(),
    };
    await ctx.model.Comment.updateOne({ _id: params.id }, updateData);
    return {
      msg: `评论${params.auditStatus === 1 ? '审核通过' : '驳回'}成功`,
    };
  }

  // 删除：直接从库中删除、并处理下文章的数量
  async destroy(id) {
    const { ctx } = this;
    const oldComment = await ctx.model.Comment.findOne({ _id: id });
    if (!oldComment) {
      return {
        msg: '评论不存在',
      };
    }
    await ctx.model.Comment.deleteOne({ _id: id });
    const articleId = oldComment.articleId;
    // 总之，$inc操作符在MongoDB中用于原子性地递增或递减字段的值，可以帮助实现对文档中字段的快速更新操作。
    await ctx.model.Articles.updateOne({ _id: articleId }, { $inc: { comment: -1 } });
    return {
      msg: '评论删除成功',
    };
  }
}

module.exports = CommentService;
