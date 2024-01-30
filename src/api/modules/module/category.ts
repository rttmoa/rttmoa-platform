import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";

// 功能模块 > 获取分类列表
export const categoryList = (parentId: string) => {
  return http.get(PORT1 + `/category/list?parentId=${parentId}`);
  // return http.get(PORT1 + `/category/list`, {parentId});
};

// 添加分类
export const categoryAdd = (parentId: string, categoryName: string) => {
  return http.post(PORT1 + `/category/add`, { parentId, categoryName });
};

// 更新分类
export const categoryUpdate = (parentId: string, categoryName: string) => {
  return http.post(PORT1 + `/category/update`, { parentId, categoryName });
};
