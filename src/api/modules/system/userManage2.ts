import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";

// 获取用户管理左侧分类列表（杭州,上海地区）
export const fetchUserDepttList = (params = {}) => {
  return http.get(PORT1 + `/dept/list`, params);
};

// 获取用户列表
export const fetchUserList = (params = {}) => {
  return http.get(PORT1 + `/user/list2`, params);
};

// 获取用户详情
export const fetchUserDetail = (params = {}) => {
  return http.get(PORT1 + `/user/detail`, params);
};

// 删除用户
export const fetchUserDelete = (params = {}) => {
  return http.get(PORT1 + `/user/delete`, params);
};

// 角色列表
export const fetchRoleList = (params = {}) => {
  return http.get(PORT1 + `/rolelist`, params);
};

export const fetchChangeUserStatus = (params = {}) => {
  return http.get(PORT1 + `/user/changeStatus`, params);
};

// 弹窗: 修改人员信息
export const fetchUserDetailUpdate = (params = {}) => {
  return http.post(PORT1 + `/user/detailUpdate`, params);
};
// 弹窗: 新增人员信息
export const fetchUserAdd = (params = {}) => {
  return http.post(PORT1 + `/user/add`, params);
};

// 角色：修改角色信息
export const fetchUserSetRole = (params = {}) => {
  return http.post(PORT1 + `/user/set/role`, params);
};
