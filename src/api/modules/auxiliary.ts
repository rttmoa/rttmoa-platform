import { httpUpack as http } from '..';

type Params = { [key: string]: any };

class CrudApi {
	protected static api: string;

	static get find() {
		const api = this.api;
		return (params: Params) => http.post(`${api}/query`, params);
	}

	static get add() {
		const api = this.api;
		return (params: Params) => http.post(`${api}/add`, params);
	}

	static get mod() {
		const api = this.api;
		return (id: string, params: Params) => http.put(`${api}/mod/${id}`, params);
	}

	static get del() {
		const api = this.api;
		return (id: string) => http.delete(`${api}/del/${id}`);
	}

	static get delMore() {
		const api = this.api;
		return (data: string[]) => http.post(`${api}/delMore`, data);
	}

	static get importEx() {
		const api = this.api;
		return (params: Params) => http.post(`${api}/importEx`, params);
	}

	static get searchSapDocs() {
		const api = this.api;
		return (params: Params) => http.post(`${api}/searchSapDocs`, params);
	}
	static get searchSapDocument() {
		const api = this.api;
		return (params: Params) => http.post(`${api}/searchSapDocument`, params);
	}
	static get submitSapDocument() {
		const api = this.api;
		return (params: Params) => http.post(`${api}/submitSapDocument`, params);
	}
	static get globalWarehouseInfo() {
		const api = this.api;
		return (params: Params) => http.post(`/api/global/global_warehouse_info`, params);
	}
	static get byOrderGetHTML() {
		const api = this.api;
		return (params: Params) => http.post(`${api}/byOrderGetHTML`, params);
	}

	// static searchSapDocs = (params: Params) => http.post(`${this.api}/searchSapDocs`, params);
	// static searchSapDocument = (params: Params) => http.post(`${this.api}/searchSapDocument`, params);
	// static submitSapDocument = (params: Params) => http.post(`${this.api}/submitSapDocument`, params);
	// static globalWarehouseInfo = () => http.post(`/api/global/global_warehouse_info`);
	// static byOrderGetHTML = (params: Params) => http.post(`${this.api}/byOrderGetHTML`, params);
}

export class hk_auxiliary_stock__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_stock__c';
}

export class hk_auxiliary_stock_detail__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_stock_detail__c';
}

export class hk_auxiliary_doc__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_doc__c';
}

export class hk_auxiliary_doc_detail__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_doc_detail__c';
	static auxiliaryOut = (params: Params) => http.post('/api/Btn_Common/auxiliary_out', params);
	static transferSap = (url: string, params: Params) => http.post(url, params);
}

export class hk_auxiliary_interface_record__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_interface_record__c';
}

export class hk_auxiliary_doc_his__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_doc_his__c';
}

export class hk_auxiliary_doc_detail_his__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_doc_detail_his__c';
}

export class hk_auxiliary_stock_detail_his__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_stock_detail_his__c';
}

export class hk_auxiliary_pda_entry__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_pda_entry__c';
}

export class hk_auxiliary_pda_out__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_pda_out__c';
}

export class hk_auxiliary_pda_entry_his__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_pda_entry_his__c';
}

export class hk_auxiliary_pda_out_his__c_API extends CrudApi {
	protected static api = '/auxiliary/hk_auxiliary_pda_out_his__c';
}
