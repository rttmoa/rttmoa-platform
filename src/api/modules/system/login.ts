import http from '@/api/upack';

type Params = { [key: string]: any };
type Modify = { id: string; data: any };

// * 系统管理 — 用户管理 — 登陆、注册、退出
export const userLogin = (params: Params) => http.post(`/userp/login`, params);
export const userLogout = (params: Params) => http.post(`/userp/logout`, params);
export const userRegister = (params: Params) => http.post(`/userp/register`, params);
