import{a9 as t,r,j as e,at as b,V as I,ad as o,Q as l,aa as s}from"./index-f08e2d74.js";import{C as v}from"./index-93787fd3.js";import{T as c}from"./index-ff84b30d.js";import{C as w}from"./ColorPicker-2e649ec9.js";import"./Skeleton-c249fd6a.js";import"./styleChecker-8995fb3a.js";import"./transButton-20a766e1.js";import"./index-9f58716a.js";import"./List-60e444da.js";import"./useIcons-784b82aa.js";const k=""+new URL("../png/illustration-2ec72c66.png",import.meta.url).href,{Paragraph:i}=c,V=()=>{const[d]=t.useForm(),[a,m]=r.useState({content:"Hooks Admin",color:"rgba(0, 0, 0, 0.15)",fontSize:16,zIndex:11,rotate:-22,gap:[100,100],offset:void 0}),{content:h,color:n,fontSize:p,zIndex:u,rotate:x,gap:f,offset:g}=a,y=r.useMemo(()=>({content:h,font:{color:typeof n=="string"?n:n.toRgbString(),fontSize:p},zIndex:u,rotate:x,gap:f,offset:g}),[a]);return e.jsxs(v,{bodyStyle:{display:"flex"},children:[e.jsxs(b,{...y,children:[e.jsxs(c,{children:[e.jsx(i,{children:"The light-speed iteration of the digital world makes products more complex. However, human consciousness and attention resources are limited. Facing this design contradiction, the pursuit of natural interaction will be the consistent direction of Ant Design."}),e.jsx(i,{children:"Natural user cognition: According to cognitive psychology, about 80% of external information is obtained through visual channels. The most important visual elements in the interface design, including layout, colors, illustrations, icons, etc., should fully absorb the laws of nature, thereby reducing the user's cognitive cost and bringing authentic and smooth feelings. In some scenarios, opportunely adding other sensory channels such as hearing, touch can create a richer and more natural product experience."}),e.jsx(i,{children:"Natural user behavior: In the interaction with the system, the designer should fully understand the relationship between users, system roles, and task objectives, and also contextually organize system functions and services. At the same time, a series of methods such as behavior analysis, artificial intelligence and sensors could be applied to assist users to make effective decisions and reduce extra operations of users, to save users' mental and physical resources and make human-computer interaction more natural."})]}),e.jsx("img",{style:{zIndex:10,width:"100%",maxWidth:800,position:"relative"},src:k,alt:"示例图片"})]}),e.jsxs(t,{style:{width:280,flexShrink:0,borderLeft:"1px solid var(--hooks-colorBorderSecondary)",paddingLeft:20,marginLeft:20},form:d,layout:"vertical",initialValues:a,onValuesChange:(S,j)=>{m(j)},children:[e.jsx(t.Item,{name:"content",label:"Content",children:e.jsx(I,{placeholder:"请输入"})}),e.jsx(t.Item,{name:"color",label:"Color",children:e.jsx(w,{})}),e.jsx(t.Item,{name:"fontSize",label:"FontSize",children:e.jsx(o,{step:1,min:0,max:100})}),e.jsx(t.Item,{name:"zIndex",label:"zIndex",children:e.jsx(o,{step:1,min:0,max:100})}),e.jsx(t.Item,{name:"rotate",label:"Rotate",children:e.jsx(o,{step:1,min:-180,max:180})}),e.jsx(t.Item,{label:"Gap",style:{marginBottom:0},children:e.jsxs(l,{style:{display:"flex"},align:"baseline",children:[e.jsx(t.Item,{name:["gap",0],children:e.jsx(s,{placeholder:"gapX",style:{width:"100%"}})}),e.jsx(t.Item,{name:["gap",1],children:e.jsx(s,{placeholder:"gapY",style:{width:"100%"}})})]})}),e.jsx(t.Item,{label:"Offset",style:{marginBottom:0},children:e.jsxs(l,{style:{display:"flex"},align:"baseline",children:[e.jsx(t.Item,{name:["offset",0],children:e.jsx(s,{placeholder:"offsetLeft",style:{width:"100%"}})}),e.jsx(t.Item,{name:["offset",1],children:e.jsx(s,{placeholder:"offsetTop",style:{width:"100%"}})})]})})]})]})};export{V as default};