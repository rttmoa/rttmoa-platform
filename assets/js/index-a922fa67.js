import{j as e,B as l,d as r}from"./index-7fd6a3d1.js";import{C as i}from"./index-63be1c34.js";import{P as t}from"./index-e04e4e62.js";import"./index-f87d41eb.js";import"./index-9c0da7d1.js";import"./BaseForm-00b395df.js";import"./index-21b71def.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-7903080f.js";import"./index-640f4665.js";import"./index-b19c4357.js";import"./useShowArrow-4dc41f64.js";import"./List-c27643d5.js";import"./useIcons-e83b34a2.js";import"./index-96e14b29.js";import"./conductUtil-bd43e183.js";import"./index-98014a65.js";import"./index-fba3f24f.js";import"./useBubbleLock-cf535ece.js";import"./_baseAssignValue-abbf7e49.js";import"./_baseClone-f158ed9d.js";import"./ColorPicker-2021c894.js";import"./ColorPicker-6b5f5b85.js";import"./index-1716a24d.js";import"./index-d9ac0148.js";import"./index-d22d1563.js";import"./addEventListener-29463f56.js";import"./index-2c18cfb6.js";import"./index-e61f1997.js";import"./index-8a6ebd49.js";import"./index-d457e77c.js";import"./iconUtil-4c28be36.js";import"./index-383f6360.js";import"./index-f72f81b5.js";import"./styleChecker-d203153a.js";import"./index-083ae142.js";import"./useLazyKVMap-a434f724.js";import"./index-3cebc9a6.js";import"./index-ac759120.js";import"./index-c2bf967f.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
