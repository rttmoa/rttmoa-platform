import{a as W,r as l,aS as D,b2 as Y,b3 as J,b0 as X,i as R,bX as Q,bY as U,aX as Z,br as L}from"./index-1b257d2f.js";import{C as ee}from"./index-be3eb6ff.js";import{u as q}from"./index-37f95fae.js";const te=W.createContext(null),z=te;var se=globalThis&&globalThis.__rest||function(a,u){var o={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&u.indexOf(e)<0&&(o[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(a);n<e.length;n++)u.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(a,e[n])&&(o[e[n]]=a[e[n]]);return o};const ae=(a,u)=>{var o;const{prefixCls:e,className:n,rootClassName:E,children:C,indeterminate:g=!1,style:S,onMouseEnter:p,onMouseLeave:i,skipGroup:y=!1,disabled:V}=a,r=se(a,["prefixCls","className","rootClassName","children","indeterminate","style","onMouseEnter","onMouseLeave","skipGroup","disabled"]),{getPrefixCls:O,direction:N,checkbox:d}=l.useContext(D),t=l.useContext(z),{isFormItemInput:P}=l.useContext(Y),w=l.useContext(J),x=(o=(t==null?void 0:t.disabled)||V)!==null&&o!==void 0?o:w,f=l.useRef(r.value);l.useEffect(()=>{t==null||t.registerValue(r.value)},[]),l.useEffect(()=>{if(!y)return r.value!==f.current&&(t==null||t.cancelValue(f.current),t==null||t.registerValue(r.value),f.current=r.value),()=>t==null?void 0:t.cancelValue(r.value)},[r.value]);const c=O("checkbox",e),h=X(c),[$,k,_]=q(c,h),b=Object.assign({},r);t&&!y&&(b.onChange=function(){r.onChange&&r.onChange.apply(r,arguments),t.toggleOption&&t.toggleOption({label:C,value:r.value})},b.name=t.name,b.checked=t.value.includes(r.value));const j=R(`${c}-wrapper`,{[`${c}-rtl`]:N==="rtl",[`${c}-wrapper-checked`]:b.checked,[`${c}-wrapper-disabled`]:x,[`${c}-wrapper-in-form-item`]:P},d==null?void 0:d.className,n,E,_,h,k),I=R({[`${c}-indeterminate`]:g},Q,k),G=g?"mixed":void 0;return $(l.createElement(U,{component:"Checkbox",disabled:x},l.createElement("label",{className:j,style:Object.assign(Object.assign({},d==null?void 0:d.style),S),onMouseEnter:p,onMouseLeave:i},l.createElement(ee,Object.assign({"aria-checked":G},b,{prefixCls:c,className:I,disabled:x,ref:u})),C!==void 0&&l.createElement("span",null,C))))},le=l.forwardRef(ae),B=le;var ne=globalThis&&globalThis.__rest||function(a,u){var o={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&u.indexOf(e)<0&&(o[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(a);n<e.length;n++)u.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(a,e[n])&&(o[e[n]]=a[e[n]]);return o};const re=l.forwardRef((a,u)=>{const{defaultValue:o,children:e,options:n=[],prefixCls:E,className:C,rootClassName:g,style:S,onChange:p}=a,i=ne(a,["defaultValue","children","options","prefixCls","className","rootClassName","style","onChange"]),{getPrefixCls:y,direction:V}=l.useContext(D),[r,O]=l.useState(i.value||o||[]),[N,d]=l.useState([]);l.useEffect(()=>{"value"in i&&O(i.value||[])},[i.value]);const t=l.useMemo(()=>n.map(s=>typeof s=="string"||typeof s=="number"?{label:s,value:s}:s),[n]),P=s=>{d(m=>m.filter(v=>v!==s))},w=s=>{d(m=>[].concat(L(m),[s]))},x=s=>{const m=r.indexOf(s.value),v=L(r);m===-1?v.push(s.value):v.splice(m,1),"value"in i||O(v),p==null||p(v.filter(M=>N.includes(M)).sort((M,F)=>{const H=t.findIndex(T=>T.value===M),K=t.findIndex(T=>T.value===F);return H-K}))},f=y("checkbox",E),c=`${f}-group`,h=X(f),[$,k,_]=q(f,h),b=Z(i,["value","disabled"]),j=n.length?t.map(s=>l.createElement(B,{prefixCls:f,key:s.value.toString(),disabled:"disabled"in s?s.disabled:i.disabled,value:s.value,checked:r.includes(s.value),onChange:s.onChange,className:`${c}-item`,style:s.style,title:s.title,id:s.id,required:s.required},s.label)):e,I={toggleOption:x,value:r,disabled:i.disabled,name:i.name,registerValue:w,cancelValue:P},G=R(c,{[`${c}-rtl`]:V==="rtl"},C,g,_,h,k);return $(l.createElement("div",Object.assign({className:G,style:S},b,{ref:u}),l.createElement(z.Provider,{value:I},j)))}),oe=re,A=B;A.Group=oe;A.__ANT_CHECKBOX=!0;const de=A;export{de as C};