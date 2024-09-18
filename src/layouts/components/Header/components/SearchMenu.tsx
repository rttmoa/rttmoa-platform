/* eslint-disable prettier/prettier */
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Empty, Input, InputRef, Modal } from 'antd'
import { EnterOutlined, SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { RouteObjectType } from '@/routers/interface'
import { RootState, useSelector } from '@/redux'
import { useDebounce } from 'ahooks'
import { Icon } from '@/components/Icon'

// todo
//  todo 搜索框 （搜索侧边栏中内容）
//  todo 华炎中 （搜索所有内容）
const SearchMenu: React.FC = () => {
	const navigate = useNavigate()

	const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList)

	const inputRef = useRef<InputRef>(null)
	const menuListRef = useRef<HTMLDivElement>(null)

	const [isModalOpen, setIsModalOpen] = useState(false) // 弹窗的显示与隐藏
	const [activePath, setActivePath] = useState('') // 设置活动路径 (高亮项)
	const [searchValue, setSearchValue] = useState('') // 搜索框 Value

	const debouncedSearchValue = useDebounce(searchValue, { wait: 300 })

	// 搜索框 显示与隐藏
	const showModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	// ? 搜索值匹配路由关键字
	const searchList = useMemo(() => {
		// console.log(flatMenuList); // (60)[{…}, {…}, {…}, .........................]
		// console.log(debouncedSearchValue);
		return debouncedSearchValue
			? flatMenuList.filter(item => {
					let inputValue = debouncedSearchValue.toLowerCase() // 输入框中的值
					let pathStr = item.path!.toLowerCase().includes(inputValue) // path中是否包含字母
					let metaTitleStr = item.meta!.title!.toLowerCase().includes(inputValue) // meta.title是否包含汉字
					return (pathStr || metaTitleStr) && !item.meta?.isHide
				})
			: []
	}, [debouncedSearchValue])

	// 设置初始 activePath
	useEffect(() => {
		searchList.length ?? setActivePath(searchList[0].path!)
	}, [searchList])

	// 移动到 Div 身上， activePath为路径
	const mouseoverMenuItem = (item: RouteObjectType) => {
		setActivePath(item.path!)
	}

	// TODO: 键盘：上下翻页
	const keyPressUpOrDown = (direction: number) => {
		const { length } = searchList
		if (length === 0) return
		const index = searchList.findIndex(item => item.path === activePath)
		const newIndex = (index + direction + length) % length
		// 设置 activePath
		setActivePath(searchList[newIndex].path!)

		if (menuListRef.current?.firstElementChild) {
			const menuItemHeight = menuListRef.current.firstElementChild.clientHeight + 12 || 0
			// console.log(menuItemHeight); // 57
			// todo 设置滚动高度
			menuListRef.current.scrollTop = newIndex * menuItemHeight
		}
	}

	// 选择列表中的菜单 Div
	const selectMenuItem = () => {
		const menu = searchList.find(item => item.path === activePath)
		if (!menu) return
		if (menu.meta?.isLink) window.open(menu.meta.isLink, '_blank')
		navigate(menu.path!)
		closeModal()
	}

	// 键盘：Up、Down、Enter
	const keyboardOperation = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp') {
			event.preventDefault()
			keyPressUpOrDown(-1)
		} else if (event.key === 'ArrowDown') {
			event.preventDefault()
			keyPressUpOrDown(1)
		} else if (event.key === 'Enter') {
			event.preventDefault()
			selectMenuItem()
		}
	}
	// 弹窗开启：设置 window监听键盘事件
	useEffect(() => {
		const handler = isModalOpen ? window.addEventListener : window.removeEventListener
		handler('keydown', keyboardOperation)
		return () => window.removeEventListener('keydown', keyboardOperation)
	}, [isModalOpen, keyboardOperation])

	// 弹窗开启：输入框 Input 设置自动聚焦 focus
	useEffect(() => {
		if (isModalOpen) {
			setTimeout(() => inputRef.current?.focus({ cursor: 'start' }), 1000)
		} else {
			setSearchValue('')
		}
	}, [isModalOpen])
	// console.log(activePath);

	// 渲染出匹配的菜单列表结构
	function searchMenuListStructure() {
		return (
			<div className="menu-list" ref={menuListRef}>
				{searchList.map(item => (
					<div
						key={item.path}
						className={`menu-item ${item.path === activePath && 'menu-active'}`}
						onMouseEnter={() => mouseoverMenuItem(item)}
						onClick={() => selectMenuItem()}>
						<Icon className="menu-icon" name={item.meta!.icon!} />
						<span className="menu-title">{item.meta?.title}</span>
						<EnterOutlined className="menu-enter" />
					</div>
				))}
			</div>
		)
	}

	return (
		<React.Fragment>
			<i className="iconfont icon-sousuo" onClick={showModal}></i>
			<Modal className="search-modal" width={600} footer={null} closable={false} open={isModalOpen} onCancel={closeModal}>
				<Input
					ref={inputRef}
					placeholder="菜单搜索：支持菜单名称、路径"
					size="large"
					prefix={<SearchOutlined />}
					allowClear={true}
					value={searchValue}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setSearchValue(event.target.value)
					}}
				/>
				{searchList.length ? searchMenuListStructure() : <Empty className="mt40 mb30" description="暂无菜单" />}
			</Modal>
		</React.Fragment>
	)
}
export default SearchMenu
