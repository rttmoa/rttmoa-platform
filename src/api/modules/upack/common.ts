import http from '@/api/upack';

// * http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表 —— 仓库货架表（nb_shelf__c）
export const GetShelfStock = () => http.get(`/shelf/Warehouse_Report`);

type Params = { [key: string]: any };

// 列表页面 — 使用ProTable — 获取用户表（_a_user）
export const GetProTableUser = (params: Params) => http.get(`/userp/find_user_protable`, params);

// 列表页面 — 使用ProTable — 删除多个用户（_a_user）
export const DelMoreProTableUser = (ids: Params) => http.post('/userp/del_more_User/123', { data: ids });

// 功能模块 — 库位库存报表 — 获取仓库货架表
export const GetAllShelf = (params: Params) => http.get(`/shelf/Warehouse_All_Shelf`, params);

// * System
// 系统管理 — 菜单管理 — 新增菜单
export const InsNewMenu = (params: Params) => http.post(`/menu/addMenu`, params);

// 系统管理 — 菜单管理 — 获取菜单
export const FindAllMenu = (params: Params) => http.get(`/menu/allMenu`, params);

// 系统管理 — 菜单管理 — 更新菜单
export const UpMenu = (params: Params) => http.post(`/menu/modMenu`, params);

// 系统管理 — 菜单管理 — 删除菜单
export const DelMenu = (params: Params) => http.post(`/menu/delMenu`, params);

// 系统管理 — 用户管理 — 获取用户列表
export const GetUserManagerList = (params: Params) => http.get(`/userp/find_User_Manager`, params);

// 系统管理 — 用户管理 — 删除用户
export const DelUser = (id: string) => http.delete(`/userp/del_User`, { id });

// 系统管理 — 用户管理 — 删除更多用户
export const DelMoreUser = (ids: string[]) => http.post(`/userp/dels`, { ids });

// 系统管理 — 岗位管理 — 查询岗位
export const findJob = (params: Params) => http.get(`/job/allJob`, params);
// 系统管理 — 岗位管理 — 新增岗位
export const addJob = (params: Params) => http.post(`/job/addJob`, params);
// 系统管理 — 岗位管理 — 修改岗位
export const modifyJob = (params: Params) => http.post(`/job/modifyJob`, params);
// 系统管理 — 岗位管理 — 删除岗位
export const delJob = (id: string) => http.delete(`/job/delJob`, { id });
// 系统管理 — 岗位管理 — 删除更多岗位
export const delMoreJob = (ids: string[]) => http.post(`/job/delMoreJob`, { ids });

// 系统管理 — 角色管理 — 查询
export const findRole = (params: Params) => http.get(`/role/findRole`, params);
export const addRole = (params: Params) => http.post(`/role/addRole`, params);
export const modifyRole = (params: Params) => http.post(`/role/modifyRole`, params);
export const delRole = (id: string) => http.delete(`/role/delRole`, { id });

// 系统管理 — 部门管理 — 新增
export const addDept = (params: Params) => http.post(`/dept/department`, params);
export const findDept = (params: Params) => http.get(`/dept/departments`, params);
export const modifyDept = (id: string, data: any) => http.put(`/dept/department/${id}`, data);
export const delDept = (id: string) => http.delete(`/dept/department/${id}`);
