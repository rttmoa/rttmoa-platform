import{b as W,c as Oe}from"./tslib-9305e412.js";import{r as s,j as o}from"./react-12b51ca5.js";import{s as se,B as Te,H as je,X as _e,v as ke}from"./antd-e2492052.js";import{C as Ae}from"./react-easy-crop-57e783c5.js";import{c as Ee}from"./compare-versions-d85a82c7.js";const b="img-crop",ne=1,Z=.1,q=0,fe=-180,ge=180,ae=1,xe=.5,Ce=2,H=.01,Me=s.forwardRef((n,u)=>{const{cropperRef:y,zoomSlider:l,rotationSlider:h,aspectSlider:X,showReset:Y,resetBtnText:V,modalImage:J,aspect:E,minZoom:M,maxZoom:P,cropShape:ie,showGrid:re,cropperProps:K}=n,[x,T]=s.useState(ne),[p,v]=s.useState(q),[f,k]=s.useState(E),Q=x!==ne||p!==q||f!==E,U=()=>{T(ne),v(q),k(E)},[ee,te]=s.useState({x:0,y:0}),D=s.useRef({width:0,height:0,x:0,y:0}),$=s.useCallback((j,G)=>{D.current=G},[]);s.useImperativeHandle(u,()=>({rotation:p,cropPixelsRef:D,onReset:U}));const z="[display:flex] [align-items:center] [width:60%] [margin-inline:auto]",N="[display:flex] [align-items:center] [justify-content:center] [height:32px] [width:32px] [background:transparent] [border:0] [font-family:inherit] [font-size:18px] [cursor:pointer] disabled:[opacity:20%] disabled:[cursor:default]",m="[flex:1]";return o.jsxs(o.Fragment,{children:[o.jsx(Ae,Object.assign({},K,{ref:y,image:J,crop:ee,zoom:x,rotation:p,aspect:f,minZoom:M,maxZoom:P,zoomWithScroll:l,cropShape:ie,showGrid:re,onCropChange:te,onZoomChange:T,onRotationChange:v,onCropComplete:$,classes:{containerClassName:`${b}-container ![position:relative] [width:100%] [height:40vh] [&~section:first-of-type]:[margin-top:16px] [&~section:last-of-type]:[margin-bottom:16px]`,mediaClassName:`${b}-media`}})),l&&o.jsxs("section",{className:`${b}-control ${b}-control-zoom ${z}`,children:[o.jsx("button",{className:N,onClick:()=>T(x-Z),disabled:x-Z<M,children:"－"}),o.jsx(se,{className:m,min:M,max:P,step:Z,value:x,onChange:T}),o.jsx("button",{className:N,onClick:()=>T(x+Z),disabled:x+Z>P,children:"＋"})]}),h&&o.jsxs("section",{className:`${b}-control ${b}-control-rotation ${z}`,children:[o.jsx("button",{className:`${N} [font-size:16px]`,onClick:()=>v(p-ae),disabled:p===fe,children:"↺"}),o.jsx(se,{className:m,min:fe,max:ge,step:ae,value:p,onChange:v}),o.jsx("button",{className:`${N} [font-size:16px]`,onClick:()=>v(p+ae),disabled:p===ge,children:"↻"})]}),X&&o.jsxs("section",{className:`${b}-control ${b}-control-aspect ${z}`,children:[o.jsx("button",{className:N,onClick:()=>k(f-H),disabled:f-H<xe,children:"↕️"}),o.jsx(se,{className:m,min:xe,max:Ce,step:H,value:f,onChange:k}),o.jsx("button",{className:N,onClick:()=>k(f+H),disabled:f+H>Ce,children:"↔️"})]}),Y&&(l||h||X)&&o.jsx(Te,{className:"[bottom:20px] [position:absolute]",style:Q?{}:{opacity:.3,pointerEvents:"none"},onClick:U,children:V})]})});var Pe=s.memo(Me);function $e(n,u){u===void 0&&(u={});var y=u.insertAt;if(!(!n||typeof document>"u")){var l=document.head||document.getElementsByTagName("head")[0],h=document.createElement("style");h.type="text/css",y==="top"&&l.firstChild?l.insertBefore(h,l.firstChild):l.appendChild(h),h.styleSheet?h.styleSheet.cssText=n:h.appendChild(document.createTextNode(n))}}var ze=".visible{visibility:visible}.grid{display:grid}.\\!\\[position\\:relative\\]{position:relative!important}.\\[align-items\\:center\\]{align-items:center}.\\[background\\:transparent\\]{background:transparent}.\\[border\\:0\\]{border:0}.\\[bottom\\:20px\\]{bottom:20px}.\\[cursor\\:pointer\\]{cursor:pointer}.\\[display\\:flex\\]{display:flex}.\\[flex\\:1\\]{flex:1}.\\[font-family\\:inherit\\]{font-family:inherit}.\\[font-size\\:16px\\]{font-size:16px}.\\[font-size\\:18px\\]{font-size:18px}.\\[height\\:32px\\]{height:32px}.\\[height\\:40vh\\]{height:40vh}.\\[justify-content\\:center\\]{justify-content:center}.\\[margin-inline\\:auto\\]{margin-inline:auto}.\\[position\\:absolute\\]{position:absolute}.\\[width\\:100\\%\\]{width:100%}.\\[width\\:32px\\]{width:32px}.\\[width\\:60\\%\\]{width:60%}.disabled\\:\\[cursor\\:default\\]:disabled{cursor:default}.disabled\\:\\[opacity\\:20\\%\\]:disabled{opacity:20%}.\\[\\&\\~section\\:first-of-type\\]\\:\\[margin-top\\:16px\\]~section:first-of-type{margin-top:16px}.\\[\\&\\~section\\:last-of-type\\]\\:\\[margin-bottom\\:16px\\]~section:last-of-type{margin-bottom:16px}";$e(ze,{insertAt:"top"});const Fe=Ee(ke,"4.23.0")===-1?"visible":"open",A=(n,u,y)=>u in n?(console.error(`\`${u}\` is deprecated, please use \`${y}\` instead`),n[u]):n[y],Le=s.forwardRef((n,u)=>{const{quality:y=.4,fillColor:l="white",zoomSlider:h=!0,rotationSlider:X=!1,aspectSlider:Y=!1,showReset:V=!1,resetText:J,aspect:E=1,minZoom:M=1,maxZoom:P=3,cropShape:ie="rect",showGrid:re=!1,cropperProps:K,modalClassName:x,modalTitle:T,modalWidth:p,modalOk:v,modalCancel:f,onModalOk:k,onModalCancel:Q,modalProps:U,beforeCrop:ee,children:te}=n,D=A(n,"zoom","zoomSlider")||!0,$=A(n,"rotate","rotationSlider")||!1,z=A(n,"shape","cropShape")||"rect",N=A(n,"grid","showGrid")||!1;"onUploadFail"in n&&console.error("`onUploadFail` is removed, because the only way it is called, is when the file is rejected by beforeUpload"),A(n,"modalMaskTransitionName","modalProps.maskTransitionName"),A(n,"modalTransitionName","modalProps.transitionName");const m=s.useRef({});m.current.onModalOk=k,m.current.onModalCancel=Q,m.current.beforeCrop=ee;const j=s.useRef(null),G=s.useCallback(t=>{var i;const a=document.createElement("canvas"),e=a.getContext("2d"),r=(((i=t==null?void 0:t.getRootNode)===null||i===void 0?void 0:i.call(t))||document).querySelector(`.${b}-media`),{width:C,height:c,x:R,y:I}=j.current.cropPixelsRef.current;if($&&j.current.rotation!==q){const{naturalWidth:S,naturalHeight:_}=r,F=j.current.rotation*(Math.PI/180),B=Math.abs(Math.sin(F)),O=Math.abs(Math.cos(F)),g=S*O+_*B,d=_*O+S*B;a.width=g,a.height=d,e.fillStyle=l,e.fillRect(0,0,g,d);const ue=g/2,he=d/2;e.translate(ue,he),e.rotate(F),e.translate(-ue,-he);const Ne=(g-S)/2,Re=(d-_)/2;e.drawImage(r,0,0,S,_,Ne,Re,S,_);const Ie=e.getImageData(0,0,g,d);a.width=C,a.height=c,e.putImageData(Ie,-R,-I)}else a.width=C,a.height=c,e.fillStyle=l,e.fillRect(0,0,C,c),e.drawImage(r,R,I,C,c,0,0,C,c);return a},[l,$]),[ce,oe]=s.useState(""),le=s.useRef(),de=s.useRef(),L=s.useCallback(({beforeUpload:t,file:i,resolve:a,reject:e})=>W(void 0,void 0,void 0,function*(){const w=i;if(typeof t!="function"){a(w);return}try{const r=yield t(i,[i]);a(r===!1?!1:r!==!0&&r||w)}catch(r){e(r)}}),[]),pe=s.useCallback(t=>(i,a)=>new Promise((e,w)=>W(void 0,void 0,void 0,function*(){let r=i;if(typeof m.current.beforeCrop=="function")try{const c=yield m.current.beforeCrop(i,a);if(c===!1)return L({beforeUpload:t,file:i,resolve:e,reject:w});c!==!0&&(r=c||i)}catch{return L({beforeUpload:t,file:i,resolve:e,reject:w})}const C=new FileReader;C.addEventListener("load",()=>{typeof C.result=="string"&&oe(C.result)}),C.readAsDataURL(r),le.current=()=>{var c,R;oe(""),j.current.onReset();let I=!1;(R=(c=m.current).onModalCancel)===null||R===void 0||R.call(c,S=>{e(S),I=!0}),I||e(_e.LIST_IGNORE)},de.current=c=>W(void 0,void 0,void 0,function*(){oe(""),j.current.onReset();const R=G(c.target),{type:I,name:S,uid:_}=r;R.toBlob(F=>W(void 0,void 0,void 0,function*(){const B=new File([F],S,{type:I});Object.assign(B,{uid:_}),L({beforeUpload:t,file:B,resolve:O=>{var g,d;e(O),(d=(g=m.current).onModalOk)===null||d===void 0||d.call(g,O)},reject:O=>{var g,d;w(O),(d=(g=m.current).onModalOk)===null||d===void 0||d.call(g,O)}})}),I,y)})})),[G,y,L]),be=s.useCallback(t=>{const i=Array.isArray(t)?t[0]:t,a=i.props,{beforeUpload:e,accept:w}=a,r=Oe(a,["beforeUpload","accept"]);return Object.assign(Object.assign({},i),{props:Object.assign(Object.assign({},r),{accept:w||"image/*",beforeUpload:pe(e)})})},[pe]),ye=s.useMemo(()=>{const t={};return p!==void 0&&(t.width=p),v!==void 0&&(t.okText=v),f!==void 0&&(t.cancelText=f),t},[f,v,p]),ve=`${b}-modal${x?` ${x}`:""}`,me=(typeof window>"u"?"":window.navigator.language)==="zh-CN",we=T||(me?"编辑图片":"Edit image"),Se=J||(me?"重置":"Reset");return o.jsxs(o.Fragment,{children:[be(te),ce&&o.jsx(je,Object.assign({},U,ye,{[Fe]:!0,title:we,onCancel:le.current,onOk:de.current,wrapClassName:ve,maskClosable:!1,destroyOnClose:!0,children:o.jsx(Pe,{ref:j,cropperRef:u,zoomSlider:D,rotationSlider:$,aspectSlider:Y,showReset:V,resetBtnText:Se,modalImage:ce,aspect:E,minZoom:M,maxZoom:P,cropShape:z,showGrid:N,cropperProps:K})}))]})});export{Le as I};