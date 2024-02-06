import React, { useEffect } from "react";
import { RootState, useSelector } from "@/redux";
import { MetaProps } from "@/routers/interface";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";
import StorageHandler from "@/utils/common/StorageFn";

interface RouterGuardProps {
  children: React.ReactNode;
}

// TODO: 路由守卫组件；Title、路由白名单、权限校验、登录拦截
const RouterGuard: React.FC<RouterGuardProps> = props => {
  const loader = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  window.$navigate = navigate; // ! 全局使用 navigate，安装导航，以便在自定义 React 挂钩函数中提供非 React 函数组件或调用

  const token = useSelector((state: RootState) => state.user.token);
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);

  useEffect(() => {
    const meta = loader as MetaProps;
    if (meta) {
      const title = import.meta.env.VITE_GLOB_APP_TITLE;
      document.title = meta?.title ? `${meta.title} - ${title}` : title;
    }

    if (ROUTER_WHITE_LIST.includes(pathname)) return; // 路由白名单

    if (authMenuList.length && token && pathname === LOGIN_URL) {
      return navigate(HOME_URL);
    }

    if (!authMenuList.length && !token && pathname !== LOGIN_URL) {
      console.log("当没有token时，访问 / 拦截至登录页 Login");
      return navigate(LOGIN_URL, { replace: true });
    }

    // 无 Cookie 时，拦截至登陆页
    // const value = new StorageHandler()
    // if(!value.getCookieToken()) {
    // 	return navigate(LOGIN_URL, { replace: true });
    // }
  }, [loader]);

  return props.children;
};

export default RouterGuard;
