import http from '@/api/upack'
import { PORT1 } from '@/api/config/servicePort'

// 功能模块 > 库位库存报表 —— 获取仓库货架表 nb_shelf__c 所有库位数据
// http://localhost:9527/upack/shelf/Warehouse_Report
export const GetShelfStock = () => {
	return http.get(`/shelf/Warehouse_Report`)
}
