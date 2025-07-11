import { Context } from "koa";
import Basic from "../basic";
const os = require("os");
const si = require("systeminformation");

class ServerMonitor extends Basic {
	constructor() {
		super();
	}

	// 只查询、无增删改
	// 获取计算机的信息：系统信息、ip地址、项目运行时间、cpu、内存、交换区、磁盘
	GetMonitor = async (ctx: Context) => {
		return this.handle(ctx, async () => {
			const uptime = os.uptime(); // 以秒为单位
			const totalDays = Math.floor(uptime / (60 * 60 * 24));

			const system = `${os.type()} ${os.release()}`; // 系统类型 + 版本号

			const ips: any = Object.values(os.networkInterfaces())
				.flat()
				.find((i: any) => i.family === "IPv4" && !i.internal);
			const ip: any = ips.address || "未知";
			const cpuLoad = await si.currentLoad();
			const memory = await si.mem();
			const disk = await si.fsSize(); // 磁盘：CDE的大小、size: 475582689280,
			const swap = await si.mem();

			const info = {
				system, // 操作系统版本
				ip, // 本机IP地址
				run: `项目不间断运行：${totalDays}天`,
				cpu: `${cpuLoad.currentLoad.toFixed(2)}%`, // CPU 使用率
				memory: `${((memory.active / memory.total) * 100).toFixed(2)}%`, // 内存使用率
				switchArea: `${((swap.swaptotal ? swap.swapused / swap.swaptotal : 0) * 100).toFixed(2)}%`, // 交换区使用率
				disk: `${disk[0] ? disk[0].use.toFixed(2) : "0.00"}%`, // 主磁盘使用率
			};

		 
			// * CPU
			// 获取 CPU 核心数
			const cpus = await si.cpu();
			const cpuCores = cpus.cores;
			// 获取 CPU 使用情况（用户、系统、空闲等）
			const currentLoad = await si.currentLoad();
			const cpuUsage = currentLoad.currentLoad; // 用户 + 系统的 CPU 使用率
			console.log(`CPU 核心数: ${cpuCores}`);
			console.log(`用户使用率: ${cpuUsage.toFixed(2)}%`);

			// * 内存
			const totalMemory = os.totalmem(); // 获取总内存（字节）
			const freeMemory = os.freemem(); // 获取剩余内存（字节）
			const usedMemory = totalMemory - freeMemory; // 已用内存
			const memoryUsage = ((usedMemory / totalMemory) * 100).toFixed(2); // 使用率（百分比）
			console.log(`总内存: ${(totalMemory / 1024 ** 3).toFixed(2)} GB`);
			console.log(`已用内存: ${(usedMemory / 1024 ** 3).toFixed(2)} GB`);
			console.log(`剩余内存: ${(freeMemory / 1024 ** 3).toFixed(2)} GB`);
			console.log(`内存使用率: ${memoryUsage}%`);

			// * 系统
			const platform = os.platform(); // 操作系统类型   win32
			const arch = os.arch(); // 系统架构    x64
			console.log(`操作系统: ${platform}`);
			console.log(`系统架构: ${arch}`);

			return info;
		});
	};
}

export default new ServerMonitor();
