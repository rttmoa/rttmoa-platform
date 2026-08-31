import { Context, Next } from 'koa';
import { mongoService } from './m.mongoService';

 
const mongo = () => {
	return async (ctx: Context, next: Next) => {
		ctx.mongo = mongoService as any;
		await next();
	};
};
export default mongo;
