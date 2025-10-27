import { Context } from 'koa';
import Basic from '../basic';
import _ from 'lodash';

// * 新增 + 更新 + 导入表格 都要统一表字段
// ** 前端传递参数时、需要告知服务端哪个字段可查询、并且知道字段的类型是字符串还是选择框
// * 查询时：传递需要查询的参数
// * 新增或修改时：新增某个字段
// 字段类型：字符串、数值、选择框
class Sys extends Basic {
	constructor() {
		super();
	}

	// * 抽离 查询条件
	// * 字段类型：字符串、数字、日期查询  |  选择框、复选框、日期时间
	private JobQuery = (data: any) => {
		const query: Record<string, any> = {};

		// 文本查询 — "222"
		const postName = _.trim(_.get(data, 'search.postName', ''));
		if (!_.isEmpty(postName)) {
			query.postName = { $regex: postName, $options: 'i' };
		}

		// 数值查询 — 22
		const postSort = _.toNumber(_.get(data, 'search.postSort'));
		if (!_.isNaN(postSort)) {
			query.postSort = postSort;
		}

		const status = _.trim(_.get(data, 'search.status', ''));
		if (!_.isEmpty(status)) {
			query.status = new RegExp(status);
		}

		// 时间：可以根据选择时间 或 可以根据字符串模糊搜索
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

	Query = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;

			const query = this.JobQuery(data);
			console.log('query', query);

			// 分页参数
			const page = _.clamp(_.toInteger(_.get(data, 'pagination.page', 1)), 1, Number.MAX_SAFE_INTEGER);
			const pageSize = _.clamp(_.toInteger(_.get(data, 'pagination.pageSize', 10)), 1, 100);

			// 排序参数
			const sort = _.get(data, 'sort', { postSort: 1, createTime: -1 });

			// 并行查询
			const [count, list] = await Promise.all([ctx.mongo.count('__sys', query), ctx.mongo.find('__sys', { query, page, pageSize, sort })]);

			return ctx.send({ list, page, pageSize, total: count });
		} catch (err: any) {
			return ctx.sendError(500, err.message || '服务器错误');
		}
	};

	// * 新增和修改和导入表格时的字段
	private addAndModifyField = (data: any) => {
		return {
			postCode: this.normalize(data?.postName, ['string'], null),
			postName: this.normalize(data?.postName, ['string'], null), // 产品经理 | 前端开发 | 会计
			postSort: this.normalize(data?.postSort, ['number'], 1), // 排序
			status: this.normalize(data?.status, ['string'], null), // 开关：开启/关闭
			desc: this.normalize(data?.desc, ['string'], null),
			flag: false,
		};
	};

	Add = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;

			const exist = await ctx.mongo.find('__sys', { query: { postName: _.trim(data?.postName) } });
			if (exist.length) return ctx.sendError(400, `修改错误：已存在${data?.postName}`);

			const job = this.addAndModifyField(data);
			const doc: any = {
				...job,
				createBy: 'admin',
				createTime: new Date(),
			};
			const ins = await ctx.mongo.insertOne('__sys', doc);
			return ctx.send(`新增数据成功!`);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	Mod = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			const data: any = ctx.request.body;

			if (!id) return ctx.sendError(400, `修改岗位操作：无iD`);

			// 修改时、需排序修改内容的postName
			const exist = await ctx.mongo.find('__sys', {
				query: { postName: _.trim(data?.postName), _id: { $ne: id } },
			});
			if (exist.length) return ctx.sendError(400, `修改错误：已存在${data?.postName}`);
			const job = this.addAndModifyField(data);
			const doc: any = {
				...job,
				updateBy: null,
				updateTime: null,
			};
			await ctx.mongo.updateOne('__sys', id, doc);
			return ctx.send('修改成功');
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	ImportEx = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;

			// 这个字段与上面导入新增的字段不同
			if (data && data.length) {
				for (const element of data) {
					const exist = await ctx.mongo.find('__sys', { query: { postName: _.trim(element.postName) } });
					if (exist.length == 0) {
						const job = this.addAndModifyField(data);
						const newJob: any = {
							...job,
							createBy: 'admin',
							createTime: new Date(),
						};
						await ctx.mongo.insertOne('__sys', newJob);
					}
				}
				return ctx.send('数据导入成功');
			} else return ctx.sendError(400, `服务端未获取到数据`);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	Del = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			if (id) {
				const docs = await ctx.mongo.find('__sys', { query: { _id: id } });
				if (docs.length) {
					await ctx.mongo.deleteOne('__sys', docs[0]._id);
					return ctx.send('删除成功');
				} else {
					return ctx.sendError(400, `删除操作：删除任务失败！根据id未找到数据`);
				}
			} else return ctx.sendError(400, `删除操作：前端未传递id！`);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	DelMore = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			if (data && data.length) {
				for (const _id of data) {
					const docs = await ctx.mongo.find('__sys', { query: { _id: _id } });
					if (docs.length) {
						await ctx.mongo.deleteOne('__sys', docs[0]._id);
					}
				}
				return ctx.send('全部删除完成');
			} else return ctx.sendError(400, `删除更多操作：前端传递的参数不正确！`);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new Sys();
