/* eslint-disable strict */
const Service = require('egg').Service;

class User1Service extends Service {

  async index(params) {
    console.log(params);
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    // 仅根据用户名查询
    const queryCon = params.userName ? { userName: { $regex: new RegExp(params.userName, 'i') } } : {};
    const totalCount = await ctx.model.System.User1.find(queryCon).countDocuments();
    const data = await ctx.model.System.User1.find(queryCon)
      .sort({ loginTime: -1 })
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

  // 创建用户
  async create(params) {
    const { ctx } = this;
    // console.log('params', params); // params { userName: '张三', password: 'Wenc1101', sex: '1', status: '开心' }
    const oldUser = await ctx.model.System.User1.findOne({ userName: params.userName });
    if (oldUser) { return { msg: '该用户已存在' }; }
    const data = {
      ...params,
      password: await ctx.helper.genSaltPassword(params.password),
      updateTime: Date.now(),
      createTime: Date.now(),
    };
    const res = await ctx.model.System.User1.create(data);
    return {
      msg: '用户添加成功',
      data: res,
    };
  }


  // 删除用户
  async destroy(id) {
    const { ctx } = this;
    try {
      const oldUser = await ctx.model.System.User1.findOne({ _id: id });
      console.log(oldUser);
      if (!oldUser) {
        return {
          msg: '用户不存在',
        };
      }
      await ctx.model.System.User1.deleteOne({ _id: id });
      return {
        msg: '用户删除成功',
      };
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = User1Service;
