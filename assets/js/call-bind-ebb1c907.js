import{g as f}from"./get-intrinsic-369a924f.js";import{f as g}from"./function-bind-61637ca6.js";import{s as B}from"./set-function-length-e011fe34.js";import{t as $}from"./es-errors-82fd953f.js";import{r as h}from"./es-define-property-d670c2ca.js";var s={exports:{}};(function(e){var r=g,t=f,n=B,y=$,a=t("%Function.prototype.apply%"),i=t("%Function.prototype.call%"),p=t("%Reflect.apply%",!0)||r.call(i,a),o=h(),d=t("%Math.max%");e.exports=function(l){if(typeof l!="function")throw new y("a function is required");var x=p(r,i,arguments);return n(x,1+d(0,l.length-(arguments.length-1)),!0)};var c=function(){return p(r,a,arguments)};o?o(e.exports,"apply",{value:c}):e.exports.apply=c})(s);var I=s.exports,u=f,v=I,E=v(u("String.prototype.indexOf")),O=function(r,t){var n=u(r,!!t);return typeof n=="function"&&E(r,".prototype.")>-1?v(n):n};export{O as c};