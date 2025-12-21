const Redis = require('ioredis');
require('dotenv-flow').config(process.cwd());
const redis = new Redis(process.env.CACHER);

// redis.flushdb(() => {
//     console.log(`flushdb: ${process.env.CACHER}`);
//     process.exit(0)
// });

(async () => {
	try {
		// 1. 获取 key 数量
		const count = await redis.dbsize();
		console.log(`当前 Redis 数据库中有 ${count} 个 key`);

		// 2. 获取所有 key（注意：如果 key 非常多，慎用）
		const keys = await redis.keys('*');
		console.log(`所有 key(初始):`, keys.length);

		// // 3. 你也可以获取每个 key 的值（仅调试用）
		// for (const key of keys) {
		//   const type = await redis.type(key);
		//   let value;
		//   if (type === 'string') {
		//     value = await redis.get(key);
		//   } else if (type === 'hash') {
		//     value = await redis.hgetall(key);
		//   } else if (type === 'list') {
		//     value = await redis.lrange(key, 0, -1);
		//   } else if (type === 'set') {
		//     value = await redis.smembers(key);
		//   } else {
		//     value = '不支持的类型';
		//   }
		//   console.log(`键名：${key}，类型：${type}，值：`, value);
		// }

		// 4. 清空数据库
		await redis.flushdb();
		console.log(`✅ 已清空 Redis 数据库`);

		const keys2 = await redis.keys('*');
		console.log(`所有 key(结束):`, keys2.length);
	} catch (err) {
		console.error('❌ 出错：', err);
	} finally {
		process.exit(0);
	}
})();
