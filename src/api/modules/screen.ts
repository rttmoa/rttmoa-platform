import { httpUpack as http } from '..';

type Params = { [key: string]: any };

export class screen_API {
	private static api = '/screen/display';

	// 数据大屏 - 保温库出入库总任务
	static find = (params: Params) => http.post(`${this.api}/query`, params);

	// 保温库入库大屏显示 - 1005
	// await screen_API.find_keepwarm_enter({ location: '1008' })
	static find_keepwarm_enter = (params: Params) => http.post(`${this.api}/query/keepwarm/enter`, params);

	// 保温库出库大屏显示 - 1015
	// await screen_API.find_keepwarm_out({})
	static find_keepwarm_out = (params: Params) => http.post(`${this.api}/query/keepwarm/out`, params);

	static find_cwwarm_enter = (params: Params) => http.post(`${this.api}/query/cwwarm/enter`, params);

	static find_cwwarm_out = (params: Params) => http.post(`${this.api}/query/cwwarm/out`, params);
}
