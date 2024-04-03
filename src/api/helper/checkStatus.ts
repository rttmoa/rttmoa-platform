import { message } from '@/hooks/useMessage'

/**
 * @description: ### Verify network request status code
 * @param {Number} status
 * @return void
 */

// todo 检测 error.response.status
// todo status：100-199 表示服务器成功接收部分请求，需要客户端继续提交其余请求才能完成整个处理过程
// todo status：200-299 表示服务器已经成功接收请求，并完成整个处理过程
// todo status：300-399 表示为完成请求，需要客户端进一步细化请求
// todo status：400-499 表示客户端请求有误
// todo status：500-599 表示服务端出现错误

// @ 维基百科 Http状态码：https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81
export const checkStatus = (status: number) => {
	switch (status) {
		case 400:
			// error.message = "请求错误(400)"
			message.error('请求失败！请您稍后重试')
			break
		case 401:
			message.error('登录信息已过期，请重新登录') // 未授权，跳转到登录页
			break
		case 403:
			message.error('当前账号无权限访问！') // 服务器拒绝访问，权限不足
			break
		case 404:
			message.error('你所访问的资源不存在，请求超时！') // 请求接口不存在
			break
		case 405:
			message.error('请求方式错误！请您稍后重试')
			break
		case 408:
			message.error('请求超时！请您稍后重试')
			break
		case 500:
			message.error('服务器错误(500)') // 服务器错误，可以重试
			break
		case 501:
			message.error('服务未实现(501)')
			break
		case 502:
			message.error('网关错误(502)')
			break
		case 503:
			message.error('服务不可用(503)')
			break
		case 504:
			message.error('网关超时(504)')
			break
		case 505:
			message.error('HTTP版本不受支持(505)')
			break
		default:
			message.error('请求失败！')
	}
}
