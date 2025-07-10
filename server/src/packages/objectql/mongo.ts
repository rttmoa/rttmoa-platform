import { Driver, DriverConfig, QueryOptions } from "./driver";
import { MongoClient, ObjectId } from "mongodb";
import _ from "underscore";
// const Future = require('fibers/future');

//* Mong 必须要实现的 属性
class Mong implements Driver {
  databaseVersion?: string | undefined;
  config?: DriverConfig | undefined;
  connect() {
    throw new Error("Method not implemented.");
  }
  close() {
    throw new Error("Method not implemented.");
  }
  find(tableName: string, query: QueryOptions, userId?: number | string) {
    throw new Error("Method not implemented.");
  }
}
class implementMongo implements Driver {
	// 类型“implementMongo”缺少类型“Driver”中的以下属性: connect, close, find
}
export class MongoDriver implements Driver {
	_url: string;
	_client: any;
	_config: DriverConfig; 
	_collections: any; // Dirctionary<any>
	_encryption: any;

	constructor(config: DriverConfig) {
		this._collections = {};
		this._config = config;
		this._url = this.buildConnectionUrl(); // 获取连接mongodb的url
	}

	protected buildConnectionUrl(): string { // url  ||   username&password  ||  database
		if (this._config.url) {
			return this._config.url;
		}
		const credentialsUrlPart = this._config.username && this._config.password ? `${this._config.username}:${this._config.password}@` : "";
		if (!this._config.database) {
			throw new Error("No find database");
		}
		return `mongodb://${credentialsUrlPart}${this._config.host || "127.0.0.1"}:${this._config.port || "27017"}/${this._config.database}`;
	}

	async connect() {
		if (!this._client) {
			if (process.env.STEEDOS_CSFLE_MASTER_KEY) {
        this._client = await MongoClient.connect(this._url, { monitorCommands: true });
			} else {
				this._client = await MongoClient.connect(this._url, { monitorCommands: true });
			}
		}
		return true;
	}
	async close() {
		if (this._client) {
			await this._client.close();
			this._client = null;
			return true;
		}
		this._client = null;
	}

	async insert(tableName: string, data: any) {
		await this.connect();
		data._id = data._id || new ObjectId().toHexString();
		let collection = this.collection(tableName);
		let result = await collection.insertOne(data);
		return result;
		// console.log(result); // { acknowledged: true, insertedId: '654f5ca075cdd9d230974578' }
		// return result.ops[0];
	}

	wrapAsync(fn: { call: (arg0: any) => any }, context: any) {
		let proxyFn = async function (_cb: (arg0: any, arg1: any) => void) {
			let value = null;
			let error = null;
			try {
				value = await fn.call(context);
			} catch (err) {
				error = err;
			}
			_cb(error, value);
		};
		// let fut = new Future();
		// let callback = fut.resolver();
		// let result = proxyFn.apply(this, [callback]);
		// return fut ? fut.wait() : result;
	}
	collection(name: string) {
		if (!this._collections[name]) {
			let db = this._client.db();
			let locale = this._config.locale;
			if (locale) {
				this.wrapAsync(function () {
					return db.createCollection(name, {
						collation: { locale: locale },
					});
				}, {});
			}
			this._collections[name] = db.collection(name);
		}
		return this._collections[name];
	}

	async find(tableName: string, query: QueryOptions, userId?: string | number) {
		await this.connect();
		let collection = this.collection(tableName);
		let mongoFilters = this.getMongoFilters(query.filters);
		let mongoOptions = this.getMongoOptions(query);
		let result = await collection.find(mongoFilters, mongoOptions).toArray();
		return result;
	}
	getMongoFilters(filters: any): any {
		let emptyFilters = {};
		if (_.isUndefined(filters)) {
			return emptyFilters;
		}
		if (_.isString(filters) && !filters.length) {
			return emptyFilters;
		}
		if (_.isArray(filters) && !filters.length) {
			return emptyFilters;
		}
		let mongoFilters: any = this.formatFiltersToMongoQuery(filters);
		return mongoFilters;
	}
	formatFiltersToMongoQuery(filters: any): any {}

	getMongoFieldsOptions(fields: string[] | string): any {
		if (typeof fields == "string") {
			fields = (<string>fields).split(",").map(n => {
				return n.trim();
			});
		}
		if (!(fields && fields.length)) {
			// throw new Error("fields must not be undefined or empty");
			return {};
		}
		let projection: any = {};
		(<string[]>fields).forEach(field => {
			if (field) {
				projection[field] = 1;
			}
		});
		return projection;
	}

	getMongoSortOptions(sort: string): any {
		let result: any = undefined;
		// if (sort && typeof sort === "string") {
		//   let arraySort: string[] = sort.split(",").map((n) => { return n.trim(); });
		//   let stringSort: string = "";
		//   arraySort.forEach((n) => {
		//     if (n) {
		//       stringSort += `${n},`
		//     }
		//   });
		//   stringSort = stringSort.replace(/,$/g, "");
		//   result = createQuery(`$orderby=${stringSort}`).sort;
		// }
		return result;
	}

	getMongoOptions(options: QueryOptions): any {
		if (_.isUndefined(options)) {
			return {};
		}
		let result: any = {};
		let projection: any = this.getMongoFieldsOptions(options.fields);
		let sort: any = this.getMongoSortOptions(options.sort);
		result.projection = projection;
		result.sort = sort;
		result.limit = options.top;
		result.skip = options.skip;
		return result;
	}
}

