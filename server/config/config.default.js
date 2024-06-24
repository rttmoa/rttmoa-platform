/* eslint valid-jsdoc: "off" */

'use strict';
const userConfig = require('./config.user');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
// 环境配置：https://www.eggjs.org/zh-CN/basics/config
module.exports = appInfo => {
  /**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
  const config = (exports = {});
  // config.cluster = {
  //   listen: {
  //     port: 5000,
  //     hostname: '127.0.0.1',
  //   },
  // };

  // 用于cookie签名密钥 (cookie安全字符串)
  config.keys = appInfo.name + '_1640431712552_1460';

  // 中间件配置
  config.middleware = [ 'errorHandler', 'auth' ];

  // 将public下的静态资源重定向到根目录下
  config.static = {
    prefix: '/',
  };
  // 模板
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };
  config.assets = {
    publicPath: '/public',
    devServer: {
      debug: false,
      command: 'roadhog dev',
      port: 7001,
      env: {
        BROWSER: 'none',
        ESLINT: 'none',
        SOCKET_SERVER: 'http://127.0.0.1:7001',
        PUBLIC_PATH: 'http://127.0.0.1:7001',
      },
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

  config.session = {
    key: 'BLOG_EGG_SESSION_KEY', // Session Cookie 名称
    encrypt: false,
    // maxAge: 86400000, // Session 最长有效期
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
  // 将 logger 目录放到代码目录下
  // config.logger = {
  //   dir: path.join(appInfo.baseDir, 'logs'),
  // };

  config.bodyParser = {
    jsonLimit: '1kb',
    formLimit: '100kb', // 10b, 1kb, 100kb (最大100kb)
  };
  config.multipart = {
    // 注意：当重写了 whitelist 时，fileExtensions 不生效。
    // mode: "file",
    // fileExtensions: ['.apk'] // 增加对 '.apk' 扩展名的文件支持
    // whitelist: [ '.png' ], // 覆盖整个白名单，只允许上传 '.png' 格式
  };

  return {
    ...config,
    ...userConfig,
  };
};
