function y(e,c){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&c.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)c.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t}function s(e,c,t,r){function n(o){return o instanceof t?o:new t(function(a){a(o)})}return new(t||(t=Promise))(function(o,a){function l(f){try{u(r.next(f))}catch(i){a(i)}}function p(f){try{u(r.throw(f))}catch(i){a(i)}}function u(f){f.done?o(f.value):n(f.value).then(l,p)}u((r=r.apply(e,c||[])).next())})}function d(e,c){var t=typeof Symbol=="function"&&e[Symbol.iterator];if(!t)return e;var r=t.call(e),n,o=[],a;try{for(;(c===void 0||c-- >0)&&!(n=r.next()).done;)o.push(n.value)}catch(l){a={error:l}}finally{try{n&&!n.done&&(t=r.return)&&t.call(r)}finally{if(a)throw a.error}}return o}function h(e,c,t){if(t||arguments.length===2)for(var r=0,n=c.length,o;r<n;r++)(o||!(r in c))&&(o||(o=Array.prototype.slice.call(c,0,r)),o[r]=c[r]);return e.concat(o||Array.prototype.slice.call(c))}export{h as _,d as a,s as b,y as c};