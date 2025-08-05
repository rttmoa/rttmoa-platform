import{j as e,B as l,g as r}from"./index-8aeee37e.js";import{C as i}from"./index-aeec5ea8.js";import{P as t}from"./index-bd030821.js";import"./index-712c36e0.js";import"./index-df3fa93c.js";import"./BaseForm-db4ae358.js";import"./index-192b46fa.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-7cfc4428.js";import"./index-90c73790.js";import"./index-f6b571a3.js";import"./useShowArrow-ec8e3096.js";import"./List-6d1bd3b7.js";import"./useIcons-111bb378.js";import"./index-2d64a005.js";import"./conductUtil-526c3220.js";import"./index-1e00ec31.js";import"./index-0e9d3cfc.js";import"./useBubbleLock-61cf89e7.js";import"./_baseAssignValue-9801b912.js";import"./_baseClone-7e6e7cb0.js";import"./ColorPicker-662a2c85.js";import"./ColorPicker-989cf34b.js";import"./index-2f332cdf.js";import"./index-c583f29b.js";import"./index-c90afe5e.js";import"./addEventListener-a5887a32.js";import"./index-d07df0da.js";import"./index-6f1dca8d.js";import"./index-cda90e91.js";import"./index-9762ad9a.js";import"./iconUtil-b3676829.js";import"./index-1ae8736a.js";import"./index-e8593c62.js";import"./styleChecker-c3ace4a7.js";import"./index-c0729554.js";import"./useLazyKVMap-d26a6053.js";import"./index-d4a80817.js";import"./index-d59461e8.js";import"./index-afca9a4c.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-6d108395.js.map
