import{aC as i,r as t,aD as f,af as n}from"./index-1b257d2f.js";var c=function(a,e,r){r===void 0&&(r={});var u=i(a),s=t.useRef(null),m=t.useCallback(function(){s.current&&clearInterval(s.current)},[]);return t.useEffect(function(){if(!(!f(e)||e<0))return r.immediate&&u(),s.current=setInterval(u,e),m},[e,r.immediate]),m};const l=c,o=()=>{const[a,e]=t.useState(n().format("YYYY年MM月DD HH:mm:ss"));return l(()=>{e(n().format("YYYY年MM月DD HH:mm:ss"))},1e3),a};export{o as default};