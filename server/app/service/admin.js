/* eslint-disable strict */
const Service = require('egg').Service;

class AdminService extends Service {

  // @登陆
  async adminLogin(params) {
    const { ctx, app } = this;
    const adminOldUser = await ctx.model.Admin.findOne({ userName: params.userName });
    const user1OldUser = await ctx.model.System.User1.findOne({ userName: params.userName });
    if (!adminOldUser && !user1OldUser) return { msg: '用户不存在' };

    let oldUser = {};
    if (adminOldUser) oldUser = adminOldUser;
    if (user1OldUser) oldUser = user1OldUser;
    console.log('oldUser', oldUser);
    const isMatch = await ctx.helper.comparePassword(params.password, oldUser.password);
    console.log('isMatch', isMatch);
    if (!isMatch) return { msg: '用户名或密码错误' };

    const token = app.jwt.sign({ ...oldUser }, app.config.jwt.secret, {
      // expiresIn: '3s', // 控制 token 过期时间
      expiresIn: '1y', // 一年
    });
    // console.log('token', token);

    // @egg.js cookie: https://blog.csdn.net/u012570307/article/details/117151784
    ctx.cookies.set('token', token, {
      // 1000 * 3600 * 24 = 86400000毫秒   cookie存储一天     设置过期时间后关闭浏览器重新打开cookie还存在   1000 * 3 = 3s
      maxAge: 1000 * 3600 * 24,
      httpOnly: true,
    });

    // 登陆后返回 token
    return {
      data: {
        token,
        userName: oldUser.userName,
      },
      msg: '登录成功',
    };
  }

  // @退出时，判断是哪个用户退出，把用户的 cookies 删除掉
  async adminLogout() {
    const { ctx } = this;
    ctx.cookies.set('token', '', { maxAge: 0 });
    return {
      msg: '退出成功',
    };
  }
}

module.exports = AdminService;
