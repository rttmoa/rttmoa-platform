import{j as e,B as l,g as r}from"./index-ee07df26.js";import{C as i}from"./index-6557b029.js";import{P as t}from"./index-f45b4e24.js";import"./index-2c8b4c50.js";import"./index-67e4afb4.js";import"./BaseForm-d3334309.js";import"./index-dae985b0.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-6acce477.js";import"./index-16acb878.js";import"./index-9cc90a7b.js";import"./useShowArrow-f1fa37e8.js";import"./List-cf3fe78a.js";import"./useIcons-114c984a.js";import"./index-ce2edc12.js";import"./conductUtil-8b3db2b1.js";import"./index-c953e1cf.js";import"./index-8183a9bd.js";import"./useBubbleLock-3fe10614.js";import"./_baseAssignValue-d22bc174.js";import"./_baseClone-bfbce7fb.js";import"./ColorPicker-6be962bc.js";import"./ColorPicker-966cce23.js";import"./index-1ca63539.js";import"./index-c0062c7b.js";import"./index-91196a70.js";import"./addEventListener-50c8a8df.js";import"./index-686fe65f.js";import"./index-04603934.js";import"./index-cddf7d14.js";import"./index-b06698bc.js";import"./iconUtil-dd3dcb91.js";import"./index-0d094e56.js";import"./index-46548f8a.js";import"./styleChecker-bf5daeb5.js";import"./index-39e3f2d9.js";import"./useLazyKVMap-d1a528e7.js";import"./index-13f5a5bb.js";import"./index-56c11758.js";import"./index-18152625.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
yarn run v1.22.0
$ eslint --format=pretty ./packages
Done in 9.70s.
          `}),e.jsx(t.Item,{label:"JSON 代码块",valueType:"jsonCode",children:`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,

    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`})]})]});export{K as default};
//# sourceMappingURL=index-61eb8752.js.map
