import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GlobalState } from '@/redux/interface'
import { DEFAULT_PRIMARY } from '@/config'

const globalState: GlobalState = {
	// 布局 模式 (vertical | classic | transverse | columns)
	layout: 'vertical',
	// antd 组件大小 ("small" | "middle" | "large") 默认，大型，小型
	componentSize: 'middle',

	// current system language
	language: null,
	// 当前页面是否全屏；TabsView下拉中 最大化   (Main布局中设置 root.classList.toggle("main-maximize", maximize))
	maximize: false,

	// ! 全局主题 -> 默认主题颜色 （颜色挑选器）
	primary: DEFAULT_PRIMARY,
	// 全局主题 -> 暗黑 模式
	isDark: false,
	// 全局主题 -> 灰色 模式
	isGrey: false,
	// 全局主题 -> 色弱 模式
	isWeak: false,
	// 全局主题 -> antd 紧凑主题
	compactAlgorithm: false,
	// 全局主题 -> antd 全局圆角大小
	borderRadius: 6,

	// 布局样式 -> 菜单 分割
	menuSplit: true,
	// 布局样式 -> 侧边 反转色
	siderInverted: false,
	// 布局样式 -> 头部 反转色
	headerInverted: false,

	// 界面设置 -> 菜单 折叠
	isCollapse: false,
	// 界面设置 -> 菜单手风琴
	accordion: true,
	// 界面设置 -> 水印
	watermark: false,
	// 界面设置 -> 面包屑
	breadcrumb: true,
	// 界面设置 -> 面包屑图标
	breadcrumbIcon: true,
	// 界面设置 -> 标签栏
	tabs: true,
	// 界面设置 -> 标签栏图标
	tabsIcon: true,
	// 界面设置 -> 标签栏拖拽
	tabsDrag: true,
	// 界面设置 -> 页脚
	footer: true,

	// 主题盒子 Drawer 弹窗
	themeDrawerVisible: false,
}

const globalSlice = createSlice({
	name: 'hooks-global',
	initialState: globalState,
	reducers: {
		// TODO: 泛型类型
		setGlobalState<T extends keyof GlobalState>(state: GlobalState, { payload }: PayloadAction<ObjToKeyValUnion<GlobalState>>) {
			state[payload.key as T] = payload.value as GlobalState[T]
		},
	},
})
// console.log(globalSlice);

export const { setGlobalState } = globalSlice.actions
export default globalSlice.reducer

// 使用：
// <div>
//   <span>水印</span>
//   <Swith checked={state.global.watermark} onChange={value => dispatch(setGlobalState({ key: "watermark", value })) }></Swith>
// </div>
