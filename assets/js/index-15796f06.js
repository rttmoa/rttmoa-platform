import{j as e,B as l,n as r}from"./index-742cb489.js";import{C as i}from"./index-cb3cdc65.js";import{P as t}from"./index-f843c7ab.js";import"./index-c925f177.js";import"./index-ccef9fbe.js";import"./BaseForm-c16a381a.js";import"./index-76c37d54.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-884a7190.js";import"./index-c1dba360.js";import"./index-16922793.js";import"./useShowArrow-82886ca0.js";import"./List-a9e5f931.js";import"./useIcons-278600cf.js";import"./index-9f45d292.js";import"./conductUtil-5b81712e.js";import"./index-0bd22f91.js";import"./index-d85763a4.js";import"./useBubbleLock-e0dc4843.js";import"./_baseAssignValue-a4998c81.js";import"./_baseClone-3d8e7117.js";import"./ColorPicker-cde46252.js";import"./ColorPicker-6d376d71.js";import"./index-1dfed54e.js";import"./index-56fd398e.js";import"./index-87a1168c.js";import"./addEventListener-6d321d5b.js";import"./index-d42cc7db.js";import"./index-9daff3a4.js";import"./index-0e4dd14c.js";import"./index-e44296cf.js";import"./iconUtil-2ada88a4.js";import"./index-e95db367.js";import"./index-1a887a39.js";import"./styleChecker-f1f8916a.js";import"./index-4e71a084.js";import"./useLazyKVMap-69b0f5e1.js";import"./index-e1dabdb5.js";import"./index-462574a9.js";import"./index-f782aa5a.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
