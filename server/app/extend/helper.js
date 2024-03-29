/* eslint-disable no-unused-vars */
/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns-type */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable strict */
const moment = require('moment');
const bcrypt = require('bcrypt');

/** #### 注册到ctx中 ---*/
module.exports = {
  foo(param) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
  },
  // updateTime: ctx.helper.moment().unix()
  moment,
  /** #### 加密：加密密码 生成Salt */
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) {
            resolve(hash);
          } else {
            reject(err);
          }
        });
      });
    });
  },
  /** #### 解密：与数据库中密码相比较 返回Boolean  */
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch);
        else reject(err);
      });
    });
  },

  /** #### 状态码为200，成功  */
  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200;
    if (res.status) {
      delete res.status;
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0, // 0 代表成功，其他代表失败
      msg: res.msg ? res.msg : '请求成功',
    };
  },

  /** #### 过滤参数，除了page&pageSize是否有别的参数  */
  filterEmptyField(params) {
    const pam = {};
    for (const i in params) {
      if (params[i]) {
        if (i !== 'page' && i !== 'pageSize') {
          pam[i] = params[i];
        }
      }
    }
    return pam;
  },

  /** #### 参数中根据时间查询  */
  getTimeQueryCon(params) {
    const timeQuery = {};

    // createStartTime		否	number	10位时间戳    2022-1-26 2022-1-27
    // createEndTime		  否	number	10位时间戳    2022-1-27
    // updateStartTime		否	number	10位时间戳
    // updateEndTime

    if (params.createStartTime) {
      timeQuery.createTime = { $gte: params.createStartTime };
    }
    if (params.createEndTime) {
      timeQuery.createTime = { $lte: params.createEndTime };
    }
    if (params.createStartTime && params.createEndTime) {
      timeQuery.createTime = {
        $gte: params.createStartTime,
        $lte: params.createEndTime,
      };
    }

    if (params.updateStartTime) {
      timeQuery.updateTime = { $gte: params.updateStartTime };
    }
    if (params.updateEndTime) {
      timeQuery.updateTime = { $lte: params.updateEndTime };
    }
    if (params.updateStartTime && params.updateEndTime) {
      timeQuery.updateTime = {
        $gte: params.updateStartTime,
        $lte: params.updateEndTime,
      };
    }

    return timeQuery;
  },
};
