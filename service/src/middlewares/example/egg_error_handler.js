/* eslint-disable strict */


//& 文件路径： egg/app/middleware/error_handler.js
module.exports = () => {
	return async function errorHandler(ctx, next) {
		try {
			await next();
		} catch (err) {
			// 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
			ctx.app.emit("error", err, ctx);

			let status = err.status || 500;
			console.log("err", err.message);
			if (err.message === "jwt expired") {
				status = 401;
			}
			// 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
			const error = status === 500 && ctx.app.config.env === "prod" ? "Internal Server Error" : err.message;

			// 从 error 对象上读出各个属性，设置到响应中
			ctx.body = { error };
			if (status === 422) {
				ctx.body.detail = err.errors;
			}
			ctx.status = status;
		}
	};
};
