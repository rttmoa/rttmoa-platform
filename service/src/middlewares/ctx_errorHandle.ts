import { Context } from 'koa';

const errorHandle = (ctx: Context, next: () => Promise<any>) => {
	// console.log('errorHandle/ctx.', ctx.body);

	return next().catch((err: any) => {
		console.log('middlewares/errorHandle 捕捉错误 ==> ', err.message); 
		if (err.status === 401 && err.name === 'UnauthorizedError') {
			ctx.status = 401;

			let message;
			if (err.message.includes('expired')) {
				message = 'Token expired. Please log in again.';
			} else {
				message = err.message
			}

			return ctx.sendError(401, message);
		} else {
			// 其他非鉴权错误
			ctx.status = err.status || 500;
			return ctx.sendError(ctx.status, err.message || 'Server error.');
		}
	});
};
export default errorHandle;

// const errorHandle = () => {
// 	return async (ctx: Context, next: () => Promise<any>) => {
// 		try {
// 			await next();
// 		} catch (err) {
// 			// 检查是否是 koajwt 错误
// 			if (err.status === 401 && err.name === 'UnauthorizedError') {
// 				ctx.status = 401;

// 				let message;
// 				if (err.message.includes('expired')) {
// 					message = 'Token expired. Please log in again.';
// 				} else {
// 					message = 'Invalid or malformed token.';
// 				}

// 				return ctx.sendError(401, message);
// 			} else {
// 				// 其他非鉴权错误
// 				ctx.status = err.status || 500;
// 				return ctx.sendError(ctx.status, err.message || 'Server error.');
// 			}
// 		}
// 	};
// };

// export default errorHandle;
