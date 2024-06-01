import { useRef, useState } from 'react'
import { Button, Drawer } from 'antd'
import { formatDataForProTable } from '@/utils'
import { pagination } from '@/config/proTable'
import { getUserList } from '@/api/modules/user'
import { UserList } from '@/api/interface'
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons'
import { FooterToolbar, ModalForm, ProDescriptions, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components'
import { message } from '@/hooks/useMessage'
import { addRule, removeRule, updateRule } from './api'
import UpdateForm from './UpdateForm'

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

// TODO: refer： https://github.com/ant-design/ant-design-pro
// ProTable：https://procomponents.ant.design/components/table
const useProTable = () => {
	const actionRef = useRef<ActionType>()
	const [createModalOpen, handleModalOpen] = useState<boolean>(false)
	const [selectedRowsState, setSelectedRows] = useState<UserList[]>([])
	const [currentRow, setCurrentRow] = useState<UserList>()
	const [showDetail, setShowDetail] = useState<boolean>(false)
	const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false)

	const columns: ProColumns<UserList>[] = [
		{
			title: '用户名',
			dataIndex: 'username',
			copyable: true,
			width: 200,
			render: (dom, entity) => {
				return (
					<a
						onClick={() => {
							setCurrentRow(entity)
							setShowDetail(true)
							// message.info(`点击了 ${entity.username}`)
						}}>
						{dom}
					</a>
				)
			},
		},
		{
			title: '性别',
			dataIndex: 'gender',
			width: 150,
			valueEnum: {
				1: { text: '男' },
				2: { text: '女' },
			},
		},
		{
			title: '年龄',
			dataIndex: 'age',
			width: 150,
		},
		{
			title: '状态',
			dataIndex: 'status', // status
			hideInForm: true,
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
					text: '',
					status: 'Error',
				},
			},
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			hideInSearch: true,
		},
		{
			title: '地址',
			dataIndex: 'address',
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
			width: 250,
			render: (data, entity) => action(entity),
		},
	]

	const action = (entity: UserList) => [
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
		</Button>,
		<Button key="edit" type="link" size="small" icon={<EditOutlined />}>
			编辑
		</Button>,
		<Button key="delete" type="link" size="small" danger icon={<DeleteOutlined />}>
			删除
		</Button>,
	]

	const toolBarRender = () => [
		<Button
			type="primary"
			key="button"
			icon={<PlusOutlined />}
			onClick={() => {
				handleModalOpen(true)
			}}>
			新建
		</Button>,
	]

	return (
		<>
			<ProTable<UserList>
				className="ant-pro-table-scroll"
				columns={columns}
				actionRef={actionRef}
				bordered
				cardBordered
				scroll={{ x: 1000, y: '100%' }}
				request={async params => {
					const { data } = await getUserList(params)
					return formatDataForProTable<UserList>(data)
				}}
				columnsState={{
					persistenceKey: 'use-pro-table-key',
					persistenceType: 'localStorage',
				}}
				rowKey="id"
				search={{ labelWidth: 'auto' }} // 120 / 'auto'
				pagination={pagination}
				dateFormatter="string"
				headerTitle="使用 ProTable"
				toolBarRender={toolBarRender}
				rowSelection={{
					onChange: (_, selectedRows) => {
						setSelectedRows(selectedRows)
					},
				}}
			/>
			{selectedRowsState?.length > 0 && (
				<FooterToolbar
					extra={
						<div>
							已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;
							<span>The total number is {selectedRowsState.reduce((pre, item) => pre + item.age!, 0)} age</span>
						</div>
					}>
					<Button
						onClick={async () => {
							await handleRemove(selectedRowsState)
							setSelectedRows([])
							actionRef.current?.reloadAndRest?.()
						}}>
						Batch deletion
					</Button>
					<Button type="primary">Batch approval</Button>
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
