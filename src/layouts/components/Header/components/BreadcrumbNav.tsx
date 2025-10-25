/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import { MetaProps, RouteObjectType } from '@/routers/interface';
import { Link, useMatches } from 'react-router-dom';
import { RootState, useSelector } from '@/redux';
import { getAllBreadcrumbList } from '@/utils';
import { Icon } from '@/components/Icon';
import { HOME_URL } from '@/config';

// ? HeaderLeft > 处理 面包屑
// 1、是否显示 面包屑
// 2、是否显示 面包屑图标
// 3、可在面包屑中查看其他导航、可以点击跳转到其他导航
// http://localhost:9527/#/feat/breadcrumb/children
const BreadcrumbNav: React.FC = () => {
	const matches = useMatches();

	const authMenuList = useSelector((state: RootState) => state.auth.authMenuList); // 接口中的 菜单列表
	const breadcrumb = useSelector((state: RootState) => state.global.breadcrumb); // 是否显示 面包屑
	const breadcrumbIcon = useSelector((state: RootState) => state.global.breadcrumbIcon); // 是否显示 面包屑图标
	// console.log('接口 authMenuList：', authMenuList);

	// ? 使用递归查找 所有面包屑数据
	const breadcrumbAllList = useMemo(() => getAllBreadcrumbList(authMenuList), [authMenuList]);
	// console.log('处理后的面包屑列表', breadcrumbAllList); // Object： {home: Array(1), dataScreen: Array(1), auth: Array(1), pageMenu: Array(2), authButton: Array(2),…}

	const [curBreadcrumbList, setCurBreadcrumbList] = useState<ItemType[]>([]); // 设置 当前路由的面包屑 格式

	// Render Breadcrumb Title
	const renderTitle = (item: RouteObjectType, isLink: boolean) => {
		const { icon, title } = item.meta || {};
		const content = (
			<React.Fragment>
				<span className='mr5'>{breadcrumbIcon && <Icon name={icon!} />}</span>
				&nbsp;
				<span>{title}</span>
			</React.Fragment>
		);
		return isLink ? <Link to={item.path!}>{content}</Link> : content;
	};

	useEffect(() => {
		const meta = matches[matches.length - 1].data as MetaProps;
		if (!meta?.key) return;
		// console.log(matches, matches[matches.length - 1].pathname, meta.key);
		// (2)[{…}, {…}] '/menu/menu2/menu21' 'menu21'  ||  (2)[{…}, {…}] '/feat/breadcrumb/children' 'breadcrumbChildren'
		let breadcrumbList = breadcrumbAllList[meta.key] || [];
		// console.log('当前访问面包屑数据：', breadcrumbAllList[meta.key]);

		// 处理为面包屑格式：比如； 首页 / 常用功能 / 面包屑 / 平级模式
		if (breadcrumbList[0]?.path !== HOME_URL) {
			breadcrumbList.unshift({ path: HOME_URL, meta: { icon: 'HomeOutlined', title: '首页' } }); // 数组头部插入  （注释掉可查看详情）
		}

		// todo 处理成 antd 面包屑需要的格式
		const AsAntdBreadcrumbList = breadcrumbList.map(item => {
			// console.log(item);
			// console.log(breadcrumbList.lastIndexOf(item));
			const isLastElement = breadcrumbList.lastIndexOf(item) === breadcrumbList.length - 1;
			// console.log(isLast); // 最后一个为ture、其他为false

			if (isLastElement) return { title: renderTitle(item, false) }; // 最后一项的面包屑是不能点击的

			if (item.children) {
				// 过滤掉children中有isHide属性的，比如：常用功能》面包屑》平级详情 被隐藏
				const items = item.children.filter(child => !child.meta?.isHide);
				return items.length
					? {
							// ! 面包屑属性；弹出下拉菜单的自定义配置；https://ant.design/components/breadcrumb-cn#routeitemtype
							dropdownProps: { arrow: { pointAtCenter: true } },
							title: <a>{renderTitle(item, false)}</a>,
							// 面包屑属性；菜单配置项
							menu: {
								items: items.map(child => {
									return { title: renderTitle(child, true) };
								}),
							},
						}
					: { title: renderTitle(item, true) };
			}
			return { title: renderTitle(item, true) };
		});
		// console.log(AsAntdBreadcrumbList);
		setCurBreadcrumbList(AsAntdBreadcrumbList);
	}, [matches, breadcrumbIcon]);
	// console.log("当前访问页面包屑数组：", curBreadcrumbList);
	// console.log("==============================");
	// Typescript Breadcrumb || https://ant.design/components/breadcrumb-cn#api

	// ! 返回处理后的 面包屑导航
	return <React.Fragment>{breadcrumb && <Breadcrumb items={curBreadcrumbList}></Breadcrumb>}</React.Fragment>;
};

export default BreadcrumbNav;
