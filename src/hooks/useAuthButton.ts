import { RootState, useSelector } from "@/redux";
import { getMenuByPath } from "@/utils";

/**
 * @description  use Hooks Set auth button
 */
const useAuthButton = () => {
  const authButtonList = useSelector((state: RootState) => state.auth.authButtonList);
  // console.log(authButtonList);
  // {
  //   "authButton": [
  //       "add",
  //       "edit",
  //       "delete",
  //       "import",
  //       "export"
  //   ],
  //   "useProTable": [
  //       "add",
  //       "batchAdd",
  //       "export",
  //       "batchDelete",
  //       "status"
  //     ]
  // }
  const meta = getMenuByPath()?.meta ?? {};
  // console.log(meta);

  let currentPageAuthButton: { [key: string]: boolean } = {};

  authButtonList[meta.key!]?.forEach(item => (currentPageAuthButton[item] = true));

  return {
    BUTTONS: currentPageAuthButton
  };
};

export default useAuthButton;
