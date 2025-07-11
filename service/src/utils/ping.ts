const ping = require("ping");
const ip01 = "127.222.1.11";
const ip02 = "192.168.10.170";

async function pingIP01() {
	try {
		const res = await ping.promise.probe(ip01, { timeout: 1 });
		console.log(`[${new Date().toLocaleTimeString()}] ${ip01} is ${res.alive ? "alive" : "dead"}`);
	} catch (err) {
		console.error("Ping error:", err.message);
	}
	setTimeout(pingIP01, 2000); // 下一次 ping 延迟 2 秒
}


async function pingIP02() {
	try {
		const res = await ping.promise.probe(ip02, { timeout: 1 });
		console.log(`[${new Date().toLocaleTimeString()}] ${ip02} is ${res.alive ? "alive" : "dead"}`);
	} catch (err) {
		console.error("Ping error:", err.message);
	}
	setTimeout(pingIP02, 2000); // 下一次 ping 延迟 2 秒
}

export default { pingIP01, pingIP02 };
