import{p as se,q as oe,bM as de,t as R,bN as B,bO as ce,bP as ue,bQ as pe,bR as me,w,bS as he,aR as be,bT as ge,r,aW as xe,aS as fe,b2 as Se,bk as M,bU as je,b0 as ve,b1 as we,i as I,b4 as Ie,E as Ce,b7 as ye,j as e,a9 as n,X as c,y as Oe,aa as Fe}from"./index-27069029.js";import{D as C}from"./index-275c5f8b.js";import{T as ke}from"./index-5a4f9e83.js";import{D as Pe,S as V}from"./index-1c2b87a6.js";import{C as Ee}from"./index-a97ce548.js";import{T as Ne}from"./index-b412e4b9.js";import{M as D}from"./Mentions-76f41603.js";import"./SinglePicker-69abe8d6.js";import"./customParseFormat-94115884.js";import"./useIcons-4fdad9d1.js";import"./Select-91793026.js";import"./List-3450d2b7.js";import"./Cascader-9b288c15.js";import"./conductUtil-6ae751c6.js";import"./index-04342e75.js";import"./TreeSelect-0cceeb2e.js";import"./Tree-409ac648.js";import"./iconUtil-3fadc6e3.js";const Te=t=>{const{componentCls:i,colorTextDisabled:o,controlItemBgHover:a,controlPaddingHorizontal:l,colorText:s,motionDurationSlow:d,lineHeight:u,controlHeight:x,paddingInline:h,paddingBlock:S,fontSize:j,fontSizeIcon:y,colorTextTertiary:O,colorTextQuaternary:F,colorBgElevated:k,paddingXXS:p,paddingLG:P,borderRadius:v,borderRadiusLG:E,boxShadowSecondary:N,itemPaddingVertical:T,calc:b}=t;return{[i]:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},R(t)),B(t)),{position:"relative",display:"inline-block",height:"auto",padding:0,overflow:"hidden",lineHeight:u,whiteSpace:"pre-wrap",verticalAlign:"bottom"}),ce(t)),ue(t)),pe(t)),{"&-affix-wrapper":Object.assign(Object.assign({},B(t)),{display:"inline-flex",padding:0,"&::before":{display:"inline-block",width:0,visibility:"hidden",content:'"\\a0"'},[`${i}-suffix`]:{position:"absolute",top:0,insetInlineEnd:h,bottom:0,zIndex:1,display:"inline-flex",alignItems:"center",margin:"auto"},[`&:has(${i}-suffix) > ${i} > textarea`]:{paddingInlineEnd:P},[`${i}-clear-icon`]:{position:"absolute",insetInlineEnd:0,insetBlockStart:b(j).mul(u).mul(.5).add(S).equal(),transform:"translateY(-50%)",margin:0,color:F,fontSize:y,verticalAlign:-1,cursor:"pointer",transition:`color ${d}`,"&:hover":{color:O},"&:active":{color:s},"&-hidden":{visibility:"hidden"}}}),"&-disabled":{"> textarea":Object.assign({},me(t))},[`&, &-affix-wrapper > ${i}`]:{[`> textarea, ${i}-measure`]:{color:s,boxSizing:"border-box",minHeight:t.calc(x).sub(2),margin:0,padding:`${w(S)} ${w(h)}`,overflow:"inherit",overflowX:"hidden",overflowY:"auto",fontWeight:"inherit",fontSize:"inherit",fontFamily:"inherit",fontStyle:"inherit",fontVariant:"inherit",fontSizeAdjust:"inherit",fontStretch:"inherit",lineHeight:"inherit",direction:"inherit",letterSpacing:"inherit",whiteSpace:"inherit",textAlign:"inherit",verticalAlign:"top",wordWrap:"break-word",wordBreak:"inherit",tabSize:"inherit"},"> textarea":Object.assign({width:"100%",border:"none",outline:"none",resize:"none",backgroundColor:"transparent"},he(t.colorTextPlaceholder)),[`${i}-measure`]:{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,zIndex:-1,color:"transparent",pointerEvents:"none","> span":{display:"inline-block",minHeight:"1em"}}},"&-dropdown":Object.assign(Object.assign({},R(t)),{position:"absolute",top:-9999,insetInlineStart:-9999,zIndex:t.zIndexPopup,boxSizing:"border-box",fontSize:j,fontVariant:"initial",padding:p,backgroundColor:k,borderRadius:E,outline:"none",boxShadow:N,"&-hidden":{display:"none"},[`${i}-dropdown-menu`]:{maxHeight:t.dropdownHeight,margin:0,paddingInlineStart:0,overflow:"auto",listStyle:"none",outline:"none","&-item":Object.assign(Object.assign({},be),{position:"relative",display:"block",minWidth:t.controlItemWidth,padding:`${w(T)} ${w(l)}`,color:s,borderRadius:v,fontWeight:"normal",lineHeight:u,cursor:"pointer",transition:`background ${d} ease`,"&:hover":{backgroundColor:a},"&-disabled":{color:o,cursor:"not-allowed","&:hover":{color:o,backgroundColor:a,cursor:"not-allowed"}},"&-selected":{color:s,fontWeight:t.fontWeightStrong,backgroundColor:a},"&-active":{backgroundColor:a}})}})})}},$e=t=>Object.assign(Object.assign({},ge(t)),{dropdownHeight:250,controlItemWidth:100,zIndexPopup:t.zIndexPopupBase+50,itemPaddingVertical:(t.controlHeight-t.fontHeight)/2}),ze=se("Mentions",t=>{const i=oe(t,de(t));return[Te(i)]},$e);var We=globalThis&&globalThis.__rest||function(t,i){var o={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&i.indexOf(a)<0&&(o[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,a=Object.getOwnPropertySymbols(t);l<a.length;l++)i.indexOf(a[l])<0&&Object.prototype.propertyIsEnumerable.call(t,a[l])&&(o[a[l]]=t[a[l]]);return o};const{Option:_}=D;function Ae(){return!0}const He=(t,i)=>{const{prefixCls:o,className:a,rootClassName:l,disabled:s,loading:d,filterOption:u,children:x,notFoundContent:h,options:S,status:j,allowClear:y=!1,popupClassName:O,style:F,variant:k}=t,p=We(t,["prefixCls","className","rootClassName","disabled","loading","filterOption","children","notFoundContent","options","status","allowClear","popupClassName","style","variant"]),[P,v]=r.useState(!1),E=r.useRef(null),N=xe(i,E),{getPrefixCls:T,renderEmpty:b,direction:A,mentions:g}=r.useContext(fe),{status:G,hasFeedback:L,feedbackIcon:X}=r.useContext(Se),Y=ye(G,j),q=function(){p.onFocus&&p.onFocus.apply(p,arguments),v(!0)},Q=function(){p.onBlur&&p.onBlur.apply(p,arguments),v(!1)},U=r.useMemo(()=>h!==void 0?h:(b==null?void 0:b("Select"))||r.createElement(Pe,{componentName:"Select"}),[h,b]),J=r.useMemo(()=>d?r.createElement(_,{value:"ANTD_SEARCHING",disabled:!0},r.createElement(M,{size:"small"})):x,[d,x]),K=d?[{value:"ANTD_SEARCHING",disabled:!0,label:r.createElement(M,{size:"small"})}]:S,Z=d?Ae:u,m=T("mentions",o),ee=je(y),$=ve(m),[te,z,H]=ze(m,$),[ne,ae]=we(k),ie=L&&r.createElement(r.Fragment,null,X),re=I(g==null?void 0:g.className,a,l,H,$),le=r.createElement(D,Object.assign({prefixCls:m,notFoundContent:U,className:re,disabled:s,allowClear:ee,direction:A,style:Object.assign(Object.assign({},g==null?void 0:g.style),F)},p,{filterOption:Z,onFocus:q,onBlur:Q,dropdownClassName:I(O,l,z,H,$),ref:N,options:K,suffix:ie,classNames:{mentions:I({[`${m}-disabled`]:s,[`${m}-focused`]:P,[`${m}-rtl`]:A==="rtl"},z),variant:I({[`${m}-${ne}`]:ae},Ie(m,Y)),affixWrapper:z}}),J);return te(le)},f=r.forwardRef(He);f.Option=_;const Re=Ce(f,"mentions");f._InternalPanelDoNotUseOrYouWillBeFired=Re;f.getMentions=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{prefix:o="@",split:a=" "}=i,l=Array.isArray(o)?o:[o];return t.split(a).map(function(){let s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"",d=null;return l.some(u=>s.slice(0,u.length)===u?(d=u,!0):!1),d!==null?{prefix:d,value:s.slice(d.length)}:null}).filter(s=>!!s&&!!s.value)};const Be=f,{Option:W}=V,Me={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:14}}},rt=({value:t})=>e.jsx(e.Fragment,{children:t=="ValidateStatic"&&e.jsx(e.Fragment,{children:e.jsxs(n,{...Me,style:{maxWidth:600},children:[e.jsx(n.Item,{label:"Fail",validateStatus:"error",help:"Should be combination of numbers & alphabets",children:e.jsx(c,{placeholder:"unavailable choice",id:"error"})}),e.jsx(n.Item,{label:"Warning",validateStatus:"warning",children:e.jsx(c,{placeholder:"Warning",id:"warning",prefix:e.jsx(Oe,{})})}),e.jsx(n.Item,{label:"Validating",hasFeedback:!0,validateStatus:"validating",help:"The information is being validated...",children:e.jsx(c,{placeholder:"I'm the content is being validated",id:"validating"})}),e.jsx(n.Item,{label:"Success",hasFeedback:!0,validateStatus:"success",children:e.jsx(c,{placeholder:"I'm the content",id:"success"})}),e.jsx(n.Item,{label:"Warning",hasFeedback:!0,validateStatus:"warning",children:e.jsx(c,{placeholder:"Warning",id:"warning2"})}),e.jsx(n.Item,{label:"Fail",hasFeedback:!0,validateStatus:"error",help:"Should be combination of numbers & alphabets",children:e.jsx(c,{placeholder:"unavailable choice",id:"error2"})}),e.jsx(n.Item,{label:"Success",hasFeedback:!0,validateStatus:"success",children:e.jsx(C,{style:{width:"100%"}})}),e.jsx(n.Item,{label:"Warning",hasFeedback:!0,validateStatus:"warning",children:e.jsx(ke,{style:{width:"100%"}})}),e.jsx(n.Item,{label:"Error",hasFeedback:!0,validateStatus:"error",children:e.jsx(C.RangePicker,{style:{width:"100%"}})}),e.jsx(n.Item,{label:"Error",hasFeedback:!0,validateStatus:"error",children:e.jsxs(V,{placeholder:"I'm Select",allowClear:!0,children:[e.jsx(W,{value:"1",children:"Option 1"}),e.jsx(W,{value:"2",children:"Option 2"}),e.jsx(W,{value:"3",children:"Option 3"})]})}),e.jsx(n.Item,{label:"Validating",hasFeedback:!0,validateStatus:"error",help:"Something breaks the rule.",children:e.jsx(Ee,{placeholder:"I'm Cascader",options:[{value:"xx",label:"xx"}],allowClear:!0})}),e.jsx(n.Item,{label:"Warning",hasFeedback:!0,validateStatus:"warning",help:"Need to be checked",children:e.jsx(Ne,{placeholder:"I'm TreeSelect",treeData:[{value:"xx",label:"xx"}],allowClear:!0})}),e.jsxs(n.Item,{label:"inline Form.Item",style:{marginBottom:0},children:[e.jsx(n.Item,{validateStatus:"error",help:"Please select right date",style:{display:"inline-block",width:"calc(50% - 12px)"},children:e.jsx(C,{})}),e.jsx("span",{style:{display:"inline-block",width:"24px",lineHeight:"32px",textAlign:"center"},children:"-"}),e.jsx(n.Item,{style:{display:"inline-block",width:"calc(50% - 12px)"},children:e.jsx(C,{})})]}),e.jsx(n.Item,{label:"Success",hasFeedback:!0,validateStatus:"success",children:e.jsx(Fe,{style:{width:"100%"}})}),e.jsx(n.Item,{label:"Success",hasFeedback:!0,validateStatus:"success",children:e.jsx(c,{allowClear:!0,placeholder:"with allowClear"})}),e.jsx(n.Item,{label:"Warning",hasFeedback:!0,validateStatus:"warning",children:e.jsx(c.Password,{placeholder:"with input password"})}),e.jsx(n.Item,{label:"Error",hasFeedback:!0,validateStatus:"error",children:e.jsx(c.Password,{allowClear:!0,placeholder:"with input password and allowClear"})}),e.jsx(n.Item,{label:"Fail",validateStatus:"error",hasFeedback:!0,children:e.jsx(Be,{})}),e.jsx(n.Item,{label:"Fail",validateStatus:"error",hasFeedback:!0,help:"Should have something",children:e.jsx(c.TextArea,{allowClear:!0,showCount:!0})})]})})});export{rt as default};