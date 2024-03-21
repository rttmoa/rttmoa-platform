/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ArticlesSchema = new Schema(
    {
      // 文章标题
      title: {
        type: 'string',
        min: 2,
        max: 200,
      },
      // 封面
      cover: {
        type: 'string',
      },
      // 简介
      introduction: {
        type: 'string',
        min: 10,
        max: 500,
      },
      // 分类
      categories: {
        type: 'string',
      },
      // 标签
      tags: {
        type: 'array',
        itemType: 'string',
      },
      // 内容
      content: {
        type: 'string',
      },
      views: {
        type: 'number',
        default: 0,
      },
      // 评论
      comment: {
        type: 'number',
        default: 0,
      },
      // 点赞
      like: {
        type: 'number',
        default: 0,
      },
      // 收藏
      collect: {
        type: 'number',
        default: 0,
      },
      // 是 评论
      isComment: {
        type: 'boolean',
        default: true,
      },
      // 是 点赞
      isLike: {
        type: 'boolean',
        default: true,
      },
      // 是 收藏
      isCollect: {
        type: 'boolean',
        default: false,
      },
      // 是否开启打赏
      isReward: {
        type: 'boolean',
        default: false,
      },
      // 状态
      status: {
        type: 'number',
        default: 1,
      },
      // 发布状态
      publishStatus: {
        type: 'number',
        default: 2,
      },
      // 创建时间
      createTime: {
        type: 'number',
        default: 0,
      },
      // 更细时间
      updateTime: {
        type: 'number',
        default: 0,
      },
    },
    {
      collection: 'articles',
      versionKey: false,
    }
  );

  return mongoose.model('Articles', ArticlesSchema);
};
