import { Button, Card, Form, Input, Modal, Select, Space, TableProps, Transfer, Tree } from 'antd'
import MultiTable from '@/components/Tables'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { roleList, roleTransferList } from '@/api/modules/system/roleManage'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux'
import { FormInstance } from 'antd/lib'

function formateDate(time: string) {
	if (!time) return ''
	let date = new Date(Number(time))
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

const RoleManage: React.FC = () => {
	// Table属性
	const [rolelist, setRolelist] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
	const [selectedIds, setSelectedIds] = useState([])
	const [selectedItem, setSelectedItem] = useState<any>({})

	const menuConfig = useSelector((state: RootState) => state.auth.authMenuList)
	// console.log(menuConfig);

	const [formRole] = Form.useForm() // 创建的角色的 Form表单
	const [formPerm] = Form.useForm()
	const [formUser] = Form.useForm()

	const [isRoleVisible, setIsRoleVisible] = useState(false) // 创建角色的 Modal

	const [isPermVisible, setIsPermVisible] = useState(false) // 设置权限弹窗
	const [detailInfo, setdetailInfo] = useState({}) // 单选用户信息
	const [menuInfo, setmenuInfo] = useState([]) // 用户的菜单列表

	const [isUserVisible, setIsUserVisible] = useState(false)
	const [transferData, settransferData] = useState([])
	const [targetKeys, settargetKeys] = useState([])
	const [isAuthClosed, setIsAuthClosed] = useState<any>(null)
	const [detailUserInfo, setdetailUserInfo] = useState({}) // 单选用户信息

	const getStatusV = useRef<any>()

	// 获取角色列表
	useEffect(() => {
		;(async function () {
			roleList().then((result: any) => {
				console.log(result)
				const list = result.data.list.map((item: any, i: number) => ({ ...item, key: i }))
				setRolelist(list)
			})
		})()
	}, [])

	const column: TableProps['columns'] = [
		// {
		//   title: "角色iD",
		//   dataIndex: "id"
		// },
		{
			title: '角色名称',
			dataIndex: 'role_name',
			align: 'center',
		},
		{
			title: '使用状态',
			dataIndex: 'status',
			align: 'center',
			render: (status: number) => {
				return status === 1 ? '启用' : '停用'
			},
		},
		{
			title: '授权人',
			align: 'center',
			dataIndex: 'authorize_user_name',
		},
		{
			title: '创建时间',
			align: 'center',
			dataIndex: 'create_time',
			render: formateDate,
			// width: 150
		},
		{
			title: '授权时间',
			align: 'center',
			dataIndex: 'authorize_time',
			render: formateDate,
			// width: 150
		},
	]

	const updateSelectedItem = (selectedRowKeys: any, selectedRows: any, selectedIds: any) => {
		if (selectedIds) {
			setSelectedRowKeys(selectedRowKeys)
			setSelectedIds(selectedIds)
			setSelectedItem(selectedRows)
		} else {
			setSelectedRowKeys(selectedRowKeys)
			setSelectedItem(selectedRows)
		}
	}

	// 弹窗：角色创建
	const createRoleBtn = () => {
		setIsRoleVisible(true)
	}
	// 弹窗：角色提交
	const createRoleSubmit = () => {
		const formData = formRole.getFieldsValue() // {role_name: '张三', status: 0}
		// 1.提交到接口中
		// 2.获取返回值
		// 3.重新获取数据
		// 4.关闭弹窗
		formRole.resetFields()
		setIsRoleVisible(false)
	}

	// 弹窗：设置权限
	const setPermBtn = () => {
		if (JSON.stringify(selectedItem) == '{}') {
			Modal.info({ title: '信息', content: '请选择一个角色' })
			return
		}
		setIsPermVisible(true)
		setdetailInfo(selectedItem)
		setmenuInfo(selectedItem.menus)
	}
	// 弹窗：权限提交
	const setPermSubmit = () => {
		let formData = formPerm.getFieldsValue() // {role_name2: '客服专员', status2: 1, menu: undefined}
		// console.log('提交权限菜单：', formData);
		formData.role_id = selectedItem.id
		formData.menus = menuInfo
		formData.authorize_time = Date.now()
		// 1.提交到后台接口
		// 2.接口返回成功，重新获取数据
		// 3.初始化表单值
		formPerm.resetFields()
		// 4.关闭弹窗
		setIsPermVisible(false)
	}

	// 弹窗：用户授权按钮
	const userPermBtn = async () => {
		if (JSON.stringify(selectedItem) == '{}') {
			Modal.info({ title: '信息', content: '未选中任何项目' })
			return
		}
		// 获取角色用户列表 > 筛选目标用户
		const results: any = await roleTransferList(selectedItem.id) // 根据iD获取该角色原有用户
		// console.log("results", results);
		const transferData: any = []
		const targetKeys: any = []
		if (results.data.length > 0) {
			const dataSource = results.data
			for (let index = 0; index < dataSource.length; index++) {
				const element = dataSource[index]
				const data = {
					key: element.user_id,
					title: element.user_name,
					status: element.status,
				}
				if (data.status === 1) {
					targetKeys.push(data.key)
				}
				transferData.push(data)
			}
		}
		settransferData(transferData)
		settargetKeys(targetKeys)

		// 设置弹窗、权限、用户信息
		setdetailUserInfo(selectedItem)
		setIsAuthClosed(false)
		setIsUserVisible(true)
	}
	// 弹窗：用户授权 提交
	const userPermSubmit = () => {
		let data: any = {}
		data.user_ids = targetKeys || []
		data.role_id = selectedItem.id
		data.authorize_time = Date.now()
		// 将 data 传递到服务端
		// 重置表单值
		formUser.resetFields()
		// 关闭弹窗
		setIsUserVisible(false)
	}
	// console.log("statePros", detailInfo, menuInfo);
	return (
		<>
			<Card
				extra={
					<Space size="middle">
						<Button type="primary" onClick={createRoleBtn}>
							创建角色
						</Button>
						<Button type={selectedItem.id ? 'primary' : 'default'} onClick={setPermBtn} disabled={!selectedItem.id}>
							设置权限
						</Button>
						<Button type={selectedItem.id ? 'primary' : 'default'} onClick={userPermBtn} disabled={!selectedItem.id}>
							用户授权
						</Button>
						{/* <Button type="dashed" onClick={() => { 
							console.log(getStatusV.current);
						}}>
              用户授权组件状态值
            </Button> */}
					</Space>
				}>
				<MultiTable
					columns={column}
					dataSource={rolelist}
					selectedRowKeys={selectedRowKeys}
					selectedIds={selectedIds}
					selectedItem={selectedItem}
					pagination={{}}
					updateSelectedItem={updateSelectedItem}
				/>
			</Card>
			<Modal
				title="创建角色"
				open={isRoleVisible}
				onOk={createRoleSubmit}
				onCancel={() => {
					formRole.resetFields()
					setIsRoleVisible(false)
				}}>
				<RoleForm form={formRole} />
			</Modal>
			<Modal
				width={600}
				title="权限设置"
				open={isPermVisible}
				onOk={setPermSubmit}
				onCancel={() => {
					formPerm.resetFields()
					setIsPermVisible(false)
				}}>
				<PermEditForm
					form={formPerm}
					detailInfo={detailInfo}
					menuInfo={menuInfo || []}
					patchMenuInfo={(checkedKeys: any) => {
						setmenuInfo(checkedKeys)
					}}
					menuConfig={menuConfig}
				/>
			</Modal>
			<Modal
				title="用户授权"
				width={800}
				open={isUserVisible}
				onOk={userPermSubmit}
				onCancel={() => {
					formUser.resetFields()
					setIsUserVisible(false)
				}}>
				<RoleAuthForm
					form={formUser}
					isClose={isAuthClosed}
					detailUserInfo={detailUserInfo}
					targetKeys={targetKeys}
					transferData={transferData}
					patchUserInfo={(targetKeys: any) => {
						settargetKeys(targetKeys)
					}}
					ref={getStatusV}
				/>
			</Modal>
		</>
	)
}

function RoleForm({ form }: { form: FormInstance }): React.ReactNode {
	const formItemLayout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 16 },
	}
	return (
		<>
			<Card>
				<Form form={form} {...formItemLayout} initialValues={{ status: 1 }}>
					<Form.Item label="角色名称" name="role_name">
						<Input type="text" placeholder="请输入角色名称" />
					</Form.Item>
					<Form.Item label="状态" name="status">
						<Select>
							<Select.Option value={1}>开启</Select.Option>
							<Select.Option value={0}>关闭</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</Card>
		</>
	)
}

