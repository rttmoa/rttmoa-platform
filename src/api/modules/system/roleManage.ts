import http from '@/api'
import { PORT1 } from '@/api/config/servicePort'

// 用户管理 > 获取角色列表
export const roleList = () => {
	return http.get(PORT1 + `/role/list`)
}

// 用户管理 > 获取角色转换列表
export const roleTransferList = (id: number) => {
	return http.get(PORT1 + `/role/transfer/list`)
}
