import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";

// 用户管理 > 获取用户列表
export const getUserList = (params: any) => {
  return http.get(PORT1 + `/user/manage/list`, params);
  // return http.get(PORT1 + `/user/manage/list`, params: {data: {params: page}});
};

// 用户管理 > 新建用户
export const createUser = (params: any) => {
  return http.post(PORT1 + `/user/manage/create`, params);
};

// 用户管理 > 编辑用户
export const editUser = (params: any) => {
  return http.post(PORT1 + `/user/manage/edit`, params);
};
