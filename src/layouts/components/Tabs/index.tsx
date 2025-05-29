/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { Icon } from '@/components/Icon'
import { CSS } from '@dnd-kit/utilities'
import { type DragEndEvent, DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'
import { RootState, useDispatch, useSelector } from '@/redux'
import { addTab, removeTab, setTabsList } from '@/redux/modules/tabs'
import { TabsListProp } from '@/redux/interface'
import { MetaProps } from '@/routers/interface'
import MoreButton from './components/MoreButton'
import './index.less'

type TargetKey = string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
	'data-node-key': string
}

// ? 拖拽
const DraggableTabNode = ({ ...props }: DraggableTabPaneProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: props['data-node-key'],
	})

	const style: React.CSSProperties = {
		...props?.style,
		transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
		transition,
	}

	return React.cloneElement(props.children as React.ReactElement, {
		ref: setNodeRef,
		style,
		...attributes,
		...listeners,
	})
}

// todo Tabs
// todo Tabs 配置项 / 当前高亮激活项 / 删除 / 添加 / 切换 / 拖拽 / 更多操作
const LayoutTabs: React.FC = () => {
	const matches = useMatches()
	const dispatch = useDispatch()
	const location = useLocation()
	const navigate = useNavigate()
	// console.log("matches", matches);
	// console.log("location", location);
	// console.log("navigate", navigate);

	const path = location.pathname + location.search // Tabs['activeKey']
	// console.log(path);

	const tabs = useSelector((state: RootState) => state.global.tabs) // ! 是否显示 Tabs
	const tabsIcon = useSelector((state: RootState) => state.global.tabsIcon) // ! 是否显示 Tabs图标
	const tabsDrag = useSelector((state: RootState) => state.global.tabsDrag) // ! 是否 可拖拽
	const tabsList = useSelector((state: RootState) => state.tabs.tabsList) // ! redux 中获取 TabViews
	const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList)

	const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

	// ! 初始化Tabs、添加首页到redux
	useEffect(() => initTabs(), [])
	const initTabs = () => {
		// console.log("initTabs");
		flatMenuList.forEach(item => {
			if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
				const tabValue = {
					icon: item.meta.icon!,
					title: item.meta.title!,
					path: item.path!,
					closable: !item.meta.isAffix,
				}
				// console.log("initadd", item); // {path: '/home/index', element: '/home/index', meta: {…}}
				dispatch(addTab(tabValue))
			}
		})
	}

	// ! 监听路由变化 > 添加Tabs
	useEffect(() => {
		const meta = matches[matches.length - 1].data as MetaProps & { redirect: boolean } // &  既满足 MetaProps 又满足 redircet 属性
		if (!meta?.redirect) {
			const tabValue = {
				icon: meta.icon!,
				title: meta.title!,
				path: path,
				closable: !meta.isAffix,
			}
			// console.log("监听路由变化添加Tab", tabValue);
			dispatch(addTab(tabValue))
		}
	}, [matches])

	const onDragEnd = ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			const activeIndex = tabsList.findIndex(i => i.path === active.id)
			const overIndex = tabsList.findIndex(i => i.path === over?.id)
			dispatch(setTabsList(arrayMove<TabsListProp>(tabsList, activeIndex, overIndex)))
		}
	}

	// ! Tabs['items']  配置选项卡内容  (转换为Antd-Tabs所需要的格式)
	const items = tabsList.map(item => {
		// console.log('tabs Item: ', item)
		return {
			key: item.path,
			label: (
				<>
					{tabsIcon && <Icon name={item.icon} />}
					{item.title}
				</>
			),
			closable: item.closable,
		}
	})

	// ! Tabs['onEdit']  添加或删除的回调
	const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
		// console.log(action, targetKey); // remove /result/success  ||  remove /form/basicForm
		if (action === 'remove' && typeof targetKey === 'string') {
			dispatch(removeTab({ path: targetKey, isCurrent: targetKey == path }))
		}
	}

	// console.log(items);
	return (
		<>
			{tabs && (
				// Tabs-Api：https://ant.design/components/tabs-cn#api
				<Tabs
					hideAdd // 是否隐藏加号图标，在 type="editable-card" 时有效
					type="editable-card"
					className="tabs-box"
					size="middle"
					items={items} // 配置选项卡内容
					activeKey={path} // 激活items中的key
					onEdit={onEdit} // 新增和删除页签的回调，在 type="editable-card" 时有效
					onChange={(path: string) => navigate(path)} // 点击其他Tabs、跳转到其他页面
					tabBarExtraContent={<MoreButton path={path} />} // ? 下拉更多操作：刷新、最大化、关闭其他
					{...(tabsDrag && {
						// ! 拖拽部分
						renderTabBar: (tabBarProps, DefaultTabBar) => (
							<DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
								<SortableContext items={items.map(i => i.key)} strategy={horizontalListSortingStrategy}>
									<DefaultTabBar {...tabBarProps}>
										{node => (
											<DraggableTabNode {...node.props} key={node.key}>
												{node}
											</DraggableTabNode>
										)}
									</DefaultTabBar>
								</SortableContext>
							</DndContext>
						),
					})}
				/>
			)}
		</>
	)
}

export default LayoutTabs
