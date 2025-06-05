import React, { useCallback, useEffect, useState } from 'react'
import { Card, Badge, Button, Space, Tag, Table, message, Modal, Form, Input, Radio, Select, DatePicker, Popconfirm, Tabs, Upload, Tooltip } from 'antd'
import { createUser, editUser, getUserList } from '@/api/modules/system/userManage'
import MultiForm from '@/components/Forms'
import MultiTable from '@/components/Tables'
import { roleList } from '@/api/modules/system/roleManage'
import { TableProps } from 'antd/lib/table/InternalTable'
import UserFormModal from './components/UserFormModal'
import { SelectFilterData, extendFormList, formList } from './components/Form_Config'
import { DeleteOutlined } from '@ant-design/icons'
import SelectFilter, { selectdProps } from '@/components/SelectFilter'
import useExportExcle from '@/hooks/useExportExcle'
import './index.less'
import { columnConfig } from './components/Table_Column_Config'
import TableHeader from './components/TableHeader'
import AdvancedForm from '@/views/form/advancedForm'
import AdvancedSearchForm from '@/components/AdvancedSearchForm/AdvancedSearchForm'

interface UserListResults {
	code?: number
	data: {
		list: []
		page?: number
		page_count?: number
		page_size?: number
		total_count?: number
	}
	msg?: string
}

interface Pagination {
	page: number
	pageSize: number
	totalCount?: number
}

