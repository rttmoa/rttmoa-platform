import { PORT1 } from '@/api/config/servicePort';
import { Params } from '@/api/interface';
import { httpApi, httpUpack } from '..';

// * httpUpack://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 添加后缀时间戳：{name: 'zs', timestamp: 1754027551940}
const suffix = (object = {}) => {
	const timestamp = Math.round(new Date().getTime());
	return { ...object, timestamp };
};

// * System
// * 系统管理 — 菜单管理
export const FindAllMenu = (params: Params) => httpUpack.get(`/menu/allMenu`, params); // {name: 'all'} | {name: 'open'}
export const InsNewMenu = (params: Params) => httpUpack.post(`/menu/addMenu`, params);
export const UpMenu = (params: Params) => httpUpack.post(`/menu/modMenu`, params);
export const DelMenu = (params: Params) => httpUpack.post(`/menu/delMenu`, params);

// * 系统管理 — 用户管理eg1
export const getUsers = (params: Params) => httpUpack.get(`/userp/users2`, params);
export const addUser = (params: Params) => httpUpack.post(`/userp/addUser`, params);
export const modifyUser = (id: string, data: any) => httpUpack.put(`/userp/putUser/${id}`, data);
export const delUser = (id: string) => httpUpack.delete(`/userp/users`, { id });
export const GetProTableUser = (params: Params) => httpUpack.get(`/userp/users1`, params);
export const DelMoreUser = (ids: string[]) => httpUpack.post(`/userp/delMoreUsers`, { ids });
export const DelMoreProTableUser = (ids: Params) => httpUpack.post('/userp/delMoreUsers', { data: ids });

// * 系统管理 — 岗位管理
export const findJob = (params: Params) => httpUpack.post(`/jb/job`, params);
export const addJob = (params: Params) => httpUpack.post(`/jb/jobAdd`, params);
export const delJob = (id: string) => httpUpack.delete(`/jb/job/${id}`);
export const delMoreJob = (data: string[]) => httpUpack.post(`/jb/jobDel`, data);
export const modifyJob = (id: string, params: Params) => httpUpack.put(`/jb/job/${id}`, params);
export const ExJob = (params: Params) => httpUpack.post(`/jb/jobEx`, params);

// * 系统管理 — Sys 模板
export const findSys = (params: Params) => httpUpack.post(`/sys/job`, params);
export const addSys = (params: Params) => httpUpack.post(`/sys/jobAdd`, params);
export const delSys = (id: string) => httpUpack.delete(`/sys/job/${id}`);
export const delMoreSys = (data: string[]) => httpUpack.post(`/sys/jobDel`, data);
export const modifySys = (id: string, params: Params) => httpUpack.put(`/sys/job/${id}`, params);
export const ExSys = (params: Params) => httpUpack.post(`/sys/jobEx`, params);

// * 系统管理 — 角色管理
export const findRole = (params: Params) => httpUpack.get(`/role/findRole`, params);
export const addRole = (params: Params) => httpUpack.post(`/role/addRole`, params);
export const modifyRole = (params: Params) => httpUpack.post(`/role/modifyRole`, params);
export const delRole = (id: string) => httpUpack.delete(`/role/delRole`, { id });

export const roleList = () => httpApi.get(PORT1 + `/role/list`); // 获取角色列表
export const roleTransferList = (id: number) => httpApi.get(PORT1 + `/role/transfer/list`); // 获取角色转换列表

// * 系统管理 — 部门管理
export const findDept = (params: Params) => httpUpack.get(`/dept/departments`, params);
export const addDept = (params: Params) => httpUpack.post(`/dept/department`, params);
export const modifyDept = (id: string, data: any) => httpUpack.put(`/dept/department/${id}`, data);
export const delDept = (id: string) => httpUpack.delete(`/dept/department/${id}`);

const categoryList = (parentId: string) => httpUpack.get(`/category/list?parentId=${parentId}`); // 获取分类列表

export const fetchUserDepttList = (params = {}) => httpApi.get(PORT1 + `/dept/list`, params); // 获取用户管理左侧分类列表（杭州,上海地区）
export const fetchUserList = (params = {}) => httpApi.get(PORT1 + `/user/list2`, params); // 获取用户列表
export const fetchUserDetail = (params = {}) => httpApi.get(PORT1 + `/user/detail`, params); // 获取用户详情
export const fetchUserDelete = (params = {}) => httpApi.get(PORT1 + `/user/delete`, params); // 删除
export const fetchRoleList = (params = {}) => httpApi.get(PORT1 + `/rolelist`, params); // 角色 List
export const fetchChangeUserStatus = (params = {}) => httpApi.get(PORT1 + `/user/changeStatus`, params); // 用户 Status
export const fetchUserDetailUpdate = (params = {}) => httpApi.post(PORT1 + `/user/detailUpdate`, params); // 弹窗: 修改人员信息
export const fetchUserAdd = (params = {}) => httpApi.post(PORT1 + `/user/add`, params); // 弹窗: 新增人员信息
export const fetchUserSetRole = (params = {}) => httpApi.post(PORT1 + `/user/set/role`, params); // 角色：修改角色信息
