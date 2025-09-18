import{j as e,B as l,d as r}from"./index-399f0d3f.js";import{C as i}from"./index-7001f26f.js";import{P as t}from"./index-18a56ef9.js";import"./index-c00b061e.js";import"./index-240d3403.js";import"./BaseForm-ebd0f33d.js";import"./index-61ea3627.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-874c41a2.js";import"./index-98386244.js";import"./index-9a3db544.js";import"./useShowArrow-bdb49da3.js";import"./List-509da2f6.js";import"./useIcons-9ce9087b.js";import"./index-ae1d9f9c.js";import"./conductUtil-dd9a9122.js";import"./index-aa241a88.js";import"./index-a4c6dc24.js";import"./useBubbleLock-c58ec217.js";import"./_baseAssignValue-54db2b22.js";import"./_baseClone-b252579e.js";import"./ColorPicker-c2353b31.js";import"./ColorPicker-3c1bd734.js";import"./index-0baf1e4e.js";import"./index-d0e4b720.js";import"./index-74a5dea4.js";import"./addEventListener-e6ee341f.js";import"./index-6a8ef76a.js";import"./index-0bcb0339.js";import"./index-c26f545e.js";import"./index-3e50d9ab.js";import"./iconUtil-2ec7ea66.js";import"./index-9affc2e6.js";import"./index-9bb74855.js";import"./styleChecker-9174fd27.js";import"./index-a7aefb44.js";import"./useLazyKVMap-886ec565.js";import"./index-d08814ce.js";import"./index-07500587.js";import"./index-f637b540.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
