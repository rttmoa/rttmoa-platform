import { Alert, Button, Card, Cascader, Col, Form, Input, InputNumber, Modal, Radio, Row } from 'antd'
import { menu } from './menuConfig'
import { useEffect, useState } from 'react'
import './index.less'
import { message } from '@/hooks/useMessage'

const CreateMenuModal = (Props: any) => {
	const { form, menuList, modalTitle, setModalTitle, modalType, setModalType, modalIsVisible, setModalIsVisible, modalMenuInfo, setModalMenuInfo } = Props

	const [menuType, SetmenuType] = useState('目录')

	let type = modalType
	const initMenuList = [{ meta: { key: '/', title: '最顶级菜单' } }, ...menuList]

	// * 处理菜单结构：递归
	const handleMenu = (menuConfig: any, type: string) => {
		return menuConfig?.map((item: any) => {
			const option: any = {
				value: item.path || item.meta?.key,
				label: item.meta?.title,
			}
			// console.log('item', type, item)
			if (item.children && item.children.length) {
				option.children = handleMenu(item.children, 'children')
				// handleMenu(item.children, 'children')
			}
			return option
		})
	}
	// ! 这里提交要注意是 新增还是修改
	const commitCreateMenu = async () => {
		// 1、获取字段数据
		// 2、将字段传入到接口中
		// 3、获取返回值并展示
		// 4、清空表单值
		// 5、关闭弹窗
		const formlist = form.getFieldsValue()
		console.log('获取字段：', formlist)
		if (modalType == 'create') {
			message.info('新增')
			// const result: any = await InsNewMenu(formlist)
			// console.log('获取结果：', result)
			// message.success(result.data.message)
		} else {
			console.log('edit')
			message.info('编辑')
		}
		form.resetFields()
		setModalTitle('新建菜单')
		setModalIsVisible(false)
		setModalMenuInfo({})
	}
	function findAncestors(tree: any[], targetPath: string, pathStack: any[] = []): any[] | null {
		for (const node of tree) {
			const newPathStack = [...pathStack, node]
			if (node.path === targetPath) {
				return newPathStack // 找到了，返回路径堆栈
			}
			if (node.children) {
				const result = findAncestors(node.children, targetPath, newPathStack)
				if (result) return result
			}
		}
		return null
	}
	const result = findAncestors(initMenuList, modalMenuInfo.path)
	let initTop = result?.map(value => value.path) || []

	useEffect(() => {
		if (type === 'edit' && modalMenuInfo) {
			form.setFieldsValue({
				// ['/dataScreen/index']
				// ['/assembly', '/assembly/recharts']
				// ['/menu', '/menu/menu2', '/menu/menu2/menu23']
				top: initTop || [],
				path: modalMenuInfo.path,
				element: modalMenuInfo.element,
				redirect: modalMenuInfo.redirect,
				isLink: modalMenuInfo?.meta?.isLink,
				isHide: modalMenuInfo?.meta?.isHide == 1 ? '是' : '否',
				isFull: modalMenuInfo?.meta?.isFull == 1 ? '是' : '否',
				isAffix: modalMenuInfo?.meta?.isAffix == 1 ? '是' : '否',
				type: modalMenuInfo.meta?.type,
				key: modalMenuInfo.meta?.key,
				title: modalMenuInfo.meta?.title,
				icon: modalMenuInfo.meta?.icon,
				sort: modalMenuInfo.meta?.sort,
			})
		} else {
			form.resetFields()
		}
	}, [modalMenuInfo, type])

	return (
		<Modal
			title={modalTitle}
			width="1000px"
			loading={false}
			open={modalIsVisible}
			// open={true}
			onCancel={() => {
				setModalIsVisible(false)
			}}
			footer={[
				<Button
					danger
					loading={false}
					onClick={() => {
						setModalIsVisible(false)
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
					loading={false}
					onClick={() => {
						// handleUserAdd()
						// console.log(form.getFieldsValue())
						commitCreateMenu()
					}}>
					提交
				</Button>,
			]}>
			<Form
				layout="horizontal"
				form={form}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
				// initialValues={{
				// 	top: type == 'create' ? '/' : modalMenuInfo.top,
				// 	type: type == 'create' ? '目录' : modalMenuInfo?.meta?.type,
				// 	path: type == 'create' ? '' : modalMenuInfo.path,
				// 	element: type == 'create' ? '' : modalMenuInfo.element,
				// 	redirect: type == 'create' ? '' : modalMenuInfo.redirect,
				// 	key: type == 'create' ? '' : modalMenuInfo?.meta?.key,
				// 	title: type == 'create' ? '' : modalMenuInfo?.meta?.title,
				// 	icon: type == 'create' ? '' : modalMenuInfo?.meta?.icon,
				// 	is_link: type == 'create' ? '' : modalMenuInfo?.meta?.isLink,
				// 	is_hide: type == 'create' ? '否' : modalMenuInfo?.meta?.isHide == '是' ? 1 : 0,
				// 	is_full: type == 'create' ? '否' : modalMenuInfo?.meta?.isFull == '是' ? 1 : 0,
				// 	is_affix: type == 'create' ? '否' : modalMenuInfo?.meta?.isAffix == '是' ? 1 : 0,
				// 	sort: type == 'create' ? 1 : modalMenuInfo?.meta?.sort,
				// }}
			>
				<Row gutter={16}>
					<Col span={24} pull={3}>
						<Form.Item label="菜单上级" name="top">
							<Cascader
								popupClassName="Customize_Cascader"
								options={handleMenu(initMenuList, '一级')}
								allowClear
								showSearch
								changeOnSelect
								expandTrigger="click"
								variant="filled"
								// displayRender={displayRender}
								placeholder="请选择上级菜单！"
								// onChange={onChangeCascader}
							/>
						</Form.Item>
					</Col>
					<Col span={24} pull={3}>
						<Form.Item label="菜单类型" name="type">
							<Radio.Group
								options={['目录', '菜单', '按钮']}
								defaultValue="目录"
								onChange={(item: any) => {
									// form.resetFields()
									SetmenuType(item.target.value)
								}}
								value={menuType}
							/>
						</Form.Item>
					</Col>
					<Col span={24} pull={3}>
						<Form.Item
							label="菜单图标"
							name="icon"
							tooltip={
								<a href="https://ant.design/components/icon-cn" target="_blank">
									ant-icon 🚀
								</a>
							}>
							{/* <Tooltip
								overlayStyle={{ maxWidth: 500 }}
								// classNames="ss"
								trigger={['focus']}
								title={
									<div className="w-[400px] h-[300px]">
										{ICONS.map(value => {
											let obj = { name: 'StepBackwardOutlined', className: 'w-[18px] h-[18px]' }
											return <Icon {...obj} />
										})}
									</div>
								}
								placement="bottomLeft"
								className="w-[400px]">
								<Input onChange={() => {}} placeholder="Input a number" maxLength={16} />
							</Tooltip> */}
							<Input variant="filled" placeholder="到antd中选择图标、格式： MenuUnfoldOutlined" maxLength={30} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="菜单路由路径" name="path" tooltip={{ title: '路由路径必须填写' }}>
							<Input variant="filled" placeholder="path: /home/index" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="菜单组件路径" name="element" tooltip={{ title: '一级菜单无children时填写' }}>
							<Input variant="filled" placeholder="element: /home/index" />
						</Form.Item>
					</Col>
					{/* {menuType == '目录' && (
						<Col span={12}>
							<Form.Item label="重定向路由路径" name="redirect_path" tooltip={{ title: '一级菜单有children时填写' }}>
								<Input placeholder="path: /auth" />
							</Form.Item>
						</Col>
					)} */}
					{menuType == '目录' && <Col span={12}></Col>}
					{menuType == '目录' && (
						<Col span={12}>
							<Form.Item label="重定向路径" name="redirect" tooltip={{ title: '一级菜单有children填写' }}>
								<Input variant="filled" placeholder="redirect: /author/page" />
							</Form.Item>
						</Col>
					)}
					<Col span={12}>
						<Form.Item label="菜单唯一标识" name="key">
							<Input variant="filled" placeholder="home" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="菜单标题" name="title">
							<Input variant="filled" placeholder="首页" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="外链URL" name="is_link">
							<Input variant="filled" placeholder="外链链接地址 eg：www.baidu.com" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="是否隐藏菜单项" name="is_hide">
							<Radio.Group options={['是', '否']} defaultValue="否" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="是否全屏显示" name="is_full">
							<Radio.Group options={['是', '否']} defaultValue="否" />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label="是否固定标签页" name="is_affix">
							<Radio.Group options={['是', '否']} defaultValue="否" />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label="显示排序" name="sort" tooltip={{ title: '最小值：1、最大值：999、数值小排在前面' }}>
							<InputNumber variant="filled" controls min={1} max={999} defaultValue={1} />
						</Form.Item>
					</Col>
				</Row>
				<Card title="菜单结构 JSON 数据、参考如何创建菜单" bodyStyle={{ height: 400, overflow: 'auto' }}>
					<pre style={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '6px', overflow: 'auto', fontSize: 13 }}>
						<code>{JSON.stringify(menu, null, 2)}</code>
					</pre>
				</Card>
			</Form>
		</Modal>
	)
}
export default CreateMenuModal