function PermEditForm({ form, detailInfo, menuInfo, patchMenuInfo, menuConfig }: any): React.ReactNode {
	const renderBtnTreedNode = (menu: any, parentKey = '') => {
		const btnTreeNode: any = []
		menu.btnList.forEach((item: any) => {
			// console.log(parentKey + "-btn-" + item.key);
			btnTreeNode.push(<Tree.TreeNode title={item.meta.title} key={parentKey + '-btn-' + item.path} className="op-role-tree" />)
		})
		return btnTreeNode
	}

	const renderTreeNode = (renderMenu: [], key: string): any => {
		// console.log("renderMenu", renderMenu);
		return renderMenu.map((item: any) => {
			let parentKey = item.path
			// console.log("parentKey", parentKey);
			if (item.children) {
				return (
					<Tree.TreeNode title={item.meta.title} key={parentKey} className="op-role-tree">
						{renderTreeNode(item.children, parentKey)}
					</Tree.TreeNode>
				)
			} else if (item.btnList) {
				return (
					<Tree.TreeNode title={item.meta.title} key={parentKey} className="op-role-tree">
						{renderBtnTreedNode(item, parentKey)}
					</Tree.TreeNode>
				)
			}
			return <Tree.TreeNode title={item.meta.title} key={parentKey} />
		})
	}

	// 优化一下、渲染菜单列表
	const renderTreeNode2 = (menuList: [], key: string): any => {
		return menuList.reduce((prev: any, curr: any): any => {
			let parentKey = curr.path
			prev.push(
				<Tree.TreeNode title={curr.meta.title} key={parentKey}>
					{curr.children ? renderTreeNode2(curr.children, '') : null}
				</Tree.TreeNode>
			)
			return prev
		}, [])
	}

	const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 16 } }
	return (
		<Form form={form} layout="horizontal" {...formItemLayout} initialValues={{ status2: 1, role_name2: detailInfo.role_name }}>
			<Card>
				<Form.Item label="角色名称" name="role_name2">
					<Input disabled maxLength={8} placeholder={detailInfo.role_name} />
				</Form.Item>
				<Form.Item label="状态" name="status2">
					<Select>
						<Select.Option value={1}>启用</Select.Option>
						<Select.Option value={0}>停用</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="菜单" name="menu">
					<Tree
						checkable
						defaultExpandAll
						onCheck={(checkedKeys: any) => {
							patchMenuInfo(checkedKeys)
						}}
						checkedKeys={menuInfo || []}>
						<Tree.TreeNode title="平台权限" key="platform_all">
							{renderTreeNode(menuConfig, '')}
						</Tree.TreeNode>
					</Tree>
				</Form.Item>
			</Card>
		</Form>
	)
}

