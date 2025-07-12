import{j as e,B as i,aE as r}from"./index-113fc74b.js";import{C as l}from"./index-7df010ed.js";import{P as t}from"./index-5c8e1e41.js";import"./index-2558b860.js";import"./index-eb3d29dd.js";import"./BaseForm-d64f7000.js";import"./index-a6a1d57f.js";import"./zh_CN-f51ae7db.js";import"./createForOfIteratorHelper-a30c96cf.js";import"./index-2087a3c7.js";import"./index-b494d425.js";import"./Select-8f23d9ed.js";import"./List-8daded26.js";import"./useShowArrow-13591fe1.js";import"./useIcons-e7e876d7.js";import"./index-01a18b08.js";import"./Cascader-50c61ac2.js";import"./conductUtil-ec1c0eb4.js";import"./index-b96fcc2a.js";import"./index-0e665a55.js";import"./index-c0237b1c.js";import"./useBubbleLock-1d80bc36.js";import"./_baseAssignValue-c39ba408.js";import"./_baseClone-eeabc819.js";import"./ColorPicker-32af822a.js";import"./ColorPicker-04d3d823.js";import"./index-fd33966e.js";import"./index-298ba973.js";import"./SinglePicker-bd710a65.js";import"./index-9887eeaf.js";import"./index-2995b242.js";import"./Image-4cda65d6.js";import"./addEventListener-96eadba0.js";import"./index-f62b1770.js";import"./index-6dbf28fd.js";import"./Rate-acf885d8.js";import"./index-0777fea2.js";import"./index-18d93752.js";import"./TreeSelect-63216881.js";import"./Tree-3563fbcf.js";import"./iconUtil-1cf5f036.js";import"./index-ab20dc43.js";import"./index-04d8e1ec.js";import"./styleChecker-ab7f2164.js";import"./index-4fa7a304.js";import"./useLazyKVMap-e86d9680.js";import"./index-bda54c8e.js";import"./index-e3c30206.js";import"./index-ed073ed4.js";const te=()=>e.jsxs(l,{children:[e.jsxs("div",{className:"font-mono from-neutral-900 text-base font-semibold mb-4 ",children:["ProComponents库中 ProDescriptions.组件配置API"," —— ",e.jsx("a",{className:"text-sky-500",href:"https://pro-components.antdigital.dev/components/descriptions#%E5%9F%BA%E7%A1%80%E5%AE%9A%E4%B9%89%E5%88%97%E8%A1%A8",target:"_blank",rel:"noopener noreferrer",children:"🚀 链接：其他配置：数据类型、列配置、远程请求配置、可编辑定义列表 🚀"})]}),e.jsxs(t,{column:2,title:"高级定义列表",tooltip:"包含了从服务器请求，columns等功能",children:[e.jsx(t.Item,{valueType:"option",children:e.jsx(i,{type:"primary",children:"提交"},"primary")}),e.jsx(t.Item,{span:2,valueType:"text",contentStyle:{maxWidth:"80%"},renderText:o=>o+o,ellipsis:!0,label:"文本",children:"这是一段很长很长超级超级长的无意义说明文本并且重复了很多没有意义的词语，就是为了让它变得很长很长超级超级长"}),e.jsx(t.Item,{label:"金额",tooltip:"仅供参考，以实际为准",valueType:"money",children:"100"}),e.jsx(t.Item,{label:"百分比",valueType:"percent",children:"100"}),e.jsx(t.Item,{label:"选择框",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"},processing:{text:"解决中",status:"Processing"}},children:"open"}),e.jsx(t.Item,{label:"远程选择框",request:async()=>[{label:"全部",value:"all"},{label:"未解决",value:"open"},{label:"已解决",value:"closed"},{label:"解决中",value:"processing"}],children:"closed"}),e.jsx(t.Item,{label:"进度条",valueType:"progress",children:"40"}),e.jsx(t.Item,{label:"日期时间",valueType:"dateTime",children:r().valueOf()}),e.jsx(t.Item,{label:"日期",valueType:"date",children:r().valueOf()}),e.jsx(t.Item,{label:"日期区间",valueType:"dateTimeRange",children:[r().add(-1,"d").valueOf(),r().valueOf()]}),e.jsx(t.Item,{label:"时间",valueType:"time",children:r().valueOf()}),e.jsx(t.Item,{label:"代码块",valueType:"code",children:`
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
//# sourceMappingURL=index-7fd44b53.js.map
