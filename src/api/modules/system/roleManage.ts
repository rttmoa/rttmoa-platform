import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";

// 用户管理 > 获取用户列表
export const roleList = () => {
  return http.get(PORT1 + `/role/list`);
};
