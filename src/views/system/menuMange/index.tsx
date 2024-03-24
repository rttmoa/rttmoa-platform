import { Button, Card } from 'antd'
import React, { useState } from 'react'
import { Space, Switch, Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import * as antIcon from '@ant-design/icons'
import { menu } from './menuConfig'
import { Icon } from '@/components/Icon'

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
		title: '菜单名称',
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
		title: '菜单 name',
		dataIndex: 'key',
		align: 'center',
		key: 'key',
	},
	{
		title: '菜单路径',
		dataIndex: 'path',
		align: 'center',
		key: 'path',
	},
	{
		title: '组件路径',
		dataIndex: 'element',
		key: 'element',
		align: 'center',
		render: (text: string, record: any) => {
			return record.element ? record.element : '--'
		},
	},
	{
		title: '操作',
		align: 'center',
		render: (text: string, record: any) => {
			return (
				<Space size="middle">
					<Button type="text" onClick={() => handleEdit(record)}>
						编辑
					</Button>
					<Button type="text" onClick={() => handleDelete(record)}>
						删除
					</Button>
				</Space>
			)
		},
	},
]

const handleEdit = (record: any) => {}
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
	const [checkStrictly, setCheckStrictly] = useState(false)

	function getShowMenuList(menuList: any) {
		let newMenuList: any = JSON.parse(JSON.stringify(menuList))
		return newMenuList.map((item: any) => {
			return { ...item, ...item.meta, children: item.children ? getShowMenuList(item.children) : null }
		})
	}
	const menuList = getShowMenuList(menu)
	// console.log(',m', menuList)

	return (
		<>
			<Card>
				<div className="h-12">
					<Button>新增菜单</Button>
				</div>
				<Table
					size="middle"
					bordered
					columns={columns}
					// rowSelection={{ ...rowSelection, checkStrictly }}
					dataSource={menuList}
					expandable={{
						indentSize: 40,
					}}
				/>
			</Card>
		</>
	)
}

export default MenuMange
