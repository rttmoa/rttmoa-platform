import{a as $,r as t,j as w}from"./react-12b51ca5.js";import{h as z,j as p,k as C,l as I,n as L,o as S,q as g,r as j,s as F,t as D,v as k,w as B,x as H,y as T,z as h,A as q,B as A,C as G,D as M,E as O,F as U,G as J,H as K}from"./echarts-d4e79a86.js";import{a as N,b as P}from"./ahooks-2e5c1fd5.js";import{b as o}from"./index-5960db8a.js";z([C,I,L,S,g,j,F,D,k,B,H,T,h,q,A,G,M,O,U,J,K]);const Q=({option:i,isResize:u=!0,width:r,height:l,onClick:c},E)=>{const a=t.useRef(null),e=t.useRef(),[f,d]=t.useState(!0),v=o(s=>s.global.maximize),x=o(s=>s.global.menuSplit),b=o(s=>s.global.isCollapse),R=s=>c&&c(s);t.useEffect(()=>{var s,m;a.current&&(e.current=p.getInstanceByDom(a.current),e.current||(e.current=p.init(a.current,void 0,{renderer:"svg"}),(s=e.current)==null||s.on("click",R)),i&&((m=e.current)==null||m.setOption(i)))},[a,i]);const{run:n}=N(()=>{var s;return(s=e.current)==null?void 0:s.resize({animation:{duration:300}})},{wait:300});P(()=>{d(!1)},1e3),t.useLayoutEffect(()=>{u&&!f&&n()},[r,l,n,f,v,x,b]),t.useEffect(()=>{if(u)return window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}},[n]),t.useImperativeHandle(E,()=>({instance:()=>e.current}));const y=t.useMemo(()=>r||l?{height:l,width:r}:{height:"100%",width:"100%",flex:1},[r,l]);return w.jsx("div",{ref:a,style:y})},Z=$.memo($.forwardRef(Q));export{Z as E};