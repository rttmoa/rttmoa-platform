import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { time } from "@/src/utils";

// ? 库存可视化界面展示
class App extends Basic {
	constructor() {
		super();
	}

	stock_mater = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("nb_stock_material__c", { query: {} });
		return ctx.send({ success: true, message: "OK", data: data });
	};

	stock_product = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("nb_stock_pruduct__c", { query: {} });
		return ctx.send({ success: true, message: "OK", data: data });
	};

	stock_class_s = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("nb_stock_xj3_south__c", { query: {} });
		return ctx.send({ success: true, message: "OK", data: data });
	};

	stock_class_m = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("nb_stock_xj4_middle__c", { query: {} });
		return ctx.send({ success: true, message: "OK", data: data });
	};

	stock_class_n = async (ctx: Context) => {
		const db = ctx.mongo;
		const data = await db.find("nb_stock_xj5_north__c", { query: {} });
		return ctx.send({ success: true, message: "OK", data: data });
	};

	// 调度器初始化会从 __schedule_config 读取所有文档并为每个文档创建计时器
	// 你的 ReceiveGwmsOutStock 处理器没有设置响应体，路由调用后状态为 404，定时器视为失败并按重试策略再次调用。
	// 查询 __schedule_config 是否有相同 key （如 gwms_outstock ）的多条记录；若有应仅保留一条，删除其他重复记录以防并发倍增
	private timer = 1;
	ReceiveGwmsOutStock = async (ctx: Context) => {
		console.log(`第 ${this.timer} 次调用接口函数, 调用时间： ${time()}`, "\n");
		return ctx.send({ success: true, message: "OK" });
	};
}

export default new App();
