import{r as f,a as pe,j as R}from"./index-44a46bca.js";import{u as it}from"./styled-components.browser.esm-c6e7a2b1.js";import{C as ue}from"./index-5a99146c.js";import"./Skeleton-1ea6ca93.js";const le=it.main`
	/* position: relative; */
	/* min-height: 100vh; */
	width: 100%;
	/* background-color: red;/ */
`,de=it.div`
	padding: 8px;
	width: 100%;
	max-width: 960px;
	margin: 30px auto 0;
	box-sizing: border-box;
`,he=it.h1`
	font-family: Quantico, sans-serif;
	font-size: 1.5rem;
	font-weight: 900;
	letter-spacing: -0.075em;
	/* color: ; */
	/* position: fixed; */
	/* left: 0; */
	/* right: 0; */
	/* top: 0; */
	/* padding: 2rem; */
	z-index: 999;
	/* width: 80%; */
	text-align: center;
	transition:
		padding 200ms ease-in-out,
		background-color 200ms 200ms linear;

	/* minify */
	padding: ${t=>t.minify?"0.5rem":null};
	color: ${t=>t.minify?"#f2fafe":null};
	background-color: ${t=>t.minify?"#1d2326":null};
`,fe=it.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100px;
	background-color: #1d2326;
	border-radius: 1rem;
	transition: transform 400ms ease-in-out;

	span:last-of-type {
		color: #fff;
		padding: 0.5rem;
	}
	&:hover {
		position: relative;
		background-color: #fff;
		transform: scale(1.125);
		z-index: 1000;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);

		span:last-of-type {
			color: #1d2326;
			padding: 0.5rem;
		}
	}
