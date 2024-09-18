import React, { useEffect, useState } from 'react'
import { Divider, Layout } from 'antd'
import { Icon } from '@/components/Icon'
import { RootState, useSelector } from '@/redux'
import { RouteObjectType } from '@/routers/interface'
import { useLocation, useNavigate } from 'react-router-dom'
import ToolBarLeft from '@/layouts/components/Header/ToolBarLeft'
import ToolBarRight from '@/layouts/components/Header/ToolBarRight'
import LayoutMenu from '@/layouts/components//Menu'
import LayoutMain from '@/layouts/components/Main'
import logo from '@/assets/images/rttmoa-128x128.png'
import './index.less' // todo 分栏布局 LESS

const { Header, Sider } = Layout
const APP_TITLE = import.meta.env.VITE_GLOB_APP_TITLE

// TODO: 四、分栏布局 - layout-columns
// 需求分析；
// 1、通过地址栏获取主菜单；处理主菜单获取子菜单列表，渲染主菜单
// 2、点击其他主菜单，切换至其他主菜单，并渲染出其他主菜单的子菜单
// 3、分栏布局： 依次渲染  主列、次列、头部、内容
const LayoutColumns: React.FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const isCollapse = useSelector((state: RootState) => state.global.isCollapse)
	const showMenuList = useSelector((state: RootState) => state.auth.showMenuList) // 接口中使用递归过滤掉 菜单中 meta.isHide: true 的数据
	// console.log("showMenuList", showMenuList); // Array(13)[{…},... ]

	const [menuActive, setMenuActive] = useState('') // 设置当前访问的地址栏 pathname
	const [subMenuList, setSubMenuList] = useState<RouteObjectType[]>([]) // 设置子菜单列表 (根据地址栏路由通过menuList获取访问的路由，获取 children[] 即可)

	useEffect(() => {
		if (!showMenuList.length) return
		// console.log("pathname", pathname); // pathname /auth/button
		const menuItem = showMenuList.find(item => {
			// console.log(item.path);
			return pathname === item.path || `/${pathname.split('/')[1]}` === item.path
		})
		// console.log(menuItem);
		setMenuActive(pathname)
		setSubMenuList(menuItem?.children || [])
	}, [pathname])

	// 点击其他 主菜单 跳转
	const handleNavigation = (item: RouteObjectType) => {
		if (item.meta?.isLink) window.open(item.meta.isLink, '_blank')
		// console.log("navigate", item.path);
		navigate(item.path!)
	}
	// 点击其他 主菜单 处理
	const clickOtherMenu = (item: RouteObjectType) => {
		setMenuActive(item.path!)
		setSubMenuList(item.children || [])
		handleNavigation(item.children?.length ? item.children[0] : item)
	}
	// 返回 主菜单 列表结构
	function menuListStructure() {
		return showMenuList.map(item => {
			let activeSelMenu = menuActive === item.path || `/${menuActive.split('/')[1]}` === item.path // 高亮 选中项
			return (
				<div key={item.path} className={`menu-item ${activeSelMenu && 'menu-active'}`} onClick={() => clickOtherMenu(item)}>
					<Icon name={item.meta!.icon!} />
					<span className="title sle">{item.meta?.title}</span>
				</div>
			)
		})
	}

	// todo
	// todo 分栏布局： 主列、次列、头部、内容
	return (
		<section className="layout-columns">
			<div className="sider-split">
				<div className="logo">
					<img src={logo} alt="logo" className="logo-img" />
				</div>
				<div className="menu-list">{menuListStructure()}</div>
			</div>
			<Sider width={210} collapsed={isCollapse} className={`${!subMenuList.length && 'not-sider'}`}>
				{subMenuList.length && (
					<>
						<div className="logo">
							<span className="logo-text">{isCollapse ? 'R' : APP_TITLE}</span>
						</div>
						<LayoutMenu mode="inline" menuList={subMenuList} />
					</>
				)}
			</Sider>
			<Layout>
				<Header>
					<ToolBarLeft />
					<ToolBarRight />
				</Header>
				<LayoutMain />
			</Layout>
		</section>
	)
}

export default LayoutColumns
