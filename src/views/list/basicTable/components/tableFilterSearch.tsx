import React, { useState } from 'react'
import { Button, Space, Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'

type OnChange = NonNullable<TableProps<DataType>['onChange']>
type Filters = Parameters<OnChange>[1]

type GetSingle<T> = T extends (infer U)[] ? U : never
type Sorts = GetSingle<Parameters<OnChange>[2]>

interface DataType {
	key: React.Key
	name: string
	age: number
	address: string
}

const data: DataType[] = [
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
				text: 'Category 1',
				value: 'Category 1',
			},
			{
				text: 'Category 2',
				value: 'Category 2',
			},
		],
		filterMode: 'tree',
		filterSearch: true,
		onFilter: (value: any, record) => record.name.startsWith(value),
		width: '30%',
	},
	{
		title: 'Age',
		dataIndex: 'age',
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
		onFilter: (value: any, record) => record.address.startsWith(value),
		filterSearch: true,
		width: '40%',
	},
]

// 自定义筛选的搜索
const App: any = ({ isShow }: any) => {
	const [filteredInfo, setFilteredInfo] = useState<Filters>({})
	const [sortedInfo, setSortedInfo] = useState<Sorts>({})

	const clearFilters = () => {
		setFilteredInfo({})
	}

	const clearAll = () => {
		setFilteredInfo({})
		setSortedInfo({})
	}

	const setAgeSort = () => {
		setSortedInfo({
			order: 'descend',
			columnKey: 'age',
		})
	}

	// const handleChange: TableProps<DataType>["onChange"] = (pagination, filters, sorter, extra) => {
	// 	console.log("params", pagination, filters, sorter, extra);
	// };
	const handleChange: OnChange = (pagination, filters, sorter, extra) => {
		console.log('Various paramsters', pagination, filters, sorter, extra)
		setFilteredInfo(filters)
		setSortedInfo(sorter as Sorts)
	}

	return (
		<>
			{isShow && (
				<>
					<Space style={{ marginBottom: 16 }}>
						<Button onClick={setAgeSort}>Sort age</Button>
						<Button onClick={clearFilters}>Clear filters</Button>
						<Button onClick={clearAll}>Clear filters and sorters</Button>
					</Space>
					<Table columns={columns} dataSource={data} onChange={handleChange} />
				</>
			)}
		</>
	)
}

export default App
