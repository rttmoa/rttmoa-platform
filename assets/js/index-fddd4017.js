import{j as e}from"./react-12b51ca5.js";import{F as l,Y as i,d as m,e as r,I as t,g as s,x as p,S as n,B as o,D as c,a as h}from"./antd-e2492052.js";import"./@ant-design-63539318.js";import"./rc-util-8976b5fa.js";import"./react-dom-e71a48dd.js";import"./@babel-c46ce09a.js";import"./classnames-3ded05b8.js";import"./resize-observer-polyfill-0f9f8adb.js";import"./rc-resize-observer-5c9960e4.js";import"./@umijs-02c6bdf5.js";import"./swr-1237c4b3.js";import"./use-sync-external-store-ad55a9d4.js";import"./@dnd-kit-908a095e.js";import"./dayjs-6d610299.js";import"./@ctrl-bad846bd.js";import"./omit.js-929edb61.js";import"./lodash.merge-9922d51b.js";import"./safe-stable-stringify-023075f7.js";import"./@chenshuai2144-5a33ccd2.js";import"./reactcss-f166c0a9.js";import"./lodash-40f09dbd.js";import"./tinycolor2-ea5bcbb6.js";import"./lodash.tonumber-b59040d8.js";import"./rc-field-form-e46b50c8.js";import"./async-validator-dee29e8b.js";import"./@emotion-70f0a3ab.js";import"./stylis-d04dd720.js";import"./rc-motion-25d44171.js";import"./rc-notification-3ca02e51.js";import"./rc-overflow-7fc9dc70.js";import"./rc-picker-d202c760.js";import"./@rc-component-60bdd203.js";import"./rc-tabs-f080ce12.js";import"./rc-dropdown-1fd4539e.js";import"./rc-menu-c99c3faa.js";import"./rc-cascader-238c5b8d.js";import"./rc-select-8e380119.js";import"./rc-virtual-list-5b0902fa.js";import"./rc-tree-898f7873.js";import"./rc-input-number-f64f90f1.js";import"./rc-input-3682369a.js";import"./rc-collapse-3e02f0e2.js";import"./rc-drawer-9ef263c4.js";import"./scroll-into-view-if-needed-582d6ca4.js";import"./compute-scroll-into-view-e3f0ecc2.js";import"./rc-image-3cfe7923.js";import"./rc-dialog-8eb1683d.js";import"./rc-mentions-9823f19c.js";import"./rc-textarea-b098f88a.js";import"./rc-tooltip-01b6b839.js";import"./qrcode.react-e22f0a27.js";import"./rc-rate-2d3465a8.js";import"./rc-segmented-6536d122.js";import"./rc-slider-e91f05e6.js";import"./rc-steps-f39c48c2.js";import"./rc-switch-8d316ace.js";import"./rc-table-a211065a.js";import"./rc-checkbox-ae7b2d99.js";import"./throttle-debounce-87e7e444.js";import"./rc-pagination-334fefa5.js";import"./rc-tree-select-5a273e06.js";import"./copy-to-clipboard-47a2b094.js";import"./toggle-selection-93f4ad84.js";import"./rc-upload-71d17dfe.js";import"./rc-progress-a416f280.js";const{RangePicker:j}=c,{Text:u,Title:b}=h,Re=()=>{const[a]=l.useForm(),x=()=>{a.resetFields()},d=f=>{};return e.jsxs("div",{className:"advanced-form",children:[e.jsxs(i,{className:"mb10",children:[e.jsx(b,{level:4,className:"mb15",children:"高级表单"}),e.jsx(u,{children:"高级表单常见于一次性输入和提交大批量数据的场景。"})]}),e.jsxs(l,{layout:"vertical",name:"advanced",form:a,onFinish:d,children:[e.jsx(i,{className:"mb10",children:e.jsxs(m,{children:[e.jsx(r,{xs:2,sm:4,md:6,lg:8,xl:10,children:"Col"}),e.jsx(r,{xs:22,sm:16,md:12,lg:8,xl:4,children:"Col"}),e.jsx(r,{xs:2,sm:4,md:6,lg:8,xl:10,children:"Col"})]})}),e.jsx(i,{title:"仓库管理",className:"mb10",children:e.jsxs(m,{gutter:50,justify:"space-between",children:[e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"name",label:"仓库名",rules:[{required:!1}],children:e.jsx(t,{placeholder:"请输入仓库名称"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"url",label:"仓库域名",rules:[{required:!1}],children:e.jsx(t,{placeholder:"请输入仓库域名",addonBefore:"http://",addonAfter:".com"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"owner",label:"仓库管理员",rules:[{required:!1}],children:e.jsx(s,{options:[{label:"付晓晓",value:"xiao"},{label:"周毛毛",value:"mao"}],placeholder:"请选择管理员"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"approver",label:"审批人",rules:[{required:!1}],children:e.jsx(s,{options:[{label:"付晓晓",value:"xiao"},{label:"周毛毛",value:"mao"}],placeholder:"请选择审批员"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"dateRange",label:"生效日期",rules:[{required:!1}],children:e.jsx(j,{style:{width:"100%"}})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"type",label:"仓库类型",rules:[{required:!1}],children:e.jsx(s,{options:[{label:"私密",value:"private"},{label:"公开",value:"public"}],placeholder:"请选择仓库类型"})})})]})}),e.jsx(i,{title:"任务管理",className:"mb10",children:e.jsxs(m,{gutter:50,justify:"space-between",children:[e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"task",label:"任务名",rules:[{required:!1}],children:e.jsx(t,{placeholder:"请输入任务名"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"describe",label:"任务描述",rules:[{required:!1}],children:e.jsx(t,{placeholder:"请输入任务描述"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"executor",label:"执行人",rules:[{required:!1}],children:e.jsx(s,{options:[{label:"付晓晓",value:"xiao"},{label:"周毛毛",value:"mao"}],placeholder:"请选择执行人"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"responsible",label:"责任人",rules:[{required:!1}],children:e.jsx(s,{options:[{label:"付晓晓",value:"xiao"},{label:"周毛毛",value:"mao"}],placeholder:"请选择责任人"})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"dateRange2",label:"生效日期",rules:[{required:!1}],children:e.jsx(p,{style:{width:"100%"}})})}),e.jsx(r,{xxl:7,md:11,xs:24,children:e.jsx(l.Item,{name:"type2",label:"任务类型",rules:[{required:!1}],children:e.jsx(s,{options:[{label:"私密",value:"private"},{label:"公开",value:"public"}],placeholder:"请选择任务类型"})})})]})}),e.jsx(i,{title:"填写备注",children:e.jsx(l.Item,{name:"remark",label:"备注信息",rules:[{required:!1}],children:e.jsx(t.TextArea,{rows:4,showCount:!0,maxLength:300,placeholder:"请输入备注信息"})})}),e.jsx("div",{className:"form-footer",children:e.jsxs(n,{children:[e.jsx(o,{htmlType:"button",onClick:x,children:"重置"}),e.jsx(o,{type:"primary",htmlType:"submit",children:"提交"})]})})]})]})};export{Re as default};