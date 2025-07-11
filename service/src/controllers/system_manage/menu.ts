/* eslint-disable no-inner-declarations */
import { Context } from "koa";
import { config } from "../../config/config";
import Basic from "../basic";
import { InitMenuConfig } from "../../config/init_menu";

// * 菜单结构
// ✅ 推荐存储格式（MongoDB 示例）
// {
//   "_id": ObjectId("xxx"),
//   "path": "/home/index",
//   "element": "/home/index",
//   "meta": {
//     "key": "home",
//     "title": "首页",
//     "icon": "HomeOutlined",
//     "isLink": "",
//     "isHide": false,
//     "isFull": false,
//     "isAffix": true
//   },
//   "parent": null,       // 顶层为 null，子菜单存上级 id
//   "sort": 1,            // 排序字段
//   "type": "menu",       // 类型: menu | directory | button
//   "created_at": ISODate("2025-06-25T10:00:00Z"),
//   "updated_at": ISODate("2025-06-25T10:00:00Z")
// }
class Menu extends Basic {
	constructor() {
		super();
		this.InitMenu = this.InitMenu.bind(this);
		this.FindAllMenu = this.FindAllMenu.bind(this);
		this.UpMenu = this.UpMenu.bind(this);
		this.DelMenu = this.DelMenu.bind(this);
	}

