import * as XLSX from "xlsx";

// 蜗牛学苑 https://www.bilibili.com/read/cv28871557/
const useExportExcle = () => {
	const handleExportAll = (header: { [x: string]: string }, dataSource: any[], fileName: any) => {
		const json = dataSource.map((item: { [x: string]: any }) => {
			return Object.keys(item).reduce((dataSource: any, key) => {
				const newKey = header[key] || key;
				dataSource[newKey] = item[key];
				return dataSource;
			}, {});
		});
		const sheet = XLSX.utils.json_to_sheet(json);
		openDownloadDialog(sheet2blob(sheet, undefined), `${fileName}.xlsx`);
	};

	const openDownloadDialog = (url: string | Blob | MediaSource, saveName: string) => {
		if (typeof url == "object" && url instanceof Blob) {
			url = URL.createObjectURL(url); // 创建blob地址
		}
		var aLink: any = document.createElement("a");
		aLink.href = url;
		aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
		var event;
		if (window.MouseEvent) event = new MouseEvent("click");
		else {
			event = document.createEvent("MouseEvents");
			event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		}
		aLink.dispatchEvent(event);
	};

	const sheet2blob = (sheet: XLSX.WorkSheet, sheetName: string | undefined) => {
		sheetName = sheetName || "sheet1";
		var workbook: XLSX.WorkBook = {
			SheetNames: [sheetName],
			Sheets: {}
		};
		workbook.Sheets[sheetName] = sheet; // 生成excel的配置项

		var wopts: XLSX.WritingOptions = {
			bookType: "xlsx", // 要生成的文件类型
			bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
			type: "binary"
		};
		var wbout = XLSX.write(workbook, wopts);
		var blob = new Blob([s2ab(wbout)], {
			type: "application/octet-stream"
		});
		// 字符串转ArrayBuffer
		function s2ab(s: string) {
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
			return buf;
		}
		return blob;
	};

	return { handleExportAll };
};

export default useExportExcle;

// 使用：
// const header = {
// 	address: "地址",
// 	birthday: "生日",
// 	email: "邮箱",
// 	id: "id",
// 	interest: "爱好",
// 	isMarried: "婚姻状态",
// }

// const userList = [
// 	{
// 			"id": 1, "username": "袁丽", "sex": 2, "state": 1, "interest": 2, "isMarried": 1, "role_id": 2, "birthday": "2021-12-05",
// 			"address": "福建省 南平市 政和县", "time": "18:34:21", "email": "a.vcdpvf@tgeycqzqt.su", "key": 0
// 	},

// 	{
// 		"id": 2, "username": "邵强", "sex": 1, "state": 1, "interest": 7, "isMarried": 1, "role_id": 2, "birthday": "2021-12-05",
// 		"address": "河北省 石家庄市 赵县", "time": "18:34:21", "email": "w.nygcvess@jugir.ci", "key": 1
// 	},
// ]

// <Button size="middle" onClick={() => {handleExportAll(header, userList, "用户列表")}}>
// 	导出
// </Button>
