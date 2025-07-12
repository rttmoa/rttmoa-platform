import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { RootState, useSelector } from '@/redux';
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft';
import ToolBarRight from '@/layouts/components/Header/ToolBarRight';
import LayoutMenu from '@/layouts/components//Menu';
import LayoutMain from '@/layouts/components/Main';
// import logo from '@/assets/images/rttmoa-128x128.png';
import logo2 from '@/assets/images/upack2.png';
import './index.less'; // todo 垂直布局 LESS

const { Header, Sider } = Layout;
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE;

// TODO: 一、纵向布局 - loyout-vertical
const LayoutVertical: React.FC = () => {
	const isCollapse = useSelector((state: RootState) => state.global.isCollapse);

	return (
		// ! 左右布局;  自定义触发器：https://ant.design/components/layout-cn#components-layout-demo-custom-trigger
		<section className='layout-vertical'>
			<Sider width={210} collapsed={isCollapse}>
				<div className='logo'>
					<img src={logo2} alt='logo' className='logo-img' />
					{!isCollapse && <h2 className='logo-text'>{APP_TITLE}</h2>}
				</div>
				{/* 正常布局：不用传递，只要遍历接口传递过来的数据即可 */}
				<LayoutMenu mode='inline' />
			</Sider>
			<Layout>
				<Header>
					<ToolBarLeft />
					<ToolBarRight />
				</Header>
				<LayoutMain />
			</Layout>
		</section>
	);
};

export default LayoutVertical;
