import React, { useCallback, useEffect, useState } from 'react'
import { Card, Badge, Button, Space, Tag, Table, message, Modal, Form, Input, Radio, Select, DatePicker, Popconfirm, Tabs, Upload, Tooltip } from 'antd'
import { createUser, editUser, getUserList } from '@/api/modules/system/userManage'
import MultiForm from '@/components/Forms'
import MultiTable from '@/components/Tables'
import { roleList } from '@/api/modules/system/roleManage'
import { TableProps } from 'antd/lib/table/InternalTable'
import UserFormModal from './components/UserFormModal'
import { SelectFilterData, extendFormList, formList } from './config'
import { DeleteOutlined } from '@ant-design/icons'
import SelectFilter, { selectdProps } from '@/components/SelectFilter'
import useExportExcle from '@/hooks/useExportExcle'
import UserButton from '../../../components/GrainButton'
import './index.less'
import { columnConfig } from './components/Column_Config'
import TableHeader from './components/TableHeader'

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

const UserManage = () => {
	const { handleExportAll } = useExportExcle()
	// 处理角色
	const [roleObj, setroleObj] = useState<any>({}) // 角色对象： {0: '普通用户', 1: '客服专员', 2: '前端开发', 3: '后端开发', 4: '运维', 5: '管理员'}
	const [roleAll, setroleAll] = useState([])

	// & 页码和搜索条件变动 去服务端取数据 searchFilter + pagination

	// 表单过滤条件（输入框）
	const [searchFilter, setSearchFilter] = useState({})
	// 表单过滤条件（选择框）
	const [filterResult, setfilterResult] = useState<selectdProps>({ state: '1', type: ['1', '3'] })

	// Table 表格
	const [loading, setLoading] = useState(false)
	const [userList, setUserList] = useState<any>([])
	const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10, totalCount: 0 }) // 分页
	const [selectRowItem, setSelectRowItem] = useState<any>({ selectedRowKeys: [], selectedIds: [], selectedItem: {} })

	// 处理弹窗
	const [modalIsVisible, setModalIsVisible] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalType, setModalType] = useState('')
	const [modalUserInfo, setModalUserInfo] = useState({})

	const [form] = Form.useForm()
	const [multiForm] = Form.useForm()

	function isValidValue(val: any) {
		return !(val === undefined || val === null || (typeof val === 'string' && val.trim() === ''))
	}
	const hasValid = Object.values(searchFilter).some(isValidValue)
	const getData = () => {
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
		getData()
	}, [pagination.page, pagination.pageSize, searchFilter])

	// 获取所属角色数据：管理员、前端开发
	const getRoleData = () => {
		console.log('getRoleData == change')
		roleList().then((res: any) => {
			let data = res.data.list
			// console.log('getRoleData', data)
			const roleNames: [] = data.reduce((prev: any, curr: any) => {
				prev[curr.id] = curr.role_name
				return prev
			}, {})
			// console.log('roleNames', roleNames)
			setroleObj(roleNames || [])
			setroleAll(data)
		})
	}
	useEffect(() => {
		getRoleData()
	}, [])

	// ! 操作员工： 新建、编辑、详情、删除  弹窗显示
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
	// ! 操作员工： 新建、编辑、详情、删除  弹窗内容提交
	const handleSubmit = () => {
		let type = modalType
		let data = form.getFieldsValue()
		// console.log("handleSubmit data", data);
		let res = type === 'create' ? createUser(data) : editUser(data)
		// 重新请求，根据页码等条件
	}

	const selectChange = (value: selectdProps) => {
		setfilterResult(value)
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
	return (
		<>
			<Card className="mb5">
				<MultiForm
					multiForm={multiForm} // form属性，初始化，获取值使用
					formList={formList}
					extendFormList={extendFormList}
					filterSubmit={(filterParams = {}) => {
						console.log('表单值：', filterParams)
						setSearchFilter(filterParams)
					}}
				/>
			</Card>
			{/* <UserButton />  特效按钮 */}
			<Card className="w-full" title="用户列表" extra={<TableHeader {...TableHeaderConfig} />}>
				<MultiTable
					rowSelection="checkbox"
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
					loading={loading}
					// scroll={{ x: 3500 }}
					id="cart-scrollTable"
					xScroll
					scroll={{ y: 55 * 10 }}
					sticky={{ offsetHeader: 64 }}
					// yScroll
					// scroll={{y: 1000}}
					//  sticky={{ offsetHeader: 64 }} // https://ant.design/components/table-cn#table-demo-sticky
				/>
			</Card>
			<Modal
				width={800}
				title={modalTitle}
				open={modalIsVisible}
				onOk={handleSubmit}
				onCancel={() => {
					setModalTitle('')
					setModalIsVisible(false)
					setModalType('')
					setModalUserInfo({})
				}}>
				<UserFormModal roles={roleAll} userInfo={modalUserInfo} type={modalType} form={form} />
			</Modal>
		</>
	)
}
export default UserManage