// ! 1、注意：向后台传递的参数有：表头搜索、表格过滤、表格排序、分页
// ! 2、页码和搜索条件变动 去服务端取数据 searchFilter + pagination
const UserManage: React.FC = () => {
	const { handleExportAll } = useExportExcle()

	// * 处理角色
	const [roleObj, setroleObj] = useState<any>({}) // 角色对象： {0: '普通用户', 1: '客服专员', 2: '前端开发', 3: '后端开发', 4: '运维', 5: '管理员'}
	const [roleAll, setroleAll] = useState([]) // 所有角色的集合

	// * 表格查询：表单搜索条件
	const [searchFilter, setSearchFilter] = useState({}) // * {user_name: '张三', sex: 2, phone: '15303663375'}
	// 表格查询：表单过滤条件（选择框）
	const [filterResult, setfilterResult] = useState<selectdProps>({ state: '1', type: ['1', '3'] })

	// * Table 表格
	const [loading, setLoading] = useState(false)
	const [userList, setUserList] = useState<any>([])
	const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10, totalCount: 0 }) // 分页
	const [selectRowItem, setSelectRowItem] = useState<any>({ selectedRowKeys: [], selectedIds: [], selectedItem: {} })

	// * 处理弹窗
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
	const [modalTitle, setModalTitle] = useState<string>('')
	const [modalType, setModalType] = useState<string>('')
	const [modalUserInfo, setModalUserInfo] = useState({})

	const [form] = Form.useForm()
	const [multiForm] = Form.useForm()

	function isValidValue(val: any) {
		return !(val === undefined || val === null || (typeof val === 'string' && val.trim() === ''))
	}
	const hasValid = Object.values(searchFilter).some(isValidValue)
	const GetData = async () => {
		setLoading(true)
		console.log('pagination', pagination)
		let searchParams = { page: pagination.page, pageSize: pagination.pageSize, ...searchFilter }
		getUserList(searchParams).then((res: any) => {
			setLoading(false)
			const newData = res.data.list.map((item: any, index: number) => ({ ...item, key: index }))
			setUserList(newData.splice(0, pagination.pageSize))
			setPagination({
				page: pagination.page || 1,
				pageSize: pagination.pageSize || 10,
				totalCount: res.data.total_count || 0,
			})
		})
	}
	useEffect(() => {
		GetData()
	}, [pagination.page, pagination.pageSize, searchFilter])

	// 获取所属角色数据：管理员、前端开发
	const GetRoleData = () => {
		console.log('getRoleData == change')
		roleList().then((res: any) => {
			let data = res.data.list
			const roleNames: [] = data.reduce((prev: any, curr: any) => {
				prev[curr.id] = curr.role_name
				return prev
			}, {})
			setroleObj(roleNames || [])
			setroleAll(data)
		})
	}
	useEffect(() => {
		GetRoleData()
	}, [])

	// * 操作 — 员工： 新建、编辑、详情、删除  弹窗显示
	const handleOperator = (type: string, item: any) => {
		// console.log('handleOperator', type, item)
		if (type === 'create') {
			setModalIsVisible(true)
			setModalTitle('新建用户')
			setModalType(type)
		} else if (['edit', 'detail'].includes(type)) {
			setModalTitle(type === 'edit' ? '编辑用户' : '查看详情')
			setModalType(type)
			setModalUserInfo(item)
			setModalIsVisible(true)
		} else if (type === 'delete') {
			message.success(`删除用户成功！ id：${item.id}`)
		} else if (type === 'moreDelete') {
			message.success(`删除更多用户成功！ id：${JSON.stringify(selectRowItem.selectedIds)}`)
		}
	}
	// * 操作 — 员工： 新建、编辑、详情、删除  弹窗内容提交
	const handleSubmit = () => {
		let type = modalType
		let data = form.getFieldsValue()
		// console.log("handleSubmit data", data);
		let res = type === 'create' ? createUser(data) : editUser(data)
		// 重新请求，根据页码等条件
	}

	// 导出EXCEL表头
	const header = {
		address: '地址',
		birthday: '生日',
		email: '邮箱',
		id: 'id',
		interest: '爱好',
		isMarried: '婚姻状态',
	}
	// 表头属性
	let TableHeaderConfig = {
		selectRowItem,
		header,
		userList,
		handleOperator,
		handleExportAll,
	}
	const fakeData = true

	let columnConfigParams = {
		fakeData,
		roleObj,
		handleOperator,
	}
	return (
		<>
			{/* <AdvancedSearchForm /> */}
			<MultiForm
				multiForm={multiForm} // form属性，初始化，获取值使用
				formList={formList}
				extendFormList={extendFormList}
				filterSubmit={(filterParams = {}) => {
					console.log('表单值：', filterParams) // * {user_name: '张三', sex: 2, phone: '15303663375'}
					setSearchFilter(filterParams)
				}}
			/>
			<Card className="tableCard w-full" size="small" hoverable loading={false} title={<span className="text-[14px]">用户列表</span>} extra={<TableHeader {...TableHeaderConfig} />}>
				<MultiTable<any>
					id="cart-scrollTable"
					size="small"
					loading={loading}
					xScroll
					scroll={{ x: 'max-content', y: 550 }} // 550
					sticky={{ offsetHeader: 0 }} // https://ant.design/components/table-cn#table-demo-sticky
					rowSelection="checkbox" // checkbox | radio
					columns={fakeData ? columnConfig(fakeData, roleObj, handleOperator) : columnConfig()}
					dataSource={userList}
					pagination={pagination}
					selectedRowKeys={selectRowItem.selectedRowKeys}
					selectedIds={selectRowItem.selectedIds}
					selectedItem={selectRowItem.selectedItem}
					updateSelectedItem={(selectedRowKeys: any, selectedRows: any, selectedIds: any) => {
						setSelectRowItem({
							selectedRowKeys,
							selectedIds: selectedIds && selectedIds.length > 0 ? selectedIds : [],
							selectedRows,
						})
					}}
					updatePage={(page, pageSize) => {
						setPagination((state: Pagination) => ({ ...state, page, pageSize }))
					}}
					summary={() => (
						// <Table.Summary fixed>
						// 	<Table.Summary.Row>
						// 		<Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
						// 		<Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
						// 	</Table.Summary.Row>
						// </Table.Summary>
						<div className="flex h-[30px]">
							<div className="ml-4 w-[80px]">Summassry：</div>
							<div className="flex w-[180px] h-[30px] ml-6">This is a summary content</div>
						</div>
					)}
				/>
			</Card>
			<Modal
				width={800}
				title={modalTitle}
				open={modalIsVisible}
				onOk={handleSubmit}
				onCancel={() => {
					setModalTitle('')
					setModalType('')
					setModalIsVisible(false)
					setModalUserInfo({})
				}}>
				<UserFormModal roles={roleAll} userInfo={modalUserInfo} type={modalType} form={form} />
			</Modal>
		</>
	)
}
export default UserManage
