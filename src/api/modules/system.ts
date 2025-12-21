import { PORT1 } from '@/api/config/servicePort';
import { Params } from '@/api/interface';
import { httpApi, httpUpack as http } from '..';

// * http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 添加后缀时间戳：{name: 'zs', timestamp: 1754027551940}
const suffix = (object = {}) => {
	const timestamp = Math.round(new Date().getTime());
	return { ...object, timestamp };
};

export class systemAPI {
	private static AUTH_API_PREFIX = '/auth';
	static PEFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`;

	// Sys 测试模块
	static sysFind = (params: Params) => http.post(`/sys/query`, params);
	static sysAdd = (params: Params) => http.post(`/sys/add`, params);
	static sysMod = (id: string, params: Params) => http.put(`/sys/mod/${id}`, params);
	static sysDel = (id: string) => http.delete(`/sys/del/${id}`);
	static sysDelMore = (data: string[]) => http.post(`/sys/delMore`, data);
	static sysImportEx = (params: Params) => http.post(`/sys/importEx`, params);
}

// 用户管理
export class user_manageAPI {
	private static userApi = '/user_manage';

	static find = (params: Params) => http.post(`${this.userApi}/query`, params);
	static add = (params: Params) => http.post(`${this.userApi}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.userApi}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.userApi}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.userApi}/delMore`, data);
	// static importEx = (params: Params) => http.post(`${this.userApi}/importEx`, params);
}

// * 系统管理 — 角色管理
export class roleAPI {
	private static api = '/role';
	// ======= Operate =======
	static find = (params: Params) => http.post(`${this.api}/findRole`, params);
	static add = (params: Params) => http.post(`${this.api}/addRole`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/modifyRole/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/delRole/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);

	static roleList = () => httpApi.get(`${PORT1}/role/list`); // 获取角色列表
	static roleTransferList = (id: number) => httpApi.get(PORT1 + `/role/transfer/list`); // 获取角色转换列表
}

// * System
// * 系统管理 — 菜单管理
export const FindAllMenu = (params: Params) => http.get(`/menu/allMenu`, params); // {name: 'all'} | {name: 'open'}
export const InsNewMenu = (params: Params) => http.post(`/menu/addMenu`, params);
export const UpMenu = (params: Params) => http.post(`/menu/modMenu`, params);
export const DelMenu = (params: Params) => http.post(`/menu/delMenu`, params);

// * 系统管理 — 用户管理eg1
export const getUsers = (params: Params) => http.get(`/userp/users2`, params);
export const addUser = (params: Params) => http.post(`/userp/addUser`, params);
export const modifyUser = (id: string, data: any) => http.put(`/userp/putUser/${id}`, data);
export const delUser = (id: string) => http.delete(`/userp/users`, { id });
export const GetProTableUser = (params: Params) => http.get(`/userp/users1`, params);
export const DelMoreUser = (ids: string[]) => http.post(`/userp/delMoreUsers`, { ids });
export const DelMoreProTableUser = (ids: Params) => http.post('/userp/delMoreUsers', { data: ids });

// * 系统管理 — 岗位管理
export const findJob = (params: Params) => http.post(`/jb/query`, params);
export const addJob = (params: Params) => http.post(`/jb/add`, params);
export const delJob = (id: string) => http.delete(`/jb/del/${id}`);
export const delMoreJob = (data: string[]) => http.post(`/jb/delMore`, data);
export const modifyJob = (id: string, params: Params) => http.put(`/jb/mod/${id}`, params);
export const ExJob = (params: Params) => http.post(`/jb/importEx`, params);

// * 系统管理 — 部门管理
export const findDept = (params: Params) => http.get(`/dept/departments`, params);
export const addDept = (params: Params) => http.post(`/dept/department`, params);
export const modifyDept = (id: string, data: any) => http.put(`/dept/department/${id}`, data);
export const delDept = (id: string) => http.delete(`/dept/department/${id}`);

const categoryList = (parentId: string) => http.get(`/category/list?parentId=${parentId}`); // 获取分类列表

export const fetchUserDepttList = (params = {}) => httpApi.get(PORT1 + `/dept/list`, params); // 获取用户管理左侧分类列表（杭州,上海地区）
export const fetchUserList = (params = {}) => httpApi.get(PORT1 + `/user/list2`, params); // 获取用户列表
export const fetchUserDetail = (params = {}) => httpApi.get(PORT1 + `/user/detail`, params); // 获取用户详情
export const fetchUserDelete = (params = {}) => httpApi.get(PORT1 + `/user/delete`, params); // 删除
export const fetchRoleList = (params = {}) => httpApi.get(PORT1 + `/rolelist`, params); // 角色 List
export const fetchChangeUserStatus = (params = {}) => httpApi.get(PORT1 + `/user/changeStatus`, params); // 用户 Status
export const fetchUserDetailUpdate = (params = {}) => httpApi.post(PORT1 + `/user/detailUpdate`, params); // 弹窗: 修改人员信息
export const fetchUserAdd = (params = {}) => httpApi.post(PORT1 + `/user/add`, params); // 弹窗: 新增人员信息
export const fetchUserSetRole = (params = {}) => httpApi.post(PORT1 + `/user/set/role`, params); // 角色：修改角色信息
