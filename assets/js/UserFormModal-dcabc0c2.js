import{r as c,j as e,a9 as a,V as d}from"./index-44a46bca.js";import{C as x}from"./index-5a99146c.js";import{R as t}from"./index-edbe34bb.js";import{S as r}from"./index-7bbb77b5.js";import{D as j}from"./index-662c5e25.js";import"./Skeleton-1ea6ca93.js";import"./index-b022d3a4.js";import"./List-fb475f7a.js";import"./useIcons-aa88198d.js";import"./customParseFormat-856275ca.js";const _=({userInfo:i,type:l,form:n,roles:m})=>{const o={labelCol:{span:4},wrapperCol:{span:16}};return c.useEffect(()=>()=>{n.resetFields()}),e.jsx(e.Fragment,{children:e.jsx(x,{children:e.jsxs(a,{form:n,layout:"horizontal",...o,initialValues:{id:l==="create"?null:i.id,user_name:l==="create"?null:i.username,sex:l==="create"?null:i.sex,state:l==="create"?null:i.state,address:l==="create"?null:i.address,roleiD:l==="create"?null:i.role_id},children:[e.jsx(a.Item,{name:"id",label:"id",hidden:l==="create",children:e.jsx(d,{type:"text",disabled:!0})}),e.jsx(a.Item,{name:"user_name",label:"姓名",children:e.jsx(d,{type:"text",placeholder:"请输入姓名",disabled:l==="detail"})}),e.jsx(a.Item,{name:"sex",label:"性别",children:e.jsxs(t.Group,{disabled:l==="detail",children:[e.jsx(t,{value:1,children:"男"}),e.jsx(t,{value:2,children:"女"})]})}),e.jsx(a.Item,{name:"state",label:"状态",children:e.jsxs(r,{disabled:l==="detail",children:[e.jsx(r.Option,{value:1,children:"痛苦"}),e.jsx(r.Option,{value:2,children:"委屈"}),e.jsx(r.Option,{value:3,children:"迷茫"}),e.jsx(r.Option,{value:4,children:"平淡"}),e.jsx(r.Option,{value:5,children:"开心"})]})}),e.jsx(a.Item,{name:"roleiD",label:"角色",children:e.jsx(r,{disabled:l==="detail",children:m.map(s=>e.jsx(r.Option,{value:s.id,children:s.role_name},s.id))})}),e.jsx(a.Item,{name:"birthday",label:"生日",children:e.jsx(j,{disabled:l==="detail"})}),e.jsx(a.Item,{name:"address",label:"联系地址",children:e.jsx(d.TextArea,{rows:3,disabled:l==="detail"})})]})})})};export{_ as default};