/* eslint-disable prettier/prettier */
import React from 'react';
import { Layout } from 'antd';
import { useDebounceFn } from 'ahooks';
import { RefreshContext } from '@/context/Refresh';
import { useEffect, createRef, useContext } from 'react';
import { RouteObjectType } from '@/routers/interface';
import { useLocation, useOutlet } from 'react-router-dom';
import { setGlobalState } from '@/redux/modules/global';
import { RootState, useDispatch, useSelector } from '@/redux';
// 动画效果： CSSTransition 过滤 ， SwitchTransition 组件切换显示与隐藏
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Maximize from './components/Maximize';
import LayoutTabs from '@/layouts/components/Tabs';
import LayoutFooter from '@/layouts/components/Footer';
import './index.less';

type RouteTypeWithNodeRef = {
	nodeRef?: React.Ref<HTMLElement> | undefined;
} & RouteObjectType;

const { Content } = Layout;

const LayoutMain: React.FC = () => {
	const outlet = useOutlet();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const { outletShow } = useContext(RefreshContext);

	const maximize = useSelector((state: RootState) => state.global.maximize); // ! 是否 最大化
	const isCollapse = useSelector((state: RootState) => state.global.isCollapse); // ! 是否 折叠
	const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList); // ! 菜单权限列表 (扁平化数组)

	// ! 监视窗口变化，折叠菜单
	const { run } = useDebounceFn(
		() => {
			const screenWidth = document.body.clientWidth; // 客户端可视区域内，内容区的宽度
			if (screenWidth) {
				const shouldCollapse = screenWidth < 1200;
				if (isCollapse !== shouldCollapse) dispatch(setGlobalState({ key: 'isCollapse', value: shouldCollapse }));
			}
		},
		{ wait: 200 }
	);
	useEffect(() => {
		window.addEventListener('resize', run, false);
		return () => window.removeEventListener('resize', run);
	}, []);

	// ! 监控当前页面是否最大化，将某个class移入或移出当前元素
	useEffect(() => {
		const root = document.getElementById('root') as HTMLElement;
		root.classList.toggle('main-maximize', maximize); // stlyes/common.less/.main-maximize{}  ||   Element对象：https://blog.csdn.net/shan_03/article/details/127062720
	}, [maximize]);

	// 解决过渡动画导致useEffect执行多次的问题
	// @see: http://reactcommunity.org/react-transition-group/with-react-router
	const menuList: RouteTypeWithNodeRef[] = flatMenuList.map(item => ({ ...item, nodeRef: createRef() }));
	const { nodeRef } = menuList.find(route => route.path === pathname) ?? {};

	// console.log(outlet);
	return (
		<>
			<Maximize />
			<LayoutTabs />
			<SwitchTransition>
				<CSSTransition classNames='fade' key={pathname} nodeRef={nodeRef} timeout={300} exit={false} unmountOnExit>
					{/* <Content ref={nodeRef}></Content> */}
					{/* <Content ref={nodeRef}>{outlet}</Content> */}
					<Content ref={nodeRef}>{outletShow && outlet}</Content>
				</CSSTransition>
			</SwitchTransition>
			<LayoutFooter />
		</>
	);
};
export default LayoutMain;
