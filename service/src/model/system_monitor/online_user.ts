


const online_user = new Schema(
	{  
		session: String, // 会话编号
		user: String, // 用户名
		user_name: String, // 角色：管理员
		department: String, // 部门
		login_ip: String, // 登陆ip
		login_address: String, // 登陆地点
		login_time: String, // 登陆时间
    browser: String,  // 浏览器
	},
	{ collection: "online_user", versionKey: false, }
);
