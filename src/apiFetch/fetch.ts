/**
 * Fetch Api
 * 1. reqFetch(url, params)
 *    params: {
 *      method: 'GET', // 请求方式
 *      payload: null, // 入参
 *      headers: null, // 自定义 Headers
 *      isShowError: true, // 是否显示total tips
 *      timeout: 20000 // 超时
 *    }
 * 2. postFetch --- method==='POST' 其他入参同 reqFetch
 * 3. getFetch --- method==='POST'  其他入参同 reqFetch
 * 4. putFethch
 * 5. deleteFetch
 * 6. patchFetch
 */
import { message } from "antd";

// const baseUrl = process?.env?.APP_BASE_URL ? process.env.APP_BASE_URL : import.meta.env?.APP_BASE_URL ?? "";
const baseUrl = ""

const suffix = (payload = {}) => {
    const timestamp = Math.round(new Date().getTime());
    return {
        ...payload,
        timestamp
    }
}
const parseToQuery = (query: any) => { // 解析query中有中文
    return Object.keys(query).reduce((prev, curr) => {
        prev.push(`${encodeURIComponent(curr)}=${encodeURIComponent(query[curr]) === undefined ? "" : query[curr]}`)
        return prev
    }, [] as any).join("&")
}

const initOptions = {
    method: "GET", // POST, *GET, PUT, DELETE, PATCH, [HEAD, CONNECT, OPTIONS, TRACE]
    headers: {
        Accept: 'application/json',
        // 'Content-Type': 'text/plain;charset=UTF-8',
        // 'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json;charset=utf-8',
        // Authorization: getToken() ? `Bearer ${getToken()}` : null
    },
    signal: null,
    credentials: 'include',
    // mode: 'cors',
    // redirect: 'follow',
    // referrer: 'no-referrer',
    // referrerPolicy: 'no-referrer-when-downgrade',
    // cache: 'default',
    // integrity: "",
    // keepalive: false
}



// 处理失败结果
const handleFailedResult = (response: any, error:any, isShowError:boolean, reject: any) => {
    const { status, statusText } = response

    if (((status && status !== 200) || error) && isShowError) {
        const statusTips = `${status}: ${statusText}`
        message.error(`${status ? statusTips : error?.message}`, 2)
    }
    if (reject) reject(response)
}

// 处理成功结果
const handleSuccessResult = (resolve: any, result: any, isShowError: boolean) => {
    // response.ok text/html text/plain result may be string
    if (result.code !== 0) {
        if (result.code === 41002) {
            window.location.href = '/signin'
            return
        }

        if (isShowError && result.code) {
            const errStr = `${result.code}: ${result.message}`
            message.error(errStr, 2)
        }
    }
    resolve(result)
}

