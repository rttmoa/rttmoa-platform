// const { MongoClient, ObjectId } = require("mongodb");
// const spaceId = "678dc12f269bfe707033b331";
// const userId = "678dc12d269bfe707033b32f";
// const baseInfo = { space: spaceId, created_by: userId, owner: userId }

// let client = new MongoClient("mongodb://127.0.0.1:27017", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// let dbName = "steedos_nbzy";
// // 菜鸟教程 https://www.runoob.com/mongodb/mongodb-query.html
// // 每次查询都 connect()，会导致连接泄漏（连接池不复用）。


// ! 文件已更新
 


// //----------------->>>>>>>>  查询
// // await findDocs("tableName") —— 错误
// // await findDocs("tableName", {}) —— 查全部
// // await findDocs("tableName", { query: { pallet__c: "042120123" } }) // 查
// // await findDocs("tableName", { query: {}, sort: { time: -1 } })
// // await findDocs("tableName", { query: {}, page: 1, pageSize: 100 })
// // await findDocs("tableName", { query: {}, page: 1, pageSize: 100, sort: { time: -1 } })
// async function findDocs(tableName: any, data: { query?: any; page?: any; pageSize?: any; sort?: any; }) {
//   //* 查询语句
//   let findObj = {
//     query: {}, // 查询条件
//     page: 2, // 第几页
//     pageSize: 100, // 取多少条数据
//     sort: {}, // 排序，按哪些字段升序或者降序，{ age: -1 }，按 age 降序
//     projection: {}, // 投影，只返回哪些字段
//   };
//   try {
//     const isObj = typeof data === "object" && data !== null;
//     if (!isObj) throw new Error("查询条件不是对象 {}");

//     if (!client.topology || !client.topology.isConnected()) {
//       await client.connect(); // 确保连接只建立一次
//     }

//     const db = client.db(dbName);
//     const collections = db.collection(tableName);
//     // const result = await collections.find(data).toArray();

//     const isNullObj = Object.keys(data).length === 0;
//     if (isNullObj) {
//       return await collections.find({}).toArray();
//     }

//     // const page = 3;
//     // const pageSize = 10;
//     // const query = { age: { $gt: 18 } };
//     // const result = await collections.find(query, { projection: { name: 1, age: 1, _id: 0 } })  // 只返回 name 和 age
//     //     .sort({ age: -1 })  // 按 age 降序
//     //     .skip((page - 1) * pageSize)  // 跳过前 (3-1) * 10 = 20 条
//     //     .limit(pageSize)  // 取 10 条
//     //     .toArray();

//     let findData = null;
//     const { query, page, pageSize, sort } = data;

//     if (query && page && pageSize && sort) {
//       findData = await collections
//         .find(query)
//         .sort({ ...sort })
//         .skip((page - 1) * pageSize)
//         .limit(pageSize)
//         .toArray();
//     } else if (query && page && pageSize) {
//       findData = await collections
//         .find(query)
//         .skip((page - 1) * pageSize)
//         .limit(pageSize)
//         .toArray();
//     } else if (query && sort) {
//       findData = await collections
//         .find(query)
//         .sort({ ...sort })
//         .toArray();
//     } else if (query) {
//       findData = await collections.find(query).toArray();
//     } else {
//       findData = await collections.find({}).toArray();
//     }
//     return findData;
//   } catch (error) {
//     // 写入到本地文件中 并 报错
//     console.error("❌ 查询失败:", error);
//     return false;
//   }
// }

// //----------------->>>>>>>>  增加
// // await ins("t1__c", { userName: "zhangsan" })
// async function insDocs(tableName: any, data: { _id?: any; created?: any; }) {
//   try {
//     const isObj = typeof data === "object" && data !== null;
//     if (!isObj) return "传递参数、不为对象、错误！";
//     const isNullObj = Object.keys(data).length > 0;
//     if (!isNullObj) return "传递的参数、对象为空";
//     if (!client.topology || !client.topology.isConnected()) {
//       await client.connect(); // 确保连接只建立一次
//     }
//     let db = await client.db(dbName);
//     let collections = await db.collection(tableName);

//     data._id = new ObjectId().toString(); // 不管写入的数据是否有_id，都会覆盖掉原来的_id
//     let insDoc = {};
//     if (!data.created) insDoc = { ...data, created: new Date(), ...baseInfo };
//     else insDoc = { ...data, ...baseInfo };

//     let result = await collections.insertOne(insDoc);
//     if (result.insertedId) return result.insertedId;
//     else {
//       console.error(`❌ 增加失败`);
//       return false;
//     }
//   } catch (error) {
//     // 写入到本地文件中 并 报错
//     console.error("❌ 新增失败:", error);
//     return false;
//   }
// }

// //----------------->>>>>>>>  修改
// // await up("t1__c", "67bc12e4ed0c0153c316889f", { name: "zhangsan" })
// async function upDocs(tableName: any, id: any, data: {}) {
//   try {
//     const isStr = typeof id === "string";
//     if (!isStr) return "iD 错误！";
//     const isObj = typeof data === "object" && data !== null && Object.keys(data).length > 0;
//     if (!isObj) return "传递参数错误！";
//     if (!client.topology || !client.topology.isConnected()) {
//       await client.connect(); // 确保连接只建立一次
//     }
//     let db = await client.db(dbName);
//     let collections = await db.collection(tableName);
//     let result = await collections.updateOne({ _id: id }, { $set: { ...data } });
//     if (result.modifiedCount == 1) return true;
//     else {
//       console.error(`❌ 修改失败: ${id}`);
//       return false;
//     }
//   } catch (error) {
//     // 写入到本地文件中 并 报错
//     console.error("❌ 更新失败:", error);
//     return false;
//   }
// }

// //----------------->>>>>>>>  删除
// // await del("t1__c", "67bc12e4ed0c0153c316889f")
// async function delDocs(tableName: any, id: any) {
//   try {
//     const isStr = typeof id === "string";
//     if (!isStr) return "iD 错误！";
//     if (!client.topology || !client.topology.isConnected()) {
//       await client.connect(); // 确保连接只建立一次
//     }
//     let db = await client.db(dbName);
//     let collections = await db.collection(tableName);
//     let result = await collections.deleteOne({ _id: id });
//     if (result.deletedCount == 1) return true;
//     else {
//       console.error(`❌ 删除失败: ${id}`);
//       return false;
//     }
//   } catch (error) {
//     // 写入到本地文件中 并 报错
//     console.error("❌ 删除失败:", error);
//     return false;
//   }
// }

// async function FindAll(tableName: any) {
//   try {
//     await client.connect();
//     let db = await client.db(dbName); //获取数据库
//     let students = await db.collection(tableName); //获取集合，表

//     // let query = { id: { $gte: 202201 } };  //查询条件是id大于等于202201
//     let cursor = await students.find({}); //执行查询并返回游标对象
//     let result: any[] = [];
//     await cursor.forEach((data: any) => result.push(data));

//     return result;
//   } finally {
//     await client.close(); //关闭数据库
//   }
// } 

// export const ins = insDocs;
// export const del = delDocs;
// export const up = upDocs;
// export const find = findDocs;

// export default {
//   ins: insDocs,
//   del: delDocs,
//   up: upDocs,
//   find: findDocs,
// } 

// let [ins, del, up, find] = MongodbFilter