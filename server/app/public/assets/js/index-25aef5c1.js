import{r as t,a9 as l,j as e,U as f,N as C,B as d,bc as N,R as v,C as r,X as a}from"./index-1b257d2f.js";import y from"./Modal-26d6d273.js";import{C as i}from"./index-72919ef7.js";import"./index-88675925.js";import"./index-be3eb6ff.js";import"./Skeleton-82688fa7.js";const E=()=>{const[h,n]=t.useState(!1),[x]=l.useForm(),[c,p]=t.useState("horizontal"),j=({layout:o})=>{p(o)},m=c==="horizontal"?{labelCol:{span:4},wrapperCol:{span:14}}:null,u=c==="horizontal"?{wrapperCol:{span:14,offset:4}}:null;let s={xs:24,md:11,xxl:7};const b=()=>{n(!0)},I=o=>{n(!1)};return e.jsxs("div",{className:"userForm",children:[e.jsxs(i,{className:"card-top mb10",children:[e.jsxs("div",{className:"div-top",children:[e.jsxs("div",{className:"userInfo",children:[e.jsx("div",{className:"avatar",children:e.jsx(f,{})}),e.jsxs("div",{className:"auth",children:[e.jsx("span",{className:"person",children:"人员"}),e.jsx("span",{className:"admin",children:"管理员"})]})]}),e.jsx("div",{className:"userUpdate",children:e.jsxs(C,{children:[e.jsx(d,{onClick:b,children:"编辑"}),e.jsx(d,{children:"修改密码"})]})})]}),e.jsxs("div",{className:"div-bottom",children:[e.jsx(N,{}),e.jsx("a",{href:"#",children:"岗位成员(0)"})]})]}),e.jsx(i,{className:"mb10",children:e.jsx(l,{...m,layout:c,form:x,initialValues:{layout:c},onValuesChange:j,children:e.jsx(i,{className:"mb10",children:e.jsxs(v,{children:[e.jsx(r,{...s,children:e.jsx(l.Item,{label:"姓名",children:e.jsx(a,{placeholder:"input placeholder",disabled:!0})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"工号",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"用户名",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"邮件",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"手机",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"部分（多选）",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"职务",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"上级主管",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"简档",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"工作电话",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"语言",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"排序号",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"接收邮件通知",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"接收短信提醒",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"有效",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"密码已过期",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{label:"头像",children:e.jsx(a,{placeholder:"input placeholder"})})}),e.jsx(r,{...s,children:e.jsx(l.Item,{...u,children:e.jsx(d,{type:"primary",children:"Submit"})})})]})})})}),e.jsx(y,{open:h,onCreate:I,onCancel:()=>n(!1)})]})};export{E as default};