// 堆垛机定时执行任务
import { CronJob } from "cron";
const chalk = require("chalk");

let config = {
	cronJobExpression: "0 * * * *", // 每小时；0 * * * *  || 每分钟：* * * * *  ||  https://zhuanlan.zhihu.com/p/648015270
};

//* 定时执行任务
function f1() {
	console.log("定时执行任务 f1");
}
function f2() {
	console.log("定时执行任务 f1");
}
const cron = new CronJob(config.cronJobExpression, () => {
	console.log(chalk.yellow("⚠️ .每小时执行一次 cron 作业"));
	// f1();
	// f2();
});

export { cron };