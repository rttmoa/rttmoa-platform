import { RootState, useSelector } from '@/redux';
import { getMenuByPath } from '@/utils';

/**
 * @description  use Hooks Set auth button
 */
const useAuthButton = () => {
	// * 配置每个角色 不同的表配置不同的按钮
	const authButtonList = useSelector((state: RootState) => state.auth.authButtonList);
	console.log('authButtonList', authButtonList);
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

	let currentPageAuthButton: { [key: string]: boolean } = {};

	authButtonList[meta.key!]?.forEach(item => (currentPageAuthButton[item] = true));

	console.log('currentPageAuthButton', currentPageAuthButton);
	return {
		BUTTONS: currentPageAuthButton,
	};
};

export default useAuthButton;
