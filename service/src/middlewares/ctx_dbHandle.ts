const mysql = require("mysql");

// 创建mysql线程池
let pool = mysql.createPool({
	user: "root",
	password: "root",
	database: "tanhua",
	host: "127.0.0.1",
	port: "3306",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

const dbHandle = () => {
	// 创建方法 ,sql:sql语句，values：字段对应的值
	// 例如： insert into users(name) values (?) 中的 ? 就是从values中取得
	const execute = () => {
		return async (sql: any, values: any) => {
			// console.log(sql)
			// 比如手机号获取验证码接口：
			// select status from dt_users where mobile =15303663375
			// update dt_users set vcode = 888888,login_time=NOW() where mobile =15303663375
			// console.log(values)
			return new Promise((resolve, reject) => {
				pool.getConnection(function (connError: any, connection: any) {
					const connQuery = connection.query(sql, values, (queryError: any, data: any, fields: any) => {
						queryError ? reject(queryError) : resolve(data);
						connection.release();
						// pool.end() // 关闭连接
					});
					connError ? reject(connError) : connQuery;
				});
			});
		};
	}; 

	return async (ctx: any, next: any) => {
		ctx.executeSql = execute(); // 注册全局 ctx
		// console.log(ctx.executeSql) // [AsyncFunction (anonymous)]
		await next();
	};
};
export default dbHandle;



// 你的代码使用了 **`mysql`（回调版）**，但 `db.getConnection().then(...).catch(...)` 这样的写法需要使用 **`mysql2/promise`（支持 `async/await` 和 `Promise`）**。

// ---

// ## **✅ 修改为 `mysql2/promise` 版本**
// **安装 `mysql2`（如果未安装）：**
// ```sh
// npm install mysql2
// ```

// ### **🔹 修改 `dbHandle.ts`**
// ```ts
// import mysql from "mysql2/promise";

// // 创建 MySQL 连接池（支持 Promise）
// const pool = mysql.createPool({
//   user: "root",
//   password: "root",
//   database: "tanhua",
//   host: "127.0.0.1",
//   port: 3306,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // 测试数据库连接
// pool.getConnection()
//   .then((conn) => {
//     console.log("✅ MySQL 数据库连接成功！");
//     conn.release(); // 释放连接
//   })
//   .catch((err) => {
//     console.error("❌ MySQL 连接失败:", err);
//   });

// // 数据库中间件
// const dbHandle = () => {
//   return async (ctx: any, next: any) => {
//     ctx.executeSql = async (sql: string, values?: any[]) => {
//       try {
//         const [rows] = await pool.execute(sql, values);
//         return rows;
//       } catch (error) {
//         console.error("❌ SQL 执行错误:", error);
//         throw error;
//       }
//     };
//     await next();
//   };
// };

// export default dbHandle;
// export { pool }; // 允许其他模块直接使用数据库连接池
// ```

// ---

// ## **✅ 代码优化点**
// 1. **改用 `mysql2/promise`**（支持 `async/await`）。
// 2. **测试数据库连接** `pool.getConnection().then(...).catch(...)`。
// 3. **优化 SQL 执行逻辑**：
//    - 直接用 `pool.execute(sql, values)` 代替 `pool.getConnection()` + `connection.query()` + `connection.release()`。
//    - `ctx.executeSql` 直接返回查询结果，简化代码。
// 4. **导出 `pool`**，方便其他文件复用。

// ---

// ## **✅ 在 Koa 里使用**
// 在 `router.ts` 或 `controller.ts` 里，你可以这样使用：
// ```ts
// router.get("/users", async (ctx) => {
//   const users = await ctx.executeSql("SELECT * FROM users");
//   ctx.body = { code: 200, data: users };
// });
// ```

// 这样，整个数据库连接管理变得更高效、更现代化，适配 **Docker + Koa** 部署 🚀