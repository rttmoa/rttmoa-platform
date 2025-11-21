/* eslint-disable no-inner-declarations */
import { Context } from 'koa';
import Basic from '../basic';
import { InitMenuConfig } from '../../config/init_menu';
import _ from 'lodash';

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

// 注意点：开启菜单状态：新增时，如果最上级菜单是关闭、那么子菜单必须全是关闭状态
// 注意点：开启菜单状态：更新时，如果最上级菜单改成关闭状态、那么子菜单必须全是关闭状态才可以
class Menu extends Basic {
	constructor() {
		super();
	}

	// * 初始化菜单：将menuConfig.json存储转化到数据库中
	InitMenu = async (ctx: Context) => {
		try {
			const user = ctx.state.user;
			if (!user) return ctx.sendError(401, 'Unauthorized access. Please provide a valid token.', 401);

			const { data } = InitMenuConfig;
			function delStr(str: string) {
				const handleStr = String(str || '').trim();
				if (str == '') return null;
				else return handleStr;
			}
			let handleAllMenu: any[] = [];
			const handleMenu = (menuConfig: any, type: string, parent_key: string) => {
				return menuConfig?.map((item: any) => {
					let option: any = {
						parent_id: type == '目录' ? 0 : parent_key, // 父 ID
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
						enable: '开启', // 这里可能是关闭状态
						created_at: new Date(),
						updated_at: new Date(),
					};
					handleAllMenu.push(option);
					if (item.children && item.children.length) handleMenu(item.children, '菜单', item.meta.key);
					return option;
				});
			};
			handleMenu(data, '目录', '');
			for (const element of handleAllMenu) {
				await ctx.mongo.insertOne('__menu', element);
			}
			return ctx.send(handleAllMenu);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 查询到数据库中的数据、要返回前端所需要的结构
	// * 菜单管理中查询的是所有的菜单 name = "all"
	// * 前端展示查询的菜单应该是 开启菜单 != "关闭"
	findMenu = async (ctx: Context) => {
		try {
			// * 当 name == 'all' 时、查全部的菜单、将数据库中菜单导出为json格式
			const { name } = ctx.query;

			const currentUser = ctx.state.user;
			if (Object.keys(currentUser).length == 0) {
				return ctx.sendError(401, 'Unauthorized access. Please provide a valid token.');
			}

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
							isLink: item.is_link || '',
							isHide: item.is_hide === 1,
							isFull: item.is_full === 1,
							isAffix: item.is_affix === 1,
							type: item.type,
							sort: +item.sort || 1,
							enable: item.enable,
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

			// 根据角色：proAdmin / admin / user 去
			const { role } = await this.getUserById(currentUser?.id, ctx);
			let RoleMenu: any = [];
			if (role.length) {
				const Role = await ctx.mongo.find('__role', { query: { permission_str: { $in: role } }, sort: { level: -1 } }); // 角色级别倒序
				RoleMenu = Role[0].menuList;
			}

			// * ✅ 主控制逻辑：查询全部菜单
			if (name && name == 'all') {
				const flatMenu = await ctx.mongo.find('__menu'); // 或 "__dept"
				const tree = flatToTree(flatMenu);
				removeEmptyChildren(tree);
				const sortedTree = sortTreeBySort(tree);
				return ctx.send(sortedTree, '获取菜单树结构成功');
			}

			// * ✅ 主控制逻辑： 前端查询：菜单 != "关闭"
			if (name && name == 'open') {
				const flatMenu = await ctx.mongo.find('__menu', { query: { enable: { $ne: '关闭' } } }); // 或 "__dept"
				const tree = flatToTree(flatMenu);
				removeEmptyChildren(tree);
				const sortedTree = sortTreeBySort(tree);
				return ctx.send(sortedTree, '获取菜单树结构成功');
			}

			// * ✅ 只返回首页：返回：首页home
			// 1、没有获取到 cookie 中的 用户信息：currentUser
			// 2、登陆的用户没有 角色字符
			// 3、获取的角色菜单为空
			if (!currentUser.id || role.length == 0 || RoleMenu.length == 0) {
				const home = await ctx.mongo.find('__menu', { query: { path: '/_/home/index' } });
				const homePage = flatToTree(home);
				return ctx.send(homePage, '获取菜单树结构成功');
			}

			// * ✅ 根据角色：proAdmin / admin / user 返回对应的角色菜单
			if (RoleMenu.length) {
				const tree = flatToTree(RoleMenu);
				removeEmptyChildren(tree);
				const sortedTree = sortTreeBySort(tree);
				return ctx.send(sortedTree, '获取菜单树结构成功');
			}
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 新增菜单
	// 前台尽量多做一些选择框去供用户去选择
	// 新增时，如果最上级菜单是关闭、那么子菜单必须全是关闭状态
	addMenu = async (ctx: Context) => {
		try {
			let data: any = ctx.request.body;
			console.log('新增菜单参数：', data);

			// * 2、查询数据库有无相同key和path、必须保证key和apth唯一
			const p = _.trim(_.get(data, 'path', ''));
			const path = String.raw`${p}`.replace(/\\/g, '/');

			const key = _.trim(_.get(data, 'key', ''));
			const exists = await ctx.mongo.find('__menu', { query: { $or: [{ path }, { key }] } });
			if (exists.length > 0) {
				if (exists[0]?.path === path) return ctx.sendError(400, `新增菜单失败：已经存在 path 为 ${path}`);
				if (exists[0]?.key === key) return ctx.sendError(400, `新增菜单失败：已经存在 key 为 ${key}`);
			}

			// * 新增时、如果上一级状态是关闭、那么新增的子菜单状态也是关闭状态
			// console.log('上级菜单：', data?.parent_id); // 0 | auth
			let enableStatus = data?.enable;
			let sortPlus = 1;
			if (data?.parent_id != 0) {
				// 当不是顶级菜单时
				const exists = await ctx.mongo.find('__menu', { query: { key: data?.parent_id }, sort: { sort: -1 } });
				if (exists.length) {
					sortPlus = exists[0].sort + 10;
					if (exists[0].enable == '关闭') enableStatus = '关闭';
				}
			}

			// * 3、如果新增的是菜单、需要注意父iD是什么、需要修改 parent_id

			// * 4、编辑菜单对象
			function delStr(str: string) {
				const handleStr = String(str || '').trim();
				if (handleStr == '') return "";
				else {
					if (str.includes('\\')) {
						return str.replace(/\\/g, '/');
					} else {
						return handleStr;
					}
				}
			}

			let fDoc: any = {
				parent_id: data?.parent_id, // 父级菜单 ID（顶层为 0）
				type: delStr(data?.type), // 菜单类型： 目录 | 菜单 | 按钮
				path: delStr(data?.path ? String.raw`${data?.path}` : ''), // 路由路径 /home/index |  /auth/button
				element: delStr(data?.element ? String.raw`${data?.element}` : ''), // 组件路径 /home/index | /auth/button/index
				redirect: delStr(data?.redirect ? String.raw`${data?.redirect}` : ''), // 重定向路径，如 /auth/page
				key: delStr(data?.key), // 菜单唯一标识，如 authButton
				title: delStr(data?.title), // 菜单标题
				icon: delStr(data?.icon), // 图标名，如 LockOutlined
				is_link: delStr(data?.isLink), // 外链 URL，"" 表示不是外链
				is_hide: data?.isHide == '是' ? 1 : 0, // 是否隐藏菜单项（0 否，1 是）
				is_full: data?.isFull == '是' ? 1 : 0, // 是否全屏显示页面
				is_affix: data?.isAffix == '是' ? 1 : 0, // 是否固定标签页
				sort: +data?.sort == 1 ? sortPlus : +data?.sort, // 显示排序: 1-9999
				enable: enableStatus, // 是否开启菜单
				created_at: new Date(),
				updated_at: new Date(),
			};
			await ctx.mongo.insertOne('__menu', fDoc);
			return ctx.send('新增菜单成功');
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 更新菜单
	UpMenu = async (ctx: Context) => {
		try {
			// * 1、校验参数、校验前端参数  【前端校验参数】
			const data: any = ctx.request.body;
			console.log('更新菜单参数：', data);

			const findMenu = await ctx.mongo.find('__menu', { query: { _id: data?._id } });
			if (findMenu.length == 0) return ctx.sendError(400, '修改菜单失败：数据错误，根据id查找、数据未找到');

			// 通用唯一性校验函数
			async function checkUniqueField(ctx: any, collection: string, field: string, value: string, excludeId?: string): Promise<void> {
				if (_.isEmpty(value)) return;

				const query: Record<string, any> = { [field]: value };
				if (excludeId) query._id = { $ne: excludeId }; // 不等于当前 id

				const exists = await ctx.mongo.find(collection, { query });
				if (exists.length > 0) throw new Error(`新增菜单失败：已经存在${field}: ${value}`);
			}
			try {
				const path = _.trim(_.get(data, 'path', ''));
				await checkUniqueField(ctx, '__menu', 'path', path, data._id); // 校验 path

				const key = _.trim(_.get(data, 'key', ''));
				await checkUniqueField(ctx, '__menu', 'key', key, data._id); // 校验 key

				// 继续你的保存逻辑...
			} catch (err: any) {
				return ctx.sendError(400, err.message);
			}

			// ! 更新菜单时、如果最顶级菜单为关闭时、那么子菜单全部关闭才可以
			if (data.enable == '关闭') {
				const currentKey = findMenu[0].key; // auth 获取当前key、寻找下级
				const KeyArr = await ctx.mongo.find('__menu', { query: { parent_id: currentKey } });
				if (KeyArr.length) {
					for (const element of KeyArr) {
						if (element.enable && element.enable != '关闭') {
							return ctx.sendError(400, '更新菜单：当前节点下，将子节点修改为关闭状态');
						}
					}
				}
			}

			// ! 更新菜单时、如果最顶级菜单为关闭时、那么子菜单无法开启、除非顶级菜单先开启
			// 如何子菜单开启时、上级菜单必须开启才行。
			if (data.enable == '开启') {
				const superStatus = findMenu[0].parent_id; // 获取当前节点、寻找上级
				if (superStatus != 0) {
					const KeyArr = await ctx.mongo.find('__menu', { query: { key: superStatus } });
					if (KeyArr.length) {
						for (const element of KeyArr) {
							if (element.enable != '开启') return ctx.sendError(400, '更新菜单：开启当前节点，需要将上级节点修改为开启状态');
						}
					}
				}
			}

			// * 3、如果修改了菜单、从二级菜单变到了其他二级菜单、需要修改 parent_id
			function delStr(str: string) {
				const handleStr = String(str || '').trim();
				if (handleStr == '') return null;
				else {
					if (str.includes('\\')) {
						return str.replace(/\\/g, '/');
					} else {
						return handleStr;
					}
				}
			} 
			let fDoc: any = {
				// * 注意：新增与修改传递的top数组不一致、修改时、传递的是当前菜单、不是上一级菜单
				parent_id: data?.parent_id,

				type: delStr(data?.type),
				path: delStr(data?.path ? String.raw`${data?.path}` : ''), // 路由路径 /home/index |  /auth/button
				element: delStr(data?.element ? String.raw`${data?.element}` : ''), // 组件路径 /home/index | /auth/button/index
				redirect: delStr(data?.redirect ? String.raw`${data?.redirect}` : ''), // 重定向路径，如 /auth/page
				key: delStr(data?.key),
				title: delStr(data?.title),
				icon: delStr(data?.icon),
				is_link: delStr(data?.isLink),
				is_hide: data?.isHide == '是' ? 1 : 0,
				is_full: data?.isFull == '是' ? 1 : 0,
				is_affix: data?.isAffix == '是' ? 1 : 0,
				sort: +data?.sort || 1,
				enable: delStr(data?.enable),
				updated_at: new Date(),
			}; 
			await ctx.mongo.updateOne('__menu', findMenu[0]._id, fDoc);
			return ctx.send('更新菜单成功');
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};

	// * 删除菜单
	DelMenu = async (ctx: Context) => {
		try {
			// 【根据前端top字段中的属性、parent_id是path字段】
			// ['/menu', '/menu/menu2', '/menu/menu2/menu23']
			// 1、获取要删除的 iD/path
			// 2、根据ID查询数据库中、是否有children
			// 3、需要先删除一级菜单下的children数据、才可删除一级菜单
			// 11、不管是目录还是菜单都要判断下面有无chidren属性、如果有需要删除children
			const body: any = ctx.request.body;
			if (body.children) return ctx.sendError(400, '删除失败：需要先删除子菜单');

			const fm = await ctx.mongo.find('__menu', { query: { path: body.path } });
			if (!fm.length) return ctx.sendError(400, '删除失败：未找到该菜单');
			if (fm.length > 1) return ctx.sendError(400, '删除失败：菜单重复，不唯一');

			await ctx.mongo.deleteOne('__menu', fm[0]._id);
			return ctx.send(`删除菜单成功`);
		} catch (err) {
			return ctx.sendError(500, err.message, 500);
		}
	};
}

export default new Menu();
