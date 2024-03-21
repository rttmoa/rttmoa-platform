/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      uid: {
        type: 'string',
        required: false,
      },
      provider: {
        type: 'string',
        default: 'local',
        required: false,
      },
      // 邮箱
      email: {
        type: 'string',
        required: true,
        math: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/,
      },
      // 密码
      password: {
        type: 'string',
        required: true,
      },
      // 昵称
      nickName: {
        type: String,
        required: false,
        max: 20,
      },
      // 头像
      avatar: {
        type: String,
        required: false,
      },
      // 介绍
      introduction: {
        type: String,
        required: false,
        max: 1000,
      },
      // 登陆时间
      loginTime: {
        type: 'number',
        default: 0,
      },
      // 注册时间
      registerTime: {
        type: 'number',
        default: 0,
      },
      // 文章 iDs
      articleIds: {
        type: 'array',
      },
    },
    {
      collection: 'user',
      versionKey: false,
    }
  );
  return mongoose.model('User', UserSchema);
};
