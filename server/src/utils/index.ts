import axios from "axios";

export function time() {
	Date.prototype.format = function (format: any) {
		var o: any = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			S: this.getMilliseconds(), //millisecond
		};
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	return new Date().format("yyyy/MM/dd hh:mm:ss");
}
export function time_h() {
	Date.prototype.format = function (format: any) {
		var o: any = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			S: this.getMilliseconds(), //millisecond
		};
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	return new Date().format("yyyy-MM-dd hh:mm:ss");
}
export function time_horizontal() {
	Date.prototype.format = function (format: any) {
		var o: any = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			S: this.getMilliseconds(), //millisecond
		};
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	return new Date().format("yyyy-MM-dd_hh.mm.ss"); // jk_2026-02-25—08.52.48.json
}

// 获取用户 iP
const getUserIp = (ctx: any) => {
	const res = ctx.req.headers["x-forwarded-for"] || ctx.req.headers["x-real-ip"] || ctx.req.headers.remote_addr || ctx.req.headers.client_ip || ctx.req.connection.remoteAddress || ctx.req.socket.remoteAddress || ctx.req.connection.socket.remoteAddress || ctx.ip;
	return res.match(/[.\d\w]+/g).join("");
};

export function getBrowser(userAgent: string) {
	let browser = "Unknown";
	let version = "Unknown";

	// Edge (Chromium-based) and Chrome share a lot of keywords
	if (userAgent.includes("Edg/")) {
		browser = "Edge";
		const match = userAgent.match(/Edg\/(\d+\.\d+\.\d+\.\d+)/);
		if (match && match[1]) {
			version = match[1];
		}
	} else if (userAgent.includes("Chrome/")) {
		browser = "Chrome";
		const match = userAgent.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
		if (match && match[1]) {
			version = match[1];
		}
	} else if (userAgent.includes("Firefox/")) {
		browser = "Firefox";
		const match = userAgent.match(/Firefox\/(\d+\.\d+)/);
		if (match && match[1]) {
			version = match[1];
		}
	} else if (userAgent.includes("Safari/")) {
		// Safari needs to be checked after Chrome, as Chrome's UA also contains "Safari"
		browser = "Safari";
		const match = userAgent.match(/Version\/(\d+\.\d+\.\d+)/);
		if (match && match[1]) {
			version = match[1];
		}
	} else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
		browser = "IE";
		if (userAgent.includes("MSIE")) {
			const match = userAgent.match(/MSIE (\d+\.\d+)/);
			if (match && match[1]) {
				version = match[1];
			}
		} else if (userAgent.includes("Trident/")) {
			// IE 11
			const match = userAgent.match(/rv:(\d+\.\d+)/);
			if (match && match[1]) {
				version = match[1];
			}
		}
	}

	return {
		browser,
		version,
	};
}

export async function getIpLocation(ip: string) {
	const res = await axios.get(`http://ip-api.com/json/${ip}?lang=zh-CN`);
	return res.data;
}