	// * 初始化菜单：最新的菜单 menuConfig 初始化 【已完成】   修改日期：2025-06-03
	async InitMenu(ctx: Context) {
		try {
			const user = ctx.state.user;
			if (!user) return ctx.sendError(401, "Unauthorized access. Please provide a valid token.", 401);

			const { data } = InitMenuConfig;
			function delStr(str: string) {
				const handleStr = String(str || "").trim();
				if (str == "") return null;
				else return handleStr;
			}
			let handleAllMenu: any[] = [];
			const handleMenu = (menuConfig: any, type: string, parent_key: string) => {
				return menuConfig?.map((item: any) => {
					let option: any = {
						parent_id: type == "目录" ? 0 : parent_key, // 父 ID
						type: delStr(type),
						path: delStr(item.path),
						element: delStr(item.element),
						redirect: delStr(item.redirect),
						key: delStr(item.meta.key),
						title: delStr(item.meta.title),
						icon: delStr(item.meta.icon),
						is_link: delStr(item.meta.isLink),
						is_hide: item.meta.isHide ? 1 : 0,
						is_full: item.meta.isFull ? 1 : 0,
						is_affix: item.meta.isAffix ? 1 : 0,
						sort: +data.sort || 999,
						created_at: new Date(),
						updated_at: new Date(),
					};
					handleAllMenu.push(option);
					if (item.children && item.children.length) handleMenu(item.children, "菜单", item.meta.key);
					return option;
				});
			};
			handleMenu(data, "目录", "");
			let num = 0;
			for (const element of handleAllMenu) {
				num++;
				const result = await ctx.mongo.insertOne("__menu", element);
				console.log("写入菜单结果：", result);
			}
			console.log(num);
			return ctx.send(handleAllMenu);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	}

	// * 查询到数据库中的数据、要返回前端所需要的结构 【已完成】  修改日期：2025-06-03
	async FindAllMenu(ctx: Context) {
		try {
			const param = ctx.query;

			/** 将扁平结构转换为树结构 */
			function flatToTree(flatList: any[]): any[] {
				const keyMap = new Map<string, any>();
				const tree: any[] = [];

				// 构建 key 映射
				for (const item of flatList) {
					const node: any = {
						path: item.path,
						...(item.element && { element: item.element }),
						...(item.redirect && { redirect: item.redirect }),
						meta: {
							key: item.key,
							title: item.title,
							icon: item.icon || null,
							isLink: item.is_link || "",
							isHide: item.is_hide === 1,
							isFull: item.is_full === 1,
							isAffix: item.is_affix === 1,
							type: item.type,
							sort: +item.sort || 1,
						},
						parent_id: item.parent_id,
						unique: item._id,
						children: [],
					};
					keyMap.set(item.key, node);
				}

				// 构建父子关系
				for (const item of flatList) {
					const node = keyMap.get(item.key);
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
					.sort((a, b) => (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0))
					.map(node => ({
						...node,
						children: node.children ? sortTreeBySort(node.children) : undefined,
					}));
			}

			// ✅ 主控制逻辑
			const flatMenu = await ctx.mongo.find("__menu"); // 或 "__dept"
			const tree = flatToTree(flatMenu);
			removeEmptyChildren(tree);
			const sortedTree = sortTreeBySort(tree);
			return ctx.send(sortedTree, "获取菜单树结构成功");
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	}

	// * 新增菜单
	// 前台尽量多做一些选择框去供用户去选择
	// 前端字段需要与数据库字段转化一下
	addMenu = async (ctx: Context) => {
		try {
			let data: any = ctx.request.body;
			console.log("新增菜单参数：", data);
			// * 1、校验 【前端校验参数】
			// * 做一下字段校验、无问题写入到数据库中：比如element与redirect不能同时存在
			if (!data || typeof data !== "object") return ctx.sendError(400, "请求格式错误：无参数", 400);

			// * 2、查询数据库有无相同key和path、必须保证key和apth唯一
			const { path, key } = data;
			const fp = await ctx.mongo.find("__menu", { query: { path: path } });
			if (fp.length > 0) return ctx.sendError(400, `新增菜单失败：已经存在path为 ${data?.path}`, 400);
			const fk = await ctx.mongo.find("__menu", { query: { key: key } });
			if (fk.length > 0) return ctx.sendError(400, `新增菜单失败：已经存在key为 ${data?.key}`, 400);

			// * 3、如果新增的是菜单、需要注意父iD是什么、需要修改 parent_id

			// * 4、编辑菜单对象 
			function delStr(str: string) {
				const handleStr = String(str || "").trim();
				if (str == "") return null;
				else return handleStr;
			}
			let fDoc: any = {
				parent_id: data?.parent_id, // 父级菜单 ID（顶层为 0）
				type: delStr(data?.type), // 菜单类型： 目录 | 菜单 | 按钮
				path: delStr(data?.path), // 路由路径 /home/index |  /auth/button
				element: delStr(data?.element), // 组件路径 /home/index | /auth/button/index
				redirect: delStr(data?.redirect), // 重定向路径，如 /auth/page
				key: delStr(data?.key), // 菜单唯一标识，如 authButton
				title: delStr(data?.title), // 菜单标题
				icon: delStr(data?.icon), // 图标名，如 LockOutlined
				is_link: delStr(data?.isLink), // 外链 URL，"" 表示不是外链
				is_hide: data?.isHide == "是" ? 1 : 0, // 是否隐藏菜单项（0 否，1 是）
				is_full: data?.isFull == "是" ? 1 : 0, // 是否全屏显示页面
				is_affix: data?.isAffix == "是" ? 1 : 0, // 是否固定标签页
				sort: +data?.sort || 1, // 显示排序: 1-9999
				created_at: new Date(),
				updated_at: new Date(),
			};
			// * 5、写入数据库
			const result = await ctx.mongo.insertOne("__menu", fDoc);
			console.log("写入菜单结果：", result);

			// * 6、返回前端信息
			return ctx.send(result, "新增菜单成功");
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 更新菜单
	async UpMenu(ctx: Context) {
		try {
			// * 1、校验参数、校验前端参数  【前端校验参数】
			const data: any = ctx.request.body;
			if (!data) return ctx.sendError(400, "失败：无参数", 400);
			console.log("更新菜单参数：", data);

			// * 2、检查是否重复 path、key
			// 如果修改path、key的话：不可与其他菜单的path重复、查询path是否被修改
			const findMenu = await ctx.mongo.find("__menu", { query: { _id: data?._id } });
			console.log("findMenu", findMenu.length);
			if (!findMenu.length) return ctx.sendError(400, "修改菜单失败：数据错误，根据id查找、数据未找到", 400);
			const { path, key } = findMenu[0];
			if (path != data.path) {
				const fDoc = await ctx.mongo.find("__menu", { query: { path: data?.path } });
				console.log('fDoc', fDoc);
				if (fDoc.length > 0) return ctx.sendError(400, `新增菜单失败：已经存在 path 为：${data?.path}`, 400);
			}
			if (key != data.key) {
				const fDoc = await ctx.mongo.find("__menu", { query: { key: data?.key } });
				if (fDoc.length > 0) return ctx.sendError(400, `新增菜单失败：已经存在 key 为：${data?.key}`, 400);
			}

			// * 3、如果修改了菜单、从二级菜单变到了其他二级菜单、需要修改 parent_id 
			function delStr(str: string) {
				const value = String(str || "").trim();
				if (value == "") return null;
				return value;
			}
			let fDoc: any = {
				// * 注意：新增与修改传递的top数组不一致、修改时、传递的是当前菜单、不是上一级菜单 
				parent_id: data?.parent_id,

				type: delStr(data?.type),
				path: delStr(data?.path),
				element: delStr(data?.element),
				redirect: delStr(data?.redirect),
				key: delStr(data?.key),
				title: delStr(data?.title),
				icon: delStr(data?.icon),
				is_link: delStr(data?.isLink),
				is_hide: data?.isHide == "是" ? 1 : 0,
				is_full: data?.isFull == "是" ? 1 : 0,
				is_affix: data?.isAffix == "是" ? 1 : 0,
				sort: +data?.sort || 1,
			};
			// * 4、写入数据库
			const result = await ctx.mongo.updateOne("__menu", findMenu[0]._id, fDoc);
			console.log("写入菜单结果：", result);

			// 返回前端结果：
			return ctx.send(result, "新增菜单成功");
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	}

	// * 删除菜单
	async DelMenu(ctx: Context) {
		try {
			// 【根据前端top字段中的属性、parent_id是path字段】
			// ['/menu', '/menu/menu2', '/menu/menu2/menu23']
			// 1、获取要删除的 iD/path
			// 2、根据ID查询数据库中、是否有children
			// 3、需要先删除一级菜单下的children数据、才可删除一级菜单
			// 11、不管是目录还是菜单都要判断下面有无chidren属性、如果有需要删除children
			function errInfo(msg: string) {
				return ctx.sendError(400, msg || "删除失败", 400);
			}
			const body: any = ctx.request.body;
			if (body.children) return errInfo(`删除失败：需要先删除子菜单`);

			const fm = await ctx.mongo.find("__menu", { query: { path: body.path } });
			if (!fm.length) return errInfo(`删除失败：未找到 ${body?.meta?.title} 菜单`);
			if (fm.length > 1) return errInfo(`删除失败：菜单 ${body?.meta?.title} 错误`);
			const delRes = await ctx.mongo.deleteOne("__menu", fm[0]._id);
			return ctx.send([], `删除菜单 ${body?.meta?.title} 成功`);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	}
}

export default new Menu();
