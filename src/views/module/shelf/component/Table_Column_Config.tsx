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

const TableColumnsConfig = (Params: TableColumnsParams): ProColumns<any>[] => {
	let { setCurrentRow, setShowDetail } = Params
	return [
		{
			title: '位置名称',
			dataIndex: 'loc_name__c',
			copyable: true,
			width: 150,
			fixed: 'left',
			tooltip: '哪个区域的排列层',
			// initialValue: 'zhangsan',
			onFilter: false,
			hideInSearch: true,
			// hideInTable: true,
			// hideInForm: true,
			// hideInDescriptions: true,
			sorter: true,
			render: (dom, entity) => {
				return (
					<a
						href="javascript:void(0)"
						onClick={() => {
							setCurrentRow(entity)
							setShowDetail(true)
							message.info(`点击了 ${entity.loc_name__c}`)
						}}>
						{dom}
					</a>
				)
			},
			filterDropdown: () => (
				<div style={{ padding: 2 }}>
					<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder="请输入" />
				</div>
			),
			filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
			fieldProps: (form, config) => {}, // 查询表单的 props，会透传给表单项，
		},
		// {
		// 	title: '性别',
		// 	dataIndex: 'sex',
		// 	width: 150,
		// 	initialValue: '全部', // * initialValue 查询表单项初始值
		// 	filters: true,
		// 	onFilter: true,
		// 	valueEnum: {
		// 		2: { text: '全部' },
		// 		1: { text: '男' },
		// 		0: { text: '女' },
		// 	},
		// },
		{
			title: '排',
			dataIndex: 'row__c',
			width: 80,
			sorter: true,
			tooltip: '？',
		},
		{
			title: '层',
			dataIndex: 'lay__c',
			width: 80,
			sorter: true,
			tooltip: '？',
			disable: true,
		},
		{
			title: '列',
			dataIndex: 'col__c',
			width: 80,
			sorter: true,
			tooltip: '？',
		},
		{
			title: '仓位',
			dataIndex: 'position__c',
			width: 80,
			sorter: true,
			tooltip: '？',
		},
		{
			title: '货架区域',
			dataIndex: 'shelf_zone__c',
			width: 80,
		},
		{
			title: '货架状态',
			dataIndex: 'shelf_status__c',
			width: 80,
		},
		{
			title: '托盘号',
			dataIndex: 'pallet__c',
			width: 120,
			filterDropdown: () => (
				<div style={{ padding: 2 }}>
					<Input style={{ width: 150, marginBlockEnd: 8, display: 'block', fontSize: '14px' }} placeholder="请输入" />
				</div>
			),
			filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
		},
		{
			title: '修改时间',
			dataIndex: 'modified',
			width: 180,
			valueType: 'dateTime',
		},
		{
			title: '操作',
			key: 'option',
			fixed: 'right',
			width: 50,
			hideInSearch: true,
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
