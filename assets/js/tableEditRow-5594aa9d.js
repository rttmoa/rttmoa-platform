import{a9 as g,r as h,j as t,aa as I,V as k}from"./index-f08e2d74.js";import{T as w}from"./Table-ef7ea7a8.js";import{T as b}from"./index-ff84b30d.js";import{P as C}from"./index-5920dbb2.js";import"./styleChecker-8995fb3a.js";import"./List-60e444da.js";import"./iconUtil-230906da.js";import"./conductUtil-07169fda.js";import"./index-6bfaa22a.js";import"./index-cd3af754.js";import"./index-0ed7dff7.js";import"./index-092769b6.js";import"./index-9f58716a.js";import"./useIcons-784b82aa.js";import"./index-870dd8ea.js";import"./transButton-20a766e1.js";const y=[];for(let a=0;a<100;a++)y.push({key:a.toString(),name:`Edward ${a}`,age:32,address:`London Park no. ${a}`});const E=({editing:a,dataIndex:s,title:o,inputType:d,record:p,index:r,children:l,...c})=>{const m=d==="number"?t.jsx(I,{}):t.jsx(k,{});return t.jsx("td",{...c,children:a?t.jsx(g.Item,{name:s,style:{margin:0},rules:[{required:!0,message:`Please Input ${o}!`}],children:m}):l})},G=({isShow:a})=>{const[s]=g.useForm(),[o,d]=h.useState(y),[p,r]=h.useState(""),l=e=>e.key===p,c=e=>{s.setFieldsValue({name:"",age:"",address:"",...e}),r(e.key)},m=()=>{r("")},f=async e=>{try{const n=await s.validateFields(),i=[...o],u=i.findIndex(x=>e===x.key);if(u>-1){const x=i[u];i.splice(u,1,{...x,...n}),d(i),r("")}else i.push(n),d(i),r("")}catch{}},j=[{title:"name",dataIndex:"name",width:"25%",editable:!0},{title:"age",dataIndex:"age",width:"15%",editable:!0},{title:"address",dataIndex:"address",width:"40%",editable:!0},{title:"operation",dataIndex:"operation",render:(e,n)=>l(n)?t.jsxs("span",{children:[t.jsx(b.Link,{onClick:()=>f(n.key),style:{marginRight:8},children:"Save"}),t.jsx(C,{title:"Sure to cancel?",onConfirm:m,children:t.jsx("a",{children:"Cancel"})})]}):t.jsx(b.Link,{disabled:p!=="",onClick:()=>c(n),children:"Edit"})}].map(e=>e.editable?{...e,onCell:n=>({record:n,inputType:e.dataIndex==="age"?"number":"text",dataIndex:e.dataIndex,title:e.title,editing:l(n)})}:e);return a&&t.jsx(g,{form:s,component:!1,children:t.jsx(w,{components:{body:{cell:E}},bordered:!0,dataSource:o,columns:j,rowClassName:"editable-row",pagination:{onChange:m}})})};export{G as default};