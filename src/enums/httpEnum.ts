/** #### 请求配置  */
export enum ResultEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 401,
	TIMEOUT = 5000, // 超时时间 5 秒
	TYPE = 'success',
}

/** #### 请求方法  */
export enum RequestEnum {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

/** ####  常用的 contentType 类型 */
export enum ContentTypeEnum {
	// json
	JSON = 'application/json;charset=UTF-8',
	// text
	TEXT = 'text/plain;charset=UTF-8',
	// form-data 一般配合 qs
	FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
	// form-data 上传
	FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
