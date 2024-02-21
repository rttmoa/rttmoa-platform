import{c as et,s as _e,g as Ce,o as Ee,p as Se,b as De,a as Ae,q as Ie,k as Me,l as pt,h as Fe,i as Le,u as Ve}from"./mermaidHooks-0143cad4.js";import{ax as V}from"./index-f77a2189.js";import{d as Ne}from"./isoWeek-0ced5ef0.js";import{d as Pe,a as ze}from"./customParseFormat-d55b509c.js";import{s as ht}from"./transform-785c2d10.js";import{t as Oe,a as jt,b as Ht,c as Ut,d as Gt,e as Kt,s as Zt,m as Jt,f as Ye,g as Be,h as Re,i as We,j as qe,k as Xe,l as je}from"./time-b4f0a7ce.js";import{m as He,a as Ue}from"./min-d247b692.js";import{l as Ge}from"./linear-02c96231.js";import{d as ee,e as ne,R as ie,C as se,r as Ke,n as wt,h as Ze}from"./string-0c50450c.js";import"./step-cd654546.js";import"./bump-b6dbe0f0.js";import"./math-9c28c395.js";import"./init-a5b10ee5.js";const Je=Math.PI/180,Qe=180/Math.PI,bt=18,re=.96422,ae=1,ce=.82521,le=4/29,nt=6/29,oe=3*nt*nt,$e=nt*nt*nt;function ue(t){if(t instanceof q)return new q(t.l,t.a,t.b,t.opacity);if(t instanceof Z)return de(t);t instanceof ie||(t=Ke(t));var e=St(t.r),n=St(t.g),i=St(t.b),a=_t((.2225045*e+.7168786*n+.0606169*i)/ae),h,d;return e===n&&n===i?h=d=a:(h=_t((.4360747*e+.3850649*n+.1430804*i)/re),d=_t((.0139322*e+.0971045*n+.7141733*i)/ce)),new q(116*a-16,500*(h-a),200*(a-d),t.opacity)}function tn(t,e,n,i){return arguments.length===1?ue(t):new q(t,e,n,i??1)}function q(t,e,n,i){this.l=+t,this.a=+e,this.b=+n,this.opacity=+i}ee(q,tn,ne(se,{brighter(t){return new q(this.l+bt*(t??1),this.a,this.b,this.opacity)},darker(t){return new q(this.l-bt*(t??1),this.a,this.b,this.opacity)},rgb(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200;return e=re*Ct(e),t=ae*Ct(t),n=ce*Ct(n),new ie(Et(3.1338561*e-1.6168667*t-.4906146*n),Et(-.9787684*e+1.9161415*t+.033454*n),Et(.0719453*e-.2289914*t+1.4052427*n),this.opacity)}}));function _t(t){return t>$e?Math.pow(t,1/3):t/oe+le}function Ct(t){return t>nt?t*t*t:oe*(t-le)}function Et(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function St(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function en(t){if(t instanceof Z)return new Z(t.h,t.c,t.l,t.opacity);if(t instanceof q||(t=ue(t)),t.a===0&&t.b===0)return new Z(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*Qe;return new Z(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function At(t,e,n,i){return arguments.length===1?en(t):new Z(t,e,n,i??1)}function Z(t,e,n,i){this.h=+t,this.c=+e,this.l=+n,this.opacity=+i}function de(t){if(isNaN(t.h))return new q(t.l,0,0,t.opacity);var e=t.h*Je;return new q(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}ee(Z,At,ne(se,{brighter(t){return new Z(this.h,this.c,this.l+bt*(t??1),this.opacity)},darker(t){return new Z(this.h,this.c,this.l-bt*(t??1),this.opacity)},rgb(){return de(this).rgb()}}));function nn(t){return function(e,n){var i=t((e=At(e)).h,(n=At(n)).h),a=wt(e.c,n.c),h=wt(e.l,n.l),d=wt(e.opacity,n.opacity);return function(A){return e.h=i(A),e.c=a(A),e.l=h(A),e.opacity=d(A),e+""}}}const sn=nn(Ze);function rn(t){return t}var kt=1,Dt=2,It=3,mt=4,Qt=1e-6;function an(t){return"translate("+t+",0)"}function cn(t){return"translate(0,"+t+")"}function ln(t){return e=>+t(e)}function on(t,e){return e=Math.max(0,t.bandwidth()-e*2)/2,t.round()&&(e=Math.round(e)),n=>+t(n)+e}function un(){return!this.__axis}function fe(t,e){var n=[],i=null,a=null,h=6,d=6,A=3,S=typeof window<"u"&&window.devicePixelRatio>1?0:.5,N=t===kt||t===mt?-1:1,F=t===mt||t===Dt?"x":"y",L=t===kt||t===It?an:cn;function _(b){var P=i??(e.ticks?e.ticks.apply(e,n):e.domain()),v=a??(e.tickFormat?e.tickFormat.apply(e,n):rn),Q=Math.max(h,0)+A,J=e.range(),X=+J[0]+S,j=+J[J.length-1]+S,H=(e.bandwidth?on:ln)(e.copy(),S),R=b.selection?b.selection():b,B=R.selectAll(".domain").data([null]),z=R.selectAll(".tick").data(P,e).order(),m=z.exit(),T=z.enter().append("g").attr("class","tick"),p=z.select("line"),k=z.select("text");B=B.merge(B.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),z=z.merge(T),p=p.merge(T.append("line").attr("stroke","currentColor").attr(F+"2",N*h)),k=k.merge(T.append("text").attr("fill","currentColor").attr(F,N*Q).attr("dy",t===kt?"0em":t===It?"0.71em":"0.32em")),b!==R&&(B=B.transition(b),z=z.transition(b),p=p.transition(b),k=k.transition(b),m=m.transition(b).attr("opacity",Qt).attr("transform",function(r){return isFinite(r=H(r))?L(r+S):this.getAttribute("transform")}),T.attr("opacity",Qt).attr("transform",function(r){var u=this.parentNode.__axis;return L((u&&isFinite(u=u(r))?u:H(r))+S)})),m.remove(),B.attr("d",t===mt||t===Dt?d?"M"+N*d+","+X+"H"+S+"V"+j+"H"+N*d:"M"+S+","+X+"V"+j:d?"M"+X+","+N*d+"V"+S+"H"+j+"V"+N*d:"M"+X+","+S+"H"+j),z.attr("opacity",1).attr("transform",function(r){return L(H(r)+S)}),p.attr(F+"2",N*h),k.attr(F,N*Q).text(v),R.filter(un).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===Dt?"start":t===mt?"end":"middle"),R.each(function(){this.__axis=H})}return _.scale=function(b){return arguments.length?(e=b,_):e},_.ticks=function(){return n=Array.from(arguments),_},_.tickArguments=function(b){return arguments.length?(n=b==null?[]:Array.from(b),_):n.slice()},_.tickValues=function(b){return arguments.length?(i=b==null?null:Array.from(b),_):i&&i.slice()},_.tickFormat=function(b){return arguments.length?(a=b,_):a},_.tickSize=function(b){return arguments.length?(h=d=+b,_):h},_.tickSizeInner=function(b){return arguments.length?(h=+b,_):h},_.tickSizeOuter=function(b){return arguments.length?(d=+b,_):d},_.tickPadding=function(b){return arguments.length?(A=+b,_):A},_.offset=function(b){return arguments.length?(S=+b,_):S},_}function dn(t){return fe(kt,t)}function fn(t){return fe(It,t)}var Mt=function(){var t=function(k,r,u,f){for(u=u||{},f=k.length;f--;u[k[f]]=r);return u},e=[6,8,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,35,37],n=[1,25],i=[1,26],a=[1,27],h=[1,28],d=[1,29],A=[1,30],S=[1,31],N=[1,9],F=[1,10],L=[1,11],_=[1,12],b=[1,13],P=[1,14],v=[1,15],Q=[1,16],J=[1,18],X=[1,19],j=[1,20],H=[1,21],R=[1,22],B=[1,24],z=[1,32],m={trace:function(){},yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,dateFormat:19,inclusiveEndDates:20,topAxis:21,axisFormat:22,tickInterval:23,excludes:24,includes:25,todayMarker:26,title:27,acc_title:28,acc_title_value:29,acc_descr:30,acc_descr_value:31,acc_descr_multiline_value:32,section:33,clickStatement:34,taskTxt:35,taskData:36,click:37,callbackname:38,callbackargs:39,href:40,clickStatementDebug:41,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",19:"dateFormat",20:"inclusiveEndDates",21:"topAxis",22:"axisFormat",23:"tickInterval",24:"excludes",25:"includes",26:"todayMarker",27:"title",28:"acc_title",29:"acc_title_value",30:"acc_descr",31:"acc_descr_value",32:"acc_descr_multiline_value",33:"section",35:"taskTxt",36:"taskData",37:"click",38:"callbackname",39:"callbackargs",40:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[34,2],[34,3],[34,3],[34,4],[34,3],[34,4],[34,2],[41,2],[41,3],[41,3],[41,4],[41,3],[41,4],[41,2]],performAction:function(r,u,f,c,y,s,M){var o=s.length-1;switch(y){case 1:return s[o-1];case 2:this.$=[];break;case 3:s[o-1].push(s[o]),this.$=s[o-1];break;case 4:case 5:this.$=s[o];break;case 6:case 7:this.$=[];break;case 8:c.setWeekday("monday");break;case 9:c.setWeekday("tuesday");break;case 10:c.setWeekday("wednesday");break;case 11:c.setWeekday("thursday");break;case 12:c.setWeekday("friday");break;case 13:c.setWeekday("saturday");break;case 14:c.setWeekday("sunday");break;case 15:c.setDateFormat(s[o].substr(11)),this.$=s[o].substr(11);break;case 16:c.enableInclusiveEndDates(),this.$=s[o].substr(18);break;case 17:c.TopAxis(),this.$=s[o].substr(8);break;case 18:c.setAxisFormat(s[o].substr(11)),this.$=s[o].substr(11);break;case 19:c.setTickInterval(s[o].substr(13)),this.$=s[o].substr(13);break;case 20:c.setExcludes(s[o].substr(9)),this.$=s[o].substr(9);break;case 21:c.setIncludes(s[o].substr(9)),this.$=s[o].substr(9);break;case 22:c.setTodayMarker(s[o].substr(12)),this.$=s[o].substr(12);break;case 24:c.setDiagramTitle(s[o].substr(6)),this.$=s[o].substr(6);break;case 25:this.$=s[o].trim(),c.setAccTitle(this.$);break;case 26:case 27:this.$=s[o].trim(),c.setAccDescription(this.$);break;case 28:c.addSection(s[o].substr(8)),this.$=s[o].substr(8);break;case 30:c.addTask(s[o-1],s[o]),this.$="task";break;case 31:this.$=s[o-1],c.setClickEvent(s[o-1],s[o],null);break;case 32:this.$=s[o-2],c.setClickEvent(s[o-2],s[o-1],s[o]);break;case 33:this.$=s[o-2],c.setClickEvent(s[o-2],s[o-1],null),c.setLink(s[o-2],s[o]);break;case 34:this.$=s[o-3],c.setClickEvent(s[o-3],s[o-2],s[o-1]),c.setLink(s[o-3],s[o]);break;case 35:this.$=s[o-2],c.setClickEvent(s[o-2],s[o],null),c.setLink(s[o-2],s[o-1]);break;case 36:this.$=s[o-3],c.setClickEvent(s[o-3],s[o-1],s[o]),c.setLink(s[o-3],s[o-2]);break;case 37:this.$=s[o-1],c.setLink(s[o-1],s[o]);break;case 38:case 44:this.$=s[o-1]+" "+s[o];break;case 39:case 40:case 42:this.$=s[o-2]+" "+s[o-1]+" "+s[o];break;case 41:case 43:this.$=s[o-3]+" "+s[o-2]+" "+s[o-1]+" "+s[o];break}},table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:n,13:i,14:a,15:h,16:d,17:A,18:S,19:N,20:F,21:L,22:_,23:b,24:P,25:v,26:Q,27:J,28:X,30:j,32:H,33:R,34:23,35:B,37:z},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:33,11:17,12:n,13:i,14:a,15:h,16:d,17:A,18:S,19:N,20:F,21:L,22:_,23:b,24:P,25:v,26:Q,27:J,28:X,30:j,32:H,33:R,34:23,35:B,37:z},t(e,[2,5]),t(e,[2,6]),t(e,[2,15]),t(e,[2,16]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),{29:[1,34]},{31:[1,35]},t(e,[2,27]),t(e,[2,28]),t(e,[2,29]),{36:[1,36]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),{38:[1,37],40:[1,38]},t(e,[2,4]),t(e,[2,25]),t(e,[2,26]),t(e,[2,30]),t(e,[2,31],{39:[1,39],40:[1,40]}),t(e,[2,37],{38:[1,41]}),t(e,[2,32],{40:[1,42]}),t(e,[2,33]),t(e,[2,35],{39:[1,43]}),t(e,[2,34]),t(e,[2,36])],defaultActions:{},parseError:function(r,u){if(u.recoverable)this.trace(r);else{var f=new Error(r);throw f.hash=u,f}},parse:function(r){var u=this,f=[0],c=[],y=[null],s=[],M=this.table,o="",l=0,g=0,D=2,w=1,C=s.slice.call(arguments,1),x=Object.create(this.lexer),E={yy:{}};for(var at in this.yy)Object.prototype.hasOwnProperty.call(this.yy,at)&&(E.yy[at]=this.yy[at]);x.setInput(r,E.yy),E.yy.lexer=x,E.yy.parser=this,typeof x.yylloc>"u"&&(x.yylloc={});var ct=x.yylloc;s.push(ct);var ve=x.options&&x.options.ranges;typeof E.yy.parseError=="function"?this.parseError=E.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function we(){var G;return G=c.pop()||x.lex()||w,typeof G!="number"&&(G instanceof Array&&(c=G,G=c.pop()),G=u.symbols_[G]||G),G}for(var O,$,Y,xt,tt={},dt,U,Xt,ft;;){if($=f[f.length-1],this.defaultActions[$]?Y=this.defaultActions[$]:((O===null||typeof O>"u")&&(O=we()),Y=M[$]&&M[$][O]),typeof Y>"u"||!Y.length||!Y[0]){var vt="";ft=[];for(dt in M[$])this.terminals_[dt]&&dt>D&&ft.push("'"+this.terminals_[dt]+"'");x.showPosition?vt="Parse error on line "+(l+1)+`:
`+x.showPosition()+`
Expecting `+ft.join(", ")+", got '"+(this.terminals_[O]||O)+"'":vt="Parse error on line "+(l+1)+": Unexpected "+(O==w?"end of input":"'"+(this.terminals_[O]||O)+"'"),this.parseError(vt,{text:x.match,token:this.terminals_[O]||O,line:x.yylineno,loc:ct,expected:ft})}if(Y[0]instanceof Array&&Y.length>1)throw new Error("Parse Error: multiple actions possible at state: "+$+", token: "+O);switch(Y[0]){case 1:f.push(O),y.push(x.yytext),s.push(x.yylloc),f.push(Y[1]),O=null,g=x.yyleng,o=x.yytext,l=x.yylineno,ct=x.yylloc;break;case 2:if(U=this.productions_[Y[1]][1],tt.$=y[y.length-U],tt._$={first_line:s[s.length-(U||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(U||1)].first_column,last_column:s[s.length-1].last_column},ve&&(tt._$.range=[s[s.length-(U||1)].range[0],s[s.length-1].range[1]]),xt=this.performAction.apply(tt,[o,g,l,E.yy,Y[1],y,s].concat(C)),typeof xt<"u")return xt;U&&(f=f.slice(0,-1*U*2),y=y.slice(0,-1*U),s=s.slice(0,-1*U)),f.push(this.productions_[Y[1]][0]),y.push(tt.$),s.push(tt._$),Xt=M[f[f.length-2]][f[f.length-1]],f.push(Xt);break;case 3:return!0}}return!0}},T=function(){var k={EOF:1,parseError:function(u,f){if(this.yy.parser)this.yy.parser.parseError(u,f);else throw new Error(u)},setInput:function(r,u){return this.yy=u||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var u=r.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var u=r.length,f=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var c=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var y=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===c.length?this.yylloc.first_column:0)+c[c.length-f.length].length-f[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[y[0],y[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),u=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+u+"^"},test_match:function(r,u){var f,c,y;if(this.options.backtrack_lexer&&(y={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(y.yylloc.range=this.yylloc.range.slice(0))),c=r[0].match(/(?:\r\n?|\n).*/g),c&&(this.yylineno+=c.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:c?c[c.length-1].length-c[c.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],f=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var s in y)this[s]=y[s];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,u,f,c;this._more||(this.yytext="",this.match="");for(var y=this._currentRules(),s=0;s<y.length;s++)if(f=this._input.match(this.rules[y[s]]),f&&(!u||f[0].length>u[0].length)){if(u=f,c=s,this.options.backtrack_lexer){if(r=this.test_match(f,y[s]),r!==!1)return r;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(r=this.test_match(u,y[c]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var u=this.next();return u||this.lex()},begin:function(u){this.conditionStack.push(u)},popState:function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},pushState:function(u){this.begin(u)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(u,f,c,y){switch(c){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),28;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),30;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 40;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 38;case 21:this.popState();break;case 22:return 39;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 37;case 26:return 4;case 27:return 19;case 28:return 20;case 29:return 21;case 30:return 22;case 31:return 23;case 32:return 25;case 33:return 24;case 34:return 26;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return"date";case 43:return 27;case 44:return"accDescription";case 45:return 33;case 46:return 35;case 47:return 36;case 48:return":";case 49:return 6;case 50:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],inclusive:!0}}};return k}();m.lexer=T;function p(){this.yy={}}return p.prototype=m,m.Parser=p,new p}();Mt.parser=Mt;const hn=Mt;V.extend(Ne);V.extend(Pe);V.extend(ze);let W="",Nt="",Pt,zt="",lt=[],ot=[],Ot={},Yt=[],Tt=[],st="",Bt="";const he=["active","done","crit","milestone"];let Rt=[],ut=!1,Wt=!1,qt="sunday",Ft=0;const mn=function(){Yt=[],Tt=[],st="",Rt=[],yt=0,Vt=void 0,gt=void 0,I=[],W="",Nt="",Bt="",Pt=void 0,zt="",lt=[],ot=[],ut=!1,Wt=!1,Ft=0,Ot={},Ie(),qt="sunday"},kn=function(t){Nt=t},yn=function(){return Nt},gn=function(t){Pt=t},pn=function(){return Pt},bn=function(t){zt=t},Tn=function(){return zt},xn=function(t){W=t},vn=function(){ut=!0},wn=function(){return ut},_n=function(){Wt=!0},Cn=function(){return Wt},En=function(t){Bt=t},Sn=function(){return Bt},Dn=function(){return W},An=function(t){lt=t.toLowerCase().split(/[\s,]+/)},In=function(){return lt},Mn=function(t){ot=t.toLowerCase().split(/[\s,]+/)},Fn=function(){return ot},Ln=function(){return Ot},Vn=function(t){st=t,Yt.push(t)},Nn=function(){return Yt},Pn=function(){let t=$t();const e=10;let n=0;for(;!t&&n<e;)t=$t(),n++;return Tt=I,Tt},me=function(t,e,n,i){return i.includes(t.format(e.trim()))?!1:t.isoWeekday()>=6&&n.includes("weekends")||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(t.format(e.trim()))},zn=function(t){qt=t},On=function(){return qt},ke=function(t,e,n,i){if(!n.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=V(t.startTime):a=V(t.startTime,e,!0),a=a.add(1,"d");let h;t.endTime instanceof Date?h=V(t.endTime):h=V(t.endTime,e,!0);const[d,A]=Yn(a,h,e,n,i);t.endTime=d.toDate(),t.renderEndTime=A},Yn=function(t,e,n,i,a){let h=!1,d=null;for(;t<=e;)h||(d=e.toDate()),h=me(t,n,i,a),h&&(e=e.add(1,"d")),t=t.add(1,"d");return[e,d]},Lt=function(t,e,n){n=n.trim();const a=/^after\s+([\d\w- ]+)/.exec(n.trim());if(a!==null){let d=null;if(a[1].split(" ").forEach(function(A){let S=rt(A);S!==void 0&&(d?S.endTime>d.endTime&&(d=S):d=S)}),d)return d.endTime;{const A=new Date;return A.setHours(0,0,0,0),A}}let h=V(n,e.trim(),!0);if(h.isValid())return h.toDate();{pt.debug("Invalid date:"+n),pt.debug("With date format:"+e.trim());const d=new Date(n);if(d===void 0||isNaN(d.getTime())||d.getFullYear()<-1e4||d.getFullYear()>1e4)throw new Error("Invalid date:"+n);return d}},ye=function(t){const e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return e!==null?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},ge=function(t,e,n,i=!1){n=n.trim();let a=V(n,e.trim(),!0);if(a.isValid())return i&&(a=a.add(1,"d")),a.toDate();let h=V(t);const[d,A]=ye(n);if(!Number.isNaN(d)){const S=h.add(d,A);S.isValid()&&(h=S)}return h.toDate()};let yt=0;const it=function(t){return t===void 0?(yt=yt+1,"task"+yt):t},Bn=function(t,e){let n;e.substr(0,1)===":"?n=e.substr(1,e.length):n=e;const i=n.split(","),a={};xe(i,a,he);for(let d=0;d<i.length;d++)i[d]=i[d].trim();let h="";switch(i.length){case 1:a.id=it(),a.startTime=t.endTime,h=i[0];break;case 2:a.id=it(),a.startTime=Lt(void 0,W,i[0]),h=i[1];break;case 3:a.id=it(i[0]),a.startTime=Lt(void 0,W,i[1]),h=i[2];break}return h&&(a.endTime=ge(a.startTime,W,h,ut),a.manualEndTime=V(h,"YYYY-MM-DD",!0).isValid(),ke(a,W,ot,lt)),a},Rn=function(t,e){let n;e.substr(0,1)===":"?n=e.substr(1,e.length):n=e;const i=n.split(","),a={};xe(i,a,he);for(let h=0;h<i.length;h++)i[h]=i[h].trim();switch(i.length){case 1:a.id=it(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:i[0]};break;case 2:a.id=it(),a.startTime={type:"getStartDate",startData:i[0]},a.endTime={data:i[1]};break;case 3:a.id=it(i[0]),a.startTime={type:"getStartDate",startData:i[1]},a.endTime={data:i[2]};break}return a};let Vt,gt,I=[];const pe={},Wn=function(t,e){const n={section:st,type:st,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},i=Rn(gt,e);n.raw.startTime=i.startTime,n.raw.endTime=i.endTime,n.id=i.id,n.prevTaskId=gt,n.active=i.active,n.done=i.done,n.crit=i.crit,n.milestone=i.milestone,n.order=Ft,Ft++;const a=I.push(n);gt=n.id,pe[n.id]=a-1},rt=function(t){const e=pe[t];return I[e]},qn=function(t,e){const n={section:st,type:st,description:t,task:t,classes:[]},i=Bn(Vt,e);n.startTime=i.startTime,n.endTime=i.endTime,n.id=i.id,n.active=i.active,n.done=i.done,n.crit=i.crit,n.milestone=i.milestone,Vt=n,Tt.push(n)},$t=function(){const t=function(n){const i=I[n];let a="";switch(I[n].raw.startTime.type){case"prevTaskEnd":{const h=rt(i.prevTaskId);i.startTime=h.endTime;break}case"getStartDate":a=Lt(void 0,W,I[n].raw.startTime.startData),a&&(I[n].startTime=a);break}return I[n].startTime&&(I[n].endTime=ge(I[n].startTime,W,I[n].raw.endTime.data,ut),I[n].endTime&&(I[n].processed=!0,I[n].manualEndTime=V(I[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),ke(I[n],W,ot,lt))),I[n].processed};let e=!0;for(const[n,i]of I.entries())t(n),e=e&&i.processed;return e},Xn=function(t,e){let n=e;et().securityLevel!=="loose"&&(n=Me.sanitizeUrl(e)),t.split(",").forEach(function(i){rt(i)!==void 0&&(Te(i,()=>{window.open(n,"_self")}),Ot[i]=n)}),be(t,"clickable")},be=function(t,e){t.split(",").forEach(function(n){let i=rt(n);i!==void 0&&i.classes.push(e)})},jn=function(t,e,n){if(et().securityLevel!=="loose"||e===void 0)return;let i=[];if(typeof n=="string"){i=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let h=0;h<i.length;h++){let d=i[h].trim();d.charAt(0)==='"'&&d.charAt(d.length-1)==='"'&&(d=d.substr(1,d.length-2)),i[h]=d}}i.length===0&&i.push(t),rt(t)!==void 0&&Te(t,()=>{Ve.runFunc(e,...i)})},Te=function(t,e){Rt.push(function(){const n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){e()})},function(){const n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){e()})})},Hn=function(t,e,n){t.split(",").forEach(function(i){jn(i,e,n)}),be(t,"clickable")},Un=function(t){Rt.forEach(function(e){e(t)})},Gn={getConfig:()=>et().gantt,clear:mn,setDateFormat:xn,getDateFormat:Dn,enableInclusiveEndDates:vn,endDatesAreInclusive:wn,enableTopAxis:_n,topAxisEnabled:Cn,setAxisFormat:kn,getAxisFormat:yn,setTickInterval:gn,getTickInterval:pn,setTodayMarker:bn,getTodayMarker:Tn,setAccTitle:_e,getAccTitle:Ce,setDiagramTitle:Ee,getDiagramTitle:Se,setDisplayMode:En,getDisplayMode:Sn,setAccDescription:De,getAccDescription:Ae,addSection:Vn,getSections:Nn,getTasks:Pn,addTask:Wn,findTaskById:rt,addTaskOrg:qn,setIncludes:An,getIncludes:In,setExcludes:Mn,getExcludes:Fn,setClickEvent:Hn,setLink:Xn,getLinks:Ln,bindFunctions:Un,parseDuration:ye,isInvalidDate:me,setWeekday:zn,getWeekday:On};function xe(t,e,n){let i=!0;for(;i;)i=!1,n.forEach(function(a){const h="^\\s*"+a+"\\s*$",d=new RegExp(h);t[0].match(d)&&(e[a]=!0,t.shift(1),i=!0)})}const Kn=function(){pt.debug("Something is calling, setConf, remove the call")},te={monday:Ye,tuesday:Be,wednesday:Re,thursday:We,friday:qe,saturday:Xe,sunday:je},Zn=(t,e)=>{let n=[...t].map(()=>-1/0),i=[...t].sort((h,d)=>h.startTime-d.startTime||h.order-d.order),a=0;for(const h of i)for(let d=0;d<n.length;d++)if(h.startTime>=n[d]){n[d]=h.endTime,h.order=d+e,d>a&&(a=d);break}return a};let K;const Jn=function(t,e,n,i){const a=et().gantt,h=et().securityLevel;let d;h==="sandbox"&&(d=ht("#i"+e));const A=h==="sandbox"?ht(d.nodes()[0].contentDocument.body):ht("body"),S=h==="sandbox"?d.nodes()[0].contentDocument:document,N=S.getElementById(e);K=N.parentElement.offsetWidth,K===void 0&&(K=1200),a.useWidth!==void 0&&(K=a.useWidth);const F=i.db.getTasks();let L=[];for(const m of F)L.push(m.type);L=z(L);const _={};let b=2*a.topPadding;if(i.db.getDisplayMode()==="compact"||a.displayMode==="compact"){const m={};for(const p of F)m[p.section]===void 0?m[p.section]=[p]:m[p.section].push(p);let T=0;for(const p of Object.keys(m)){const k=Zn(m[p],T)+1;T+=k,b+=k*(a.barHeight+a.barGap),_[p]=k}}else{b+=F.length*(a.barHeight+a.barGap);for(const m of L)_[m]=F.filter(T=>T.type===m).length}N.setAttribute("viewBox","0 0 "+K+" "+b);const P=A.select(`[id="${e}"]`),v=Oe().domain([He(F,function(m){return m.startTime}),Ue(F,function(m){return m.endTime})]).rangeRound([0,K-a.leftPadding-a.rightPadding]);function Q(m,T){const p=m.startTime,k=T.startTime;let r=0;return p>k?r=1:p<k&&(r=-1),r}F.sort(Q),J(F,K,b),Fe(P,b,K,a.useMaxWidth),P.append("text").text(i.db.getDiagramTitle()).attr("x",K/2).attr("y",a.titleTopMargin).attr("class","titleText");function J(m,T,p){const k=a.barHeight,r=k+a.barGap,u=a.topPadding,f=a.leftPadding,c=Ge().domain([0,L.length]).range(["#00B9FA","#F95002"]).interpolate(sn);j(r,u,f,T,p,m,i.db.getExcludes(),i.db.getIncludes()),H(f,u,T,p),X(m,r,u,f,k,c,T),R(r,u),B(f,u,T,p)}function X(m,T,p,k,r,u,f){const y=[...new Set(m.map(l=>l.order))].map(l=>m.find(g=>g.order===l));P.append("g").selectAll("rect").data(y).enter().append("rect").attr("x",0).attr("y",function(l,g){return g=l.order,g*T+p-2}).attr("width",function(){return f-a.rightPadding/2}).attr("height",T).attr("class",function(l){for(const[g,D]of L.entries())if(l.type===D)return"section section"+g%a.numberSectionStyles;return"section section0"});const s=P.append("g").selectAll("rect").data(m).enter(),M=i.db.getLinks();if(s.append("rect").attr("id",function(l){return l.id}).attr("rx",3).attr("ry",3).attr("x",function(l){return l.milestone?v(l.startTime)+k+.5*(v(l.endTime)-v(l.startTime))-.5*r:v(l.startTime)+k}).attr("y",function(l,g){return g=l.order,g*T+p}).attr("width",function(l){return l.milestone?r:v(l.renderEndTime||l.endTime)-v(l.startTime)}).attr("height",r).attr("transform-origin",function(l,g){return g=l.order,(v(l.startTime)+k+.5*(v(l.endTime)-v(l.startTime))).toString()+"px "+(g*T+p+.5*r).toString()+"px"}).attr("class",function(l){const g="task";let D="";l.classes.length>0&&(D=l.classes.join(" "));let w=0;for(const[x,E]of L.entries())l.type===E&&(w=x%a.numberSectionStyles);let C="";return l.active?l.crit?C+=" activeCrit":C=" active":l.done?l.crit?C=" doneCrit":C=" done":l.crit&&(C+=" crit"),C.length===0&&(C=" task"),l.milestone&&(C=" milestone "+C),C+=w,C+=" "+D,g+C}),s.append("text").attr("id",function(l){return l.id+"-text"}).text(function(l){return l.task}).attr("font-size",a.fontSize).attr("x",function(l){let g=v(l.startTime),D=v(l.renderEndTime||l.endTime);l.milestone&&(g+=.5*(v(l.endTime)-v(l.startTime))-.5*r),l.milestone&&(D=g+r);const w=this.getBBox().width;return w>D-g?D+w+1.5*a.leftPadding>f?g+k-5:D+k+5:(D-g)/2+g+k}).attr("y",function(l,g){return g=l.order,g*T+a.barHeight/2+(a.fontSize/2-2)+p}).attr("text-height",r).attr("class",function(l){const g=v(l.startTime);let D=v(l.endTime);l.milestone&&(D=g+r);const w=this.getBBox().width;let C="";l.classes.length>0&&(C=l.classes.join(" "));let x=0;for(const[at,ct]of L.entries())l.type===ct&&(x=at%a.numberSectionStyles);let E="";return l.active&&(l.crit?E="activeCritText"+x:E="activeText"+x),l.done?l.crit?E=E+" doneCritText"+x:E=E+" doneText"+x:l.crit&&(E=E+" critText"+x),l.milestone&&(E+=" milestoneText"),w>D-g?D+w+1.5*a.leftPadding>f?C+" taskTextOutsideLeft taskTextOutside"+x+" "+E:C+" taskTextOutsideRight taskTextOutside"+x+" "+E+" width-"+w:C+" taskText taskText"+x+" "+E+" width-"+w}),et().securityLevel==="sandbox"){let l;l=ht("#i"+e);const g=l.nodes()[0].contentDocument;s.filter(function(D){return M[D.id]!==void 0}).each(function(D){var w=g.querySelector("#"+D.id),C=g.querySelector("#"+D.id+"-text");const x=w.parentNode;var E=g.createElement("a");E.setAttribute("xlink:href",M[D.id]),E.setAttribute("target","_top"),x.appendChild(E),E.appendChild(w),E.appendChild(C)})}}function j(m,T,p,k,r,u,f,c){if(f.length===0&&c.length===0)return;let y,s;for(const{startTime:w,endTime:C}of u)(y===void 0||w<y)&&(y=w),(s===void 0||C>s)&&(s=C);if(!y||!s)return;if(V(s).diff(V(y),"year")>5){pt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const M=i.db.getDateFormat(),o=[];let l=null,g=V(y);for(;g.valueOf()<=s;)i.db.isInvalidDate(g,M,f,c)?l?l.end=g:l={start:g,end:g}:l&&(o.push(l),l=null),g=g.add(1,"d");P.append("g").selectAll("rect").data(o).enter().append("rect").attr("id",function(w){return"exclude-"+w.start.format("YYYY-MM-DD")}).attr("x",function(w){return v(w.start)+p}).attr("y",a.gridLineStartPadding).attr("width",function(w){const C=w.end.add(1,"day");return v(C)-v(w.start)}).attr("height",r-T-a.gridLineStartPadding).attr("transform-origin",function(w,C){return(v(w.start)+p+.5*(v(w.end)-v(w.start))).toString()+"px "+(C*m+.5*r).toString()+"px"}).attr("class","exclude-range")}function H(m,T,p,k){let r=fn(v).tickSize(-k+T+a.gridLineStartPadding).tickFormat(jt(i.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));const f=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(i.db.getTickInterval()||a.tickInterval);if(f!==null){const c=f[1],y=f[2],s=i.db.getWeekday()||a.weekday;switch(y){case"millisecond":r.ticks(Jt.every(c));break;case"second":r.ticks(Zt.every(c));break;case"minute":r.ticks(Kt.every(c));break;case"hour":r.ticks(Gt.every(c));break;case"day":r.ticks(Ut.every(c));break;case"week":r.ticks(te[s].every(c));break;case"month":r.ticks(Ht.every(c));break}}if(P.append("g").attr("class","grid").attr("transform","translate("+m+", "+(k-50)+")").call(r).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),i.db.topAxisEnabled()||a.topAxis){let c=dn(v).tickSize(-k+T+a.gridLineStartPadding).tickFormat(jt(i.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));if(f!==null){const y=f[1],s=f[2],M=i.db.getWeekday()||a.weekday;switch(s){case"millisecond":c.ticks(Jt.every(y));break;case"second":c.ticks(Zt.every(y));break;case"minute":c.ticks(Kt.every(y));break;case"hour":c.ticks(Gt.every(y));break;case"day":c.ticks(Ut.every(y));break;case"week":c.ticks(te[M].every(y));break;case"month":c.ticks(Ht.every(y));break}}P.append("g").attr("class","grid").attr("transform","translate("+m+", "+T+")").call(c).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}function R(m,T){let p=0;const k=Object.keys(_).map(r=>[r,_[r]]);P.append("g").selectAll("text").data(k).enter().append(function(r){const u=r[0].split(Le.lineBreakRegex),f=-(u.length-1)/2,c=S.createElementNS("http://www.w3.org/2000/svg","text");c.setAttribute("dy",f+"em");for(const[y,s]of u.entries()){const M=S.createElementNS("http://www.w3.org/2000/svg","tspan");M.setAttribute("alignment-baseline","central"),M.setAttribute("x","10"),y>0&&M.setAttribute("dy","1em"),M.textContent=s,c.appendChild(M)}return c}).attr("x",10).attr("y",function(r,u){if(u>0)for(let f=0;f<u;f++)return p+=k[u-1][1],r[1]*m/2+p*m+T;else return r[1]*m/2+T}).attr("font-size",a.sectionFontSize).attr("class",function(r){for(const[u,f]of L.entries())if(r[0]===f)return"sectionTitle sectionTitle"+u%a.numberSectionStyles;return"sectionTitle"})}function B(m,T,p,k){const r=i.db.getTodayMarker();if(r==="off")return;const u=P.append("g").attr("class","today"),f=new Date,c=u.append("line");c.attr("x1",v(f)+m).attr("x2",v(f)+m).attr("y1",a.titleTopMargin).attr("y2",k-a.titleTopMargin).attr("class","today"),r!==""&&c.attr("style",r.replace(/,/g,";"))}function z(m){const T={},p=[];for(let k=0,r=m.length;k<r;++k)Object.prototype.hasOwnProperty.call(T,m[k])||(T[m[k]]=!0,p.push(m[k]));return p}},Qn={setConf:Kn,draw:Jn},$n=t=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,ti=$n,mi={parser:hn,db:Gn,renderer:Qn,styles:ti};export{mi as diagram};
//# sourceMappingURL=ganttDiagram-5c869e3b-1b1d6eea.js.map
