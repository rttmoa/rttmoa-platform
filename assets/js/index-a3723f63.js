import{j as e,B as l,d as r}from"./index-7a53cbe8.js";import{C as i}from"./index-66e18629.js";import{P as t}from"./index-c9d36ff3.js";import"./index-9425cc27.js";import"./index-47933916.js";import"./BaseForm-3790688d.js";import"./index-c4d590dd.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-8c378d7d.js";import"./index-03f7b2e3.js";import"./index-1d8e9873.js";import"./useShowArrow-cd7d7ae9.js";import"./List-66e0f301.js";import"./useIcons-79eafc36.js";import"./index-756ce4b4.js";import"./conductUtil-bbd7933a.js";import"./index-152a42a9.js";import"./index-2d638403.js";import"./useBubbleLock-190f09d2.js";import"./_baseAssignValue-c987cf16.js";import"./_baseClone-992a210e.js";import"./ColorPicker-8c738c17.js";import"./ColorPicker-38b9b79e.js";import"./index-c7584e59.js";import"./index-e83f5ba4.js";import"./index-6b3961bd.js";import"./addEventListener-1df1db61.js";import"./index-167b927d.js";import"./index-b72ef115.js";import"./index-e15e67d5.js";import"./index-55bae212.js";import"./iconUtil-2d6c5da1.js";import"./index-3c1249e3.js";import"./index-5a333c20.js";import"./styleChecker-a18dab82.js";import"./index-6a8df40f.js";import"./useLazyKVMap-06fe0e2d.js";import"./index-71bbfc25.js";import"./index-5aa3add0.js";import"./index-7f587a95.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
