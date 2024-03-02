/**
 * 去除空格
 * @param  {str}
 * @param  {type} type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
export function trim(str: string, type: number) {
	type = type || 1;
	switch (type) {
		case 1:
			return str.replace(/\s+/g, "");
		case 2:
			return str.replace(/(^\s*)|(\s*$)/g, "");
		case 3:
			return str.replace(/(^\s*)/g, "");
		case 4:
			return str.replace(/(\s*$)/g, "");
		default:
			return str;
		// trim(" s   ss 123 1   ", 1) // "sss1231"
		// trim(" s   ss 123 1   ", 2) // "s   ss 123 1"
		// trim(" s   ss 123 1   ", 3) // "s   ss 123 1   "
		// trim(" s   ss 123 1   ", 4) // " s   ss 123 1"
	}
}

/**
 * 字符转换
 * @param  {str}
 * @param  {type} type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
 * @return {String}
 */
export function changeCase(str: string, type: number) {
	type = type || 4;
	switch (type) {
		case 1:
			return str.replace(/\b\w+\b/g, function (word: string) {
				return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
			});
		case 2:
			return str.replace(/\b\w+\b/g, function (word: string) {
				return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
			});
		case 3:
			return str
				.split("")
				.map(function (word: string) {
					if (/[a-z]/.test(word)) {
						return word.toUpperCase();
					} else {
						return word.toLowerCase();
					}
				})
				.join("");
		case 4:
			return str.toUpperCase();
		case 5:
			return str.toLowerCase();
		default:
			return str;
	}
	// changeCase("abcd", 1) // Abcd
	// changeCase("abcd", 2) // aBCD
	// changeCase("aBcD", 3) // AbCd
	// changeCase("aBcD", 4) // ABCD
	// changeCase("aBcD", 5) // abcd
}

/**
 * 检测密码强度
 * @param str
 */
export function checkPwd(str: any) {
	var Lv = 0;
	if (str.length < 6) {
		return Lv;
	}
	if (/[0-9]/.test(str)) {
		Lv++;
	}
	if (/[a-z]/.test(str)) {
		Lv++;
	}
	if (/[A-Z]/.test(str)) {
		Lv++;
	}
	if (/[.|-|_]/.test(str)) {
		Lv++;
	}
	return Lv;
	// checkPwd("xxAbc123.") // 4
}
