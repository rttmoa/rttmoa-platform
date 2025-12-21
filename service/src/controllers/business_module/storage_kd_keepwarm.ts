import { Context } from 'koa';
import { config } from '../../config/config';

class Storages_kd_keepwarm {
	// * 克东 450个货位库存
	static async shelfs(ctx: Context) {
		try {
			const data = ctx.request.query;

			const result = await ctx.mongo.find('kd_keepwarm_stock__c', { query: {} });

			return ctx.send({ message: 'ok', data: result });
		} catch (err) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}

export default Storages_kd_keepwarm;
