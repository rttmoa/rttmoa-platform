"use strict";

// import AdminModel from '../models/admin/admin'

const AdminModel = {};

class Check {
	constructor() {}
	// ! 检查是否 管理员
	async checkAdmin(req, res, next) {
		const admin_id = req.session.admin_id;
		if (!admin_id || !Number(admin_id)) {
			res.send({
				status: 0,
				type: "ERROR_SESSION",
				message: "亲，您还没有登录",
			});
			return;
		} else {
			const admin = await AdminModel.findOne({ id: admin_id });
			if (!admin) {
				res.send({
					status: 0,
					type: "HAS_NO_ACCESS",
					message: "亲，您还不是管理员",
				});
				return;
			}
		}
		next();
	}

	// ! 检查是否 超级管理员
	async checkSuperAdmin(req, res, next) {
		const admin_id = req.session.admin_id;
		if (!admin_id || !Number(admin_id)) {
			res.send({
				status: 0,
				type: "ERROR_SESSION",
				message: "亲，您还没有登录",
			});
			return;
		} else {
			const admin = await AdminModel.findOne({ id: admin_id });
			if (!admin || admin.status != 2) {
				res.send({
					status: 0,
					type: "HAS_NO_ACCESS",
					message: "亲，您的权限不足",
				});
				return;
			}
		}
		next();
	}
}

export default new Check();
