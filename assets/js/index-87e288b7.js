import{j as e,B as l,ap as r}from"./index-42a344e0.js";import{C as i}from"./index-6070f333.js";import{P as t}from"./index-5fbe4a9f.js";import"./index-9e75f863.js";import"./index-0d0abe5a.js";import"./BaseForm-5ead4126.js";import"./index-c59d9f8d.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-8c29f6bb.js";import"./index-02d4cce4.js";import"./index-d9b2bccc.js";import"./useShowArrow-ef66aab8.js";import"./List-29e59b20.js";import"./useIcons-49d4749f.js";import"./index-d0b10dca.js";import"./conductUtil-2f5eb3d6.js";import"./index-b4632a21.js";import"./index-31035a1b.js";import"./useBubbleLock-9613f7fc.js";import"./_baseAssignValue-12e7ea6f.js";import"./_baseClone-d3d5448b.js";import"./ColorPicker-eb35e3e6.js";import"./ColorPicker-7705d9a7.js";import"./index-9ca80475.js";import"./index-38433125.js";import"./index-be9dcdd3.js";import"./addEventListener-c4ef320e.js";import"./index-79dd7c9f.js";import"./index-df4ed324.js";import"./index-587f3359.js";import"./index-73b2ad06.js";import"./iconUtil-018822b8.js";import"./index-3c800121.js";import"./index-88d7ca37.js";import"./styleChecker-44288a5e.js";import"./index-d0011d4f.js";import"./useLazyKVMap-d53b4f04.js";import"./index-b8889cad.js";import"./index-f0a197f6.js";import"./index-d27d58bc.js";const K=()=>e.jsxs(i,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(l,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-87e288b7.js.map
