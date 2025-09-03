import{j as e,B as l,n as r}from"./index-67279ea2.js";import{C as i}from"./index-88fbfc5b.js";import{P as t}from"./index-838f84c4.js";import"./index-6cbdfb55.js";import"./index-e6d2780b.js";import"./BaseForm-088b9821.js";import"./index-76359291.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-0e7a0e3e.js";import"./index-86f7e6e1.js";import"./index-7919db03.js";import"./useShowArrow-d3ad60bb.js";import"./List-810df758.js";import"./useIcons-e4e512f5.js";import"./index-3fa6758a.js";import"./conductUtil-af6b0286.js";import"./index-9198211f.js";import"./index-c524f3e1.js";import"./useBubbleLock-5f5f4ed6.js";import"./_baseAssignValue-0bb1cfb0.js";import"./_baseClone-cdfad63a.js";import"./ColorPicker-08bf9919.js";import"./ColorPicker-5fb8d388.js";import"./index-5fedaa13.js";import"./index-00544d13.js";import"./index-11206bba.js";import"./addEventListener-c22abe23.js";import"./index-15490f6c.js";import"./index-8eac4546.js";import"./index-46ac54a7.js";import"./index-0dc275e4.js";import"./iconUtil-b3a08343.js";import"./index-d9fd69fa.js";import"./index-d99f3ffa.js";import"./styleChecker-5abb93da.js";import"./index-19f788e4.js";import"./useLazyKVMap-84288106.js";import"./index-7d606976.js";import"./index-a149bfc8.js";import"./index-5b2f8c58.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
