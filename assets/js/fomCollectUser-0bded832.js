import{a9 as l,r as n,j as e,X as t,aa as C,ab as y,N as F,B as i,m as z}from"./index-1b257d2f.js";import{R as a}from"./index-88675925.js";import{D as c}from"./index-260a5de6.js";import{T as S}from"./index-8b59c62d.js";import{C as w}from"./index-6bcba01a.js";import{C as L}from"./ColorPicker-78ab9605.js";import"./index-be3eb6ff.js";import"./SinglePicker-6cb3c598.js";import"./customParseFormat-7dd65383.js";import"./useIcons-7358587c.js";import"./TreeSelect-51309db4.js";import"./Select-20bb209e.js";import"./List-c230856e.js";import"./conductUtil-a28b5618.js";import"./Tree-73a2cd6b.js";import"./index-bf348bc9.js";import"./iconUtil-1cc95d66.js";import"./index-37f95fae.js";import"./Cascader-c2b2116b.js";import"./ColorPicker-6de4a6e5.js";const{RangePicker:m}=c,K=({value:h})=>{const[o]=l.useForm(),[s,u]=n.useState("horizontal"),[T,d]=n.useState("default"),p=({layout:r,size:v})=>{u(r),d(v)},x=()=>{o.setFieldsValue({title:void 0,date:void 0})},j=r=>{z.success("提交的数据为 : "+JSON.stringify(r))},b=r=>{},f={weight:0,publicType:"1"},g=s==="horizontal"?{labelCol:{span:10},wrapperCol:{span:16}}:null,I=s==="horizontal"?{wrapperCol:{offset:10,span:16}}:null;return e.jsx(e.Fragment,{children:h=="FromCollectUser"&&e.jsxs(l,{...g,name:"basic",form:o,disabled:!1,style:{maxWidth:s==="inline"?"none":800},layout:s,onFinish:j,onFinishFailed:b,onValuesChange:p,autoComplete:"off",initialValues:f,children:[e.jsx(l.Item,{label:"Form Layout",name:"layout",children:e.jsxs(a.Group,{value:s,children:[e.jsx(a.Button,{value:"horizontal",children:"Horizontal"}),e.jsx(a.Button,{value:"vertical",children:"Vertical"}),e.jsx(a.Button,{value:"inline",children:"Inline"})]})}),e.jsx(l.Item,{label:"Form Size",name:"size",children:e.jsxs(a.Group,{children:[e.jsx(a.Button,{value:"small",children:"Small"}),e.jsx(a.Button,{value:"default",children:"Default"}),e.jsx(a.Button,{value:"large",children:"Large"})]})}),e.jsx(l.Item,{label:"标题",name:"title",rules:[{required:!0,message:"请输入标题"}],children:e.jsx(t,{placeholder:"给目标起个名字"})}),e.jsx(l.Item,{label:"起止日期",name:"date",rules:[{required:!1,message:"请选择起止日期"}],children:e.jsx(m,{showTime:!0,format:"YYYY-MM-DD HH:mm:ss"})}),e.jsx(l.Item,{label:"目标描述",name:"goal",rules:[{required:!1,message:"请输入目标描述"}],children:e.jsx(t.TextArea,{rows:3,showCount:!0,maxLength:100,placeholder:"请输入你的阶段性工作目标"})}),e.jsx(l.Item,{label:"衡量标准",name:"standard",rules:[{required:!1,message:"请输入衡量标准"}],children:e.jsx(t.TextArea,{rows:3,showCount:!0,maxLength:100,placeholder:"请输入衡量标准"})}),e.jsx(l.Item,{label:e.jsxs("span",{children:["客户",e.jsx("span",{className:"optional",children:"（选填）"})]}),name:"client",tooltip:"目标的服务对象",children:e.jsx(t,{placeholder:"请描述你服务的客户，内部客户直接 @姓名／工号"})}),e.jsx(l.Item,{label:e.jsxs("span",{children:["邀评人",e.jsx("span",{className:"optional",children:"（选填）"})]}),name:"invites",children:e.jsx(t,{placeholder:"请直接 @姓名／工号，最多可邀请 5 人"})}),e.jsx(l.Item,{label:e.jsxs("span",{children:["权重",e.jsx("span",{className:"optional",children:"（选填）"})]}),name:"weight",wrapperCol:{span:5},children:e.jsx(C,{min:0,max:100,precision:0,placeholder:"请输入",addonAfter:"%"})}),e.jsx(l.Item,{label:e.jsxs("span",{children:["目标公开",e.jsx("span",{className:"optional",children:"（客户、邀评人默认被分享）"})]}),name:"publicType",children:e.jsxs(a.Group,{className:"mb10",children:[e.jsx(a,{value:"1",children:"公开"}),e.jsx(a,{value:"2",children:"不公开"})]})}),e.jsx(l.Item,{label:"DatePicker",children:e.jsx(c,{})}),e.jsx(l.Item,{label:"RangePicker",children:e.jsx(m,{})}),e.jsx(l.Item,{label:"TreeSelect",children:e.jsx(S,{value:"bamboo",treeData:[{title:"Light",value:"light",children:[{title:"Bamboo",value:"bamboo"}]}]})}),e.jsx(l.Item,{label:"Cascader",children:e.jsx(w,{value:["hangzhou"],options:[{value:"zhejiang",label:"Zhejiang",children:[{value:"hangzhou",label:"Hangzhou"}]}]})}),e.jsx(l.Item,{label:"Slider",children:e.jsx(y,{value:66})}),e.jsx(l.Item,{label:"ColorPicker",children:e.jsx(L,{})}),e.jsx(l.Item,{...I,children:e.jsxs(F,{children:[e.jsx(i,{type:"primary",htmlType:"submit",children:"提交"}),e.jsx(i,{htmlType:"button",onClick:x,children:"重置"})]})})]})})};export{K as default};