import{j as e,i as l,Q as p,ao as m,am as c}from"./index-f08e2d74.js";import{T as r}from"./Table-ef7ea7a8.js";import"./styleChecker-8995fb3a.js";import"./List-60e444da.js";import"./iconUtil-230906da.js";import"./conductUtil-07169fda.js";import"./index-6bfaa22a.js";import"./index-cd3af754.js";import"./index-0ed7dff7.js";import"./index-092769b6.js";import"./index-9f58716a.js";import"./useIcons-784b82aa.js";import"./index-870dd8ea.js";const u=[{key:"1",label:"Action 1"},{key:"2",label:"Action 2"}],R=({isShow:s})=>{const d=()=>{const t=[{title:"Date",dataIndex:"date",key:"date"},{title:"Name",dataIndex:"name",key:"name"},{title:"Status",key:"state",render:()=>e.jsx(l,{status:"success",text:"Finished"})},{title:"Upgrade Status",dataIndex:"upgradeNum",key:"upgradeNum"},{title:"Action",dataIndex:"operation",key:"operation",render:()=>e.jsxs(p,{size:"middle",children:[e.jsx("a",{children:"Pause"}),e.jsx("a",{children:"Stop"}),e.jsx(m,{menu:{items:u},children:e.jsxs("a",{children:["More ",e.jsx(c,{})]})})]})}],i=[];for(let o=0;o<3;++o)i.push({key:o.toString(),date:"2014-12-24 23:12:00",name:"This is production name",upgradeNum:"Upgraded: 56"});return e.jsx(r,{columns:t,dataSource:i,pagination:!1})},n=[{title:"Name",dataIndex:"name",key:"name"},{title:"Platform",dataIndex:"platform",key:"platform"},{title:"Version",dataIndex:"version",key:"version"},{title:"Upgraded",dataIndex:"upgradeNum",key:"upgradeNum"},{title:"Creator",dataIndex:"creator",key:"creator"},{title:"Date",dataIndex:"createdAt",key:"createdAt"},{title:"Action",key:"operation",render:()=>e.jsx("a",{children:"Publish"})}],a=[];for(let t=0;t<3;++t)a.push({key:t.toString(),name:"Screen",platform:"iOS",version:"10.3.4.5654",upgradeNum:500,creator:"Jack",createdAt:"2014-12-24 23:12:00"});return s&&e.jsxs(e.Fragment,{children:[e.jsx(r,{columns:n,expandable:{expandedRowRender:d,defaultExpandedRowKeys:["0"]},dataSource:a}),e.jsx(r,{columns:n,expandable:{expandedRowRender:d,defaultExpandedRowKeys:["0"]},dataSource:a,size:"middle"}),e.jsx(r,{columns:n,expandable:{expandedRowRender:d,defaultExpandedRowKeys:["0"]},dataSource:a,size:"small"})]})};export{R as default};