import React, { useEffect, useState } from 'react'
import { Layout } from 'antd'
import { useLocation } from 'react-router-dom'
import { getFirstLevelMenuList } from '@/utils'
import { RootState, useSelector } from '@/redux'
import { RouteObjectType } from '@/routers/interface'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight'
import LayoutMenu from '@/layouts/components//Menu'
import LayoutMain from '@/layouts/components/Main'
import CollapseIcon from '../components/Header/components/CollapseIcon'
import logo from '@/assets/images/rttmoa-128x128.png'
import './index.less' // todo 经典布局LESS

const { Header, Sider } = Layout
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

// TODO: 二、经典布局 - layout-classic
const LayoutClassic: React.FC = () => {
	const { pathname } = useLocation()

	const isCollapse = useSelector((state: RootState) => state.global.isCollapse) // 菜单折叠
	const menuSplit = useSelector((state: RootState) => state.global.menuSplit) // 菜单分割； 仅经典布局模式
	const showMenuList = useSelector((state: RootState) => state.auth.showMenuList) // 显示的菜单项；不包括Static Router
	const firstLevelMenuList = getFirstLevelMenuList(showMenuList) // 处理完；无children属性

	const [subMenuList, setSubMenuList] = useState<RouteObjectType[]>([])

	// console.log(menuSplit);
	// console.log(showMenuList);
	// console.log(firstLevelMenuList);
	useEffect(() => {
		if (menuSplit) {
			//* 根据当前路由，找到对应的一级菜单下的二级菜单
			const menuItem = showMenuList.find(item => {
				return pathname === item.path || `/${pathname.split('/')[1]}` === item.path
			})
			// console.log(menuItem?.path, menuItem);
			setSubMenuList(menuItem?.children || [])
		}
	}, [pathname, menuSplit])

	function subMenuStructure() {
		return (
			subMenuList.length > 0 && (
				<>
					<LayoutMenu mode="inline" menuList={subMenuList} />
					<div className="collapse-box">{<CollapseIcon />}</div>
				</>
			)
		)
	}

	// todo
	// todo 经典布局：Menu分割
	return (
		// 两种结构；   上下：  上；Logo + 菜单 / HeaderLeft + HeaderRight   下；菜单 + 主体
		<section className="layout-classic">
			<Header>
				<div className={`header-lf ${menuSplit ? 'hide-logo' : 'mask-image'}`}>
					<div className="logo">
						<img src={logo} alt="logo" className="logo-img" />
						<h2 className="logo-text">{APP_TITLE}</h2>
					</div>
					{menuSplit ? <LayoutMenu mode="horizontal" menuList={firstLevelMenuList} menuSplit={true} /> : <ToolBarLeft />}
				</div>
				<div className="header-ri">
					<ToolBarRight />
				</div>
			</Header>
			<div className="classic-content">
				<Sider width={210} collapsed={isCollapse} className={`${!subMenuList.length && menuSplit ? 'not-sider' : ''}`}>
					{menuSplit ? subMenuStructure() : <LayoutMenu mode="inline" />}
				</Sider>
				<div className="classic-main">
					<LayoutMain />
				</div>
			</div>
		</section>
	)
}

export default LayoutClassic
