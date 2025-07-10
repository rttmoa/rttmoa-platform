const mysql = require('mysql')

// 创建mysql线程池
let pool = mysql.createPool({
    user: 'root',
    password: 'root',
    database: 'sql-exercises',
    host: '127.0.0.1',
    port: '3306'
})

const dbHandle = () => { 
    const execute = () => {
        return async (sql: any, values: any) => { 
            return new Promise((resolve, reject) => {
                pool.getConnection(function (connError: any, connection: any) {
                    console.log(new Date());
                    const connQuery = connection.query(sql, values, (queryError: any, data: any, fields: any) => {
                        queryError ? reject(queryError) : resolve(data) 
                        connection.release()
                    })
                    connError ? reject(connError) : connQuery;
                })
            })
        }
    }

    return async (ctx: any, next: any) => {
        ctx.executeSql = execute()   
        await next()
    }
}
export default dbHandle 
