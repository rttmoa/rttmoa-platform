// /* eslint-disable no-prototype-builtins */

// interface keyProps {
// 	[key: string]: string | number | undefined | null | void
// }
// // formatObj = {} as keyProps
// /**
//  * #### 格式化时间
//  *
//  * @param  {time} 时间
//  * @param  {cFormat} 格式
//  * @return {String} 字符串
//  *
//  * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
//  */
// function formatTime(time: string | number | Date, cFormat: string) {
// 	if (arguments.length === 0) return null
// 	if ((time + '').length === 10) {
// 		time = +time * 1000
// 	}

// 	var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date
// 	if (typeof time === 'object') {
// 		date = time
// 	} else {
// 		date = new Date(time)
// 	}

// 	var formatObj = {
// 		y: date.getFullYear(),
// 		m: date.getMonth() + 1,
// 		d: date.getDate(),
// 		h: date.getHours(),
// 		i: date.getMinutes(),
// 		s: date.getSeconds(),
// 		a: date.getDay()
// 	}
// 	var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result: string | any[], key: string) => {
// 		var value = formatObj[key]
// 		if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
// 		if (result.length > 0 && value < 10) {
// 			value = '0' + value
// 		}
// 		return value || 0
// 	})
// 	return time_str
// }

// /**
// * #### 返回指定长度的月份集合
// *
// * @param  {time} 时间
// * @param  {len} 长度
// * @param  {direction} 方向：  1: 前几个月;  2: 后几个月;  3:前后几个月  默认 3
// * @return {Array} 数组
// *
// * @example getMonths('2018-1-29', 6, 1)  // ->  ["2018-1", "2017-12", "2017-11", "2017-10", "2017-9", "2017-8", "2017-7"]
// */
// function getMonths(time: string | number | Date, len: number, direction: number) {
// 	var mm = new Date(time).getMonth(),
// 		yy = new Date(time).getFullYear(),
// 		direction = isNaN(direction) ? 3 : direction,
// 		index = mm;
// 	var cutMonth = function (index: number): any[] { // 指定返回的类型， any[]
// 		if (index <= len && index >= -len) {
// 			return direction === 1 ? formatPre(index).concat(cutMonth(++index)) :
// 				direction === 2 ? formatNext(index).concat(cutMonth(++index)) : formatCurr(index).concat(cutMonth(++index))
// 		}
// 		return []
// 	}
// 	var formatNext = function (i: number) {
// 		var y = Math.floor(i / 12),
// 			m = i % 12
// 		return [yy + y + '-' + (m + 1)]
// 	}
// 	var formatPre = function (i: number) {
// 		var y = Math.ceil(i / 12),
// 			m = i % 12
// 		m = m === 0 ? 12 : m
// 		return [yy - y + '-' + (13 - m)]
// 	}
// 	var formatCurr = function (i: number) {
// 		var y = Math.floor(i / 12),
// 			yNext = Math.ceil(i / 12),
// 			m = i % 12,
// 			mNext = m === 0 ? 12 : m
// 		return [yy - yNext + '-' + (13 - mNext), yy + y + '-' + (m + 1)]
// 	}
// 	// 数组去重
// 	var unique = function (arr: any[] | null) {
// 		if (Array.hasOwnProperty('from')) {
// 			return Array.from(new Set(arr));
// 		} else {
// 			var n = {}, r = [];
// 			for (var i = 0; i < arr!.length; i++) {
// 				if (!n[arr[i]]) {
// 					n[arr[i]] = true;
// 					r.push(arr[i]);
// 				}
// 			}
// 			return r;
// 		}
// 	}
// 	return direction !== 3 ? cutMonth(index) : unique(cutMonth(index).sort(function (t1: string | number | Date, t2: string | number | Date) {
// 		return new Date(t1).getTime() - new Date(t2).getTime()
// 	}))
// }

// /**
// * 返回指定长度的天数集合
// *
// * @param  {time} 时间
// * @param  {len} 长度
// * @param  {direction} 方向： 1: 前几天;  2: 后几天;  3:前后几天  默认 3
// * @return {Array} 数组
// *
// * @example date.getDays('2018-1-29', 6) // -> ["2018-1-26", "2018-1-27", "2018-1-28", "2018-1-29", "2018-1-30", "2018-1-31", "2018-2-1"]
// */
// function getDays(time: string | number | Date, len: number, diretion: number) {
// 	var tt = new Date(time)
// 	var getDay = function (day: number) {
// 		var t = new Date(time)
// 		t.setDate(t.getDate() + day)
// 		var m = t.getMonth() + 1
// 		return t.getFullYear() + '-' + m + '-' + t.getDate()
// 	}
// 	var arr = []
// 	if (diretion === 1) {
// 		for (var i = 1; i <= len; i++) {
// 			arr.unshift(getDay(-i))
// 		}
// 	} else if (diretion === 2) {
// 		for (var i = 1; i <= len; i++) {
// 			arr.push(getDay(i))
// 		}
// 	} else {
// 		for (var i = 1; i <= len; i++) {
// 			arr.unshift(getDay(-i))
// 		}
// 		arr.push(tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate())
// 		for (var i = 1; i <= len; i++) {
// 			arr.push(getDay(i))
// 		}
// 	}
// 	return diretion === 1 ? arr.concat([tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()]) :
// 		diretion === 2 ? [tt.getFullYear() + '-' + (tt.getMonth() + 1) + '-' + tt.getDate()].concat(arr) : arr
// }

// /**
// * @param  {s} 秒数
// * @return {String} 字符串
// *
// * @example formatHMS(3610) // -> 1h0m10s
// */
// function formatHMS(s: number) {
// 	var str = ''
// 	if (s > 3600) {
// 		str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's'
// 	} else if (s > 60) {
// 		str = Math.floor(s / 60) + 'm' + s % 60 + 's'
// 	} else {
// 		str = s % 60 + 's'
// 	}
// 	return str
// }

// /*获取某月有多少天*/
// function getMonthOfDay(time: string) {
// 	var date = new Date(time)
// 	var year = date.getFullYear()
// 	var mouth = date.getMonth() + 1
// 	var days

// 	//当月份为二月时，根据闰年还是非闰年判断天数
// 	if (mouth == 2) {
// 		days = year % 4 == 0 ? 29 : 28
// 	} else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
// 		//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
// 		days = 31
// 	} else {
// 		//其他月份，天数为：30.
// 		days = 30
// 	}
// 	return days
// }

// /*获取某年的第一天*/
// function getFirstDayOfYear(time: string) {
// 	var year = new Date(time).getFullYear();
// 	return year + "-01-01 00:00:00";
// }

// /*获取某年最后一天*/
// function getLastDayOfYear(time: string) {
// 	var year = new Date(time).getFullYear();
// 	var dateString = year + "-12-01 00:00:00";
// 	var endDay = getMonthOfDay(dateString);
// 	return year + "-12-" + endDay + " 23:59:59";
// }

// /*获取某年有多少天*/
// function getYearOfDay(time: string) {
// 	var firstDayYear = getFirstDayOfYear(time);
// 	var lastDayYear = getLastDayOfYear(time);
// 	var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000;
// 	return Math.ceil(numSecond / (24 * 3600));
// }

// /*获取某个日期是当年中的第几天*/
// function getDayOfYear(time: string) {
// 	var firstDayYear = getFirstDayOfYear(time);
// 	var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
// 	return Math.ceil(numSecond / (24 * 3600));
// }

// /*获取某个日期在这一年的第几周*/
// function getDayOfYearWeek(time: string) {
// 	var numdays = getDayOfYear(time);
// 	return Math.ceil(numdays / 7);
// }
