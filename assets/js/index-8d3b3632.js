import{j as e,B as l,ax as r}from"./index-2447c53a.js";import{C as i}from"./index-c614db8a.js";import{P as t}from"./index-63d423d8.js";import"./index-a4d73df2.js";import"./index-ddb89fe2.js";import"./BaseForm-4aa6687a.js";import"./index-536a60e5.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-ceda289a.js";import"./index-ca680515.js";import"./index-984b3cc2.js";import"./useShowArrow-e612cc4d.js";import"./List-75a44bda.js";import"./useIcons-f47fbd73.js";import"./index-c5808dbd.js";import"./conductUtil-cdeffc4d.js";import"./index-f1d3c856.js";import"./index-562a12d9.js";import"./useBubbleLock-791e37ae.js";import"./_baseAssignValue-b20cd577.js";import"./_baseClone-7d832721.js";import"./ColorPicker-386021e8.js";import"./ColorPicker-b56a640d.js";import"./index-666e3827.js";import"./index-9d18169f.js";import"./index-74b3299c.js";import"./addEventListener-d229a787.js";import"./index-06954cf2.js";import"./index-2c7646be.js";import"./index-3487abab.js";import"./index-003b87c9.js";import"./iconUtil-5e3b796f.js";import"./index-669fb709.js";import"./index-be22a8b4.js";import"./styleChecker-af9e7670.js";import"./index-a6058008.js";import"./useLazyKVMap-41eb4e06.js";import"./index-678b7a45.js";import"./index-8105b7ed.js";import"./index-5aef9450.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-8d3b3632.js.map
