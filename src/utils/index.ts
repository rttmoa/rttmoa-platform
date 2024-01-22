/* eslint-disable prettier/prettier */
import { store } from "@/redux";
import { ResPage } from "@/api/interface";
import { RouteObjectType } from "@/routers/interface";
import { RequestData } from "@ant-design/pro-components";

const mode = import.meta.env.VITE_ROUTER_MODE;

/** #### 获取当前时间对应的问候语。  */
export function getTimeState() {
  let timeNow = new Date();
  let hours = timeNow.getHours();
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/** #### 生成随机数  */
export function randomNum(min: number, max: number): number {
  let num = Math.floor(Math.random() * (min - max) + max);
  return num;
}

/** #### 设置样式属性 document.documentElement  */
export function setStyleProperty(key: string, val: string) {
  document.documentElement.style.setProperty(key, val);
}

/** #### 将 3 位 HEX 颜色代码转换为 6 位的 HEX 颜色代码  */
export function convertToSixDigitHexColor(str: string) {
  if (str.length > 4) return str.toLocaleUpperCase();
  else return (str[0] + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]).toLocaleUpperCase();
}
/** #### 获取浏览器的默认语言。  */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  let lang = browserLang.toLowerCase();
  if (["cn", "zh", "zh-cn"].includes(lang)) defaultBrowserLang = "zh";
  else defaultBrowserLang = "en";
  return defaultBrowserLang;
}

/** #### 使用递归展平菜单，以便更轻松地添加动态路由。  */
export function getFlatMenuList(menuList: RouteObjectType[]): RouteObjectType[] {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  let flattenArray = newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
  return flattenArray; // 返回处理后的扁平化菜单数组
}

/** #### 使用递归过滤掉 菜单中 meta.isHide: true 的数据  */
export function getShowMenuList(menuList: RouteObjectType[]) {
  let newMenuList: RouteObjectType[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    // if (item.meta?.isHide) console.log(item.meta.title, item); // item.meta.isHide为ture的，被过滤掉  {"path": "/noLayout/index","meta": {"isHide": true,}}
    return !item.meta?.isHide;
  });
}

/** #### 获取一级菜单  */
export function getFirstLevelMenuList(menuList: RouteObjectType[]) {
  return menuList.map(item => {
    return { ...item, children: undefined };
  });
}

/**
 * @description 获取带有路径的菜单对象
 * @param {Array} menulist - 要搜索的菜单对象列表。
 * @param {string} path - 与菜单对象的路径匹配的路径。
 * @returns {Object} 匹配的菜单对象，如果没有找到匹配则返回 null。
 */
export function getMenuByPath(
  menulist: RouteObjectType[] = store.getState().auth.flatMenuList,
  path: string = getUrlWithParams()
) {
  const menuItem = menulist.find(menu => {
    // 通过常规匹配动态路由
    const regex = new RegExp(`^${menu.path?.replace(/:.[^/]*/, ".*")}$`);
    return regex.test(path);
  });
  return menuItem || {};
}

/**
 * @description 使用递归查找所有面包屑并将其存储在 redux 中.
 * @param {Array} menuList - The menu list.
 * @param {Array} parent - The parent menu.
 * @param {Object} result - The processed result.
 * @returns {Object}
 */
export function getAllBreadcrumbList(
  menuList: RouteObjectType[],
  parent: RouteObjectType[] = [],
  result: { [key: string]: RouteObjectType[] } = {}
) {
  for (const item of menuList) {
    result[item.meta!.key!] = [...parent, item];
    if (item.children) getAllBreadcrumbList(item.children, result[item.meta!.key!], result);
  }
  return result;
}

/** #### 使用参数获取相对网址  */
export function getUrlWithParams() {
  const url = {
    hash: location.hash.substring(1),
    history: location.pathname + location.search
  };
  // console.log("getUrlWithParams", url); // {hash: '/auth/button', history: '/'} | {hash: '/feat/tabs', history: '/'}
  return url[mode];
}

/** #### 获取需要展开的子菜单按键  */
export function getOpenKeys(path: string): string[] {
  // @param {String} path - The current path.
  let currentKey: string = "";
  let openKeys: string[] = [];
  let pathSegments: string[] = path.split("/").map((segment: string) => "/" + segment);
  for (let i: number = 1; i < pathSegments.length - 1; i++) {
    currentKey += pathSegments[i];
    openKeys.push(currentKey);
  }
  return openKeys;
}

/** #### 为 ProTable 组件格式化服务器返回的数据  */
export function formatDataForProTable<T>(data: ResPage<T>): Partial<RequestData<T>> {
  return {
    success: true,
    data: data.list,
    total: data.total
  };
}

/** #### 执行代码块并防止在浏览器中进行调试的函数  */
export function blockDebugger() {
  function innerFunction() {
    try {
      // 通过使用非常规语法调用“debugger”语句来防止调试
      (function () {
        return false;
      })
        ["constructor"]("debugger")
        ["call"]();
    } catch (err) {
      console.log("Debugger is blocked");
    }
  }
  // 使用 setInterval 开始执行，并返回时间间隔 ID
  return setInterval(innerFunction, 50);
}

/**
 * @description 👇 is-browser
 * @returns {boolean}
 */
export const isBrowser = () => {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
};

/**
 * @description 👇 异步延时, ms秒种
 * @returns {void}
 */
export const delay = (ms: number) => {
  return new Promise<void>((reslove, reject) => {
    setTimeout(() => reslove(), ms);
  });
};
// await delay(3000)
