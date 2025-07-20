import{j as e,B as l,ax as r}from"./index-4c9f8422.js";import{C as i}from"./index-8c8ef2d7.js";import{P as t}from"./index-a554294f.js";import"./index-2a3241fe.js";import"./index-da093889.js";import"./BaseForm-e35f517b.js";import"./index-83355eff.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-733779ea.js";import"./index-588ff08e.js";import"./index-5fded04f.js";import"./useShowArrow-623f937f.js";import"./List-2760c4e2.js";import"./useIcons-e5133c05.js";import"./index-1305904d.js";import"./conductUtil-60bd2953.js";import"./index-f4f7d4fe.js";import"./index-58d7e95e.js";import"./useBubbleLock-3887a4f2.js";import"./_baseAssignValue-c42b89aa.js";import"./_baseClone-2b689ef3.js";import"./ColorPicker-151c1ec2.js";import"./ColorPicker-a11b5034.js";import"./index-c48b1a46.js";import"./index-84434d8b.js";import"./index-e67e3320.js";import"./addEventListener-f0eeb23d.js";import"./index-812297b9.js";import"./index-13a66280.js";import"./index-7687c024.js";import"./index-01050d74.js";import"./iconUtil-ce3fda51.js";import"./index-8ba57b8f.js";import"./index-1b577fb7.js";import"./styleChecker-6df38ad5.js";import"./index-ab26f0c4.js";import"./useLazyKVMap-bc4b9ad8.js";import"./index-ba9fd2d0.js";import"./index-a70fca52.js";import"./index-7788c26a.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-2ffa23be.js.map
