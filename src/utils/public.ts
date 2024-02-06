export const waitTime = (time = 100) => {
  return new Promise(reslove => {
    setTimeout(() => {
      reslove(true);
    }, time);
  });
};

export const suffix = (object = {}) => {
  const timestamp = Math.round(new Date().getTime());
  return {
    ...object,
    timestamp
  };
};

export const flattenRoutes: any = (arr = []) =>
  arr.reduce((prev: any[], item: { children: any }) => {
    if (Array.isArray(item.children)) {
      prev.push(item);
    }
    return prev.concat(Array.isArray(item.children) ? flattenRoutes(item.children) : item);
  }, []);

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key) as any;
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
export const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};
export const removeLocalStorage = (key: string) => {
  window.localStorage.removeItem(key);
};
export const clearLocalStorage = () => {
  window.localStorage.clear();
};

export const getEnv = () => {
  let env;
  if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
    env = "NODE";
  }
  if (typeof XMLHttpRequest !== "undefined") {
    env = "BROWSER";
  }
  return env;
};
export const customizeTimer: any = {
  intervalTimer: null,
  timeoutTimer: null,
  setTimeout(cb: () => void, interval: number) {
    const { now } = Date;
    const stime = now();
    let etime = stime;
    const loop = () => {
      this.timeoutTimer = requestAnimationFrame(loop);
      etime = now();
      if (etime - stime >= interval) {
        cb();
        cancelAnimationFrame(this.timeoutTimer);
      }
    };
    this.timeoutTimer = requestAnimationFrame(loop);
    return this.timeoutTimer;
  },
  clearTimeout() {
    cancelAnimationFrame(this.timeoutTimer);
  },
  setInterval(cb: () => void, interval: number) {
    const { now } = Date;
    let stime = now();
    let etime = stime;
    const loop = () => {
      this.intervalTimer = requestAnimationFrame(loop);
      etime = now();
      if (etime - stime >= interval) {
        stime = now();
        etime = stime;
        cb();
      }
    };
    this.intervalTimer = requestAnimationFrame(loop);
    return this.intervalTimer;
  },
  clearInterval() {
    cancelAnimationFrame(this.intervalTimer);
  }
};

/*
 ** 判断用户是否离开当前页面
 */
export const checkIsLocalPage = () => {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      return false;
    }
    if (document.visibilityState === "visible") {
      return true;
    }
    window.addEventListener(
      "pagehide",
      event => {
        if (event.persisted) {
          /* the page isn't being discarded, so it can be reused later */
        }
      },
      false
    );
  });
};

// Generate Random Hex
export const randomHex = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;

// Clear All Cookies
export const clearCookies = document.cookie
  .split(";")
  .forEach(
    cookie => (document.cookie = cookie.replace(/^ +/, "").replace(/[=].*/, `=;expires=${new Date(0).toUTCString()};path=/`))
  );

// Find the number of days between two days
export const dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000);

// Capitalize a String
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

// Check if the array is empty
export const isNotEmpty = (arr: [] | any) => Array.isArray(arr) && arr.length > 0;

// Detect Dark Mode
export const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
export const shuffleArr = (arr: any[]) => arr.sort(() => 0.5 - Math.random());
export const sleep = (time: number | undefined) => new Promise<void>(resolve => setTimeout(() => resolve(), time));
export const ThousandNum = (num: { toString: () => string }) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const RandomId = (len: number | undefined) => Math.random().toString(36).substring(3, len);
export const RoundNum = (num: number, decimal: number) => Math.round(num * 10 ** decimal) / 10 ** decimal;
export const randomNum = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const isEmptyArray = (arr: string | any[]) => Array.isArray(arr) && !arr.length;
export const randomItem = (arr: string | any[]) => arr[Math.floor(Math.random() * arr.length)];
export const asyncTo = (promise: Promise<any>) => promise.then((data: any) => [null, data]).catch((err: any) => [err]);
export const hasFocus = (element: Element | null) => element === document.activeElement;
export const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);
export const randomString = () => Math.random().toString(36).slice(2);
export const toCamelCase = (str: string) => str.trim().replace(/[-_\s]+(.)?/g, (_: any, c: string) => (c ? c.toUpperCase() : ""));
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, "0")}`;
export const pause = (millions: number | undefined) => new Promise(resolve => setTimeout(resolve, millions));
export const camelizeCamelCase = (str: string) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter: string, index: number) =>
      index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    )
    .replace(/\s+/g, "");

export const promiseWithTimeout = (promise: any, timeout: number) => {
  const timeoutPromise = new Promise(resolve => setTimeout(() => resolve("Time Out!"), timeout));
  return Promise.race([timeoutPromise, promise]);
};
export const copyTextToClipboard = async (textToCopy: string) => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(textToCopy);
      console.log("已成功复制到剪贴板");
    }
  } catch (err: any) {
    console.error(`复制到剪贴板失败:${err.message}`);
  }
};

export const getRandomId = () => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// https://github.com/Azure/fetch-event-source
// https://github.com/mpetazzoni/sse.js
// https://nodejs.org/api/http.html#httprequesturl-options-callback
export const oneApiChat = (chatList: any, token: any, signal: any) =>
  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: chatList,
      stream: true
    })
  });
export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
export const exportJsonData = (data: string) => {
  const date = getCurrentDate();
  const jsonString = JSON.stringify(JSON.parse(data), null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `chat-store_${date}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export const saveHtmlToPng = async (eleHtml: HTMLElement | null, successFun: () => void, errorFun: (arg0: any) => void) => {
  try {
    const ele = eleHtml ?? document.getElementById("image-wrapper");
    // 需要导入模块，先拿变量代替
    // import html2canvas from 'html2canvas'
    const html2canvas: any = () => {};
    const canvas = await html2canvas(ele, {
      useCORS: true
    });
    const imgUrl = canvas.toDataURL("image/png");
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = imgUrl;
    tempLink.setAttribute("download", "chat-shot.png");
    if (typeof tempLink.download === "undefined") tempLink.setAttribute("target", "_blank");

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(imgUrl);
    if (successFun) successFun();
    Promise.resolve();
  } catch (error: any) {
    if (errorFun) errorFun(error.message);
  }
};
export const readFromFile = () =>
  // onClick={() => importFromFile()}
  // readFromFile().then((content) => { JSON.parse(content)})

  new Promise((res, rej) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        res(e.target.result);
      };
      fileReader.onerror = e => rej(e);
      fileReader.readAsText(file);
    };

    fileInput.click();
  });
