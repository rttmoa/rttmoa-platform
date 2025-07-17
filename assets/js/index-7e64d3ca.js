import{j as e,B as l,ax as r}from"./index-9e804871.js";import{C as i}from"./index-11c60a86.js";import{P as t}from"./index-0412bebd.js";import"./index-05052371.js";import"./index-3e6a3dde.js";import"./BaseForm-2adc9590.js";import"./index-daef4a53.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-0641e55c.js";import"./index-eccedb6a.js";import"./index-c6501a50.js";import"./useShowArrow-861ac930.js";import"./List-493d41c3.js";import"./useIcons-c762d210.js";import"./index-4234d3df.js";import"./conductUtil-5bc1194b.js";import"./index-ca4ba1e4.js";import"./index-c6d45625.js";import"./useBubbleLock-524a928d.js";import"./_baseAssignValue-36ab4978.js";import"./_baseClone-8869252f.js";import"./ColorPicker-7d309b76.js";import"./ColorPicker-5d70de65.js";import"./index-7ec890df.js";import"./index-ad68964e.js";import"./index-c0dd9530.js";import"./addEventListener-ca9aa9c3.js";import"./index-ba5186e5.js";import"./index-d5599ee7.js";import"./index-35c69663.js";import"./index-bf1ab038.js";import"./iconUtil-364991e4.js";import"./index-c6cbbd93.js";import"./index-8b234d85.js";import"./styleChecker-b5fce67a.js";import"./index-497b1bb2.js";import"./useLazyKVMap-77e5170e.js";import"./index-29dad383.js";import"./index-3c211920.js";import"./index-57aeb405.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-7e64d3ca.js.map
