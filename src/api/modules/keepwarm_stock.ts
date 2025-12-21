import { httpUpack as http } from '..';

type Params = { [key: string]: any };

export class keepwarm_stock_API {
	private static api = '/keepwarm/stock';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_stock_record_API {
	private static api = '/keepwarm/stockRecord';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_stock_detail_API {
	private static api = '/keepwarm/stockDetail';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_stock_detail_his_API {
	private static api = '/keepwarm/stockDetailHis';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}
