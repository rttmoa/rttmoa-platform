const mongoose = require('mongoose');
const express = require('express');
const app = express(); // 产生应用对象

// 声明使用静态中间件
app.use(express.static('public'));
// 声明使用解析post请求的中间件
app.use(express.urlencoded({ extended: true })); // 请求体参数是: name=tom&pwd=123
app.use(express.json()); // 请求体参数是json结构: {name: tom, pwd: 123}
// 声明使用解析cookie数据的中间件
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// 声明使用路由器中间件
const indexRouter = require('./routers');
app.use('/', indexRouter);
 
 
mongoose
    .connect('mongodb://localhost/server_db2', { useNewUrlParser: true })
    .then(() => {
        console.log('连接数据库成功!!!');
        // 只有当连接上数据库后才去启动服务器
        app.listen('5000', () => {
            console.log('服务器启动成功, 请访问: http://localhost:5000');
        });
    })
    .catch(error => {
        console.error('连接数据库失败', error);
    });
