import { Context } from "koa";
import Basic from "../basic";

// * 岗位管理
// 字段：
// 创建人：admin
// 创建时间：2025-05-27
// 修改人：user
// 修改时间
// 标记：remark
// 职位id：1
// 职位代码：ceo
// 职位名称：董事长
// 职位排序：1
// 状态：0
// flag：false
class Job extends Basic {
	constructor() {
		super();
	}

	// * 新增岗位：无其他
	addJob = async (ctx: Context) => {
		try {
			// 获取前端参数：
			type Parmas = {
				job_name?: string;
				job_sort?: string;
				status?: boolean;
				desc?: string;
			};
			const data: Parmas = ctx.request.body;
			console.log("新增岗位参数：", data);
			if (!data) return ctx.sendError(400, `未获取到参数`, 400);
			if (!data?.job_name) return ctx.sendError(400, `未获取到岗位名称`, 400);
			if (!data?.job_sort) return ctx.sendError(400, `未获取到岗位排序`, 400);

			// * 先查询岗位名称是否重复
			const newJob: any = {
				postCode: "ceo",
				postName: data?.job_name, // 产品经理 | 前端开发 | 会计
				postSort: +data?.job_sort, // 排序
				status: data?.status == true ? "1" : "0", // 开关：开启/关闭  0：关、1：开
				flag: false,
				desc: data?.desc || "",

				createBy: "admin",
				createTime: new Date(),
				updateBy: null,
				updateTime: null,
			};
			const ins = await ctx.mongo.insertOne("__job", newJob);
			return ctx.send(ins);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 查询岗位
	allJob = async (ctx: Context) => {
		try { 
			const data = ctx.request.query;

			const job = await ctx.mongo.find("__job");

			return ctx.send({
				list: job,
				page: 1,
				pageSize: 10,
				total: job.length,
			});
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 修改岗位
	modifyJob = async (ctx: Context) => {
		try {
			// 获取前端参数：
			type Parmas = {
				_id?: string;
				job_name?: string;
				job_sort?: string;
				status?: boolean;
				desc?: string;
			};
			const data: Parmas = ctx.request.body;
			console.log("修改岗位参数：", data);
			if (!data) return ctx.sendError(400, `未获取到参数`, 400);
			if (!data._id) return ctx.sendError(400, `无iD`, 400);
			if (!data?.job_name) return ctx.sendError(400, `未获取到岗位名称`, 400);
			if (typeof Number(data?.job_sort) != "number") return ctx.sendError(400, `岗位排序不是数字`, 400);

			// * 先查询岗位名称是否重复
			const newJob: any = {
				postCode: "ceo",
				postName: data?.job_name, // 产品经理 | 前端开发 | 会计
				postSort: +data.job_sort, // 排序
				status: data?.status == true ? "1" : "0", // 开关：开启/关闭  0：关、1：开
				flag: false,
				desc: data?.desc || "",

				updateBy: null,
				updateTime: new Date(),
			};
			const ins = await ctx.mongo.updateOne("__job", data._id, newJob);
			return ctx.send(ins);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除岗位
	delJob = async (ctx: Context) => {
		try { 
			const { id } = ctx.request.query as { id: string };
			if (!id) return ctx.sendError(400, `未获取到iD`, 400);

			const ins = await ctx.mongo.deleteOne("__job", id);
			return ctx.send(ins);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除多个岗位
	delMoreJob = async (ctx: Context) => {
		try {
			// 获取前端参数：
			const data: any = ctx.request.body;
			const ids = data.ids;
			if (!ids) {
				return ctx.sendError(400, `未获取到iD`, 400);
			}
			console.log("删除多个岗位 参数：", data);
			for (const _id of ids) {
				await ctx.mongo.deleteOne("__job", _id);
			}
			return ctx.send("全部删除完成");
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};
}

export default new Job();
