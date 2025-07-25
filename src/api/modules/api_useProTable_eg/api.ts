// @ts-ignore
/* eslint-disable */

import http from '@/api';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
	return http.get<{
		data: API.CurrentUser;
	}>('/api/currentUser', {
		method: 'GET',
		...(options || {}),
	});
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
	return http.post<Record<string, any>>('/api/login/outLogin', {
		method: 'POST',
		...(options || {}),
	});
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
	return http.post<API.LoginResult>('/api/login/account', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		data: body,
		...(options || {}),
	});
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
	return http.get<API.NoticeIconList>('/api/notices', {
		method: 'GET',
		...(options || {}),
	});
}

/** 获取规则列表 GET /api/rule */
export async function rule(
	params: {
		// query
		/** 当前的页码 */
		current?: number;
		/** 页面的容量 */
		pageSize?: number;
	},
	options?: { [key: string]: any }
) {
	return http.get<API.RuleList>('/api/rule', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}

/** 更新规则 PUT /api/rule */
// await updateRule({ name: fields.name, desc: fields.desc, key: fields.key,	});
export async function updateRule(options?: { [key: string]: any }) {
	return http.post<API.RuleListItem>('/api/rule', {
		method: 'POST',
		data: {
			method: 'update',
			...(options || {}),
		},
	});
}

/** 新建规则 POST /api/rule */
// await addRule({ ...formValues });
export async function addRule(options?: { [key: string]: any }) {
	return http.post<API.RuleListItem>('/api/rule', {
		method: 'POST',
		data: {
			method: 'post',
			...(options || {}),
		},
	});
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
	return http.post<Record<string, any>>('/api/rule', {
		method: 'POST',
		data: {
			method: 'delete',
			...(options || {}),
		},
	});
}
