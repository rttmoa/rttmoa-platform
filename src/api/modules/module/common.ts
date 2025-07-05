import http from '@/api/upack';
type Params = { [key: string]: any };

// * http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表 —— 仓库货架表（nb_shelf__c）
export const GetShelfStock = () => http.get(`/shelf/Warehouse_Report`);
// 功能模块 — 库位库存报表 — 获取仓库货架表
export const GetAllShelf = (params: Params) => http.get(`/shelf/Warehouse_All_Shelf`, params);
