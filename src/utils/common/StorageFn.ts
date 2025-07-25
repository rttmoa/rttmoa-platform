/* eslint-disable prefer-rest-params */
const CookieKey = 'globalCookie'

class StorageHandler {
	[x: string]: any
	constructor() {
		this.ls = window.localStorage
		this.ss = window.sessionStorage
	}

	/*-----------------cookie---------------------*/
	/*设置cookie*/
	setCookie(name: string, value: string | number, day: number) {
		var setting = arguments[0]
		if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
			for (var i in setting) {
				var oDate = new Date()
				oDate.setDate(oDate.getDate() + day)
				document.cookie = i + '=' + setting[i] + ';expires=' + oDate
			}
		} else {
			var oDate = new Date()
			oDate.setDate(oDate.getDate() + day)
			document.cookie = name + '=' + value + ';expires=' + oDate
		}
	}

	/*获取cookie*/
	getCookie(name: string) {
		var arr = document.cookie.split('; ')
		for (var i = 0; i < arr.length; i++) {
			var arr2 = arr[i].split('=')
			if (arr2[0] == name) {
				return arr2[1]
			}
		}
		return ''
	}

	/*删除cookie*/
	removeCookie(name: any) {
		this.setCookie(name, 1, -1)
	}

	/*-----------------cookie call---------------------*/
	getCookieToken() {
		return this.getCookie(CookieKey)
	}
	setCookieToken(token: string) {
		return this.setCookie(CookieKey, token, 1)
	}
	removeCookieToken() {
		return this.removeCookie(CookieKey)
	}

	/*-----------------localStorage---------------------*/
	/*设置localStorage*/
	setLocal(key: any, val: any) {
		var setting = arguments[0]
		if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
			for (var i in setting) {
				this.ls.setItem(i, JSON.stringify(setting[i]))
			}
		} else {
			this.ls.setItem(key, JSON.stringify(val))
		}
	}

	/*获取localStorage*/
	getLocal(key: any) {
		if (key) return JSON.parse(this.ls.getItem(key))
		return null
	}

	/*移除localStorage*/
	removeLocal(key: any) {
		this.ls.removeItem(key)
	}

	/*移除所有localStorage*/
	clearLocal() {
		this.ls.clear()
	}

	/*-----------------sessionStorage---------------------*/
	/*设置sessionStorage*/
	setSession(key: any, val: any) {
		var setting = arguments[0]
		if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
			for (var i in setting) {
				this.ss.setItem(i, JSON.stringify(setting[i]))
			}
		} else {
			this.ss.setItem(key, JSON.stringify(val))
		}
	}

	/*获取sessionStorage*/
	getSession(key: any) {
		if (key) return JSON.parse(this.ss.getItem(key))
		return null
	}

	/*移除sessionStorage*/
	removeSession(key: any) {
		this.ss.removeItem(key)
	}

	/*移除所有sessionStorage*/
	clearSession() {
		this.ss.clear()
	}
}
export default StorageHandler
