import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, Space, Table, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { GetProp, GetRef, TableColumnsType, TableProps } from 'antd'
import Highlighter from 'react-highlight-words'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { TableColumnType } from 'antd/lib'
import qs from 'qs'

type TableRowSelection<T> = TableProps<T>['rowSelection']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>
interface DataType {
	key: string
	name: string
	age: number
	address: string
	tags: string[]
	children?: DataType[]
}
type DataIndex = keyof DataType

interface TableParams {
	pagination?: TablePaginationConfig
	sortField?: string
	sortOrder?: string
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const getRandomuserParams = (params: TableParams) => ({
	results: params.pagination?.pageSize,
	page: params.pagination?.current,
	...params,
})

const App: any = ({ isShow }: any) => {
	const [data, setData] = useState<DataType[]>()
	const [loading, setLoading] = useState(false)
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	})

	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	// const searchInput = useRef<InputRef>(null);
	const searchInput = useRef<any>(null)

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
	console.log(data)
	useEffect(() => {
		fetchData()
	}, [JSON.stringify(tableParams)])

	const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (clearFilters: () => void) => {
		clearFilters()
		setSearchText('')
	}

	const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
						Search
					</Button>
					<Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false })
							setSearchText((selectedKeys as string[])[0])
							setSearchedColumn(dataIndex)
						}}>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close()
						}}>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
		onFilter: (value, record: any) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: visible => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: text =>
			searchedColumn === dataIndex ? (
				<Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''} />
			) : (
				text
			),
	})

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			align: 'center',
			render: text => <a>{text}</a>,
			...getColumnSearchProps('name'),
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
			align: 'center',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.age - b.age,
			...getColumnSearchProps('age'),
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			align: 'center',
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			align: 'center',
			render: (_, { tags }) => (
				<>
					{tags.map(tag => {
						let color = tag.length > 5 ? 'geekblue' : 'green'
						if (tag === 'loser') {
							color = 'volcano'
						}
						return (
							<Tag color={color} key={tag}>
								{tag.toUpperCase()}
							</Tag>
						)
					})}
				</>
			),
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<a>Invite {record.name}</a>
					<a>Delete</a>
				</Space>
			),
		},
	]

	const dataSource: DataType[] = [
		{
			key: '1',
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
			tags: ['nice', 'developer'],
		},
		{
			key: '2',
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
			tags: ['loser'],
		},
		{
			key: '3',
			name: 'Joe Black',
			age: 32,
			address: 'Sydney No. 1 Lake Park',
			tags: ['cool', 'teacher'],
		},
	]

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('selectedRowKeys changed: ', newSelectedRowKeys)
		setSelectedRowKeys(newSelectedRowKeys)
	}
	const rowSelection: TableRowSelection<DataType> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [
			Table.SELECTION_ALL,
			Table.SELECTION_INVERT,
			Table.SELECTION_NONE,
			{
				key: 'odd',
				text: 'Select Odd Row',
				onSelect: changeableRowKeys => {
					let newSelectedRowKeys = []
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return false
						}
						return true
					})
					setSelectedRowKeys(newSelectedRowKeys)
				},
			},
			{
				key: 'even',
				text: 'Select Even Row',
				onSelect: changeableRowKeys => {
					let newSelectedRowKeys = []
					newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
						if (index % 2 !== 0) {
							return true
						}
						return false
					})
					setSelectedRowKeys(newSelectedRowKeys)
				},
			},
		],
	}
	const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra)
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
			<div>
				<Table
					size="middle"
					bordered
					title={() => 'Header'}
					footer={() => 'Footer'}
					rowKey={record => record.key}
					columns={columns}
					loading={loading}
					dataSource={dataSource}
					pagination={tableParams.pagination}
					onChange={onChange}
					expandable={{
						expandedRowRender: record => <p style={{ margin: 0 }}>{record?.address || 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'}</p>,
						rowExpandable: record => record?.name != '',
					}}
					rowSelection={rowSelection}
				/>
			</div>
		)
	)
}

export default App
