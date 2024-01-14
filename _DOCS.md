# rttmoa-platform

rttmoa-platform USE React18、React-RouterV6、TypeScript、Vite4、Ant-Design5

Nodejs V16.20.1

## 项目目录

-> .husky
-> .vscode
-> build
-> public
-> src
√ api | 二次封装 axios 请求
√ assets | 字体、字体图标、图标、json、图片 - component - components
√ config | 配置：可复用常量、进度条、表格配置 / HOME_URL | DEFAULT_PRIMARY | nprogress | proTable
√ context | 全局上下文 / createContext() | useContext()
√ enums | 枚举：请求配置、请求方法 / enum ResultEnum{} | enum RequestEnum {} | enum ContentTypeEnum {} - hooks | 封装项目公共 Hooks / usePermissions | useTableScroll | useTheme
√ languages | 中文、英文 - layouts | 项目布局
× redux | redux配置：react-redux、@reduxjs/toolkit、redux-persist、redux-thunk
√ routers | 路由处理：静态路由(固定的) + 动态路由(接口列表中的)
√ styles | 全局主题配置亮/暗、公共LESS文件： theme/global.ts | common.less、proTable.less、transition.less
√ typings | 声明文件 global.d.ts、utils.d.ts、window.d.ts / global.d.ts 与 .env.development 与 getEnv.ts|plugins.ts 处理关系 - utils | 处理颜色、公共方法函数 / 十六进制 <-> RGB | 加深/减轻颜色值 | 获取问候语 | 扁平化菜单 | 扁平化面包屑 - views
√ App.tsx | 全局配置、初始化配置
√ main.tsx | 根组件Redux、Redux-persist | 引入css、less、font、iconfont、markdown.css

## CHANGELOG

> - [ ] .
> - [x] .tailwindcss
> - [x] .LayoutVertical | LayoutClassic | LayoutTransverse | LayoutColumns & 四种 HTML 结构
> - [x] .typescript、layouts四个布局+4个布局下的菜单、添加LESS语法、切换全局字体
> - [x] 添加功能
> - [x] 修复bug：降低 react-transition-group 包导致项目启动失败
> - [x] 尝试删除 package.json 中 "type": "module",
> - [x] Axios二次封装，接口统一存放,满足RESTful风格 [Link](https://wocwin.github.io/t-ui/projectProblem/axios.html)
> - [x] Easy Mock -> apifox [Link](https://app.apifox.com/project/3219319)

## 参考链接

> - 项目 url; [http://localhost:9527](http://localhost:9527)
> - 项目 mock; [https://mock.mengxuegu.com/editor/64ce5fd3686aea63fd6b5a30/64ce649f686aea63fd6b5a34](https://mock.mengxuegu.com/editor/64ce5fd3686aea63fd6b5a30/64ce649f686aea63fd6b5a34)
> - 阮一峰TS；[https://wangdoc.com/typescript](https://wangdoc.com/typescript)
> - TS 中文手册：[https://typescript.bootcss.com/tutorials/typescript-in-5-minutes.html](https://typescript.bootcss.com/tutorials/typescript-in-5-minutes.html)
> - typescript: [https://icodex.me/docs/typescript/React%E4%B8%AD%E7%9A%84%E7%B1%BB%E5%9E%8B](https://icodex.me/docs/typescript/React%E4%B8%AD%E7%9A%84%E7%B1%BB%E5%9E%8B)
> - typescript入门教程；[https://ts.xcatliu.com/advanced/generics.html](https://ts.xcatliu.com/advanced/generics.html)
> - typescript入门教程 / index.d.ts声明文件；[https://ts.xcatliu.com/basics/declaration-files](https://ts.xcatliu.com/basics/declaration-files)
