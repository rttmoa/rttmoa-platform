import{av as x,aw as g,r as o,a9 as n,j as e,B as p,M as k,X as w,ax as D}from"./index-27069029.js";import{C as L}from"./index-0ed61a77.js";import{T as M}from"./Table-778951e0.js";import{S as u}from"./index-1c2b87a6.js";import"./Skeleton-2867eeca.js";import"./index-f5e989dc.js";import"./zh_CN-b8e4881f.js";import"./styleChecker-3c9c7d8a.js";import"./List-3450d2b7.js";import"./Tree-409ac648.js";import"./conductUtil-6ae751c6.js";import"./index-4c31189a.js";import"./index-8d525821.js";import"./index-04342e75.js";import"./index-01f37548.js";import"./index-c7a6d802.js";import"./iconUtil-3fadc6e3.js";import"./Select-91793026.js";import"./useIcons-4fdad9d1.js";const R=s=>x.get(g+`/category/list?parentId=${s}`),P=(s,r)=>x.post(g+"/category/add",{parentId:s,categoryName:r}),X=(s,r)=>x.post(g+"/category/update",{parentId:s,categoryName:r}),de=()=>{const[s,r]=o.useState(!1),[a,c]=o.useState("0"),[I,y]=o.useState(""),[h,N]=o.useState({}),[j,b]=o.useState([]),[O,f]=o.useState([]),[C,i]=o.useState(0),[S]=n.useForm(),[F]=n.useForm(),d=async t=>{r(!0),t=t||a;const l=await R(t);if(r(!1),l.code===200){let m=l.data.map((A,B)=>({...A,key:B}));t=="0"?b(m):f(m)}else D.error("获取分类列表失败")};o.useEffect(()=>{d("")},[]);const _=[{title:a==="0"?"一级分类名称":"二级分类名称",dataIndex:"name"},{title:"操作",width:300,render:t=>e.jsxs("span",{children:[e.jsx(p,{style:{color:"#fe8281"},type:"link",onClick:()=>{E(t)},children:a==="0"?"修改一级分类":"修改二级分类"}),a==="0"?e.jsx(p,{type:"link",onClick:()=>{V(t)},children:"查看子分类"}):null]})}],E=t=>{N(t),i(2)},V=t=>{c(t._id),y(t.name),d(t._id)},v=()=>{c("0"),y(""),f([])},T=async()=>{const{parentId:t,categoryName:l}=S.getFieldsValue(),m=await P(t,l);i(0),m.code===200&&(t===a?d(t):t==="0"&&d("0"))},U=async()=>{i(0);const t=h._id,{categoryName:l}=F.getFieldsValue();(await X(t,l)).code===200&&d("")};return e.jsxs(e.Fragment,{children:[e.jsx(L,{title:a==="0"?"一级分类列表":e.jsxs("span",{children:[e.jsx(p,{onClick:v,type:"link",children:e.jsx("b",{children:"一级分类列表"})}),"->","   ",e.jsx("span",{className:"font-normal font-serif",children:I})]}),extra:e.jsx(p,{type:"primary",onClick:()=>{i(1)},children:"添加分类"}),children:e.jsx(M,{loading:s,columns:_,dataSource:a==="0"?j:O})}),e.jsx(k,{title:"添加分类",open:C===1,onOk:T,onCancel:()=>{i(0)},children:e.jsx($,{categorys:j,parentId:a,form:S})}),e.jsx(k,{title:"修改分类",open:C===2,onOk:U,onCancel:()=>{i(0)},children:e.jsx(q,{categoryName:h.name,form:F})})]})};function $({categorys:s,parentId:r,form:a}){return o.useEffect(()=>()=>{a.resetFields()}),e.jsx(e.Fragment,{children:e.jsxs(n,{form:a,initialValues:{parentId:r},children:[e.jsx(n.Item,{name:"parentId",children:e.jsxs(u,{children:[e.jsx(u.Option,{value:"0",children:"一级分类"}),s.map(c=>e.jsx(u.Option,{value:c._id,children:c.name},c._id))]})}),e.jsx(n.Item,{name:"categoryName",children:e.jsx(w,{placeholder:"请输入分类名称"})})]})})}function q({categoryName:s,form:r}){return o.useEffect(()=>()=>{r.resetFields()}),e.jsx(e.Fragment,{children:e.jsx(n,{form:r,initialValues:{categoryName:s},children:e.jsx(n.Item,{name:"categoryName",children:e.jsx(w,{placeholder:"请输入分类名称"})})})})}export{de as default};