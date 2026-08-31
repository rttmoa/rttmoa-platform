import { httpUpack as http } from '..';

type Params = { [key: string]: any };

export class hk_pack_doc__c_API {
	private static api = '/pack/hk_pack_doc__c';

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

export class hk_pack_doc_detail__c_API {
	private static api = '/pack/hk_pack_doc_detail__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
	static packEntry = (params: Params) => http.post('/api/Btn_Common/pack_entry', params);
	static packMove = (params: Params) => http.post('/api/Btn_Common/pack_move', params);
	static getPackOutStock = (params: Params) => http.post('/api/Btn_Common/pack_out_g', params);
	static packOut = (params: Params) => http.post('/api/Btn_Common/pack_out', params);
	static transferSap = (url: string, params: Params) => http.post(url, params);
}

export class hk_pack_doc_detail_his__c_API {
	private static api = '/pack/hk_pack_doc_detail_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_doc_his__c_API {
	private static api = '/pack/hk_pack_doc_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_interface_record__c_API {
	private static api = '/pack/hk_pack_interface_record__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_pda_entry__c_API {
	private static api = '/pack/hk_pack_pda_entry__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_pda_entry_his__c_API {
	private static api = '/pack/hk_pack_pda_entry_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_pda_out__c_API {
	private static api = '/pack/hk_pack_pda_out__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_pda_out_his__c_API {
	private static api = '/pack/hk_pack_pda_out_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_stock_detail__c_API {
	private static api = '/pack/hk_pack_stock_detail__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class hk_pack_stock_detail_his__c_API {
	private static api = '/pack/hk_pack_stock_detail_his__c';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}
