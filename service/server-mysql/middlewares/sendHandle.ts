const sendHandle = () => {

    // 处理请求成功方法
    const render = (ctx: any) => {
        return (data: any, msg = '请求成功', page: any) => {
            ctx.set('Content-Type', 'application/json')
            ctx.body = {
                code: '10000',
                msg,
                data,
                ...page
            }
        }
    }

    // 处理请求失败方法
    const renderError = (ctx: any) => {
        return (code: any, msg = '请求失败') => {
            ctx.set('Content-Type', 'application/json')
            ctx.body = {
                code,
                data: null,
                msg
            }
        }
    }

    return async (ctx: any, next: any) => {
        ctx.send = render(ctx)
        ctx.sendError = renderError(ctx)
        await next()
    }
}
export default sendHandle 