import CollapseIcon from './components/CollapseIcon'
import BreadcrumbNav from './components/BreadcrumbNav'
import './index.less'

// todo 头部左侧 HeaderLeft：折叠菜单按钮 + 面包屑
const ToolBarLeft: React.FC = () => {
	return (
		<div className="tool-bar-lf mask-image">
			<CollapseIcon />
			<BreadcrumbNav />
		</div>
	)
}

export default ToolBarLeft
