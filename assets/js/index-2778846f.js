import{j as e,B as l,ap as r}from"./index-0666d363.js";import{C as i}from"./index-01f41a9d.js";import{P as t}from"./index-c84fc9e0.js";import"./index-0eaf3e6d.js";import"./index-2a8730a8.js";import"./BaseForm-5f33318a.js";import"./index-6b8a9d5a.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-45ebdb43.js";import"./index-74d88ede.js";import"./index-0f89b0fd.js";import"./useShowArrow-af41acbe.js";import"./List-d3653d7c.js";import"./useIcons-1c3205de.js";import"./index-86af71c4.js";import"./conductUtil-9eddce90.js";import"./index-35207a25.js";import"./index-1e0f1c90.js";import"./useBubbleLock-87dde273.js";import"./_baseAssignValue-a4b2c00c.js";import"./_baseClone-29dd4aff.js";import"./ColorPicker-42cdd9d8.js";import"./ColorPicker-8bb3be2a.js";import"./index-ab788cab.js";import"./index-09d7e30b.js";import"./index-cd255991.js";import"./addEventListener-9bcea0ef.js";import"./index-f9033e48.js";import"./index-762769cd.js";import"./index-593cc0c0.js";import"./index-f8015c33.js";import"./iconUtil-abd815ce.js";import"./index-ec436b71.js";import"./index-a11483d6.js";import"./styleChecker-aee93b2e.js";import"./index-3851caa3.js";import"./useLazyKVMap-091942e6.js";import"./index-5b6012dc.js";import"./index-61623141.js";import"./index-fe563e57.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-2778846f.js.map
