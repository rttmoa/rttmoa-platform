/* eslint-disable strict */
const Service = require('egg').Service;

class UserService extends Service {

  // ! 用户列表
  async index(params) {
    // params: { page: '1', pageSize: '20', nickName: 'zhangsan' }
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);
    // console.log('params', params);
    // nickName 是模糊匹配
    const queryCon = params.nickName ? { nickName: { $regex: new RegExp(params.nickName, 'i') } } : {};
    const totalCount = await ctx.model.User.find(queryCon).countDocuments();
    const data = await ctx.model.User.find(queryCon)
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
    // response ========>  {
    //   data: { page: 1, pageSize: 20, totalCount: 0, list: [] },
    //   code: 0,
    //   msg: '请求成功'
    // }
  }


  async destroy(id) {
    const { ctx } = this;
    try {
      const oldUser = await ctx.model.User.findOne({ _id: id });
      console.log(oldUser);
      if (!oldUser) {
        return {
          msg: '用户不存在',
        };
      }
      // await ctx.model.User.deleteOne({ _id: id });
      return {
        msg: '用户删除成功',
      };
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = UserService;
