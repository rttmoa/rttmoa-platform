import{_ as Q,i as F,k as l,o as U,r as n,n as L,K as J,a as M}from"./index-27069029.js";var ie=["className","prefixCls","style","active","status","iconPrefix","icon","wrapperStyle","stepNumber","disabled","description","title","subTitle","progressDot","stepIcon","tailContent","icons","stepIndex","onStepClick","onClick","render"];function O(e){return typeof e=="string"}function V(e){var c,D=e.className,t=e.prefixCls,$=e.style,w=e.active,r=e.status,f=e.iconPrefix,s=e.icon;e.wrapperStyle;var C=e.stepNumber,y=e.disabled,v=e.description,g=e.title,u=e.subTitle,S=e.progressDot,h=e.stepIcon,z=e.tailContent,a=e.icons,E=e.stepIndex,m=e.onStepClick,N=e.onClick,R=e.render,W=Q(e,ie),T=!!m&&!y,p={};T&&(p.role="button",p.tabIndex=0,p.onClick=function(x){N==null||N(x),m(E)},p.onKeyDown=function(x){var d=x.which;(d===J.ENTER||d===J.SPACE)&&m(E)});var q=function(){var d,i,I=F("".concat(t,"-icon"),"".concat(f,"icon"),(d={},l(d,"".concat(f,"icon-").concat(s),s&&O(s)),l(d,"".concat(f,"icon-check"),!s&&r==="finish"&&(a&&!a.finish||!a)),l(d,"".concat(f,"icon-cross"),!s&&r==="error"&&(a&&!a.error||!a)),d)),k=n.createElement("span",{className:"".concat(t,"-icon-dot")});return S?typeof S=="function"?i=n.createElement("span",{className:"".concat(t,"-icon")},S(k,{index:C-1,status:r,title:g,description:v})):i=n.createElement("span",{className:"".concat(t,"-icon")},k):s&&!O(s)?i=n.createElement("span",{className:"".concat(t,"-icon")},s):a&&a.finish&&r==="finish"?i=n.createElement("span",{className:"".concat(t,"-icon")},a.finish):a&&a.error&&r==="error"?i=n.createElement("span",{className:"".concat(t,"-icon")},a.error):s||r==="finish"||r==="error"?i=n.createElement("span",{className:I}):i=n.createElement("span",{className:"".concat(t,"-icon")},C),h&&(i=h({index:C-1,status:r,title:g,description:v,node:i})),i},_=r||"wait",j=F("".concat(t,"-item"),"".concat(t,"-item-").concat(_),D,(c={},l(c,"".concat(t,"-item-custom"),s),l(c,"".concat(t,"-item-active"),w),l(c,"".concat(t,"-item-disabled"),y===!0),c)),K=U({},$),P=n.createElement("div",L({},W,{className:j,style:K}),n.createElement("div",L({onClick:N},p,{className:"".concat(t,"-item-container")}),n.createElement("div",{className:"".concat(t,"-item-tail")},z),n.createElement("div",{className:"".concat(t,"-item-icon")},q()),n.createElement("div",{className:"".concat(t,"-item-content")},n.createElement("div",{className:"".concat(t,"-item-title")},g,u&&n.createElement("div",{title:typeof u=="string"?u:void 0,className:"".concat(t,"-item-subtitle")},u)),v&&n.createElement("div",{className:"".concat(t,"-item-description")},v))));return R&&(P=R(P)||null),P}var ne=["prefixCls","style","className","children","direction","type","labelPlacement","iconPrefix","status","size","current","progressDot","stepIcon","initial","icons","onChange","itemRender","items"];function ae(e){var c,D=e.prefixCls,t=D===void 0?"rc-steps":D,$=e.style,w=$===void 0?{}:$,r=e.className;e.children;var f=e.direction,s=f===void 0?"horizontal":f,C=e.type,y=C===void 0?"default":C,v=e.labelPlacement,g=v===void 0?"horizontal":v,u=e.iconPrefix,S=u===void 0?"rc":u,h=e.status,z=h===void 0?"process":h,a=e.size,E=e.current,m=E===void 0?0:E,N=e.progressDot,R=N===void 0?!1:N,W=e.stepIcon,T=e.initial,p=T===void 0?0:T,q=e.icons,_=e.onChange,j=e.itemRender,K=e.items,P=K===void 0?[]:K,x=Q(e,ne),d=y==="navigation",i=y==="inline",I=i||R,k=i?"horizontal":s,G=i?void 0:a,X=I?"vertical":g,Y=F(t,"".concat(t,"-").concat(k),r,(c={},l(c,"".concat(t,"-").concat(G),G),l(c,"".concat(t,"-label-").concat(X),k==="horizontal"),l(c,"".concat(t,"-dot"),!!I),l(c,"".concat(t,"-navigation"),d),l(c,"".concat(t,"-inline"),i),c)),Z=function(A){_&&m!==A&&_(A)},ee=function(A,H){var o=U({},A),b=p+H;return z==="error"&&H===m-1&&(o.className="".concat(t,"-next-error")),o.status||(b===m?o.status=z:b<m?o.status="finish":o.status="wait"),i&&(o.icon=void 0,o.subTitle=void 0),!o.render&&j&&(o.render=function(te){return j(o,te)}),M.createElement(V,L({},o,{active:b===m,stepNumber:b+1,stepIndex:b,key:b,prefixCls:t,iconPrefix:S,wrapperStyle:w,progressDot:I,stepIcon:W,icons:q,onStepClick:_&&Z}))};return M.createElement("div",L({className:Y,style:w},x),P.filter(function(B){return B}).map(ee))}ae.Step=V;export{ae as S,V as a};