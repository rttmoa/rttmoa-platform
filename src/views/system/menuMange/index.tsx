import { Button, Card, Col, Form, Input, Modal, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { Space, Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { menu } from './component/menuConfig'
import { Icon } from '@/components/Icon'
import CreateMenuModal from './component/CreateMenuModal'
import { DelMenu, FindAllMenu } from '@/api/modules/upack/common'
import { message } from '@/hooks/useMessage'

type TableRowSelection<T> = TableProps<T>['rowSelection']

interface DataType {
	title: string
	icon: string
	key: string
	path: string
	element: string
	children?: DataType[]
}

// const rowSelection: TableRowSelection<DataType> = {
// 	onChange: (selectedRowKeys, selectedRows) => {
// 		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
// 	},
// 	onSelect: (record, selected, selectedRows) => {
// 		console.log(record, selected, selectedRows)
// 	},
// 	onSelectAll: (selected, selectedRows, changeRows) => {
// 		console.log(selected, selectedRows, changeRows)
// 	},
// }

const MenuMange: React.FC = () => {
	const [checkStrictly, setCheckStrictly] = useState<boolean>(false)
	const [modalTitle, setModalTitle] = useState<string>('新建菜单')
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
	const [modalType, setModalType] = useState<string>('create')
	const [modalMenuInfo, setModalMenuInfo] = useState<any>({}) // 行菜单信息

	const [menuList, setMenuList] = useState<Array<any>[]>([])
	const [form] = Form.useForm()

	const getMenu = async () => {
		const res: any = await FindAllMenu({})
		// console.log('获取菜单：', res)
		setMenuList(res?.data.list)
	}

	useEffect(() => {
		getMenu()
	}, [])

	const columns: TableColumnsType<DataType> = [
		{
			title: '菜单标题',
			dataIndex: 'title',
			key: 'title',
			width: 200,
		},
		{
			title: '菜单图标',
			dataIndex: 'icon',
			align: 'center',
			key: 'icon',
			render: (text, record) => <Icon name={record.icon} />,
		},
		{
			title: '菜单类型',
			dataIndex: 'type',
			align: 'center',
			key: 'type',
		},
		{
			title: '菜单标识',
			dataIndex: 'key',
			align: 'center',
			key: 'key',
		},
		{
			title: '路由路径',
			dataIndex: 'path',
			align: 'center',
			key: 'path',
			width: 180,
		},
		{
			title: '组件路径',
			dataIndex: 'element',
			key: 'element',
			align: 'center',
			width: 180,
			render: (text: string, record: any) => record.element || '-',
		},
		{
			title: '重定向路径',
			dataIndex: 'redirect',
			key: 'redirect',
			align: 'center',
			width: 180,
			render: (text: string, record: any) => record.redirect || '-',
		},
		{
			title: '外链 url',
			dataIndex: 'isLink',
			key: 'isLink',
			align: 'center',
			width: 180,
			render: (text: string, record: any) => record.redirect || '-',
		},
		{
			title: '是否隐藏菜单项',
			dataIndex: 'isHide',
			key: 'isHide',
			align: 'center',
			width: 120,
			render: (text: string, record: any) => record.is_hide || '否',
		},
		{
			title: '是否全屏显示',
			dataIndex: 'isFull',
			key: 'isFull',
			align: 'center',
			width: 120,
			render: (text: string, record: any) => record.is_full || '否',
		},
		{
			title: '是否固定标签页',
			dataIndex: 'isAffix',
			key: 'isAffix',
			align: 'center',
			width: 120,
			render: (text: string, record: any) => record.is_affix || '否',
		},
		{
			title: '排序值',
			dataIndex: 'sort',
			align: 'center',
			key: 'sort',
		},
		{
			title: '操作',
			align: 'center',
			fixed: 'right',
			width: 120,
			render: (text: string, record: any) => {
				return (
					<Space size="small">
						<Button type="dashed" size="small" onClick={() => handleEdit(record)}>
							修改
						</Button>
						<Button type="dashed" size="small" onClick={() => handleDelete(record)}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]

	// * 编辑菜单  【点击编辑时、要获取几级菜单的属性】
	const handleEdit = (menuItem: any) => {
		// console.log('修改：', menuItem)
		setModalMenuInfo(menuItem)
		setModalTitle('修改菜单')
		setModalType('edit')
		setModalIsVisible(true)
	}
	const handleDelete = async (record: any) => {
		// console.log('删除菜单：', record) // 判断下面是否有children
		const result: any = await DelMenu(record)
		console.log('删除菜单结果：', result)
		message.success(result?.data.message || '删除成功')
	}

	function getShowMenuList(menuList: any) {
		let newMenuList: any = JSON.parse(JSON.stringify(menuList))
		return newMenuList.map((item: any) => {
			return { ...item, ...item.meta, children: item.children ? getShowMenuList(item.children) : null }
		})
	}
	let NewMenuModalConfig = {
		form,
		menuList,
		modalTitle,
		setModalTitle,
		modalType,
		setModalType,
		modalIsVisible,
		setModalIsVisible,
		modalMenuInfo,
		setModalMenuInfo,
	}
	return (
		<>
			<Card>
				<Button
					className="mb-3"
					size="small"
					onClick={() => {
						setModalTitle('新建菜单')
						setModalType('create')
						setModalIsVisible(true)
					}}>
					新增菜单
				</Button>
				<Table
					size="small"
					bordered
					columns={columns}
					// rowSelection={{ ...rowSelection, checkStrictly }}
					dataSource={getShowMenuList(menuList)}
					expandable={{
						indentSize: 40,
					}}
					scroll={{ x: 1800 }}
				/>
			</Card>
			<CreateMenuModal {...NewMenuModalConfig} />
		</>
	)
}

export default MenuMange
