import{r as o}from"./react-12b51ca5.js";import{d as N}from"./lodash-40f09dbd.js";import"./dayjs-6d610299.js";import{_ as L,a as F}from"./tslib-9305e412.js";import{s as i}from"./screenfull-d32598f8.js";import"./resize-observer-polyfill-0f9f8adb.js";var g=function(e){return typeof e=="function"},U=function(e){return typeof e=="boolean"},$=function(e){return typeof e=="number"},A=!1;const x=A;function d(e){x&&(g(e)||console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof e)));var n=o.useRef(e);n.current=o.useMemo(function(){return e},[e]);var r=o.useRef();return r.current||(r.current=function(){for(var a=[],t=0;t<arguments.length;t++)a[t]=arguments[t];return n.current.apply(this,a)}),r.current}function p(e){var n=o.useRef(e);return n.current=e,n}var q=function(e){x&&(g(e)||console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));var n=p(e);o.useEffect(function(){return function(){n.current()}},[])};const G=q;var P=!!(typeof window<"u"&&window.document&&window.document.createElement);const W=P;function b(e,n){if(W){if(!e)return n;var r;return g(e)?r=e():"current"in e?r=e.current:r=e,r}}function H(){var e=(typeof global>"u"?"undefined":typeof global)=="object"&&global&&global.Object===Object&&global,n=typeof self=="object"&&self&&self.Object===Object&&self;return e||n}H()||(global.Date=Date);function J(e,n){var r;x&&(g(e)||console.error("useDebounceFn expected parameter is a function, got ".concat(typeof e)));var a=p(e),t=(r=n==null?void 0:n.wait)!==null&&r!==void 0?r:1e3,c=o.useMemo(function(){return N(function(){for(var l=[],v=0;v<arguments.length;v++)l[v]=arguments[v];return a.current.apply(a,L([],F(l),!1))},t,n)},[]);return G(function(){c.cancel()}),{run:c,cancel:c.cancel,flush:c.flush}}function te(e,n){var r=F(o.useState(e),2),a=r[0],t=r[1],c=J(function(){t(e)},n).run;return o.useEffect(function(){c()},[e]),a}var K=function(e,n){var r=n||{},a=r.onExit,t=r.onEnter,c=r.pageFullscreen,l=c===void 0?!1:c,v=U(l)||!l?{}:l,h=v.className,m=h===void 0?"ahooks-page-fullscreen":h,R=v.zIndex,O=R===void 0?999999:R,w=p(a),y=p(t),_=F(o.useState(E),2),C=_[0],T=_[1],D=o.useRef(E());function E(){return i.isEnabled&&!!i.element&&i.element===b(e)}var B=function(u){var s,f;u?(s=y.current)===null||s===void 0||s.call(y):(f=w.current)===null||f===void 0||f.call(w)},I=function(u){D.current!==u&&(B(u),T(u),D.current=u)},k=function(){var u=E();I(u)},j=function(u){var s=b(e);if(s){var f=document.getElementById(m);u?(s.classList.add(m),f||(f=document.createElement("style"),f.setAttribute("id",m),f.textContent=`
          .`.concat(m,` {
            position: fixed; left: 0; top: 0; right: 0; bottom: 0;
            width: 100% !important; height: 100% !important;
            z-index: `).concat(O,`;
          }`),s.appendChild(f))):(s.classList.remove(m),f&&f.remove()),I(u)}},z=function(){var u=b(e);if(u){if(l){j(!0);return}if(i.isEnabled)try{i.request(u)}catch(s){console.error(s)}}},S=function(){var u=b(e);if(u){if(l){j(!1);return}i.isEnabled&&i.element===u&&i.exit()}},M=function(){C?S():z()};return o.useEffect(function(){if(!(!i.isEnabled||l))return i.on("change",k),function(){i.off("change",k)}},[]),[C,{enterFullscreen:d(z),exitFullscreen:d(S),toggleFullscreen:d(M),isEnabled:i.isEnabled}]};const ue=K;var Q=function(e,n,r){r===void 0&&(r={});var a=d(e),t=o.useRef(null),c=o.useCallback(function(){t.current&&clearInterval(t.current)},[]);return o.useEffect(function(){if(!(!$(n)||n<0))return r.immediate&&a(),t.current=setInterval(a,n),c},[n,r.immediate]),c};const oe=Q;var V=function(e,n){var r=d(e),a=o.useRef(null),t=o.useCallback(function(){a.current&&clearTimeout(a.current)},[]);return o.useEffect(function(){if(!(!$(n)||n<0))return a.current=setTimeout(r,n),t},[n]),t};const ae=V;export{J as a,ae as b,te as c,ue as d,oe as u};