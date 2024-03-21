




测试分类：http://localhost:8080/#/categories 
客户端请求/发送 
  一、router      注册接口    (由客户端请求router接口)
  二、controller  注册控制器  (由router接口中调用controller层)
  三、service     注册服务    (由controller层传递参数并调用service层)
  四、model       注册模型    (由service层调用CURD来调用数据库) 

结束：admin 
结束：user


一些参考链接：
session与cookie：
  NodeJS 使用 cookie 和 session： https://segmentfault.com/a/1190000016707043
  Egg.js 中 Cookie 的使用： https://www.cnblogs.com/loaderman/p/11547659.html
  Egg.js教程-Cookie的配置和加密： https://mybj123.com/14879.html


MongoDB - 条件查询: https://blog.csdn.net/qq_34561892/article/details/113800916
