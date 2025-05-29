import { Alert, Button, Card, Cascader, Col, Form, Input, InputNumber, Modal, Radio, Row } from 'antd'
import { menu } from './menuConfig'
import { useState } from 'react'
import './index.less'
import { InsNewMenu } from '@/api/modules/upack/common'
import { message } from '@/hooks/useMessage'

const CreateMenuModal = (Props: any) => {
	const { form, createModalOpen, SetCreateModalOpen } = Props

	const [menuType, SetmenuType] = useState('目录')

	// * 处理菜单结构： 递归
	const handleMenu = (menuConfig: any) => {
		return menuConfig?.map((item: any) => {
			const option: any = {
				value: item.path || item.meta?.key,
				label: item.meta?.title,
			}
			if (item.children && item.children.length) {
				option.children = handleMenu(item.children)
			}
			return option
		})
	}
	const commitCreateMenu = async () => {
		// 1、获取字段数据
		// 2、将字段传入到接口中
		// 3、获取返回值并展示
		// 4、清空表单值
		// 5、关闭弹窗
		const formlist = form.getFieldsValue()
		console.log('获取字段：', formlist)
		const result: any = await InsNewMenu(formlist)
		console.log('获取结果：', result)
		message.success(result.data.message)
		form.resetFields()
		SetCreateModalOpen(false)
	}
	return (
		<Modal
			title="新建菜单"
			width="1000px"
			loading={false}
			open={createModalOpen}
			onCancel={() => {
				SetCreateModalOpen(false)
			}}
			footer={[
				<Button
					danger
					loading={false}
					onClick={() => {
						SetCreateModalOpen(false)
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
			<Form layout="horizontal" form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ top: '/', type: '目录', path: '', element: '', redirect: '', key: '', title: '', icon: '', is_link: '', is_hide: '否', is_full: '否', is_affix: '否', sort: 1 }}>
				<Row gutter={16}>
					<Col span={24} pull={3}>
						<Form.Item label="菜单上级" name="top">
							<Cascader
								popupClassName="Customize_Cascader"
								options={handleMenu(menu)}
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
							<Input placeholder="到antd中选择图标、格式： MenuUnfoldOutlined" maxLength={16} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="菜单路由路径" name="path" tooltip={{ title: '路由路径必须填写' }}>
							<Input placeholder="path: /home/index" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="菜单组件路径" name="element" tooltip={{ title: '一级菜单无children时填写' }}>
							<Input placeholder="element: /home/index" />
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
								<Input placeholder="redirect: /author/page" />
							</Form.Item>
						</Col>
					)}

					<Col span={12}>
						<Form.Item label="菜单唯一标识" name="key">
							<Input placeholder="home" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="菜单标题" name="title">
							<Input placeholder="首页" />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label="外链URL" name="is_link">
							<Input placeholder="外链链接地址 eg：www.baidu.com" />
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
							<InputNumber controls min={1} max={999} defaultValue={1} />
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
