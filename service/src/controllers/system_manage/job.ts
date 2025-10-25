import { Context } from 'koa';
import Basic from '../basic';
import _ from 'lodash';

interface JobParams {
	job_name?: string;
	job_sort?: string;
	status?: string;
	desc?: string;
}

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

// * 新增 + 更新 + 导入表格 都要统一表字段
class Job extends Basic {
	constructor() {
		super();
	}

	// * 抽离 Job 查询条件
	// * 字符串、数字、日期查询  |  选择框、复选框、日期时间
	private JobQuery = (data: any) => {
		const query: Record<string, any> = {};

		const postName = _.trim(_.get(data, 'search.postName', ''));
		if (!_.isEmpty(postName)) {
			query.postName = { $regex: postName, $options: 'i' };
		}

		const postSort = _.toNumber(_.get(data, 'search.postSort'));
		if (!_.isNaN(postSort)) {
			query.postSort = postSort;
		}

		const status = _.trim(_.get(data, 'search.status', ''));
		if (!_.isEmpty(status)) {
			query.status = new RegExp(status);
		}

		const createTime = _.get(data, 'search.createTime', []);
		if (_.isArray(createTime) && createTime.length === 2) {
			const [start, end] = createTime;
			if (_.isNumber(start) && _.isNumber(end)) {
				query.createTime = {
					$gte: new Date(start),
					$lte: new Date(end),
				};
			}
		}

		return query;
	};

	// * 查询岗位
	Query = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			// console.log('查询参数：', data);

			const query = this.JobQuery(data);

			// 分页参数
			const page = _.clamp(_.toInteger(_.get(data, 'pagination.page', 1)), 1, Number.MAX_SAFE_INTEGER);
			const pageSize = _.clamp(_.toInteger(_.get(data, 'pagination.pageSize', 10)), 1, 100); // 限制最大 100

			// 排序参数，默认按 postSort 升序 + createTime 降序
			const sort = _.get(data, 'sort', { postSort: 1, createTime: -1 });

			// 并行查询
			const [count, list] = await Promise.all([ctx.mongo.count('__job', query), ctx.mongo.find('__job', { query, page, pageSize, sort })]);

			return ctx.send({ list, page, pageSize, total: count });
		} catch (err: any) {
			return ctx.sendError(500, err.message || '服务器错误');
		}
	};

	private addAndModifyField = (data: any) => {
		return {
			postCode: this.normalize(data?.job_name, ['string'], null),
			postName: this.normalize(data?.job_name, ['string'], null), // 产品经理 | 前端开发 | 会计
			postSort: this.normalize(data?.job_sort, ['number'], 1), // 排序
			status: this.normalize(data?.status, ['string'], null), // 开关：开启/关闭
			desc: this.normalize(data?.desc, ['string'], null),
			flag: false,
		};
	};

	// 检查岗位名称是否已存在
	private checkPostName = async (ctx: Context, postName: string) => {
		const existing = await ctx.mongo.find('__job', { query: { postName: _.trim(postName) } });
		return !!existing.length;
	};

	// * 新增岗位
	Add = async (ctx: Context) => {
		try {
			const data: JobParams = ctx.request.body;
			console.log('新增岗位参数：', data);

			const check = await this.checkPostName(ctx, data?.job_name);
			if (check) return ctx.sendError(400, '已存在岗位名称');

			const job = this.addAndModifyField(data);
			const newJob: any = {
				...job,
				createBy: 'admin',
				createTime: new Date(),
			};
			const ins = await ctx.mongo.insertOne('__job', newJob);
			return ctx.send(`新增数据成功!`);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 修改岗位
	Mod = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			const data: JobParams = ctx.request.body;
			// console.log('修改岗位参数：', data);

			if (!id) return ctx.sendError(400, `修改岗位操作：无iD`);

			const check = await this.checkPostName(ctx, data?.job_name);
			if (check) return ctx.sendError(400, '已存在岗位名称');

			const job = this.addAndModifyField(data);
			const newJob: any = {
				...job,
				updateBy: null,
				updateTime: null,
			};
			await ctx.mongo.updateOne('__job', id, newJob);
			return ctx.send('修改岗位成功');
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * Excel 表格数据导入
	ImportEx = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			// console.log('Excel 数据', data);

			// 这个字段与上面导入新增的字段不同
			if (data && data.length) {
				for (const element of data) {
					const check = await this.checkPostName(ctx, element.postName);
					if (!check) {
						const newJob: any = {
							postCode: 'ceo',
							postName: _.trim(_.toString(element.postName)), // 产品经理 | 前端开发 | 会计
							postSort: _.toNumber(element.postSort), // 排序
							status: _.trim(_.toString(element.status)), // 开关：开启/关闭
							desc: _.trim(_.toString(element?.desc)),
							flag: false,

							createBy: 'admin',
							createTime: new Date(),
						};
						await ctx.mongo.insertOne('__job', newJob);
					}
				}
				return ctx.send('岗位数据导入成功');
			} else return ctx.sendError(400, `服务端未获取到数据`);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除岗位
	Del = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			if (id) {
				const docs = await ctx.mongo.find('__job', { query: { _id: id } });
				if (docs.length) {
					await ctx.mongo.deleteOne('__job', docs[0]._id);
					return ctx.send('删除成功');
				} else {
					return ctx.sendError(400, `删除岗位操作：删除任务失败！`);
				}
			} else return ctx.sendError(400, `删除岗位操作：前端未传递id！`);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除多个岗位
	DelMore = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const _id of data) {
					const docs = await ctx.mongo.find('__job', { query: { _id: _id } });
					if (docs.length) {
						await ctx.mongo.deleteOne('__job', docs[0]._id);
					}
				}
				return ctx.send('全部删除完成');
			} else return ctx.sendError(400, `删除岗位操作：前端传递的参数不正确！`);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};
}

export default new Job();
