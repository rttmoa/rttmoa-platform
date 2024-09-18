import{j as o,C as e,bJ as t,S as i,B as r,bK as h}from"./.pnpm-e6eae8df.js";import c from"./mermaidHooks-43212f85.js";import l from"./markmapHooks-536cb2fd.js";const m=`sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?`,d=`# 登录注册模块功能页面结构图

- 登录页面
  - 输入用户名
    - 1
  - 输入密码
  - 登录按钮
  - 忘记密码链接
  - 注册链接

- 注册页面
  - 输入用户名
  - 输入密码
  - 确认密码
  - 注册按钮
  - 返回登录链接

- 忘记密码页面
  - 输入注册邮箱
  - 发送重置密码链接按钮
  - 返回登录链接

- 重置密码页面
  - 输入新密码
  - 确认新密码
  - 重置密码按钮
  - 返回登录链接

`,k=()=>o.jsxs(o.Fragment,{children:[o.jsxs(e,{className:"mb30",children:[o.jsx("h3",{children:"演示 Mermaid："}),o.jsx(t,{centerOnInit:!0,centerZoomedOut:!0,children:({zoomIn:n,zoomOut:s,resetTransform:a})=>o.jsxs(o.Fragment,{children:[o.jsxs(i,{children:[o.jsx(r,{onClick:()=>n(),children:"放大"}),o.jsx(r,{onClick:()=>s(),children:"缩小"}),o.jsx(r,{onClick:()=>a(),children:"还原"})]}),o.jsx(h,{children:o.jsx(c,{chart:m})})]})})]}),o.jsxs(e,{children:[o.jsx("h3",{children:"演示 Markmap："}),o.jsx("section",{children:o.jsx(l,{markmap:d})})]})]});export{k as default};
