/* eslint-disable prettier/prettier */
import { useContext, CSSProperties } from 'react'
import { Dropdown, MenuProps } from 'antd'
import { HOME_URL } from '@/config'
import { useTranslation } from 'react-i18next'
import { IconFont } from '@/components/Icon'
import { useDispatch } from '@/redux'
import { useNavigate } from 'react-router-dom'
import { RefreshContext } from '@/context/Refresh'
import { setGlobalState } from '@/redux/modules/global'
import { removeTab, closeMultipleTab, closeTabsOnSide } from '@/redux/modules/tabs'
import { ReloadOutlined, ExpandOutlined, CloseCircleOutlined, ColumnWidthOutlined, SwitcherOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons'

interface MoreButtonProps {
	path: string
}

// todo TabsView；更多操作
const MoreButton: React.FC<MoreButtonProps> = ({ path }) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { t } = useTranslation()

	// 刷新当前页面
	const { updateOutletShow, setCount } = useContext(RefreshContext)
	const refreshCurrentPage = () => {
		setCount(12)
		updateOutletShow(false)
		setTimeout(() => updateOutletShow(true))
	}

	const style: CSSProperties = { fontSize: '14px' }

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: <span>{t('tabs.refresh')}</span>,
			icon: <ReloadOutlined style={style} />,
			onClick: refreshCurrentPage,
			danger: true,
			disabled: path === HOME_URL,
		},
		{
			key: '2',
			label: <span>{t('tabs.maximize')}</span>,
			icon: <ExpandOutlined style={style} />,
			onClick: () => dispatch(setGlobalState({ key: 'maximize', value: true })),
		},
		{
			type: 'divider',
		},
		{
			key: '3',
			label: <span>{t('tabs.closeCurrent')}</span>,
			icon: <CloseCircleOutlined style={style} />,
			onClick: () => dispatch(removeTab({ path, isCurrent: true })),
		},
		{
			type: 'divider',
		},
		{
			key: '4',
			label: <span>{t('tabs.closeLeft')}</span>,
			icon: <VerticalRightOutlined style={style} />,
			onClick: () => dispatch(closeTabsOnSide({ path, type: 'left' })),
		},
		{
			key: '5',
			label: <span>{t('tabs.closeRight')}</span>,
			icon: <VerticalLeftOutlined style={style} />,
			onClick: () => dispatch(closeTabsOnSide({ path, type: 'right' })),
		},
		{
			type: 'divider',
		},
		{
			key: '6',
			label: <span>{t('tabs.closeOther')}</span>,
			icon: <ColumnWidthOutlined style={style} />,
			onClick: () => dispatch(closeMultipleTab({ path })),
		},
		{
			key: '7',
			label: <span>{t('tabs.closeAll')}</span>,
			icon: <SwitcherOutlined style={style} />,
			onClick: () => {
				dispatch(closeMultipleTab({}))
				navigate(HOME_URL)
			},
		},
	]

	return (
		// 下拉菜单：https://ant.design/components/dropdown-cn
		<>
			<div className="more-button">
				<Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={['click']}>
					<div className="more-button-item">
						<IconFont style={{ fontSize: 22 }} type="icon-xiala" />
					</div>
				</Dropdown>
			</div>
		</>
	)
}

export default MoreButton
