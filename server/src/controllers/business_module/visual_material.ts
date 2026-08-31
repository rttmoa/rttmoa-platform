import { Context } from "koa";
import { config } from "../../config/config";

class App {
	static async shelfs(ctx: Context) {
		try {
			const db = ctx.mongo;
			const data = ctx.request.query;


			const result = await db.find("hk_mater_stock__c", { query: {} });

			let arr = [];

			for (const item of result) {
				const stockD = await db.find("hk_mater_stock_detail__c", { query: { position__c: item.position__c, pallet__c: item.pallet__c } });
				if (stockD.length) {
					arr.push({
						...item,
						now_quantity__c: stockD[0].now_quantity__c,
					});
				} else {
					arr.push({
						...item,
						now_quantity__c: 0,
					});
				}
			}

			return ctx.send({ message: "ok", data: arr });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}

export default App;
