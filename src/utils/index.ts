/* eslint-disable prettier/prettier */
import { store } from '@/redux'
import { ResPage } from '@/api/interface'
import { RouteObjectType } from '@/routers/interface'
import { RequestData } from '@ant-design/pro-components'
import { isArray, isObject } from './is'

const mode = import.meta.env.VITE_ROUTER_MODE

/** #### 获取当前时间对应的问候语。  */
export function getTimeState() {
	let timeNow = new Date()
	let hours = timeNow.getHours()
	if (hours >= 6 && hours <= 10) return `早上好 ⛅`
	if (hours >= 10 && hours <= 14) return `中午好 🌞`
	if (hours >= 14 && hours <= 18) return `下午好 🌞`
	if (hours >= 18 && hours <= 24) return `晚上好 🌛`
	if (hours >= 0 && hours <= 6) return `凌晨好 🌛`
}

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max)
	return num
}

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any
	try {
		newObj = obj.push ? [] : {}
	} catch (error) {
		newObj = {}
	}
	for (let attr in obj) {
		if (typeof obj[attr] === 'object') {
			newObj[attr] = deepCopy(obj[attr])
		} else {
			newObj[attr] = obj[attr]
		}
	}
	return newObj
}

//* 浅拷贝
function simpleClone(obj: any) {
	var result: {
		[key: string]: string
	} = {}
	for (var i in obj) {
		result[i] = obj[i]
	}
	return result
}
/**
 * 深拷贝  遍历对象中的每一个属性
 */
function deepClone(obj: any) {
	let result: any
	if (typeof obj == 'object') {
		result = isArray(obj) ? [] : {}
		for (let i in obj) {
			//isObject(obj[i]) ? deepClone(obj[i]) : obj[i]
			//多谢"朝歌在掘金"指出，多维数组会有问题
			result[i] = isObject(obj[i]) || isArray(obj[i]) ? deepClone(obj[i]) : obj[i]
		}
	} else {
		result = obj
	}
	return result
}

/** #### 设置样式属性 document.documentElement  */
export function setStyleProperty(key: string, val: string) {
	document.documentElement.style.setProperty(key, val)
}

/** #### 将 3 位 HEX 颜色代码转换为 6 位的 HEX 颜色代码  */
export function convertToSixDigitHexColor(str: string) {
	if (str.length > 4) return str.toLocaleUpperCase()
	else return (str[0] + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]).toLocaleUpperCase()
}

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export function getBrowserLang() {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
	let defaultBrowserLang = ''
	let lang = browserLang.toLowerCase()
	if (['cn', 'zh', 'zh-cn'].includes(lang)) defaultBrowserLang = 'zh'
	else defaultBrowserLang = 'en'
	return defaultBrowserLang
}

/** #### 使用递归展平菜单，以便更轻松地添加动态路由。  */
export function getFlatMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
	let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList))
	let flattenArray = newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])])
	return flattenArray // 返回处理后的扁平化菜单数组
}

/** #### 使用递归过滤掉 菜单中 meta.isHide: true 的数据  */
export function getShowMenuList(menuList: RouteObjectType[]) {
	let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList))
	return newMenuList.filter(item => {
		item.children?.length && (item.children = getShowMenuList(item.children))
		// if (item.meta?.isHide) console.log(item.meta.title, item); // item.meta.isHide为ture的，被过滤掉  {"path": "/noLayout/index","meta": {"isHide": true,}}
		return !item.meta?.isHide
	})
}

/** #### 获取一级菜单  */
export function getFirstLevelMenuList(menuList: RouteObjectType[]) {
	return menuList.map(item => {
		return { ...item, children: undefined }
	})
}

/**
 * @description 获取带有路径的菜单对象
 * @param {Array} menulist - 要搜索的菜单对象列表。
 * @param {string} path - 与菜单对象的路径匹配的路径。
 * @returns {Object} 匹配的菜单对象，如果没有找到匹配则返回 null。
 */
export function getMenuByPath(menulist: RouteObjectType[] = store.getState().auth.flatMenuList, path: string = getUrlWithParams()) {
	const menuItem = menulist.find(menu => {
		// 通过常规匹配动态路由
		const regex = new RegExp(`^${menu.path?.replace(/:.[^/]*/, '.*')}$`)
		return regex.test(path)
	})
	return menuItem || {}
}

/**
 * @description 使用递归查找所有面包屑并将其存储在 redux 中.
 * @param {Array} menuList - The menu list.
 * @param {Array} parent - The parent menu.
 * @param {Object} result - The processed result.
 * @returns {Object}
 */
