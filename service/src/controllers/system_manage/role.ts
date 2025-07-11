import { Context } from "koa";
import Basic from "../basic";

// * 角色管理
class Role extends Basic {
	constructor() {
		super();
	}

	// * 新增角色：角色中带菜单
	addRole = async (ctx: Context) => {
		try {
			// 1、获取前端参数并校验：
			const data: any = ctx.request.body;
			console.log("添加角色：", data);
			if (!data) return ctx.sendError(400, `未获取到参数`, 400);
			if (!data?.role_name) return ctx.sendError(400, `未获取到角色名称`, 400);
			if (!data?.permission_str) return ctx.sendError(400, `未获取到角色字符`, 400);

			// 2、校验是否存在相同角色名称、角色字符

			// 2、根据前端 ['auth', 'pageMenu'] key、去库中寻找菜单
			// data.permission_menu // 无父节点：['pageMenu']
			// data.menuList // 有父节点：['auth', 'pageMenu']
			const menu = await ctx.mongo.find("__menu");
			let roleMenu = [];
			for (const ItemPermission of data?.menuList || []) {
				for (const ItemMenu of menu) {
					if (ItemPermission == ItemMenu.key) {
						roleMenu.push(ItemMenu);
					}
				}
			}
			// 这里的Menu应该是获取所有的Menu、去正确的勾选哪些Menu的

			// 3、将参数都处理完成
			const newRole: any = {
				role_name: data?.role_name, // 管理员 | 普通用户
				permission_str: data?.permission_str, // 权限字符： admin / user
				level: data?.level || 1, // 角色级别  1
				sort: data?.sort || 1, // 角色排序  1
				status: data?.status || false,
				permission_menu: data?.permission_menu, // 菜单数组：树结构  ['menu', 'menu2', 'menu22', 'menu221', 'menu222']
				menuList: roleMenu, // 菜单数组：角色菜单

				dataScope: "全部", // 数据范围
				depts: [], // 数据权限：部门
				desc: data?.desc, // 角色描述
				createTime: new Date(),
				updateBy: "admin",
				updateTime: new Date(),
			};

			// 4、写入库中
			const ins = await ctx.mongo.insertOne("__role", newRole);

			return ctx.send(ins);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 修改角色：角色中带菜单
	modifyRole = async (ctx: Context) => {
		try {
			// 1、获取前端参数并校验：
			const data: any = ctx.request.body;
			console.log("添加角色：", data);
			if (!data) return ctx.sendError(400, `未获取到参数`, 400);
			if (!data._id) return ctx.sendError(400, `未获取到iD`, 400);
			if (!data?.role_name) return ctx.sendError(400, `未获取到角色名称`, 400);
			if (!data?.permission_str) return ctx.sendError(400, `未获取到角色字符`, 400);


			// 2、校验是否存在相同角色名称、角色字符

			// 2、根据前端 ['auth', 'pageMenu'] key、去库中寻找菜单
			// data.permission_menu // 无父节点：['pageMenu']
			// data.menuList // 有父节点：['auth', 'pageMenu']
			const menu = await ctx.mongo.find("__menu");
			let roleMenu = [];
			for (const ItemPermission of data?.menuList || []) {
				for (const ItemMenu of menu) {
					if (ItemPermission == ItemMenu.key) {
						roleMenu.push(ItemMenu);
					}
				}
			}
			// 这里的Menu应该是获取所有的Menu、去正确的勾选哪些Menu的

			// 3、将参数都处理完成
			const newRole: any = {
				role_name: data?.role_name, // 管理员 | 普通用户
				permission_str: data?.permission_str, // 权限字符： admin / user
				level: data?.level || 1, // 角色级别  1
				sort: data?.sort || 1, // 角色排序  1
				status: data?.status || false,
				permission_menu: data?.permission_menu, // 菜单数组：树结构  ['menu', 'menu2', 'menu22', 'menu221', 'menu222']
				menuList: roleMenu, // 菜单数组：角色菜单

				dataScope: "全部", // 数据范围
				depts: [], // 数据权限：部门
				desc: data?.desc, // 角色描述
				// createTime: new Date(),
				updateBy: "admin",
				updateTime: new Date(),
			};

			// 4、写入库中
			const ins = await ctx.mongo.updateOne("__role", data._id, newRole);

			return ctx.send(ins);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 查询角色：角色中带菜单
	findRole = async (ctx: Context) => {
		try {
			// 1、获取前端参数：
			// 2、菜单结构应该是在服务端处理完后、将树结构传递回去
			// 3、接收的菜单是 ['menu', 'menu2', 'menu22', 'menu221', 'menu222'] 结构、处理后写入到库中
			const data = ctx.request.query;

			const find = await ctx.mongo.find("__role");

			return ctx.send({ list: find, page: 1, pageSize: 10, total: find.length });
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 删除角色
	delRole = async (ctx: Context) => {
		try {
			const data = ctx.request.query;
			console.log("删除角色 参数：", data);
			const { id } = data as { id: string };
			if (!id) return ctx.sendError(400, "未获取到id", 400);

			const del = await ctx.mongo.deleteOne("__role", id);
			return ctx.send(del);
		} catch (err) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new Role();
