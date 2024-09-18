import http from '@/api'
import { PORT3 } from '@/api/config/servicePort'

/**
 * 获取列表
 * @param {*} page
 */
export function listApi(page = 1) {
	return http.get(`${PORT3}/products`, { page, per: 5 })
}

/**
 * 创建数据
 * @param {*} data
 */
export function createApi(data: any) {
	return http.post(`${PORT3}/products`, data)
}

/**
 * 根据id获取获取数据
 * @param {*} id
 */
export function getOneById(id: number) {
	return http.get(`${PORT3}/products/${id}`)
}

/**
 * 修改记录
 * @param {*} id
 * @param {*} data
 */
export function modifyOne(id: number, data: any) {
	return http.put(`${PORT3}/products/${id}`, data)
}

/**
 * 删除记录
 * @param {*} id
 * @param {*} data
 */
export function delOne(id: number, data: any) {
	return http.delete(`${PORT3}/products/${id}`)
}
