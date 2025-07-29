import{j as e,B as l,ax as r}from"./index-5ce0a115.js";import{C as i}from"./index-a3371f2c.js";import{P as t}from"./index-81736809.js";import"./index-36dd6a9c.js";import"./index-257262f8.js";import"./BaseForm-2bc1d756.js";import"./index-949640c3.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-5651974d.js";import"./index-69665fa7.js";import"./index-712aefba.js";import"./useShowArrow-76ea46de.js";import"./List-f9e2c0a6.js";import"./useIcons-7fe98150.js";import"./index-79791ba1.js";import"./conductUtil-9ab6c9b0.js";import"./index-cbfb8497.js";import"./index-10bb9ca1.js";import"./useBubbleLock-bb43c911.js";import"./_baseAssignValue-0d711313.js";import"./_baseClone-15c7d154.js";import"./ColorPicker-862fdcb6.js";import"./ColorPicker-dfcffc9a.js";import"./index-3899ad9e.js";import"./index-584ec4d4.js";import"./index-4ed2db12.js";import"./addEventListener-bbdeefea.js";import"./index-fd18ae24.js";import"./index-21188a09.js";import"./index-495f748f.js";import"./index-db20bc61.js";import"./iconUtil-45d8d796.js";import"./index-c38be4a9.js";import"./index-e7c97e5d.js";import"./styleChecker-4ea445bc.js";import"./index-f42bcc7a.js";import"./useLazyKVMap-770801c6.js";import"./index-4a521aae.js";import"./index-550b53d3.js";import"./index-3cf19b79.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-f4249841.js.map
