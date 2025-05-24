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

> - 项目 url; [🚀](https://github.com/rttmoa/rttmoa-platform)

## 🌱 安装使用步骤

- **Clone：**

```
# GitHub
https://github.com/rttmoa/rttmoa-platform.git
```

- **Install：**

```
# 安装
pnpm install
```

- **Run：**

```
# 启动
pnpm start
```

- **Build：**

```
# 开发环境
pnpm build:dev

# 测试环境
pnpm build:test

# 生产环境
pnpm build:pro
```

- **Lint：**

```
# eslint 检测代码
pnpm lint:eslint

# prettier 格式化代码
pnpm lint:prettier

# stylelint 格式化样式
pnpm lint:stylelint
```

- **commit：**

```
# 提交代码（会自动执行 lint:lint-staged 命令）
pnpm commit
```

- **Bit**

```
# Build composable software
$ npm i -g @teambit/bvm
$ bvm install
$ bvm upgrade
$ bit start
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

## 使用标准 commit 生成 changelog 标准化

- [conventional-changelog](https://github.com/conventional-changelog)
- [standard-version](https://github.com/conventional-changelog/standard-version)
- npm install
- package.json
- git commit
- conventional-changelog-cli
- standard-version

    - changes
    - git add . / git cz
    - npm run release

    ```bash
    npm install --save-dev commitizen
    npm install --save-dev cz-conventional-changelog
    "config": {
      "commitizen": {
        "path": "cz-conventional-changelog"
      }
    }
    git add .
    git cz or cz
    npm install -g conventional-changelog-cli
    conventional-changelog -p angular -i CHANGELOG.md -s
    npm install -g standard-version
    "release": "standard-version --tag-prefix \"publish/\""
    ```

## 约定式提交

1. [Conventional Commits](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

## Commit message

1. The commit message should be structured as follows:

    ```bash
      <type>[optional scope]: <description>
      <BLANK LINE>
      [optional body]
      <BLANK LINE>
      [optional footer(s)]
    ```

2. "type-enum": ["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]
3. type-enum 说明文档：

    - build: 依赖调整
      影响构建系统或外部依赖的更改 (示例作用域：gulp, broccoli, npm）
    - chore: 杂务处理
      其他不会修改源文件或者测试文件的更改
    - ci: 脚本变更
      对 CI 配置文件和脚本的更改（示例作用域： Travis, Circle, BrowserStack, SauceLabs)
    - docs: 文档变更
      添加或者更新文档
    - feat: 添加功能
      引入新的特性
    - fix 错误修复
      修复 bug
    - perf: 性能优化
      更改代码以提高性能
    - refactor: 代码重构
      即不是修复 Bug，也不是添加特性的代码更改
    - revert: 恢复版本
      恢复到上一个版本
    - style: 格式调整
      不会影响代码含义的更改（空格，格式缺少分号等）
    - test: 更新测试
      添加或者更新测试

4. [Devmoji 提交库](https://www.npmjs.com/package/devmoji)
5. [提交消息的表情符号Emojs](https://gitmoji.dev/)
6. [git commit 工具链](https://juejin.cn/post/7067166468797890591)
7. [https://theodorusclarence.com/library/conventional-commit-readme](https://theodorusclarence.com/library/conventional-commit-readme)

## React 代码拆分库

1. [Loadable Components](https://loadable-components.com/)

## Mock Server

## 部署

1. Deployment: [Deployment] ([https://create-react-app.dev/docs/deployment](https://create-react-app.dev/docs/deployment))
2. Deploy gh-pages:

    ```bash
    "predeploy": "npm run build:production",
    "deploy": "gh-pages -d dist -b gh-pages",
    ```

## Docusaurus

## Snyk

```js
  - npm install -g snyk
  - snyk auth
  - snyk monitor
```

## Bit

1. [Bit.dev](https://bit.dev/)
2. [Bit 实践](https://juejin.cn/post/7157576390177456159)

## 已支持特性

1. TypeScript: [TypeScript](https://www.typescriptlang.org/)
    - [https://react-typescript-cheatsheet.netlify.app/](https://react-typescript-cheatsheet.netlify.app/)
    - [https://usehooks-ts.com/](https://usehooks-ts.com/)
    - [webpack-react-boilerplate](https://github.com/gor918/webpack-react-boilerplate)
    - [https://usehooks.com/](https://usehooks.com/)
    - [https://ahooks.js.org/](https://ahooks.js.org/)
2. Mock Server
    - [Faker](https://fakerjs.dev/)
    - [msw](https://github.com/mswjs/msw)
3. 单页面多页签参考
    - [react-antd-multi-tabs-admin](https://github.com/hsl947/react-antd-multi-tabs-admin.git)
4. Axios
    - [axios 拦截器之重复请求取消](https://juejin.cn/post/7004721390767046686)
5. React SVGR
    - [https://react-svgr.com/docs/webpack/](https://react-svgr.com/docs/webpack/)

## 代码规范：ESLint Prettier Husky EditorConfig

1. ESLint: [ESLint](https://eslint.org/)

    ESLint is a linter for the JavaScript language, written in Node.js. That helps you find and fix problems in your JavaScript code.

    [https://json.schemastore.org/eslintrc](https://json.schemastore.org/eslintrc)

2. Prettier: [Prettier](https://github.com/prettier/prettier)

    Prettier is an opinionated code formatter that formats the code with the help of rules we set.

3. Husky: [Husky](https://github.com/typicode/husky)

    Husky is an NPM package that lets you run a set of commands or script before any git action. For eg pre-push, pre-commit, pre-rebase.

4. Commit Lint: [Commit Lint](https://commitlint.js.org)

    CommitLint helps your team adhering to a commit convention. By supporting npm-installed configurations it makes sharing of commit conventions easy.

5. Editor Config: [EditorConfig](https://EditorConfig.org)
   EditorConfig helps maintain consistent coding styles for multiple developers working on the same project across various editors and IDEs.
6. Semantic Versioning: [Semantic Versioning](https://semver.org/)
7. Active hooks:
   [https://typicode.github.io/husky/#/?id=install](https://typicode.github.io/husky/#/?id=install)
8. Prettierrc
   [http://json.schemastore.org/prettierrc](http://json.schemastore.org/prettierrc)
9. Conflict eslint prettier Conditional (ternary) operator

    ```bash
     // lint-staged

     "lint-staged": {
       "**/*": [
         "npm run prettier:fix"
       ],
       "src/**/*.{js, jsx, ts, tsx}": [
         "npm run eslint:fix",
         "npm run prettier:fix"
       ],
       "src/**/*.less": [
         "npm run stylelint:fix",
         "npm run prettier:fix"
       ],
       "*.md": [
         "npm run markdownlint:fix",
         "npm run prettier:fix"
       ]
     },
     // .eslintrc.json
     "extends": ["plugin:react/recommended", "standard", "prettier"],
     // package.json
     "prettier:fix": "prettier --write \"src/**/*\" --end-of-line auto --ignore-unknown",
    ```

## 自动化持续代码审查工具

1. [DeepSource/](https://deepsource.io/)
2. [DeepScan](https://deepscan.io/)
3. [SonarQube](https://www.sonarsource.com/)

## Mac 本地部署 SonarQube

1. [SonarQube for Mac](https://juejin.cn/post/7210005376652886077)
2. [Gitlab for Mac](https://juejin.cn/post/7210746685802397755)
3. [Gitlab CI/CD for Mac](https://juejin.cn/post/7214686619097874491)

## VSCode 扩展

1. ErrorLens: [ErrorLens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
2. SonarLint: [https://www.sonarlint.org/](https://www.sonarlint.org/)

## CSS Modules

CSS模块是一个CSS文件，其中的所有类名和动画名称默认都是本地作用域。

1. PostCSS: [PostCSS](https://postcss.org/)
2. StyleLint: [StyleLint](https://stylelint.io/)
   npx stylelint --help

## CSS Libary

1. Windi CSS: [Windi CSS](https://windicss.org/)
2. TailWind CSS: [TailWind CSS](https://tailwindcss.com/)

## CI/CD 自动化构建

1. GitHub Actions

## Test

1. [Jest](https://jestjs.io/)
2. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
3. [React Hooks Testing Library](https://github.com/testing-library/react-hooks-testing-library)
4. [Cypress](https://www.cypress.io/)

```bash
    1. npm install jest babel-jest @babel/preset-env @babel/preset-react react-test-renderer --save-dev
    2. npm install  --save-dev @testing-library/react
    3. npm install cypress --save-dev
    4. npm install --save-dev @testing-library/react-hook
```

## Plugins

1. [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
2. [react-refresh](https://www.npmjs.com/package/react-refresh)

## HTTP

1. HTTP: [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

## Code Contributors

## 许可证

1. [MIT](https://choosealicense.com/licenses/mit/)
2. [Choose A License](https://choosealicense.com/)

## Server: Dev, Test, UAT(Live), Staging, Demo, Production

1. [Server Info](https://www.gratasoftware.com/what-is-each-server-for-development-test-uat-or-staging-demo-and-production/)

Promotion Web
Licensed under the [Apache License](https://choosealicense.com/licenses/apache-2.0/).

## NPM version

npm version [| major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=[alpha, beta, rc]] | from-git]

## Git Tag

1. git tag -a v1.2.0 -m "version: 1.2.0"
2. git push origin v1.2.0
3. git push origin --tags

## Nginx

1. [Mac Nginx](https://newbedev.com/how-to-restart-nginx-on-mac-os-x)

    ```bash
     brew install nginx
     brew reinstall nginx

     /usr/local/var/www
     /usr/local/etc/nginx/nginx.conf
     /usr/local/etc/nginx/servers/

     brew services list
     brew services start nginx
     brew services stop nginx
     brew services restart nginx
    ```

2. Nginx.conf

    ```bash
    server {
     listen       8081;
     #server_name  localhost;
     server_name  www.xxx-web.com;

     location / {
         root   /usr/local/var/www/xxx-web;
         index  index.html index.htm;
         try_files  $uri $uri/ /index.html @rewrites;
         expires -1;
         add_header Cache-Control no-cache;
         # proxy_pass http://localhost:3000;
     }
     # 接口转发，如果需要的话
     #location ~ ^/api {
     #  proxy_pass http://www.xxx.com;
     #}
     location @rewrites {
       rewrite ^(.+)$ /index.html break;
     }
     # 或者全部重定向
     # return 301 https://$server_name$request_uri;
    }

     # SwitchHosts!
     192.168.1.101 www.xxx-web.com
    ```

3. Nginx for Windows

    ```bash
       1. start nginx
       2. nginx -s stop
       3. nginx -s quit
       4. nginx -s reload
       5. nginx -s reopen
    ```

## Tree Node Cli（生成目录结构）

1. npm install -g tree-node-cli
2. Mac: tree -L 2 -I "node_modules" -r -F
3. Win: treee -L 2 -I "node_modules" -r -F
4. tree node

## Webpack Analyse

1. [Webpack 官方分析工具](https://webpack.github.io/analyse/)

    ```bash
       npm run analyze:build
    ```

## CRACO：创建React应用程序配置

1. [https://github.com/gsoft-inc/craco](https://github.com/gsoft-inc/craco)

## 与 ESLint 风格不一致

1. "lint:json": "jsonlint --quiet src/\*_/_.json",
2. "standard": "standard src/\*_/_",
3. "standard:fix": "standard --fix src/\*_/_",
4. rm -rf package-lock.json

## Update npm

```bash
  npm install css-loader@5.2.7 --save-dev
  "webpack-dev-server": "^4.1.1",
  Uncaught TypeError: SocketClient is not a constructor
```

## GitHub Proxy

1. 首先确认自己 git 拉取代码的方式

    ```bash
      git remote -v
    ```

2. 设置代理

    ```bash
      git config --global https.proxy 127.0.0.1:10808
      git config --global http.proxy 127.0.0.1:10808
      git config --global http.proxy 'socks5://127.0.0.1:10808'
      git config --global https.proxy 'socks5://127.0.0.1:10808'
    ```

3. 查看代理是否成功

    ```bash
      git config --get --global http.proxy
    ```

4. 查看 git 配置

    ```bash
      git config --global --list
    ```

5. 取消代理

    ```bash
      git config --global --unset http.proxy
      git config --global --unset https.proxy
    ```

## pm-keeper

1. [https://www.npmjs.com/package/pm-keeper](https://www.npmjs.com/package/pm-keeper)

## npm i && npm ci

1. [npm ci vs. npm install](https://betterprogramming.pub/npm-ci-vs-npm-install-which-should-you-use-in-your-node-js-projects-51e07cb71e26)

## Husky 不起作用解决方案

参考官网：[https://typicode.github.io/husky](https://typicode.github.io/husky/#/)
按以下步骤进行设置：

1. 删除 .git 目录下的 hooks 及 .husky
2. 查看 git config 配置是否存在 core.hookspath=.husky

    ```base
      git config --list
    ```

3. 删除配置及卸载 Huksy:

    ```base
      npm uninstall husky && git config --unset core.hookspath
    ```

4. 再次安装 Husky:

    ```base
      npm install husky --save-dev
      // npm set-script prepare "husky install"
      npx husky-init
    ```

5. 新增 Hooks：

    ```base
      npx husky add .husky/pre-commit "npx lint-staged"
      npx husky add .husky/pre-commit "npx pretty-quick --staged"
      npx husky add .husky/commit-msg 'npx --no-install commitlint --edit'
    ```

## Show your support

If you like the project, give it a star ⭐️, it will be a great encouragement to me.
