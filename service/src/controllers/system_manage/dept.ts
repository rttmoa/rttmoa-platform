/* eslint-disable no-inner-declarations */
import { Context } from 'koa';
import Basic from '../basic';
import DeptSchema from '../../model/system_manage/dept';

// * 部门管理
// ✅ 一、核心功能需求
// 支持多级部门（树状结构）
// 部门名称不可重复（至少在同级下）
// 支持部门负责人
// 可记录创建时间、修改时间等
// 支持部门状态（启用/禁用）
// 可扩展字段（比如部门排序、备注等）
class Dept extends Basic {
	constructor() {
		super();
	}

	findDept = async (ctx: Context) => {
		try {
			const payload = ctx.state.user; // 这就是你的载荷信息
			// console.log('Authenticated user ID:', payload);

			// const param = ctx.query; 
			// // status：400，查询部门操作：未获取到iD
			// if (!param._id) return ctx.sendError(400, `查询部门操作：未获取到iD`);
			
			// // status：500，服务器错误 
			// if (!param.name) throw new Error("查询部门操作：请求参数错误，无部门名称")
	 

			/** 将扁平结构转换为树结构 */
			function flatToTree(flatList: any[]): any[] {
				const keyMap = new Map<string, any>();
				const tree: any[] = [];

				// 构建 key 映射
				for (const item of flatList) {
					const node: any = {
						name: item.name,
						label: item.label,
						leader: item.leader,
						phone: item.phone,
						email: item.email,
						status: item.status,
						sort: item.sort,
						desc: item.desc,

						parent_id: item.parent_id,
						unique: item._id,
						children: [],
					};
					keyMap.set(item.name, node);
				}

				// 构建父子关系
				for (const item of flatList) {
					const node = keyMap.get(item.name);
					const parent = keyMap.get(item.parent_id);
					if (parent) {
						parent.children.push(node);
					} else {
						tree.push(node);
					}
				}

				return tree;
			}

			/** 清除空 children 字段 */
			function removeEmptyChildren(nodes: any[]): void {
				for (const node of nodes) {
					if (Array.isArray(node.children) && node.children.length > 0) {
						removeEmptyChildren(node.children);
					} else {
						delete node.children;
					}
				}
			}

			/** 按 meta.sort 递归排序 */
			function sortTreeBySort(nodes: any[]): any[] {
				return nodes
					.slice()
					.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
					.map(node => ({
						...node,
						children: node.children ? sortTreeBySort(node.children) : undefined,
					}));
			}

			// ✅ 主控制逻辑
			const flatMenu = await ctx.mongo.find('__dept'); // 或 "__dept"
			const tree = flatToTree(flatMenu);
			removeEmptyChildren(tree);
			const sortedTree = sortTreeBySort(tree);
			return ctx.send(sortedTree, '获取菜单树结构成功');
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	addAndModifyField = (data: any) => {
		let newDept: any = {
				parent_id: this.normalize(data?.parent_id, ['number', 'string'], null), // 父级菜单ID（顶层为0或null） &  子部门parent_id为上级部门的name
				name: this.normalize(data?.name, ['string'], null), // 部门名称：研发部
				label: this.normalize(data?.name, ['string'], null), // 同部门：研发部
				leader: this.normalize(data?.leader, ['string'], null), // 部门负责人iD或姓名：张三
				phone: this.normalize(data?.phone, ['string'], null), // 1233333333
				email: this.normalize(data?.email, ['string'], null), // 9082@qq.com
				status: this.normalize(data?.status, ['string'], null), // 开关状态：true
				sort: this.normalize(data?.sort, ['number'], 1), // 部门排序：3
				desc: this.normalize(data?.desc, ['string'], null), // 描述

				// subCount: 2,
				// hasChildren: true, 
			};
			return newDept
	}

	// * 新增部门：树结构	  —   是否顶级部门
	// POST: /dept/department
	addDept = async (ctx: Context) => {
		try {
			let data: any = ctx.request.body;
			console.log('新增部门参数：', data);

			const dept = this.addAndModifyField(data)
			let newDept: any = { 
				 ...dept,
				createBy: 'admin',
				createTime: new Date(), 
			};
			await ctx.mongo.insertOne('__dept', newDept);
			return ctx.send('新增部门成功');
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 更新菜单
	// * 新增部门：树结构	  —   是否顶级部门
	modifyDept = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			const data: any = ctx.request.body;
			console.log('更新部门参数：', data);

			const dept = this.addAndModifyField(data)
			let newDept: any = {  
				...dept,
				updateBy: null,
				updateTime: null,
			};
			await ctx.mongo.updateOne('__dept', id, newDept);
			return ctx.send('新增部门成功');
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除部门
	DelDept = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			console.log('删除部门', id); 
 			if (!id) return ctx.sendError(400, '无iD');

			const data = await ctx.mongo.find('__dept', { query: { _id: id } });
			if (!data.length) return ctx.sendError(400, '未找到数据')

			const fc = await ctx.mongo.find('__dept', { query: { parent_id: data[0].name } });
			if (fc.length > 0) return ctx.sendError(400, '需要先删除子菜单', 400);

			await ctx.mongo.deleteOne('__dept', data[0]._id);
			return ctx.send(`删除部门成功`);
		} catch (err) {
			console.error('删除部门错误：', err);
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 测试业务
	TestData = async (ctx: Context) => {
		try {
			const query = ctx.query;
			console.log('测试', query);

			// try {
			// 	const id = ctx.params.id;
			// 	console.log("删除部门", id);

			// 	if (!id) return ctx.sendError(400, "无iD", 400);
			// 	const data = await ctx.mongo.find("__dept", { query: { _id: id } });
			// 	if (!data.length){
			// 		 return ctx.sendError(400, "未找到数据", 400);
			// 	}
			// 	const findChildren = await ctx.mongo.find("__dept", { query: { parent_id: data[0].name } });
			// 	console.log('findChildren', findChildren.length);
			// 	if (findChildren.length > 0) {
			// 		return ctx.sendError(400, "需要先删除子菜单", 400);
			// 	}
			// 	const delRes = await ctx.mongo.deleteOne("__dept", data[0]._id);
			// 	return ctx.send(`删除部门 ${data[0].name} 成功`);
			// } catch (err) {
			// 	console.error('删除部门错误：', err)
			// 	return ctx.sendError(500, err.message, 500);
			// }

			const dept = new DeptSchema({
				parent_id: 0,
				name: 1123,
				label: 'aaaa',
				// noON: true,
			});
			const res = await dept.save();
			// console.log('结果：', res);

			return ctx.send(`router ok`);
		} catch (error) {
			console.error('删除测试业务错误：', error);
			return ctx.sendError(500, error.message, 500);
		}
	};
}

export default new Dept();
