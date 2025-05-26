import http from '@/api/upack'
import { PORT1 } from '@/api/config/servicePort'

// http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表 —— 仓库货架表（nb_shelf__c）
export const GetShelfStock = () => http.get(`/shelf/Warehouse_Report`)

// 获取用户表（_a_user）
export const GetProTableUser = (params: { [key: string]: any }) => http.get(`/userp/find_proTable_User`, params)
// 删除多个用户（_a_user）
export const DelMoreProTableUser = (ids: { [key: string]: any }) => http.post('/userp/del_more_User/123', { data: ids })

// 获取仓库货架表 （nb_shelf__c）
export const GetAllShelf = (params: { [key: string]: any }) => http.get(`/shelf/Warehouse_All_Shelf`, params)
