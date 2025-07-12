import{d as r,a5 as o}from"./index-113fc74b.js";function s(e){const c=r.useRef(null),l=()=>{o.cancel(c.current),c.current=null};return[()=>{l(),c.current=o(()=>{c.current=null})},n=>{c.current&&(n.stopPropagation(),l()),e==null||e(n)}]}export{s as u};
//# sourceMappingURL=useBubbleLock-1d80bc36.js.map
