import http from '@/api'
import { PORT1 } from '@/api/config/servicePort'

// 功能模块 > 获取商品列表
export const productList = (page: number, pageSize: number, searchName?: string, searchType?: any) => {
	if (!searchName) {
		return http.get(PORT1 + `/product/list`, { page, pageSize })
	} else {
		return http.get(PORT1 + `/product/list/search`, {
			page,
			pageSize,
			[searchType]: searchName,
		})
	}
}
