const api = 
` 封装request请求获取数据
// TODO: 列表
export function list(parentId) {
  return request({
    url: "/manage/category/list?parentId={parentId}",
    method: "get",
  });
}
// TODO: 登录
export function login(data) {
  // console.log(data) // {username: 'admin', password: 'admin'}
  // return
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
// TODO: 搜索
export function search(pageNum, pageSize, productType, productValue) {
  return request({
    url: "/manage/product/search?pageNum={pageNum}&pageSize={pageSize}&{productType}={productValue}",
    method: "get",
  });
}
// TODO: 上传文件
export function upload(data) {
  return request({
    url: "/manage/img/upload",
    method: "post",
    data,
  });
}
`
export default api