import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Space, Table, Tag, Tooltip } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { GetProp, GetRef, InputRef, TableColumnsType, TableProps } from 'antd';
import Highlighter from 'react-highlight-words';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { TableColumnType } from 'antd/lib';
import qs from 'qs';
import './index.less';

type TableRowSelection<T> = TableProps<T>['rowSelection'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
// interface DataType {
// 	key: string
// 	name: string
// 	age: number
// 	address: string
// 	tags: string[]
// 	children?: DataType[]
// }
interface DataType {
	gender: string;
	name: {
		title: string;
		first: string;
		last: string;
	};
	location: {
		street: {
			number: number;
			name: string;
		};
		city: string;
		state: string;
		country: string;
		postcode: number;
		coordinates: {
			latitude: string;
			longitude: string;
		};
		timezone: {
			offset: string;
			description: string;
		};
	};
	email: string;
	login: {
		uuid: string;
		username: string;
		password: string;
		salt: string;
		md5: string;
		sha1: string;
		sha256: string;
	};
	dob: {
		date: string;
		age: number;
	};
	registered: {
		date: string;
		age: number;
	};
	phone: string;
	cell: string;
	id: {
		name: string;
		value: string;
	};
	picture: {
		large: string;
		medium: string;
		thumbnail: string;
	};
	nat: string;
}
type DataIndex = keyof DataType;

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const App: any = ({ isShow }: any) => {
	const [data, setData] = useState<DataType[]>();
	const [loading, setLoading] = useState(false);
	// 分页、过滤、排序、额外
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});
	console.log('tableParams', tableParams);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef<InputRef>(null);

	const getRandomuserParams = (params: TableParams) => ({
		results: params.pagination?.pageSize,
		page: params.pagination?.current,
		...params,
	});
	const fetchData = () => {
		setLoading(true);
		fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
			.then(res => res.json())
			.then(({ results }) => {
				setData(results);
				setLoading(false);
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination,
						total: 200,
						// 200 is mock data, you should read it from server
						// total: data.totalCount,
					},
				});
			});
	};
	useEffect(() => {
		fetchData();
	}, [JSON.stringify(tableParams)]);

	const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText('');
	};
	// 每个列的搜索
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
					<Button type='primary' onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)} icon={<SearchOutlined />} size='small' style={{ width: 90 }}>
						Search
					</Button>
					<Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							close();
						}}
					>
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
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: text =>
			searchedColumn === dataIndex ? <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''} /> : text,
	});

	const columns: TableProps<DataType>['columns'] = [
		{
			title: 'Name',
			dataIndex: ['name', 'title'],
			key: 'name',
			align: 'center',
			width: 100,
			fixed: 'left',
			render: text => <a>{text}</a>,
			...getColumnSearchProps('name'),
		},
		{
			title: 'Age',
			dataIndex: ['dob', 'age'],
			key: 'dob',
			align: 'center',
			width: 200,
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.dob.age - b.dob.age,
			...getColumnSearchProps('dob'),
			responsive: ['lg'],
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
				<Tooltip placement='topLeft' title={address}>
					{address}
				</Tooltip>
			),
		},
		// {
		// 	title: 'Tags',
		// 	key: 'tags',
		// 	dataIndex: 'tags',
		// 	align: 'center',
		// 	render: (_, { tags }) => (
		// 		<>
		// 			{tags.map(tag => {
		// 				let color = tag.length > 5 ? 'geekblue' : 'green'
		// 				if (tag === 'loser') {
		// 					color = 'volcano'
		// 				}
		// 				return (
		// 					<Tag color={color} key={tag}>
		// 						{tag.toUpperCase()}
		// 					</Tag>
		// 				)
		// 			})}
		// 		</>
		// 	),
		// },
		{
			title: 'Action',
			key: 'action',
			align: 'center',
			width: 250,
			fixed: 'right',
			render: (_, record) => (
				<Space size='small'>
					<Button key='view' type='link' size='small' icon={<EyeOutlined />}>
						查看
					</Button>
					<Button key='edit' type='link' size='small' icon={<EditOutlined />}>
						编辑
					</Button>
					<Button key='delete' type='link' size='small' danger icon={<DeleteOutlined />}>
						删除
					</Button>
				</Space>
			),
		},
	];

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};
	const rowSelection: TableRowSelection<DataType> = {
		selectedRowKeys,
		onChange: onSelectChange,
		// selections: [
		// 	Table.SELECTION_ALL,
		// 	Table.SELECTION_INVERT,
		// 	Table.SELECTION_NONE,
		// 	{
		// 		key: 'odd',
		// 		text: 'Select Odd Row',
		// 		onSelect: changeableRowKeys => {
		// 			let newSelectedRowKeys = []
		// 			newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
		// 				if (index % 2 !== 0) {
		// 					return false
		// 				}
		// 				return true
		// 			})
		// 			setSelectedRowKeys(newSelectedRowKeys)
		// 		},
		// 	},
		// 	{
		// 		key: 'even',
		// 		text: 'Select Even Row',
		// 		onSelect: changeableRowKeys => {
		// 			let newSelectedRowKeys = []
		// 			newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
		// 				if (index % 2 !== 0) {
		// 					return true
		// 				}
		// 				return false
		// 			})
		// 			setSelectedRowKeys(newSelectedRowKeys)
		// 		},
		// 	},
		// ],
	};
	const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
		console.log('分页、过滤、排序、额外：', pagination, filters, sorter, extra);
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	// 头部
	const Header = (
		<div className='flex flex-row-reverse'>
			<Space>
				<Button type='primary' size='middle' icon={<PlusOutlined />}>
					新建
				</Button>
				<Button key='delete' type='primary' size='middle' icon={<DeleteOutlined />}>
					多选删除
				</Button>
				<Button key='delete' type='primary' size='middle' icon={<DownloadOutlined />}>
					导出
				</Button>
			</Space>
		</div>
	);

	// 可添加：隐藏列	 onChange事件隐藏
	// 可添加：表头分组 column.children
	// 可添加：可编辑单元格
	// 可添加：可编辑行
	// 可添加：嵌套子表格
	// 可添加：虚拟列表 Virtual
	return (
		isShow && (
			<div>
				<Table
					className='table-props'
					size='middle'
					bordered
					title={() => Header}
					// footer={() => 'Footer'}
					rowKey={record => record.login.uuid}
					columns={columns}
					loading={loading}
					dataSource={data}
					pagination={tableParams.pagination}
					onChange={onChange}
					expandable={{
						expandedRowRender: record => <p style={{ margin: 0 }}>{record?.location.timezone.description || 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'}</p>,
						rowExpandable: record => record?.name.title != '',
					}}
					rowSelection={rowSelection}
					scroll={{ y: 500, x: 'calc(700px + 50%)' }}
				/>
			</div>
		)
	);
};

export default App;
