/* eslint-disable no-unused-vars */
/* eslint-disable strict */
const Service = require('egg').Service;

class User1Service extends Service {

  // 查看this实例
  async show() {
    const { ctx } = this;
    // console.log('this', this.logger.info('日志信息')); // logger 对象
    // console.log('this', this.logger.warn('日志警告'));
    // console.log('this', this.logger.error('日志错误'));
    // console.log('this', this.config); // 应用运行时的 配置项。
    // console.log('this', this.app.config.env);
    // console.log('this', this.service); // 应用定义的 Service。通过它，我们可以访问到其他业务层
    // console.log('this', this.app); // 当前应用 Application 对象实例
    // console.log('this', this.ctx); // 当前请求的上下文 Context 对象实例

    const userAgent = this.ctx.request.header['user-agent'];
    // 使用正则表达式匹配浏览器版本
    const browserInfo = {
      browser: 'Unknown',
      version: 'Unknown',
    };
    const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/([\d.]+)/i);
    if (browserMatch && browserMatch.length >= 3) {
      browserInfo.browser = browserMatch[1];
      browserInfo.version = browserMatch[2];
    }
    console.log('浏览器：', browserInfo); // 浏览器： { browser: 'Chrome', version: '123.0.0.0' }

    return {
      msg: '查询',
      data: this.app,
    };
  }
  // 查询用户列表
  async index(params) {
    console.log('user1 params:', params);
    const { ctx } = this;
    const page = params.page * 1;
    const pageSize = params.pageSize * 1;
    params = ctx.helper.filterEmptyField(params);

    const queryCon = {};
    if (params.role) {
      queryCon.role = params.role;
    }
    if (params.status) {
      queryCon.status = params.status;
    }
    if (params.marry) {
      queryCon.marry = params.marry;
      // queryCon.marry = { $eleMatch: { $eq: params.marry } };
    }
    if (params.hobby) {
      // 'eat,sleep' > [ 'eat', 'sleep' ]
      queryCon.hobby = { $all: params.hobby.split(',') };
      // console.log(queryCon.hobby); // { '$all': [ 'eat', 'sleep' ] }
    }
    const timeQuery = ctx.helper.getTimeQueryCon(params);
    const Query = {
      $and: [
        queryCon,
        timeQuery,
        {
          userName: {
            $regex: params.userName ? new RegExp(params.userName, 'i') : '',
          },
        },
      ],
    };
    // console.log('Query', Query);
    const totalCount = await ctx.model.System.User1.find(Query).countDocuments();
    const data = await ctx.model.System.User1.find(Query)
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

  // 编辑用户
  async edit(id) {
    const { ctx } = this;
    console.log('findUser', await ctx.model.System.User1.findOne({ userName: '张三' }));
    const oldUser = await ctx.model.System.User1.findOne({ _id: id });
    if (!oldUser) return { msg: '用户不存在' };
    return {
      msg: '用户详情获取成功',
      data: oldUser,
    };
  }

  // 更新用户
  // controller 中验证后添加的字段后，直接写入到数据库中
  async update(params) {
    const { ctx } = this;
    const oldUser = await ctx.model.System.User1.findOne({ _id: params.id });
    if (!oldUser) { return { msg: ' 用户不存在' }; }
    const updateData = {
      ...params,
      password: await ctx.helper.genSaltPassword(params.password),
      updateTime: Date.now(),
    };
    await ctx.model.System.User1.updateOne({ _id: params.id }, updateData);
    return {
      msg: '用户修改成功！',
    };
  }

  // 创建用户
  // controller 中验证后添加的字段后、直接写入到数据库中
  async create(params) {
    const { ctx } = this;
    const oldUser = await ctx.model.System.User1.findOne({ userName: params.userName });
    if (oldUser) { return { msg: ' 该用户已存在' }; }
    const data = {
      ...params,
      hobby: params.hobby.split(','),
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
    // console.log('this', this.logger.info('日志信息')); // logger 对象
    // console.log('this', this.logger.warn('日志警告'));
    // console.log('this', this.logger.error('日志错误'));
    // console.log('this', this.config); // 应用运行时的 配置项。
    // console.log('this', this.app.config.env);
    // console.log('this', this.service); // 应用定义的 Service。通过它，我们可以访问到其他业务层
    // console.log('this', this.app); // 当前应用 Application 对象实例
    // console.log('this', this.ctx); // 当前请求的上下文 Context 对象实例

    try {
      const oldUser = await ctx.model.System.User1.findOne({ _id: id });
      if (!oldUser) {
        return {
          msg: '用户不存在',
        };
      }
      // await ctx.model.System.User1.deleteOne({ _id: id });
      return {
        msg: '用户删除成功',
      };
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = User1Service;
