import{u as l,J as x,a as c,j as o,Q as h}from"./index-d56ff4b5.js";import n from"./selectComp-27afb73f.js";import j from"./tableBasic-44fecdbc.js";import b from"./tableSelectCustom-5a5a11fc.js";import S from"./tableFilterSort-fa8e0e33.js";import f from"./tableFilterSearch-98133c1e.js";import T from"./tableFilterPanel-2719d71d.js";import d from"./tableAjax-2b4499eb.js";import w from"./tableTreeData-86e5e233.js";import A from"./tableFixedHeader-1770d948.js";import $ from"./tableFixedColumns-808ea410.js";import u from"./tableFixedHeaderColumns-844b930b.js";import C from"./tableHiddenColumns-e349e442.js";import g from"./tableGrouping-3b72f7a1.js";import F from"./tableEditCell-f8c04122.js";import v from"./tableEditRow-76a3e2bd.js";import E from"./tableSub-4259794e.js";import N from"./tableEllipsis-edb18941.js";import R from"./tableVirtual-fbae4b8f.js";import B from"./tableResponsive-9615d450.js";import H from"./tableSticky-848d4455.js";import V from"./tableDynamic-9e61700f.js";import{C as e}from"./index-c868ee9f.js";import"./index-b42632fc.js";import"./List-3381c911.js";import"./useIcons-2291551d.js";import"./Table-3a031e72.js";import"./styleChecker-baab7645.js";import"./iconUtil-1dff7590.js";import"./conductUtil-fad3f1d9.js";import"./index-68f7c69f.js";import"./index-40c73cae.js";import"./index-fc813e32.js";import"./index-23e7f4f6.js";import"./index-69010fab.js";import"./___vite-browser-external_commonjs-proxy-953964aa.js";import"./index-26192b3b.js";import"./index-888a22f8.js";import"./transButton-5d5dea55.js";import"./index-87a97514.js";import"./Skeleton-9a1c5f01.js";const $o=()=>{const t=l(),s=x();let r=s.search?s.search.split("=")[1]:"TableBasic";const[i,m]=c.useState(r),a=p=>{m(p),t(`/list/basicTable?select=${p}`)};return o.jsxs(o.Fragment,{children:[o.jsx(e,{className:"mb10",children:o.jsxs(h,{direction:"vertical",size:"large",children:[o.jsxs("span",{className:"mb15",children:[o.jsx("b",{children:"基础表格"})," - 当有大量结构化的数据需要展现时 / 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。"]}),o.jsx(n,{handleChange:a,initValue:r})]})}),o.jsxs(e,{className:"mb10",children:[o.jsx(j,{isShow:i==="TableBasic"}),o.jsx(b,{isShow:i==="TableSelectCustom"}),o.jsx(S,{isShow:i==="TableFilterSort"}),o.jsx(f,{isShow:i==="TableFilterSearch"}),o.jsx(T,{isShow:i==="TableFilterPanel"})," ",o.jsx(d,{isShow:i==="TableAjax"})," ",o.jsx(w,{isShow:i==="TableTreeData"}),o.jsx(A,{isShow:i==="TableFixedHeader"}),o.jsx($,{isShow:i==="TableFixedColumns"}),o.jsx(u,{isShow:i==="TableFixedHeaderColumns"}),o.jsx(C,{isShow:i==="TableHiddenColumns"}),o.jsx(g,{isShow:i==="TableGrouping"}),o.jsx(F,{isShow:i==="TableEditCell"}),o.jsx(v,{isShow:i==="TableEditRow"}),o.jsx(E,{isShow:i==="TableSub"}),o.jsx(N,{isShow:i==="TableEllipsis"}),o.jsx(R,{isShow:i==="TableVirtual"}),o.jsx(B,{isShow:i==="TableResponsive"}),o.jsx(H,{isShow:i==="TableSticky"}),o.jsx(V,{isShow:i==="TableDynamic"})]})]})};export{$o as default};