/*获取网址参数*/
function getURL(name: string) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return r[2]
	return null
}

/*获取全部url参数,并转换成json对象*/
function getUrlAllParams(url: string) {
	var url = url ? url : window.location.href
	var _pa = url.substring(url.indexOf('?') + 1),
		_arrS = _pa.split('&'),
		_rs = {}
	for (var i = 0, _len = _arrS.length; i < _len; i++) {
		var pos = _arrS[i].indexOf('=')
		if (pos == -1) {
			continue
		}
		// var name = _arrS[i].substring(0, pos),
		//   value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
		// _rs[name] = value;
	}
	return _rs
}

/*删除url指定参数，返回url*/
function delParamsUrl(url: string, name: string | number) {
	var baseUrl = url.split('?')[0] + '?'
	var query = url.split('?')[1]
	// if (query.indexOf(name) > -1) {
	//   var obj = {};
	//   var arr = query.split("&");
	//   for (var i = 0; i < arr.length; i++) {
	//     arr[i] = arr[i].split("=");
	//     obj[arr[i][0]] = arr[i][1];
	//   }
	//   delete obj[name];
	//   var url =
	//     baseUrl +
	//     JSON.stringify(obj)
	//       .replace(/[\"\{\}]/g, "")
	//       .replace(/\:/g, "=")
	//       .replace(/\,/g, "&");
	//   return url;
	// } else {
	//   return url;
	// }
}

/*
    判断对象是否相等 ??
 */
export const diff_obj = (obj1: { [x: string]: any }, obj2: { [x: string]: any }): boolean => {
	let o1 = obj1 instanceof Object
	let o2 = obj2 instanceof Object
	if (!o1 || !o2) {
		return obj1 === obj2
	}
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false

	for (let attr in obj1) {
		let t1 = obj1[attr] instanceof Object
		let t2 = obj2[attr] instanceof Object
		if (t1 && t2) {
			return diff_obj(obj1[attr], obj2[attr])
		} else if (obj1[attr] !== obj2[attr]) {
			return false
		}
	}
	return true
}
const obj1 = { name: 'zhangsan', age: 18, info: { eat: '吃', do: 'do' } }
const obj2 = { name: 'zhangsan', age: 18, info: { eat: '吃', do: 'do' } }

/*获取十六进制随机颜色*/
function getRandomColor() {
	return (
		'#' +
		(function (h) {
			return new Array(7 - h.length).join('0') + h
		})(((Math.random() * 0x1000000) << 0).toString(16))
	)
}

/*图片加载*/
function imgLoadAll(arr: string | any[], callback: () => any) {
	var arrImg = []
	for (var i = 0; i < arr.length; i++) {
		var img = new Image()
		img.src = arr[i]
		img.onload = function () {
			arrImg.push(this)
			if (arrImg.length == arr.length) {
				callback && callback()
			}
		}
	}
}

/*音频加载*/
function loadAudio(src: string | undefined, callback: ((this: GlobalEventHandlers, ev: Event) => any) | null) {
	var audio = new Audio(src)
	audio.onloadedmetadata = callback
	audio.src = src!
}

/*DOM转字符串*/
function domToStirng(htmlDOM: any) {
	var div = document.createElement('div')
	div.appendChild(htmlDOM)
	return div.innerHTML
}

/*字符串转DOM*/
function stringToDom(htmlString: string) {
	var div = document.createElement('div')
	div.innerHTML = htmlString
	return div.children[0]
}

/**
 * 光标所在位置插入字符，并设置光标位置
 *
 * @param {dom} 输入框
 * @param {val} 插入的值
 * @param {posLen} 光标位置处在 插入的值的哪个位置
 */
function setCursorPosition(
	this: any,
	dom: { selectionStart: number; focus: () => void; setSelectionRange: (arg0: any, arg1: any) => void; value: string | any[] },
	val: string | any[],
	posLen: any
) {
	var cursorPosition = 0
	if (dom.selectionStart) {
		cursorPosition = dom.selectionStart
	}
	this.insertAtCursor(dom, val)
	dom.focus()
	console.log(posLen)
	dom.setSelectionRange(dom.value.length, cursorPosition + (posLen || val.length))
}

/*光标所在位置插入字符*/
function insertAtCursor(dom: { focus: () => void; selectionStart: string; selectionEnd: any; scrollTop: any; value: string }, val: string | any[]) {
	if (document.getSelection!) {
		dom.focus()
		// self = document.getSelection.createRange();
		// self.text = val;
		// self.select();
	} else if (dom.selectionStart || dom.selectionStart == '0') {
		let startPos = dom.selectionStart
		let endPos = dom.selectionEnd
		let restoreTop = dom.scrollTop
		dom.value = dom.value.substring(0, Number(startPos)) + val + dom.value.substring(endPos, dom.value.length)
		if (restoreTop > 0) {
			dom.scrollTop = restoreTop
		}
		dom.focus()
		dom.selectionStart = startPos + val.length
		dom.selectionEnd = startPos + val.length
	} else {
		dom.value += val
		dom.focus()
	}
}

