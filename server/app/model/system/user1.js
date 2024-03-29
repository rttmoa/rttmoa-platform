/* eslint-disable strict */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // address: "浙江省 金华市 永康市"
  // birthday: "1990-08-22"
  // email: "u.fedfvkckeg@ukeu.sl"
  // id: 9
  // interest: 2
  // isMarried: 0
  // role_id: 4
  // sex: 1
  // state: 4
  // time: "19:44:50"
  // username: "林涛"
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
        default: '', // 开心、难过、迷茫、痛苦、疼痛
      },
      hobby: {
        type: Array,
        required: false,
        default: [], // 多个爱好：["reading", "swimming", "traveling"]
      },
      marry: {
        type: 'number',
        required: false,
        default: 0, // 未婚、已婚
      },
      role: {
        type: String,
        required: false,
        default: '', // 所属角色：在角色管理表中的关联角色
      },
      phone: {
        type: String,
        required: false,
        default: '', // 手机号：默认空
      },
      idCard: {
        type: String,
        required: false,
        default: '', // 身份证号：默认空
      },
      address: {
        type: String,
        required: false,
        default: '', //* 联系地址：默认空
      },
      email: {
        type: String,
        required: false,
        default: '', // 邮箱：默认空
      },
      birthday: {
        type: Date,
        required: false,
        default: Date.now(), // 生日：2012-04-23
      },
      earlyTime: {
        type: Date,
        required: false,
        default: Date.now(), // 早期时间：07:02:58
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
