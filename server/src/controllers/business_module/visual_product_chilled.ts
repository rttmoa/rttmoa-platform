import { Context } from 'koa';
import { config } from '../../config/config';

class App {
 	static async shelfs(ctx: Context) {
		try {
			const data = ctx.request.query;

			const result = await ctx.mongo.find('hk_chilled_stock__c', { query: {} });

			return ctx.send({ message: 'ok', data: result });
		} catch (err: any) {
			return ctx.sendError(config.resCodes.serverError, err.message);
		}
	}
}

export default App;