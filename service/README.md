## 探花交友后台API启动

### 注意点：

```
"mongodb": "^6.2.0", 版本过高、降低至v5版本、npm install mongodb@5.9.2     Node v18.18.0
```

### 技术需求

> * 本地接口文档；[http://localhost:9089/swagger.html](http://localhost:9089/swagger.html)
> * 服务端技术；Koa + MySQL + ES6
> * 数据库关系；tanhua.sql
> * 数据库表设计 Visio
> * Koa操作mysql；koa-mysql.js
> * 项目中Mysql的写法 + 函数封装

### 测试

1. 参考steedos：[platform-steedos  github地址](https://github.com/steedos/steedos-platform/tree/master/packages/objectql/src)
2. 配置docker
   1. 使用docker启动此项目： 我有一个koa.js项目，使用的node版本是v18.18.0， mysql的版本是5.7.17，mysql安装路径是C:\Program Files\MySQL\MySQL Server 5.7，账号是root，密码是root，数据库名词是tanhua， koajs服务端口是9089，如何配置docker，并用docker启动
   2. 存储：这里docker数据存储到内部 与 直接连接本地的mysql文件区别
   3. 运行：docker-compose up -d
   4. 名称：docker镜像文件名 与 docker容器名
3. package下操作sql的 ES6 语句

### 功能需求分析

> * 交友 friend
> * 消息 message
> * 我的 my
> * 圈子 qz
> * 用户 user

### 交友 friend

> 1. 最近来访  （访客信息）
> 2. 今日佳人  （找到缘分值最大的用户）
