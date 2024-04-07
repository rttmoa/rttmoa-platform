import React, { useCallback, useEffect, useState } from 'react'
import { Card, Badge, Button, Space, Tag, Table, message, Modal, Form, Input, Radio, Select, DatePicker, Popconfirm, Tabs, Upload } from 'antd'
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

interface stateConfig {
	[propName: number]: React.ReactNode
}
interface InterestConfig {
	[propName: number]: string
}

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
	const [roleObj, setroleObj] = useState<any>({})
	const [roleAll, setroleAll] = useState([])

	// Table 表格
	const [loading, setLoading] = useState(false)
	const [userList, setUserList] = useState<any>([])
	const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10, totalCount: 0 })
	const [selectRowItem, setSelectRowItem] = useState<any>({ selectedRowKeys: [], selectedIds: [], selectedItem: {} })

	// 处理弹窗
	const [modalIsVisible, setModalIsVisible] = useState(false)
	const [modalTitle, setModalTitle] = useState('')
	const [modalType, setModalType] = useState('')
	const [modalUserInfo, setModalUserInfo] = useState({})

	// 表单过滤条件（输入框）
	const [searchFilter, setSearchFilter] = useState({})

	// 表单过滤条件（选择框）
	const [filterResult, setfilterResult] = useState<selectdProps>({ state: '1', type: ['1', '3'] })

	const [form] = Form.useForm()
	const [multiForm] = Form.useForm()

	const getData = () => {
		setLoading(true)
		setTimeout(() => {
			// console.log('最近', page, pageSize );
			const { page, pageSize } = pagination
			let searchParams = { page, pageSize, ...searchFilter }
			getUserList(searchParams).then((res: any) => {
				// console.log("响应结果：", res);
				setLoading(false)
				const newData = res.data.list.map((item: any, index: number) => ({
					...item,
					key: index,
				}))
				// console.log('newData', newData);
				setUserList(newData.splice(0, pageSize))
				setPagination({
					page: res.data.page,
					pageSize: res.data.page_size,
					totalCount: res.data.total_count,
				})
			})
		}, 500)
	}
	const getRoleData = () => {
		roleList().then((res: any) => {
			console.log(res)
			let data = res.data.list
			// console.log(data);
			const roleNames: [] = data.reduce((prev: { [x: string]: any }, curr: { id: string | number; role_name: string }) => {
				prev[curr.id] = curr.role_name
				return prev
			}, {})
			setroleObj(roleNames || [])
			setroleAll(data)
		})
	}
	useEffect(() => {
		getData()
		getRoleData()
	}, [pagination.page, pagination.pageSize])

	const columnConfig: TableProps['columns'] = [
		{
			title: 'id',
			dataIndex: 'id',
			width: 80,
			fixed: 'left',
		},
		{
			title: '用户名',
			dataIndex: 'username',
			width: 80,
			fixed: 'left',
		},
		{
			title: '性别',
			dataIndex: 'sex',
			render: (sex: number) => (sex === 1 ? '男' : '女'),
			// width: "6%",
		},
		{
			title: '状态',
			dataIndex: 'state',
			render: (state: number) => {
				let config: stateConfig = {
					1: <Tag color="green">痛苦</Tag>,
					2: <Tag color="blue">委屈</Tag>,
					3: <Tag color="orange">迷茫</Tag>,
					4: <Tag color="red">平淡</Tag>,
					5: <Tag color="purple">开心</Tag>,
				}
				return config[state]
			},
			// width: "6%",
		},
		{
			title: '爱好',
			dataIndex: 'interest',
			render: (interest: number) => {
				let config: InterestConfig = {
					1: '游泳',
					2: '打篮球',
					3: '踢足球',
					4: '跑步',
					5: '爬山',
					6: '骑行',
					7: '桌球',
					8: '麦霸',
				}
				return config[interest]
			},
			// width: "6%",
		},
		{
			title: '婚姻状态',
			dataIndex: 'isMarried',
			render(isMarried: number) {
				return isMarried ? <Badge status="success" text="已婚" /> : <Badge status="error" text="未婚" />
			},
			// width: 80
		},
		{
			title: '所属角色',
			dataIndex: 'role_id',
			render: (roleiD: number) => roleObj[roleiD],
			// width: 80
		},
		{
			title: '手机号',
			render() {
				let tele = 15303663375
				let strTele = tele + '' // 数字类型转字符串
				let phone = strTele.replace(/(\d{3})\d*(\d{4})/g, '$1***$2')
				return <span>{phone}</span>
			},
		},
		{
			title: '身份证号',
			// width: 150,
			render() {
				let identity = 231085199811011415n
				let strIdentity = identity + '' // 数字类型转字符串
				let res = strIdentity.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2')
				return <span>{res}</span>
			},
		},
		{
			title: '联系地址',
			dataIndex: 'address',
			// width: 250
		},
		{
			title: '邮箱',
			dataIndex: 'email',
			// width: 250,
		},
		{
			title: '生日',
			dataIndex: 'birthday',
			// width: "6%",
		},
		{
			title: '早起时间',
			dataIndex: 'time',
			// width: "6%",
		},
		{
			title: '操作',
			fixed: 'right',
			width: 200,
			render(record: any) {
				return (
					<Space>
						<Button
							size="small"
							onClick={() => {
								handleOperator('detail', record)
							}}>
							详情
						</Button>
						<Button
							size="small"
							onClick={() => {
								handleOperator('edit', record)
							}}>
							编辑
						</Button>
						<Button
							size="small"
							onClick={() => {
								handleOperator('delete', record)
							}}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]
	// ! 操作员工： 新建、编辑、详情、删除  弹窗显示
	const handleOperator = (type: string, item: any) => {
		console.log('handleOperator', type, item)
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

	const header = {
		address: '地址',
		birthday: '生日',
		email: '邮箱',
		id: 'id',
		interest: '爱好',
		isMarried: '婚姻状态',
	}
	// console.log('userList', userList);
	const structure = (
		<div>
			<Card className="mb20" style={{}}>
				<Tabs
					defaultActiveKey="1"
					// centered
					items={[
						{
							label: `输入框查询`,
							key: '1',
							children: (
								<MultiForm
									multiForm={multiForm} // form属性，初始化，获取值使用
									formList={formList}
									extendFormList={extendFormList}
									filterSubmit={(filterParams = {}) => {
										setSearchFilter(filterParams)
									}}
								/>
							),
						},
						// {
						// 	label: `选择框查询`,
						// 	key: '2',
						// 	children: <SelectFilter data={SelectFilterData} defaultValue={filterResult} selectChange={selectChange} />,
						// },
					]}
				/>
			</Card>
			{/* <UserButton /> */}
			<Card
				className="mb30"
				title="用户列表"
				extra={
					<Space size="large">
						<Button
							size="middle"
							onClick={() => {
								handleOperator('create', null)
							}}>
							新建
						</Button>

						<Popconfirm
							title="批量删除"
							description="你确定要删除吗？"
							okText="确定"
							cancelText="取消"
							onConfirm={() => {
								handleOperator('moreDelete', null)
							}}>
							<Button size="middle" disabled={selectRowItem.selectedRowKeys.length <= 1} icon={<DeleteOutlined />}>
								批量删除
							</Button>
						</Popconfirm>
						<Button
							size="middle"
							onClick={() => {
								handleExportAll(header, userList, '用户列表')
							}}>
							导出Excel
						</Button>
						<Upload
							beforeUpload={file => {
								const isExcel = /\.(xlsx|xls)$/.test(file.name.toLowerCase())
								if (!isExcel) {
									message.error('请上传Excel文件（.xlsx 或 .xls）')
									return false
								}
								return false
							}}>
							<Button>上传Excel</Button>
						</Upload>
					</Space>
				}
				style={{ width: '100%' }}>
				<MultiTable
					rowSelection="checkbox"
					columns={columnConfig}
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
					// scroll={{ x: 1500 }}
					id="cart-scrollTable"
					xScroll
					// yScroll
					// scroll={{y: 1000}}
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
		</div>
	)

	return <>{structure}</>
}
export default UserManage
