import{j as a,an as t}from"./index-d56ff4b5.js";import{T as o}from"./Table-3a031e72.js";import"./styleChecker-baab7645.js";import"./List-3381c911.js";import"./iconUtil-1dff7590.js";import"./conductUtil-fad3f1d9.js";import"./index-68f7c69f.js";import"./index-40c73cae.js";import"./index-fc813e32.js";import"./index-23e7f4f6.js";import"./index-b42632fc.js";import"./useIcons-2291551d.js";import"./index-69010fab.js";const r=[{title:"Name",dataIndex:"name",key:"name",render:e=>a.jsx("a",{children:e}),width:150},{title:"Age",dataIndex:"age",key:"age",width:80},{title:"Address",dataIndex:"address",key:"address 1",ellipsis:{showTitle:!1},render:e=>a.jsx(t,{placement:"topLeft",title:e,children:e})},{title:"Long Column Long Column Long Column",dataIndex:"address",key:"address 2",ellipsis:{showTitle:!1},render:e=>a.jsx(t,{placement:"topLeft",title:e,children:e})},{title:"Long Column Long Column",dataIndex:"address",key:"address 3",ellipsis:{showTitle:!1},render:e=>a.jsx(t,{placement:"topLeft",title:e,children:e})},{title:"Long Column",dataIndex:"address",key:"address 4",ellipsis:!0}],s=[{key:"1",name:"John Brown",age:32,address:"New York No. 1 Lake Park, New York No. 1 Lake Park",tags:["nice","developer"]},{key:"2",name:"Jim Green",age:42,address:"London No. 2 Lake Park, London No. 2 Lake Park",tags:["loser"]},{key:"3",name:"Joe Black",age:32,address:"Sydney No. 1 Lake Park, Sydney No. 1 Lake Park",tags:["cool","teacher"]}],u=({isShow:e})=>e&&a.jsx(o,{columns:r,dataSource:s});export{u as default};