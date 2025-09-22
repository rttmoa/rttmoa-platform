import{j as e,B as l,d as r}from"./index-44ea0b16.js";import{C as i}from"./index-ffa13fae.js";import{P as t}from"./index-0729219c.js";import"./index-da40ab9b.js";import"./index-5bd441d6.js";import"./BaseForm-7718428f.js";import"./index-5cb50638.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-206eed5b.js";import"./index-e951058a.js";import"./index-2ea4052c.js";import"./useShowArrow-f2fab46a.js";import"./List-f18ece08.js";import"./useIcons-52b2fd5f.js";import"./index-6f3ff693.js";import"./conductUtil-27c8651a.js";import"./index-929ace0d.js";import"./index-6a3c82de.js";import"./useBubbleLock-94919c91.js";import"./_baseAssignValue-6053028c.js";import"./_baseClone-43884c85.js";import"./ColorPicker-efa4ccb3.js";import"./ColorPicker-b105946f.js";import"./index-15077b38.js";import"./index-989d4de8.js";import"./index-fd7dce92.js";import"./addEventListener-ed8189cc.js";import"./index-022eb8a7.js";import"./index-1de8b072.js";import"./index-29bd491d.js";import"./index-ff01c94e.js";import"./iconUtil-2e43659b.js";import"./index-f452f053.js";import"./index-d31df215.js";import"./styleChecker-b8ea8b68.js";import"./index-f384dbe4.js";import"./useLazyKVMap-b23f4f2f.js";import"./index-131ece55.js";import"./index-9fc17f5b.js";import"./index-de6f42d4.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
