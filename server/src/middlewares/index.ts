// & ctx 可以直接调用    ctx.sendHandle    ctx.dbHandle

export { default as _dbHandle } from './app/c.dbHandle' //        ctx.mysql
export { default as _errorHandle } from './app/a.errorHandle' //  ctx.errorHandle
export { default as _sendHandle } from './app/c.sendHandle' //    ctx.sendError
export { default as _Mongo } from './app/c.mongo' //              ctx.mongo
export { default as _Http } from './app/c.http' //               ctx.http


export { default as _logger } from './app/a.logger' //            app.use(logger)

export { default as _CrossDomain } from './app/a.crossDomain' //  app.use(_CrossDomain)
export { default as _Public } from './app/a.public' //            app.use(_Public)
export { default as _Security } from './app/a.security' //        app.use(_Security)





// ctx.dbHandle

// ctx.helper.moment().unix(),

// ctx.cookies.set('token', '', { maxAge: 0 });

// params = ctx.helper.filterEmptyField(params);
