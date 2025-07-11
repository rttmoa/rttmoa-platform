


const server_monitor = new Schema(
	{
		system: { type: String, required: true }, //  系统版本
		ip: { type: String, required: false }, // 192.184.231.22
		run: { type: String, required: false }, // 项目不间断运行：90天
		cpu: { type: String, required: false }, // cpu使用率
		memory: { type: String, required: false }, // 内存使用率
		switchArea: { type: String, required: false }, // 交换区使用率
		disk: { type: String, required: false }, // 磁盘使用率
	},
	{ collection: "server_monitor", versionKey: false, }
); 
