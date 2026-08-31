import * as Koa from "koa";
const cors = require("@koa/cors");
 
// * 跨域
const _CrossDomain = (): any => { 
    const middleware = cors({
        origin: "*",
        credentials: true,
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    });
    return async (ctx: any, next: () => Promise<any>): Promise<void> => {
        await middleware(ctx, next);
    };
};

export default _CrossDomain