export function getAllBreadcrumbList(menuList: RouteObjectType[], parent: RouteObjectType[] = [], result: { [key: string]: RouteObjectType[] } = {}) {
	for (const item of menuList) {
		result[item.meta!.key!] = [...parent, item]
		if (item.children) getAllBreadcrumbList(item.children, result[item.meta!.key!], result)
	}
	return result
}

/** #### 使用参数获取相对网址  */
export function getUrlWithParams() {
	const url = {
		hash: location.hash.substring(1),
		history: location.pathname + location.search,
	}
	// console.log("getUrlWithParams", url); // {hash: '/auth/button', history: '/'} | {hash: '/feat/tabs', history: '/'}
	return url[mode]
}

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export function getOpenKeys(path: string): string[] {
	// @param {String} path - The current path.
	let currentKey: string = ''
	let openKeys: string[] = []
	let pathSegments: string[] = path.split('/').map((segment: string) => '/' + segment)
	for (let i: number = 1; i < pathSegments.length - 1; i++) {
		currentKey += pathSegments[i]
		openKeys.push(currentKey)
	}
	return openKeys
}

/**
 * @description NOTE: 路由守卫组件: 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObjectType[] = []): RouteObjectType => {
	let result: RouteObjectType = {}
	for (let item of routes) {
		if (item.path === path) return item
		if (item.children) {
			const res = searchRoute(path, item.children)
			if (Object.keys(res).length) {
				result = res
			}
		}
	}
	return result
}

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
// NOTE: 递归处理路由菜单
export function handleRouter(routerList: RouteObjectType[], newArr: string[] = []) {
	routerList.forEach((item: RouteObjectType) => {
		typeof item === 'object' && item.path && newArr.push(item.path)
		item.children && item.children.length && handleRouter(item.children, newArr)
	})
	// console.log("路由菜单结果：", newArr)
	return newArr
}

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {String} path 当前访问地址
 * @param {Array} menuList 菜单列表
 * @returns array
 */
export const getBreadcrumbList = (path: string, menuList: RouteObjectType[]) => {
	let tempPath: any[] = []
	try {
		const getNodePath = (node: RouteObjectType) => {
			// FIXME: 单步F10调试即可，查看每一项item
			// debugger
			tempPath.push(node)
			// 找到符合条件的节点，通过throw终止掉递归
			if (node.path === path) {
				throw new Error('GOT IT!')
			}
			if (node.children && node.children.length > 0) {
				for (let i = 0; i < node.children.length; i++) {
					getNodePath(node.children[i])
				}
				// 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
				tempPath.pop()
			} else {
				// 找到叶子节点时，删除路径当中的该叶子节点
				tempPath.pop()
			}
		}
		for (let i = 0; i < menuList.length; i++) {
			getNodePath(menuList[i])
		}
	} catch (e) {
		// console.log("面包屑捕捉的结果：", tempPath)
		return tempPath.map(item => item.title)
	}
}

/**
 * @description 双重递归 找出所有 面包屑 生成对象存到 redux 中，就不用每次都去递归查找了
 * @param {String} menuList 当前菜单列表
 * @returns object
 */
// NOTE: 双重递归处理面包屑导航
export const findAllBreadcrumb = (menuList: RouteObjectType[]): { [key: string]: any } => {
	let handleBreadcrumbList: any = {}
	const loop = (menuItem: RouteObjectType) => {
		if (menuItem?.children?.length) {
			menuItem.children.forEach(item => loop(item))
		} else {
			handleBreadcrumbList[menuItem.path!] = getBreadcrumbList(menuItem.path!, menuList)
		}
	}
	menuList.forEach(item => loop(item))
	return handleBreadcrumbList
}

/** #### 为 ProTable 组件格式化服务器返回的数据  */
export function formatDataForProTable<T>(data: ResPage<T>): Partial<RequestData<T>> {
	return {
		success: true,
		data: data.list,
		total: data.total,
	}
}

/** #### 执行代码块并防止在浏览器中进行调试的函数  */
export function blockDebugger() {
	function innerFunction() {
		try {
			// 通过使用非常规语法调用“debugger”语句来防止调试
			;(function () {
				return false
			})
				['constructor']('debugger')
				['call']()
		} catch (err) {
			console.log('Debugger is blocked')
		}
	}
	// 使用 setInterval 开始执行，并返回时间间隔 ID
	return setInterval(innerFunction, 50)
}

/**
 * @description 👇 is-browser
 * @returns {boolean}
 */
export const isBrowser = () => {
	return typeof window !== 'undefined' && typeof window.document !== 'undefined'
}

/**
 * @description 👇 异步延时, ms秒种
 * @returns {void}
 */
export const delay = (ms: number) => {
	return new Promise<void>((reslove, reject) => {
		setTimeout(() => reslove(), ms)
	})
}
// await delay(3000)
