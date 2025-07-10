/* eslint-disable strict */

// & 文件路径：egg/app/middleware/auth.js
module.exports = () => {
  // 这里是自己验证token、验证路由白名单
	return async function auth(ctx, next) {
		console.dir(
			"(************************************************************** 中 间 件 权限************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************ )"
		);
		const currentUrl = ctx.request.url;
		// console.log('currentUrl', currentUrl); // 获取用户：/api/v1/user?page=1&pageSize=20  &  退出：/api/v1/admin/logout
		if (currentUrl.indexOf("/web") > -1) {
			return await next();
		}

		// 后台校验用户访问权限。
		const urlWhiteList = ["/admin/login", "/admin/logout"];
		const whiteList = ctx.app.config.auth.whiteList; // ['admin']
		const secret = ctx.app.config.jwt.secret;

		const isNoValidate = urlWhiteList.some(item => currentUrl.indexOf(item) > -1);
		// 如果是白名单，直接通过验证
		if (isNoValidate) {
			return await next();
		}

		const authorization = ctx.request.header.authorization;
		// console.log(ctx.request.header, Object.keys(ctx.request.header)); // ! 查看请求头信息
		if (authorization) {
			const token = authorization.replace("Bearer ", "");
			const decode = await ctx.app.jwt.verify(token, secret); // 根据token确认是不是admin，如果不是返回：data: {error: 'invalid signature'}
			// console.log(decode);
			// _doc: {
			//   _id: '62f6094da6d9f13d94235b0b',
			//   userName: 'admin',
			//   password: '$2b$10$YB2cpOeL34pPRNT8euymWOmes3pQeJLlSrv3WU7ZKmRDKjFFY/U6K'
			// },
			const userName = decode._doc.userName;
			if (whiteList.includes(userName)) {
				await next();
			} else {
				ctx.helper.success({
					ctx,
					res: {
						status: 403,
						msg: "无权限访问",
						code: 0,
						data: null,
					},
				});
			}
		} else {
			await next();
		}
	};
};
