/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const AboutSchema = new Schema(
    {
      // 介绍图片
      imgs: [
        {
          imgUrl: { type: 'string' },
          link: { type: 'string', required: false },
        },
      ],
      // 详细介绍
      desc: {
        type: 'string',
        min: 1,
        max: 800,
      },
      // 标签云
      tags: [ String ],
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
      // 个人简历
      showResume: {
        type: 'boolean',
        default: false,
      },
    },
    {
      collection: 'about',
      versionKey: false,
    }
  );
  return mongoose.model('About', AboutSchema);
};
