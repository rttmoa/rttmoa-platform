const errorHandle = (ctx: any, next: any) => {
    return next().catch((err: any) => {
        
        console.log("捕捉错误 ==> ", err.message)
        if(err.status === 401){
            ctx.status = 401;
            return ctx.sendError('000004', '未授权，访问被拒绝');
        }else{
            throw err;
        }
    })
}
export default errorHandle 