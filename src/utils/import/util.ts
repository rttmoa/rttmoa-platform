/* eslint-disable no-debugger */
/* eslint-disable prettier/prettier */
import { RouteObjectType } from "@/routers/interface";



/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
	const value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key) as string);
	} catch (error) {
		return value;
	}
};

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
	window.localStorage.removeItem(key);
};

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
	window.localStorage.clear();
};



/**
 * @description 获取浏览器默认语言
 * @return string
 */
// NOTE: 获取浏览器默认语言
export const getBrowserLang = () => {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	// console.log("browserLang", browserLang); // zh-CN
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
};

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
// NOTE: 将地址栏中字符串处理成Antd数组
export const getOpenKeys = (path: string) => {   // 接收 String -> 返回 Array[]
	// console.log("++++++++地址栏及处理给Antd需要的数组++++++++++++++++++++++++++++++++++++++++++++++++")
	// console.log(path)
	// console.log(path.split("/"))
	// console.log(path.split("/").map(i => "/" + i))
	let newStr: string = "";
	let newArr: any[] = [];
	let arr = path.split("/").map(i => "/" + i);
	// console.log("for循环")
	for (let i = 1; i < arr.length - 1; i++) { // i = 1, i < 2
		newStr += arr[i];
		// console.log(newStr);
		newArr.push(newStr);
	}
	// console.log("最终", newArr)
	return newArr;
};

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
// NOTE: 路由守卫组件: 递归查询对应的路由
export const searchRoute = (path: string, routes: RouteObjectType[] = []): RouteObjectType => { 
	let result: RouteObjectType = {};
	for (let item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children); 
			if (Object.keys(res).length) {
				// console.log(res) 							// {path: '/assembly/svgIcon', element: {…}, meta: {…}}
				// console.log(Object.keys(res)) 	// ['path', 'element', 'meta']
				result = res;
			};
		}
	}
	// console.log("Svg图标：http://localhost:3301/#/assembly/svgIcon")
	// console.log(path) 		// 	"/assembly/svgIcon"
	// console.log(routes) 	// 	[{…}, {path: '/login', element: {…}, meta: {…}}, {element: {…}, meta: {…}, children: Array(4)}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
	// console.log(result) 	// 	{path: '/assembly/svgIcon', element: {…}, meta: {…}}
	return result;
};

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {String} path 当前访问地址
 * @param {Array} menuList 菜单列表
 * @returns array
 */
export const getBreadcrumbList = (path: string, menuList: RouteObjectType[]) => {
	let tempPath: any[] = [];
	try {
		const getNodePath = (node: RouteObjectType) => {
			// FIXME: 单步F10调试即可，查看每一项item
			// debugger
			tempPath.push(node);
			// 找到符合条件的节点，通过throw终止掉递归
			if (node.path === path) {
				throw new Error("GOT IT!");
			}
			if (node.children && node.children.length > 0) {
				for (let i = 0; i < node.children.length; i++) {
					getNodePath(node.children[i]);
				}
				// 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
				tempPath.pop();
			} else {
				// 找到叶子节点时，删除路径当中的该叶子节点
				tempPath.pop();
			}
		};
		for (let i = 0; i < menuList.length; i++) {
			getNodePath(menuList[i]);
		}
	} catch (e) {
		// console.log("面包屑捕捉的结果：", tempPath)
		return tempPath.map(item => item.title);
	}
};

/**
 * @description 双重递归 找出所有 面包屑 生成对象存到 redux 中，就不用每次都去递归查找了
 * @param {String} menuList 当前菜单列表
 * @returns object
 */
// NOTE: 双重递归处理面包屑导航
export const findAllBreadcrumb = (menuList: RouteObjectType[]): { [key: string]: any } => {
	let handleBreadcrumbList: any = {};
	const loop = (menuItem: RouteObjectType) => {
		// 下面判断代码解释 *** !item?.children?.length   ==>   (item.children && item.children.length > 0)
		if (menuItem?.children?.length) {
			menuItem.children.forEach(item => loop(item))
		} else { 
			handleBreadcrumbList[menuItem.path!] = getBreadcrumbList(menuItem.path!, menuList) // 每一项的Item和整个ListArray
		}
	};
	menuList.forEach(item => loop(item));
	// console.log("处理面包屑结果：", handleBreadcrumbList) // TODO: results: {/home/index: Array(1), /dataScreen/index: Array(1), /proTable/useHooks: Array(2), /proTable/useComponent: Array(2), /dashboard/dataVisualize: Array(2),}
	return handleBreadcrumbList
};

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} menuList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
// NOTE: 递归处理路由菜单
export function handleRouter(routerList: RouteObjectType[], newArr: string[] = []) {
	routerList.forEach((item: RouteObjectType) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length && handleRouter(item.children, newArr);
	});
	// console.log("路由菜单结果：", newArr)
	return newArr;
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any) => {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
};

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}
