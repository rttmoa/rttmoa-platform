import { httpUpack } from '..';

type Params = { [key: string]: any };

// * httpUpack://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表
// export const GetShelfStock = (params: any) => httpUpack.get(`/shelf/stock`, params);

// export const GetAllShelf = (params: Params) => httpUpack.get(`/shelf/stocks`, params);

export class moduleAPI {
	private static AUTH_API_PREFIX = '/auth';

	static PEFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`;

	// 宁波 库位库存可视化
	static getStock(params: Params) {
		return httpUpack.get(`/shelf/storages`, params);
	}

	// 宁波 库位库存可视化
	static getShelf(params: Params) {
		return httpUpack.get(`/shelf/shelfs`, params);
	}

	// 克东 保温库450个货位
	static getShelf_kd(params: Params) {
		return httpUpack.get(`/storage_kd/shelfs`, params);
	}
}
