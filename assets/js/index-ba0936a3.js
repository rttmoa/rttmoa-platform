import{U as c,r as a,V as f}from"./index-8aeee37e.js";var s=function(i,r,e){e===void 0&&(e={});var u=c(i),t=a.useRef(null),n=a.useCallback(function(){t.current&&clearInterval(t.current)},[]);return a.useEffect(function(){if(!(!f(r)||r<0))return e.immediate&&u(),t.current=setInterval(u,r),n},[r,e.immediate]),n};const l=s;export{l as u};
//# sourceMappingURL=index-ba0936a3.js.map
