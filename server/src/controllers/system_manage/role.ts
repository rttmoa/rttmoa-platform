import { Context } from "koa";
import Basic from "../basic";
import _ from "lodash";
import { FieldSchema } from "@/src/types/schema";

class Role extends Basic {
	constructor() {
		super();
	}

	private readonly tableName = "角色管理";
	private readonly Collection = "__role";

	private FieldSchema_System: Record<
		string,
		{
			label: string;
			type: 'string' | 'number' | 'date' | 'select';
			query?: boolean;
			editable?: boolean;
			width?: number;
			options?: { label: string; value: any }[];
			order?: number;
			sorter?: boolean;
		}
	> = {
		username: { label: '用户名', type: 'string', query: true, editable: true },
		user_auth: { label: '用户权限字符', type: 'string', query: true, editable: true },
		phone: { label: '手机号', type: 'string', query: true, editable: true },
		nickname: { label: '昵称', type: 'string', query: true, editable: true },
		password: { label: '密码', type: 'string', query: true, editable: true }, 
		is_use: {
			label: '账号状态',
			type: 'select',
			query: true,
			editable: true,
			options: [
				{ label: '正常', value: 1 },
				{ label: '冻结', value: 0 },
			],
		},
	};

	private TableOps = {
		allowCreate: true,
		allowEdit: true,
		allowDelete: true,
		allowRowEdit: true,
		allowBatchDelete: true,
		allowBatchEdit: true,
		allowImport: false,
	};


	private async mapPermissions(ctx: Context, data: any) {
		const menuIds: string[] = Array.isArray(data?.menuList) ? data.menuList : [];
		const checkedIds: string[] = Array.isArray(data?.permission_ids) ? data.permission_ids : [];
		const menusOfChecked = checkedIds.length ? await ctx.mongo.find("__menu", { query: { _id: { $in: checkedIds } } }) : [];
		console.log("menusOfChecked", menusOfChecked);
		const permissionKeys = menusOfChecked.map((m: any) => m.key);
		return {
			menuList: menuIds || [],
			permission_ids: checkedIds || [],
			permission_menu: permissionKeys || [], // 根据 data?.permission_ids中的 _id 去获取菜单中的 key
		};
	}

	private async buildRoleDoc(ctx: Context, data: any) {
		const field_Schema: any = await this.FieldSchema_System;
		const doc = this.addAndModField(data, field_Schema);
		const perms = await this.mapPermissions(ctx, data);
		return {
			...doc,
			...perms,
			dataScope: "全部",
			depts: [] as any,
		};
	}

	private async validatePermissionStrUnique(ctx: Context, value: string, excludeId?: string) {
		const permission_str = _.trim(value);
		if (_.isEmpty(permission_str)) return;
		const query: Record<string, any> = { permission_str };
		if (excludeId) query._id = { $ne: excludeId };
		const exists = await ctx.mongo.find(this.Collection, { query });
		if (exists.length > 0) throw new Error("权限字符已存在");
	}

	// * 新增角色：角色中带菜单
	addRole = async (ctx: Context) => {
		try {
			const data: any = ctx.request.body;
			console.log("添加角色：", data);

			try {
				await this.validatePermissionStrUnique(ctx, _.get(data, "permission_str", ""));
			} catch (e: any) {
				return ctx.sendError(400, `新增角色错误：${e.message}`);
			}

			const role = await this.buildRoleDoc(ctx, data);
			const newRole: any = {
				...role,
				createTime: new Date(),
				createBy: "admin",
				updateBy: "admin",
				updateTime: new Date(),
			};
			await ctx.mongo.insertOne(this.Collection, newRole);
			return ctx.send("新增角色成功");
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 修改角色：角色中带菜单
	modifyRole = async (ctx: Context) => {
		try {
			// 1、获取前端参数并校验：
			const id = ctx.params.id;
			const data: any = ctx.request.body;

			console.log("编辑角色：", data);

			// return ctx.sendError(400, `修改岗位操作：无iD`);

			if (!id) return ctx.sendError(400, `修改岗位操作：无iD`);

			try {
				await this.validatePermissionStrUnique(ctx, _.get(data, "permission_str", ""), id);
			} catch (e: any) {
				console.log("123", e);
				return ctx.sendError(400, `操作失败：${e?.message}`);
			}

			const role = await this.buildRoleDoc(ctx, data);
			const newRole: any = {
				...role,
				updateBy: "admin",
				updateTime: new Date(),
			};
			console.log("更新后的对象", newRole);
			await ctx.mongo.updateOne(this.Collection, id, newRole);
			return ctx.send("更新角色成功");
		} catch (err: any) {
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

			const find = await ctx.mongo.find(this.Collection);
			// 动态映射 permission_menu keys，确保与当前 menu 表一致
			const list = [] as any[];
			for (const role of find) {
				const ids: string[] = Array.isArray(role.permission_ids) ? role.permission_ids : [];
				const menus = ids.length ? await ctx.mongo.find("__menu", { query: { _id: { $in: ids } } }) : [];
				const keys = menus.map((m: any) => m.key);
				list.push({ ...role, permission_menu: keys });
			}
			return ctx.send({ list, page: 1, pageSize: 10, total: list.length });
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};

	// * 删除角色
	delRole = async (ctx: Context) => {
		try {
			const id = ctx.params.id;
			console.log("删除角色 参数：", id);
			if (!id) return ctx.sendError(400, "未获取到id");
			const del = await ctx.mongo.deleteOne(this.Collection, id);
			return ctx.send(del);
		} catch (err: any) {
			return ctx.sendError(500, err.message);
		}
	};
}

export default new Role();
