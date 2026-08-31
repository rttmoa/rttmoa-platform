export interface Config {
	jwtkey: string;
	resCodes: {
		ok: number;
		customerError: number;
		serverError: number; // number | string
	};
	global: any;
	debugLogging: boolean;
	dbsslconn: boolean;
	cronJobExpression: string;
	port: number;
	jwtSecret: string;
	databaseUrl: string;
}

const isDevMode = process.env.NODE_ENV == "development";

const config: Config = {
	jwtkey: "Upack-Secret", // jwt 密钥（secret），这个密钥非常重要，必须保密！
	resCodes: {
		ok: 10000, // 正常
		customerError: 10001, // 业务异常
		serverError: 500, // 服务器错误 10002
	},
	global: null,
	debugLogging: isDevMode,
	dbsslconn: !isDevMode,
	cronJobExpression: "* * * * *", // 每小时；0 * * * *  || 每分钟：* * * * *
	port: +(process.env.PORT || 3000),
	jwtSecret: process.env.JWT_SECRET || "Upack-Secret",
	databaseUrl: process.env.DATABASE_URL || "postgres://postgres:root@localhost:5432/apidb",
};

export { config };