/**
 * @description 将数字转换为大写金额
 * changeToChinese(420002.32) // 肆拾贰万零贰元叁角贰分
 */
export function changeToChinese(Num: any) {
	//判断如果传递进来的不是字符的话转换为字符
	if (typeof Num == 'number') {
		Num = new String(Num)
	}
	Num = Num.replace(/,/g, '') //替换tomoney()中的“,”
	Num = Num.replace(/ /g, '') //替换tomoney()中的空格
	Num = Num.replace(/￥/g, '') //替换掉可能出现的￥字符
	if (isNaN(Num)) {
		//验证输入的字符是否为数字
		//alert("请检查小写金额是否正确");
		return ''
	}
	//字符处理完毕后开始转换，采用前后两部分分别转换
	var part = String(Num).split('.')
	var newchar = ''
	//小数点前进行转化
	for (var i = part[0].length - 1; i >= 0; i--) {
		if (part[0].length > 10) {
			return ''
			//若数量超过拾亿单位，提示
		}
		var tmpnewchar = ''
		var perchar: any = part[0].charAt(i)
		switch (perchar) {
			case '0':
				tmpnewchar = '零' + tmpnewchar
				break
			case '1':
				tmpnewchar = '壹' + tmpnewchar
				break
			case '2':
				tmpnewchar = '贰' + tmpnewchar
				break
			case '3':
				tmpnewchar = '叁' + tmpnewchar
				break
			case '4':
				tmpnewchar = '肆' + tmpnewchar
				break
			case '5':
				tmpnewchar = '伍' + tmpnewchar
				break
			case '6':
				tmpnewchar = '陆' + tmpnewchar
				break
			case '7':
				tmpnewchar = '柒' + tmpnewchar
				break
			case '8':
				tmpnewchar = '捌' + tmpnewchar
				break
			case '9':
				tmpnewchar = '玖' + tmpnewchar
				break
		}
		switch (part[0].length - i - 1) {
			case 0:
				tmpnewchar = tmpnewchar + '元'
				break
			case 1:
				if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
				break
			case 2:
				if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
				break
			case 3:
				if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
				break
			case 4:
				tmpnewchar = tmpnewchar + '万'
				break
			case 5:
				if (perchar != 0) tmpnewchar = tmpnewchar + '拾'
				break
			case 6:
				if (perchar != 0) tmpnewchar = tmpnewchar + '佰'
				break
			case 7:
				if (perchar != 0) tmpnewchar = tmpnewchar + '仟'
				break
			case 8:
				tmpnewchar = tmpnewchar + '亿'
				break
			case 9:
				tmpnewchar = tmpnewchar + '拾'
				break
		}
		var newchar = tmpnewchar + newchar
	}
	//小数点之后进行转化
	if (Num.indexOf('.') != -1) {
		if (part[1].length > 2) {
			// alert("小数点之后只能保留两位,系统将自动截断");
			part[1] = part[1].substr(0, 2)
		}
		for (i = 0; i < part[1].length; i++) {
			tmpnewchar = ''
			perchar = part[1].charAt(i)
			switch (perchar) {
				case '0':
					tmpnewchar = '零' + tmpnewchar
					break
				case '1':
					tmpnewchar = '壹' + tmpnewchar
					break
				case '2':
					tmpnewchar = '贰' + tmpnewchar
					break
				case '3':
					tmpnewchar = '叁' + tmpnewchar
					break
				case '4':
					tmpnewchar = '肆' + tmpnewchar
					break
				case '5':
					tmpnewchar = '伍' + tmpnewchar
					break
				case '6':
					tmpnewchar = '陆' + tmpnewchar
					break
				case '7':
					tmpnewchar = '柒' + tmpnewchar
					break
				case '8':
					tmpnewchar = '捌' + tmpnewchar
					break
				case '9':
					tmpnewchar = '玖' + tmpnewchar
					break
			}
			if (i == 0) tmpnewchar = tmpnewchar + '角'
			if (i == 1) tmpnewchar = tmpnewchar + '分'
			newchar = newchar + tmpnewchar
		}
	}
	//替换所有无用汉字
	while (newchar.search('零零') != -1) newchar = newchar.replace('零零', '零')
	newchar = newchar.replace('零亿', '亿')
	newchar = newchar.replace('亿万', '亿')
	newchar = newchar.replace('零万', '万')
	newchar = newchar.replace('零元', '元')
	newchar = newchar.replace('零角', '')
	newchar = newchar.replace('零分', '')
	if (newchar.charAt(newchar.length - 1) == '元') {
		newchar = newchar + '整'
	}
	return newchar
}