const handleFetchData = (url: string, options: any) => {
    const { isShowError, timeout, controller, ...otherOptions } = options;
    if (otherOptions.signal) throw new Error('Signal not supported in timeoutable fetch')

    const abortController = controller || new AbortController() // 终止请求
    const { signal } = abortController

    return new Promise((resolve, reject) => {

        const timer = setTimeout(() => {
            handleFailedResult({ status: 50000, statusText: 'Time out' }, new Error('TimeoutError: Timeout for Promise'), isShowError, reject)
            abortController.abort()
        }, timeout)

        const fetchStartTime = +new Date()
        fetch(url, { ...otherOptions, signal }).then((response) => {
            const fetchEndTime = +new Date()
            const delay = fetchEndTime - fetchStartTime
            // fetch Nodejs
            fetch('http://localhost:5200/apis', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url.split('?')[0], delay }),
            }).then(res => res.json()).then(data => { console.log(data) }).catch(err => {
                // console.error("Fetch Nodejs Error", err)
                // console.error('err.name', err.name)
                // console.error('err.message', err.message)
            })
            const contentType = response.headers.get('Content-Type')!
            if (response.status >= 200 && response.status < 300) {
                if (contentType.includes('application/json')) {
                    response.json().then((resBody) => {
                        handleSuccessResult(resolve, resBody, isShowError)
                    }).catch((error) => { handleFailedResult(response, error, isShowError, reject) })
                } else if (contentType.includes('application/vnd.ms-excel')) {
                    response
                        .arrayBuffer()
                        .then((resBuffer) => {
                            const blob = new Blob([resBuffer], {
                                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            })
                            const disposition = response.headers.get('content-disposition')
                            const fileName = decodeURI(disposition?.split('=')[1].replace(/'/g, '')!).replace("utf-8''", '') || ''
                            const objectUrl = URL.createObjectURL(blob)
                            const downloadElement = document.createElement('a')
                            document.body.appendChild(downloadElement)
                            downloadElement.style = 'display: none'
                            downloadElement.href = objectUrl
                            downloadElement.download = fileName
                            downloadElement.click()
                            document.body.removeChild(downloadElement)
                        })
                        .catch((error) => {
                            handleFailedResult(response, error, isShowError, reject)
                        })
                } else if (contentType.includes('text/html') || contentType.includes('text/plain')) {
                    response
                        .text()
                        .then((resBody) => {
                            handleSuccessResult(resolve, resBody, isShowError)
                        })
                        .catch((error) => {
                            handleFailedResult(response, error, isShowError, reject)
                        })
                }
            } else handleFailedResult(response, response, isShowError, reject) // 状态码大于200，并且小于300，处理失败结果
        }).catch((error) => { handleFailedResult(error, error, isShowError, reject) }).finally(() => clearTimeout(timer))
    })
}

// 请求 Nodejs 接口
export const reqFetch = (url: string, params = { method: "GET", payload: null, headers: null, isShowError: true, timeout: 20000, controller: null }) => {
    console.log("参数：", params);
    const { method = "GET", payload = {}, headers = {}, isShowError = true, timeout = 20000, controller = null } = params;
    const defaultOptions = {
        ...initOptions,
        method,
        headers: {
            ...initOptions.headers,
            ...headers
        },
        controller,
        timeout,
        isShowError
    }
    // POST, *GET, PUT, DELETE, PATCH, [HEAD, CONNECT, OPTIONS, TRACE]
    const noReqBody = ['GET', 'CONNECT', 'HEAD', 'OPTIONS', 'TRACE'];
    const isGET = noReqBody.includes(method.toUpperCase())
    const defOptions = isGET ? defaultOptions : { ...defaultOptions, body: JSON.stringify(payload) } // "{\"name\":\"中国\",\"age\":22}"
    const suffixPayload = isGET ? { ...payload } : {}; // 如果是GET请求、将payload转化为地址栏信息
    const signalPayload = suffix(suffixPayload) // 添加后缀： ?timestamp=1703764326221
    const queryParams = parseToQuery(signalPayload)

    const fetchURL = `${baseUrl}${url}${queryParams}`;
    console.log("URL: ", fetchURL)
    console.log("OPTION: ", defOptions)

    // GET：https://mock.apifox.com/m1/3219319-0-default/fetch/btn?name=zhangsan&age=22&timestamp=1703752653191
    // GET：https://mock.apifox.com/m1/3219319-0-default/fetch/btn?name=%E4%B8%AD%E5%9B%BD&age=22&timestamp=1703752747244

    // ? 出来GET、POST等请求和请求参数 & 函数返回Promise
    return handleFetchData(fetchURL, defOptions)
};

export const getFetch = (url: string, params: any) => reqFetch(url, { method: "GET", ...params });

export const postFetch = (url: string, params: any) => reqFetch(url, { method: "POST", ...params });

export const putFetch = (url: string, params: any) => reqFetch(url, { method: "PUT", ...params });

export const deleteFetch = (url: string, params: any) => reqFetch(url, { method: "DELETE", ...params });

export const patchFetch = (url: string, params: any) => reqFetch(url, { method: "PATCH", ...params });