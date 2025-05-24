import http from '@/api/upack'
import { PORT1 } from '@/api/config/servicePort'

// http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表 —— 仓库货架表（nb_shelf__c）
export const GetShelfStock = () => http.get(`/shelf/Warehouse_Report`)

// 获取用户表（_a_user） —— 用户数据
export const GetProTableUser = (params: any) => http.get(`/userp/find_proTable_User`, params)

// 获取仓库货架表 （nb_shelf__c）
export const GetAllShelf = (params: any) => http.get(`/shelf/Warehouse_All_Shelf`, params)
