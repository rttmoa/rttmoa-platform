

export interface Config {
    jwtkey: string
    resCodes: any
    // resCodes: {
    //     ok: number
    //     customerError: number
    //     serverError: any // number | string
    // }
    global: any
}

const isDevMode = process.env.NODE_ENV = 'development'

const config: Config = {
    jwtkey: 'tanhua',
    resCodes: {
        ok: 10000,  //正常
        customerError: 10001,  // 业务异常
        serverError: 10002   // 服务器错误
    },
    global: null
}

export { config }