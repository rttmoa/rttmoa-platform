import { MongoService } from "./middlewares/mongo/_dbMongoService";
import type { MongoType } from "./middlewares/mongo/_dbMongoService";

declare module "koa" {
	interface Context {
		mongo: MongoType; // ctx.MongoService.find()
		params: Record<string, string>; // 添加这一行
		send: (data: any, msg?: string, page?: any, code?: number) => void;
		sendError: (code: number, msg?: string, statusCode?: number) => void;
	}
}
