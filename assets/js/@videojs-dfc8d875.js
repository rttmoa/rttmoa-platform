import{w as G,a as h}from"./global-dfd2e60e.js";import{a as Y}from"./@ant-design-63539318.js";import{r as W}from"./@babel-c46ce09a.js";import{i as Q}from"./is-function-da9589a5.js";import{U as _}from"./url-toolkit-ba856e10.js";var X={exports:{}},Z=G,K=function(r,e){return e===void 0&&(e=!1),function(t,i,a){if(t){r(t);return}if(i.statusCode>=400&&i.statusCode<=599){var o=a;if(e)if(Z.TextDecoder){var u=b(i.headers&&i.headers["content-type"]);try{o=new TextDecoder(u).decode(a)}catch{}}else o=String.fromCharCode.apply(null,new Uint8Array(a));r({cause:o});return}r(null,a)}};function b(n){return n===void 0&&(n=""),n.toLowerCase().split(";").reduce(function(r,e){var t=e.split("="),i=t[0],a=t[1];return i.trim()==="charset"?a.trim():r},"utf-8")}var rr=K,z=G,er=W,nr=Q;A.httpHandler=rr;/**
 * @license
 * slighly modified parse-headers 2.0.2 <https://github.com/kesla/parse-headers/>
 * Copyright (c) 2014 David Björklund
 * Available under the MIT license
 * <https://github.com/kesla/parse-headers/blob/master/LICENCE>
 */var tr=function(r){var e={};return r&&r.trim().split(`
`).forEach(function(t){var i=t.indexOf(":"),a=t.slice(0,i).trim().toLowerCase(),o=t.slice(i+1).trim();typeof e[a]>"u"?e[a]=o:Array.isArray(e[a])?e[a].push(o):e[a]=[e[a],o]}),e};X.exports=A;X.exports.default=A;A.XMLHttpRequest=z.XMLHttpRequest||or;A.XDomainRequest="withCredentials"in new A.XMLHttpRequest?A.XMLHttpRequest:z.XDomainRequest;ar(["get","put","post","patch","head","delete"],function(n){A[n==="delete"?"del":n]=function(r,e,t){return e=$(r,e,t),e.method=n.toUpperCase(),j(e)}});function ar(n,r){for(var e=0;e<n.length;e++)r(n[e])}function ir(n){for(var r in n)if(n.hasOwnProperty(r))return!1;return!0}function $(n,r,e){var t=n;return nr(r)?(e=r,typeof n=="string"&&(t={uri:n})):t=er({},r,{uri:n}),t.callback=e,t}function A(n,r,e){return r=$(n,r,e),j(r)}function j(n){if(typeof n.callback>"u")throw new Error("callback argument missing");var r=!1,e=function(T,D,J){r||(r=!0,n.callback(T,D,J))};function t(){u.readyState===4&&setTimeout(o,0)}function i(){var s=void 0;if(u.response?s=u.response:s=u.responseText||ur(u),L)try{s=JSON.parse(s)}catch{}return s}function a(s){return clearTimeout(k),s instanceof Error||(s=new Error(""+(s||"Unknown XMLHttpRequest Error"))),s.statusCode=0,e(s,H)}function o(){if(!l){var s;clearTimeout(k),n.useXDR&&u.status===void 0?s=200:s=u.status===1223?204:u.status;var T=H,D=null;return s!==0?(T={body:i(),statusCode:s,method:m,headers:{},url:d,rawRequest:u},u.getAllResponseHeaders&&(T.headers=tr(u.getAllResponseHeaders()))):D=new Error("Internal XMLHttpRequest Error"),e(D,T,T.body)}}var u=n.xhr||null;u||(n.cors||n.useXDR?u=new A.XDomainRequest:u=new A.XMLHttpRequest);var v,l,d=u.url=n.uri||n.url,m=u.method=n.method||"GET",w=n.body||n.data,g=u.headers=n.headers||{},y=!!n.sync,L=!1,k,H={body:void 0,headers:{},statusCode:0,method:m,url:d,rawRequest:u};if("json"in n&&n.json!==!1&&(L=!0,g.accept||g.Accept||(g.Accept="application/json"),m!=="GET"&&m!=="HEAD"&&(g["content-type"]||g["Content-Type"]||(g["Content-Type"]="application/json"),w=JSON.stringify(n.json===!0?w:n.json))),u.onreadystatechange=t,u.onload=o,u.onerror=a,u.onprogress=function(){},u.onabort=function(){l=!0},u.ontimeout=a,u.open(m,d,!y,n.username,n.password),y||(u.withCredentials=!!n.withCredentials),!y&&n.timeout>0&&(k=setTimeout(function(){if(!l){l=!0,u.abort("timeout");var s=new Error("XMLHttpRequest timeout");s.code="ETIMEDOUT",a(s)}},n.timeout)),u.setRequestHeader)for(v in g)g.hasOwnProperty(v)&&u.setRequestHeader(v,g[v]);else if(n.headers&&!ir(n.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in n&&(u.responseType=n.responseType),"beforeSend"in n&&typeof n.beforeSend=="function"&&n.beforeSend(u),u.send(w||null),u}function ur(n){try{if(n.responseType==="document")return n.responseXML;var r=n.responseXML&&n.responseXML.documentElement.nodeName==="parsererror";if(n.responseType===""&&!r)return n.responseXML}catch{}return null}function or(){}var fr=X.exports;const $r=Y(fr);var O="http://example.com",jr=function(r,e){if(/^[a-z]+:/i.test(e))return e;/^data:/.test(r)&&(r=h.location&&h.location.href||"");var t=typeof h.URL=="function",i=/^\/\//.test(r),a=!h.location&&!/\/\//i.test(r);if(t?r=new h.URL(r,h.location||O):/\/\//i.test(r)||(r=_.buildAbsoluteURL(h.location&&h.location.href||"",r)),t){var o=new URL(e,r);return a?o.href.slice(O.length):i?o.href.slice(o.protocol.length):o.href}return _.buildAbsoluteURL(r,e)},E={mp4:/^(av0?1|avc0?[1234]|vp0?9|flac|opus|mp3|mp4a|mp4v|stpp.ttml.im1t)/,webm:/^(vp0?[89]|av0?1|opus|vorbis)/,ogg:/^(vp0?[89]|theora|flac|opus|vorbis)/,video:/^(av0?1|avc0?[1234]|vp0?[89]|hvc1|hev1|theora|mp4v)/,audio:/^(mp4a|flac|vorbis|opus|ac-[34]|ec-3|alac|mp3|speex|aac)/,text:/^(stpp.ttml.im1t)/,muxerVideo:/^(avc0?1)/,muxerAudio:/^(mp4a)/,muxerText:/a^/},vr=["video","audio","text"],U=["Video","Audio","Text"],lr=function(r){return r&&r.replace(/avc1\.(\d+)\.(\d+)/i,function(e,t,i){var a=("00"+Number(t).toString(16)).slice(-2),o=("00"+Number(i).toString(16)).slice(-2);return"avc1."+a+"00"+o})},cr=function(r){r===void 0&&(r="");var e=r.split(","),t=[];return e.forEach(function(i){i=i.trim();var a;vr.forEach(function(o){var u=E[o].exec(i.toLowerCase());if(!(!u||u.length<=1)){a=o;var v=i.substring(0,u[1].length),l=i.replace(v,"");t.push({type:v,details:l,mediaType:o})}}),a||t.push({type:i,details:"",mediaType:"unknown"})}),t},Vr=function(r,e){if(!r.mediaGroups.AUDIO||!e)return null;var t=r.mediaGroups.AUDIO[e];if(!t)return null;for(var i in t){var a=t[i];if(a.default&&a.playlists)return cr(a.playlists[0].attributes.CODECS)}return null},sr=function(r){return r===void 0&&(r=""),E.audio.test(r.trim().toLowerCase())},xr=function(r){return r===void 0&&(r=""),E.text.test(r.trim().toLowerCase())},dr=function(r){if(!(!r||typeof r!="string")){var e=r.toLowerCase().split(",").map(function(a){return lr(a.trim())}),t="video";e.length===1&&sr(e[0])?t="audio":e.length===1&&xr(e[0])&&(t="application");var i="mp4";return e.every(function(a){return E.mp4.test(a)})?i="mp4":e.every(function(a){return E.webm.test(a)})?i="webm":e.every(function(a){return E.ogg.test(a)})&&(i="ogg"),t+"/"+i+';codecs="'+r+'"'}},Jr=function(r){return r===void 0&&(r=""),h.MediaSource&&h.MediaSource.isTypeSupported&&h.MediaSource.isTypeSupported(dr(r))||!1},Yr=function(r){return r===void 0&&(r=""),r.toLowerCase().split(",").every(function(e){e=e.trim();for(var t=0;t<U.length;t++){var i=U[t];if(E["muxer"+i].test(e))return!0}return!1})},Wr="mp4a.40.2",Qr="avc1.4d400d",pr=/^(audio|video|application)\/(x-|vnd\.apple\.)?mpegurl/i,mr=/^application\/dash\+xml/i,Zr=function(r){return pr.test(r)?"hls":mr.test(r)?"dash":r==="application/vnd.videojs.vhs+json"?"vhs-json":null},hr=function(r){return r.toString(2).length},gr=function(r){return Math.ceil(hr(r)/8)},Ar=function(r){return ArrayBuffer.isView==="function"?ArrayBuffer.isView(r):r&&r.buffer instanceof ArrayBuffer},wr=function(r){return Ar(r)},f=function(r){return r instanceof Uint8Array?r:(!Array.isArray(r)&&!wr(r)&&!(r instanceof ArrayBuffer)&&(typeof r!="number"||typeof r=="number"&&r!==r?r=0:r=[r]),new Uint8Array(r&&r.buffer||r,r&&r.byteOffset||0,r&&r.byteLength||0))},x=h.BigInt||Number,M=[x("0x1"),x("0x100"),x("0x10000"),x("0x1000000"),x("0x100000000"),x("0x10000000000"),x("0x1000000000000"),x("0x100000000000000"),x("0x10000000000000000")];(function(){var n=new Uint16Array([65484]),r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);return r[0]===255?"big":r[0]===204?"little":"unknown"})();var Tr=function(r,e){var t=e===void 0?{}:e,i=t.signed,a=i===void 0?!1:i,o=t.le,u=o===void 0?!1:o;r=f(r);var v=u?"reduce":"reduceRight",l=r[v]?r[v]:Array.prototype[v],d=l.call(r,function(w,g,y){var L=u?y:Math.abs(y+1-r.length);return w+x(g)*M[L]},x(0));if(a){var m=M[r.length]/x(2)-x(1);d=x(d),d>m&&(d-=m,d-=m,d-=x(2))}return Number(d)},Er=function(r,e){var t=e===void 0?{}:e,i=t.le,a=i===void 0?!1:i;(typeof r!="bigint"&&typeof r!="number"||typeof r=="number"&&r!==r)&&(r=0),r=x(r);for(var o=gr(r),u=new Uint8Array(new ArrayBuffer(o)),v=0;v<o;v++){var l=a?v:Math.abs(v+1-u.length);u[l]=Number(r/M[v]&x(255)),r<0&&(u[l]=Math.abs(~u[l]),u[l]-=v===0?1:2)}return u},yr=function(r,e){if(typeof r!="string"&&r&&typeof r.toString=="function"&&(r=r.toString()),typeof r!="string")return new Uint8Array;e||(r=unescape(encodeURIComponent(r)));for(var t=new Uint8Array(r.length),i=0;i<r.length;i++)t[i]=r.charCodeAt(i);return t},Kr=function(){for(var r=arguments.length,e=new Array(r),t=0;t<r;t++)e[t]=arguments[t];if(e=e.filter(function(u){return u&&(u.byteLength||u.length)&&typeof u!="string"}),e.length<=1)return f(e[0]);var i=e.reduce(function(u,v,l){return u+(v.byteLength||v.length)},0),a=new Uint8Array(i),o=0;return e.forEach(function(u){u=f(u),a.set(u,o),o+=u.byteLength}),a},c=function(r,e,t){var i=t===void 0?{}:t,a=i.offset,o=a===void 0?0:a,u=i.mask,v=u===void 0?[]:u;r=f(r),e=f(e);var l=e.every?e.every:Array.prototype.every;return e.length&&r.length-o>=e.length&&l.call(e,function(d,m){var w=v[m]?v[m]&r[o+m]:r[o+m];return d===w})},br=function(r,e,t){e.forEach(function(i){for(var a in r.mediaGroups[i])for(var o in r.mediaGroups[i][a]){var u=r.mediaGroups[i][a][o];t(u,i,a,o)}})},Cr=function(r){return h.atob?h.atob(r):Buffer.from(r,"base64").toString("binary")};function re(n){for(var r=Cr(n),e=new Uint8Array(r.length),t=0;t<r.length;t++)e[t]=r.charCodeAt(t);return e}var Lr=f([73,68,51]),Dr=function(r,e){e===void 0&&(e=0),r=f(r);var t=r[e+5],i=r[e+6]<<21|r[e+7]<<14|r[e+8]<<7|r[e+9],a=(t&16)>>4;return a?i+20:i+10},F=function n(r,e){return e===void 0&&(e=0),r=f(r),r.length-e<10||!c(r,Lr,{offset:e})?e:(e+=Dr(r,e),n(r,e))},I=function(r){return typeof r=="string"?yr(r):r},Fr=function(r){return Array.isArray(r)?r.map(function(e){return I(e)}):[I(r)]},Br=function n(r,e,t){t===void 0&&(t=!1),e=Fr(e),r=f(r);var i=[];if(!e.length)return i;for(var a=0;a<r.length;){var o=(r[a]<<24|r[a+1]<<16|r[a+2]<<8|r[a+3])>>>0,u=r.subarray(a+4,a+8);if(o===0)break;var v=a+o;if(v>r.length){if(t)break;v=r.length}var l=r.subarray(a+8,v);c(u,e[0])&&(e.length===1?i.push(l):i.push.apply(i,n(l,e.slice(1),t))),a=v}return i},B={EBML:f([26,69,223,163]),DocType:f([66,130]),Segment:f([24,83,128,103]),SegmentInfo:f([21,73,169,102]),Tracks:f([22,84,174,107]),Track:f([174]),TrackNumber:f([215]),DefaultDuration:f([35,227,131]),TrackEntry:f([174]),TrackType:f([131]),FlagDefault:f([136]),CodecID:f([134]),CodecPrivate:f([99,162]),VideoTrack:f([224]),AudioTrack:f([225]),Cluster:f([31,67,182,117]),Timestamp:f([231]),TimestampScale:f([42,215,177]),BlockGroup:f([160]),BlockDuration:f([155]),Block:f([161]),SimpleBlock:f([163])},S=[128,64,32,16,8,4,2,1],Rr=function(r){for(var e=1,t=0;t<S.length&&!(r&S[t]);t++)e++;return e},R=function(r,e,t,i){t===void 0&&(t=!0),i===void 0&&(i=!1);var a=Rr(r[e]),o=r.subarray(e,e+a);return t&&(o=Array.prototype.slice.call(r,e,e+a),o[0]^=S[a-1]),{length:a,value:Tr(o,{signed:i}),bytes:o}},P=function n(r){return typeof r=="string"?r.match(/.{1,2}/g).map(function(e){return n(e)}):typeof r=="number"?Er(r):r},kr=function(r){return Array.isArray(r)?r.map(function(e){return P(e)}):[P(r)]},Mr=function n(r,e,t){if(t>=e.length)return e.length;var i=R(e,t,!1);if(c(r.bytes,i.bytes))return t;var a=R(e,t+i.length);return n(r,e,t+a.length+a.value+i.length)},q=function n(r,e){e=kr(e),r=f(r);var t=[];if(!e.length)return t;for(var i=0;i<r.length;){var a=R(r,i,!1),o=R(r,i+a.length),u=i+a.length+o.length;o.value===127&&(o.value=Mr(a,r,u),o.value!==r.length&&(o.value-=u));var v=u+o.value>r.length?r.length:u+o.value,l=r.subarray(u,v);c(e[0],a.bytes)&&(e.length===1?t.push(l):t=t.concat(n(l,e.slice(1))));var d=a.length+o.length+l.length;i+=d}return t},Sr=f([0,0,0,1]),Nr=f([0,0,1]),Xr=f([0,0,3]),Hr=function(r){for(var e=[],t=1;t<r.length-2;)c(r.subarray(t,t+3),Xr)&&(e.push(t+2),t++),t++;if(e.length===0)return r;var i=r.length-e.length,a=new Uint8Array(i),o=0;for(t=0;t<i;o++,t++)o===e[0]&&(o++,e.shift()),a[t]=r[o];return a},V=function(r,e,t,i){i===void 0&&(i=1/0),r=f(r),t=[].concat(t);for(var a=0,o,u=0;a<r.length&&(u<i||o);){var v=void 0;if(c(r.subarray(a),Sr)?v=4:c(r.subarray(a),Nr)&&(v=3),!v){a++;continue}if(u++,o)return Hr(r.subarray(o,a));var l=void 0;e==="h264"?l=r[a+v]&31:e==="h265"&&(l=r[a+v]>>1&63),t.indexOf(l)!==-1&&(o=a+v),a+=v+(e==="h264"?1:2)}return r.subarray(0,0)},_r=function(r,e,t){return V(r,"h264",e,t)},Or=function(r,e,t){return V(r,"h265",e,t)},p={webm:f([119,101,98,109]),matroska:f([109,97,116,114,111,115,107,97]),flac:f([102,76,97,67]),ogg:f([79,103,103,83]),ac3:f([11,119]),riff:f([82,73,70,70]),avi:f([65,86,73]),wav:f([87,65,86,69]),"3gp":f([102,116,121,112,51,103]),mp4:f([102,116,121,112]),fmp4:f([115,116,121,112]),mov:f([102,116,121,112,113,116]),moov:f([109,111,111,118]),moof:f([109,111,111,102])},C={aac:function(r){var e=F(r);return c(r,[255,16],{offset:e,mask:[255,22]})},mp3:function(r){var e=F(r);return c(r,[255,2],{offset:e,mask:[255,6]})},webm:function(r){var e=q(r,[B.EBML,B.DocType])[0];return c(e,p.webm)},mkv:function(r){var e=q(r,[B.EBML,B.DocType])[0];return c(e,p.matroska)},mp4:function(r){if(C["3gp"](r)||C.mov(r))return!1;if(c(r,p.mp4,{offset:4})||c(r,p.fmp4,{offset:4})||c(r,p.moof,{offset:4})||c(r,p.moov,{offset:4}))return!0},mov:function(r){return c(r,p.mov,{offset:4})},"3gp":function(r){return c(r,p["3gp"],{offset:4})},ac3:function(r){var e=F(r);return c(r,p.ac3,{offset:e})},ts:function(r){if(r.length<189&&r.length>=1)return r[0]===71;for(var e=0;e+188<r.length&&e<188;){if(r[e]===71&&r[e+188]===71)return!0;e+=1}return!1},flac:function(r){var e=F(r);return c(r,p.flac,{offset:e})},ogg:function(r){return c(r,p.ogg)},avi:function(r){return c(r,p.riff)&&c(r,p.avi,{offset:8})},wav:function(r){return c(r,p.riff)&&c(r,p.wav,{offset:8})},h264:function(r){return _r(r,7,3).length},h265:function(r){return Or(r,[32,33],3).length}},N=Object.keys(C).filter(function(n){return n!=="ts"&&n!=="h264"&&n!=="h265"}).concat(["ts","h264","h265"]);N.forEach(function(n){var r=C[n];C[n]=function(e){return r(f(e))}});var Ur=C,ee=function(r){r=f(r);for(var e=0;e<N.length;e++){var t=N[e];if(Ur[t](r))return t}return""},ne=function(r){return Br(r,["moof"]).length>0};export{Qr as D,$r as X,Wr as a,Jr as b,Vr as c,re as d,Ar as e,br as f,dr as g,Kr as h,sr as i,yr as j,F as k,ee as l,Yr as m,ne as n,f as o,cr as p,jr as r,Zr as s,lr as t};