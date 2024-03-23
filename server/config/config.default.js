/* eslint valid-jsdoc: "off" */

'use strict';
const userConfig = require('./config.user');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// ! 环境配置：https://www.eggjs.org/zh-CN/basics/config#%E5%A4%9A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // 用于cookie签名密钥 (cookie安全字符串)
  config.keys = appInfo.name + '_1640431712552_1460';

  // 中间件配置
  config.middleware = [ 'errorHandler', 'auth' ];

  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // csrf安全
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // config.proxy = true; // 注意，开启此模式后，应用就默认处于反向代理之后。它会支持通过解析约定的请求头来获取用户真实的 IP、协议和域名
  // config.ipHeaders = 'X-Real-Ip, X-Forwarded-For'; // 开启 proxy 配置后，应用会解析 X-Forwarded-For 请求头来获取客户端的真实 IP
  // config.maxIpsCount = 1; // 限制前置代理的数量。这样在获取请求真实 IP 地址时，会忽略掉用户所传递的伪造 IP 地址

  // 文件
  // config.multipart = {
  //   mode: "file",
  //   fileExtensions: [".md"], // 增加对 md 扩展名的文件支持
  // };

  config.session = {
    key: 'BLOG_EGG_SESSION_KEY',
    encrypt: false,
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/rttmoaBlog',
    options: {
      useUnifiedTopology: true,
    },
  };

  config.jwt = {
    secret: userConfig.userName,
  };

  config.auth = {
    whiteList: [ userConfig.userName ],
  };

  return {
    ...config,
    ...userConfig,
  };
};
