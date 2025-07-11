import{d as r,a5 as o}from"./index-83fc08b5.js";function s(e){const c=r.useRef(null),l=()=>{o.cancel(c.current),c.current=null};return[()=>{l(),c.current=o(()=>{c.current=null})},n=>{c.current&&(n.stopPropagation(),l()),e==null||e(n)}]}export{s as u};
//# sourceMappingURL=useBubbleLock-f91bb637.js.map
