let document = [
	{ id: 1, material_code__c: "16949", production_date__c: "2026-05-27" },
	{ id: 2, material_code__c: "16949", production_date__c: "2026-05-28" },
	{ id: 3, material_code__c: "16949", production_date__c: "2026-05-29" },
	{ id: 4, material_code__c: "16949", production_date__c: "2026-05-30" },
];
let chuyu = [
	{ id: 11, material_code__c: "16949", production_date__c: "2026-05-28", maduo_time__c: "2026/05/28 22:17:19" },
	{ id: 12, material_code__c: "16949", production_date__c: "2026-05-28", maduo_time__c: "2026/05/28 11:00:00" },
	{ id: 13, material_code__c: "16949", production_date__c: "2026-05-29", maduo_time__c: "2026/05/29 03:00:00" },
	{ id: 14, material_code__c: "16949", production_date__c: "2026-05-29", maduo_time__c: "2026/05/29 08:20:00" },
	{ id: 15, material_code__c: "16949", production_date__c: "2026-05-29", maduo_time__c: "2026/05/29 19:20:00" },
	{ id: 16, material_code__c: "16949", production_date__c: "2026-05-30", maduo_time__c: "2026/05/30 04:20:00" },
	{ id: 17, material_code__c: "16949", production_date__c: "2026-05-30", maduo_time__c: "2026/05/23 04:20:00" },
	{ id: 18, material_code__c: "16949", production_date__c: "2026-05-30", maduo_time__c: "2026/05/27 04:20:00" },
	{ id: 19, material_code__c: "16949", production_date__c: "2026-05-30", maduo_time__c: "2026/05/31 04:20:00" },
];

function parseDateTime(dateTimeStr) {
	return new Date(dateTimeStr.replace(/\//g, "-"));
}
function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
// 跨天规则：当天 10:00:00 之前算前一天，10:00:00 及以后算当天
function getMatchProductionDate(maduoTime) {
	const date = parseDateTime(maduoTime);
	const hour = date.getHours();
	if (hour < 10) {
		date.setDate(date.getDate() - 1);
	}
	return formatDate(date);
}

// 传递码垛时间，返回匹配的生产日期，以及是“当天”还是“第二天”
function getMatchProductionInfo(maduoTime) {
	const date = parseDateTime(maduoTime);
	const hour = date.getHours();
	const isNextDay = hour < 10;
	return {
		matchProductionDate: getMatchProductionDate(maduoTime),
		dayType: isNextDay ? "第二天" : "当天",
		isNextDay,
	};
}

for (const element of chuyu) {
	const matchInfo = getMatchProductionInfo(element.maduo_time__c);
	console.log({
		id: element.id,
		maduo_time__c: element.maduo_time__c,
		matchProductionDate: matchInfo.matchProductionDate,
		dayType: matchInfo.dayType,
		isNextDay: matchInfo.isNextDay,
	});
}

// const result = chuyu.map(item => {
// 	const matchProductionDate = getMatchProductionDate(item.maduo_time__c);
// 	const matchedDocument = document.find(doc => {
// 		return doc.material_code__c === item.material_code__c && doc.production_date__c === matchProductionDate;
// 	});
// 	return {
// 		chuyuId: item.id,
// 		material_code__c: item.material_code__c,
// 		maduo_time__c: item.maduo_time__c,
// 		original_production_date__c: item.production_date__c,
// 		matchProductionDate,
// 		matchedDocument,
// 	};
// });
// console.log(result);
