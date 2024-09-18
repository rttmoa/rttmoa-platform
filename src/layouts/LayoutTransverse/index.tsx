import React from 'react'
import { Layout } from 'antd'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight'
import LayoutMenu from '@/layouts/components//Menu'
import LayoutMain from '@/layouts/components/Main'
import logo from '@/assets/images/rttmoa-128x128.png'
import './index.less'

const { Header } = Layout
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

// TODO: 三、横向布局 - layout-transverse
const LayoutTransverse: React.FC = () => {
	return (
		// ? 上下布局； 上；Logo + Menu + HeaderRight   下：Content
		<section className="layout-transverse">
			<Header>
				<div className="logo">
					<img src={logo} alt="logo" className="logo-img" />
					<h2 className="logo-text">{APP_TITLE}</h2>
				</div>
				<LayoutMenu mode="horizontal" />
				<ToolBarRight />
			</Header>
			<Layout>
				<LayoutMain />
			</Layout>
		</section>
	)
}

export default LayoutTransverse
