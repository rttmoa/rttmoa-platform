import{j as e,B as i,aE as r}from"./index-71b6a372.js";import{C as l}from"./index-258c6fcb.js";import{P as t}from"./index-f39a12b1.js";import"./index-3b43892b.js";import"./index-e11f4515.js";import"./BaseForm-4e6cf0e6.js";import"./index-e0fec7c9.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-c0b2d282.js";import"./index-c295a5df.js";import"./index-34e6ab0e.js";import"./Select-fb7362ba.js";import"./List-75516f59.js";import"./useShowArrow-667e4c44.js";import"./useIcons-bf3a3e6a.js";import"./index-8c181f8d.js";import"./Cascader-8b19fa20.js";import"./conductUtil-21ecc908.js";import"./index-da5c860a.js";import"./index-e661c40f.js";import"./index-5750ac36.js";import"./useBubbleLock-e2b47f6f.js";import"./_baseAssignValue-ec0fd462.js";import"./_baseClone-1304e7a1.js";import"./ColorPicker-5f713a74.js";import"./ColorPicker-009baa4d.js";import"./index-33333a7c.js";import"./index-05ecd48d.js";import"./SinglePicker-34643dc0.js";import"./index-c6c7c9a1.js";import"./index-24dcac8d.js";import"./Image-761a271d.js";import"./addEventListener-7a60baf3.js";import"./index-41f8be63.js";import"./index-0cb1bfab.js";import"./Rate-3d9c965a.js";import"./index-a622e2e6.js";import"./index-d0178301.js";import"./TreeSelect-c05da38e.js";import"./Tree-97dbcd96.js";import"./iconUtil-9bcaa615.js";import"./index-c123fda0.js";import"./index-f5158354.js";import"./styleChecker-aa1b55d9.js";import"./index-5f144ebf.js";import"./useLazyKVMap-79dc305d.js";import"./index-74cf0e93.js";import"./index-b97dffb6.js";import"./index-cd4f636a.js";const te=()=>e.jsxs(l,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(i,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-92d45b4d.js.map
