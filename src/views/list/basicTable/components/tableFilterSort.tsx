import React from 'react'
import { Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'

interface DataType {
	key: React.Key
	name: string
	age: number
	address: string
}

const columns: TableColumnsType<DataType> = [
	{
		title: 'Name',
		dataIndex: 'name',
		filters: [
			{
				text: 'Joe',
				value: 'Joe',
			},
			{
				text: 'Jim',
				value: 'Jim',
			},
			{
				text: 'Submenu',
				value: 'Submenu',
				children: [
					{
						text: 'Green',
						value: 'Green',
					},
					{
						text: 'Black',
						value: 'Black',
					},
				],
			},
		],
		// specify the condition of filtering result
		// here is that finding the name started with `value`
		onFilter: (value: any, record) => record.name.indexOf(value) === 0,
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ['descend'],
	},
	{
		title: 'Age',
		dataIndex: 'age',
		defaultSortOrder: 'descend',
		sorter: (a, b) => a.age - b.age,
	},
	{
		title: 'Address',
		dataIndex: 'address',
		filters: [
			{
				text: 'London',
				value: 'London',
			},
			{
				text: 'New York',
				value: 'New York',
			},
		],
		onFilter: (value: any, record) => record.address.indexOf(value) === 0,
	},
]

const data = [
	{
		key: '1',
		name: 'John Brown',
		age: 32,
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Jim Green',
		age: 42,
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Joe Black',
		age: 32,
		address: 'Sydney No. 1 Lake Park',
	},
	{
		key: '4',
		name: 'Jim Red',
		age: 32,
		address: 'London No. 2 Lake Park',
	},
]

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
	console.log('params', pagination, filters, sorter, extra)
}

// ?对某一列数据进行排序，通过指定列的 sorter 函数即可启动排序按钮
// ?对某一列数据进行筛选，使用列的 filters 属性来指定需要筛选菜单的列，onFilter 用于筛选当前数据，filterMultiple 用于指定多选和单选。
// ? 树形筛选菜单：https://ant.design/components/table-cn?theme=happy-work#components-table-demo-filter-in-tree
const App: any = ({ isShow }: any) => isShow && <Table columns={columns} dataSource={data} onChange={onChange} />

export default App
