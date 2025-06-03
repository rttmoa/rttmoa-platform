import http from '@/api/upack'
import { PORT1 } from '@/api/config/servicePort'

// http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表 —— 仓库货架表（nb_shelf__c）
export const GetShelfStock = () => http.get(`/shelf/Warehouse_Report`)

type ParamsType = { [key: string]: any }

// 获取用户表（_a_user）
export const GetProTableUser = (params: ParamsType) => http.get(`/userp/find_proTable_User`, params)
// 删除多个用户（_a_user）
export const DelMoreProTableUser = (ids: ParamsType) => http.post('/userp/del_more_User/123', { data: ids })

// 获取仓库货架表 （nb_shelf__c）
export const GetAllShelf = (params: ParamsType) => http.get(`/shelf/Warehouse_All_Shelf`, params)

// 系统管理 — 菜单管理 — 新增菜单
export const InsNewMenu = (params: ParamsType) => http.post(`/menu/ins_Menu`, params)

// 系统管理 — 菜单管理 — 获取菜单
export const FindAllMenu = (params: ParamsType) => http.get(`/menu/find_Menu`, params)

// 系统管理 — 菜单管理 — 更新菜单
export const UpMenu = (params: ParamsType) => http.post(`/menu/up_Menu`, params)

// 系统管理 — 菜单管理 — 删除菜单
export const DelMenu = (params: ParamsType) => http.post(`/menu/del_Menu`, params)
