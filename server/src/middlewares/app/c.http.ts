import axios, { AxiosError, AxiosInstance } from "axios";
import { Context, Next } from "koa";

const _Http = () => {
	const instance: AxiosInstance = axios.create({
		timeout: 1000,
		withCredentials: false,
		headers: {
			"Content-Type": "application/json;charset=utf-8",
			"Accept": "application/json",
		},
		validateStatus: (status) => status >= 200 && status < 300,
	});
	instance.interceptors.request.use((config: any) => {
		config.headers = config.headers || {};
		if (!config.headers["X-Request-Id"]) {
			config.headers["X-Request-Id"] = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
		}
		return config;
	});
	instance.interceptors.response.use(
		(response: any) => response,
		(error: AxiosError) => {
			const status = error.response?.status;
			const data = error.response?.data;
			const message = error.message;
			const code = error.code || (status ? String(status) : "NETWORK_ERROR");
			const url = error.config?.url;
			const method = error.config?.method?.toUpperCase();
			return Promise.reject({ status, code, message, data, url, method });
		}
	);
	return async (ctx: Context, next: Next) => {
		const request = async <T = any>(method: string, url: string, params?: any, _object?: any): Promise<T> => {
			const cfg: any = { ..._object, method, url };
			if (method === "GET") {
				cfg.params = params;
			} else {
				cfg.data = params;
			}
			const res = await instance.request(cfg);
			return res.data as T;
		};
		ctx.http = {
			get: <T = any>(url: string, params?: any, _object?: any) => request<T>("GET", url, params, _object),
			post: <T = any>(url: string, params?: any, _object?: any) => request<T>("POST", url, params, _object),
			put: <T = any>(url: string, params?: any, _object?: any) => request<T>("PUT", url, params, _object),
			patch: <T = any>(url: string, params?: any, _object?: any) => request<T>("PATCH", url, params, _object),
			delete: <T = any>(url: string, params?: any, _object?: any) => request<T>("DELETE", url, params, _object),
		} as any;
		await next();
	};
};

export default _Http;
