var g=Object.defineProperty;var f=(t,i,n)=>i in t?g(t,i,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[i]=n;var h=(t,i,n)=>(f(t,typeof i!="symbol"?i+"":i,n),n);import{a as y,j as s,r as u,A as o,R as r,C as x,Q as S}from"./index-f08e2d74.js";import{C as l}from"./index-93787fd3.js";import{D as c}from"./index-66c25f32.js";import{T as w}from"./index-ff84b30d.js";import"./Skeleton-c249fd6a.js";import"./styleChecker-8995fb3a.js";import"./transButton-20a766e1.js";const C=t=>{const{name:i,prefix:n="icon",iconStyle:j={width:"100px",height:"100px"}}=t,p=`#${n}-${i}`;return s.jsx("svg",{"aria-hidden":"true",style:j,children:s.jsx("use",{href:p})})},e=y.memo(C);var m,d;let a=class extends u.Component{constructor(){super(...arguments);h(this,"state",{size:((m=this.props)==null?void 0:m.size)||80,link:(d=this.props)==null?void 0:d.link,style:Object.assign({},this.props.style),className:this.props.className||""})}render(){return s.jsx("a",{href:this.state.link,target:"_blank",className:this.state.className+" github-corner","aria-label":"View source on Github",style:this.state.style,children:s.jsxs("svg",{width:this.state.size,height:this.state.size,viewBox:"0 0 250 250","aria-hidden":"true",children:[s.jsx("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}),s.jsx("path",{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{transformOrigin:"130px 106px"},className:"octo-arm"}),s.jsx("path",{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor",className:"octo-body"})]})})}};const{Link:b}=w,M=()=>{const t=s.jsxs("span",{children:["SvgIcon 使用 vite-plugin-svg-icons 插件完成，官方文档请查看 ：",s.jsx(b,{href:"https://github.com/vbenjs/vite-plugin-svg-icons",target:"_blank",children:"vite-plugin-svg-icons"})]});return s.jsxs(s.Fragment,{children:[s.jsxs(l,{className:"svg-content mb-6",children:[s.jsx(o,{message:t,type:"success",showIcon:!0}),s.jsxs("div",{className:"icon-list",children:[s.jsx(e,{name:"1",iconStyle:{width:"180px"}}),s.jsx(e,{name:"2",iconStyle:{width:"180px"}}),s.jsx(e,{name:"3",iconStyle:{width:"180px"}}),s.jsx(e,{name:"4",iconStyle:{width:"180px"}}),s.jsx(e,{name:"5",iconStyle:{width:"180px"}}),s.jsx(e,{name:"6",iconStyle:{width:"180px"}}),s.jsx(e,{name:"7",iconStyle:{width:"180px"}}),s.jsx(e,{name:"8",iconStyle:{width:"180px"}}),s.jsx(e,{name:"9",iconStyle:{width:"180px"}}),s.jsx(e,{name:"10",iconStyle:{width:"180px"}}),s.jsx(e,{name:"11",iconStyle:{width:"180px"}}),s.jsx(e,{name:"12",iconStyle:{width:"180px"}}),s.jsx(e,{name:"13",iconStyle:{width:"180px"}}),s.jsx(e,{name:"14",iconStyle:{width:"180px"}})]}),s.jsxs(c,{title:"配置项 📚",bordered:!0,column:1,labelStyle:{width:"200px"},children:[s.jsx(c.Item,{label:"name",children:"图标的名称，svg 图标必须存储在 src/assets/icons 目录下"}),s.jsx(c.Item,{label:"prefix",children:"图标的前缀，默认为 icon"}),s.jsxs(c.Item,{label:"iconStyle",children:[" 图标的样式，默认样式为 ","{ width: 100px, height: 100px }"," "]})]})]}),s.jsx(l,{className:"mb-6",children:s.jsx(r,{className:"gutter-row",children:s.jsx(x,{md:24,className:"gutter-col",children:s.jsx(o,{type:"info",message:"github图标 实例展示",description:s.jsxs("div",{style:{display:"flex"},children:[s.jsx(a,{size:100}),s.jsx(a,{style:{color:"yellow"}}),s.jsx(a,{style:{color:"blue"}}),s.jsx(a,{style:{fill:"blue",color:"#fff"}})]})})})})}),s.jsx(l,{className:"mb-6",children:s.jsx(r,{className:"gutter-row",children:s.jsx(x,{md:24,className:"gutter-col",children:s.jsx(o,{type:"info",message:"iconFont 矢量图标",description:s.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[s.jsx(e,{name:"fangda",iconStyle:{width:50,height:50,marginRight:20}}),s.jsx(e,{name:"suoxiao",iconStyle:{width:50,height:50,marginRight:20}}),s.jsx(e,{name:"contentleft",iconStyle:{width:50,height:50,marginRight:20}}),s.jsx(e,{name:"contentright",iconStyle:{width:50,height:50,marginRight:20}})]})})})})}),s.jsx(l,{className:"mb-6",children:s.jsx(r,{className:"gutter-row",children:s.jsx(x,{md:24,className:"gutter-col",children:s.jsx(o,{type:"info",message:"iconFont 字体图标",description:s.jsx("div",{style:{display:"flex",alignItems:"center"},children:s.jsxs(S,{size:"large",children:[s.jsx("i",{className:"iconfont icon-zhuti",style:{color:"#178fff",fontSize:20}}),s.jsx("i",{className:"iconfont icon-xiaoxi",style:{color:"#178fff",fontSize:20}}),s.jsx("i",{className:"iconfont icon-sun",style:{color:"#178fff",fontSize:20}}),s.jsx("i",{className:"iconfont icon-moon",style:{color:"#178fff",fontSize:20}}),s.jsx("i",{className:"iconfont icon-moon1",style:{color:"#178fff",fontSize:20}})]})})})})})})]})};export{M as default};