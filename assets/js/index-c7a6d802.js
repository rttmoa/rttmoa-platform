import{T as W,c as Y,C as Z}from"./Tree-409ac648.js";import{a as h,aS as X,b$ as ee,bV as te,c0 as ne,i as q,br as L,r as f,aN as se,c1 as re,c2 as oe}from"./index-27069029.js";import{f as G,c as ce,a as ae}from"./conductUtil-6ae751c6.js";import{u as le,S as ie}from"./iconUtil-3fadc6e3.js";const V=4;function de(e){const{dropPosition:c,dropLevelOffset:o,prefixCls:n,indent:s,direction:t="ltr"}=e,r=t==="ltr"?"left":"right",a=t==="ltr"?"right":"left",i={[r]:-o*s+V,[a]:0};switch(c){case-1:i.top=-3;break;case 1:i.bottom=-3;break;default:i.bottom=-3,i[r]=s+V;break}return h.createElement("div",{style:i,className:`${n}-drop-indicator`})}const fe=h.forwardRef((e,c)=>{var o;const{getPrefixCls:n,direction:s,virtual:t,tree:r}=h.useContext(X),{prefixCls:a,className:i,showIcon:d=!1,showLine:v,switcherIcon:w,blockNode:E=!1,children:I,checkable:C=!1,selectable:O=!0,draggable:g,motion:S,style:D}=e,y=n("tree",a),$=n(),A=S??Object.assign(Object.assign({},ee($)),{motionAppear:!1}),N=Object.assign(Object.assign({},e),{checkable:C,selectable:O,showIcon:d,motion:A,blockNode:E,showLine:!!v,dropIndicatorRender:de}),[_,m,u]=le(y),[,p]=te(),T=p.paddingXS/2+(((o=p.Tree)===null||o===void 0?void 0:o.titleHeight)||p.controlHeightSM),K=h.useMemo(()=>{if(!g)return!1;let l={};switch(typeof g){case"function":l.nodeDraggable=g;break;case"object":l=Object.assign({},g);break}return l.icon!==!1&&(l.icon=l.icon||h.createElement(ne,null)),l},[g]),F=l=>h.createElement(ie,{prefixCls:y,switcherIcon:w,treeNodeProps:l,showLine:v});return _(h.createElement(W,Object.assign({itemHeight:T,ref:c,virtual:t},N,{style:Object.assign(Object.assign({},r==null?void 0:r.style),D),prefixCls:y,className:q({[`${y}-icon-hide`]:!d,[`${y}-block-node`]:E,[`${y}-unselectable`]:!O,[`${y}-rtl`]:s==="rtl"},r==null?void 0:r.className,i,m,u),direction:s,checkable:C&&h.createElement("span",{className:`${y}-checkbox-inner`}),selectable:O,switcherIcon:F,draggable:K}),I))}),J=fe;var b;(function(e){e[e.None=0]="None",e[e.Start=1]="Start",e[e.End=2]="End"})(b||(b={}));function M(e,c,o){const{key:n,children:s}=o;function t(r){const a=r[n],i=r[s];c(a,r)!==!1&&M(i||[],c,o)}e.forEach(t)}function ue(e){let{treeData:c,expandedKeys:o,startKey:n,endKey:s,fieldNames:t}=e;const r=[];let a=b.None;if(n&&n===s)return[n];if(!n||!s)return[];function i(d){return d===n||d===s}return M(c,d=>{if(a===b.End)return!1;if(i(d)){if(r.push(d),a===b.None)a=b.Start;else if(a===b.Start)return a=b.End,!1}else a===b.Start&&r.push(d);return o.includes(d)},G(t)),r}function H(e,c,o){const n=L(c),s=[];return M(e,(t,r)=>{const a=n.indexOf(t);return a!==-1&&(s.push(r),n.splice(a,1)),!!n.length},G(o)),s}var z=globalThis&&globalThis.__rest||function(e,c){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&c.indexOf(n)<0&&(o[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(e);s<n.length;s++)c.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(o[n[s]]=e[n[s]]);return o};function pe(e){const{isLeaf:c,expanded:o}=e;return c?f.createElement(se,null):o?f.createElement(re,null):f.createElement(oe,null)}function B(e){let{treeData:c,children:o}=e;return c||ae(o)}const ye=(e,c)=>{var{defaultExpandAll:o,defaultExpandParent:n,defaultExpandedKeys:s}=e,t=z(e,["defaultExpandAll","defaultExpandParent","defaultExpandedKeys"]);const r=f.useRef(),a=f.useRef(),i=()=>{const{keyEntities:m}=ce(B(t));let u;return o?u=Object.keys(m):n?u=Y(t.expandedKeys||s||[],m):u=t.expandedKeys||s||[],u},[d,v]=f.useState(t.selectedKeys||t.defaultSelectedKeys||[]),[w,E]=f.useState(()=>i());f.useEffect(()=>{"selectedKeys"in t&&v(t.selectedKeys)},[t.selectedKeys]),f.useEffect(()=>{"expandedKeys"in t&&E(t.expandedKeys)},[t.expandedKeys]);const I=(m,u)=>{var p;return"expandedKeys"in t||E(m),(p=t.onExpand)===null||p===void 0?void 0:p.call(t,m,u)},C=(m,u)=>{var p;const{multiple:T,fieldNames:K}=t,{node:F,nativeEvent:l}=u,{key:P=""}=F,j=B(t),k=Object.assign(Object.assign({},u),{selected:!0}),Q=(l==null?void 0:l.ctrlKey)||(l==null?void 0:l.metaKey),U=l==null?void 0:l.shiftKey;let x;T&&Q?(x=m,r.current=P,a.current=x,k.selectedNodes=H(j,x,K)):T&&U?(x=Array.from(new Set([].concat(L(a.current||[]),L(ue({treeData:j,expandedKeys:w,startKey:P,endKey:r.current,fieldNames:K}))))),k.selectedNodes=H(j,x,K)):(x=[P],r.current=P,a.current=x,k.selectedNodes=H(j,x,K)),(p=t.onSelect)===null||p===void 0||p.call(t,x,k),"selectedKeys"in t||v(x)},{getPrefixCls:O,direction:g}=f.useContext(X),{prefixCls:S,className:D,showIcon:y=!0,expandAction:$="click"}=t,A=z(t,["prefixCls","className","showIcon","expandAction"]),N=O("tree",S),_=q(`${N}-directory`,{[`${N}-directory-rtl`]:g==="rtl"},D);return f.createElement(J,Object.assign({icon:pe,ref:c,blockNode:!0},A,{showIcon:y,expandAction:$,prefixCls:N,className:_,expandedKeys:w,selectedKeys:d,onSelect:C,onExpand:I}))},xe=f.forwardRef(ye),me=xe,R=J;R.DirectoryTree=me;R.TreeNode=Z;const ve=R;export{ve as T};