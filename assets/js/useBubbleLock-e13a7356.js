import{d as r,a5 as o}from"./index-3957a516.js";function s(e){const c=r.useRef(null),l=()=>{o.cancel(c.current),c.current=null};return[()=>{l(),c.current=o(()=>{c.current=null})},n=>{c.current&&(n.stopPropagation(),l()),e==null||e(n)}]}export{s as u};
//# sourceMappingURL=useBubbleLock-e13a7356.js.map
