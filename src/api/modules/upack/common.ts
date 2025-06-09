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
export const InsNewMenu = (params: Params) => http.post(`/menu/ins_Menu`, params);

// 系统管理 — 菜单管理 — 获取菜单
export const FindAllMenu = (params: Params) => http.get(`/menu/find_Menu`, params);

// 系统管理 — 菜单管理 — 更新菜单
export const UpMenu = (params: Params) => http.post(`/menu/up_Menu`, params);

// 系统管理 — 菜单管理 — 删除菜单
export const DelMenu = (params: Params) => http.post(`/menu/del_Menu`, params);

// 系统管理 — 用户管理 — 获取用户列表
export const GetUserManagerList = (params: Params) => http.get(`/userp/find_User_Manager`, params);

// 系统管理 — 用户管理 — 删除用户
export const DelUser = (id: string) => http.delete(`/userp/del_User`, { id });

// 系统管理 — 用户管理 — 删除更多用户
export const DelMoreUser = (ids: string[]) => http.post(`/userp/dels`, { ids });
