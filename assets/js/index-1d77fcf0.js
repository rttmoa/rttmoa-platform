import{j as e,B as l,d as r}from"./index-d515c603.js";import{C as i}from"./index-155022f1.js";import{P as t}from"./index-5267be43.js";import"./index-55f799c2.js";import"./index-5216dad6.js";import"./BaseForm-a8e10718.js";import"./index-b46f6fcc.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-38116187.js";import"./index-d515fb2d.js";import"./index-b3ea6e12.js";import"./useShowArrow-985004d6.js";import"./List-a4166869.js";import"./useIcons-2031fe74.js";import"./index-b2854aef.js";import"./conductUtil-6c2bace6.js";import"./index-7085d248.js";import"./index-f248af44.js";import"./useBubbleLock-3aa70f20.js";import"./_baseAssignValue-3dfd9abd.js";import"./_baseClone-fd787f78.js";import"./ColorPicker-80411e28.js";import"./ColorPicker-2e5ae8aa.js";import"./index-c76a6996.js";import"./index-8da448e7.js";import"./index-94349ac1.js";import"./addEventListener-2c21f105.js";import"./index-329aed9d.js";import"./index-5ac73acd.js";import"./index-0d027f67.js";import"./index-0cdc9b9d.js";import"./iconUtil-9ab99bfb.js";import"./index-88e3809e.js";import"./index-2d46ed8e.js";import"./styleChecker-3c2460c3.js";import"./index-34b478ec.js";import"./useLazyKVMap-719d175e.js";import"./index-e39b7c07.js";import"./index-5b2a385d.js";import"./index-4760ff74.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
