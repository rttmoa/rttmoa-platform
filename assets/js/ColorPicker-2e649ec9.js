import{a as d,o as U,p as j,q as T,_ as ae,t as Q,bf as Ct,K as Ee,aI as Te,n as Z,bc as bt,bb as fe,bd as xt,r as v,aJ as me,w as _e,x as ze,E as O,cz as $t,y as yt,av as St,bi as Ve,cb as Pt,ba as Ie,bs as Et,aL as Re,cu as It,cv as Rt,cw as Le,cy as We,v as V,bo as wt,cM as Xe,aa as Ot,V as Nt,b2 as Ht,bp as kt,D as jt,bk as At,bj as Mt,bl as Dt,cd as Bt,b9 as Tt,dt as _t,k as zt}from"./index-f08e2d74.js";import{S as Vt}from"./index-9f58716a.js";var Fe=d.forwardRef(function(t,e){var n,r=t.prefixCls,o=t.forceRender,a=t.className,i=t.style,s=t.children,l=t.isActive,u=t.role,f=d.useState(l||o),c=U(f,2),g=c[0],m=c[1];return d.useEffect(function(){(o||l)&&m(!0)},[o,l]),g?d.createElement("div",{ref:e,className:j("".concat(r,"-content"),(n={},T(n,"".concat(r,"-content-active"),l),T(n,"".concat(r,"-content-inactive"),!l),n),a),style:i,role:u},d.createElement("div",{className:"".concat(r,"-content-box")},s)):null});Fe.displayName="PanelContent";var Lt=["showArrow","headerClass","isActive","onItemClick","forceRender","className","prefixCls","collapsible","accordion","panelKey","extra","header","expandIcon","openMotion","destroyInactivePanel","children"],Ke=d.forwardRef(function(t,e){var n,r,o=t.showArrow,a=o===void 0?!0:o,i=t.headerClass,s=t.isActive,l=t.onItemClick,u=t.forceRender,f=t.className,c=t.prefixCls,g=t.collapsible,m=t.accordion,h=t.panelKey,p=t.extra,C=t.header,b=t.expandIcon,S=t.openMotion,P=t.destroyInactivePanel,x=t.children,y=ae(t,Lt),$=g==="disabled",R=g==="header",E=g==="icon",w=p!=null&&typeof p!="boolean",I=function(){l==null||l(h)},N=function(k){(k.key==="Enter"||k.keyCode===Ee.ENTER||k.which===Ee.ENTER)&&I()},H=typeof b=="function"?b(t):d.createElement("i",{className:"arrow"});H&&(H=d.createElement("div",{className:"".concat(c,"-expand-icon"),onClick:["header","icon"].includes(g)?I:void 0},H));var M=j((n={},T(n,"".concat(c,"-item"),!0),T(n,"".concat(c,"-item-active"),s),T(n,"".concat(c,"-item-disabled"),$),n),f),_=j(i,(r={},T(r,"".concat(c,"-header"),!0),T(r,"".concat(c,"-header-collapsible-only"),R),T(r,"".concat(c,"-icon-collapsible-only"),E),r)),B={className:_,"aria-expanded":s,"aria-disabled":$,onKeyDown:N};return!R&&!E&&(B.onClick=I,B.role=m?"tab":"button",B.tabIndex=$?-1:0),d.createElement("div",Q({},y,{ref:e,className:M}),d.createElement("div",B,a&&H,d.createElement("span",{className:"".concat(c,"-header-text"),onClick:g==="header"?I:void 0},C),w&&d.createElement("div",{className:"".concat(c,"-extra")},p)),d.createElement(Ct,Q({visible:s,leavedClassName:"".concat(c,"-content-hidden")},S,{forceRender:u,removeOnLeave:P}),function(D,k){var q=D.className,W=D.style;return d.createElement(Fe,{ref:k,prefixCls:c,className:q,style:W,isActive:s,forceRender:u,role:m?"tabpanel":void 0},x)}))}),Wt=["children","label","key","collapsible","onItemClick","destroyInactivePanel"],Xt=function(e,n){var r=n.prefixCls,o=n.accordion,a=n.collapsible,i=n.destroyInactivePanel,s=n.onItemClick,l=n.activeKey,u=n.openMotion,f=n.expandIcon;return e.map(function(c,g){var m=c.children,h=c.label,p=c.key,C=c.collapsible,b=c.onItemClick,S=c.destroyInactivePanel,P=ae(c,Wt),x=String(p??g),y=C??a,$=S??i,R=function(I){y!=="disabled"&&(s(I),b==null||b(I))},E=!1;return o?E=l[0]===x:E=l.indexOf(x)>-1,d.createElement(Ke,Q({},P,{prefixCls:r,key:x,panelKey:x,isActive:E,accordion:o,openMotion:u,expandIcon:f,header:h,collapsible:y,onItemClick:R,destroyInactivePanel:$}),m)})},Ft=function(e,n,r){if(!e)return null;var o=r.prefixCls,a=r.accordion,i=r.collapsible,s=r.destroyInactivePanel,l=r.onItemClick,u=r.activeKey,f=r.openMotion,c=r.expandIcon,g=e.key||String(n),m=e.props,h=m.header,p=m.headerClass,C=m.destroyInactivePanel,b=m.collapsible,S=m.onItemClick,P=!1;a?P=u[0]===g:P=u.indexOf(g)>-1;var x=b??i,y=function(E){x!=="disabled"&&(l(E),S==null||S(E))},$={key:g,panelKey:g,header:h,headerClass:p,isActive:P,prefixCls:o,destroyInactivePanel:C??s,openMotion:f,accordion:a,children:e.props.children,onItemClick:y,expandIcon:c,collapsible:x};return typeof e.type=="string"?e:(Object.keys($).forEach(function(R){typeof $[R]>"u"&&delete $[R]}),d.cloneElement(e,$))};function Kt(t,e,n){return Array.isArray(t)?Xt(t,n):Te(e).map(function(r,o){return Ft(r,o,n)})}function qt(t){var e=t;if(!Array.isArray(e)){var n=fe(e);e=n==="number"||n==="string"?[e]:[]}return e.map(function(r){return String(r)})}var Gt=d.forwardRef(function(t,e){var n=t.prefixCls,r=n===void 0?"rc-collapse":n,o=t.destroyInactivePanel,a=o===void 0?!1:o,i=t.style,s=t.accordion,l=t.className,u=t.children,f=t.collapsible,c=t.openMotion,g=t.expandIcon,m=t.activeKey,h=t.defaultActiveKey,p=t.onChange,C=t.items,b=j(r,l),S=Z([],{value:m,onChange:function(w){return p==null?void 0:p(w)},defaultValue:h,postState:qt}),P=U(S,2),x=P[0],y=P[1],$=function(w){return y(function(){if(s)return x[0]===w?[]:[w];var I=x.indexOf(w),N=I>-1;return N?x.filter(function(H){return H!==w}):[].concat(xt(x),[w])})};bt(!u,"[rc-collapse] `children` will be removed in next major version. Please use `items` instead.");var R=Kt(C,u,{prefixCls:r,accordion:s,openMotion:c,expandIcon:g,collapsible:f,destroyInactivePanel:a,onItemClick:$,activeKey:x});return d.createElement("div",{ref:e,className:b,style:i,role:s?"tablist":void 0},R)});const he=Object.assign(Gt,{Panel:Ke});he.Panel;const Yt=v.forwardRef((t,e)=>{const{getPrefixCls:n}=v.useContext(me),{prefixCls:r,className:o,showArrow:a=!0}=t,i=n("collapse",r),s=j({[`${i}-no-arrow`]:!a},o);return v.createElement(he.Panel,Object.assign({ref:e},t,{prefixCls:i,className:s}))}),Ut=Yt,Qt=t=>{const{componentCls:e,contentBg:n,padding:r,headerBg:o,headerPadding:a,collapseHeaderPaddingSM:i,collapseHeaderPaddingLG:s,collapsePanelBorderRadius:l,lineWidth:u,lineType:f,colorBorder:c,colorText:g,colorTextHeading:m,colorTextDisabled:h,fontSizeLG:p,lineHeight:C,lineHeightLG:b,marginSM:S,paddingSM:P,paddingLG:x,paddingXS:y,motionDurationSlow:$,fontSizeIcon:R,contentPadding:E,fontHeight:w,fontHeightLG:I}=t,N=`${O(u)} ${f} ${c}`;return{[e]:Object.assign(Object.assign({},yt(t)),{backgroundColor:o,border:N,borderBottom:0,borderRadius:l,"&-rtl":{direction:"rtl"},[`& > ${e}-item`]:{borderBottom:N,"&:last-child":{[`
            &,
            & > ${e}-header`]:{borderRadius:`0 0 ${O(l)} ${O(l)}`}},[`> ${e}-header`]:{position:"relative",display:"flex",flexWrap:"nowrap",alignItems:"flex-start",padding:a,color:m,lineHeight:C,cursor:"pointer",transition:`all ${$}, visibility 0s`,[`> ${e}-header-text`]:{flex:"auto"},"&:focus":{outline:"none"},[`${e}-expand-icon`]:{height:w,display:"flex",alignItems:"center",paddingInlineEnd:S},[`${e}-arrow`]:Object.assign(Object.assign({},St()),{fontSize:R,svg:{transition:`transform ${$}`}}),[`${e}-header-text`]:{marginInlineEnd:"auto"}},[`${e}-icon-collapsible-only`]:{cursor:"unset",[`${e}-expand-icon`]:{cursor:"pointer"}}},[`${e}-content`]:{color:g,backgroundColor:n,borderTop:N,[`& > ${e}-content-box`]:{padding:E},"&-hidden":{display:"none"}},"&-small":{[`> ${e}-item`]:{[`> ${e}-header`]:{padding:i,paddingInlineStart:y,[`> ${e}-expand-icon`]:{marginInlineStart:t.calc(P).sub(y).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:P}}},"&-large":{[`> ${e}-item`]:{fontSize:p,lineHeight:b,[`> ${e}-header`]:{padding:s,paddingInlineStart:r,[`> ${e}-expand-icon`]:{height:I,marginInlineStart:t.calc(x).sub(r).equal()}},[`> ${e}-content > ${e}-content-box`]:{padding:x}}},[`${e}-item:last-child`]:{[`> ${e}-content`]:{borderRadius:`0 0 ${O(l)} ${O(l)}`}},[`& ${e}-item-disabled > ${e}-header`]:{"\n          &,\n          & > .arrow\n        ":{color:h,cursor:"not-allowed"}},[`&${e}-icon-position-end`]:{[`& > ${e}-item`]:{[`> ${e}-header`]:{[`${e}-expand-icon`]:{order:1,paddingInlineEnd:0,paddingInlineStart:S}}}}})}},Jt=t=>{const{componentCls:e}=t,n=`> ${e}-item > ${e}-header ${e}-arrow svg`;return{[`${e}-rtl`]:{[n]:{transform:"rotate(180deg)"}}}},Zt=t=>{const{componentCls:e,headerBg:n,paddingXXS:r,colorBorder:o}=t;return{[`${e}-borderless`]:{backgroundColor:n,border:0,[`> ${e}-item`]:{borderBottom:`1px solid ${o}`},[`
        > ${e}-item:last-child,
        > ${e}-item:last-child ${e}-header
      `]:{borderRadius:0},[`> ${e}-item:last-child`]:{borderBottom:0},[`> ${e}-item > ${e}-content`]:{backgroundColor:"transparent",borderTop:0},[`> ${e}-item > ${e}-content > ${e}-content-box`]:{paddingTop:r}}}},en=t=>{const{componentCls:e,paddingSM:n}=t;return{[`${e}-ghost`]:{backgroundColor:"transparent",border:0,[`> ${e}-item`]:{borderBottom:0,[`> ${e}-content`]:{backgroundColor:"transparent",border:0,[`> ${e}-content-box`]:{paddingBlock:n}}}}}},tn=t=>({headerPadding:`${t.paddingSM}px ${t.padding}px`,headerBg:t.colorFillAlter,contentPadding:`${t.padding}px 16px`,contentBg:t.colorBgContainer}),nn=_e("Collapse",t=>{const e=ze(t,{collapseHeaderPaddingSM:`${O(t.paddingXS)} ${O(t.paddingSM)}`,collapseHeaderPaddingLG:`${O(t.padding)} ${O(t.paddingLG)}`,collapsePanelBorderRadius:t.borderRadiusLG});return[Qt(e),Zt(e),en(e),Jt(e),$t(e)]},tn),rn=v.forwardRef((t,e)=>{const{getPrefixCls:n,direction:r,collapse:o}=v.useContext(me),{prefixCls:a,className:i,rootClassName:s,style:l,bordered:u=!0,ghost:f,size:c,expandIconPosition:g="start",children:m,expandIcon:h}=t,p=Ve(N=>{var H;return(H=c??N)!==null&&H!==void 0?H:"middle"}),C=n("collapse",a),b=n(),[S,P,x]=nn(C),y=v.useMemo(()=>g==="left"?"start":g==="right"?"end":g,[g]),$=h??(o==null?void 0:o.expandIcon),R=v.useCallback(function(){let N=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const H=typeof $=="function"?$(N):v.createElement(Pt,{rotate:N.isActive?90:void 0});return Ie(H,()=>{var M;return{className:j((M=H==null?void 0:H.props)===null||M===void 0?void 0:M.className,`${C}-arrow`)}})},[$,C]),E=j(`${C}-icon-position-${y}`,{[`${C}-borderless`]:!u,[`${C}-rtl`]:r==="rtl",[`${C}-ghost`]:!!f,[`${C}-${p}`]:p!=="middle"},o==null?void 0:o.className,i,s,P,x),w=Object.assign(Object.assign({},Et(b)),{motionAppear:!1,leavedClassName:`${C}-content-hidden`}),I=v.useMemo(()=>m?Te(m).map((N,H)=>{var M,_;if(!((M=N.props)===null||M===void 0)&&M.disabled){const B=(_=N.key)!==null&&_!==void 0?_:String(H),{disabled:D,collapsible:k}=N.props,q=Object.assign(Object.assign({},Re(N.props,["disabled"])),{key:B,collapsible:k??(D?"disabled":void 0)});return Ie(N,q)}return N}):null,[m]);return S(v.createElement(he,Object.assign({ref:e,openMotion:w},Re(t,["rootClassName"]),{expandIcon:R,prefixCls:C,className:E,style:Object.assign(Object.assign({},o==null?void 0:o.style),l)}),I))}),on=Object.assign(rn,{Panel:Ut});var an=["b"],ln=["v"],ce=function(e){return Math.round(Number(e||0))},sn=function(e){if(e&&fe(e)==="object"&&"h"in e&&"b"in e){var n=e,r=n.b,o=ae(n,an);return V(V({},o),{},{v:r})}return typeof e=="string"&&/hsb/.test(e)?e.replace(/hsb/,"hsv"):e},re=function(t){It(n,t);var e=Rt(n);function n(r){return Le(this,n),e.call(this,sn(r))}return We(n,[{key:"toHsbString",value:function(){var o=this.toHsb(),a=ce(o.s*100),i=ce(o.b*100),s=ce(o.h),l=o.a,u="hsb(".concat(s,", ").concat(a,"%, ").concat(i,"%)"),f="hsba(".concat(s,", ").concat(a,"%, ").concat(i,"%, ").concat(l.toFixed(l===0?0:2),")");return l===1?u:f}},{key:"toHsb",value:function(){var o=this.toHsv();fe(this.originalInput)==="object"&&this.originalInput&&"h"in this.originalInput&&(o=this.originalInput);var a=o;a.v;var i=ae(a,ln);return V(V({},i),{},{b:o.v,a:this.a})}}]),n}(wt),cn="rc-color-picker",K=function(e){return e instanceof re?e:new re(e)},dn=K("#1677ff"),qe=function(e){var n=e.offset,r=e.targetRef,o=e.containerRef,a=e.color,i=e.type,s=o.current.getBoundingClientRect(),l=s.width,u=s.height,f=r.current.getBoundingClientRect(),c=f.width,g=f.height,m=c/2,h=g/2,p=(n.x+m)/l,C=1-(n.y+h)/u,b=a.toHsb(),S=p,P=(n.x+m)/l*360;if(i)switch(i){case"hue":return K(V(V({},b),{},{h:P<=0?0:P}));case"alpha":return K(V(V({},b),{},{a:S<=0?0:S}))}return K({h:b.h,s:p<=0?0:p,b:C>=1?1:C,a:b.a})},Ge=function(e,n,r,o){var a=e.current.getBoundingClientRect(),i=a.width,s=a.height,l=n.current.getBoundingClientRect(),u=l.width,f=l.height,c=u/2,g=f/2,m=r.toHsb();if(!(u===0&&f===0||u!==f)){if(o)switch(o){case"hue":return{x:m.h/360*i-c,y:-g/3};case"alpha":return{x:m.a/1*i-c,y:-g/3}}return{x:m.s*i-c,y:(1-m.b)*s-g}}},pe=function(e){var n=e.color,r=e.prefixCls,o=e.className,a=e.style,i=e.onClick,s="".concat(r,"-color-block");return d.createElement("div",{className:j(s,o),style:a,onClick:i},d.createElement("div",{className:"".concat(s,"-inner"),style:{background:n}}))};function un(t){var e="touches"in t?t.touches[0]:t,n=document.documentElement.scrollLeft||document.body.scrollLeft||window.pageXOffset,r=document.documentElement.scrollTop||document.body.scrollTop||window.pageYOffset;return{pageX:e.pageX-n,pageY:e.pageY-r}}function Ye(t){var e=t.offset,n=t.targetRef,r=t.containerRef,o=t.direction,a=t.onDragChange,i=t.onDragChangeComplete,s=t.calculate,l=t.color,u=t.disabledDrag,f=v.useState(e||{x:0,y:0}),c=U(f,2),g=c[0],m=c[1],h=v.useRef(null),p=v.useRef(null),C=v.useRef({flag:!1});v.useEffect(function(){if(C.current.flag===!1){var y=s==null?void 0:s(r);y&&m(y)}},[l,r]),v.useEffect(function(){return function(){document.removeEventListener("mousemove",h.current),document.removeEventListener("mouseup",p.current),document.removeEventListener("touchmove",h.current),document.removeEventListener("touchend",p.current),h.current=null,p.current=null}},[]);var b=function($){var R=un($),E=R.pageX,w=R.pageY,I=r.current.getBoundingClientRect(),N=I.x,H=I.y,M=I.width,_=I.height,B=n.current.getBoundingClientRect(),D=B.width,k=B.height,q=D/2,W=k/2,G=Math.max(0,Math.min(E-N,M))-q,le=Math.max(0,Math.min(w-H,_))-W,J={x:G,y:o==="x"?g.y:le};if(D===0&&k===0||D!==k)return!1;m(J),a==null||a(J)},S=function($){$.preventDefault(),b($)},P=function($){$.preventDefault(),C.current.flag=!1,document.removeEventListener("mousemove",h.current),document.removeEventListener("mouseup",p.current),document.removeEventListener("touchmove",h.current),document.removeEventListener("touchend",p.current),h.current=null,p.current=null,i==null||i()},x=function($){document.removeEventListener("mousemove",h.current),document.removeEventListener("mouseup",p.current),!u&&(b($),C.current.flag=!0,document.addEventListener("mousemove",S),document.addEventListener("mouseup",P),document.addEventListener("touchmove",S),document.addEventListener("touchend",P),h.current=S,p.current=P)};return[g,x]}var Ue=function(e){var n=e.size,r=n===void 0?"default":n,o=e.color,a=e.prefixCls;return d.createElement("div",{className:j("".concat(a,"-handler"),T({},"".concat(a,"-handler-sm"),r==="small")),style:{backgroundColor:o}})},Qe=function(e){var n=e.children,r=e.style,o=e.prefixCls;return d.createElement("div",{className:"".concat(o,"-palette"),style:V({position:"relative"},r)},n)},Je=v.forwardRef(function(t,e){var n=t.children,r=t.offset;return d.createElement("div",{ref:e,style:{position:"absolute",left:r.x,top:r.y,zIndex:1}},n)}),gn=function(e){var n=e.color,r=e.onChange,o=e.prefixCls,a=e.onChangeComplete,i=e.disabled,s=v.useRef(),l=v.useRef(),u=v.useRef(n),f=Xe(function(p){var C=qe({offset:p,targetRef:l,containerRef:s,color:n});u.current=C,r(C)}),c=Ye({color:n,containerRef:s,targetRef:l,calculate:function(C){return Ge(C,l,n)},onDragChange:f,onDragChangeComplete:function(){return a==null?void 0:a(u.current)},disabledDrag:i}),g=U(c,2),m=g[0],h=g[1];return d.createElement("div",{ref:s,className:"".concat(o,"-select"),onMouseDown:h,onTouchStart:h},d.createElement(Qe,{prefixCls:o},d.createElement(Je,{offset:m,ref:l},d.createElement(Ue,{color:n.toRgbString(),prefixCls:o})),d.createElement("div",{className:"".concat(o,"-saturation"),style:{backgroundColor:"hsl(".concat(n.toHsb().h,",100%, 50%)"),backgroundImage:"linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"}})))},fn=function(e){var n=e.colors,r=e.children,o=e.direction,a=o===void 0?"to right":o,i=e.type,s=e.prefixCls,l=v.useMemo(function(){return n.map(function(u,f){var c=K(u);return i==="alpha"&&f===n.length-1&&c.setAlpha(1),c.toRgbString()}).join(",")},[n,i]);return d.createElement("div",{className:"".concat(s,"-gradient"),style:{position:"absolute",inset:0,background:"linear-gradient(".concat(a,", ").concat(l,")")}},r)},we=function(e){var n=e.gradientColors,r=e.direction,o=e.type,a=o===void 0?"hue":o,i=e.color,s=e.value,l=e.onChange,u=e.onChangeComplete,f=e.disabled,c=e.prefixCls,g=v.useRef(),m=v.useRef(),h=v.useRef(i),p=Xe(function(x){var y=qe({offset:x,targetRef:m,containerRef:g,color:i,type:a});h.current=y,l(y)}),C=Ye({color:i,targetRef:m,containerRef:g,calculate:function(y){return Ge(y,m,i,a)},onDragChange:p,onDragChangeComplete:function(){u==null||u(h.current,a)},direction:"x",disabledDrag:f}),b=U(C,2),S=b[0],P=b[1];return d.createElement("div",{ref:g,className:j("".concat(c,"-slider"),"".concat(c,"-slider-").concat(a)),onMouseDown:P,onTouchStart:P},d.createElement(Qe,{prefixCls:c},d.createElement(Je,{offset:S,ref:m},d.createElement(Ue,{size:"small",color:s,prefixCls:c})),d.createElement(fn,{colors:n,direction:r,type:a,prefixCls:c})))};function Oe(t){return t!==void 0}var mn=function(e,n){var r=n.defaultValue,o=n.value,a=v.useState(function(){var u;return Oe(o)?u=o:Oe(r)?u=r:u=e,K(u)}),i=U(a,2),s=i[0],l=i[1];return v.useEffect(function(){o&&l(K(o))},[o]),[s,l]},hn=["rgb(255, 0, 0) 0%","rgb(255, 255, 0) 17%","rgb(0, 255, 0) 33%","rgb(0, 255, 255) 50%","rgb(0, 0, 255) 67%","rgb(255, 0, 255) 83%","rgb(255, 0, 0) 100%"];const pn=v.forwardRef(function(t,e){var n=t.value,r=t.defaultValue,o=t.prefixCls,a=o===void 0?cn:o,i=t.onChange,s=t.onChangeComplete,l=t.className,u=t.style,f=t.panelRender,c=t.disabledAlpha,g=c===void 0?!1:c,m=t.disabled,h=m===void 0?!1:m,p=mn(dn,{value:n,defaultValue:r}),C=U(p,2),b=C[0],S=C[1],P=v.useMemo(function(){var E=K(b.toRgbString());return E.setAlpha(1),E.toRgbString()},[b]),x=j("".concat(a,"-panel"),l,T({},"".concat(a,"-panel-disabled"),h)),y={prefixCls:a,onChangeComplete:s,disabled:h},$=function(w,I){n||S(w),i==null||i(w,I)},R=d.createElement(d.Fragment,null,d.createElement(gn,Q({color:b,onChange:$},y)),d.createElement("div",{className:"".concat(a,"-slider-container")},d.createElement("div",{className:j("".concat(a,"-slider-group"),T({},"".concat(a,"-slider-group-disabled-alpha"),g))},d.createElement(we,Q({gradientColors:hn,color:b,value:"hsl(".concat(b.toHsb().h,",100%, 50%)"),onChange:function(w){return $(w,"hue")}},y)),!g&&d.createElement(we,Q({type:"alpha",gradientColors:["rgba(255, 0, 4, 0) 0%",P],color:b,value:b.toRgbString(),onChange:function(w){return $(w,"alpha")}},y))),d.createElement(pe,{color:b.toRgbString(),prefixCls:a})));return d.createElement("div",{className:x,style:u,ref:e},typeof f=="function"?f(R):R)}),Ze=d.createContext({}),et=d.createContext({}),{Provider:vn}=Ze,{Provider:Cn}=et,te=(t,e)=>(t==null?void 0:t.replace(/[^\w/]/gi,"").slice(0,e?8:6))||"",bn=(t,e)=>t?te(t,e):"";let Ne=function(){function t(e){Le(this,t),this.metaColor=new re(e),e||this.metaColor.setAlpha(0)}return We(t,[{key:"toHsb",value:function(){return this.metaColor.toHsb()}},{key:"toHsbString",value:function(){return this.metaColor.toHsbString()}},{key:"toHex",value:function(){return bn(this.toHexString(),this.metaColor.getAlpha()<1)}},{key:"toHexString",value:function(){return this.metaColor.getAlpha()===1?this.metaColor.toHexString():this.metaColor.toHex8String()}},{key:"toRgb",value:function(){return this.metaColor.toRgb()}},{key:"toRgbString",value:function(){return this.metaColor.toRgbString()}}]),t}();const A=t=>t instanceof Ne?t:new Ne(t),ne=t=>Math.round(Number(t||0)),oe=t=>ne(t.toHsb().a*100),de=(t,e)=>{const n=t.toHsb();return n.a=e||1,A(n)},xn=t=>{let{prefixCls:e,value:n,colorCleared:r,onChange:o}=t;const a=()=>{if(n&&!r){const i=n.toHsb();i.a=0;const s=A(i);o==null||o(s)}};return d.createElement("div",{className:`${e}-clear`,onClick:a})},tt=xn;var L;(function(t){t.hex="hex",t.rgb="rgb",t.hsb="hsb"})(L||(L={}));const $n=t=>{let{prefixCls:e,min:n=0,max:r=100,value:o,onChange:a,className:i,formatter:s}=t;const l=`${e}-steppers`,[u,f]=v.useState(o);return v.useEffect(()=>{Number.isNaN(o)||f(o)},[o]),d.createElement(Ot,{className:j(l,i),min:n,max:r,value:u,formatter:s,size:"small",onChange:c=>{o||f(c||0),a==null||a(c)}})},Y=$n,yn=t=>{let{prefixCls:e,value:n,onChange:r}=t;const o=`${e}-alpha-input`,[a,i]=v.useState(A(n||"#000"));v.useEffect(()=>{n&&i(n)},[n]);const s=l=>{const u=a.toHsb();u.a=(l||0)/100;const f=A(u);n||i(f),r==null||r(f)};return d.createElement(Y,{value:oe(a),prefixCls:e,formatter:l=>`${l}%`,className:o,onChange:s})},Sn=yn,Pn=/(^#[\da-f]{6}$)|(^#[\da-f]{8}$)/i,He=t=>Pn.test(`#${t}`),En=t=>{let{prefixCls:e,value:n,onChange:r}=t;const o=`${e}-hex-input`,[a,i]=v.useState(n==null?void 0:n.toHex());v.useEffect(()=>{const l=n==null?void 0:n.toHex();He(l)&&n&&i(te(l))},[n]);const s=l=>{const u=l.target.value;i(te(u)),He(te(u,!0))&&(r==null||r(A(u)))};return d.createElement(Nt,{className:o,value:a,prefix:"#",onChange:s,size:"small"})},In=En,Rn=t=>{let{prefixCls:e,value:n,onChange:r}=t;const o=`${e}-hsb-input`,[a,i]=v.useState(A(n||"#000"));v.useEffect(()=>{n&&i(n)},[n]);const s=(l,u)=>{const f=a.toHsb();f[u]=u==="h"?l:(l||0)/100;const c=A(f);n||i(c),r==null||r(c)};return d.createElement("div",{className:o},d.createElement(Y,{max:360,min:0,value:Number(a.toHsb().h),prefixCls:e,className:o,formatter:l=>ne(l||0).toString(),onChange:l=>s(Number(l),"h")}),d.createElement(Y,{max:100,min:0,value:Number(a.toHsb().s)*100,prefixCls:e,className:o,formatter:l=>`${ne(l||0)}%`,onChange:l=>s(Number(l),"s")}),d.createElement(Y,{max:100,min:0,value:Number(a.toHsb().b)*100,prefixCls:e,className:o,formatter:l=>`${ne(l||0)}%`,onChange:l=>s(Number(l),"b")}))},wn=Rn,On=t=>{let{prefixCls:e,value:n,onChange:r}=t;const o=`${e}-rgb-input`,[a,i]=v.useState(A(n||"#000"));v.useEffect(()=>{n&&i(n)},[n]);const s=(l,u)=>{const f=a.toRgb();f[u]=l||0;const c=A(f);n||i(c),r==null||r(c)};return d.createElement("div",{className:o},d.createElement(Y,{max:255,min:0,value:Number(a.toRgb().r),prefixCls:e,className:o,onChange:l=>s(Number(l),"r")}),d.createElement(Y,{max:255,min:0,value:Number(a.toRgb().g),prefixCls:e,className:o,onChange:l=>s(Number(l),"g")}),d.createElement(Y,{max:255,min:0,value:Number(a.toRgb().b),prefixCls:e,className:o,onChange:l=>s(Number(l),"b")}))},Nn=On,Hn=[L.hex,L.hsb,L.rgb].map(t=>({value:t,label:t.toLocaleUpperCase()})),kn=t=>{const{prefixCls:e,format:n,value:r,disabledAlpha:o,onFormatChange:a,onChange:i}=t,[s,l]=Z(L.hex,{value:n,onChange:a}),u=`${e}-input`,f=g=>{l(g)},c=v.useMemo(()=>{const g={value:r,prefixCls:e,onChange:i};switch(s){case L.hsb:return d.createElement(wn,Object.assign({},g));case L.rgb:return d.createElement(Nn,Object.assign({},g));case L.hex:default:return d.createElement(In,Object.assign({},g))}},[s,e,r,i]);return d.createElement("div",{className:`${u}-container`},d.createElement(Vt,{value:s,variant:"borderless",getPopupContainer:g=>g,popupMatchSelectWidth:68,placement:"bottomRight",onChange:f,className:`${e}-format-select`,size:"small",options:Hn}),d.createElement("div",{className:u},c),!o&&d.createElement(Sn,{prefixCls:e,value:r,onChange:i}))},jn=kn;var An=globalThis&&globalThis.__rest||function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]]);return n};const Mn=()=>{const t=v.useContext(Ze),{prefixCls:e,colorCleared:n,allowClear:r,value:o,disabledAlpha:a,onChange:i,onClear:s,onChangeComplete:l}=t,u=An(t,["prefixCls","colorCleared","allowClear","value","disabledAlpha","onChange","onClear","onChangeComplete"]);return d.createElement(d.Fragment,null,r&&d.createElement(tt,Object.assign({prefixCls:e,value:o,colorCleared:n,onChange:f=>{i==null||i(f),s==null||s()}},u)),d.createElement(pn,{prefixCls:e,value:o==null?void 0:o.toHsb(),disabledAlpha:a,onChange:(f,c)=>i==null?void 0:i(f,c,!0),onChangeComplete:l}),d.createElement(jn,Object.assign({value:o,onChange:i,prefixCls:e,disabledAlpha:a},u)))},ke=Mn,ue=t=>t.map(e=>(e.colors=e.colors.map(A),e)),Dn=(t,e)=>{const{r:n,g:r,b:o,a}=t.toRgb(),i=new re(t.toRgbString()).onBackground(e).toHsv();return a<=.5?i.v>.5:n*.299+r*.587+o*.114>192},je=t=>{let{label:e}=t;return`panel-${e}`},Bn=t=>{let{prefixCls:e,presets:n,value:r,onChange:o}=t;const[a]=Ht("ColorPicker"),[,i]=kt(),[s]=Z(ue(n),{value:ue(n),postState:ue}),l=`${e}-presets`,u=v.useMemo(()=>s.reduce((g,m)=>{const{defaultOpen:h=!0}=m;return h&&g.push(je(m)),g},[]),[s]),f=g=>{o==null||o(g)},c=s.map(g=>{var m;return{key:je(g),label:d.createElement("div",{className:`${l}-label`},g==null?void 0:g.label),children:d.createElement("div",{className:`${l}-items`},Array.isArray(g==null?void 0:g.colors)&&((m=g.colors)===null||m===void 0?void 0:m.length)>0?g.colors.map((h,p)=>d.createElement(pe,{key:`preset-${p}-${h.toHexString()}`,color:A(h).toRgbString(),prefixCls:e,className:j(`${l}-color`,{[`${l}-color-checked`]:h.toHexString()===(r==null?void 0:r.toHexString()),[`${l}-color-bright`]:Dn(h,i.colorBgElevated)}),onClick:()=>f(h)})):d.createElement("span",{className:`${l}-empty`},a.presetEmpty))}});return d.createElement("div",{className:l},d.createElement(on,{defaultActiveKey:u,ghost:!0,items:c}))},Tn=Bn,_n=()=>{const{prefixCls:t,value:e,presets:n,onChange:r}=v.useContext(et);return Array.isArray(n)?d.createElement(Tn,{value:e,presets:n,prefixCls:t,onChange:r}):null},Ae=_n;var zn=globalThis&&globalThis.__rest||function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]]);return n};const Vn=t=>{const{prefixCls:e,presets:n,panelRender:r,color:o,onChange:a,onClear:i}=t,s=zn(t,["prefixCls","presets","panelRender","color","onChange","onClear"]),l=`${e}-inner`,u=Object.assign({prefixCls:e,value:o,onChange:a,onClear:i},s),f=d.useMemo(()=>({prefixCls:e,value:o,presets:n,onChange:a}),[e,o,n,a]),c=d.createElement("div",{className:`${l}-content`},d.createElement(ke,null),Array.isArray(n)&&d.createElement(jt,null),d.createElement(Ae,null));return d.createElement(vn,{value:u},d.createElement(Cn,{value:f},d.createElement("div",{className:l},typeof r=="function"?r(c,{components:{Picker:ke,Presets:Ae}}):c)))},Ln=Vn;var Wn=globalThis&&globalThis.__rest||function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]]);return n};const Xn=v.forwardRef((t,e)=>{const{color:n,prefixCls:r,open:o,colorCleared:a,disabled:i,format:s,className:l,showText:u}=t,f=Wn(t,["color","prefixCls","open","colorCleared","disabled","format","className","showText"]),c=`${r}-trigger`,g=v.useMemo(()=>a?d.createElement(tt,{prefixCls:r}):d.createElement(pe,{prefixCls:r,color:n.toRgbString()}),[n,a,r]),m=()=>{const p=n.toHexString().toUpperCase(),C=oe(n);switch(s){case"rgb":return n.toRgbString();case"hsb":return n.toHsbString();case"hex":default:return C<100?`${p.slice(0,7)},${C}%`:p}},h=()=>{if(typeof u=="function")return u(n);if(u)return m()};return d.createElement("div",Object.assign({ref:e,className:j(c,l,{[`${c}-active`]:o,[`${c}-disabled`]:i})},f),g,u&&d.createElement("div",{className:`${c}-text`},h()))}),Fn=Xn;function Me(t){return t!==void 0}const Kn=(t,e)=>{const{defaultValue:n,value:r}=e,[o,a]=v.useState(()=>{let i;return Me(r)?i=r:Me(n)?i=n:i=t,A(i||"")});return v.useEffect(()=>{r&&a(A(r))},[r]),[o,a]},qn=Kn,nt=(t,e)=>({backgroundImage:`conic-gradient(${e} 0 25%, transparent 0 50%, ${e} 0 75%, transparent 0)`,backgroundSize:`${t} ${t}`}),Gn=(t,e)=>{const{componentCls:n,borderRadiusSM:r,colorPickerInsetShadow:o,lineWidth:a,colorFillSecondary:i}=t;return{[`${n}-color-block`]:Object.assign(Object.assign({position:"relative",borderRadius:r,width:e,height:e,boxShadow:o},nt("50%",t.colorFillSecondary)),{[`${n}-color-block-inner`]:{width:"100%",height:"100%",border:`${O(a)} solid ${i}`,borderRadius:"inherit"}})}},De=Gn,Yn=t=>{const{componentCls:e,antCls:n,fontSizeSM:r,lineHeightSM:o,colorPickerAlphaInputWidth:a,marginXXS:i,paddingXXS:s,controlHeightSM:l,marginXS:u,fontSizeIcon:f,paddingXS:c,colorTextPlaceholder:g,colorPickerInputNumberHandleWidth:m,lineWidth:h}=t;return{[`${e}-input-container`]:{display:"flex",[`${e}-steppers${n}-input-number`]:{fontSize:r,lineHeight:o,[`${n}-input-number-input`]:{paddingInlineStart:s,paddingInlineEnd:0},[`${n}-input-number-handler-wrap`]:{width:m}},[`${e}-steppers${e}-alpha-input`]:{flex:`0 0 ${O(a)}`,marginInlineStart:i},[`${e}-format-select${n}-select`]:{marginInlineEnd:u,width:"auto","&-single":{[`${n}-select-selector`]:{padding:0,border:0},[`${n}-select-arrow`]:{insetInlineEnd:0},[`${n}-select-selection-item`]:{paddingInlineEnd:t.calc(f).add(i).equal(),fontSize:r,lineHeight:`${O(l)}`},[`${n}-select-item-option-content`]:{fontSize:r,lineHeight:o},[`${n}-select-dropdown`]:{[`${n}-select-item`]:{minHeight:"auto"}}}},[`${e}-input`]:{gap:i,alignItems:"center",flex:1,width:0,[`${e}-hsb-input,${e}-rgb-input`]:{display:"flex",gap:i,alignItems:"center"},[`${e}-steppers`]:{flex:1},[`${e}-hex-input${n}-input-affix-wrapper`]:{flex:1,padding:`0 ${O(c)}`,[`${n}-input`]:{fontSize:r,textTransform:"uppercase",lineHeight:O(t.calc(l).sub(t.calc(h).mul(2)).equal())},[`${n}-input-prefix`]:{color:g}}}}}},Un=Yn,Qn=t=>{const{componentCls:e,controlHeightLG:n,borderRadiusSM:r,colorPickerInsetShadow:o,marginSM:a,colorBgElevated:i,colorFillSecondary:s,lineWidthBold:l,colorPickerHandlerSize:u,colorPickerHandlerSizeSM:f,colorPickerSliderHeight:c}=t;return{[`${e}-select`]:{[`${e}-palette`]:{minHeight:t.calc(n).mul(4).equal(),overflow:"hidden",borderRadius:r},[`${e}-saturation`]:{position:"absolute",borderRadius:"inherit",boxShadow:o,inset:0},marginBottom:a},[`${e}-handler`]:{width:u,height:u,border:`${O(l)} solid ${i}`,position:"relative",borderRadius:"50%",cursor:"pointer",boxShadow:`${o}, 0 0 0 1px ${s}`,"&-sm":{width:f,height:f}},[`${e}-slider`]:{borderRadius:t.calc(c).div(2).equal(),[`${e}-palette`]:{height:c},[`${e}-gradient`]:{borderRadius:t.calc(c).div(2).equal(),boxShadow:o},"&-alpha":nt(`${O(c)}`,t.colorFillSecondary),"&-hue":{marginBottom:a}},[`${e}-slider-container`]:{display:"flex",gap:a,marginBottom:a,[`${e}-slider-group`]:{flex:1,"&-disabled-alpha":{display:"flex",alignItems:"center",[`${e}-slider`]:{flex:1,marginBottom:0}}}}}},Jn=Qn,Zn=t=>{const{componentCls:e,antCls:n,colorTextQuaternary:r,paddingXXS:o,colorPickerPresetColorSize:a,fontSizeSM:i,colorText:s,lineHeightSM:l,lineWidth:u,borderRadius:f,colorFill:c,colorWhite:g,marginXXS:m,paddingXS:h,fontHeightSM:p}=t;return{[`${e}-presets`]:{[`${n}-collapse-item > ${n}-collapse-header`]:{padding:0,[`${n}-collapse-expand-icon`]:{height:p,color:r,paddingInlineEnd:o}},[`${n}-collapse`]:{display:"flex",flexDirection:"column",gap:m},[`${n}-collapse-item > ${n}-collapse-content > ${n}-collapse-content-box`]:{padding:`${O(h)} 0`},"&-label":{fontSize:i,color:s,lineHeight:l},"&-items":{display:"flex",flexWrap:"wrap",gap:t.calc(m).mul(1.5).equal(),[`${e}-presets-color`]:{position:"relative",cursor:"pointer",width:a,height:a,"&::before":{content:'""',pointerEvents:"none",width:t.calc(a).add(t.calc(u).mul(4)).equal(),height:t.calc(a).add(t.calc(u).mul(4)).equal(),position:"absolute",top:t.calc(u).mul(-2).equal(),insetInlineStart:t.calc(u).mul(-2).equal(),borderRadius:f,border:`${O(u)} solid transparent`,transition:`border-color ${t.motionDurationMid} ${t.motionEaseInBack}`},"&:hover::before":{borderColor:c},"&::after":{boxSizing:"border-box",position:"absolute",top:"50%",insetInlineStart:"21.5%",display:"table",width:t.calc(a).div(13).mul(5).equal(),height:t.calc(a).div(13).mul(8).equal(),border:`${O(t.lineWidthBold)} solid ${t.colorWhite}`,borderTop:0,borderInlineStart:0,transform:"rotate(45deg) scale(0) translate(-50%,-50%)",opacity:0,content:'""',transition:`all ${t.motionDurationFast} ${t.motionEaseInBack}, opacity ${t.motionDurationFast}`},[`&${e}-presets-color-checked`]:{"&::after":{opacity:1,borderColor:g,transform:"rotate(45deg) scale(1) translate(-50%,-50%)",transition:`transform ${t.motionDurationMid} ${t.motionEaseOutBack} ${t.motionDurationFast}`},[`&${e}-presets-color-bright`]:{"&::after":{borderColor:"rgba(0, 0, 0, 0.45)"}}}}},"&-empty":{fontSize:i,color:r}}}},er=Zn,ge=(t,e,n)=>({borderInlineEndWidth:t.lineWidth,borderColor:e,boxShadow:`0 0 0 ${O(t.controlOutlineWidth)} ${n}`,outline:0}),tr=t=>{const{componentCls:e}=t;return{"&-rtl":{[`${e}-presets-color`]:{"&::after":{direction:"ltr"}},[`${e}-clear`]:{"&::after":{direction:"ltr"}}}}},Be=(t,e,n)=>{const{componentCls:r,borderRadiusSM:o,lineWidth:a,colorSplit:i,colorBorder:s,red6:l}=t;return{[`${r}-clear`]:Object.assign(Object.assign({width:e,height:e,borderRadius:o,border:`${O(a)} solid ${i}`,position:"relative",overflow:"hidden",cursor:"pointer",transition:`all ${t.motionDurationFast}`},n),{"&::after":{content:'""',position:"absolute",insetInlineEnd:a,top:0,display:"block",width:40,height:2,transformOrigin:"right",transform:"rotate(-45deg)",backgroundColor:l},"&:hover":{borderColor:s}})}},nr=t=>{const{componentCls:e,colorError:n,colorWarning:r,colorErrorHover:o,colorWarningHover:a,colorErrorOutline:i,colorWarningOutline:s}=t;return{[`&${e}-status-error`]:{borderColor:n,"&:hover":{borderColor:o},[`&${e}-trigger-active`]:Object.assign({},ge(t,n,i))},[`&${e}-status-warning`]:{borderColor:r,"&:hover":{borderColor:a},[`&${e}-trigger-active`]:Object.assign({},ge(t,r,s))}}},rr=t=>{const{componentCls:e,controlHeightLG:n,controlHeightSM:r,controlHeight:o,controlHeightXS:a,borderRadius:i,borderRadiusSM:s,borderRadiusXS:l,borderRadiusLG:u,fontSizeLG:f}=t;return{[`&${e}-lg`]:{minWidth:n,height:n,borderRadius:u,[`${e}-color-block, ${e}-clear`]:{width:o,height:o,borderRadius:i},[`${e}-trigger-text`]:{fontSize:f}},[`&${e}-sm`]:{minWidth:r,height:r,borderRadius:s,[`${e}-color-block, ${e}-clear`]:{width:a,height:a,borderRadius:l}}}},or=t=>{const{antCls:e,componentCls:n,colorPickerWidth:r,colorPrimary:o,motionDurationMid:a,colorBgElevated:i,colorTextDisabled:s,colorText:l,colorBgContainerDisabled:u,borderRadius:f,marginXS:c,marginSM:g,controlHeight:m,controlHeightSM:h,colorBgTextActive:p,colorPickerPresetColorSize:C,colorPickerPreviewSize:b,lineWidth:S,colorBorder:P,paddingXXS:x,fontSize:y,colorPrimaryHover:$,controlOutline:R}=t;return[{[n]:Object.assign({[`${n}-inner`]:Object.assign(Object.assign(Object.assign(Object.assign({"&-content":{display:"flex",flexDirection:"column",width:r,[`& > ${e}-divider`]:{margin:`${O(g)} 0 ${O(c)}`}},[`${n}-panel`]:Object.assign({},Jn(t))},De(t,b)),Un(t)),er(t)),Be(t,C,{marginInlineStart:"auto",marginBottom:c})),"&-trigger":Object.assign(Object.assign(Object.assign(Object.assign({minWidth:m,height:m,borderRadius:f,border:`${O(S)} solid ${P}`,cursor:"pointer",display:"inline-flex",alignItems:"center",justifyContent:"center",transition:`all ${a}`,background:i,padding:t.calc(x).sub(S).equal(),[`${n}-trigger-text`]:{marginInlineStart:c,marginInlineEnd:t.calc(c).sub(t.calc(x).sub(S)).equal(),fontSize:y,color:l},"&:hover":{borderColor:$},[`&${n}-trigger-active`]:Object.assign({},ge(t,o,R)),"&-disabled":{color:s,background:u,cursor:"not-allowed","&:hover":{borderColor:p},[`${n}-trigger-text`]:{color:s}}},Be(t,h)),De(t,h)),nr(t)),rr(t))},tr(t))}]},ar=_e("ColorPicker",t=>{const{colorTextQuaternary:e,marginSM:n}=t,r=8,o=ze(t,{colorPickerWidth:234,colorPickerHandlerSize:16,colorPickerHandlerSizeSM:12,colorPickerAlphaInputWidth:44,colorPickerInputNumberHandleWidth:16,colorPickerPresetColorSize:18,colorPickerInsetShadow:`inset 0 0 1px 0 ${e}`,colorPickerSliderHeight:r,colorPickerPreviewSize:t.calc(r).mul(2).add(n).equal()});return[or(o)]});var lr=globalThis&&globalThis.__rest||function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]]);return n};const ve=t=>{const{value:e,defaultValue:n,format:r,defaultFormat:o,allowClear:a=!1,presets:i,children:s,trigger:l="click",open:u,disabled:f,placement:c="bottomLeft",arrow:g=!0,panelRender:m,showText:h,style:p,className:C,size:b,rootClassName:S,prefixCls:P,styles:x,disabledAlpha:y=!1,onFormatChange:$,onChange:R,onClear:E,onOpenChange:w,onChangeComplete:I,getPopupContainer:N,autoAdjustOverflow:H=!0,destroyTooltipOnHide:M}=t,_=lr(t,["value","defaultValue","format","defaultFormat","allowClear","presets","children","trigger","open","disabled","placement","arrow","panelRender","showText","style","className","size","rootClassName","prefixCls","styles","disabledAlpha","onFormatChange","onChange","onClear","onOpenChange","onChangeComplete","getPopupContainer","autoAdjustOverflow","destroyTooltipOnHide"]),{getPrefixCls:B,direction:D,colorPicker:k}=v.useContext(me),q=v.useContext(At),W=f??q,[G,le]=qn("",{value:e,defaultValue:n}),[J,rt]=Z(!1,{value:u,postState:X=>!W&&X,onChange:w}),[Ce,ot]=Z(r,{value:r,defaultValue:o,onChange:$}),[ie,be]=v.useState(!e&&!n),z=B("color-picker",P),xe=v.useMemo(()=>oe(G)<100,[G]),{status:at}=d.useContext(Mt),$e=Ve(b),ye=Dt(z),[lt,it,st]=ar(z,ye),ct={[`${z}-rtl`]:D},Se=j(S,st,ye,ct),dt=j(Bt(z,at),{[`${z}-sm`]:$e==="small",[`${z}-lg`]:$e==="large"},k==null?void 0:k.className,Se,C,it),ut=j(z,Se),se=v.useRef(!0),gt=(X,ee,vt)=>{let F=A(X);(ie||(e===null||!e&&n===null))&&(be(!1),oe(G)===0&&ee!=="alpha"&&(F=de(F))),y&&xe&&(F=de(F)),vt?se.current=!1:I==null||I(F),le(F),R==null||R(F,F.toHexString())},ft=()=>{be(!0),E==null||E()},Pe=X=>{se.current=!0;let ee=A(X);y&&xe&&(ee=de(X)),I==null||I(ee)},mt={open:J,trigger:l,placement:c,arrow:g,rootClassName:S,getPopupContainer:N,autoAdjustOverflow:H,destroyTooltipOnHide:M},ht={prefixCls:z,color:G,allowClear:a,colorCleared:ie,disabled:W,disabledAlpha:y,presets:i,panelRender:m,format:Ce,onFormatChange:ot,onChangeComplete:Pe},pt=Object.assign(Object.assign({},k==null?void 0:k.style),p);return lt(d.createElement(Tt,Object.assign({style:x==null?void 0:x.popup,overlayInnerStyle:x==null?void 0:x.popupOverlayInner,onOpenChange:X=>{se.current&&!W&&rt(X)},content:d.createElement(_t,{override:!0,status:!0},d.createElement(Ln,Object.assign({},ht,{onChange:gt,onChangeComplete:Pe,onClear:ft}))),overlayClassName:ut},mt),s||d.createElement(Fn,Object.assign({open:J,className:dt,style:pt,color:e?A(e):G,prefixCls:z,disabled:W,colorCleared:ie,showText:h,format:Ce},_))))},ir=zt(ve,"color-picker",t=>t,t=>Object.assign(Object.assign({},t),{placement:"bottom",autoAdjustOverflow:!1}));ve._InternalPanelDoNotUseOrYouWillBeFired=ir;const ur=ve;export{ur as C};