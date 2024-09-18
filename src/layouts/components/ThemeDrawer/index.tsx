/* eslint-disable prettier/prettier */
import { Drawer, Divider, Switch, Popover, InputNumber, Tooltip } from 'antd'
import { setGlobalState } from '@/redux/modules/global'
import { RootState, useDispatch, useSelector } from '@/redux'
import { LayoutOutlined, FireOutlined, SettingOutlined, CheckCircleFilled, QuestionCircleOutlined } from '@ant-design/icons'
import ColorPicker from './components/ColorPicker'
import './index.less'

const NODE_ENV = import.meta.env.VITE_USER_NODE_ENV

// TODO: 1、主题设置&设置全局配置（主题颜色、圆角大小）     2、主题设置组件 HTML结构 + CSS样式
const ThemeDrawer: React.FC = () => {
	const dispatch: any = useDispatch()
	const {
		layout,
		compactAlgorithm,
		borderRadius,
		isDark,
		isGrey,
		isWeak,
		menuSplit,
		siderInverted,
		headerInverted,
		isCollapse,
		accordion,
		watermark,
		breadcrumb,
		breadcrumbIcon,
		tabs,
		tabsIcon,
		tabsDrag,
		footer,
		themeDrawerVisible,
	} = useSelector((state: RootState) => state.global)

	return (
		<Drawer
			className="theme-drawer"
			title="主题配置"
			width={290}
			closable={false}
			maskClosable={true}
			open={themeDrawerVisible}
			onClose={() => dispatch(setGlobalState({ key: 'themeDrawerVisible', value: false }))}>
			{/* TODO: ====布局样式==== */}
			<Divider className="divider">
				<LayoutOutlined />
				布局样式
			</Divider>
			{/* 开始；四个布局：纵向、经典、横向、流式 */}
			<div className="layout-box">
				<Tooltip placement="top" title="纵向" arrow={true} mouseEnterDelay={0.2}>
					<div
						className={`layout-item mb22 layout-vertical ${layout === 'vertical' && 'layout-active'}`}
						onClick={() => dispatch(setGlobalState({ key: 'layout', value: 'vertical' }))}>
						<div className="layout-dark"></div>
						<div className="layout-container">
							<div className="layout-light"></div>
							<div className="layout-content"></div>
						</div>
						{layout === 'vertical' && <CheckCircleFilled />}
					</div>
				</Tooltip>
				<Tooltip placement="top" title="经典" arrow={true} mouseEnterDelay={0.2}>
					<div
						className={`layout-item mb22 layout-classic ${layout === 'classic' && 'layout-active'}`}
						onClick={() => dispatch(setGlobalState({ key: 'layout', value: 'classic' }))}>
						<div className="layout-dark"></div>
						<div className="layout-container">
							<div className="layout-light"></div>
							<div className="layout-content"></div>
						</div>
						{layout === 'classic' && <CheckCircleFilled />}
					</div>
				</Tooltip>
				<Tooltip placement="top" title="横向" arrow={true} mouseEnterDelay={0.2}>
					<div
						className={`layout-item layout-transverse ${layout === 'transverse' && 'layout-active'}`}
						onClick={() => dispatch(setGlobalState({ key: 'layout', value: 'transverse' }))}>
						<div className="layout-dark"></div>
						<div className="layout-content"></div>
						{layout === 'transverse' && <CheckCircleFilled />}
					</div>
				</Tooltip>
				<Tooltip placement="top" title="分栏" arrow={true} mouseEnterDelay={0.2}>
					<div
						className={`layout-item layout-columns ${layout === 'columns' && 'layout-active'}`}
						onClick={() => dispatch(setGlobalState({ key: 'layout', value: 'columns' }))}>
						<div className="layout-dark"></div>
						<div className="layout-light"></div>
						<div className="layout-content"></div>
						{layout === 'columns' && <CheckCircleFilled />}
					</div>
				</Tooltip>
			</div>
			{/* 结束；四个布局：纵向、经典、横向、流式 */}
			<div className="theme-item mt30">
				<span>
					菜单分割
					<Tooltip title="经典模式下生效">
						<QuestionCircleOutlined />
					</Tooltip>
				</span>
				<Switch disabled={layout !== 'classic'} checked={menuSplit} onChange={(value: any) => dispatch(setGlobalState({ key: 'menuSplit', value }))} />
			</div>
			<div className="theme-item">
				<span>
					侧边栏反转色
					<Tooltip title="侧边栏颜色变为深色模式">
						<QuestionCircleOutlined />
					</Tooltip>
				</span>
				<Switch checked={siderInverted} onChange={(value: any) => dispatch(setGlobalState({ key: 'siderInverted', value }))} />
			</div>
			<div className="theme-item mb35">
				<span>
					头部反转色
					<Tooltip title="头部颜色变为深色模式">
						<QuestionCircleOutlined />
					</Tooltip>
				</span>
				<Switch checked={headerInverted} onChange={(value: any) => dispatch(setGlobalState({ key: 'headerInverted', value }))} />
			</div>

			{/* TODO: --全局主题-- */}
			<Divider className="divider">
				<FireOutlined />
				全局主题
			</Divider>
			<div className="theme-item">
				<span>主题颜色</span>
				<Popover placement="left" trigger="click" content={<ColorPicker />}>
					<label className="primary"></label>
				</Popover>
			</div>
			<div className="theme-item">
				<span>暗黑模式</span>
				<Switch
					checked={isDark}
					checkedChildren={<span className="dark-icon dark-icon-sun">🌞</span>}
					unCheckedChildren={<span className="dark-icon dark-icon-moon">🌛</span>}
					onChange={(value: any) => dispatch(setGlobalState({ key: 'isDark', value }))}
				/>
			</div>
			<div className="theme-item">
				<span>灰色模式</span>
				<Switch
					checked={isGrey}
					onChange={(value: any) => {
						if (isWeak) dispatch(setGlobalState({ key: 'isWeak', value: false }))
						dispatch(setGlobalState({ key: 'isGrey', value }))
					}}
				/>
			</div>
			<div className="theme-item">
				<span>色弱模式</span>
				<Switch
					checked={isWeak}
					onChange={(value: any) => {
						if (isGrey) dispatch(setGlobalState({ key: 'isGrey', value: false }))
						dispatch(setGlobalState({ key: 'isWeak', value }))
					}}
				/>
			</div>
			<div className="theme-item">
				<span>紧凑主题</span>
				<Switch checked={compactAlgorithm} onChange={(value: any) => dispatch(setGlobalState({ key: 'compactAlgorithm', value }))} />
			</div>
			<div className="theme-item  mb35">
				<span>圆角大小</span>
				<InputNumber
					min={1}
					max={20}
					style={{ width: 80 }}
					defaultValue={borderRadius}
					formatter={(value: any) => `${value}px`}
					parser={(value: any) => (value ? value!.replace('px', '') : 6) as number}
					onChange={(value: any) => {
						const newValue = value || 6
						dispatch(setGlobalState({ key: 'borderRadius', value: newValue }))
					}}
				/>
			</div>

			{/* TODO: --界面设置-- */}
			<Divider className="divider">
				<SettingOutlined />
				界面设置
			</Divider>
			<div className="theme-item">
				<span>菜单折叠</span>
				<Switch checked={isCollapse} onChange={(value: any) => dispatch(setGlobalState({ key: 'isCollapse', value }))} />
			</div>
			<div className="theme-item">
				<span>菜单手风琴</span>
				<Switch checked={accordion} onChange={(value: any) => dispatch(setGlobalState({ key: 'accordion', value }))} />
			</div>
			<div className="theme-item">
				<span>水印</span>
				<Switch checked={watermark} disabled={NODE_ENV !== 'development'} onChange={(value: any) => dispatch(setGlobalState({ key: 'watermark', value }))} />
			</div>
			<div className="theme-item">
				<span>面包屑</span>
				<Switch checked={breadcrumb} onChange={(value: any) => dispatch(setGlobalState({ key: 'breadcrumb', value }))} />
			</div>
			<div className="theme-item">
				<span>面包屑图标</span>
				<Switch checked={breadcrumbIcon} onChange={(value: any) => dispatch(setGlobalState({ key: 'breadcrumbIcon', value }))} />
			</div>
			<div className="theme-item">
				<span>标签栏</span>
				<Switch checked={tabs} onChange={(value: any) => dispatch(setGlobalState({ key: 'tabs', value }))} />
			</div>
			<div className="theme-item">
				<span>标签栏图标</span>
				<Switch checked={tabsIcon} onChange={(value: any) => dispatch(setGlobalState({ key: 'tabsIcon', value }))} />
			</div>
			<div className="theme-item">
				<span>标签栏拖拽</span>
				<Switch checked={tabsDrag} onChange={(value: any) => dispatch(setGlobalState({ key: 'tabsDrag', value }))} />
			</div>
			<div className="theme-item">
				<span>页脚</span>
				<Switch checked={footer} onChange={(value: any) => dispatch(setGlobalState({ key: 'footer', value }))} />
			</div>
		</Drawer>
	)
}

export default ThemeDrawer
