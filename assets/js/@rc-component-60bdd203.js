import{e as R,g as mr,h as _e,d as T,c as Sr,j as Fr,k as zr,a as Qt,_ as Jt,f as Vr,b as te}from"./@babel-c46ce09a.js";import{r as o,a as I}from"./react-12b51ca5.js";import{r as qr}from"./react-dom-e71a48dd.js";import{c as St,b as J,m as nn,a as an,r as wr,o as jt,e as Gr,p as on,q as un,v as Le,x as hr,y as ln,z as Mr,g as yr,A as sn,B as cn,i as vn}from"./rc-util-8976b5fa.js";import{c as de}from"./classnames-3ded05b8.js";import{R as Ur}from"./rc-resize-observer-5c9960e4.js";import{C as jr}from"./rc-motion-25d44171.js";import{T as fn}from"./@ctrl-bad846bd.js";var Qr=o.createContext(null),Rr=[];function dn(e,r){var t=o.useState(function(){if(!St())return null;var h=document.createElement("div");return h}),a=R(t,1),n=a[0],i=o.useRef(!1),u=o.useContext(Qr),l=o.useState(Rr),f=R(l,2),s=f[0],g=f[1],c=u||(i.current?void 0:function(h){g(function(C){var N=[h].concat(mr(C));return N})});function y(){n.parentElement||document.body.appendChild(n),i.current=!0}function v(){var h;(h=n.parentElement)===null||h===void 0||h.removeChild(n),i.current=!1}return J(function(){return e?u?u(y):y():v(),v},[e]),J(function(){s.length&&(s.forEach(function(h){return h()}),g(Rr))},[s]),[n,c]}function gn(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}var mn="rc-util-locker-".concat(Date.now()),Dr=0;function hn(e){var r=!!e,t=o.useState(function(){return Dr+=1,"".concat(mn,"_").concat(Dr)}),a=R(t,1),n=a[0];J(function(){if(r){var i=nn(document.body).width,u=gn();an(`
html body {
  overflow-y: hidden;
  `.concat(u?"width: calc(100% - ".concat(i,"px);"):"",`
}`),n)}else wr(n);return function(){wr(n)}},[r,n])}var kr=!1;function yn(e){return typeof e=="boolean"&&(kr=e),kr}var Pr=function(r){return r===!1?!1:!St()||!r?null:typeof r=="string"?document.querySelector(r):typeof r=="function"?r():r},Jr=o.forwardRef(function(e,r){var t=e.open,a=e.autoLock,n=e.getContainer;e.debug;var i=e.autoDestroy,u=i===void 0?!0:i,l=e.children,f=o.useState(t),s=R(f,2),g=s[0],c=s[1],y=g||t;o.useEffect(function(){(u||t)&&c(t)},[t,u]);var v=o.useState(function(){return Pr(n)}),h=R(v,2),C=h[0],N=h[1];o.useEffect(function(){var U=Pr(n);N(U??null)});var E=dn(y&&!C),w=R(E,2),S=w[0],m=w[1],M=C??S;hn(a&&t&&St()&&(M===S||M===document.body));var P=null;if(l&&jt(l)&&r){var V=l;P=V.ref}var F=Gr(P,r);if(!y||!St()||C===void 0)return null;var z=M===!1||yn(),L=l;return r&&(L=o.cloneElement(l,{ref:F})),o.createElement(Qr.Provider,{value:m},z?L:qr.createPortal(L,M))});function Cn(e){var r=e.prefixCls,t=e.align,a=e.arrow,n=e.arrowPos,i=a||{},u=i.className,l=i.content,f=n.x,s=f===void 0?0:f,g=n.y,c=g===void 0?0:g,y=o.useRef();if(!t||!t.points)return null;var v={position:"absolute"};if(t.autoArrow!==!1){var h=t.points[0],C=t.points[1],N=h[0],E=h[1],w=C[0],S=C[1];N===w||!["t","b"].includes(N)?v.top=c:N==="t"?v.top=0:v.bottom=0,E===S||!["l","r"].includes(E)?v.left=s:E==="l"?v.left=0:v.right=0}return o.createElement("div",{ref:y,className:de("".concat(r,"-arrow"),u),style:v},l)}function bn(e){var r=e.prefixCls,t=e.open,a=e.zIndex,n=e.mask,i=e.motion;return n?o.createElement(jr,_e({},i,{motionAppear:!0,visible:t,removeOnLeave:!0}),function(u){var l=u.className;return o.createElement("div",{style:{zIndex:a},className:de("".concat(r,"-mask"),l)})}):null}var Sn=o.memo(function(e){var r=e.children;return r},function(e,r){return r.cache}),Nn=o.forwardRef(function(e,r){var t=e.popup,a=e.className,n=e.prefixCls,i=e.style,u=e.target,l=e.onVisibleChanged,f=e.open,s=e.keepDom,g=e.fresh,c=e.onClick,y=e.mask,v=e.arrow,h=e.arrowPos,C=e.align,N=e.motion,E=e.maskMotion,w=e.forceRender,S=e.getPopupContainer,m=e.autoDestroy,M=e.portal,P=e.zIndex,V=e.onMouseEnter,F=e.onMouseLeave,z=e.onPointerEnter,L=e.ready,U=e.offsetX,se=e.offsetY,ce=e.offsetR,re=e.offsetB,ne=e.onAlign,_=e.onPrepare,H=e.stretch,D=e.targetWidth,K=e.targetHeight,$=typeof t=="function"?t():t,ae=f||s,Z=(S==null?void 0:S.length)>0,ot=o.useState(!S||!Z),Je=R(ot,2),be=Je[0],Ke=Je[1];if(J(function(){!be&&Z&&u&&Ke(!0)},[be,Z,u]),!be)return null;var ve="auto",G={left:"-1000vw",top:"-1000vh",right:ve,bottom:ve};if(L||!f){var ie,ge=C.points,me=C.dynamicInset||((ie=C._experimental)===null||ie===void 0?void 0:ie.dynamicInset),Ze=me&&ge[0][1]==="r",ut=me&&ge[0][0]==="b";Ze?(G.right=ce,G.left=ve):(G.left=U,G.right=ve),ut?(G.bottom=re,G.top=ve):(G.top=se,G.bottom=ve)}var Q={};return H&&(H.includes("height")&&K?Q.height=K:H.includes("minHeight")&&K&&(Q.minHeight=K),H.includes("width")&&D?Q.width=D:H.includes("minWidth")&&D&&(Q.minWidth=D)),f||(Q.pointerEvents="none"),o.createElement(M,{open:w||ae,getContainer:S&&function(){return S(u)},autoDestroy:m},o.createElement(bn,{prefixCls:n,open:f,zIndex:P,mask:y,motion:E}),o.createElement(Ur,{onResize:ne,disabled:!f},function(Xe){return o.createElement(jr,_e({motionAppear:!0,motionEnter:!0,motionLeave:!0,removeOnLeave:!1,forceRender:w,leavedClassName:"".concat(n,"-hidden")},N,{onAppearPrepare:_,onEnterPrepare:_,visible:f,onVisibleChanged:function(O){var Se;N==null||(Se=N.onVisibleChanged)===null||Se===void 0||Se.call(N,O),l(O)}}),function(Re,O){var Se=Re.className,x=Re.style,Be=de(n,Se,a);return o.createElement("div",{ref:on(Xe,r,O),className:Be,style:T(T(T(T({"--arrow-x":"".concat(h.x||0,"px"),"--arrow-y":"".concat(h.y||0,"px")},G),Q),x),{},{boxSizing:"border-box",zIndex:P},i),onMouseEnter:V,onMouseLeave:F,onPointerEnter:z,onClick:c},v&&o.createElement(Cn,{prefixCls:n,arrow:v,arrowPos:h,align:C}),o.createElement(Sn,{cache:!f&&!g},$))})}))}),En=o.forwardRef(function(e,r){var t=e.children,a=e.getTriggerDOMNode,n=jt(t),i=o.useCallback(function(l){un(r,a?a(l):l)},[a]),u=Gr(i,t.ref);return n?o.cloneElement(t,{ref:u}):t}),xr=o.createContext(null);function Ir(e){return e?Array.isArray(e)?e:[e]:[]}function wn(e,r,t,a){return o.useMemo(function(){var n=Ir(t??r),i=Ir(a??r),u=new Set(n),l=new Set(i);return e&&(u.has("hover")&&(u.delete("hover"),u.add("click")),l.has("hover")&&(l.delete("hover"),l.add("click"))),[u,l]},[e,r,t,a])}function Mn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],t=arguments.length>2?arguments[2]:void 0;return t?e[0]===r[0]:e[0]===r[0]&&e[1]===r[1]}function Rn(e,r,t,a){for(var n=t.points,i=Object.keys(e),u=0;u<i.length;u+=1){var l,f=i[u];if(Mn((l=e[f])===null||l===void 0?void 0:l.points,n,a))return"".concat(r,"-placement-").concat(f)}return""}function $r(e,r,t,a){return r||(t?{motionName:"".concat(e,"-").concat(t)}:a?{motionName:a}:null)}function Et(e){return e.ownerDocument.defaultView}function Cr(e){for(var r=[],t=e==null?void 0:e.parentElement,a=["hidden","scroll","clip","auto"];t;){var n=Et(t).getComputedStyle(t),i=n.overflowX,u=n.overflowY,l=n.overflow;[i,u,l].some(function(f){return a.includes(f)})&&r.push(t),t=t.parentElement}return r}function Nt(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;return Number.isNaN(e)?r:e}function yt(e){return Nt(parseFloat(e),0)}function Tr(e,r){var t=T({},e);return(r||[]).forEach(function(a){if(!(a instanceof HTMLBodyElement||a instanceof HTMLHtmlElement)){var n=Et(a).getComputedStyle(a),i=n.overflow,u=n.overflowClipMargin,l=n.borderTopWidth,f=n.borderBottomWidth,s=n.borderLeftWidth,g=n.borderRightWidth,c=a.getBoundingClientRect(),y=a.offsetHeight,v=a.clientHeight,h=a.offsetWidth,C=a.clientWidth,N=yt(l),E=yt(f),w=yt(s),S=yt(g),m=Nt(Math.round(c.width/h*1e3)/1e3),M=Nt(Math.round(c.height/y*1e3)/1e3),P=(h-C-w-S)*m,V=(y-v-N-E)*M,F=N*M,z=E*M,L=w*m,U=S*m,se=0,ce=0;if(i==="clip"){var re=yt(u);se=re*m,ce=re*M}var ne=c.x+L-se,_=c.y+F-ce,H=ne+c.width+2*se-L-U-P,D=_+c.height+2*ce-F-z-V;t.left=Math.max(t.left,ne),t.top=Math.max(t.top,_),t.right=Math.min(t.right,H),t.bottom=Math.min(t.bottom,D)}}),t}function Lr(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,t="".concat(r),a=t.match(/^(.*)\%$/);return a?e*(parseFloat(a[1])/100):parseFloat(t)}function _r(e,r){var t=r||[],a=R(t,2),n=a[0],i=a[1];return[Lr(e.width,n),Lr(e.height,i)]}function Hr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return[e[0],e[1]]}function it(e,r){var t=r[0],a=r[1],n,i;return t==="t"?i=e.y:t==="b"?i=e.y+e.height:i=e.y+e.height/2,a==="l"?n=e.x:a==="r"?n=e.x+e.width:n=e.x+e.width/2,{x:n,y:i}}function Te(e,r){var t={t:"b",b:"t",l:"r",r:"l"};return e.map(function(a,n){return n===r?t[a]||"c":a}).join("")}function Dn(e,r,t,a,n,i,u){var l=o.useState({ready:!1,offsetX:0,offsetY:0,offsetR:0,offsetB:0,arrowX:0,arrowY:0,scaleX:1,scaleY:1,align:n[a]||{}}),f=R(l,2),s=f[0],g=f[1],c=o.useRef(0),y=o.useMemo(function(){return r?Cr(r):[]},[r]),v=o.useRef({}),h=function(){v.current={}};e||h();var C=Le(function(){if(r&&t&&e){let le=function(Me,Qe){var nt=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Be,at=$.x+Me,mt=$.y+Qe,ht=at+ie,qt=mt+G,sr=Math.max(at,nt.left),cr=Math.max(mt,nt.top),vr=Math.min(ht,nt.right),fr=Math.min(qt,nt.bottom);return Math.max(0,(vr-sr)*(fr-cr))},Vt=function(){Pe=$.y+k,xe=Pe+G,Ie=$.x+W,pe=Ie+ie};var w,S,m=r,M=m.ownerDocument,P=Et(m),V=P.getComputedStyle(m),F=V.width,z=V.height,L=V.position,U=m.style.left,se=m.style.top,ce=m.style.right,re=m.style.bottom,ne=m.style.overflow,_=T(T({},n[a]),i),H=M.createElement("div");(w=m.parentElement)===null||w===void 0||w.appendChild(H),H.style.left="".concat(m.offsetLeft,"px"),H.style.top="".concat(m.offsetTop,"px"),H.style.position=L,H.style.height="".concat(m.offsetHeight,"px"),H.style.width="".concat(m.offsetWidth,"px"),m.style.left="0",m.style.top="0",m.style.right="auto",m.style.bottom="auto",m.style.overflow="hidden";var D;if(Array.isArray(t))D={x:t[0],y:t[1],width:0,height:0};else{var K=t.getBoundingClientRect();D={x:K.x,y:K.y,width:K.width,height:K.height}}var $=m.getBoundingClientRect(),ae=M.documentElement,Z=ae.clientWidth,ot=ae.clientHeight,Je=ae.scrollWidth,be=ae.scrollHeight,Ke=ae.scrollTop,ve=ae.scrollLeft,G=$.height,ie=$.width,ge=D.height,me=D.width,Ze={left:0,top:0,right:Z,bottom:ot},ut={left:-ve,top:-Ke,right:Je-ve,bottom:be-Ke},Q=_.htmlRegion,Xe="visible",Re="visibleFirst";Q!=="scroll"&&Q!==Re&&(Q=Xe);var O=Q===Re,Se=Tr(ut,y),x=Tr(Ze,y),Be=Q===Xe?x:Se,oe=O?x:Be;m.style.left="auto",m.style.top="auto",m.style.right="0",m.style.bottom="0";var wt=m.getBoundingClientRect();m.style.left=U,m.style.top=se,m.style.right=ce,m.style.bottom=re,m.style.overflow=ne,(S=m.parentElement)===null||S===void 0||S.removeChild(H);var Ae=Nt(Math.round(ie/parseFloat(F)*1e3)/1e3),We=Nt(Math.round(G/parseFloat(z)*1e3)/1e3);if(Ae===0||We===0||hr(t)&&!ln(t))return;var Mt=_.offset,X=_.targetOffset,Kt=_r($,Mt),Rt=R(Kt,2),fe=Rt[0],ue=Rt[1],he=_r(D,X),Dt=R(he,2),kt=Dt[0],Zt=Dt[1];D.x-=kt,D.y-=Zt;var Ye=_.points||[],p=R(Ye,2),De=p[0],Xt=p[1],Ne=Hr(Xt),ee=Hr(De),Pt=it(D,Ne),lt=it($,ee),ke=T({},_),W=Pt.x-lt.x+fe,k=Pt.y-lt.y+ue,ye=le(W,k),Ce=le(W,k,x),Fe=it(D,["t","l"]),st=it($,["t","l"]),ct=it(D,["b","r"]),vt=it($,["b","r"]),Y=_.overflow||{},Yt=Y.adjustX,xt=Y.adjustY,Oe=Y.shiftX,ft=Y.shiftY,It=function(Qe){return typeof Qe=="boolean"?Qe:Qe>=0},Pe,xe,Ie,pe;Vt();var dt=It(xt),gt=ee[0]===Ne[0];if(dt&&ee[0]==="t"&&(xe>oe.bottom||v.current.bt)){var ze=k;gt?ze-=G-ge:ze=Fe.y-vt.y-ue;var Ve=le(W,ze),Ot=le(W,ze,x);Ve>ye||Ve===ye&&(!O||Ot>=Ce)?(v.current.bt=!0,k=ze,ue=-ue,ke.points=[Te(ee,0),Te(Ne,0)]):v.current.bt=!1}if(dt&&ee[0]==="b"&&(Pe<oe.top||v.current.tb)){var j=k;gt?j+=G-ge:j=ct.y-st.y-ue;var $t=le(W,j),pt=le(W,j,x);$t>ye||$t===ye&&(!O||pt>=Ce)?(v.current.tb=!0,k=j,ue=-ue,ke.points=[Te(ee,0),Te(Ne,0)]):v.current.tb=!1}var Tt=It(Yt),Lt=ee[1]===Ne[1];if(Tt&&ee[1]==="l"&&(pe>oe.right||v.current.rl)){var qe=W;Lt?qe-=ie-me:qe=Fe.x-vt.x-fe;var _t=le(qe,k),er=le(qe,k,x);_t>ye||_t===ye&&(!O||er>=Ce)?(v.current.rl=!0,W=qe,fe=-fe,ke.points=[Te(ee,1),Te(Ne,1)]):v.current.rl=!1}if(Tt&&ee[1]==="r"&&(Ie<oe.left||v.current.lr)){var Ge=W;Lt?Ge+=ie-me:Ge=ct.x-st.x-fe;var Ht=le(Ge,k),et=le(Ge,k,x);Ht>ye||Ht===ye&&(!O||et>=Ce)?(v.current.lr=!0,W=Ge,fe=-fe,ke.points=[Te(ee,1),Te(Ne,1)]):v.current.lr=!1}Vt();var Ee=Oe===!0?0:Oe;typeof Ee=="number"&&(Ie<x.left&&(W-=Ie-x.left-fe,D.x+me<x.left+Ee&&(W+=D.x-x.left+me-Ee)),pe>x.right&&(W-=pe-x.right-fe,D.x>x.right-Ee&&(W+=D.x-x.right+Ee)));var Ue=ft===!0?0:ft;typeof Ue=="number"&&(Pe<x.top&&(k-=Pe-x.top-ue,D.y+ge<x.top+Ue&&(k+=D.y-x.top+ge-Ue)),xe>x.bottom&&(k-=xe-x.bottom-ue,D.y>x.bottom-Ue&&(k+=D.y-x.bottom+Ue)));var tt=$.x+W,rt=tt+ie,we=$.y+k,Bt=we+G,je=D.x,$e=je+me,At=D.y,tr=At+ge,rr=Math.max(tt,je),Wt=Math.min(rt,$e),nr=(rr+Wt)/2,ar=nr-tt,ir=Math.max(we,At),Ft=Math.min(Bt,tr),or=(ir+Ft)/2,ur=or-we;u==null||u(r,ke);var zt=wt.right-$.x-(W+$.width),lr=wt.bottom-$.y-(k+$.height);g({ready:!0,offsetX:W/Ae,offsetY:k/We,offsetR:zt/Ae,offsetB:lr/We,arrowX:ar/Ae,arrowY:ur/We,scaleX:Ae,scaleY:We,align:ke})}}),N=function(){c.current+=1;var S=c.current;Promise.resolve().then(function(){c.current===S&&C()})},E=function(){g(function(S){return T(T({},S),{},{ready:!1})})};return J(E,[a]),J(function(){e||E()},[e]),[s.ready,s.offsetX,s.offsetY,s.offsetR,s.offsetB,s.arrowX,s.arrowY,s.scaleX,s.scaleY,s.align,N]}function kn(e,r,t,a,n){J(function(){if(e&&r&&t){let c=function(){a(),n()};var i=r,u=t,l=Cr(i),f=Cr(u),s=Et(u),g=new Set([s].concat(mr(l),mr(f)));return g.forEach(function(y){y.addEventListener("scroll",c,{passive:!0})}),s.addEventListener("resize",c,{passive:!0}),a(),function(){g.forEach(function(y){y.removeEventListener("scroll",c),s.removeEventListener("resize",c)})}}},[e,r,t])}function Pn(e,r,t,a,n,i,u,l){var f=o.useRef(e),s=o.useRef(!1);f.current!==e&&(s.current=!0,f.current=e),o.useEffect(function(){var g=Mr(function(){s.current=!1});return function(){Mr.cancel(g)}},[e]),o.useEffect(function(){if(r&&a&&(!n||i)){var g=function(){var P=!1,V=function(L){var U=L.target;P=u(U)},F=function(L){var U=L.target;!s.current&&f.current&&!P&&!u(U)&&l(!1)};return[V,F]},c=g(),y=R(c,2),v=y[0],h=y[1],C=g(),N=R(C,2),E=N[0],w=N[1],S=Et(a);S.addEventListener("mousedown",v,!0),S.addEventListener("click",h,!0),S.addEventListener("contextmenu",h,!0);var m=yr(t);return m&&(m.addEventListener("mousedown",E,!0),m.addEventListener("click",w,!0),m.addEventListener("contextmenu",w,!0)),function(){S.removeEventListener("mousedown",v,!0),S.removeEventListener("click",h,!0),S.removeEventListener("contextmenu",h,!0),m&&(m.removeEventListener("mousedown",E,!0),m.removeEventListener("click",w,!0),m.removeEventListener("contextmenu",w,!0))}}},[r,t,a,n,i])}var xn=["prefixCls","children","action","showAction","hideAction","popupVisible","defaultPopupVisible","onPopupVisibleChange","afterPopupVisibleChange","mouseEnterDelay","mouseLeaveDelay","focusDelay","blurDelay","mask","maskClosable","getPopupContainer","forceRender","autoDestroy","destroyPopupOnHide","popup","popupClassName","popupStyle","popupPlacement","builtinPlacements","popupAlign","zIndex","stretch","getPopupClassNameFromAlign","fresh","alignPoint","onPopupClick","onPopupAlign","arrow","popupMotion","maskMotion","popupTransitionName","popupAnimation","maskTransitionName","maskAnimation","className","getTriggerDOMNode"];function In(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Jr,r=o.forwardRef(function(t,a){var n=t.prefixCls,i=n===void 0?"rc-trigger-popup":n,u=t.children,l=t.action,f=l===void 0?"hover":l,s=t.showAction,g=t.hideAction,c=t.popupVisible,y=t.defaultPopupVisible,v=t.onPopupVisibleChange,h=t.afterPopupVisibleChange,C=t.mouseEnterDelay,N=t.mouseLeaveDelay,E=N===void 0?.1:N,w=t.focusDelay,S=t.blurDelay,m=t.mask,M=t.maskClosable,P=M===void 0?!0:M,V=t.getPopupContainer,F=t.forceRender,z=t.autoDestroy,L=t.destroyPopupOnHide,U=t.popup,se=t.popupClassName,ce=t.popupStyle,re=t.popupPlacement,ne=t.builtinPlacements,_=ne===void 0?{}:ne,H=t.popupAlign,D=t.zIndex,K=t.stretch,$=t.getPopupClassNameFromAlign,ae=t.fresh,Z=t.alignPoint,ot=t.onPopupClick,Je=t.onPopupAlign,be=t.arrow,Ke=t.popupMotion,ve=t.maskMotion,G=t.popupTransitionName,ie=t.popupAnimation,ge=t.maskTransitionName,me=t.maskAnimation,Ze=t.className,ut=t.getTriggerDOMNode,Q=Sr(t,xn),Xe=z||L||!1,Re=o.useState(!1),O=R(Re,2),Se=O[0],x=O[1];J(function(){x(sn())},[]);var Be=o.useRef({}),oe=o.useContext(xr),wt=o.useMemo(function(){return{registerSubPopup:function(b,B){Be.current[b]=B,oe==null||oe.registerSubPopup(b,B)}}},[oe]),Ae=cn(),We=o.useState(null),Mt=R(We,2),X=Mt[0],Kt=Mt[1],Rt=Le(function(d){hr(d)&&X!==d&&Kt(d),oe==null||oe.registerSubPopup(Ae,d)}),fe=o.useState(null),ue=R(fe,2),he=ue[0],Dt=ue[1],kt=o.useRef(null),Zt=Le(function(d){hr(d)&&he!==d&&(Dt(d),kt.current=d)}),Ye=o.Children.only(u),p=(Ye==null?void 0:Ye.props)||{},De={},Xt=Le(function(d){var b,B,q=he;return(q==null?void 0:q.contains(d))||((b=yr(q))===null||b===void 0?void 0:b.host)===d||d===q||(X==null?void 0:X.contains(d))||((B=yr(X))===null||B===void 0?void 0:B.host)===d||d===X||Object.values(Be.current).some(function(A){return(A==null?void 0:A.contains(d))||d===A})}),Ne=$r(i,Ke,ie,G),ee=$r(i,ve,me,ge),Pt=o.useState(y||!1),lt=R(Pt,2),ke=lt[0],W=lt[1],k=c??ke,ye=Le(function(d){c===void 0&&W(d)});J(function(){W(c||!1)},[c]);var Ce=o.useRef(k);Ce.current=k;var Fe=o.useRef([]);Fe.current=[];var st=Le(function(d){var b;ye(d),((b=Fe.current[Fe.current.length-1])!==null&&b!==void 0?b:k)!==d&&(Fe.current.push(d),v==null||v(d))}),ct=o.useRef(),vt=function(){clearTimeout(ct.current)},Y=function(b){var B=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;vt(),B===0?st(b):ct.current=setTimeout(function(){st(b)},B*1e3)};o.useEffect(function(){return vt},[]);var Yt=o.useState(!1),xt=R(Yt,2),Oe=xt[0],ft=xt[1];J(function(d){(!d||k)&&ft(!0)},[k]);var It=o.useState(null),Pe=R(It,2),xe=Pe[0],Ie=Pe[1],pe=o.useState([0,0]),dt=R(pe,2),gt=dt[0],ze=dt[1],Ve=function(b){ze([b.clientX,b.clientY])},Ot=Dn(k,X,Z?gt:he,re,_,H,Je),j=R(Ot,11),$t=j[0],pt=j[1],Tt=j[2],Lt=j[3],qe=j[4],_t=j[5],er=j[6],Ge=j[7],Ht=j[8],et=j[9],Ee=j[10],Ue=wn(Se,f,s,g),tt=R(Ue,2),rt=tt[0],we=tt[1],Bt=rt.has("click"),je=we.has("click")||we.has("contextMenu"),$e=Le(function(){Oe||Ee()}),At=function(){Ce.current&&Z&&je&&Y(!1)};kn(k,he,X,$e,At),J(function(){$e()},[gt,re]),J(function(){k&&!(_!=null&&_[re])&&$e()},[JSON.stringify(H)]);var tr=o.useMemo(function(){var d=Rn(_,i,et,Z);return de(d,$==null?void 0:$(et))},[et,$,_,i,Z]);o.useImperativeHandle(a,function(){return{nativeElement:kt.current,forceAlign:$e}});var rr=o.useState(0),Wt=R(rr,2),nr=Wt[0],ar=Wt[1],ir=o.useState(0),Ft=R(ir,2),or=Ft[0],ur=Ft[1],zt=function(){if(K&&he){var b=he.getBoundingClientRect();ar(b.width),ur(b.height)}},lr=function(){zt(),$e()},le=function(b){ft(!1),Ee(),h==null||h(b)},Vt=function(){return new Promise(function(b){zt(),Ie(function(){return b})})};J(function(){xe&&(Ee(),xe(),Ie(null))},[xe]);function Me(d,b,B,q){De[d]=function(A){var Gt;q==null||q(A),Y(b,B);for(var dr=arguments.length,Er=new Array(dr>1?dr-1:0),Ut=1;Ut<dr;Ut++)Er[Ut-1]=arguments[Ut];(Gt=p[d])===null||Gt===void 0||Gt.call.apply(Gt,[p,A].concat(Er))}}(Bt||je)&&(De.onClick=function(d){var b;Ce.current&&je?Y(!1):!Ce.current&&Bt&&(Ve(d),Y(!0));for(var B=arguments.length,q=new Array(B>1?B-1:0),A=1;A<B;A++)q[A-1]=arguments[A];(b=p.onClick)===null||b===void 0||b.call.apply(b,[p,d].concat(q))}),Pn(k,je,he,X,m,P,Xt,Y);var Qe=rt.has("hover"),nt=we.has("hover"),at,mt;Qe&&(Me("onMouseEnter",!0,C,function(d){Ve(d)}),Me("onPointerEnter",!0,C,function(d){Ve(d)}),at=function(b){(k||Oe)&&X!==null&&X!==void 0&&X.contains(b.target)&&Y(!0,C)},Z&&(De.onMouseMove=function(d){var b;(b=p.onMouseMove)===null||b===void 0||b.call(p,d)})),nt&&(Me("onMouseLeave",!1,E),Me("onPointerLeave",!1,E),mt=function(){Y(!1,E)}),rt.has("focus")&&Me("onFocus",!0,w),we.has("focus")&&Me("onBlur",!1,S),rt.has("contextMenu")&&(De.onContextMenu=function(d){var b;Ce.current&&we.has("contextMenu")?Y(!1):(Ve(d),Y(!0)),d.preventDefault();for(var B=arguments.length,q=new Array(B>1?B-1:0),A=1;A<B;A++)q[A-1]=arguments[A];(b=p.onContextMenu)===null||b===void 0||b.call.apply(b,[p,d].concat(q))}),Ze&&(De.className=de(p.className,Ze));var ht=T(T({},p),De),qt={},sr=["onContextMenu","onClick","onMouseDown","onTouchStart","onMouseEnter","onMouseLeave","onFocus","onBlur"];sr.forEach(function(d){Q[d]&&(qt[d]=function(){for(var b,B=arguments.length,q=new Array(B),A=0;A<B;A++)q[A]=arguments[A];(b=ht[d])===null||b===void 0||b.call.apply(b,[ht].concat(q)),Q[d].apply(Q,q)})});var cr=o.cloneElement(Ye,T(T({},ht),qt)),vr={x:_t,y:er},fr=be?T({},be!==!0?be:{}):null;return o.createElement(o.Fragment,null,o.createElement(Ur,{disabled:!k,ref:Zt,onResize:lr},o.createElement(En,{getTriggerDOMNode:ut},cr)),o.createElement(xr.Provider,{value:wt},o.createElement(Nn,{portal:e,ref:Rt,prefixCls:i,popup:U,className:de(se,tr),style:ce,target:he,onMouseEnter:at,onMouseLeave:mt,onPointerEnter:at,zIndex:D,open:k,keepDom:Oe,fresh:ae,onClick:ot,mask:m,motion:Ne,maskMotion:ee,onVisibleChanged:le,onPrepare:Vt,forceRender:F,autoDestroy:Xe,getPopupContainer:V,align:et,arrow:fr,arrowPos:vr,ready:$t,offsetX:pt,offsetY:Tt,offsetR:Lt,offsetB:qe,onAlign:$e,stretch:K,targetWidth:nr/Ge,targetHeight:or/Ht})))});return r}const ta=In(Jr);var $n=["b"],Tn=["v"],gr=function(r){return Math.round(Number(r||0))},Ln=function(r){if(r&&Vr(r)==="object"&&"h"in r&&"b"in r){var t=r,a=t.b,n=Sr(t,$n);return T(T({},n),{},{v:a})}return typeof r=="string"&&/hsb/.test(r)?r.replace(/hsb/,"hsv"):r},Br=function(e){Fr(t,e);var r=zr(t);function t(a){return Qt(this,t),r.call(this,Ln(a))}return Jt(t,[{key:"toHsbString",value:function(){var n=this.toHsb(),i=gr(n.s*100),u=gr(n.b*100),l=gr(n.h),f=n.a,s="hsb(".concat(l,", ").concat(i,"%, ").concat(u,"%)"),g="hsba(".concat(l,", ").concat(i,"%, ").concat(u,"%, ").concat(f.toFixed(f===0?0:2),")");return f===1?s:g}},{key:"toHsb",value:function(){var n=this.toHsv();Vr(this.originalInput)==="object"&&this.originalInput&&"h"in this.originalInput&&(n=this.originalInput);var i=n;i.v;var u=Sr(i,Tn);return T(T({},u),{},{b:n.v})}}]),t}(fn),_n="rc-color-picker",He=function(r){return r instanceof Br?r:new Br(r)},Hn=He("#1677ff"),Kr=function(r){var t=r.offset,a=r.targetRef,n=r.containerRef,i=r.color,u=r.type,l=n.current.getBoundingClientRect(),f=l.width,s=l.height,g=a.current.getBoundingClientRect(),c=g.width,y=g.height,v=c/2,h=y/2,C=(t.x+v)/f,N=1-(t.y+h)/s,E=i.toHsb(),w=C,S=(t.x+v)/f*360;if(u)switch(u){case"hue":return He(T(T({},E),{},{h:S<=0?0:S}));case"alpha":return He(T(T({},E),{},{a:w<=0?0:w}))}return He({h:E.h,s:C<=0?0:C,b:N>=1?1:N,a:E.a})},Zr=function(r,t,a,n){var i=r.current.getBoundingClientRect(),u=i.width,l=i.height,f=t.current.getBoundingClientRect(),s=f.width,g=f.height,c=s/2,y=g/2,v=a.toHsb();if(!(s===0&&g===0||s!==g)){if(n)switch(n){case"hue":return{x:v.h/360*u-c,y:-y/3};case"alpha":return{x:v.a/1*u-c,y:-y/3}}return{x:v.s*u-c,y:(1-v.b)*l-y}}},Bn=function(r){var t=r.color,a=r.prefixCls,n=r.className,i=r.style,u=r.onClick,l="".concat(a,"-color-block");return I.createElement("div",{className:de(l,n),style:i,onClick:u},I.createElement("div",{className:"".concat(l,"-inner"),style:{background:t}}))};function An(e){var r="touches"in e?e.touches[0]:e,t=document.documentElement.scrollLeft||document.body.scrollLeft||window.pageXOffset,a=document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset;return{pageX:r.pageX-t,pageY:r.pageY-a}}function Xr(e){var r=e.offset,t=e.targetRef,a=e.containerRef,n=e.direction,i=e.onDragChange,u=e.onDragChangeComplete,l=e.calculate,f=e.color,s=e.disabledDrag,g=o.useState(r||{x:0,y:0}),c=R(g,2),y=c[0],v=c[1],h=o.useRef(null),C=o.useRef(null),N=o.useRef({flag:!1});o.useEffect(function(){if(N.current.flag===!1){var M=l==null?void 0:l(a);M&&v(M)}},[f,a]),o.useEffect(function(){return function(){document.removeEventListener("mousemove",h.current),document.removeEventListener("mouseup",C.current),document.removeEventListener("touchmove",h.current),document.removeEventListener("touchend",C.current),h.current=null,C.current=null}},[]);var E=function(P){var V=An(P),F=V.pageX,z=V.pageY,L=a.current.getBoundingClientRect(),U=L.x,se=L.y,ce=L.width,re=L.height,ne=t.current.getBoundingClientRect(),_=ne.width,H=ne.height,D=_/2,K=H/2,$=Math.max(0,Math.min(F-U,ce))-D,ae=Math.max(0,Math.min(z-se,re))-K,Z={x:$,y:n==="x"?y.y:ae};if(_===0&&H===0||_!==H)return!1;v(Z),i==null||i(Z)},w=function(P){P.preventDefault(),E(P)},S=function(P){P.preventDefault(),N.current.flag=!1,document.removeEventListener("mousemove",h.current),document.removeEventListener("mouseup",C.current),document.removeEventListener("touchmove",h.current),document.removeEventListener("touchend",C.current),h.current=null,C.current=null,u==null||u()},m=function(P){document.removeEventListener("mousemove",h.current),document.removeEventListener("mouseup",C.current),!s&&(E(P),N.current.flag=!0,document.addEventListener("mousemove",w),document.addEventListener("mouseup",S),document.addEventListener("touchmove",w),document.addEventListener("touchend",S),h.current=w,C.current=S)};return[y,m]}var Yr=function(r){var t=r.size,a=t===void 0?"default":t,n=r.color,i=r.prefixCls;return I.createElement("div",{className:de("".concat(i,"-handler"),te({},"".concat(i,"-handler-sm"),a==="small")),style:{backgroundColor:n}})},Or=function(r){var t=r.children,a=r.style,n=r.prefixCls;return I.createElement("div",{className:"".concat(n,"-palette"),style:T({position:"relative"},a)},t)},pr=o.forwardRef(function(e,r){var t=e.children,a=e.offset;return I.createElement("div",{ref:r,style:{position:"absolute",left:a.x,top:a.y,zIndex:1}},t)}),Wn=function(r){var t=r.color,a=r.onChange,n=r.prefixCls,i=r.onChangeComplete,u=r.disabled,l=o.useRef(),f=o.useRef(),s=o.useRef(t),g=Xr({color:t,containerRef:l,targetRef:f,calculate:function(C){return Zr(C,f,t)},onDragChange:function(C){var N=Kr({offset:C,targetRef:f,containerRef:l,color:t});s.current=N,a(N)},onDragChangeComplete:function(){return i==null?void 0:i(s.current)},disabledDrag:u}),c=R(g,2),y=c[0],v=c[1];return I.createElement("div",{ref:l,className:"".concat(n,"-select"),onMouseDown:v,onTouchStart:v},I.createElement(Or,{prefixCls:n},I.createElement(pr,{offset:y,ref:f},I.createElement(Yr,{color:t.toRgbString(),prefixCls:n})),I.createElement("div",{className:"".concat(n,"-saturation"),style:{backgroundColor:"hsl(".concat(t.toHsb().h,",100%, 50%)"),backgroundImage:"linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"}})))},Fn=function(r){var t=r.colors,a=r.children,n=r.direction,i=n===void 0?"to right":n,u=r.type,l=r.prefixCls,f=o.useMemo(function(){return t.map(function(s,g){var c=He(s);return u==="alpha"&&g===t.length-1&&c.setAlpha(1),c.toRgbString()}).join(",")},[t,u]);return I.createElement("div",{className:"".concat(l,"-gradient"),style:{position:"absolute",inset:0,background:"linear-gradient(".concat(i,", ").concat(f,")")}},a)},Ar=function(r){var t=r.gradientColors,a=r.direction,n=r.type,i=n===void 0?"hue":n,u=r.color,l=r.value,f=r.onChange,s=r.onChangeComplete,g=r.disabled,c=r.prefixCls,y=o.useRef(),v=o.useRef(),h=o.useRef(u),C=Xr({color:u,targetRef:v,containerRef:y,calculate:function(m){return Zr(m,v,u,i)},onDragChange:function(m){var M=Kr({offset:m,targetRef:v,containerRef:y,color:u,type:i});h.current=M,f(M)},onDragChangeComplete:function(){s==null||s(h.current,i)},direction:"x",disabledDrag:g}),N=R(C,2),E=N[0],w=N[1];return I.createElement("div",{ref:y,className:de("".concat(c,"-slider"),"".concat(c,"-slider-").concat(i)),onMouseDown:w,onTouchStart:w},I.createElement(Or,{prefixCls:c},I.createElement(pr,{offset:E,ref:v},I.createElement(Yr,{size:"small",color:l,prefixCls:c})),I.createElement(Fn,{colors:t,direction:a,type:i,prefixCls:c})))};function Wr(e){return e!==void 0}var zn=function(r,t){var a=t.defaultValue,n=t.value,i=o.useState(function(){var s;return Wr(n)?s=n:Wr(a)?s=a:s=r,He(s)}),u=R(i,2),l=u[0],f=u[1];return o.useEffect(function(){n&&f(He(n))},[n]),[l,f]},Vn=["rgb(255, 0, 0) 0%","rgb(255, 255, 0) 17%","rgb(0, 255, 0) 33%","rgb(0, 255, 255) 50%","rgb(0, 0, 255) 67%","rgb(255, 0, 255) 83%","rgb(255, 0, 0) 100%"];const ra=o.forwardRef(function(e,r){var t=e.value,a=e.defaultValue,n=e.prefixCls,i=n===void 0?_n:n,u=e.onChange,l=e.onChangeComplete,f=e.className,s=e.style,g=e.panelRender,c=e.disabledAlpha,y=c===void 0?!1:c,v=e.disabled,h=v===void 0?!1:v,C=zn(Hn,{value:t,defaultValue:a}),N=R(C,2),E=N[0],w=N[1],S=o.useMemo(function(){var F=He(E.toRgbString());return F.setAlpha(1),F.toRgbString()},[E]),m=de("".concat(i,"-panel"),f,te({},"".concat(i,"-panel-disabled"),h)),M={prefixCls:i,onChangeComplete:l,disabled:h},P=function(z,L){t||w(z),u==null||u(z,L)},V=I.createElement(I.Fragment,null,I.createElement(Wn,_e({color:E,onChange:P},M)),I.createElement("div",{className:"".concat(i,"-slider-container")},I.createElement("div",{className:de("".concat(i,"-slider-group"),te({},"".concat(i,"-slider-group-disabled-alpha"),y))},I.createElement(Ar,_e({gradientColors:Vn,color:E,value:"hsl(".concat(E.toHsb().h,",100%, 50%)"),onChange:function(z){return P(z,"hue")}},M)),!y&&I.createElement(Ar,_e({type:"alpha",gradientColors:["rgba(255, 0, 4, 0) 0%",S],color:E,value:E.toRgbString(),onChange:function(z){return P(z,"alpha")}},M))),I.createElement(Bn,{color:E.toRgbString(),prefixCls:i})));return I.createElement("div",{className:m,style:s,ref:r},typeof g=="function"?g(V):V)});function br(){return typeof BigInt=="function"}function en(e){return!e&&e!==0&&!Number.isNaN(e)||!String(e).trim()}function bt(e){var r=e.trim(),t=r.startsWith("-");t&&(r=r.slice(1)),r=r.replace(/(\.\d*[^0])0*$/,"$1").replace(/\.0*$/,"").replace(/^0+/,""),r.startsWith(".")&&(r="0".concat(r));var a=r||"0",n=a.split("."),i=n[0]||"0",u=n[1]||"0";i==="0"&&u==="0"&&(t=!1);var l=t?"-":"";return{negative:t,negativeStr:l,trimStr:a,integerStr:i,decimalStr:u,fullStr:"".concat(l).concat(a)}}function Nr(e){var r=String(e);return!Number.isNaN(Number(r))&&r.includes("e")}function Ct(e){var r=String(e);if(Nr(e)){var t=Number(r.slice(r.indexOf("e-")+2)),a=r.match(/\.(\d+)/);return a!=null&&a[1]&&(t+=a[1].length),t}return r.includes(".")&&rn(r)?r.length-r.indexOf(".")-1:0}function tn(e){var r=String(e);if(Nr(e)){if(e>Number.MAX_SAFE_INTEGER)return String(br()?BigInt(e).toString():Number.MAX_SAFE_INTEGER);if(e<Number.MIN_SAFE_INTEGER)return String(br()?BigInt(e).toString():Number.MIN_SAFE_INTEGER);r=e.toFixed(Ct(r))}return bt(r).fullStr}function rn(e){return typeof e=="number"?!Number.isNaN(e):e?/^\s*-?\d+(\.\d+)?\s*$/.test(e)||/^\s*-?\d+\.\s*$/.test(e)||/^\s*-?\.\d+\s*$/.test(e):!1}var qn=function(){function e(r){if(Qt(this,e),te(this,"origin",""),te(this,"negative",void 0),te(this,"integer",void 0),te(this,"decimal",void 0),te(this,"decimalLen",void 0),te(this,"empty",void 0),te(this,"nan",void 0),en(r)){this.empty=!0;return}if(this.origin=String(r),r==="-"||Number.isNaN(r)){this.nan=!0;return}var t=r;if(Nr(t)&&(t=Number(t)),t=typeof t=="string"?t:tn(t),rn(t)){var a=bt(t);this.negative=a.negative;var n=a.trimStr.split(".");this.integer=BigInt(n[0]);var i=n[1]||"0";this.decimal=BigInt(i),this.decimalLen=i.length}else this.nan=!0}return Jt(e,[{key:"getMark",value:function(){return this.negative?"-":""}},{key:"getIntegerStr",value:function(){return this.integer.toString()}},{key:"getDecimalStr",value:function(){return this.decimal.toString().padStart(this.decimalLen,"0")}},{key:"alignDecimal",value:function(t){var a="".concat(this.getMark()).concat(this.getIntegerStr()).concat(this.getDecimalStr().padEnd(t,"0"));return BigInt(a)}},{key:"negate",value:function(){var t=new e(this.toString());return t.negative=!t.negative,t}},{key:"cal",value:function(t,a,n){var i=Math.max(this.getDecimalStr().length,t.getDecimalStr().length),u=this.alignDecimal(i),l=t.alignDecimal(i),f=a(u,l).toString(),s=n(i),g=bt(f),c=g.negativeStr,y=g.trimStr,v="".concat(c).concat(y.padStart(s+1,"0"));return new e("".concat(v.slice(0,-s),".").concat(v.slice(-s)))}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var a=new e(t);return a.isInvalidate()?this:this.cal(a,function(n,i){return n+i},function(n){return n})}},{key:"multi",value:function(t){var a=new e(t);return this.isInvalidate()||a.isInvalidate()?new e(NaN):this.cal(a,function(n,i){return n*i},function(n){return n*2})}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return this.nan}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(t){return this.toString()===(t==null?void 0:t.toString())}},{key:"lessEquals",value:function(t){return this.add(t.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.isNaN()?NaN:Number(this.toString())}},{key:"toString",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return t?this.isInvalidate()?"":bt("".concat(this.getMark()).concat(this.getIntegerStr(),".").concat(this.getDecimalStr())).fullStr:this.origin}}]),e}(),Gn=function(){function e(r){if(Qt(this,e),te(this,"origin",""),te(this,"number",void 0),te(this,"empty",void 0),en(r)){this.empty=!0;return}this.origin=String(r),this.number=Number(r)}return Jt(e,[{key:"negate",value:function(){return new e(-this.toNumber())}},{key:"add",value:function(t){if(this.isInvalidate())return new e(t);var a=Number(t);if(Number.isNaN(a))return this;var n=this.number+a;if(n>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(n<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var i=Math.max(Ct(this.number),Ct(a));return new e(n.toFixed(i))}},{key:"multi",value:function(t){var a=Number(t);if(this.isInvalidate()||Number.isNaN(a))return new e(NaN);var n=this.number*a;if(n>Number.MAX_SAFE_INTEGER)return new e(Number.MAX_SAFE_INTEGER);if(n<Number.MIN_SAFE_INTEGER)return new e(Number.MIN_SAFE_INTEGER);var i=Math.max(Ct(this.number),Ct(a));return new e(n.toFixed(i))}},{key:"isEmpty",value:function(){return this.empty}},{key:"isNaN",value:function(){return Number.isNaN(this.number)}},{key:"isInvalidate",value:function(){return this.isEmpty()||this.isNaN()}},{key:"equals",value:function(t){return this.toNumber()===(t==null?void 0:t.toNumber())}},{key:"lessEquals",value:function(t){return this.add(t.negate().toString()).toNumber()<=0}},{key:"toNumber",value:function(){return this.number}},{key:"toString",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;return t?this.isInvalidate()?"":tn(this.number):this.origin}}]),e}();function Un(e){return br()?new qn(e):new Gn(e)}function jn(e,r,t){var a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:!1;if(e==="")return"";var n=bt(e),i=n.negativeStr,u=n.integerStr,l=n.decimalStr,f="".concat(r).concat(l),s="".concat(i).concat(u);if(t>=0){var g=Number(l[t]);if(g>=5&&!a){var c=Un(e).add("".concat(i,"0.").concat("0".repeat(t)).concat(10-g));return jn(c.toString(),r,t,a)}return t===0?s:"".concat(s).concat(r).concat(l.padEnd(t,"0").slice(0,t))}return f===".0"?s:"".concat(s).concat(f)}function na(e){var r=o.createContext(void 0),t=function(n){var i=n.value,u=n.children,l=o.useRef(i);l.current=i;var f=o.useState(function(){return{getValue:function(){return l.current},listeners:new Set}}),s=R(f,1),g=s[0];return J(function(){qr.unstable_batchedUpdates(function(){g.listeners.forEach(function(c){c(i)})})},[i]),o.createElement(r.Provider,{value:g},u)};return{Context:r,Provider:t,defaultValue:e}}function aa(e,r){var t=Le(typeof r=="function"?r:function(c){if(r===void 0)return c;if(!Array.isArray(r))return c[r];var y={};return r.forEach(function(v){y[v]=c[v]}),y}),a=o.useContext(e==null?void 0:e.Context),n=a||{},i=n.listeners,u=n.getValue,l=o.useRef();l.current=t(a?u():e==null?void 0:e.defaultValue);var f=o.useState({}),s=R(f,2),g=s[1];return J(function(){if(!a)return;function c(y){var v=t(y);vn(l.current,v,!0)||g({})}return i.add(c),function(){i.delete(c)}},[a]),l.current}function ia(){var e=o.createContext(null);function r(){return o.useContext(e)}function t(n,i){var u=jt(n),l=function(s,g){var c=u?{ref:g}:{},y=o.useRef(0),v=o.useRef(s),h=r();return h!==null?o.createElement(n,_e({},s,c)):((!i||i(v.current,s))&&(y.current+=1),v.current=s,o.createElement(e.Provider,{value:y.current},o.createElement(n,_e({},s,c))))};return u?o.forwardRef(l):l}function a(n,i){var u=jt(n),l=function(s,g){var c=u?{ref:g}:{};return r(),o.createElement(n,_e({},s,c))};return u?o.memo(o.forwardRef(l),i):o.memo(l,i)}return{makeImmutable:t,responseImmutable:a,useImmutableMark:r}}I.Component;var Qn={subtree:!0,childList:!0,attributeFilter:["style","class"]};function oa(e,r){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Qn;o.useEffect(function(){if(!(!St()||!e)){var a,n=Array.isArray(e)?e:[e];return"MutationObserver"in window&&(a=new MutationObserver(r),n.forEach(function(i){a.observe(i,t)})),function(){var i,u;(i=a)===null||i===void 0||i.takeRecords(),(u=a)===null||u===void 0||u.disconnect()}}},[t,e])}export{Br as C,Jr as P,ta as T,ra as a,Bn as b,Ct as c,jn as d,ia as e,na as f,Un as g,aa as h,tn as n,bt as t,oa as u,rn as v};