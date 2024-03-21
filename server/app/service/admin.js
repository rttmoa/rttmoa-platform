/* eslint-disable strict */
const Service = require('egg').Service;

class AdminService extends Service {


  async adminLogin(params) { // ! 登陆
    const { ctx, app } = this;
    // const oldUser = await ctx.model.Admin.findOne({ userName: 'test_admin' });
    // console.log(oldUser); // null
    // console.log(!!oldUser); // false
    const oldUser = await ctx.model.Admin.findOne({ userName: params.userName });
    // - oldUser // { _id: 62f6094da6d9f13d94235b0b, userName: 'admin', password: '$2b$10$YB2cpOeL34pPRNT8euymWOmes3pQeJLlSrv3WU7ZKmRDKjFFY/U6K'}
    // - !!oldUser // false
    // return
    if (!oldUser) return { msg: '用户不存在' };

    const isMatch = await ctx.helper.comparePassword(params.password, oldUser.password);
    if (!isMatch) return { msg: '用户名或密码错误' };

    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
      // expiresIn: '3s', // 控制 token 过期时间
      expiresIn: '1h',
    });
    console.log('token', token);

    // ! Cookie 设置语法: ctx.cookies.set(key, value, options)
    ctx.cookies.set('token', token, {
      // maxAge:1000*3600*24,  // cookie存储一天     设置过期时间后关闭浏览器重新打开cookie还存在
      maxAge: 86400000,
      // maxAge: 1000 * 3, // 3s
      httpOnly: true,
    });
    // console.log('token: ', ctx.cookies.get('token'));
    return {
      data: {
        token,
        userName: oldUser.userName,
      },
      msg: '登录成功',
    };
  }


  async adminLogout() { // ! 退出
    const { ctx } = this;
    ctx.cookies.set('token', '', { maxAge: 0 });
    return {
      msg: '退出成功',
    };
  }
}

module.exports = AdminService;
