import{j as u,v as i,a9 as ne,aO as I,r as g,a as k,_ as N,n as le,o as ie,aP as O,q as oe,B as de,ac as ue,aQ as ce,aR as M}from"./index-f08e2d74.js";import{a as se,u as ve,b as q,s as fe,r as A,P as me,c as he,i as ge}from"./Table-f3ed8bd0.js";import"./Table-ef7ea7a8.js";import"./styleChecker-8995fb3a.js";import"./List-60e444da.js";import"./iconUtil-230906da.js";import"./conductUtil-07169fda.js";import"./index-6bfaa22a.js";import"./index-cd3af754.js";import"./index-0ed7dff7.js";import"./index-092769b6.js";import"./index-9f58716a.js";import"./useIcons-784b82aa.js";import"./index-870dd8ea.js";import"./index-5920dbb2.js";import"./index-c14489cf.js";import"./index-da41e561.js";import"./map-3f15b11c.js";import"./_baseAssignValue-8375aebe.js";import"./_baseClone-579c6e88.js";import"./_copyArray-c8199655.js";import"./ColorPicker-2e649ec9.js";import"./customParseFormat-b0594116.js";import"./index-aebc7293.js";import"./index-59f4133a.js";import"./index-aba35aae.js";import"./index-8acee41f.js";import"./index-908414bf.js";import"./index-1845a8fd.js";import"./isoWeek-953995cb.js";import"./index-ff84b30d.js";import"./transButton-20a766e1.js";var be=["onTableChange","maxLength","formItemProps","recordCreatorProps","rowKey","controlled","defaultValue","onChange","editableFormRef"],ye=["record","position","creatorButtonText","newRecordType","parentKey","style"],U=k.createContext(void 0);function H(e){var m=e.children,b=e.record,R=e.position,_=e.newRecordType,s=e.parentKey,c=g.useContext(U);return k.cloneElement(m,i(i({},m.props),{},{onClick:function(){var h=ce(M().mark(function x(P){var C,T,v,E;return M().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(C=(T=m.props).onClick)===null||C===void 0?void 0:C.call(T,P);case 2:if(E=t.sent,E!==!1){t.next=5;break}return t.abrupt("return");case 5:c==null||(v=c.current)===null||v===void 0||v.addEditRecord(b,{position:R,newRecordType:_,parentKey:s});case 6:case"end":return t.stop()}},x)}));function y(x){return h.apply(this,arguments)}return y}()}))}function L(e){var m,b,R=ve(),_=e.onTableChange,s=e.maxLength;e.formItemProps;var c=e.recordCreatorProps,h=e.rowKey;e.controlled;var y=e.defaultValue;e.onChange;var x=e.editableFormRef,P=N(e,be),C=g.useRef(void 0),T=g.useRef(),v=g.useRef();g.useImperativeHandle(P.actionRef,function(){return T.current},[T.current]);var E=le(function(){return e.value||y||[]},{value:e.value,onChange:e.onChange}),D=ie(E,2),t=D[0],W=D[1],V=k.useMemo(function(){return typeof h=="function"?h:function(r,d){return r[h]||d}},[h]),$=q(function(r){if(typeof r=="number"&&!e.name){if(r>=t.length)return r;var d=t&&t[r];return V==null?void 0:V(d,r)}if((typeof r=="string"||r>=t.length)&&e.name){var a=t.findIndex(function(n,l){var o;return(V==null||(o=V(n,l))===null||o===void 0?void 0:o.toString())===(r==null?void 0:r.toString())});if(a!==-1)return a}return r});g.useImperativeHandle(x,function(){var r=function(n){var l,o;if(n==null)throw new Error("rowIndex is required");var f=$(n),w=[e.name,(l=f==null?void 0:f.toString())!==null&&l!==void 0?l:""].flat(1).filter(Boolean);return(o=v.current)===null||o===void 0?void 0:o.getFieldValue(w)},d=function(){var n,l=[e.name].flat(1).filter(Boolean);if(Array.isArray(l)&&l.length===0){var o,f=(o=v.current)===null||o===void 0?void 0:o.getFieldsValue();return Array.isArray(f)?f:Object.keys(f).map(function(w){return f[w]})}return(n=v.current)===null||n===void 0?void 0:n.getFieldValue(l)};return i(i({},v.current),{},{getRowData:r,getRowsData:d,setRowData:function(n,l){var o,f;if(n==null)throw new Error("rowIndex is required");var w=$(n),S=[e.name,(o=w==null?void 0:w.toString())!==null&&o!==void 0?o:""].flat(1).filter(Boolean),re=Object.assign({},i(i({},r(n)),l||{})),ae=O({},S,re);return(f=v.current)===null||f===void 0||f.setFieldsValue(ae),!0}})},[$,e.name,v.current]),g.useEffect(function(){e.controlled&&(t||[]).forEach(function(r,d){var a;(a=v.current)===null||a===void 0||a.setFieldsValue(oe({},"".concat(V(r,d)),r))},{})},[fe(t),e.controlled]),g.useEffect(function(){if(e.name){var r;v.current=e==null||(r=e.editable)===null||r===void 0?void 0:r.form}},[(m=e.editable)===null||m===void 0?void 0:m.form,e.name]);var j=c||{},G=j.record,p=j.position,Q=j.creatorButtonText,z=j.newRecordType,X=j.parentKey,Y=j.style,Z=N(j,ye),B=p==="top",F=g.useMemo(function(){return typeof s=="number"&&s<=(t==null?void 0:t.length)?!1:c!==!1&&u.jsx(H,{record:A(G,t==null?void 0:t.length,t)||{},position:p,parentKey:A(X,t==null?void 0:t.length,t),newRecordType:z,children:u.jsx(de,i(i({type:"dashed",style:i({display:"block",margin:"10px 0",width:"100%"},Y),icon:u.jsx(ue,{})},Z),{},{children:Q||R.getMessage("editableTable.action.add","添加一行数据")}))})},[c,s,t==null?void 0:t.length]),ee=g.useMemo(function(){return F?B?{components:{header:{wrapper:function(d){var a,n=d.className,l=d.children;return u.jsxs("thead",{className:n,children:[l,u.jsxs("tr",{style:{position:"relative"},children:[u.jsx("td",{colSpan:0,style:{visibility:"hidden"},children:F}),u.jsx("td",{style:{position:"absolute",left:0,width:"100%"},colSpan:(a=P.columns)===null||a===void 0?void 0:a.length,children:F})]})]})}}}}:{tableViewRender:function(d,a){var n,l;return u.jsxs(u.Fragment,{children:[(n=(l=e.tableViewRender)===null||l===void 0?void 0:l.call(e,d,a))!==null&&n!==void 0?n:a,F]})}}:{}},[B,F]),K=i({},e.editable),te=q(function(r,d){var a,n,l;if((a=e.editable)===null||a===void 0||(n=a.onValuesChange)===null||n===void 0||n.call(a,r,d),(l=e.onValuesChange)===null||l===void 0||l.call(e,d,r),e.controlled){var o;e==null||(o=e.onChange)===null||o===void 0||o.call(e,d)}});return(e!=null&&e.onValuesChange||(b=e.editable)!==null&&b!==void 0&&b.onValuesChange||e.controlled&&e!==null&&e!==void 0&&e.onChange)&&(K.onValuesChange=te),u.jsxs(u.Fragment,{children:[u.jsx(U.Provider,{value:T,children:u.jsx(me,i(i(i({search:!1,options:!1,pagination:!1,rowKey:h,revalidateOnFocus:!1},P),ee),{},{tableLayout:"fixed",actionRef:T,onChange:_,editable:i(i({},K),{},{formProps:i({formRef:v},K.formProps)}),dataSource:t,onDataSourceChange:function(d){if(W(d),e.name&&p==="top"){var a,n=O({},[e.name].flat(1).filter(Boolean),d);(a=v.current)===null||a===void 0||a.setFieldsValue(n)}}}))}),e.name?u.jsx(he,{name:[e.name],children:function(d){var a,n;if(!C.current)return C.current=t,null;var l=I(d,[e.name].flat(1)),o=l==null?void 0:l.find(function(f,w){var S;return!ge(f,(S=C.current)===null||S===void 0?void 0:S[w])});return C.current=t,o&&(e==null||(a=e.editable)===null||a===void 0||(n=a.onValuesChange)===null||n===void 0||n.call(a,o,l)),null}}):null]})}function J(e){var m=se.useFormInstance();return e.name?u.jsx(ne.Item,i(i({style:{maxWidth:"100%"}},e==null?void 0:e.formItemProps),{},{name:e.name,shouldUpdate:function(R,_){var s=[e.name].flat(1);try{return JSON.stringify(I(R,s))!==JSON.stringify(I(_,s))}catch{return!0}},children:u.jsx(L,i(i({},e),{},{editable:i(i({},e.editable),{},{form:m})}))})):u.jsx(L,i({},e))}J.RecordCreator=H;const xe=(e=100)=>new Promise(m=>{setTimeout(()=>{m(!0)},e)}),we=[{id:624748504,title:"活动名称一",readonly:"活动名称一",decs:"这个活动真好玩",state:"open",created_at:"1590486176000",update_at:"1590486176000"},{id:624691228,title:"活动名称二",readonly:"活动名称二",decs:"这个活动真好玩",state:"closed",created_at:"1590481162000",update_at:"1590481162000"},{id:624691229,title:"活动名称二",readonly:"活动名称二",decs:"这个活动真好玩",state:"closed",created_at:"1590481162000",update_at:"1590481162000"},{id:624691230,title:"活动名称二",readonly:"活动名称二",decs:"这个活动真好玩",state:"closed",created_at:"1590481162000",update_at:"1590481162000"}],Ze=()=>{const[e,m]=g.useState([]),[b,R]=g.useState([]),_=[{title:"活动名称",dataIndex:"title",tooltip:"只读，使用form.getFieldValue获取不到值",formItemProps:(s,{rowIndex:c})=>({rules:c>1?[{required:!0,message:"此项为必填项"}]:[]}),editable:(s,c,h)=>h!==0,width:"15%"},{title:"活动名称二",dataIndex:"readonly",tooltip:"只读，使用form.getFieldValue可以获取到值",width:"15%"},{title:"状态",key:"state",dataIndex:"state",valueType:"select",valueEnum:{all:{text:"全部",status:"Default"},open:{text:"未解决",status:"Error"},closed:{text:"已解决",status:"Success"}}},{title:"描述",dataIndex:"decs",fieldProps:(s,{rowKey:c,rowIndex:h})=>s.getFieldValue([c||"","title"])==="不好玩"?{disabled:!0}:h>9?{disabled:!0}:{}},{title:"活动时间",dataIndex:"created_at",valueType:"date"},{title:"操作",valueType:"option",width:200,render:(s,c,h,y)=>[u.jsx("a",{onClick:()=>{var x;(x=y==null?void 0:y.startEditable)==null||x.call(y,c.id)},children:"编辑"},"editable"),u.jsx("a",{onClick:()=>{R(b.filter(x=>x.id!==c.id))},children:"删除"},"delete")]}];return u.jsx(J,{rowKey:"id",headerTitle:"使用 EditTable",className:"ant-pro-table-scroll",scroll:{x:1e3,y:"100%"},bordered:!0,cardBordered:!0,pagination:!1,recordCreatorProps:{position:"bottom",record:()=>({id:(Math.random()*1e6).toFixed(0)})},loading:!1,columns:_,request:async()=>({data:we,total:5,success:!0}),value:b,onChange:R,editable:{type:"multiple",editableKeys:e,onSave:async(s,c,h)=>{await xe(2e3)},onChange:m}})};export{Ze as default};