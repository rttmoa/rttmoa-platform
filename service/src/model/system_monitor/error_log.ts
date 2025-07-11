


const error_log = new Schema(
	{
		user: { type: String, required: true }, //  用户名
		ip: { type: String, required: false }, // 192.184.231.22
		ip_origin: { type: String, required: false }, // ip来源
		desc: { type: String, required: false }, // 描述 
		browser: { type: String, required: false }, // 浏览器
		created: { type: Date, required: false }, // 创建日期
	},
	{ collection: "error_log", versionKey: false, }
); 
