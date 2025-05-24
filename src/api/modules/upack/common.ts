import http from '@/api/upack'
import { PORT1 } from '@/api/config/servicePort'

// 功能模块 > 库位库存报表 —— 获取仓库货架表 nb_shelf__c 所有库位数据
// http://localhost:9527/upack/shelf/Warehouse_Report
export const GetShelfStock = () => http.get(`/shelf/Warehouse_Report`)

// 获取_a_user表 —— 用户数据
export const GetProTableUser = (params: any) => http.get(`/userp/find_proTable_User`, params)
