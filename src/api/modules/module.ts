import { httpUpack } from '..';

type Params = { [key: string]: any };

// * httpUpack://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

export class moduleAPI {
	private static AUTH_API_PREFIX = '/auth';

	static PEFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`;

	// 宁波 库位库存可视化(1880个)
	static getStock(params: Params) {
		return httpUpack.get(`/shelf/storages`, params);
	}

	// 宁波 库位库存可视化(1880个)
	static getShelf(params: Params) {
		return httpUpack.get(`/shelf/shelfs`, params);
	}

	// 克东 保温库库存可视化(450个)
	static getShelf_kd(params: Params) {
		return httpUpack.get(`/storage_kd/shelfs`, params);
	}
}
