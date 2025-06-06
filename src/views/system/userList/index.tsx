import { useRef, useState } from 'react'
import { Button, Col, Drawer, Form, Input, Modal, Row } from 'antd'
import { formatDataForProTable } from '@/utils'
import { pagination as paginationConfig } from '@/config/proTable'
import { UserList } from '@/api/interface'
import { FooterToolbar, ModalForm, ProDescriptions, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components'
import type { ActionType, FormInstance, ProDescriptionsItemProps } from '@ant-design/pro-components'
import { message } from '@/hooks/useMessage'
import { addRule, removeRule, updateRule } from '@/api/modules/api_useProTable_eg/api'
import UpdateForm from './component/UpdateForm'
import TableColumnsConfig, { TableColumnsParams } from './component/Table_Column_Config'
import ToolBarRender from './component/Tool_Bar_Render'
import { GetProTableUser } from '@/api/modules/upack/common'
import './index.less'
import { DeleteOutlined } from '@ant-design/icons'
import handle from './component/Handler'

export type FormValueType = {
	target?: string
	template?: string
	type?: string
	time?: string
	frequency?: string
} & Partial<UserList>

// TODO: refer： https://github.com/ant-design/ant-design-pro
// ProTable：https://procomponents.ant.design/components/table
const useProTable = () => {
	// console.log('defalut', defalut)

	const actionRef = useRef<ActionType>()
	const formRef = useRef<FormInstance>()
	const [createModalOpen, handleModalOpen] = useState<boolean>(false)
	const [selectedRowsState, setSelectedRows] = useState<UserList[]>([]) // 表格：选择行数据
	const [currentRow, setCurrentRow] = useState<UserList>()
	const [showDetail, setShowDetail] = useState<boolean>(false)
	const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false)
	const [pagination, setPagination] = useState<any>({}) // 分页数据

	const [openSearch, SetOpenSearch] = useState<boolean>(false) // 工具栏：开启关闭表单搜索
	const [loading, SetLoading] = useState<boolean>(false) // Loading：加载Loading
	const [form] = Form.useForm()

	// TODO:
	// 设置 页码值的 useState
	// 设置 搜索条件的 useState
	// useEffect 监听值的变化去请求服务端

	const quickSearch = () => {}

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

	// * 工具栏 ToolBar
	let ToolBarParams = {
		handleModalOpen, // 工具栏：新建按钮
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
	}
	// * 列配置 Column
	let TableColumnParams: TableColumnsParams = {
		setCurrentRow,
		setShowDetail,
	}

	const handleUserAdd = async () => {
		const hide = message.loading('正在添加')
		try {
			const formValues = form.getFieldsValue()
			console.log('formValues', formValues)
			const result = await addRule({ ...formValues })
			if (result) {
				hide()
				form.resetFields()
				handleModalOpen(false)
				if (actionRef.current) actionRef.current.reload()
				message.success('Added successfully')
			}
		} catch (error) {
			hide()
			message.error('Adding failed, please try again!')
		}
	}

	// & 表格封装成通用
	// 表格数量量多会如何？ 500 - 5000 - 50000
	return (
		<>
			<ProTable<UserList>
				rowKey="_id"
				className="ant-pro-table-scroll"
				scroll={{ x: 2500, y: '100vh' }}
				bordered
				cardBordered
				loading={loading}
				columns={TableColumnsConfig(TableColumnParams)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				// dataSource={[]}
				actionRef={actionRef} // Table action 的引用，便于自定义触发      actionRef.current.reload()  |  actionRef.current.reset()   |   actionRef.current.clearSelected()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				// params={{
				// 	current: pagination.page,
				// 	pageSize: pagination.pageSize,
				// }} // 用于 request 查询的额外参数，一旦变化会触发重新加载、比如表单的变化
				onSubmit={params => {
					console.log('onSubmit', params)
				}} // 提交表单时触发
				onReset={() => {}} // 重置表单时触发
				pagination={{
					...paginationConfig,
					pageSizeOptions: [10, 20, 50],
					onChange: (page, pageSize) => {
						console.log('page, pageSize', page, pageSize)
						// SetLoading(true)
						setPagination({ page, pageSize })
					},
					onShowSizeChange: (current, size) => {
						console.log('current, size)', current, size)
					},
				}}
				request={async (params, sort, filter) => {
					console.log('request请求参数：', params, sort, filter)
					// console.log('request - sort', sort)
					// console.log('request - filter', filter)
					// const { data } = await getUserList(params)
					// console.log('api === request == data', data)
					// return formatDataForProTable<UserList>(data)
					const { data }: any = await GetProTableUser(params)
					console.log('请求数据：', data)
					return formatDataForProTable<UserList>(data)
				}}
				postData={(data: any[]) => data.map((value, index) => ({ ...value, key: index + 1 }))}
				rowSelection={{
					onChange: (_, selectedRows) => {
						setSelectedRows(selectedRows)
					},
				}}
				ghost={false}
				dateFormatter="string"
				headerTitle="使用 ProTable"
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: 6 }} // 搜索表单配置 Form
				defaultSize="small" // 尺寸：紧凑、中等、宽松
				onSizeChange={() => {}} // Table 尺寸发生改变、将尺寸存储到数据库中
				onRequestError={(error: any) => {}} // 数据加载失败时触发
				editable={{ type: 'multiple' }}
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: 'use-pro-table-key',
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
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
						key="deleteAll"
						size="middle"
						icon={<DeleteOutlined />}
						danger
						onClick={async () => {
							await handle.handleRemove(selectedRowsState)
							setSelectedRows([])
							actionRef.current?.reloadAndRest?.()
						}}>
						批量删除
					</Button>
					<Button type="primary">批量批准</Button>
				</FooterToolbar>
			)}
			{/* 需要封装一下 Modal 中的 Form 组件------------------------ */}
			<Modal
				title="新建用户"
				width={1000}
				loading={false}
				open={createModalOpen}
				onCancel={() => {
					handleModalOpen(false)
				}}
				footer={[
					<Button
						danger
						loading={loading}
						onClick={() => {
							handleModalOpen(false)
						}}>
						取消
					</Button>,
					<Button
						key="back"
						onClick={() => {
							form.resetFields()
						}}>
						重置表单
					</Button>,
					<Button
						key="link"
						type="primary"
						loading={loading}
						onClick={() => {
							handleUserAdd()
						}}>
						提交
					</Button>,
				]}>
				<Form layout="horizontal" form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item label="姓名" name="name" rules={[{ required: true, message: '请输入姓名' }]}>
								<Input placeholder="请输入姓名" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="年龄" name="age" rules={[{ required: false, message: '请输入年龄' }]}>
								<Input placeholder="请输入年龄" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="出生日期" name="date" rules={[{ required: false, message: '请输入姓名' }]}>
								<Input placeholder="请输入姓名" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="考试成绩" name="score" rules={[{ required: false, message: '请输入年龄' }]}>
								<Input placeholder="请输入年龄" />
							</Form.Item>
						</Col>
					</Row>
					{/* <Row>
						<Col span={24}>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									提交
								</Button>
								<Button type="primary" htmlType="submit">
									提交
								</Button>
							</Form.Item>
						</Col>
					</Row> */}
				</Form>
			</Modal>
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
						columns={TableColumnsConfig(TableColumnParams) as ProDescriptionsItemProps<UserList>[]}
					/>
				)}
			</Drawer>
		</>
	)
}

export default useProTable
