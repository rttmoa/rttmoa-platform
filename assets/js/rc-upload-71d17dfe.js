import{j as U,k as $,a as I,b as v,l as h,g as P,_ as T,c as _,h as M,d as K,m as G,n as N,f as z}from"./@babel-c46ce09a.js";import{a as S,r as L}from"./react-12b51ca5.js";import{c as J}from"./classnames-3ded05b8.js";import{d as Q,D as V}from"./rc-util-8976b5fa.js";const q=function(s,n){if(s&&n){var p=Array.isArray(n)?n:n.split(","),e=s.name||"",a=s.type||"",r=a.replace(/\/.*$/,"");return p.some(function(i){var t=i.trim();if(/^\*(\/\*)?$/.test(i))return!0;if(t.charAt(0)==="."){var u=e.toLowerCase(),o=t.toLowerCase(),c=[o];return(o===".jpg"||o===".jpeg")&&(c=[".jpg",".jpeg"]),c.some(function(f){return u.endsWith(f)})}return/\/\*$/.test(t)?r===t.replace(/\/.*$/,""):a===t?!0:/^\w+$/.test(t)?(Q(!1,"Upload takes an invalidate 'accept' type '".concat(t,"'.Skip for check.")),!0):!1})}return!0};function Y(s,n){var p="cannot ".concat(s.method," ").concat(s.action," ").concat(n.status,"'"),e=new Error(p);return e.status=n.status,e.method=s.method,e.url=s.action,e}function O(s){var n=s.responseText||s.response;if(!n)return n;try{return JSON.parse(n)}catch{return n}}function Z(s){var n=new XMLHttpRequest;s.onProgress&&n.upload&&(n.upload.onprogress=function(r){r.total>0&&(r.percent=r.loaded/r.total*100),s.onProgress(r)});var p=new FormData;s.data&&Object.keys(s.data).forEach(function(a){var r=s.data[a];if(Array.isArray(r)){r.forEach(function(i){p.append("".concat(a,"[]"),i)});return}p.append(a,r)}),s.file instanceof Blob?p.append(s.filename,s.file,s.file.name):p.append(s.filename,s.file),n.onerror=function(r){s.onError(r)},n.onload=function(){return n.status<200||n.status>=300?s.onError(Y(s,n),O(n)):s.onSuccess(O(n),n)},n.open(s.method,s.action,!0),s.withCredentials&&"withCredentials"in n&&(n.withCredentials=!0);var e=s.headers||{};return e["X-Requested-With"]!==null&&n.setRequestHeader("X-Requested-With","XMLHttpRequest"),Object.keys(e).forEach(function(a){e[a]!==null&&n.setRequestHeader(a,e[a])}),n.send(p),{abort:function(){n.abort()}}}function ee(s,n){var p=s.createReader(),e=[];function a(){p.readEntries(function(r){var i=Array.prototype.slice.apply(r);e=e.concat(i);var t=!i.length;t?n(e):a()})}a()}var re=function(n,p,e){var a=function r(i,t){i&&(i.path=t||"",i.isFile?i.file(function(u){e(u)&&(i.fullPath&&!u.webkitRelativePath&&(Object.defineProperties(u,{webkitRelativePath:{writable:!0}}),u.webkitRelativePath=i.fullPath.replace(/^\//,""),Object.defineProperties(u,{webkitRelativePath:{writable:!1}})),p([u]))}):i.isDirectory&&ee(i,function(u){u.forEach(function(o){r(o,"".concat(t).concat(i.name,"/"))})}))};n.forEach(function(r){a(r.webkitGetAsEntry())})},te=+new Date,ae=0;function R(){return"rc-upload-".concat(te,"-").concat(++ae)}var ne=["component","prefixCls","className","classNames","disabled","id","style","styles","multiple","accept","capture","children","directory","openFileDialogOnClick","onMouseEnter","onMouseLeave","hasControlInside"],se=function(s){U(p,s);var n=$(p);function p(){var e;I(this,p);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return e=n.call.apply(n,[this].concat(r)),v(h(e),"state",{uid:R()}),v(h(e),"reqs",{}),v(h(e),"fileInput",void 0),v(h(e),"_isMounted",void 0),v(h(e),"onChange",function(t){var u=e.props,o=u.accept,c=u.directory,f=t.target.files,d=P(f).filter(function(m){return!c||q(m,o)});e.uploadFiles(d),e.reset()}),v(h(e),"onClick",function(t){var u=e.fileInput;if(u){var o=t.target,c=e.props.onClick;if(o&&o.tagName==="BUTTON"){var f=u.parentNode;f.focus(),o.blur()}u.click(),c&&c(t)}}),v(h(e),"onKeyDown",function(t){t.key==="Enter"&&e.onClick(t)}),v(h(e),"onFileDrop",function(t){var u=e.props.multiple;if(t.preventDefault(),t.type!=="dragover")if(e.props.directory)re(Array.prototype.slice.call(t.dataTransfer.items),e.uploadFiles,function(c){return q(c,e.props.accept)});else{var o=P(t.dataTransfer.files).filter(function(c){return q(c,e.props.accept)});u===!1&&(o=o.slice(0,1)),e.uploadFiles(o)}}),v(h(e),"uploadFiles",function(t){var u=P(t),o=u.map(function(c){return c.uid=R(),e.processFile(c,u)});Promise.all(o).then(function(c){var f=e.props.onBatchStart;f==null||f(c.map(function(d){var m=d.origin,y=d.parsedFile;return{file:m,parsedFile:y}})),c.filter(function(d){return d.parsedFile!==null}).forEach(function(d){e.post(d)})})}),v(h(e),"processFile",function(){var t=G(N().mark(function u(o,c){var f,d,m,y,C,w,b,F,E;return N().wrap(function(l){for(;;)switch(l.prev=l.next){case 0:if(f=e.props.beforeUpload,d=o,!f){l.next=14;break}return l.prev=3,l.next=6,f(o,c);case 6:d=l.sent,l.next=12;break;case 9:l.prev=9,l.t0=l.catch(3),d=!1;case 12:if(d!==!1){l.next=14;break}return l.abrupt("return",{origin:o,parsedFile:null,action:null,data:null});case 14:if(m=e.props.action,typeof m!="function"){l.next=21;break}return l.next=18,m(o);case 18:y=l.sent,l.next=22;break;case 21:y=m;case 22:if(C=e.props.data,typeof C!="function"){l.next=29;break}return l.next=26,C(o);case 26:w=l.sent,l.next=30;break;case 29:w=C;case 30:return b=(z(d)==="object"||typeof d=="string")&&d?d:o,b instanceof File?F=b:F=new File([b],o.name,{type:o.type}),E=F,E.uid=o.uid,l.abrupt("return",{origin:o,data:w,parsedFile:E,action:y});case 35:case"end":return l.stop()}},u,null,[[3,9]])}));return function(u,o){return t.apply(this,arguments)}}()),v(h(e),"saveFileInput",function(t){e.fileInput=t}),e}return T(p,[{key:"componentDidMount",value:function(){this._isMounted=!0}},{key:"componentWillUnmount",value:function(){this._isMounted=!1,this.abort()}},{key:"post",value:function(a){var r=this,i=a.data,t=a.origin,u=a.action,o=a.parsedFile;if(this._isMounted){var c=this.props,f=c.onStart,d=c.customRequest,m=c.name,y=c.headers,C=c.withCredentials,w=c.method,b=t.uid,F=d||Z,E={action:u,filename:m,data:i,file:o,headers:y,withCredentials:C,method:w||"post",onProgress:function(l){var g=r.props.onProgress;g==null||g(l,o)},onSuccess:function(l,g){var k=r.props.onSuccess;k==null||k(l,o,g),delete r.reqs[b]},onError:function(l,g){var k=r.props.onError;k==null||k(l,g,o),delete r.reqs[b]}};f(t),this.reqs[b]=F(E)}}},{key:"reset",value:function(){this.setState({uid:R()})}},{key:"abort",value:function(a){var r=this.reqs;if(a){var i=a.uid?a.uid:a;r[i]&&r[i].abort&&r[i].abort(),delete r[i]}else Object.keys(r).forEach(function(t){r[t]&&r[t].abort&&r[t].abort(),delete r[t]})}},{key:"render",value:function(){var a,r=this.props,i=r.component,t=r.prefixCls,u=r.className,o=r.classNames,c=o===void 0?{}:o,f=r.disabled,d=r.id,m=r.style,y=r.styles,C=y===void 0?{}:y,w=r.multiple,b=r.accept,F=r.capture,E=r.children,D=r.directory,l=r.openFileDialogOnClick,g=r.onMouseEnter,k=r.onMouseLeave,j=r.hasControlInside,W=_(r,ne),x=J((a={},v(a,t,!0),v(a,"".concat(t,"-disabled"),f),v(a,u,u),a)),B=D?{directory:"directory",webkitdirectory:"webkitdirectory"}:{},H=f?{}:{onClick:l?this.onClick:function(){},onKeyDown:l?this.onKeyDown:function(){},onMouseEnter:g,onMouseLeave:k,onDrop:this.onFileDrop,onDragOver:this.onFileDrop,tabIndex:j?void 0:"0"};return S.createElement(i,M({},H,{className:x,role:j?void 0:"button",style:m}),S.createElement("input",M({},V(W,{aria:!0,data:!0}),{id:d,disabled:f,type:"file",ref:this.saveFileInput,onClick:function(X){return X.stopPropagation()},key:this.state.uid,style:K({display:"none"},C.input),className:c.input,accept:b},B,{multiple:w,onChange:this.onChange},F!=null?{capture:F}:{})),E)}}]),p}(L.Component);function A(){}var oe=function(s){U(p,s);var n=$(p);function p(){var e;I(this,p);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return e=n.call.apply(n,[this].concat(r)),v(h(e),"uploader",void 0),v(h(e),"saveUploader",function(t){e.uploader=t}),e}return T(p,[{key:"abort",value:function(a){this.uploader.abort(a)}},{key:"render",value:function(){return S.createElement(se,M({},this.props,{ref:this.saveUploader}))}}]),p}(L.Component);v(oe,"defaultProps",{component:"span",prefixCls:"rc-upload",data:{},headers:{},name:"file",multipart:!1,onStart:A,onError:A,onSuccess:A,multiple:!1,beforeUpload:null,customRequest:null,withCredentials:!1,openFileDialogOnClick:!0,hasControlInside:!1});export{oe as U};