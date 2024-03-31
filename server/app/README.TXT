测试分类：http://localhost:8080/#/categories 
客户端请求/发送 
  一、router      注册接口    (由客户端请求router接口)
  二、controller  注册控制器  (由router接口中调用controller层)
  三、service     注册服务    (由controller层传递参数并调用service层)
  四、model       注册模型    (由service层调用CURD来调用数据库) 


CSDN：Egg.js基本使用		 (https://blog.csdn.net/Litt_White/article/details/124786509)
 
官方：Egg.js -- RESTful风格URL		(https://www.eggjs.org/zh-CN/basics/router#restful-%E9%A3%8E%E6%A0%BC%E7%9A%84-url-%E5%AE%9A%E4%B9%89)
官方：Egg.js -- 获取上传文件		(https://www.eggjs.org/zh-CN/basics/controller#%E8%8E%B7%E5%8F%96%E4%B8%8A%E4%BC%A0%E7%9A%84%E6%96%87%E4%BB%B6)
官方：Egg.js -- Header		(https://www.eggjs.org/zh-CN/basics/controller#header)
官方：Egg.js -- CSRF		(https://www.eggjs.org/zh-CN/basics/controller#csrf)
github：config.default.js 	(https://github.com/eggjs/egg/blob/master/config/config.default.js)
github：plugin.js 		(https://github.com/eggjs/egg/blob/master/config/plugin.js)
github：egg-session -- session插件		(https://github.com/eggjs/egg-session)

Http状态码：List of HTTP status codes		(https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
阿里云：Node.js性能平台		(https://node.console.aliyun.com/)


@一些参考链接：
session与cookie：
  NodeJS 使用 cookie 和 session： https://segmentfault.com/a/1190000016707043
  Egg.js 中 Cookie 的使用： https://www.cnblogs.com/loaderman/p/11547659.html
  Egg.js教程-Cookie的配置和加密： https://mybj123.com/14879.html


@mongoose: https://mongoosejs.com/docs
MongoDB - 条件查询: https://blog.csdn.net/qq_34561892/article/details/113800916
编程技术之美 Mognodb 条件查询：https://www.itzhimei.com/archives/7249.html

mongodb的增删改查：https://blog.csdn.net/qq_62178197/article/details/131373646
