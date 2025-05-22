import { CSSProperties, useRef, useState } from 'react'
import { Button, Drawer, Dropdown, Input, MenuProps, Popconfirm, Tooltip } from 'antd'
import { formatDataForProTable } from '@/utils'
import { pagination } from '@/config/proTable'
import { getUserList } from '@/api/modules/user'
import { UserList } from '@/api/interface'
import {
	ArrowsAltOutlined,
	CloseCircleOutlined,
	ColumnWidthOutlined,
	DeleteOutlined,
	DownCircleTwoTone,
	DownOutlined,
	EditOutlined,
	EyeOutlined,
	FullscreenOutlined,
	PlusOutlined,
	QuestionCircleOutlined,
	ReloadOutlined,
	SearchOutlined,
	SendOutlined,
	SettingOutlined,
	ShrinkOutlined,
} from '@ant-design/icons'
import { FooterToolbar, LightFilter, ModalForm, ProDescriptions, ProFormDatePicker, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components'
import { message } from '@/hooks/useMessage'
import { addRule, removeRule, updateRule } from '@/api/modules/api_useProTable/api'
import UpdateForm from './component/UpdateForm'
import Search from 'antd/lib/input/Search'
import { IconFont } from '@/components/Icon'
import './index.less'
import { useDispatch } from '@/redux'
import { setGlobalState } from '@/redux/modules/global'

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: UserList) => {
	const hide = message.loading('正在添加')
	try {
		await addRule({ ...fields })
		hide()
		message.success('Added successfully')
		return true
	} catch (error) {
		hide()
		message.error('Adding failed, please try again!')
		return false
	}
}

