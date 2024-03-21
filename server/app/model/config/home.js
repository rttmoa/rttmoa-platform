/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  // 主页配置
  const HomeSchema = new Schema(
    {
      //  简介
      introduction: {
        type: 'string',
        min: 2,
        max: 100,
      },
      // 简介特效
      effects: {
        type: 'boolean',
        default: false,
      },
      // 归档背景图片
      archiveBgImg: {
        type: 'string',
      },
      //  分类背景图片
      categoriesBgImg: {
        type: 'string',
      },
      // 分类详情背景图片
      categoriesDetailBgImg: {
        type: 'string',
      },
      //  标签背景图片
      tagsBgImg: {
        type: 'string',
      },
      // 标签详情背景图片
      tagsDetailBgImg: {
        type: 'string',
      },
      // 关于背景图片
      aboutBgImg: {
        type: 'string',
      },
      createTime: {
        type: 'number',
        default: 0,
      },
      updateTime: {
        type: 'number',
        default: 0,
      },
    },
    {
      collection: 'home',
      versionKey: false,
    }
  );
  return mongoose.model('Home', HomeSchema);
};
