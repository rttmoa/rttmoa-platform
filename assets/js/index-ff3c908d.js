import{u as C,r,j as a,B as s,ax as u}from"./index-1b257d2f.js";import{p as x}from"./product-dfe43cba.js";import{C as w}from"./index-72919ef7.js";import{T as z}from"./Table-bddf8d47.js";import{I}from"./index-f41216df.js";import{P as v}from"./index-b841bf8e.js";import"./Skeleton-82688fa7.js";import"./index-eb7e9054.js";import"./zh_CN-1b678e41.js";import"./styleChecker-9303d689.js";import"./List-c230856e.js";import"./Tree-73a2cd6b.js";import"./conductUtil-a28b5618.js";import"./index-d0fe4b3c.js";import"./index-be3eb6ff.js";import"./index-37f95fae.js";import"./index-88675925.js";import"./index-bf348bc9.js";import"./Select-20bb209e.js";import"./useIcons-7358587c.js";import"./index-cc63b01c.js";import"./iconUtil-1cc95d66.js";import"./Image-63de06c0.js";const X="http://localhost:3009",Y=()=>{const m=C(),[h,d]=r.useState(!1),[p,_]=r.useState(""),[g,k]=r.useState("productName"),[f,o]=r.useState({list:[],total:0,page:1,pageSize:5}),{list:S,total:j,page:n,pageSize:c}=f,l=async(e,t)=>{o({page:e}),d(!0);let i;p?i=await x(e,t,p,g):i=await x(e,t),i.code==200&&(d(!1),o(i.data))};r.useEffect(()=>{l(n,c)},[]);const y=[{title:"序号",key:"_id",width:80,align:"center",render:(e,t,i)=>i+1},{title:"商品名称",dataIndex:"name"},{title:"主图",dataIndex:"coverImg",render:(e,t)=>a.jsx(I,{src:t.coverImg,alt:t.name,style:{width:60}})},{title:"价格",dataIndex:"price",render(e){return`￥${e}`}},{title:"是否在售",dataIndex:"onSale",render:(e,t)=>t.onSale?"在售":"已下架"},{title:"商品描述",dataIndex:"desc"},{title:"操作",render:(e,t,i)=>a.jsxs("div",{children:[a.jsx(s,{type:"primary",size:"small",onClick:()=>{m(`/module/product/detail?id=${t._id}`)},children:"修改"}),a.jsx(v,{title:"确定删除此项",onCancel:()=>{},onConfirm:()=>{u.info(`删除： _id=${t._id}`)},children:a.jsx(s,{type:"dashed",size:"small",style:{margin:"0 1rem"},children:"删除"})}),a.jsx(s,{size:"small",onClick:()=>{u.info(`修改在售： _id=${t._id}`)},children:t.onSale?"下架":"上架"})]})}];return a.jsx("div",{children:a.jsx(w,{title:"商品列表",extra:a.jsx(s,{type:"primary",size:"small",onClick:()=>{m("/module/product/detail")},children:"新增"}),children:a.jsx(z,{bordered:!0,rowKey:"_id",loading:h,rowClassName:e=>e!=null&&e.onSale?"":"bg-red",columns:y,dataSource:S,pagination:{current:n,total:j,defaultPageSize:c,showSizeChanger:!0,pageSizeOptions:["3","5","10","15"],showQuickJumper:!0,onChange:l,onShowSizeChange:(e,t)=>{o({pageSize:t}),l(n,t)}}})})})};export{Y as default,X as serverUrl};