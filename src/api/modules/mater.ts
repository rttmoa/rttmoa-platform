import { httpUpack as http } from '..';

type Params = { [key: string]: any };

// 原料库单据
export class hk_mater_doc__c_API {
	private static api = '/mater_doc/hk_mater_doc__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);

	static searchSapDocs = (params: Params) => http.post(`${this.api}/searchSapDocs`, params); // 
	static searchSapDocument = (params: Params) => http.post(`${this.api}/searchSapDocument`, params);
	static submitSapDocument = (params: Params) => http.post(`${this.api}/submitSapDocument`, params);
	static globalWarehouseInfo = () => http.post(`/api/global/global_warehouse_info`);
	static byOrderGetHTML = (params: Params) => http.post(`${this.api}/byOrderGetHTML`, params);
}

// 原料库单据历史
export class hk_mater_doc_his__c_API {
	private static api = '/mater_doc/hk_mater_doc_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库单据详情
export class hk_mater_doc_detail__c_API {
	private static api = '/mater_doc/hk_mater_doc_detail__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
	
	static transferSap = (url: string, params: Params) => http.post(url, params);
	static materLeiEntry = (params: Params) => http.post('/api/Btn_Common/mater_lei_entry', params);
	static getMaterLeiOutStock = (params: Params) => http.post('/api/Btn_Common/mater_lei_out_g', params);
	static materLeiOut = (params: Params) => http.post('/api/Btn_Common/mater_lei_out', params);
	static getMaterTieOutStock = (params: Params) => http.post('/api/Btn_Common/mater_tie_out_g', params);
	static materTieOut = (params: Params) => http.post('/api/Btn_Common/mater_tie_out', params);
	static meterTieEnter = (params: Params) => http.post('/api/Btn_Common/meter_tie_enter', params);

	static globalCostCenter = () => http.post(`/api/global/global_cost_center`);
	static globalWarehouseInfo = () => http.post(`/api/global/global_warehouse_info`);
	static globalMaterial = () => http.post(`/api/global/global_material`);
}

// 原料库单据详情历史
export class hk_mater_doc_detail_his__c_API {
	private static api = '/mater_doc/hk_mater_doc_detail_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库条码规则
export class hk_mater_barcode_rule__c_API {
	private static api = '/mater_doc/hk_mater_barcode_rule__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库移库任务
export class hk_mater_moves_task__c_API {
	private static api = '/mater_task/hk_mater_moves_task__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库任务
export class hk_mater_task__c_API {
	private static api = '/mater_task/hk_mater_task__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库任务历史
export class hk_mater_task_his__c_API {
	private static api = '/mater_task/hk_mater_task_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库发送WCS任务
export class hk_mater_wcs_task__c_API {
	private static api = '/mater_task/hk_mater_wcs_task__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库发送WCS任务历史
export class hk_mater_wcs_task_his__c_API {
	private static api = '/mater_task/hk_mater_wcs_task_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库PDA入库
export class hk_mater_pda_receipt__c_API {
	private static api = '/mater_task/hk_mater_pda_receipt__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库PDA入库历史
export class hk_mater_pda_receipt_his__c_API {
	private static api = '/mater_task/hk_mater_pda_receipt_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库PDA出库
export class hk_mater_pda_outgoing__c_API {
	private static api = '/mater_task/hk_mater_pda_outgoing__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库PDA出库历史
export class hk_mater_pda_outgoing_his__c_API {
	private static api = '/mater_task/hk_mater_pda_outgoing_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库接口记录
export class hk_mater_interface_record__c_API {
	private static api = '/mater_task/hk_mater_interface_record__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库库存
export class hk_mater_stock__c_API {
	private static api = '/mater_stock/hk_mater_stock__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库库存详情
export class hk_mater_stock_detail__c_API {
	private static api = '/mater_stock/hk_mater_stock_detail__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
	static roundup = (params: Params) => http.post(`/api/Wcs/Material_Roundup`, params);
}

// 原料库库存详情历史
export class hk_mater_stock_detail_his__c_API {
	private static api = '/mater_stock/hk_mater_stock_detail_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库库存条码详情
export class hk_mater_stock_detail_barcode__c_API {
	private static api = '/mater_stock/hk_mater_stock_detail_barcode__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库库存条码详情历史
export class hk_mater_stock_detail_barcode_his__c_API {
	private static api = '/mater_stock/hk_mater_stock_detail_barcode_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库库位分配
export class hk_mater_assign__c_API {
	private static api = '/mater_config/hk_mater_assign__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库库位分配-列
export class hk_mater_assign_col__c_API {
	private static api = '/mater_config/hk_mater_assign_col__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

// 原料库层分配规则
export class hk_mater_lay_distribution__c_API {
	private static api = '/mater_config/hk_mater_lay_distribution__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}
