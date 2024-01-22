# 📖 rttmoa-platform

## 🛫 项目功能

> - 🚀 采用最新技术找开发：react18、react-router v6、react-hooks、typescript、vite4、antd5
> - 🚀 采用 Vite4 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具…）
> - 🚀 使用 redux 做状态管理，集成 immer、react-redux、redux-persist 开发 + redux-toolkit
> - 🚀 使用 TypeScript 对 Axios 二次封装 （错误拦截、常用请求封装、全局请求 Loading、取消重复请求…）
> - 🚀 支持 Antd 组件大小切换、暗黑、灰色、色弱模式、i18n 国际化
> - 🚀 使用 自定义高阶组件 进行路由权限拦截（403 页面）、页面按钮权限配置
> - 🚀 支持 React-Router v6 路由懒加载配置、菜单手风琴模式、无限级菜单、多标签页、面包屑导航
> - 🚀 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范（项目规范配置）
> - 🚀 使用 husky、lint-staged、commitlint、commitizen、cz-git 规范提交信息（项目规范配置）

## 📑参考链接

> - 项目 url; [http://localhost:9527](http://localhost:9527)
> - 项目 [mock](https://mock.mengxuegu.com/);
> - 阮一峰 [typescript](https://wangdoc.com/typescript/)
> - axios封装RESTful风格API： [Link](https://wocwin.github.io/t-ui/projectProblem/axios.html)

## 🌱 安装使用步骤

- **Clone：**

```
# GitHub
https://github.com/rttmoa/rttmoa-platform.git
```

- **Install：**

```
# 安装
yarn
```

- **Run：**

```
# 启动
yarn start
```

- **Build：**

```
# 开发环境
yarn build:dev

# 测试环境
yarn build:test

# 生产环境
yarn build:pro
```

- **Lint：**

```
# eslint 检测代码
yarn lint:eslint

# prettier 格式化代码
yarn lint:prettier

# stylelint 格式化样式
lint:stylelint
```

- **commit：**

```
# 提交代码（会自动执行 lint:lint-staged 命令）
yarn commit
```

## 📂 文件资源目录

```
rttmoa-platform
├─ .vscode                # vscode推荐配置
├─ public                 # 静态资源文件（忽略打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件: 图片,字体,图标
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ enums               # 枚举类型
│  ├─ hooks               # 常用 Hooks
│  ├─ language            # 语言国际化
│  ├─ layouts             # 框架布局
│  ├─ routers             # 路由管理: 静态路由,动态路由
│  ├─ redux               # redux store
│  ├─ styles              # 全局样式
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 工具库
│  ├─ views               # 项目所有页面
│  ├─ App.tsx             # 入口页面
│  ├─ main.tsx            # 入口文件
│  └─ env.d.ts            # vite 声明文件
├─ .editorconfig          # 编辑器配置（格式化）
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置
├─ .gitignore             # git 提交忽略
├─ .prettierignore        # 忽略 prettier 格式化
├─ .prettierrc.js         # prettier 配置
├─ .stylelintignore       # 忽略 stylelint 格式化
├─ .stylelintrc.js        # stylelint 样式格式化配置
├─ CHANGELOG.md           # 项目更新日志
├─ commitlint.config.js   # git 提交规范配置
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ lint-staged.config     # lint-staged 配置文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ postcss.config.js      # postcss 配置
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 配置
```

## 🚨 浏览器支持

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不在支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| ----------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| not support                                     | last 2 versions                                   | last 2 versions                                      | last 2 versions                                     | last 2 versions                                     |
