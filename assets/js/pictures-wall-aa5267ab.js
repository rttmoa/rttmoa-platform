import{r as a,j as t,F as g,M as x}from"./index-27069029.js";function f({images:o}){const[c,n]=a.useState(!1),[u,d]=a.useState(""),[l,i]=a.useState([]);a.useEffect(()=>{const e=o;if(e&&e.length>0){let s=[];s=e.map((r,m)=>({uid:-m,name:r,status:"done",url:r})),i(s)}},[]);const h=e=>{d(e.url||e.thumbUrl),n(!0)},p=({file:e,fileList:s})=>{e.status,s.length,s[s.length-1],i(s)};return t.jsxs(t.Fragment,{children:[t.jsx(g,{action:"https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",accept:"image/*",name:"image",listType:"picture-card",fileList:l,onPreview:h,onChange:p,children:l.length>=4?null:t.jsxs("div",{children:[t.jsx("div",{children:"+"}),t.jsx("div",{children:"Upload"})]})}),t.jsx(x,{open:c,footer:null,onCancel:()=>{n(!1)},children:t.jsx("img",{alt:"example",style:{width:"100%"},src:u})})]})}export{f as default};