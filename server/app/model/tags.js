/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TagsSchema = new Schema(
    {
      // 标签名称
      name: {
        type: String,
        min: 2,
        max: 20,
        match: /^[\u4e00-\u9fa5A-Za-z0-9_]{2,20}$/,
      },
      // 创建时间
      createTime: {
        type: 'number',
        default: 0,
      },
      // 修改时间
      updateTime: {
        type: 'number',
        default: 0,
      },
      // 文章数量
      articleNum: {
        type: 'number',
        default: 0,
      },
      // 状态
      status: {
        type: 'boolean',
        default: true,
      },
    },
    {
      collection: 'tags',
      versionKey: false,
    }
  );
  return mongoose.model('Tags', TagsSchema);
};
