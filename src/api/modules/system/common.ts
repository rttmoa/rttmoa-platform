import http from '@/api/upack';

type Params = { [key: string]: any };
type Modify = { id: string; data: any };

// * http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// * System
// * 系统管理 — 菜单管理
export const FindAllMenu = (params: Params) => http.get(`/menu/allMenu`, params);
export const InsNewMenu = (params: Params) => http.post(`/menu/addMenu`, params);
export const UpMenu = (params: Params) => http.post(`/menu/modMenu`, params);
export const DelMenu = (params: Params) => http.post(`/menu/delMenu`, params);

// * 系统管理 — 用户管理
export const GetUserManagerList = (params: Params) => http.get(`/userp/users2`, params);
export const DelUser = (id: string) => http.delete(`/userp/users`, { id });
export const GetProTableUser = (params: Params) => http.get(`/userp/users1`, params);
export const DelMoreUser = (ids: string[]) => http.post(`/userp/delMoreUsers`, { ids });
export const DelMoreProTableUser = (ids: Params) => http.post('/userp/delMoreUsers', { data: ids });

// * 系统管理 — 岗位管理
export const findJob = (params: Params) => http.get(`/job/allJob`, params);
export const addJob = (params: Params) => http.post(`/job/addJob`, params);
export const modifyJob = (params: Params) => http.post(`/job/modifyJob`, params);
export const delJob = (id: string) => http.delete(`/job/delJob`, { id });
export const delMoreJob = (ids: string[]) => http.post(`/job/delMoreJob`, { ids });

// * 系统管理 — 角色管理
export const findRole = (params: Params) => http.get(`/role/findRole`, params);
export const addRole = (params: Params) => http.post(`/role/addRole`, params);
export const modifyRole = (params: Params) => http.post(`/role/modifyRole`, params);
export const delRole = (id: string) => http.delete(`/role/delRole`, { id });

// * 系统管理 — 部门管理
export const findDept = (params: Params) => http.get(`/dept/departments`, params);
export const addDept = (params: Params) => http.post(`/dept/department`, params);
export const modifyDept = (id: string, data: any) => http.put(`/dept/department/${id}`, data);
export const delDept = (id: string) => http.delete(`/dept/department/${id}`);

// 功能模块 > 获取分类列表
const categoryList = (parentId: string) => http.get(`/category/list?parentId=${parentId}`);
const categoryAdd = (parentId: string, categoryName: string) => http.post(`/category/add`, { parentId, categoryName });
// 功能模块 > 获取商品列表
const productList = (page: number, pageSize: number, searchName?: string, searchType?: any) => {
	if (!searchName) {
		return http.get(`/product/list`, { page, pageSize });
	} else {
		return http.get(`/product/list/search`, {
			page,
			pageSize,
			[searchType]: searchName,
		});
	}
};
