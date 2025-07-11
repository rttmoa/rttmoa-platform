import{j as e,B as i,aE as r}from"./index-83fc08b5.js";import{C as l}from"./index-34b49154.js";import{P as t}from"./index-bafd59a5.js";import"./index-6064099c.js";import"./index-6605bd49.js";import"./BaseForm-98436974.js";import"./index-65d8de54.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-305d5ff2.js";import"./index-461b3fd8.js";import"./index-7d4ae6ef.js";import"./Select-f081463e.js";import"./List-4fbd63eb.js";import"./useShowArrow-9f714a76.js";import"./useIcons-efffd204.js";import"./index-f53361f2.js";import"./Cascader-8a60a47a.js";import"./conductUtil-56fe35d0.js";import"./index-29642d9d.js";import"./index-17a3c129.js";import"./index-98ca97a3.js";import"./useBubbleLock-f91bb637.js";import"./_baseAssignValue-67f64ae2.js";import"./_baseClone-5a02c4ca.js";import"./ColorPicker-d2ceadf4.js";import"./ColorPicker-66ab4ccd.js";import"./index-2b9e2c42.js";import"./index-d9384693.js";import"./SinglePicker-5be57154.js";import"./index-e841718e.js";import"./index-72574ad7.js";import"./Image-4f02274c.js";import"./addEventListener-bcf58eda.js";import"./index-8964c188.js";import"./index-03cd103d.js";import"./Rate-ecc96b6c.js";import"./index-67bf1027.js";import"./index-3e38651e.js";import"./TreeSelect-872bd2b8.js";import"./Tree-9c29a1c4.js";import"./iconUtil-b5b117df.js";import"./index-932daea5.js";import"./index-ef5069a5.js";import"./styleChecker-b7cbd59f.js";import"./index-dc0a5598.js";import"./useLazyKVMap-2ad078b2.js";import"./index-e0aa66b7.js";import"./index-1dc259dd.js";import"./index-927dea97.js";const te=()=>e.jsxs(l,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(i,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
`})]})]});export{te as default};
//# sourceMappingURL=index-30a9f92a.js.map
