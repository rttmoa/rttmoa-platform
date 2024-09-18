import UserName from './components/UserName'
import AvatarIcon from './components/AvatarIcon'
import ComponentSize from './components/ComponentSize'
import Language from './components/Language'
import SearchMenu from './components/SearchMenu'
import ThemeSetting from './components/ThemeSetting'
import Message from './components/Message'
import Fullscreen from './components/Fullscreen'
import './index.less'

//  todo
//  todo <ThemeSetting />
//  todo <SearchMenu />
//  todo <Message />     ++import.meta.glob('/src/assets/images/notice*.png') as IconImports
//  todo <Fullscreen />  ++ahooks['useFullscreen']
//  todo <AvatarIcon />  ++InfoModal: forwardRef & useImperativeHandle
const ToolBarRight: React.FC = () => {
	return (
		<div className="tool-bar-ri">
			<div className="header-icon">
				{/* 主题设置 & 全局搜索框 & 通知 */}
				<ThemeSetting />
				<SearchMenu />
				<Message />

				{/* 组件大小 & 切换语言 & 全屏网页 */}
				<ComponentSize />
				<Language />
				<Fullscreen />
			</div>
			<UserName />
			<AvatarIcon />
		</div>
	)
}

export default ToolBarRight