`,w=0,b=1,me=2,ve=0,vt=1;function ge(t,e,n){let o=t.list,i;for(;o;){if(o.index===n)return!1;if(e>o.high)break;i=o,o=o.next}return i||(t.list={index:n,high:e,next:o}),i&&(i.next={index:n,high:e,next:i.next}),!0}function be(t,e){let n=t.list;if(n.index===e)return n.next===null?ve:(t.list=n.next,vt);let o=n;for(n=n.next;n!==null;){if(n.index===e)return o.next=n.next,vt;o=n,n=n.next}}const m={low:0,max:0,high:0,C:me,P:void 0,R:void 0,L:void 0,list:void 0};m.P=m;m.L=m;m.R=m;function z(t){const e=t.high;t.L===m&&t.R===m?t.max=e:t.L===m?t.max=Math.max(t.R.max,e):t.R===m?t.max=Math.max(t.L.max,e):t.max=Math.max(Math.max(t.L.max,t.R.max),e)}function Y(t){let e=t;for(;e.P!==m;)z(e.P),e=e.P}function H(t,e){if(e.R===m)return;const n=e.R;e.R=n.L,n.L!==m&&(n.L.P=e),n.P=e.P,e.P===m?t.root=n:e===e.P.L?e.P.L=n:e.P.R=n,n.L=e,e.P=n,z(e),z(n)}function F(t,e){if(e.L===m)return;const n=e.L;e.L=n.R,n.R!==m&&(n.R.P=e),n.P=e.P,e.P===m?t.root=n:e===e.P.R?e.P.R=n:e.P.L=n,n.R=e,e.P=n,z(e),z(n)}function J(t,e,n){e.P===m?t.root=n:e===e.P.L?e.P.L=n:e.P.R=n,n.P=e.P}function ye(t,e){let n;for(;e!==m&&e.C===b;)e===e.P.L?(n=e.P.R,n.C===w&&(n.C=b,e.P.C=w,H(t,e.P),n=e.P.R),n.L.C===b&&n.R.C===b?(n.C=w,e=e.P):(n.R.C===b&&(n.L.C=b,n.C=w,F(t,n),n=e.P.R),n.C=e.P.C,e.P.C=b,n.R.C=b,H(t,e.P),e=t.root)):(n=e.P.L,n.C===w&&(n.C=b,e.P.C=w,F(t,e.P),n=e.P.L),n.R.C===b&&n.L.C===b?(n.C=w,e=e.P):(n.L.C===b&&(n.R.C=b,n.C=w,H(t,n),n=e.P.L),n.C=e.P.C,e.P.C=b,n.L.C=b,F(t,e.P),e=t.root));e.C=b}function xe(t){for(;t.L!==m;)t=t.L;return t}function _e(t,e){let n;for(;e.P.C===w;)e.P===e.P.P.L?(n=e.P.P.R,n.C===w?(e.P.C=b,n.C=b,e.P.P.C=w,e=e.P.P):(e===e.P.R&&(e=e.P,H(t,e)),e.P.C=b,e.P.P.C=w,F(t,e.P.P))):(n=e.P.P.L,n.C===w?(e.P.C=b,n.C=b,e.P.P.C=w,e=e.P.P):(e===e.P.L&&(e=e.P,F(t,e)),e.P.C=b,e.P.P.C=w,H(t,e.P.P)));t.root.C=b}function we(){const t={root:m,size:0},e={};return{insert(n,o,i){let r=t.root,s=m;for(;r!==m&&(s=r,n!==s.low);)n<r.low?r=r.L:r=r.R;if(n===s.low&&s!==m){if(!ge(s,o,i))return;s.high=Math.max(s.high,o),z(s),Y(s),e[i]=s,t.size++;return}const a={low:n,high:o,max:o,C:w,P:s,L:m,R:m,list:{index:i,high:o,next:null}};s===m?t.root=a:(a.low<s.low?s.L=a:s.R=a,Y(a)),_e(t,a),e[i]=a,t.size++},remove(n){const o=e[n];if(o===void 0)return;delete e[n];const i=be(o,n);if(i===void 0)return;if(i===vt){o.high=o.list.high,z(o),Y(o),t.size--;return}let r=o,s=r.C,a;o.L===m?(a=o.R,J(t,o,o.R)):o.R===m?(a=o.L,J(t,o,o.L)):(r=xe(o.R),s=r.C,a=r.R,r.P===o?a.P=r:(J(t,r,r.R),r.R=o.R,r.R.P=r),J(t,o,r),r.L=o.L,r.L.P=r,r.C=o.C),z(a),Y(a),s===b&&ye(t,a),t.size--},search(n,o,i){const r=[t.root];for(;r.length!==0;){const s=r.pop();if(!(s===m||n>s.max)&&(s.L!==m&&r.push(s.L),s.R!==m&&r.push(s.R),s.low<=o&&s.high>=n)){let a=s.list;for(;a!==null;)a.high>=n&&i(a.index,s.low),a=a.next}}},get size(){return t.size}}}const Re=t=>{const e=f.useRef(t);return f.useEffect(()=>{e.current=t}),e},rt=Re,Ce=(t,e=100,n=!1)=>{const o=rt(t),i=f.useRef(),r=[e,n,o];function s(){i.current&&clearTimeout(i.current),i.current=void 0}f.useEffect(()=>s,r);function a(){i.current=void 0}return f.useCallback(function(){const p=arguments,{current:c}=i;if(c===void 0&&n)return i.current=setTimeout(a,e),o.current.apply(null,p);c&&clearTimeout(c),i.current=setTimeout(()=>{i.current=void 0,o.current.apply(null,p)},e)},r)},Pe=(t,e,n)=>{const o=f.useState(t);return[o[0],Ce(o[1],e,n)]};function $(t,e,n,o){const i=f.useRef(n),r=f.useRef(o);f.useEffect(()=>{i.current=n,r.current=o}),f.useEffect(()=>{const s=t&&"current"in t?t.current:t;if(!s)return;let a=0;function p(...u){a||i.current.apply(this,u)}s.addEventListener(e,p);const c=r.current;return()=>{a=1,s.removeEventListener(e,p),c&&c()}},[t,e])}const je={},q=typeof window>"u"?null:window,Se=q&&typeof q.visualViewport<"u"?q.visualViewport:null,Tt=()=>[document.documentElement.clientWidth,document.documentElement.clientHeight],Te=function(t){t===void 0&&(t=je);const{wait:e,leading:n,initialWidth:o=0,initialHeight:i=0}=t,[r,s]=Pe(typeof document>"u"?[o,i]:Tt,e,n),a=()=>s(Tt);return $(q,"resize",a),$(Se,"resize",a),$(q,"orientationchange",a),r},Ee=(t,e)=>{const n=e||Oe;let o,i;return function(){return o&&n(arguments,o)?i:i=t.apply(null,o=arguments)}},st=Ee,Oe=(t,e)=>t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3];class ze{constructor(){this.set=void 0,this.get=void 0;let e,n;this.get=o=>o===e?n:void 0,this.set=(o,i)=>{e=o,n=i}}}const Et=ze,ht=t=>{try{return new t}catch{const n={};return{set(o,i){n[o]=i},get(o){return n[o]}}}},Le=t=>{const e=t.length,n=ht(t[0]);let o,i,r,s;const a=e===1,p=l=>(o=n.get(l[0]))===void 0||a?o:o.get(l[1]),c=(l,d)=>(a?n.set(l[0],d):(o=n.get(l[0]))===void 0?(i=ht(t[1]),i.set(l[1],d),n.set(l[0],i)):o.set(l[1],d),d),u=l=>{for(s=n,r=0;r<e;r++)if((s=s.get(l[r]))===void 0)return;return s},h=(l,d)=>{for(s=n,r=0;r<e-1;r++)(i=s.get(l[r]))===void 0&&(i=ht(t[r+1]),s.set(l[r],i)),s=i;return s.set(l[e-1],d),d};return e<3?{g:p,s:c}:{g:u,s:h}},Me=(t,e)=>{let n;const{g:o,s:i}=Le(t);return function(){return(n=o(arguments))===void 0?i(arguments,e.apply(null,arguments)):n}},Kt=Me,gt=new WeakMap;function Xt(){const t=f.useState(Be)[1];return f.useRef(()=>t({})).current}const Be={},et=f.createElement;function ke(t){let{positioner:e,resizeObserver:n,items:o,as:i="div",id:r,className:s,style:a,role:p="grid",tabIndex:c=0,containerRef:u,itemAs:h="div",itemStyle:l,itemHeightEstimate:d=300,itemKey:v=De,overscanBy:g=2,scrollTop:x,isScrolling:y,height:_,render:j,onRender:k}=t,T=0,S;const at=Xt(),L=We(e,n),E=o.length,{columnWidth:I,columnCount:ct,range:K,estimateHeight:se,size:ae,shortestColumn:ce}=e,X=ae(),Rt=ce(),pt=[],Ct=p==="list"?"listitem":p==="grid"?"gridcell":void 0,ut=rt(k);g=_*g;const Pt=x+g,lt=Rt<Pt&&X<E;if(K(Math.max(0,x-g/2),Pt,(C,O,G)=>{const N=o[C],dt=v(N,C),St={top:G,left:O,width:I,writingMode:"horizontal-tb",position:"absolute"};typeof process<"u",pt.push(et(h,{key:dt,ref:L(C),role:Ct,style:typeof l=="object"&&l!==null?Object.assign({},St,l):St},zt(j,C,N,I))),S===void 0?(T=C,S=C):(T=Math.min(T,C),S=Math.max(S,C))}),lt){const C=Math.min(E-X,Math.ceil((x+g-Rt)/d*ct));let O=X;const G=Ne(I);for(;O<X+C;O++){const N=o[O],dt=v(N,O);typeof process<"u",pt.push(et(h,{key:dt,ref:L(O),role:Ct,style:typeof l=="object"?Object.assign({},G,l):G},zt(j,O,N,I)))}}f.useEffect(()=>{typeof ut.current=="function"&&S!==void 0&&ut.current(T,S,o),Ot="1"},[T,S,o,ut]),f.useEffect(()=>{lt&&at()},[lt,e]);const jt=Ie(y,se(E,d));return et(i,{ref:u,key:Ot,id:r,role:p,className:s,tabIndex:c,style:typeof a=="object"?Ae(jt,a):jt,children:pt})}let Ot="0";const zt=Kt([Et,{},WeakMap,Et],(t,e,n,o)=>et(t,{index:e,data:n,width:o})),Ie=st((t,e)=>({position:"relative",width:"100%",maxWidth:"100%",height:Math.ceil(e),maxHeight:Math.ceil(e),willChange:t?"contents":void 0,pointerEvents:t?"none":void 0})),Gt=(t,e)=>t[0]===e[0]&&t[1]===e[1],Ae=st((t,e)=>Object.assign({},t,e),Gt);function De(t,e){return e}const Ne=st(t=>({width:t,zIndex:-1e3,visibility:"hidden",position:"absolute",writingMode:"horizontal-tb"}),(t,e)=>t[0]===e[0]),We=st((t,e)=>n=>o=>{o!==null&&(e&&(e.observe(o),gt.set(o,n)),t.get(n)===void 0&&t.set(n,o.offsetHeight))},Gt);let Yt="undefined",A=typeof window!==Yt?window:{},He=typeof performance!==Yt?performance:Date,bt=()=>He.now(),Jt="AnimationFrame",Lt="cancel"+Jt,Mt="request"+Jt,ot=A[Mt]&&A[Mt].bind(A),yt=A[Lt]&&A[Lt].bind(A);function Fe(t){return clearTimeout(t)}if(!ot||!yt){let t=0;ot=e=>{let n=bt(),o=Math.max(t+1e3/60,n);return setTimeout(()=>{e(t=o)},o-n)},yt=Fe}const $e=t=>{yt(t.v||-1)},qe=(t,e)=>{const n=bt(),o={},i=()=>{bt()-n>=e?t.call(null):o.v=ot(i)};return o.v=ot(i),o},Ue=typeof performance<"u"?performance:Date,Ve=()=>Ue.now();function Zt(t,e=30,n=!1){const o=rt(t),i=1e3/e,r=f.useRef(0),s=f.useRef(),a=()=>s.current&&clearTimeout(s.current),p=[e,n,o];function c(){r.current=0,a()}return f.useEffect(()=>c,p),f.useCallback(function(){const u=arguments,h=Ve(),l=()=>{r.current=h,a(),o.current.apply(null,u)},d=r.current;if(n&&d===0)return l();if(h-d>i){if(d>0)return l();r.current=h}a(),s.current=setTimeout(()=>{l(),r.current=0},i)},p)}function Ke(t,e,n){const o=f.useState(t);return[o[0],Zt(o[1],e,n)]}const W=typeof window>"u"?null:window,Bt=()=>W.scrollY!==void 0?W.scrollY:W.pageYOffset===void 0?0:W.pageYOffset,Xe=(t=30)=>{const e=Ke(typeof window>"u"?0:Bt,t,!0);return $(W,"scroll",()=>e[1](Bt())),e[0]},Ge=Xe;function Ye(t,e){t===void 0&&(t=0),e===void 0&&(e=12);const n=Ge(e),[o,i]=f.useState(!1),r=f.useRef(0);return f.useEffect(()=>{r.current===1&&i(!0);let s=!1;const a=qe(()=>{s||i(!1)},40+1e3/e);return r.current=1,()=>{s=!0,$e(a)}},[e,n]),{scrollTop:Math.max(0,n-t),isScrolling:o}}function Je(t){const{scrollTop:e,isScrolling:n}=Ye(t.offset,t.scrollFps);return ke({scrollTop:e,isScrolling:n,positioner:t.positioner,resizeObserver:t.resizeObserver,items:t.items,onRender:t.onRender,as:t.as,id:t.id,className:t.className,style:t.style,role:t.role,tabIndex:t.tabIndex,containerRef:t.containerRef,itemAs:t.itemAs,itemStyle:t.itemStyle,itemHeightEstimate:t.itemHeightEstimate,itemKey:t.itemKey,overscanBy:t.overscanBy,height:t.height,render:t.render})}const Ze=pe[typeof document<"u"&&document.createElement!==void 0?"useLayoutEffect":"useEffect"],Qe=Ze;function tn(t,e){e===void 0&&(e=en);const[n,o]=f.useState({offset:0,width:0});return Qe(()=>{const{current:i}=t;if(i!==null){let r=0,s=i;do r+=s.offsetTop||0,s=s.offsetParent;while(s);(r!==n.offset||i.offsetWidth!==n.width)&&o({offset:r,width:i.offsetWidth})}},e),n}const en=[];function nn(t,e){let{width:n,columnWidth:o=200,columnGutter:i=0,rowGutter:r,columnCount:s,maxColumnCount:a}=t;e===void 0&&(e=an);const p=()=>{const[v,g]=sn(n,o,i,s,a);return on(g,v,i,r??i)},c=f.useRef();c.current===void 0&&(c.current=p());const u=f.useRef(e),h=[n,o,i,r,s,a],l=f.useRef(h),d=!h.every((v,g)=>l.current[g]===v);if(typeof process<"u",d||!e.every((v,g)=>u.current[g]===v)){const v=c.current,g=p();if(u.current=e,l.current=h,d){const x=v.size();for(let y=0;y<x;y++){const _=v.get(y);g.set(y,_!==void 0?_.height:0)}}c.current=g}return c.current}const on=function(t,e,n,o){n===void 0&&(n=0),o===void 0&&(o=n);const i=we(),r=new Array(t),s=[],a=new Array(t);for(let p=0;p<t;p++)r[p]=0,a[p]=[];return{columnCount:t,columnWidth:e,set:function(p,c){c===void 0&&(c=0);let u=0;for(let l=1;l<r.length;l++)r[l]<r[u]&&(u=l);const h=r[u]||0;r[u]=h+c+o,a[u].push(p),s[p]={left:u*(e+n),top:h,height:c,column:u},i.insert(h,h+c,p)},get:p=>s[p],update:p=>{const c=new Array(t);let u=0,h=0;for(;u<p.length-1;u++){const l=p[u],d=s[l];d.height=p[++u],i.remove(l),i.insert(d.top,d.top+d.height,l),c[d.column]=c[d.column]===void 0?l:Math.min(l,c[d.column])}for(u=0;u<c.length;u++){if(c[u]===void 0)continue;const l=a[u],d=rn(l,c[u]),v=a[u][d],g=s[v];for(r[u]=g.top+g.height+o,h=d+1;h<l.length;h++){const x=l[h],y=s[x];y.top=r[u],r[u]=y.top+y.height+o,i.remove(x),i.insert(y.top,y.top+y.height,x)}}},range:(p,c,u)=>i.search(p,c,(h,l)=>u(h,s[h].left,l)),estimateHeight:(p,c)=>{const u=Math.max(0,Math.max.apply(null,r));return p===i.size?u:u+Math.ceil((p-i.size)/t)*c},shortestColumn:()=>r.length>1?Math.min.apply(null,r):r[0]||0,size(){return i.size},all(){return s}}},rn=(t,e)=>{let n=0,o=t.length-1;for(;n<=o;){const i=n+o>>>1,r=t[i];if(r===e)return i;r<=e?n=i+1:o=i-1}return-1},sn=function(t,e,n,o,i){return t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=8),o=o||Math.min(Math.floor((t+n)/(e+n)),i||1/0)||1,[Math.floor((t-n*(o-1))/o),o]},an=[];var M=[],cn=function(){return M.some(function(t){return t.activeTargets.length>0})},pn=function(){return M.some(function(t){return t.skippedTargets.length>0})},kt="ResizeObserver loop completed with undelivered notifications.",un=function(){var t;typeof ErrorEvent=="function"?t=new ErrorEvent("error",{message:kt}):(t=document.createEvent("Event"),t.initEvent("error",!1,!1),t.message=kt),window.dispatchEvent(t)},V;(function(t){t.BORDER_BOX="border-box",t.CONTENT_BOX="content-box",t.DEVICE_PIXEL_CONTENT_BOX="device-pixel-content-box"})(V||(V={}));var B=function(t){return Object.freeze(t)},ln=function(){function t(e,n){this.inlineSize=e,this.blockSize=n,B(this)}return t}(),Qt=function(){function t(e,n,o,i){return this.x=e,this.y=n,this.width=o,this.height=i,this.top=this.y,this.left=this.x,this.bottom=this.top+this.height,this.right=this.left+this.width,B(this)}return t.prototype.toJSON=function(){var e=this,n=e.x,o=e.y,i=e.top,r=e.right,s=e.bottom,a=e.left,p=e.width,c=e.height;return{x:n,y:o,top:i,right:r,bottom:s,left:a,width:p,height:c}},t.fromRect=function(e){return new t(e.x,e.y,e.width,e.height)},t}(),_t=function(t){return t instanceof SVGElement&&"getBBox"in t},te=function(t){if(_t(t)){var e=t.getBBox(),n=e.width,o=e.height;return!n&&!o}var i=t,r=i.offsetWidth,s=i.offsetHeight;return!(r||s||t.getClientRects().length)},It=function(t){var e;if(t instanceof Element)return!0;var n=(e=t==null?void 0:t.ownerDocument)===null||e===void 0?void 0:e.defaultView;return!!(n&&t instanceof n.Element)},dn=function(t){switch(t.tagName){case"INPUT":if(t.type!=="image")break;case"VIDEO":case"AUDIO":case"EMBED":case"OBJECT":case"CANVAS":case"IFRAME":case"IMG":return!0}return!1},U=typeof window<"u"?window:{},Z=new WeakMap,At=/auto|scroll/,hn=/^tb|vertical/,fn=/msie|trident/i.test(U.navigator&&U.navigator.userAgent),P=function(t){return parseFloat(t||"0")},D=function(t,e,n){return t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=!1),new ln((n?e:t)||0,(n?t:e)||0)},Dt=B({devicePixelContentBoxSize:D(),borderBoxSize:D(),contentBoxSize:D(),contentRect:new Qt(0,0,0,0)}),ee=function(t,e){if(e===void 0&&(e=!1),Z.has(t)&&!e)return Z.get(t);if(te(t))return Z.set(t,Dt),Dt;var n=getComputedStyle(t),o=_t(t)&&t.ownerSVGElement&&t.getBBox(),i=!fn&&n.boxSizing==="border-box",r=hn.test(n.writingMode||""),s=!o&&At.test(n.overflowY||""),a=!o&&At.test(n.overflowX||""),p=o?0:P(n.paddingTop),c=o?0:P(n.paddingRight),u=o?0:P(n.paddingBottom),h=o?0:P(n.paddingLeft),l=o?0:P(n.borderTopWidth),d=o?0:P(n.borderRightWidth),v=o?0:P(n.borderBottomWidth),g=o?0:P(n.borderLeftWidth),x=h+c,y=p+u,_=g+d,j=l+v,k=a?t.offsetHeight-j-t.clientHeight:0,T=s?t.offsetWidth-_-t.clientWidth:0,S=i?x+_:0,at=i?y+j:0,L=o?o.width:P(n.width)-S-T,E=o?o.height:P(n.height)-at-k,I=L+x+T+_,ct=E+y+k+j,K=B({devicePixelContentBoxSize:D(Math.round(L*devicePixelRatio),Math.round(E*devicePixelRatio),r),borderBoxSize:D(I,ct,r),contentBoxSize:D(L,E,r),contentRect:new Qt(h,p,L,E)});return Z.set(t,K),K},ne=function(t,e,n){var o=ee(t,n),i=o.borderBoxSize,r=o.contentBoxSize,s=o.devicePixelContentBoxSize;switch(e){case V.DEVICE_PIXEL_CONTENT_BOX:return s;case V.BORDER_BOX:return i;default:return r}},mn=function(){function t(e){var n=ee(e);this.target=e,this.contentRect=n.contentRect,this.borderBoxSize=B([n.borderBoxSize]),this.contentBoxSize=B([n.contentBoxSize]),this.devicePixelContentBoxSize=B([n.devicePixelContentBoxSize])}return t}(),oe=function(t){if(te(t))return 1/0;for(var e=0,n=t.parentNode;n;)e+=1,n=n.parentNode;return e},vn=function(){var t=1/0,e=[];M.forEach(function(s){if(s.activeTargets.length!==0){var a=[];s.activeTargets.forEach(function(c){var u=new mn(c.target),h=oe(c.target);a.push(u),c.lastReportedSize=ne(c.target,c.observedBox),h<t&&(t=h)}),e.push(function(){s.callback.call(s.observer,a,s.observer)}),s.activeTargets.splice(0,s.activeTargets.length)}});for(var n=0,o=e;n<o.length;n++){var i=o[n];i()}return t},Nt=function(t){M.forEach(function(n){n.activeTargets.splice(0,n.activeTargets.length),n.skippedTargets.splice(0,n.skippedTargets.length),n.observationTargets.forEach(function(i){i.isActive()&&(oe(i.target)>t?n.activeTargets.push(i):n.skippedTargets.push(i))})})},gn=function(){var t=0;for(Nt(t);cn();)t=vn(),Nt(t);return pn()&&un(),t>0},ft,ie=[],bn=function(){return ie.splice(0).forEach(function(t){return t()})},yn=function(t){if(!ft){var e=0,n=document.createTextNode(""),o={characterData:!0};new MutationObserver(function(){return bn()}).observe(n,o),ft=function(){n.textContent="".concat(e?e--:e++)}}ie.push(t),ft()},xn=function(t){yn(function(){requestAnimationFrame(t)})},nt=0,_n=function(){return!!nt},wn=250,Rn={attributes:!0,characterData:!0,childList:!0,subtree:!0},Wt=["resize","load","transitionend","animationend","animationstart","animationiteration","keyup","keydown","mouseup","mousedown","mouseover","mouseout","blur","focus"],Ht=function(t){return t===void 0&&(t=0),Date.now()+t},mt=!1,Cn=function(){function t(){var e=this;this.stopped=!0,this.listener=function(){return e.schedule()}}return t.prototype.run=function(e){var n=this;if(e===void 0&&(e=wn),!mt){mt=!0;var o=Ht(e);xn(function(){var i=!1;try{i=gn()}finally{if(mt=!1,e=o-Ht(),!_n())return;i?n.run(1e3):e>0?n.run(e):n.start()}})}},t.prototype.schedule=function(){this.stop(),this.run()},t.prototype.observe=function(){var e=this,n=function(){return e.observer&&e.observer.observe(document.body,Rn)};document.body?n():U.addEventListener("DOMContentLoaded",n)},t.prototype.start=function(){var e=this;this.stopped&&(this.stopped=!1,this.observer=new MutationObserver(this.listener),this.observe(),Wt.forEach(function(n){return U.addEventListener(n,e.listener,!0)}))},t.prototype.stop=function(){var e=this;this.stopped||(this.observer&&this.observer.disconnect(),Wt.forEach(function(n){return U.removeEventListener(n,e.listener,!0)}),this.stopped=!0)},t}(),xt=new Cn,Ft=function(t){!nt&&t>0&&xt.start(),nt+=t,!nt&&xt.stop()},Pn=function(t){return!_t(t)&&!dn(t)&&getComputedStyle(t).display==="inline"},jn=function(){function t(e,n){this.target=e,this.observedBox=n||V.CONTENT_BOX,this.lastReportedSize={inlineSize:0,blockSize:0}}return t.prototype.isActive=function(){var e=ne(this.target,this.observedBox,!0);return Pn(this.target)&&(this.lastReportedSize=e),this.lastReportedSize.inlineSize!==e.inlineSize||this.lastReportedSize.blockSize!==e.blockSize},t}(),Sn=function(){function t(e,n){this.activeTargets=[],this.skippedTargets=[],this.observationTargets=[],this.observer=e,this.callback=n}return t}(),Q=new WeakMap,$t=function(t,e){for(var n=0;n<t.length;n+=1)if(t[n].target===e)return n;return-1},tt=function(){function t(){}return t.connect=function(e,n){var o=new Sn(e,n);Q.set(e,o)},t.observe=function(e,n,o){var i=Q.get(e),r=i.observationTargets.length===0;$t(i.observationTargets,n)<0&&(r&&M.push(i),i.observationTargets.push(new jn(n,o&&o.box)),Ft(1),xt.schedule())},t.unobserve=function(e,n){var o=Q.get(e),i=$t(o.observationTargets,n),r=o.observationTargets.length===1;i>=0&&(r&&M.splice(M.indexOf(o),1),o.observationTargets.splice(i,1),Ft(-1))},t.disconnect=function(e){var n=this,o=Q.get(e);o.observationTargets.slice().forEach(function(i){return n.unobserve(e,i.target)}),o.activeTargets.splice(0,o.activeTargets.length)},t}(),Tn=function(){function t(e){if(arguments.length===0)throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");if(typeof e!="function")throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");tt.connect(this,e)}return t.prototype.observe=function(e,n){if(arguments.length===0)throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!It(e))throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");tt.observe(this,e,n)},t.prototype.unobserve=function(e){if(arguments.length===0)throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");if(!It(e))throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");tt.unobserve(this,e)},t.prototype.disconnect=function(){tt.disconnect(this)},t.toString=function(){return"function ResizeObserver () { [polyfill code] }"},t}(),En=function(e){var n=[],o=null,i=function(){for(var s=arguments.length,a=new Array(s),p=0;p<s;p++)a[p]=arguments[p];n=a,!o&&(o=requestAnimationFrame(function(){o=null,e.apply(void 0,n)}))};return i.cancel=function(){o&&(cancelAnimationFrame(o),o=null)},i};const qt=En,On=typeof window<"u"&&"ResizeObserver"in window?window.ResizeObserver:Tn;function zn(t){const e=Xt(),n=Mn(t,e);function o(){return n.disconnect()}return f.useEffect(()=>o,[n]),n}function Ln(t){t.cancel()}const Mn=Kt([WeakMap],(t,e)=>{const n=[],o=qt(()=>{n.length>0&&(t.update(n),e(n)),n.length=0}),i=c=>{const u=c.offsetHeight;if(u>0){const h=gt.get(c);if(h!==void 0){const l=t.get(h);l!==void 0&&u!==l.height&&n.push(h,u)}}o()},r=new Map,s=c=>{let u=0;for(;u<c.length;u++){const h=c[u],l=gt.get(h.target);if(l===void 0)continue;let d=r.get(l);d||(d=qt(i),r.set(l,d)),d(h.target)}},a=new On(s),p=a.disconnect.bind(a);return a.disconnect=()=>{p(),r.forEach(Ln)},a});function Bn(t,e){var n;const{align:o="top",element:i=typeof window<"u"&&window,offset:r=0,height:s=typeof window<"u"?window.innerHeight:0}=e,a=rt({positioner:t,element:i,align:o,offset:r,height:s}),p=f.useRef(()=>{const d=a.current.element;return d&&"current"in d?d.current:d}).current,[c,u]=f.useReducer((d,v)=>{const g={position:d.position,index:d.index,prevTop:d.prevTop};if(v.type==="scrollToIndex"){var x;return{position:a.current.positioner.get((x=v.value)!==null&&x!==void 0?x:-1),index:v.value,prevTop:void 0}}else if(v.type==="setPosition")g.position=v.value;else if(v.type==="setPrevTop")g.prevTop=v.value;else if(v.type==="reset")return Ut;return g},Ut),h=Zt(u,15);$(p(),"scroll",()=>{if(!c.position&&c.index){const d=a.current.positioner.get(c.index);d&&u({type:"setPosition",value:d})}});const l=c.index!==void 0&&((n=a.current.positioner.get(c.index))===null||n===void 0?void 0:n.top);return f.useEffect(()=>{const d=p();if(!d)return;const{height:v,align:g,offset:x,positioner:y}=a.current;if(c.position){let _=c.position.top;g==="bottom"?_=_-v+c.position.height:g==="center"&&(_-=(v-c.position.height)/2),d.scrollTo(0,Math.max(0,_+=x));let j=!1;const k=setTimeout(()=>!j&&u({type:"reset"}),400);return()=>{j=!0,clearTimeout(k)}}else if(c.index!==void 0){let _=y.shortestColumn()/y.size()*c.index;c.prevTop&&(_=Math.max(_,c.prevTop+v)),d.scrollTo(0,_),h({type:"setPrevTop",value:_})}},[l,c,a,p,h]),f.useRef(d=>{u({type:"scrollToIndex",value:d})}).current}const Ut={index:void 0,position:void 0,prevTop:void 0},kn=f.createElement;function In(t){const e=f.useRef(null),n=Te({initialWidth:t.ssrWidth,initialHeight:t.ssrHeight}),o=tn(e,n),i=Object.assign({offset:o.offset,width:o.width||n[0],height:n[1],containerRef:e},t);i.positioner=nn(i),i.resizeObserver=zn(i.positioner);const r=Bn(i.positioner,{height:i.height,offset:o.offset,align:typeof t.scrollToIndex=="object"?t.scrollToIndex.align:void 0}),s=t.scrollToIndex&&(typeof t.scrollToIndex=="number"?t.scrollToIndex:t.scrollToIndex.index);return f.useEffect(()=>{s!==void 0&&r(s)},[s,r]),kn(Je,i)}var wt={},An=(t,e)=>{let n;return function o(){const i=Math.floor(Math.random()*(e-t+1)+t);return n=i===n&&t!==e?o():i,n}};const Dn=An;var Nn=t=>{const e=Dn(0,t.length-1);return()=>t[e()]};const Wn=["Abby","Angel","Annie","Baby","Bailey","Bandit","Bear","Bella","Bob","Boo","Boots","Bubba","Buddy","Buster","Cali","Callie","Casper","Charlie","Chester","Chloe","Cleo","Coco","Cookie","Cuddles","Daisy","Dusty","Felix","Fluffy","Garfield","George","Ginger","Gizmo","Gracie","Harley","Jack","Jasmine","Jasper","Kiki","Kitty","Leo","Lilly","Lily","Loki","Lola","Lucky","Lucy","Luna","Maggie","Max","Mia","Midnight","Milo","Mimi","Miss kitty","Missy","Misty","Mittens","Molly","Muffin","Nala","Oliver","Oreo","Oscar","Patches","Peanut","Pepper","Precious","Princess","Pumpkin","Rascal","Rocky","Sadie","Salem","Sam","Samantha","Sammy","Sasha","Sassy","Scooter","Shadow","Sheba","Simba","Simon","Smokey","Snickers","Snowball","Snuggles","Socks","Sophie","Spooky","Sugar","Tiger","Tigger","Tinkerbell","Toby","Trouble","Whiskers","Willow","Zoe","Zoey"],Hn=Nn,re=Wn;wt.all=re;wt.random=Hn(re);const Vt=["https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg","https://cdn.pixabay.com/photo/2015/06/03/13/13/cats-796437__480.jpg","https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg","https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg","https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg","https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg","https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg","https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172__480.jpg","https://cdn.pixabay.com/photo/2013/10/28/14/30/cat-201855__480.jpg","https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793__480.jpg","https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/52/cat-2361787__480.jpg","https://cdn.pixabay.com/photo/2014/10/01/10/46/cat-468232__480.jpg","https://cdn.pixabay.com/photo/2014/04/29/13/19/cat-334383__480.jpg","https://cdn.pixabay.com/photo/2014/01/17/14/53/cat-246933__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/46/cats-2361762__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/06/cat-2332444__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/35/cat-301720__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/07/cat-2332451__480.jpg","https://cdn.pixabay.com/photo/2014/08/03/00/51/kitten-408798__480.jpg","https://cdn.pixabay.com/photo/2017/05/11/07/27/cat-2303146__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/49/cat-301723__480.jpg","https://cdn.pixabay.com/photo/2013/07/18/20/27/cat-165068__480.jpg","https://cdn.pixabay.com/photo/2017/05/25/07/40/cat-2342562__480.jpg","https://cdn.pixabay.com/photo/2012/02/27/16/57/animal-17430__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/15/15/cat-2208535__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/10/57/cat-2323258__480.jpg","https://cdn.pixabay.com/photo/2016/11/18/21/26/cat-1836936__480.jpg","https://cdn.pixabay.com/photo/2017/03/19/22/09/cat-2157747__480.jpg","https://cdn.pixabay.com/photo/2017/04/21/13/24/red-headed-cat-2248705__480.jpg","https://cdn.pixabay.com/photo/2017/04/10/18/52/cat-2219427__480.jpg","https://cdn.pixabay.com/photo/2017/05/22/20/54/rest-2335341__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/09/46/cat-2309126__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/20/53/cat-2310623__480.jpg","https://cdn.pixabay.com/photo/2017/03/30/14/14/cat-2188612__480.jpg","https://cdn.pixabay.com/photo/2017/05/30/14/57/hunter-2357204__480.jpg","https://cdn.pixabay.com/photo/2017/05/12/06/00/cat-2306185__480.jpg","https://cdn.pixabay.com/photo/2017/05/23/21/31/cat-2338666__480.jpg","https://cdn.pixabay.com/photo/2017/05/03/05/25/cat-2280148__480.jpg","https://cdn.pixabay.com/photo/2017/04/08/13/53/cat-2213342__480.jpg","https://cdn.pixabay.com/photo/2017/03/22/00/13/cat-2163594__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/21/14/british-shorthair-2310671__480.jpg","https://cdn.pixabay.com/photo/2017/02/27/09/09/cat-2102418__480.jpg","https://cdn.pixabay.com/photo/2017/03/05/16/21/cat-2118990__480.jpg","https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346301__480.jpg","https://cdn.pixabay.com/photo/2017/02/12/11/52/cat-house-physician-2059812__480.jpg","https://cdn.pixabay.com/photo/2017/04/27/08/26/animal-2264818__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/16/36/cat-2331692__480.jpg","https://cdn.pixabay.com/photo/2017/03/12/19/09/cat-2137810__480.jpg","https://cdn.pixabay.com/photo/2017/03/16/18/36/summer-2149911__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/19/16/cat-2209109__480.jpg","https://cdn.pixabay.com/photo/2017/04/05/10/31/cat-baby-2204590__480.jpg","https://cdn.pixabay.com/photo/2017/02/24/17/10/chartreux-2095661__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/07/18/cat-2308849__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/11/21/cat-2323326__480.jpg","https://cdn.pixabay.com/photo/2017/03/06/09/16/cat-2120915__480.jpg","https://cdn.pixabay.com/photo/2017/05/23/09/01/cat-2336605__480.jpg","https://cdn.pixabay.com/photo/2016/11/21/12/52/animal-1845248__480.jpg","https://cdn.pixabay.com/photo/2017/04/07/18/37/cat-2211609__480.jpg","https://cdn.pixabay.com/photo/2017/05/10/14/46/cat-2301015__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/09/47/cat-2309127__480.jpg","https://cdn.pixabay.com/photo/2017/05/22/07/40/cat-2333413__480.jpg","https://cdn.pixabay.com/photo/2017/03/12/01/29/cats-2136245__480.jpg","https://cdn.pixabay.com/photo/2017/05/29/10/30/kitten-2353403__480.jpg","https://cdn.pixabay.com/photo/2017/05/15/09/59/cat-2314326__480.jpg","https://cdn.pixabay.com/photo/2016/11/07/22/49/kitten-1807071__480.jpg","https://cdn.pixabay.com/photo/2016/12/16/20/44/cat-1912330__480.jpg","https://cdn.pixabay.com/photo/2016/11/06/19/42/cat-1803904__480.jpg","https://cdn.pixabay.com/photo/2016/11/15/12/36/cat-1826117__480.jpg","https://cdn.pixabay.com/photo/2016/03/27/16/55/cats-1283110__480.jpg","https://cdn.pixabay.com/photo/2016/08/30/18/15/cat-1631648__480.jpg","https://cdn.pixabay.com/photo/2017/06/11/11/14/cat-2392058__480.jpg","https://cdn.pixabay.com/photo/2017/01/07/14/33/cat-1960537__480.jpg","https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744750__480.jpg","https://cdn.pixabay.com/photo/2017/02/26/14/12/cat-2100306__480.jpg","https://cdn.pixabay.com/photo/2017/05/05/21/51/cat-2288326__480.jpg","https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346303__480.jpg","https://cdn.pixabay.com/photo/2016/09/16/19/47/cat-1674990__480.jpg","https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744749__480.jpg","https://cdn.pixabay.com/photo/2017/02/03/09/26/cat-2034833__480.jpg","https://cdn.pixabay.com/photo/2016/10/20/05/50/cat-1754702__480.jpg","https://cdn.pixabay.com/photo/2016/11/21/11/41/animal-1844835__480.jpg","https://cdn.pixabay.com/photo/2017/03/05/18/05/cat-2119283__480.jpg","https://cdn.pixabay.com/photo/2017/02/02/18/18/cat-2033451__480.jpg","https://cdn.pixabay.com/photo/2016/12/13/19/12/cat-1904907__480.jpg","https://cdn.pixabay.com/photo/2016/12/23/15/58/cat-1927512__480.jpg","https://cdn.pixabay.com/photo/2016/12/11/02/41/cat-1898659__480.jpg","https://cdn.pixabay.com/photo/2016/08/16/14/40/cat-1598113__480.jpg","https://cdn.pixabay.com/photo/2016/07/13/10/34/cat-1514076__480.jpg","https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089__480.jpg","https://cdn.pixabay.com/photo/2016/05/17/17/16/cat-1398627__480.jpg","https://cdn.pixabay.com/photo/2016/09/18/12/29/cat-1678009__480.jpg","https://cdn.pixabay.com/photo/2016/12/11/02/51/cat-1898678__480.jpg"],Fn=""+new URL("../gif/loadiing-e416279f.gif",import.meta.url).href,$n=({src:t,alt:e})=>{const[n,o]=f.useState(""),i=f.useRef(null);return f.useEffect(()=>{setTimeout(()=>{let r=null;return i.current&&(r=new IntersectionObserver(s=>{s[0].isIntersecting&&(o(t),r.unobserve(i.current))},{rootMargin:"0px 0px 200px 0px"}),r.observe(i.current)),()=>{r&&r.unobserve}},3e3)},[t]),R.jsx("img",{ref:i,src:n||Fn,alt:e})},Gn=()=>{const[t,e]=f.useState(()=>{let n=0;return Array.from(Array(100),()=>({id:n++,name:wt.random(),src:Vt[Math.floor(Math.random()*Vt.length)]}))});return R.jsx(R.Fragment,{children:R.jsxs(ue,{className:"max-w-full relative",children:[R.jsxs(he,{minify:"false",children:[R.jsx("span",{role:"img","aria-hidden":"true",children:"🧱"}),"MASONIC"]}),R.jsx(le,{children:R.jsx(de,{children:R.jsx(In,{items:t,columnGutter:8,columnWidth:172,overscanBy:5,render:qn})})})]})})};function qn({data:{id:t,name:e,src:n}}){return R.jsxs(fe,{children:[R.jsx($n,{src:n||"",alt:"正在加载..."}),R.jsx("span",{children:e})]})}export{Gn as default};