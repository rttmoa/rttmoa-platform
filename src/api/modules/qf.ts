import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";
/**
 * 获取列表
 * @param {*} page
 */
export function listApi(page = 1) {
  // return get("/api/v1/admin/products", { page, per: 5 });
  return http.get(PORT1 + `/product`);
}

// /**
//  * 创建数据
//  * @param {*} data
//  */
// export function createApi(data: any) {
//   return post("/api/v1/admin/products", data);
// }

// /**
//  * 根据id获取获取数据
//  * @param {*} id
//  */
// export function getOneById(id: any) {
//   return get(`/api/v1/admin/products/${id}`);
// }

// /**
//  * 修改记录
//  * @param {*} id
//  * @param {*} data
//  */
// export function modifyOne(id: any, data: any) {
//   return put(`/api/v1/admin/products/${id}`, data);
// }

// /**
//  * 删除记录
//  * @param {*} id
//  * @param {*} data
//  */
// export function delOne(id: any, data: any) {
//   return del(`/api/v1/admin/products/${id}`);
// }
