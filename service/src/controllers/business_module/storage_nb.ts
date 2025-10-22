import { Context } from "koa";
import { config } from "../../config/config";
 
class Shelf {

	// * 宁波1880个库位、库存报表
	static async Storages(ctx: Context) {
		try {
			const data = ctx.request.query

			const result = await ctx.mongo.find("nb_storage_shelf__c", { query: {} });
			const stock = await ctx.mongo.find("nb_storage_shelf__c", { query: {zone__c: data.zone__c} });

			return ctx.send({ message: "ok", data: result, stock });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// * 仓库货架表 所有数据
	static async Shelfs(ctx: Context) {
		try {
			// 获取 query 数据、处理数据、
			const result = await ctx.mongo.find("nb_storage_shelf__c", { query: {}, sort: {} });
			return ctx.send({
				message: "获取数据成功",
				list: result,
				current: 1,
				pageSize: 10,
				total: result.length,
			});
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	static async findShelf(ctx: Context) {
		try {
			let query = ctx.request.query;
			console.log("query", query);

			// 查询status=A的数据、返回item和status字段、不显示_id字段
			// https://docs.mongoing.com/mongodb-crud-operations/query-documents/project-fields-to-return-from-query#qu-chu-id-zi-duan
			// let obj = { { status: "A" }, { item: 1, status: 1, _id: 0 }}
			const result = await ctx.mongo.find("nb_storage_shelf__c", { query: {} });
			console.log("结果：", result);

			// let result = await find("nb_storage_shelf__c",{query: {pallet__c: "0429035294000"}})
			// console.log('result', result);
			// let upda = await up("nb_storage_shelf__c", result[0]._id, {pallet__c: "9999", shelf_status__c: "禁用"})

			// 5.0 响应
			return ctx.send(result, undefined, { counts: result.length, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 增加货架数据
	static async insShelf(ctx: Context) {
		try {
			let query = ctx.request.query;
			console.log("query", query);

			//* 新增一条
			const date = String(+new Date()).substring(3);
			const random = Math.floor(Math.random() * 1000) + 1;
			// const fDocs = await ctx.mongo.insertOne("_a_b__c", {name: "增加一条",time: '2021-02-03', pallet: date, taskNo: date, priority: random});
			// console.log("结果：", fDocs);

			//* 新增N条
			let params = [
				{ name: "增加多条", time: "2021-02-03", pallet: date, taskNo: date, priority: random },
				{ name: "增加多条", time: "2021-02-03", pallet: date, taskNo: date, priority: random },
			];
			const fDocs = await ctx.mongo.insertMany("_a_b__c", params);
			console.log("结果：", fDocs);

			// 5.0 响应
			return ctx.send(fDocs, undefined, { counts: fDocs.length, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}

	// 更新货架数据
	static async upShelf(ctx: Context) {
		try {
			let query = ctx.request.query;
			console.log("query", query);
			let uid = ctx.params.uid;
			console.log("uid：", uid);

			const fDocs = await ctx.mongo.find("_a_b__c", { query: { pallet: "7791690774" } });
			console.log("结果：", fDocs.length);
			const result = await ctx.mongo.updateOne("_a_b__c", fDocs[0]._id, { priority: 1234 });
			console.log("修改结果：", result);

			// 5.0 响应 
			return ctx.send(fDocs, undefined, { counts: fDocs.length, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
	
	// 删除货架数据
	static async delShelf(ctx: Context) {
		try {
			let query = ctx.request.query;
			console.log("query", query);
			let uid = ctx.params.uid;
			console.log("uid：", uid);

			// 删除一条
			// let fDocs = await ctx.mongo.deleteOne("_a_b__c", "682d36262f702f090502643b");
			// console.log("结果：", fDocs);

			// 删除多条
			let fDocs = await ctx.mongo.deleteMany("_a_b__c", { name: "增加一条" });

			// 5.0 响应
			return ctx.send(fDocs, undefined, { counts: fDocs ? 1 : 0, pagesize: 5, pages: 2, page: 1 });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}

export default Shelf;
