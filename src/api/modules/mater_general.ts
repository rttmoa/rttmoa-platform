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
}

// mater_c_lei
export class hk_mater_lei_pda_entry__c_API extends CrudApi {
	protected static api = '/mater_c_lei/hk_mater_lei_pda_entry__c';
}

export class hk_mater_lei_stock_d__c_API extends CrudApi {
	protected static api = '/mater_c_lei/hk_mater_lei_stock_d__c';
}

export class hk_mater_lei_pda_out__c_API extends CrudApi {
	protected static api = '/mater_c_lei/hk_mater_lei_pda_out__c';
}

export class hk_mater_lei_pda_entry_his__c_API extends CrudApi {
	protected static api = '/mater_c_lei/hk_mater_lei_pda_entry_his__c';
}

export class hk_mater_lei_stock_d_his__c_API extends CrudApi {
	protected static api = '/mater_c_lei/hk_mater_lei_stock_d_his__c';
}

export class hk_mater_lei_pda_out_his__c_API extends CrudApi {
	protected static api = '/mater_c_lei/hk_mater_lei_pda_out_his__c';
}

// mater_c_tie
export class hk_mater_tie_pda_entry__c_API extends CrudApi {
	protected static api = '/mater_c_tie/hk_mater_tie_pda_entry__c';
}

export class hk_mater_tie_stock_d__c_API extends CrudApi {
	protected static api = '/mater_c_tie/hk_mater_tie_stock_d__c';
}

export class hk_mater_tie_pda_out__c_API extends CrudApi {
	protected static api = '/mater_c_tie/hk_mater_tie_pda_out__c';
}

export class hk_mater_tie_pda_entry_his__c_API extends CrudApi {
	protected static api = '/mater_c_tie/hk_mater_tie_pda_entry_his__c';
}

export class hk_mater_tie_stock_d_his__c_API extends CrudApi {
	protected static api = '/mater_c_tie/hk_mater_tie_stock_d_his__c';
}

export class hk_mater_tie_pda_out_his__c_API extends CrudApi {
	protected static api = '/mater_c_tie/hk_mater_tie_pda_out_his__c';
}

// mater_c_two
export class hk_mater_two_pda_entry__c_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_pda_entry__c';
}

export class hk_mater_two_stock_d__c_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_stock_d__c';
}

export class hk_mater_two_pda_out__c_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_pda_out__c';
}

export class hk_mater_two_pda_entry_his__c_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_pda_entry_his__c';
}

export class hk_mater_two_stock_d_his__c_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_stock_d_his__c';
}

export class hk_mater_two_pda_out_his__c_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_pda_out_his__c';
}

export class hk_mater_two_stock_d_barcode_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_stock_d_barcode';
}

export class hk_mater_two_stock_d_barcode_his_API extends CrudApi {
	protected static api = '/mater_c_two/hk_mater_two_stock_d_barcode_his';
}
