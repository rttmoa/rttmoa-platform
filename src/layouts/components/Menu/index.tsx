import { useEffect, useMemo, useState } from 'react';
import { Menu, MenuProps, Tooltip } from 'antd';
import { useLocation, useNavigate, useMatches } from 'react-router-dom';
import { RouteObjectType, MetaProps } from '@/routers/interface';
import { RootState, useSelector } from '@/redux';
import { shallowEqual } from 'react-redux';
import { getOpenKeys } from '@/utils';
import { Icon } from '@/components/Icon';
import './index.less';

interface LayoutMenuProps {
	mode: MenuProps['mode']; // Props: "inline" || "horizontal" || "vertical"
	menuList?: RouteObjectType[];
	menuSplit?: boolean;
}

// todo
// todo 菜单逻辑
const LayoutMenu: React.FC<LayoutMenuProps> = ({ mode, menuList, menuSplit }) => {
	const matches = useMatches();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const { layout, isDark, accordion, isCollapse, siderInverted, headerInverted, showMenuList, flatMenuList } = useSelector(
		(state: RootState) => ({
			layout: state.global.layout,
			isDark: state.global.isDark,
			accordion: state.global.accordion,
			isCollapse: state.global.isCollapse,
			siderInverted: state.global.siderInverted,
			headerInverted: state.global.headerInverted,
			showMenuList: state.auth.showMenuList,
			flatMenuList: state.auth.flatMenuList,
		}),
		shallowEqual
	);

	const [openKeys, setOpenKeys] = useState<string[]>([]); // todo 当前展开的 SubMenu 菜单项 key 数组
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // todo 当前选中的菜单项 key 数组
	const [splitSelectedKeys, setSplitSelectedKeys] = useState<string[]>([]); // todo 当分割时，当前选中菜单项的key数组

	// 生成 label 的封装，统一给所有菜单加 Tooltip + 省略号
	function renderLabel(title: any) {
		return (
			<Tooltip title={title}>
				<span
					style={{
						maxWidth: 150, // 控制菜单项的最大宽度，可调整
						display: 'inline-block',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						verticalAlign: 'middle',
					}}
				>
					{title}
				</span>
			</Tooltip>
		);
	}

	type MenuItem = Required<MenuProps>['items'][number];
	function getItem(label: React.ReactNode, key?: React.Key | null, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
		return {
			key,
			icon,
			children,
			label: renderLabel(label),
			type,
		} as MenuItem;
	}
	const AsAntdMenu = (list: RouteObjectType[]): MenuItem[] => {
		return list.map(item => {
			const title = item.meta?.title ?? '';
			const icon = <Icon name={item.meta!.icon!} />;
			return !item.children?.length ? getItem(title, item.path, icon) : getItem(title, item.path, icon, AsAntdMenu(item.children)); // 递归
		});
	};

	//  Menu['items']：Menu列表结构  (处理Menu为Antd所需要的格式)
	const antdMenuList = useMemo(() => AsAntdMenu(menuList ?? showMenuList), [menuList, showMenuList]);

	useEffect(() => {
		const meta = matches[matches.length - 1].data as MetaProps;
		const path = meta?.activeMenu ?? pathname;
		setSelectedKeys([path]);

		const splitPath = `/${path.split('/')[1]}`; // ['', 'home', 'index'] || ['', 'assembly', 'guide']
		// console.log(path.split("/"));
		let selectPath = Boolean(showMenuList.find(item => item.path === splitPath));
		setSplitSelectedKeys([selectPath ? splitPath : path]);

		// 使用 setTimeout 防止菜单展开样式异常
		if (accordion) setTimeout(() => isCollapse || setOpenKeys(getOpenKeys(pathname)));
	}, [matches, isCollapse]);

	// ! Menu['onOpenChange']： SubMenu 展开/关闭的回调
	// ! Menu['openKeys']：当前展开的 SubMenu 菜单项 key 数组
	const onOpenChange: MenuProps['onOpenChange'] = openKeys => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	const handleMenuNavigation = (path: string) => {
		const menuItem = flatMenuList.find(item => item.path === path);
		if (menuItem?.meta?.isLink) window.open(menuItem.meta.isLink, '_blank');
		else navigate(path);
	};
	// ! Menu['onClick']: 点击 MenuItem 调用此函数  (如果菜单下有children，key为MenuItem、菜单下无children，key为Menu)
	const clickMenu: MenuProps['onClick'] = ({ key }) => {
		// console.log("clickMenu", key);
		// 菜单分割：经典模式下
		if (menuSplit) {
			const children = showMenuList.find(item => item.path === key)?.children;
			if (children?.length) return handleMenuNavigation(children[0].path!);
			handleMenuNavigation(key);
		} else {
			return handleMenuNavigation(key);
		}
	};

	// ! 是否是黑暗模式
	const isClassicLayout = useMemo(() => layout === 'classic', [layout]); // 经典布局
	const isTransverseLayout = useMemo(() => layout === 'transverse', [layout]);
	const isDarkTheme = useMemo(() => {
		if (isDark) return true;
		if (headerInverted && isTransverseLayout) return true;
		if (headerInverted && isClassicLayout && menuSplit) return true;
		if (siderInverted && !isTransverseLayout && !menuSplit) return true;
		return false;
	}, [layout, isDark, headerInverted, siderInverted, menuSplit]);

	// console.log("是否分割+模式", !!menuSplit, mode); // inline / horizontal
	return (
		// ! Menu-Api：https://ant.design/components/menu-cn#api
		<Menu
			theme={isDarkTheme ? 'dark' : 'light'} // 主题颜色
			mode={mode} //  "inline" || "horizontal" || "vertical"
			selectedKeys={menuSplit ? splitSelectedKeys : selectedKeys} // 当前选中的菜单项 key 数组;  string[]
			onClick={clickMenu} // 点击 MenuItem 调用此函数
			items={antdMenuList} // type: https://ant.design/components/menu-cn#itemtype
			{...(!isTransverseLayout && accordion && { openKeys, onOpenChange })}
		/>
	);
};

export default LayoutMenu;
