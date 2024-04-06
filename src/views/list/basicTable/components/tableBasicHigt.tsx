import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, Space, Table, Tag, Tooltip } from 'antd'
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import type { GetProp, TableProps } from 'antd'
import qs from 'qs'

type TableRowSelection<T> = TableProps<T>['rowSelection']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>
// interface DataType {
// 	key: string
// 	name: string
// 	age: number
// 	address: string
// 	tags: string[]
// 	children?: DataType[]
// }
interface DataType {
	gender: string
	name: {
		title: string
		first: string
		last: string
	}
	location: {
		street: {
			number: number
			name: string
		}
		city: string
		state: string
		country: string
		postcode: number
		coordinates: {
			latitude: string
			longitude: string
		}
		timezone: {
			offset: string
			description: string
		}
	}
	email: string
	login: {
		uuid: string
		username: string
		password: string
		salt: string
		md5: string
		sha1: string
		sha256: string
	}
	dob: {
		date: string
		age: number
	}
	registered: {
		date: string
		age: number
	}
	phone: string
	cell: string
	id: {
		name: string
		value: string
	}
	picture: {
		large: string
		medium: string
		thumbnail: string
	}
	nat: string
}

interface TableParams {
	pagination?: TablePaginationConfig
	sortField?: string
	sortOrder?: string
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const App: any = ({ isShow }: any) => {
	const [data, setData] = useState<DataType[]>()
	const [loading, setLoading] = useState(false)
	// 分页、过滤、排序、额外
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	})
	console.log(data)
	// console.log('tableParams', tableParams)
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

	const getRandomuserParams = (params: TableParams) => ({
		results: params.pagination?.pageSize,
		page: params.pagination?.current,
		...params,
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

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: ['name', 'title'],
			key: 'name',
			align: 'center',
			width: 100,
			fixed: 'left',
			render: text => <a>{text}</a>,
		},
		{
			title: 'Age',
			dataIndex: ['dob', 'age'],
			key: 'dob',
			align: 'center',
			width: 200,
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.dob.age - b.dob.age,
			responsive: ['lg'],
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			align: 'center',
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
			align: 'center',
		},
		{
			title: 'Cell',
			dataIndex: 'cell',
			key: 'cell',
			align: 'center',
		},
		{
			title: 'Nat',
			dataIndex: 'nat',
			key: 'nat',
			align: 'center',
		},
		{
			title: 'Address',
			dataIndex: ['location', 'timezone', 'description'],
			key: 'address',
			align: 'center',
			responsive: ['lg'], // 响应式
			width: 200,
			ellipsis: { showTitle: false },
			render: address => (
				<Tooltip placement="topLeft" title={address}>
					{address}
				</Tooltip>
			),
		},
		{
			title: 'Action',
			key: 'action',
			align: 'center',
			width: 250,
			fixed: 'right',
			render: (_, record) => (
				<Space size="small">
					<Button key="view" type="link" size="small" icon={<EyeOutlined />}>
						查看
					</Button>
					<Button key="edit" type="link" size="small" icon={<EditOutlined />}>
						编辑
					</Button>
					<Button key="delete" type="link" size="small" danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Space>
			),
		},
	]

	const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('分页、过滤、排序、额外：', pagination, filters, sorter, extra)
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

	const rowSelection: TableRowSelection<DataType> = {
		selectedRowKeys,
		onChange: (newSelectedRowKeys: React.Key[]) => {
			setSelectedRowKeys(newSelectedRowKeys)
		},
	}

	// 头部
	const Header = (
		<div className="flex flex-row-reverse">
			<Space>
				<Button type="primary" size="middle" icon={<PlusOutlined />}>
					新建
				</Button>
				<Button key="delete" type="primary" size="middle" icon={<DeleteOutlined />}>
					多选删除
				</Button>
				<Button key="delete" type="primary" size="middle" icon={<DownloadOutlined />}>
					导出
				</Button>
			</Space>
		</div>
	)

	return (
		isShow && (
			<div>
				<Table
					size="middle"
					bordered
					title={() => Header}
					rowKey={record => record.login.uuid}
					columns={columns}
					loading={loading}
					dataSource={data}
					pagination={tableParams.pagination}
					onChange={onChange}
					expandable={{
						expandedRowRender: record => (
							<p style={{ margin: 0 }}>{record?.location.timezone.description || 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'}</p>
						),
						// 展开条件
						rowExpandable: record => record?.name.title != '',
					}}
					rowSelection={rowSelection}
					scroll={{ y: 500, x: 'calc(700px + 50%)' }}
				/>
			</div>
		)
	)
}

export default App
