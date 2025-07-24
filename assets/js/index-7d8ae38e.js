import{j as e,B as l,ax as r}from"./index-ce305ae4.js";import{C as i}from"./index-9637d4fe.js";import{P as t}from"./index-15655760.js";import"./index-ed8186ad.js";import"./index-c638ac2b.js";import"./BaseForm-14c5e86f.js";import"./index-8fedbd27.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-056cc98f.js";import"./index-48d95938.js";import"./index-94fed918.js";import"./useShowArrow-4694b8b9.js";import"./List-56c9e8f2.js";import"./useIcons-fcda2b78.js";import"./index-bfa76761.js";import"./conductUtil-aed6114a.js";import"./index-a32ed1a8.js";import"./index-b008b159.js";import"./useBubbleLock-e08e9380.js";import"./_baseAssignValue-3497feaa.js";import"./_baseClone-5f2d895f.js";import"./ColorPicker-185545cc.js";import"./ColorPicker-728c28ec.js";import"./index-40b96800.js";import"./index-4bdc86b0.js";import"./index-2feea8ef.js";import"./addEventListener-5f1556e3.js";import"./index-4550fc52.js";import"./index-4990f48e.js";import"./index-911f152f.js";import"./index-448ba2fa.js";import"./iconUtil-3566758d.js";import"./index-09c4d2cd.js";import"./index-35b05b49.js";import"./styleChecker-5e7b4a56.js";import"./index-66ce779d.js";import"./useLazyKVMap-443e35ad.js";import"./index-88cd6ca0.js";import"./index-8b54cd4c.js";import"./index-59f06b40.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-7d8ae38e.js.map
