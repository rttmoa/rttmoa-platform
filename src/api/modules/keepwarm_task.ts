import { httpUpack as http } from '..';

type Params = { [key: string]: any };

export class keepwarm_task_move_API {
	private static api = '/keepwarm/task/moveTask';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_task_sc_record_API {
	private static api = '/keepwarm/task/scRecord';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_task_sc_task_API {
	private static api = '/keepwarm/task/scTask';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_task_task_API {
	private static api = '/keepwarm/task/task';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_task_task_his_API {
	private static api = '/keepwarm/task/taskHis';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}

export class keepwarm_task_sc_task_his_API {
	private static api = '/keepwarm/task/scTaskHis';

	static find = (params: Params) => http.post(`${this.api}/query`, params);
	static add = (params: Params) => http.post(`${this.api}/add`, params);
	static mod = (id: string, params: Params) => http.put(`${this.api}/mod/${id}`, params);
	static del = (id: string) => http.delete(`${this.api}/del/${id}`);
	static delMore = (data: string[]) => http.post(`${this.api}/delMore`, data);
	static importEx = (params: Params) => http.post(`${this.api}/importEx`, params);
}
