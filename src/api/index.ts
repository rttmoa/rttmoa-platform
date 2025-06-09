/* eslint-disable prettier/prettier */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios'; // TODO: Axios Typescript
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/components/Loading/fullScreen';
import { LOGIN_URL } from '@/config';
import { ResultData } from '@/api/interface';
import { ResultEnum } from '@/enums/httpEnum';
import { message } from '@/hooks/useMessage';
import { setToken } from '@/redux/modules/user'; // 用户：Token
import { checkStatus } from './helper/checkStatus'; // 状态码：checkStatus
import { store } from '@/redux'; // redux：Store

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	loading?: boolean;
}
const config: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_URL as string, // development: /api
	timeout: ResultEnum.TIMEOUT as number,
	withCredentials: false, // 跨域时候允许携带凭证
};

// 注意点：
// 1.env文件，是开发还是生产环境
// 2.Axios二次封装，接口统一存放,满足RESTful风格： https://wocwin.github.io/t-ui/projectProblem/axios.html
// 3.参考 Axios Typescript 属性
class RequestHttp {
	// 服务实例
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化
		this.service = axios.create(config);
		/**
		 * @description request interceptor
		 * Client sends request -> [request interceptor] -> server
		 * token verification (JWT): Accept the token returned by the server and store it in redux/local storage
		 */
		this.service.interceptors.request.use(
			(config: CustomAxiosRequestConfig) => {
				// 当前请求需要显示加载，这由 API 服务中指定的第三个参数控制： {loading: true}
				config.loading && showFullScreenLoading();

				// ! 请求时加载进度条： NProgress.start() - NProgress.done();
				// 每个接口新增时间戳
				// let timeStamp = new Date().getTime()
				// if(config.url && config.url.includes("?")) config.url = `${config.url}&t=${timeStamp}`
				// else config.url = `${config.url}?t=${timeStamp}`

				// PUT,POST,DELETE 方式提交的数据格式化
				// if(['POST', "PUT", "DELETE"].includes(config.method) && config.headers["Content-Type"] !== "application/json") {
				//   config.data = qs.stringify(config.data);
				// }

				if (config.headers && typeof config.headers.set === 'function') {
					const token: string = store.getState().user.token;
					if (token) {
						config.headers.set('x-access-token', token);
						config.headers['Authorization'] = `Bearer ${token}`;
					}
				}
				// console.log('请求拦截', config);
				return config;
			},
			(error: AxiosError) => {
				console.log('请求错误拦截', error);
				return Promise.reject(error);
			}
		);

		/**
		 * @description response interceptor
		 *  The server returns the information -> [intercept unified processing] -> the client JS gets the information
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config, headers, status, statusText } = response;
				tryHideFullScreenLoading();
				// console.log('response', response)
				// ! 修改apifox中mock中code的值

				// login failure （401）
				if (+data.code === ResultEnum.OVERDUE) {
					console.log('code=401');
					store.dispatch(setToken(''));
					message.error(data.msg);
					window.$navigate(LOGIN_URL);
					return Promise.reject(data);
				}

				// 全局错误信息拦截（防止下载文件时数据流返回，直接报错，无需代码）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg || '状态码错误');
					return Promise.reject(data);
				}

				// 下载类型特殊处理文件名
				const type = response.request.responseType || '';
				if (type.includes('blob')) {
					let disposition = response.headers['content-disposition'];
					let filename = '默认文件名';
					if (disposition && disposition.indexOf('filename=') !== -1) {
						filename = decodeURI(disposition.substring(disposition.indexOf('filename=') + 9, disposition.length));
					}
					response.data.filename = filename;
				}

				// console.log('响应拦截：', response);
				// console.log("请求地址和结果：", response.config.url, response.data); // ! 响应结果
				return data; // 结果：{code: 200, data: Array(14), msg: '成功'}
			},
			async (error: AxiosError) => {
				console.log('响应错误拦截: ', error);
				const { response } = error;
				tryHideFullScreenLoading();
				// 分别判断请求超时 & 网络错误，无响应   ——    "timeout of 2000ms exceeded"
				if (error.message.indexOf('timeout') !== -1) {
					message.error('请求超时！请您稍后重试');
				}
				if (error.message.indexOf('Network Error') !== -1) {
					message.error('网络错误！请您稍后重试');
				}
				// 根据服务器响应的错误状态代码进行不同处理
				if (response) checkStatus(response.status);
				// 服务器不返回任何结果（可能是服务器出错或客户端断开了网络连接），断开连接处理：您可以跳转到断开连接页面
				if (!window.navigator.onLine) window.$navigate('/500');
				return Promise.reject(error);
			}
		);
	}

	/**
	 * @description Common request method encapsulation
	 */
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
	download(url: string, params?: object, _object = {}): Promise<BlobPart> {
		return this.service.post(url, params, { ..._object, responseType: 'blob' });
	}
}

export default new RequestHttp(config);
