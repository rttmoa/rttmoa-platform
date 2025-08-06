import{j as e,B as l,g as r}from"./index-d95c6b3e.js";import{C as i}from"./index-fbae8af5.js";import{P as t}from"./index-107a0e84.js";import"./index-98a13be3.js";import"./index-8ddc8e35.js";import"./BaseForm-567421e3.js";import"./index-e1a42914.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-23c27c8d.js";import"./index-a582c650.js";import"./index-2d8229ba.js";import"./useShowArrow-d07a1b07.js";import"./List-3998f1eb.js";import"./useIcons-e3be28d1.js";import"./index-04e86aa0.js";import"./conductUtil-845232a6.js";import"./index-2361d386.js";import"./index-b7414a8b.js";import"./useBubbleLock-cfb7fed0.js";import"./_baseAssignValue-0cdb99ab.js";import"./_baseClone-d72c4322.js";import"./ColorPicker-d3885c12.js";import"./ColorPicker-78ca00b7.js";import"./index-3ce9943c.js";import"./index-4ce3fd66.js";import"./index-1b0cbb00.js";import"./addEventListener-fc68868f.js";import"./index-323c3c93.js";import"./index-337d2478.js";import"./index-58d36330.js";import"./index-00c61e5d.js";import"./iconUtil-8ac22b22.js";import"./index-1b79ec16.js";import"./index-9bd68c5c.js";import"./styleChecker-0f279daf.js";import"./index-bcf93bd1.js";import"./useLazyKVMap-446ca730.js";import"./index-2047159a.js";import"./index-a3169397.js";import"./index-c6070bf6.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-23596fba.js.map
