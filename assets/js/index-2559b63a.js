import{a9 as f,r as a,j as e,bj as y,bk as Z,X as ee,B as g,m as c,bl as v}from"./index-27069029.js";import{r as I}from"./roleManage-1d03b01a.js";import{c as te,d as se,e as le,g as ae,h as ie}from"./userManage2-7736cf57.js";import oe from"./treeList-290be8fb.js";import ne from"./tableList-0be37d00.js";import re from"./addPolice-1b756c54.js";import de from"./selectRole-dde1f16b.js";import{P as z}from"./index-cfb6273e.js";import"./index-c7a6d802.js";import"./Tree-409ac648.js";import"./List-3450d2b7.js";import"./conductUtil-6ae751c6.js";import"./iconUtil-3fadc6e3.js";import"./index-04342e75.js";import"./Table-778951e0.js";import"./index-f5e989dc.js";import"./zh_CN-b8e4881f.js";import"./styleChecker-3c9c7d8a.js";import"./index-4c31189a.js";import"./index-8d525821.js";import"./index-01f37548.js";import"./index-1c2b87a6.js";import"./Select-91793026.js";import"./useIcons-4fdad9d1.js";import"./index-0ed61a77.js";import"./Skeleton-2867eeca.js";const ce=f.Item,{Content:ue,Sider:pe}=y,Me=()=>{const[C]=f.useForm(),[A]=f.useForm(),[U,S]=a.useState(""),[r,m]=a.useState({PoliceAddVisible:!1,moduletype:"",moduletitle:""}),[N,b]=a.useState(""),[R,x]=a.useState(!1),[D,h]=a.useState(!1),[V,L]=a.useState(!1),[u,me]=a.useState({view:!0,freeze:!0,delete:!0,edit:!0,add:!0}),[i,n]=a.useState({keyword:"",pageSize:10,pageNo:1,deptCode:""}),[F,T]=a.useState({list:[],loading:!1}),[d,E]=a.useState({list:[],loading:!1}),[P,K]=a.useState({list:[],loading:!1}),[w,k]=a.useState({list:[],loading:!1}),o=t=>{se(i).then(s=>{let l=s.data;l.list.splice(0,l.list.length-10),E({list:l}),t&&t()})};a.useEffect(()=>{I().then(t=>{k({list:t.data.list})}),te({}).then(t=>{T({list:t.data}),n(s=>({...s,deptCode:t.data[0].deptCode})),S(t.data[0].deptName)}),o(()=>{})},[]);const M=t=>{I().then(s=>{k({list:s.data}),x(!0),b(t)})},O=t=>{le({id:t}).then(s=>{K({list:s.data}),m({PoliceAddVisible:!0,moduletype:"edit",moduletitle:"详情"}),b(t)})},$=(t,s)=>{ae({id:t,status:s}).then(l=>{c.success(l.msg),o(()=>{})})},B=t=>{if(sessionStorage.getItem("userid")===t){c.warning("自己不能删除自己");return}const s=d.list;let l=i.pageNo;ie({deptcode:i.deptCode,id:t}).then(p=>{c.success(p.msg),s.totalPage>1&&s.totalCount%10===1&&(l-=1),n(j=>({...j,pageNo:l})),o(()=>{})})},G=[{title:"姓名",dataIndex:"chineseName",key:"chineseName",width:"15%"},{title:"职务",dataIndex:"post",key:"post",width:"15%",render:t=>e.jsx("span",{children:"员工"})},{title:"帐号",dataIndex:"username",key:"username",width:"15%"},{title:"帐号状态",dataIndex:"statusLabel",key:"statusLabel",width:"15%",render:(t,s,l)=>e.jsx("span",{children:s.status?"已冻结":"正常"})},{title:"角色",dataIndex:"roles",key:"roles",width:"20%",render:(t,s,l)=>{const p=[];(t||[]).map(Y=>{p.push(Y.role_name)});let j=p.length===0?"":p.join(",");return e.jsx(g,{type:"default",onClick:()=>{M(s.id)},children:j||"普通用户"})}},{title:"操作",key:"operate",render:(t,s,l)=>e.jsxs("span",{children:[u.view?e.jsxs("span",{children:[e.jsx("a",{onClick:()=>O(s.id),children:"详情"}),e.jsx("span",{className:"ant-divider"})]}):null,u.freeze?e.jsx("span",{children:e.jsx(z,{title:`确认${s.status?"解冻":"冻结"}账户?`,placement:"left",onConfirm:()=>$(s.id,`${s.status}`),children:e.jsx("a",{children:s.status?"解冻账户":"冻结账户"})})}):null,e.jsx("span",{className:"ant-divider"}),u.delete?e.jsx(z,{title:"删除用户?",placement:"left",onConfirm:()=>B(s.id),children:e.jsx("a",{children:"删除"})}):null]})}],H=(t=[],s)=>{h(!0),S(s),n(l=>({...l,deptCode:t[0],pageNo:1,keyword:""})),o(()=>{h(!1)})},X=()=>{const t=C.getFieldsValue();h(!0),n(s=>({...s,keyword:t,pageNo:1})),o(()=>{h(!1)})},_=t=>{n({pageNo:t}),o(()=>{})},q=(t,s)=>{n(l=>({...l,pageNo:1,pageSize:s}))},J=()=>{i.deptCode?(v.info({message:`deptId是${i.deptCode}`}),m({PoliceAddVisible:!0,moduletype:"add",moduletitle:"新增"})):v.error({message:"错误",description:"请先选择部门"})},Q=()=>{c.info("用户数据同步中"),L(!0),setTimeout(()=>{c.success("用户数据同步完成"),L(!1),o(()=>{})},2500)},W=()=>{const t=d.list;let s=i.pageNo;r.moduletype==="add"&&t&&t.totalCount>0&&t.totalCount%10===0&&(s+=1),m({PoliceAddVisible:!1,moduletype:"",moduletitle:""}),n(l=>({...l,pageNo:s})),o(()=>{})};return e.jsxs("div",{className:"page page-scrollfix page-usermanage",children:[e.jsx(y,{children:e.jsxs(y,{className:"page-body",children:[e.jsx(pe,{width:240,children:e.jsxs(Z,{spinning:!1,children:[e.jsx("h3",{className:"page-title",children:"城市"}),e.jsx("div",{className:"treeside",children:e.jsx(oe,{trees:F.list,curDeptCode:i.deptCode,onSelect:H})})]})}),e.jsxs(ue,{children:[e.jsxs("h3",{className:"page-title",children:[U,e.jsxs("span",{className:"error",children:[" ",d.list.totalCount?d.list.totalCount:0]}),"人"]}),e.jsx("div",{className:"page-header",children:e.jsxs(f,{layout:"inline",className:"flexrow",form:C,onFinish:X,children:[e.jsx(ce,{labelCol:{span:6},children:e.jsx(ee,{className:"input-base-width",placeholder:"请输入关键字进行搜索"})}),e.jsx(g,{type:"primary",size:"middle",htmlType:"submit",children:"搜索"})]})}),e.jsx("div",{className:"page-content has-pagination table-flex table-scrollfix",children:e.jsx(ne,{size:"small",style:{maxHeight:800},rowKey:"id",columns:G,currentPage:i.pageNo,pageSize:i.pageSize,dataSource:d.list.list,loading:D,totalCount:d.list.totalCount,onChange:_,onShowSizeChange:q,border:!0})}),e.jsx("div",{className:"page-footer",children:e.jsxs("div",{className:"page-footer-buttons",children:[u.add?e.jsxs(g,{type:"primary",style:{marginRight:"10px"},onClick:J,children:[" ","新增人员"]}):null,u.add?e.jsxs(g,{type:"primary",loading:V,onClick:Q,children:[" ","同步人员"]}):null]})})]})]})}),r.PoliceAddVisible?e.jsx(re,{form:A,visible:r.PoliceAddVisible,type:r.moduletype,title:r.moduletitle,handleOk:W,values:r.moduletype==="add"?"":P.list,deptId:i.deptCode,currPeopleId:N,onCancel:()=>{m({PoliceAddVisible:!1,moduletype:"",moduletitle:""})},roleList:w.list.list||[]}):null,R?e.jsx(de,{visible:R,handleOkRole:()=>{x(!1),o(()=>{})},values:P,currPeopleId:N,select:w.list.list,onCancel:()=>{c.info("取消成功"),x(!1)}}):null]})};export{Me as default};