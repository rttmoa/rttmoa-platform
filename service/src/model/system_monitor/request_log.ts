


const request_log = new Schema(
	{  
		user: String, // 用户名
		ip: String, // ip：141.11.139.199
		ip_origin: String, // ip 来源：法国
		desc: String, // 描述：配置邮件
		browser: String, // 浏览器：Chrome 137
		duration: String, // 请求耗时：2ms
		method: String,  // 请求方法: GET
		params: String, // 请求参数: {"code":"-2","password":"******","username":"admin","uuid":"captcha_code:0b24eb27943849f88fd8e90baabf1313"}
		created: Date, 
	},
	{ collection: "request_log", versionKey: false, }
);
