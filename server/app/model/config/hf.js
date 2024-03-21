/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const HeaderSchema = new Schema({
    // logo：图片 / 文本
    logo: {
      type: String,
      required: false,
    },
    // 标题
    title: {
      type: String,
      required: false,
      max: 20,
    },
    // 是否开启搜索
    openSearch: {
      type: 'boolean',
      default: true,
    },
    //  是否开启登录
    login: {
      type: 'boolean',
      default: false,
    },
    // 是否开启注册
    register: {
      type: 'boolean',
      default: false,
    },
  });

  const FooterSchema = new Schema({
    // Copyright
    copyright: {
      type: String,
      min: 1,
      max: 200,
    },
    // 额外信息
    extra: {
      type: String,
      min: 1,
      max: 200,
    },
  });

  const HfSchema = new Schema(
    {
      // Header配置
      header: {
        type: HeaderSchema,
      },
      // Footer配置
      footer: {
        type: FooterSchema,
      },
      // 创建时间
      createTime: {
        type: 'number',
        default: 0,
      },
      // 更新时间
      updateTime: {
        type: 'number',
        default: 0,
      },
    },
    {
      collection: 'hf',
      versionKey: false,
    }
  );
  return mongoose.model('Hf', HfSchema);
};
