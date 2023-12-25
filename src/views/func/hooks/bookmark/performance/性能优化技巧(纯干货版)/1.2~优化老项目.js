// 比如针对react老项目 开始针对的优化


// ① include 或 exclude 限制 loader 范围。
// {
//     test: /\.jsx?$/,
//     exclude: /node_modules/,
//     include: path.resolve(__dirname, '../src'),
//     use:['happypack/loader?id=babel']
//     // loader: 'babel-loader'
// }
 

// ② happypack多进程编译：除了上述改动之外，在plugin中
// /* 多线程编译 */
// new HappyPack({
//     id:'babel',
//     loaders:['babel-loader?cacheDirectory=true']
// })
 

// ③缓存babel编译过的文件
// loaders:['babel-loader?cacheDirectory=true']
 

// ④tree Shaking 删除冗余代码


// ⑤按需加载，按需引入。



// 对于react UI组件 antd
    // 如果我们只是用到了antd中的个别组件，比如<Button /> ,
    // 就要把整个样式库引进来，打包就会发现，体积因为引入了整个样式大了很多。
    // 我们可以通过.babelrc实现按需引入。
// .babelrc 增加对 antd 样式按需引入
// ["import", {
//     "libraryName":
//     "antd",
//     "libraryDirectory": "es",
//     "style": true
// }]