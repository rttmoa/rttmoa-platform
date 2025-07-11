const errorHandle = (ctx: any, next: any) => {
	return next().catch((err: any) => {
		console.log("app.ts 捕捉错误 ==> ", err.message);
		if (err.status >= 500) {
			ctx.status = err.status || 500;
			return ctx.sendError(ctx.status, ctx?.response?.body || err.message || "Internal server error");
		} else if (err.status === 401) {
			ctx.status = 401;
			return ctx.sendError("000004", "未授权，访问被拒绝");
		} else {
			ctx.status = err.status;
			return ctx.sendError(ctx.status, err.message);
		}
	}); 
};
export default errorHandle;
