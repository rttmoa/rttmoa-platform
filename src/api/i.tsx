import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

class RequestHttp {
	service: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.service = axios.create(config);
	}

	request<T = any>(url: string, method: Method = 'GET', data?: any, prefix: string = ''): Promise<T> {
		return this.service({
			url: `${prefix}${url}`,
			method,
			...(method === 'GET' ? { params: data } : { data }),
		});
	}
}

export default new RequestHttp({
	baseURL: '/', // 统一前缀
	timeout: 5000,
	withCredentials: false,
});

// http.request('/list', 'GET', {}, '/api');    // /api/list
// http.request('/data', 'POST', { id: 1 }, '/upack'); // /upack/data
