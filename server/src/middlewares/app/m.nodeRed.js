const { MongoClient, ObjectId } = global.get("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "steedos_nbzy_v2";
const baseInfo = {
	space: "678dc12f269bfe707033b331",
	created_by: "678dc12d269bfe707033b32f",
	owner: "678dc12d269bfe707033b32f",
};

// & ts 变 js、  删除ts类型注释、

// 参考：
// import { mongoService } from './mongoService';
// const userList = await mongoService.find("users", {
//   query: { name: 'zhaosi', age: { $gt: 18 } },
//   sort: { age: -1 },
//   page: 1,
//   pageSize: 10,
// });
// await find("tableName", {})
// await find("tableName", {query: {pallet__c: "042...."}})
// await find("tableName", {query: {pallet__c: "042...."}, sort: {time__c: -1}})
// await find("tableName", {query: {pallet__c: "042...."}, sort: {time__c: -1}, page: 5, pageSize: 50})   page和pageSize一起传
// const newId = await mongoService.insert("users", { name: "Tom", age: 22 });
// const updated = await mongoService.update("users", "xxx_id_xxx", { name: "Updated Name" });
// const deleted = await mongoService.delete("users", "xxx_id_xxx");

function is(val, type) {
	return Object.prototype.toString.call(val) === `[object ${type}]`;
}
// 集合方法： https://docs.mongoing.com/can-kao/mongo-shell-methods/collection-methods
// 查询运算符：https://docs.mongoing.com/can-kao/yun-suan-fu/query-and-projection-operators
// 查询文档：https://docs.mongoing.com/mongodb-crud-operations/query-documents
// * 将此函数绑定到 ctx 上、这样直接用ctx调用就可以了、就不用每个模块都导入使用了
class MongoService {
	client;

	constructor() {
		this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
		this.setupListeners(); // 绑定连接事件监听
	}
	setupListeners() {
		this.client.on("open", () => {
			node.warn("✅ MongoDB 连接成功");
		});

		this.client.on("close", () => {
			node.warn("⚠️ MongoDB 连接关闭");
		});

		this.client.on("error", err => {
			node.warn("❌ MongoDB 连接出错");
			console.log("❌ MongoDB 连接出错：", err);
		});
	}
	async connect() {
		if (!this.client.topology || !this.client.topology.isConnected()) {
			await this.client.connect();
			node.warn("🔌 正在连接 MongoDB...");
		}
		return this.client.db(dbName);
	}
	async close() {
		await this.client.close();
		node.warn("🛑 MongoDB 连接已关闭");
	}

	// & count
	async count(table) {
		const db = await this.connect();
		const collection = db.collection(table);
		return await collection.countDocuments();
	}
	// & find
	async find(table, options) {
		if (!(options != null && is(options, "Object"))) return { success: false, message: "查询参数不是对象" };
		const db = await this.connect();
		const collection = db.collection(table);
		const { query = {}, page, pageSize, sort } = options;
		//! query对象： =、!=、>、 <、 in、or、and、等
		let cursor = collection.find(query);
		if (sort) cursor = cursor.sort(sort);
		if (page && pageSize) {
			cursor = cursor.skip((page - 1) * pageSize).limit(pageSize);
		}
		return await cursor.toArray();
	}

	// & insertOne
	async insertOne(table, data) {
		if (!(data != null && is(data, "Object"))) return { success: false, message: "新增参数不是对象" };
		const db = await this.connect();
		const collection = db.collection(table);
		data._id = new ObjectId().toString();
		const doc = { ...data, ...baseInfo, created: data.created || new Date() };
		const result = await collection.insertOne(doc);
		return result.insertedId;
	}

	// & insertMany
	async insertMany(table, data) {
		if (!(data && Array.isArray(data))) return { success: false, message: "传递的参数不是数组" };
		const db = await this.connect();
		const collection = db.collection(table);
		data.forEach(element => {
			// delete element.time
			Object.assign(element, { _id: new ObjectId().toString(), ...baseInfo, created: new Date() });
		});
		const result = await collection.insertMany(data);
		return result;
	}

	// & updateOne
	async updateOne(table, id, updateData) {
		if (!is(id, "String")) return { success: false, message: "iD错误" };
		if (!(updateData != null && is(updateData, "Object"))) return { success: false, message: "更新参数不是对象" };
		const db = await this.connect();
		const collection = db.collection(table);
		const result = await collection.updateOne({ _id: id }, { $set: updateData, $currentDate: { lastModified: true } });
		return result.modifiedCount === 1;
	}

	// & updateMany
	async updateMany(table, updateFilter, updateData) {
		if (!(updateFilter != null && is(updateFilter, "Object"))) return { success: false, message: "过滤参数不是对象" };
		if (!(updateData != null && is(updateData, "Object"))) return { success: false, message: "更新字段不是对象" };
		const db = await this.connect();
		const collection = db.collection(table);
		// 例子：更新数量小于50的所有文档: { "qty": { $lt: 50 } },{ $currentDate: { lastModified: true } $set: { "size.uom": "in", status: "P" }}
		const result = await collection.updateOne({ ...updateFilter }, { $set: updateData, $currentDate: { lastModified: true } });
		return result;
	}

	// & deleteOne
	async deleteOne(table, id) {
		if (!is(id, "String")) return { success: false, message: "参数不是 字符串" };
		const db = await this.connect();
		const collection = db.collection(table);
		const result = await collection.deleteOne({ _id: id });
		return result.deletedCount === 1;
	}

	// & deleteMany
	async deleteMany(table, delFilter) {
		if (!(delFilter != null && is(delFilter, "Object"))) return { success: false, message: "参数不是对象" };
		const db = await this.connect();
		const collection = db.collection(table);
		// db.collection.deleteMany({})  —— 删除所有文档
		const result = await collection.deleteMany({ ...delFilter });
		return result;
	}

	async findOne() {}
	async findOneAndUpdate() {}
	async findOneAndDelete() {}

	async save() {}
	async insert() {}

	async update() {}

	async createIndex() {}
	async createIndexes() {}
	async drop() {}
	async dropIndex() {}
	async dropIndexes() {}
}

// const mongoService = new MongoService(); 
// global.set("mongo", {
// 	find: mongoService.find,
// 	ins: mongoService.insertOne,
// 	up: mongoService.updateOne,
// 	del: mongoService.deleteOne,
// });