export type FormValueType = {
	target?: string
	template?: string
	type?: string
	time?: string
	frequency?: string
} & Partial<UserList>

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
	const hide = message.loading('Configuring')
	try {
		await updateRule({
			// name: fields.name,
			// desc: fields.desc,
			// key: fields.key,
		})
		hide()

		message.success('Configuration is successful')
		return true
	} catch (error) {
		hide()
		message.error('Configuration failed, please try again!')
		return false
	}
}

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserList[]) => {
	const hide = message.loading('正在删除')
	if (!selectedRows) return true
	try {
		await removeRule({
			key: selectedRows.map(row => row.id),
		})
		hide()
		message.success('Deleted successfully and will refresh soon')
		return true
	} catch (error) {
		hide()
		message.error('Delete failed, please try again')
		return false
	}
}
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
// TODO: refer： https://github.com/ant-design/ant-design-pro
// ProTable：https://procomponents.ant.design/components/table
const useProTable = () => {
	const actionRef = useRef<ActionType>()
	const [createModalOpen, handleModalOpen] = useState<boolean>(false)
	const [selectedRowsState, setSelectedRows] = useState<UserList[]>([])
	const [currentRow, setCurrentRow] = useState<UserList>()
	const [showDetail, setShowDetail] = useState<boolean>(false)
	const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false)
	const dispatch = useDispatch()

	// TODO:
	// 设置 页码值的 useState
	// 设置 搜索条件的 useState
	// useEffect 监听值的变化去请求服务端

	const columns: ProColumns<UserList>[] = [
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
			width: 60,
			render: (data, entity) => action(entity),
		},
	]

	// 操作按钮：查看、新增、删除
	const action = (entity: UserList) => [
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
										setCurrentRow(entity)
										setShowDetail(true)
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
								<Button key="delete" type="link" size="small" danger icon={<DeleteOutlined />}>
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

	const onSearch = () => {}
	const toolBarRender = () => [
		<Search placeholder="快捷搜索..." allowClear onSearch={onSearch} style={{ width: 200 }} />,
		<Button
			type="dashed"
			key="button"
			icon={<PlusOutlined />}
			onClick={() => {
				handleModalOpen(true)
			}}>
			新建
		</Button>,
		<Button
			type="dashed"
			key="button"
			icon={<ArrowsAltOutlined />}
			onClick={() => {
				handleModalOpen(true)
			}}>
			导出EXCEL
		</Button>,
		<Button
			type="dashed"
			key="button"
			icon={<ShrinkOutlined />}
			onClick={() => {
				handleModalOpen(true)
			}}>
			导入EXCEL
		</Button>,
		<Tooltip title="全屏" className="text-lg">
			<span onClick={() => dispatch(setGlobalState({ key: 'maximize', value: true }))}>
				<FullscreenOutlined />
			</span>
		</Tooltip>,
	]

	// & 表格封装成通用
	return (
		<>
			<ProTable<UserList>
				className="ant-pro-table-scroll"
				columns={columns}
				actionRef={actionRef} // Table action 的引用，便于自定义触发      actionRef.current.reload()  |  actionRef.current.reset()   |   actionRef.current.clearSelected()
				bordered={true}
				cardBordered
				scroll={{ x: 2500, y: '100%' }}
				// polling={2000} // 是否轮询
				// params={{}} // 用于 request 查询的额外参数，一旦变化会触发重新加载
				request={async (params, sort, filter) => {
					const { data } = await getUserList(params)
					console.log('data', data)
					return formatDataForProTable<UserList>(data)
				}}
				// postData={() => {}} // 	对通过 request 获取的数据进行处理
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: 'use-pro-table-key',
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
				rowKey="id"
				search={{ labelWidth: 'auto', filterType: 'query', span: 4 }} // 搜索表单 Search
				pagination={pagination}
				dateFormatter="string"
				headerTitle="使用 ProTable"
				toolBarRender={toolBarRender}
				rowSelection={{
					onChange: (_, selectedRows) => {
						setSelectedRows(selectedRows)
					},
				}}
				defaultSize="small" // 尺寸：紧凑、中等、宽松
				onSizeChange={() => {}} // 尺寸发生改变、将尺寸存储到数据库中
				onSubmit={params => {}} // 提交表单时触发
				onReset={() => {}} // 重置表单时触发
				// editable={{
				//   type: 'multiple',
				//   editableKeys,
				//   onSave: async (rowKey, data, row) => {
				//     console.log(rowKey, data, row);
				//     await waitTime(2000);
				//   },
				//   onChange: setEditableRowKeys,
				// }}
				ghost={false}
				// toolbar={{}}
			/>

			{selectedRowsState?.length > 0 && (
				<FooterToolbar
					extra={
						<div className="font-mono">
							已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;&nbsp;&nbsp;
							<span>
								总数为 <span className="text-red-600">{selectedRowsState.reduce((pre, item) => pre + item.age!, 0)}</span> 岁
							</span>
						</div>
					}>
					<Button
						onClick={async () => {
							await handleRemove(selectedRowsState)
							setSelectedRows([])
							actionRef.current?.reloadAndRest?.()
						}}>
						批量删除
					</Button>
					<Button type="primary">批量批准</Button>
				</FooterToolbar>
			)}

			<ModalForm
				title="新建"
				width="400px"
				open={createModalOpen}
				onOpenChange={handleModalOpen}
				onFinish={async value => {
					const success = await handleAdd(value as UserList)
					if (success) {
						handleModalOpen(false)
						if (actionRef.current) {
							actionRef.current.reload()
						}
					}
				}}>
				<ProFormText
					rules={[
						{
							required: true,
							message: 'Rule name is required',
						},
					]}
					width="md"
					name="name"
				/>
				<ProFormTextArea width="md" name="desc" />
			</ModalForm>

			<UpdateForm
				onSubmit={async value => {
					message.info('成功，，，')
					const success = await handleUpdate(value)
					if (success) {
						handleUpdateModalOpen(false)
						setCurrentRow(undefined)
						if (actionRef.current) {
							actionRef.current.reload()
						}
					}
				}}
				onCancel={() => {
					message.info('取消，，，')
					handleUpdateModalOpen(false)
					if (!showDetail) {
						setCurrentRow(undefined)
					}
				}}
				updateModalOpen={updateModalOpen}
				values={currentRow || {}}
			/>
			<Drawer
				width={600}
				open={showDetail}
				onClose={() => {
					setCurrentRow(undefined)
					setShowDetail(false)
				}}
				closable={false}>
				{currentRow?.username && (
					<ProDescriptions<UserList>
						column={2}
						title={currentRow?.username}
						request={async () => ({
							data: currentRow || {},
						})}
						params={{
							id: currentRow?.username,
						}}
						columns={columns as ProDescriptionsItemProps<UserList>[]}
					/>
				)}
			</Drawer>
		</>
	)
}

export default useProTable
