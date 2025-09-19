import{j as e,B as l,d as r}from"./index-02d0235e.js";import{C as i}from"./index-29375ece.js";import{P as t}from"./index-a9ba1918.js";import"./index-2e9e7ae1.js";import"./index-46cdef7f.js";import"./BaseForm-e7e90b25.js";import"./index-6a4a0342.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-93fb2d43.js";import"./index-90010a44.js";import"./index-40379525.js";import"./useShowArrow-fe2a54a5.js";import"./List-f7e4b719.js";import"./useIcons-f8ac725e.js";import"./index-5161ce58.js";import"./conductUtil-4a556eff.js";import"./index-3e65a877.js";import"./index-a4e67f9d.js";import"./useBubbleLock-43091c43.js";import"./_baseAssignValue-89f01554.js";import"./_baseClone-5e79d2d1.js";import"./ColorPicker-3d5648bc.js";import"./ColorPicker-47cf52a8.js";import"./index-0257b8f3.js";import"./index-c649313c.js";import"./index-e604a86c.js";import"./addEventListener-95f17822.js";import"./index-584fe762.js";import"./index-70b1ed1e.js";import"./index-fcf5ae5a.js";import"./index-865cbb04.js";import"./iconUtil-4bb8893f.js";import"./index-9ff05cd6.js";import"./index-fb12122b.js";import"./styleChecker-3c8c3397.js";import"./index-41284152.js";import"./useLazyKVMap-570ff18f.js";import"./index-a7f92c23.js";import"./index-74881123.js";import"./index-c561f140.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
