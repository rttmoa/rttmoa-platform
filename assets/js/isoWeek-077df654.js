import{aE as p,aF as v}from"./index-d56ff4b5.js";var f={exports:{}};(function(h,l){(function(r,n){h.exports=n()})(p,function(){var r="day";return function(n,y,d){var u=function(t){return t.add(4-t.isoWeekday(),r)},i=y.prototype;i.isoWeekYear=function(){return u(this).year()},i.isoWeek=function(t){if(!this.$utils().u(t))return this.add(7*(t-this.isoWeek()),r);var e,a,s,o,W=u(this),c=(e=this.isoWeekYear(),a=this.$u,s=(a?d.utc:d)().year(e).startOf("year"),o=4-s.isoWeekday(),s.isoWeekday()>4&&(o+=7),s.add(o,r));return W.diff(c,"week")+1},i.isoWeekday=function(t){return this.$utils().u(t)?this.day()||7:this.day(this.day()%7?t:t-7)};var k=i.startOf;i.startOf=function(t,e){var a=this.$utils(),s=!!a.u(e)||e;return a.p(t)==="isoweek"?s?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):k.bind(this)(t,e)}}})})(f);var x=f.exports;const O=v(x);export{O as d};