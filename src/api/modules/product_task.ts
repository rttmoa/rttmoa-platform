import { httpUpack as http } from '..';

type Params = { [key: string]: any };

// 成品库移库任务
export class hk_product_moves_task__c_API {
	private static api = '/product_task/hk_product_moves_task__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品出入库任务表
export class product_task_task_API {
	private static api = '/product_task/product_task';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品发送WCS任务表
export class hk_product_task_his__c_API {
	private static api = '/product_task/hk_product_task_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_task_send_wcs_API {
	private static api = '/product_task/product_task_send_wcs';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品PDA出库
export class hk_product_wcs_task_his__c_API {
	private static api = '/product_task/hk_product_wcs_task_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_pda_outgoing_API {
	private static api = '/product_task/product_pda_outgoing';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库SAP单据
export class hk_product_pda_outgoing_his__c_API {
	private static api = '/product_task/hk_product_pda_outgoing_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_doc_API {
	private static api = '/product_doc/product_doc';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);

	static searchSapDocs = (params: Params) => http.post(`${this.api}/searchSapDocs`, params);
	static searchSapDocument = (params: Params) => http.post(`${this.api}/searchSapDocument`, params);
	static submitSapDocument = (params: Params) => http.post(`${this.api}/submitSapDocument`, params);
	static globalWarehouseInfo = () => http.post(`/api/global/global_warehouse_info`);
	static byOrderGetHTML = (params: Params) => http.post(`${this.api}/byOrderGetHTML`, params);
}

// 成品库SAP单据详情
export class hk_product_doc_his__c_API {
	private static api = '/product_doc/hk_product_doc_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_doc_detail_API {
	private static api = '/product_doc/product_doc_detail';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
	static transferSap = (url: string, params: Params) => http.post(url, params);
	static globalCostCenter = () => http.post(`/api/global/global_cost_center`);
	static globalWarehouseInfo = () => http.post(`/api/global/global_warehouse_info`);
	static globalMaterial = () => http.post(`/api/global/global_material`);
}

// 成品初禹信息
export class hk_product_doc_detail_his__c_API {
	private static api = '/product_doc/hk_product_doc_detail_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_chuyu_API {
	private static api = '/product_doc/product_chuyu';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库 sap_wcs_pad接口记录
export class hk_product_chuyu_his__c_API {
	private static api = '/product_doc/hk_product_chuyu_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_interface_record_API {
	private static api = '/product_doc/product_interface_record';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷藏库存
export class product_chilled_stock_API {
	private static api = '/product_stock/product_chilled_stock';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷藏库存详情
export class product_chilled_stock_detail_API {
	private static api = '/product_stock/product_chilled_stock_detail';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
	static roundup = (params: Params) => http.post(`/api/Wcs/Product_Roundup_Chiled`, params);
}

// 成品库冷藏库存条码详情
export class hk_chilled_stock_detail_his__c_API {
	private static api = '/product_stock/hk_chilled_stock_detail_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_chilled_stock_detail_barcode_API {
	private static api = '/product_stock/product_chilled_stock_detail_barcode';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷冻库存
export class hk_chilled_stock_detail_barcode_his__c_API {
	private static api = '/product_stock/hk_chilled_stock_detail_barcode_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_freezing_stock_API {
	private static api = '/product_stock/product_freezing_stock';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷冻库存详情
export class product_freezing_stock_detail_API {
	private static api = '/product_stock/product_freezing_stock_detail';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
	static roundup = (params: Params) => http.post(`/api/Wcs/Product_Roundup_Freezing`, params);
}

// 成品库冷冻库存条码详情
export class hk_freezing_stock_detail_his__c_API {
	private static api = '/product_stock/hk_freezing_stock_detail_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_freezing_stock_detail_barcode_API {
	private static api = '/product_stock/product_freezing_stock_detail_barcode';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷藏库位分配
export class hk_freezing_stock_detail_barcode_his__c_API {
	private static api = '/product_stock/hk_freezing_stock_detail_barcode_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class product_chilled_assign_API {
	private static api = '/product_config/product_chilled_assign';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷藏库位分配-列
export class product_chilled_assign_col_API {
	private static api = '/product_config/product_chilled_assign_col';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷藏层分配规则
export class product_chilled_lay_distribution_API {
	private static api = '/product_config/product_chilled_lay_distribution';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷冻库位分配
export class product_freezing_assign_API {
	private static api = '/product_config/product_freezing_assign';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷冻库位分配-列
export class product_freezing_assign_col_API {
	private static api = '/product_config/product_freezing_assign_col';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 成品库冷冻层分配规则
export class product_freezing_lay_distribution_API {
	private static api = '/product_config/product_freezing_lay_distribution';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}
