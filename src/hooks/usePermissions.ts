import { notification } from "@/hooks/useMessage";
import { useDispatch } from "@/redux";
import { setToken } from "@/redux/modules/user";
import { setAuthButtonList, setAuthMenuList } from "@/redux/modules/auth";
import { getAuthMenuListApi, getAuthButtonListApi } from "@/api/modules/login";

// todo
// todo 登陆/刷新页面时；将用户按钮权限和菜单权限存到 redux
const usePermissions = () => {
  const dispatch = useDispatch();

  const initPermissions = async (token: string) => {
    if (token) {
      try {
        const { data: buttonList } = await getAuthButtonListApi(); // 用户按钮权限
        const { data: menuList } = await getAuthMenuListApi(); // 用户菜单权限
        dispatch(setAuthButtonList(buttonList));
        dispatch(setAuthMenuList(menuList));
        // console.log(menuList);

        // No menu permission
        if (!menuList.length) {
          notification.warning({
            message: "无权限访问",
            description: "当前账号无任何菜单权限，请联系系统管理员！"
          });
          dispatch(setToken(""));
          return Promise.reject("No permission");
        }
      } catch (error) {
        // When the button | | menu request error occurs, clear the token
        dispatch(setToken(""));
        return Promise.reject(error);
      }
    }
  };

  return { initPermissions };
};

export default usePermissions;
