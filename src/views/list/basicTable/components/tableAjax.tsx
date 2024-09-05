import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import type { GetProp, TableProps } from 'antd'
import qs from 'qs'
import { MyComponentProps } from '..'

type ColumnsType<T> = TableProps<T>['columns']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

interface DataType {
	description: string
	name: {
		first: string
		last: string
	}
	gender: string
	email: string
	login: {
		uuid: string
	}
}

interface TableParams {
	pagination?: TablePaginationConfig
	sortField?: string
	sortOrder?: string
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const columns: ColumnsType<DataType> = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: true,
		render: name => `${name.first} ${name.last}`,
		width: '20%',
	},
	Table.EXPAND_COLUMN, // FIXME: 可展开列
	{
		title: 'Gender',
		dataIndex: 'gender',
		filters: [
			{ text: 'Male', value: 'male' },
			{ text: 'Female', value: 'female' },
		],
		width: '20%',
	},
	Table.SELECTION_COLUMN, // FIXME: 选择框添加属性
	{
		title: 'Email',
		dataIndex: 'email',
	},
]

const getRandomuserParams = (params: TableParams) => ({
	results: params.pagination?.pageSize,
	page: params.pagination?.current,
	...params,
})

const App: React.FC<MyComponentProps> = ({ isShow }) => {
	const [data, setData] = useState<DataType[]>()
	const [loading, setLoading] = useState(false)
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	})

	const fetchData = () => {
		setLoading(true)
		fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
			.then(res => res.json())
			.then(({ results }) => {
				setData(results)
				setLoading(false)
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination,
						total: 200,
						// 200 is mock data, you should read it from server
						// total: data.totalCount,
					},
				})
			})
	}

	useEffect(() => {
		fetchData()
	}, [JSON.stringify(tableParams)])

	// TableProps['onChange'] -> any
	const handleTableChange: any = (pagination: { pageSize: number | undefined }, filters: any, sorter: React.SetStateAction<TableParams>) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		})

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([])
		}
	}

	return (
		isShow && (
			<Table
				size="middle"
				bordered
				title={() => 'Header'}
				footer={() => 'Footer'}
				columns={columns}
				rowKey={record => record.login.uuid}
				dataSource={data}
				pagination={tableParams.pagination}
				loading={loading}
				onChange={handleTableChange}
				expandable={{
					expandedRowRender: record => <p style={{ margin: 0 }}>{record.description || 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'}</p>,
					rowExpandable: record => record?.name.first != 'Not Expandable',
				}}
				rowSelection={{}} // FIXME: 选择框需要添加的属性
			/>
		)
	)
}

export default App
