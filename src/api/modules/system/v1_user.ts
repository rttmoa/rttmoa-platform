import { ReqPage, ResPage, UserList } from '@/api/interface/index'
import { PORT1 } from '@/api/config/servicePort'
import http from '@/api'

/**
 * @description Get user list
 * @name UserModule
 */
export const getUserList = (params: ReqPage) => {
	return http.post<ResPage<UserList>>(PORT1 + `/user/list`, params) // ts：参数及返回结果
}
