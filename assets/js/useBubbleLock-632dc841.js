import{d as r,a4 as o}from"./index-423f46ac.js";function s(e){const c=r.useRef(null),l=()=>{o.cancel(c.current),c.current=null};return[()=>{l(),c.current=o(()=>{c.current=null})},n=>{c.current&&(n.stopPropagation(),l()),e==null||e(n)}]}export{s as u};
//# sourceMappingURL=useBubbleLock-632dc841.js.map
