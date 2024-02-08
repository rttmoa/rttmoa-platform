import { parse, stringify } from "qs";

/**
 * @description utils-检查值是否属于某种类型
 * @param {unknown} unknown 任意参数
 * @param {string} string 任意参数对应的类型
 * @returns {boolean} 返回给调用位置，校验是否为真
 */
export function is(val: unknown, type: string) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * @description 是字符串
 */
export function isString(val: unknown): val is string {
  // isString("")
  return is(val, "String");
}
/**
 * @description 是数值
 */
export function isNumber(val: unknown): val is number {
  // isNumber(+'1')
  return is(val, "Number");
}
/**
 * @description 是布尔
 */
export function isBoolean(val: unknown): val is boolean {
  // isBoolean(new Boolean)
  return is(val, "Boolean");
}
/**
 * @description 是对象
 */
export const isObject = (val: any): val is Record<any, any> => {
  // isObject({} || new Object || undefined || null || () => {})
  return val !== null && is(val, "Object");
};
/**
 * @description 是数组
 */
export function isArray(val: any): val is Array<any> {
  // isArray([])
  return val && Array.isArray(val);
}
/**
 * @description 是日期
 */
export function isDate(val: unknown): val is Date {
  // isDate(new Date())
  return is(val, "Date");
}

/**
 * @description 是函数
 */
export function isFunction<T = Function>(val: unknown): val is T {
  // isFunction(() => {})
  return is(val, "Function");
}
/**
 * @description 是false
 */
export function isFalse(o: any) {
  if (o == "" || o == undefined || o == null || o == "null" || o == "undefined" || o == 0 || o == false || Number.isNaN(o))
    return true;
  return false;
}

/**
 * @description 是undefined
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  // isDef(undefined)
  return typeof val !== "undefined";
};

/**
 * @description 不是undefined
 */
export const isUnDef = <T = unknown>(val?: T): val is T => {
  // isDef(undefined)
  return !isDef(val);
};
/**
 * @description: 是null.
 */
export function isNull(val: unknown): val is null {
  // isNull(null)
  return val === null;
}

/**
 * @description: 检查值是否为 null 或 undefined.
 */
export function isNullOrUnDef(val: unknown): val is null | undefined {
  // isNullOrUnDef(undefined || null)
  return isUnDef(val) || isNull(val);
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
 * @description 是AsyncFunction
 */
export function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  // isAsyncFunction(async () => {})
  return is(val, "AsyncFunction");
}
/**
 * @description 是Promise
 */
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, "Promise") && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

/**
 * @description: 检查是否是客户端。
 */
export const isClient = () => {
  return typeof window !== "undefined";
};

/**
 * @description: 检查是否是浏览器.
 */
export const isWindow = (val: any): val is Window => {
  return typeof window !== "undefined" && is(val, "Window");
};

/**
 * @description: 检查它是否是一个元素.
 */
export const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName;
};

/**
 * @description: 检查它是否是十六进制颜色.
 */
export const isHexColor = (str: string) => {
  // isHexColor("#fff")
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str);
};

/**
 * @description: 是否是搜索参数.
 */
export const isURLSearchParams = (val: any) => {
  return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
};

/**
 * @description 获取参数对象
 */
export const getParamObject = (val: { toString: () => any }) => {
  if (isURLSearchParams(val)) {
    return parse(val.toString(), { strictNullHandling: true });
  }
  if (typeof val === "string") {
    return [val];
  }
  return val;
};

/**
 * @description 格式化请求参数
 */
export const reqStringify = (val: any) => {
  return stringify(val, { arrayFormat: "repeat", strictNullHandling: true });
};

/** #### 是否是IOS  */
export function isIos() {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //安卓手机
    // return "Android";
    return false;
  } else if (u.indexOf("iPhone") > -1) {
    //苹果手机
    // return "iPhone";
    return true;
  } else if (u.indexOf("iPad") > -1) {
    //iPad
    // return "iPad";
    return false;
  } else if (u.indexOf("Windows Phone") > -1) {
    //winphone手机
    // return "Windows Phone";
    return false;
  } else {
    return false;
  }
}

/** #### 是否是PC  */
export function isPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/** #### 获取浏览器、返回浏览器版本  */
export function browserType() {
  var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
  var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
  var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
  var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
  var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) return "IE7";
    else if (fIEVersion == 8) return "IE8";
    else if (fIEVersion == 9) return "IE9";
    else if (fIEVersion == 10) return "IE10";
    else if (fIEVersion == 11) return "IE11";
    else return "IE7以下"; //IE版本过低
  }
  if (isFF) return "FF";
  if (isOpera) return "Opera";
  if (isEdge) return "Edge";
  if (isSafari) return "Safari";
  if (isChrome) return "Chrome";
}

/** #### 检查要校验的内容(手机号、身份证、QQ、邮箱.....)， 类型  */
export function checkStr(str: any, type: string) {
  switch (type) {
    case "phone": //手机号码
      return /^1[3|4|5|6|7|8][0-9]{9}$/.test(str);
    case "tel": //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case "card": //身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    case "pwd": //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str);
    case "postal": //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str);
    case "QQ": //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str);
    case "email": //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case "money": //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str);
    // case "URL": //网址
    //   return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
    case "IP": //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
    // case "date": //日期时间
    //   return (
    //     /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    //   );
    case "number": //数字
      return /^[0-9]$/.test(str);
    case "english": //英文
      return /^[a-zA-Z]+$/.test(str);
    case "chinese": //中文
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case "lower": //小写
      return /^[a-z]+$/.test(str);
    case "upper": //大写
      return /^[A-Z]+$/.test(str);
    case "HTML": //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
    default:
      return true;
  }
}

/** #### 严格的身份证校验  */
export function isCardID(sId: any) {
  if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
    alert("你输入的身份证长度或格式错误");
    return false;
  }
  // 身份证城市
  const aCity: {
    [propName: number]: string;
  } = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  const objProps: number = parseInt(sId.substr(0, 2));
  if (!aCity[objProps]) {
    alert("你的身份证地区非法");
    return false;
  }

  // 出生日期验证
  var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
    d = new Date(sBirthday);
  if (sBirthday != d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()) {
    alert("身份证上的出生日期非法");
    return false;
  }

  // 身份证号码校验
  var sum = 0,
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
    codes = "10X98765432";
  for (var i = 0; i < sId.length - 1; i++) {
    sum += sId[i] * weights[i];
  }
  var last = codes[sum % 11]; //计算出来的最后一位身份证号码
  if (sId[sId.length - 1] != last) {
    alert("你输入的身份证号非法");
    return false;
  }
  return true;
}
