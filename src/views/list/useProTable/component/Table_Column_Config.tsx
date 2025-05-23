import { ProColumns } from '@ant-design/pro-components'
import { UserList } from '@/api/interface'
import { Button, Dropdown, Input } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons'
import { message } from '@/hooks/useMessage'
import { IconFont } from '@/components/Icon'

const valueEnum: { [key: number]: string } = {
	0: 'close',
	1: 'running',
	2: 'online',
	3: 'error',
}
const ProcessMap = {
	close: 'normal',
	running: 'active',
	online: 'success',
	error: 'exception',
} as const

export interface TableColumnsParams {
	setCurrentRow: (arg: any) => void
	setShowDetail: (arg: any) => void
}

const TableColumnsConfig = (Params: TableColumnsParams): ProColumns<UserList>[] => {
	let { setCurrentRow, setShowDetail } = Params
	return [
		{
			title: <span className="text-[14px]">iD</span>,
			dataIndex: 'key',
			rowScope: 'row',
			fixed: 'left',
			width: 70,
		},
		{
			title: '用户名',
			dataIndex: 'username',
			copyable: true,
			width: 120,
			fixed: 'left',
			tooltip: '用户的名字',
			// initialValue: 'zhangsan',
			onFilter: false,
			// hideInSearch: true,
			// hideInTable: true,
			// hideInForm: true,
			// hideInDescriptions: true,
			sorter: true,
			render: (dom, entity) => {
				return (
					<a
						href="javascript:void(0)"
						// className="divide-x-2"
						onClick={() => {
							setCurrentRow(entity)
							setShowDetail(true)
							message.info(`点击了 ${entity.username}`)
						}}>
						{dom}
					</a>
				)
			},
			// 自定义筛选项功能具体实现请参考 https://ant.design/components/table-cn/#components-table-demo-custom-filter-panel
			filterDropdown: () => (
				<div style={{ padding: 2 }}>
					<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder="请输入" />
				</div>
			),
			filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			fieldProps: (form, config) => {}, // 查询表单的 props，会透传给表单项，
		},
		{
			title: '性别',
			dataIndex: 'gender',
			width: 150,
			initialValue: '全部', // * initialValue 查询表单项初始值
			filters: true,
			onFilter: true,
			valueEnum: {
				0: { text: '全部' },
				1: { text: '男' },
				2: { text: '女' },
			},
		},
		{
			title: '年龄',
			dataIndex: 'age',
			width: 150,
			sorter: true,
			tooltip: '指代用户的年纪大小', // * tooltip 提示一些信息
		},
		{
			title: '状态',
			dataIndex: 'status',
			hideInForm: true, // * hideInForm 在Form中不展示此列, 不可搜索
			filters: true,
			onFilter: true,
			valueEnum: {
				0: {
					text: '正常',
					status: 'Default',
				},
				1: {
					text: '在线',
					status: 'Processing',
				},
				2: {
					text: '离线',
					status: 'Success',
				},
				3: {
					text: '异常',
					status: 'Error',
				},
			},
		},
		{
			title: '执行进度',
			dataIndex: 'progress',
			width: 300,
			valueType: item => ({
				type: 'progress',
				status: ProcessMap[valueEnum[item.progress_status] as 'close'] as any,
			}),
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			hideInSearch: true,
			ellipsis: true, // * ellipsis 是否自动缩略
		},
		{
			title: '地址',
			dataIndex: 'address',
			hideInSearch: true,
			ellipsis: true,
			copyable: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},
		{
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
		},

		{
			title: '创建时间',
			dataIndex: 'createTime',
			valueType: 'dateRange',
			hideInTable: true,
			search: { transform: value => ({ startTime: value[0], endTime: value[1] }) },
		},
		{
			title: '操作',
			key: 'option',
			fixed: 'right',
			width: 50,
			render: (data, entity) => action(entity, Params),
		},
	]
}

// 操作按钮：查看、新增、删除
const action = (entity: UserList, Params: TableColumnsParams) => [
	<div className="more-button">
		<Dropdown
			menu={{
				items: [
					{
						key: '1',
						label: (
							<Button
								key="view"
								type="link"
								size="small"
								icon={<EyeOutlined />}
								onClick={() => {
									// console.log(entity)
									Params.setCurrentRow(entity)
									Params.setShowDetail(true)
								}}>
								查看
							</Button>
						),
					},
					{
						key: '2',
						label: (
							<Button key="edit" type="link" size="small" icon={<EditOutlined />}>
								编辑
							</Button>
						),
					},
					{
						key: '3',
						label: (
							<Button
								key="delete"
								type="link"
								size="small"
								danger
								icon={<DeleteOutlined />}
								onClick={() => {
									message.success(`删除了iD为: ${entity.username}`, 2)
								}}>
								删除
							</Button>
						),
					},
				],
			}}
			placement="bottomRight"
			arrow={{ pointAtCenter: true }}
			trigger={['click']}>
			<div className="more-button-item">
				<IconFont style={{ fontSize: 22 }} type="icon-xiala" />
			</div>
		</Dropdown>
	</div>,
]
export default TableColumnsConfig
