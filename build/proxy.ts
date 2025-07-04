import type { ProxyOptions } from 'vite';

type ProxyItem = [string, string];

type ProxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

/**
 * 创建代理用于解析 .env.development 代理配置
 * @param list
 */
export function createProxy(list: ProxyList = []) {
	const ret: ProxyTargetList = {};
	for (const [prefix, target] of list) {
		const httpsRE = /^https:\/\//;
		const isHttps = httpsRE.test(target);

		// https://github.com/http-party/node-http-proxy#options
		ret[prefix] = {
			target: target,
			changeOrigin: true,
			ws: true,
			rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
			// https is require secure=false
			...(isHttps ? { secure: false } : {}),
		};
	}
	// console.log('ret_createProxy', ret)
	return ret;
	// proxy: {
	// 	'/api': {
	// 		target: 'https://mock.apifox.com/m1/3219319-0-default/',
	// 		changeOrigin: true,
	// 		ws: true,
	// 		rewrite: [Function: rewrite],
	// 		secure: false
	// 	},
	// 	'/faker': {
	// 		target: 'http://localhost:4000',
	// 		pathRewrite: { '^/faker': '' },
	// 		secure: false,
	// 		changeOrigin: true,
	// 		cookieDomainRewrite: 'localhost',
	// 	},
	// 	'/v2': {
	// 		target: 'https://www.mocky.io',
	// 		secure: false,
	// 		changeOrigin: true,
	// 	},
	// },
}
