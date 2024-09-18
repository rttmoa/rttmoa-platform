import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import { RouteObjectType } from '@/routers/interface'

export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'

export type LanguageType = 'zh' | 'en' | null

/* GlobalState */
export interface GlobalState {
	layout: LayoutType
	componentSize: SizeType
	compactAlgorithm: boolean
	borderRadius: number
	language: LanguageType
	maximize: boolean // 开启 ? 最大化
	primary: string
	isDark: boolean
	isGrey: boolean
	isWeak: boolean
	menuSplit: boolean
	siderInverted: boolean
	headerInverted: boolean
	isCollapse: boolean // 主题配置；开启 ? 折叠菜单
	accordion: boolean
	watermark: boolean // 主题配置；开启 ? 水印
	breadcrumb: boolean // 主题配置；开启 ? 面包屑
	breadcrumbIcon: boolean // 主题配置；开启 ? 面包屑图标
	tabs: boolean
	tabsIcon: boolean
	tabsDrag: boolean
	footer: boolean // 主题配置；开启 ? 页脚
	themeDrawerVisible: boolean // 开启 ? 主题抽屉可见
}

/* tabsMenuProps */
export interface TabsListProp {
	icon: string
	title: string
	path: string
	closable: boolean
}

/* TabsState */
export interface TabsState {
	tabsList: TabsListProp[] // TabsView
}

/* UserState */
export interface UserState {
	token: string // redux 中登陆用户的 Token
	userInfo: { name: string }
}

/* AuthState */
export interface AuthState {
	authMenuList: RouteObjectType[] // 接口中获取的菜单列表； (14)[{…}, {…}, {…}, {…}, ..................]
	showMenuList: RouteObjectType[] // 接口中使用递归过滤掉 菜单中 meta.isHide: true 的数据  (13)[{…}, {…}, {…}, {…}, ..................]
	flatMenuList: RouteObjectType[] // (60)Array: [{…}, {…}, {…}, {…}, {…}, ...............]
	authButtonList: {
		[key: string]: string[]
	}
}
