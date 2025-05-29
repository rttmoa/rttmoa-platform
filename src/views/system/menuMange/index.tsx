import { Button, Card, Col, Form, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { Space, Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { menu } from './component/menuConfig'
import { Icon } from '@/components/Icon'
import CreateMenuModal from './component/CreateMenuModal'

type TableRowSelection<T> = TableProps<T>['rowSelection']

interface DataType {
	title: string
	icon: string
	key: string
	path: string
	element: string
	children?: DataType[]
}

const columns: TableColumnsType<DataType> = [
	{
		title: '菜单标题',
		dataIndex: 'title',
		key: 'title',
	},
	{
		title: '菜单图标',
		dataIndex: 'icon',
		align: 'center',
		key: 'icon',
		render: (text, record) => <Icon name={record.icon} />,
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
	},
	{
		title: '组件路径',
		dataIndex: 'element',
		key: 'element',
		align: 'center',
		render: (text: string, record: any) => record.element || '-',
	},
	{
		title: '重定向路径',
		dataIndex: 'redirect',
		key: 'redirect',
		align: 'center',
		render: (text: string, record: any) => record.redirect || '-',
	},
	{
		title: '外链 url',
		dataIndex: 'redirect',
		key: 'redirect',
		align: 'center',
		render: (text: string, record: any) => record.redirect || '-',
	},
	{
		title: '是否隐藏菜单项',
		dataIndex: 'is_hide',
		key: 'is_hide',
		align: 'center',
	},
	{
		title: '是否全屏显示页面',
		dataIndex: 'is_full',
		key: 'is_full',
		align: 'center',
	},
	{
		title: '是否固定标签页',
		dataIndex: 'is_affix',
		key: 'is_affix',
		align: 'center',
	},
	{
		title: '操作',
		align: 'center',
		render: (text: string, record: any) => {
			return (
				<Space size="middle">
					<Button type="text" onClick={() => handleEdit(record)}>
						修改
					</Button>
					<Button type="text" onClick={() => handleDelete(record)}>
						删除
					</Button>
				</Space>
			)
		},
	},
]

const handleEdit = (record: any) => {
	console.log('修改：', record)
}
const handleDelete = (record: any) => {}

const rowSelection: TableRowSelection<DataType> = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
	},
	onSelect: (record, selected, selectedRows) => {
		console.log(record, selected, selectedRows)
	},
	onSelectAll: (selected, selectedRows, changeRows) => {
		console.log(selected, selectedRows, changeRows)
	},
}

const MenuMange: React.FC = () => {
	const [checkStrictly, setCheckStrictly] = useState<boolean>(false)
	const [createModalOpen, SetCreateModalOpen] = useState<boolean>(false)

	const [form] = Form.useForm()

	function getShowMenuList(menuList: any) {
		let newMenuList: any = JSON.parse(JSON.stringify(menuList))
		return newMenuList.map((item: any) => {
			return { ...item, ...item.meta, children: item.children ? getShowMenuList(item.children) : null }
		})
	}
	let NewMenuModalConfig = {
		form,
		createModalOpen,
		SetCreateModalOpen,
	}
	return (
		<>
			<Card>
				<Button
					className="mb-3"
					onClick={() => {
						SetCreateModalOpen(true)
					}}>
					新增菜单
				</Button>
				<Table
					size="middle"
					bordered
					columns={columns}
					// rowSelection={{ ...rowSelection, checkStrictly }}
					dataSource={getShowMenuList(menu)}
					expandable={{
						indentSize: 40,
					}}
				/>
			</Card>
			<CreateMenuModal {...NewMenuModalConfig} />
		</>
	)
}

export default MenuMange
