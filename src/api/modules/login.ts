import http from "@/api";
import { AuthState } from "@/redux/interface";
import { PORT1 } from "@/api/config/servicePort";
import { ReqLogin, ResLogin } from "@/api/interface/index";
import authMenuList from "@/assets/json/authMenuList.json";
import authButtonList from "@/assets/json/authButtonList.json";
import loginJSON from "@/assets/json/login.json";
/**
 * @name AuthModule
 */

// 用户登陆
export const loginApi = (params: ReqLogin) => {
  return http.post<ResLogin>(PORT1 + `/login`, params);
  // return http.post<ResLogin>(PORT1 + `/login`, params, { loading: false });
  // return http.post<ResLogin>(PORT1 + `/login`, {}, { params });
  // return http.post<ResLogin>(PORT1 + `/login`, qs.stringify(params));
  // return http.get<ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`);
  // return loginJSON;
};

// ! 获取菜单列表
export const getAuthMenuListApi = () => {
  return http.get<AuthState["authMenuList"]>(PORT1 + `/menu/list`);
  // return authMenuList;
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
  return http.get<AuthState["authButtonList"]>(PORT1 + `/auth/buttons`);
  // return authButtonList;
};

// 用户退出
export const logoutApi = () => {
  return http.post(PORT1 + `/logout`, {}, { loading: true });
};
