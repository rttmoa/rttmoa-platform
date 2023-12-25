/* eslint-disable prettier/prettier */





// todo 检查值是否属于某种类型
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}


// todo 检查值是否是 Function
export function isFunction<T = Function>(val: unknown): val is T {
  return is(val, "Function");
}


// todo 检查值是否是 undefined
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};

// todo 检查值是否是 undefined
export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};


// todo 检查值是否是 Object
export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, "Object");
};

// todo 检查值是否是 Date
export function isDate(val: unknown): val is Date {
  return is(val, "Date");
}

// todo 检查值是否是 Number
export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

// todo 检查值是否是 AsyncFunction
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return is(val, "AsyncFunction");
}

// todo 检查值是否是 Promise
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

// todo 检查值是否是 String
export function isString(val: unknown): val is string {
  return is(val, "String");
}

// todo 检查值是否是 Boolean
export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

// todo 检查值是否是 Array
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val);
}

/**
 * @description: Checks if it's the client.
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 * @description: Checks if it's a browser.
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * @description: Checks if it's an element.
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @description: Checks if the value is null.
 */
export function isNull(val: unknown): val is null {
  return val === null;
}

/**
 * @description: Checks if the value is null or undefined.
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}

/**
 * @description: Checks if it's a hexadecimal color.
 */
export const isHexColor = (str: string) => {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};
