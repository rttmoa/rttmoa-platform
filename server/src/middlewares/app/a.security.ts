import * as helmet from "koa-helmet";


// * 提供重要的安全标头，使您的应用程序更安全  
const _Security = (): any => { 
	return async (ctx: any, next: () => Promise<any>): Promise<void> => {
		helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com", "fonts.googleapis.com"],
        fontSrc: ["'self'", "fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "online.swagger.io", "validator.swagger.io"],
      },
    })
		await next();
	};
};

export default _Security