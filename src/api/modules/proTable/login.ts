// @ts-ignore
/* eslint-disable */

import { httpApi } from '@/api';

/** 发送验证码 POST /api/login/captcha */
export async function getFakeCaptcha(
	params: {
		phone?: string;
	},
	options?: { [key: string]: any }
) {
	return httpApi.get<API.FakeCaptcha>('/api/login/captcha', {
		method: 'GET',
		params: {
			...params,
		},
		...(options || {}),
	});
}
