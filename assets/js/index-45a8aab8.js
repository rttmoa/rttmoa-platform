import{j as e,B as l,ax as r}from"./index-c0009a61.js";import{C as i}from"./index-72244b08.js";import{P as t}from"./index-b7496476.js";import"./index-8a845b79.js";import"./index-cc4b1089.js";import"./BaseForm-a1d7e5a9.js";import"./index-0579dcbd.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-833fe4f6.js";import"./index-f2e0cc50.js";import"./index-16aaa411.js";import"./useShowArrow-ee91b423.js";import"./List-e6b5026b.js";import"./useIcons-81bfba4e.js";import"./index-c2325f71.js";import"./conductUtil-50418b8a.js";import"./index-9756ab18.js";import"./index-72ad413c.js";import"./useBubbleLock-2943f6c4.js";import"./_baseAssignValue-1bc81fdd.js";import"./_baseClone-ef8b6cbf.js";import"./ColorPicker-da3aa465.js";import"./ColorPicker-bef8a0a7.js";import"./index-8d23b84c.js";import"./index-9f488fab.js";import"./index-fdb97980.js";import"./addEventListener-7ea077bc.js";import"./index-e564bf9e.js";import"./index-3653098a.js";import"./index-400114dc.js";import"./index-b50f7457.js";import"./iconUtil-d42fb1df.js";import"./index-4c92a9db.js";import"./index-a0b80072.js";import"./styleChecker-308c6059.js";import"./index-4062bcbb.js";import"./useLazyKVMap-0a7c4e55.js";import"./index-64b81d7b.js";import"./index-23f7402f.js";import"./index-d228a694.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-45a8aab8.js.map
