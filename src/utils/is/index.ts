/* eslint-disable prettier/prettier */

import { parse, stringify } from "qs";


 
/**
 * @description utils-检查值是否属于某种类型
 * @param {unknown} unknown 任意参数
 * @param {string} string 任意参数对应的类型
 * @returns {boolean} 返回给调用位置，校验是否为真
 * @example  is(getData(), 'Function')
 */ 
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}


/** 
 * @example 
 * isFunction(() => {})
 */ 
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, "Function");
}


/** 
 * @example 
 * isDef(undefined)
 */ 
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

/** 
 * @example 
 * isDef(undefined)
 */ 
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

 
/** 
 * @example 
 * isObject({} || new Object || undefined || null || () => {})
 */ 
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

 
/** 
 * @example 
 * isDate(new Date())
 */ 
export function isDate(val: unknown): val is Date {
  return is(val, "Date");
}

/** 
 * @example 
 * isNumber(+'1')
 */ 
export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

/** 
 * @example 
 * isAsyncFunction(async () => {})
 */ 
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, "AsyncFunction");
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/** 
 * @example 
 * isString("")
 */ 
export function isString(val: unknown): val is string {
  return is(val, "String");
}

/** 
 * @example 
 * isBoolean(new Boolean)
 */ 
export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

/** 
 * @example 
 * isArray([])
 */ 
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}



/**
 * @description: 检查是否是客户端。
 * @example 
 * isClient()
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 * @description: 检查是否是浏览器.
 * @example
 * isWindow(window)
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * @description: 检查它是否是一个元素.
 * @example
 * 
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @description: 检查值是否为空.
 * @example
 * isNull(null)
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * @description: 检查值是否为 null 或 undefined.
 * @example
 * isNullOrUnDef(undefined || null)
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * @description: 检查它是否是十六进制颜色.
 * @example
 * isHexColor("#fff")
 */
export const isHexColor = (str: string) => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

export const isURLSearchParams = (val: any) => {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

export const getParamObject = (val: { toString: () => any; }) => {
  if (isURLSearchParams(val)) {
    return parse(val.toString(), { strictNullHandling: true })
  }
  if (typeof val === 'string') {
    return [val]
  }
  return val
}
export const reqStringify = (val: any) => {
  return stringify(val, { arrayFormat: 'repeat', strictNullHandling: true })
}
