/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const User1Schema = new Schema(
    {
      // uid: {
      //   type: 'string',
      //   required: false,
      // },
      // 用户名
      userName: {
        type: String,
        // default: 'local',
        required: false,
        math: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,15}$/,
      },
      password: {
        type: String,
      },
      // 性别
      sex: {
        type: 'number',
        required: false,
        default: 0,
      },
      // 状态
      status: {
        type: 'string',
        required: false,
        default: '',
      },
      createTime: {
        type: Date,
        default: Date.now(),
      },
      updateTime: {
        type: Date,
        default: Date.now(),
      },
    },
    {
      collection: 'user1',
      versionKey: false,
    }
  );
  return mongoose.model('User1', User1Schema);
};