function RoleAuthForm({ form, isClose, detailUserInfo, targetKeys, transferData, patchUserInfo, ref }: any): React.ReactNode {
	const [status, setstatus] = useState(11)
	const statusValue = () => {
		setstatus(status + 1)
		return status
	}
	// useImperativeHandle(ref, createHandle, [deps])
	useImperativeHandle(ref, () => ({ status, statusValue }))

	const filterOption = (inputValue: any, option: any) => {
		return option.title.indexOf(inputValue) > -1
	}
	const handleChange = (targetKeys: any): void => {
		patchUserInfo(targetKeys)
	}
	const formItemLayout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 18 },
	}
	// console.log(targetKeys);
	return (
		<Form form={form} layout="horizontal" {...formItemLayout} initialValues={{ transfer: targetKeys }}>
			<Form.Item name="role_name3" label="角色名称">
				<Input disabled maxLength={8} placeholder={detailUserInfo.role_name} />
			</Form.Item>
			<Form.Item name="transfer" label="选择用户：">
				<Transfer
					listStyle={{ width: 200, height: 400 }}
					dataSource={transferData}
					showSearch
					titles={['待选用户', '已选用户']}
					filterOption={filterOption}
					targetKeys={targetKeys}
					onChange={handleChange}
					render={(item: any) => item.title}
				/>
			</Form.Item>
		</Form>
	)
}

export default RoleManage
