import { type MenuProps, Dropdown } from 'antd'
import { useDispatch, RootState, useSelector } from '@/redux'
import { setGlobalState } from '@/redux/modules/global'
import { SizeType } from 'antd/es/config-provider/SizeContext'

const ComponentSize: React.FC = () => {
	const dispatch = useDispatch()
	const componentSize = useSelector((state: RootState) => state.global.componentSize)

	// 点击设置组件大小
	const setComponentSize: MenuProps['onClick'] = val => {
		// console.log(val); // {key: 'middle', keyPath: Array(1), domEvent: SyntheticBaseEvent}
		dispatch(setGlobalState({ key: 'componentSize', value: val.key as SizeType }))
	}

	const items: MenuProps['items'] = [
		{ key: 'middle', label: <span style={{ fontFamily: 'aliFonts' }}>默认</span>, disabled: componentSize === 'middle' },
		{ key: 'large', label: <span style={{ fontFamily: 'aliFonts' }}>大型</span>, disabled: componentSize === 'large' },
		{ key: 'small', label: <span style={{ fontFamily: 'aliFonts' }}>小型</span>, disabled: componentSize === 'small' },
	]

	const menuProps = {
		items,
		onClick: setComponentSize,
	}

	return (
		<Dropdown menu={menuProps} placement="bottom" arrow trigger={['click']}>
			<i className="iconfont icon-contentright"></i>
		</Dropdown>
	)
}

export default ComponentSize
