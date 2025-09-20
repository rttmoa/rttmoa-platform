import{j as e,B as l,d as r}from"./index-1c8b50a0.js";import{C as i}from"./index-0fc4a591.js";import{P as t}from"./index-dd3846b3.js";import"./index-15cea076.js";import"./index-bffd051e.js";import"./BaseForm-18fb1d31.js";import"./index-cdcf888a.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-8ce26e06.js";import"./index-6ef4ee67.js";import"./index-8a366b40.js";import"./useShowArrow-0d200734.js";import"./List-a1db4543.js";import"./useIcons-c0085881.js";import"./index-ee137271.js";import"./conductUtil-5bd400dc.js";import"./index-37908a2e.js";import"./index-c702512d.js";import"./useBubbleLock-14d665a2.js";import"./_baseAssignValue-d462c530.js";import"./_baseClone-f203145d.js";import"./ColorPicker-bc5641ae.js";import"./ColorPicker-05548a6d.js";import"./index-a4b2b51a.js";import"./index-1c555b53.js";import"./index-3864a3a2.js";import"./addEventListener-3ad69240.js";import"./index-13f004aa.js";import"./index-76d79c9b.js";import"./index-a1122003.js";import"./index-8c3c1299.js";import"./iconUtil-ad46e8ac.js";import"./index-62926a9d.js";import"./index-a7e1e108.js";import"./styleChecker-69671825.js";import"./index-5d92b6a7.js";import"./useLazyKVMap-930b02d2.js";import"./index-c0484f08.js";import"./index-b84ceda7.js";import"./index-21767968.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
