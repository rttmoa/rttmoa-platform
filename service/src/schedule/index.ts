import { CronJob } from 'cron';
import { mongoService } from '../middlewares/mongo/_dbMongoService';
const chalk = require('chalk');

let time = {
	t1: '0 * * * *', // 每小时；0 * * * *  || 每分钟：* * * * *  ||  https://zhuanlan.zhihu.com/p/648015270
};

console.log('定时任务执行');

new CronJob(time.t1, async () => {
	console.log(chalk.yellow('⚠️ .每小时执行一次 cron 作业'));
	// const count = await mongoService.count('__user');
	// console.log('count', count);

	// const result = await mongoService.deleteMany('__abc', {
	// 	createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
	// });
	// console.log('del', result);
}).start();
