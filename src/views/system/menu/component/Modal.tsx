import { Button, Card, Cascader, Col, Form, Input, InputNumber, Modal, Radio, Row, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { menu } from './menuConfig';

const ModalComponent = (Props: any) => {
	const {
		form, // form

		menuList, // 菜单

		modalTitle, // 标题
		modalType: type, // 类型
		modalIsVisible, // 显示
		modalMenuInfo: data, // 菜单信息

		setModalIsVisible, // 设置显示

		handleModalSubmit, // 提交
	} = Props;

	const [isTop, setIsTop] = useState('是');
	const [value, setValue] = useState<string>('');
	const [menuType, SetmenuType] = useState('目录');

	// console.log('data', data);
	useEffect(() => {
		form.setFieldsValue({
			isTop: type === 'create' ? '是' : data?.parent_id == 0 ? '是' : '否',
			parent_id: type === 'create' ? null : data?.parent_id == 0 ? null : data?.parent_id,
			path: type === 'create' ? null : data.path,
			element: type === 'create' ? null : data.element,
			redirect: type === 'create' ? null : data.redirect,
			type: type === 'create' ? '目录' : data.meta?.type,
			key: type === 'create' ? null : data.meta?.key,
			title: type === 'create' ? null : data.meta?.title,
			icon: type === 'create' ? null : data.meta?.icon,
			sort: type === 'create' ? null : data.meta?.sort || 1,
			isLink: type === 'create' ? null : data?.meta?.isLink,
			isHide: type === 'create' ? '否' : data?.meta?.isHide == 1 ? '是' : '否',
			isFull: type === 'create' ? '否' : data?.meta?.isFull == 1 ? '是' : '否',
			isAffix: type === 'create' ? '否' : data?.meta?.isAffix == 1 ? '是' : '否',
		});
		setIsTop(type === 'create' ? '是' : data?.parent_id == 0 ? '是' : '否');
		setValue(type === 'create' ? '' : data?.parent_id == 0 ? null : data?.parent_id);
	}, [type, data]);

	// * 处理菜单结构：递归
	const handleMenu = (menuConfig: any, type: string) => {
		return menuConfig?.map((item: any) => {
			const option: any = {
				value: item.meta?.key,
				label: item.meta?.title,
			};
			if (item.children && item.children.length) {
				option.children = handleMenu(item.children, 'children');
			}
			return option;
		});
	};
	const treeData = handleMenu(menuList, '');

	const OnCancel = () => {
		setModalIsVisible(false);
	};
	const OnSubmit = () => {
		form.submit();
	};
	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		formList.isTop = isTop; // 是否 是顶级上级
		if (isTop == '是') formList.parent_id = 0; // 父 id
		if (isTop == '否') formList.parent_id = value;
		if (type == 'edit') {
			formList._id = data.unique;
		}
		console.log('parent_id', isTop, '+', formList.parent_id);
		// return;
		handleModalSubmit && handleModalSubmit(type, formList);
	};
	return (
		<Modal
			title={modalTitle}
			width={1200}
			loading={false}
			open={modalIsVisible}
			onCancel={OnCancel}
			footer={[
				<Button danger loading={false} onClick={OnCancel}>
					取消
				</Button>,
				<Button key='link' type='primary' loading={false} onClick={OnSubmit}>
					提交
				</Button>,
			]}
		>
			<Form
				className='mt-[40px] mb-[100px] px-[20px] max-h-[500px] overflow-auto'
				layout='horizontal'
				size='middle'
				form={form}
				onFinish={FormOnFinish}
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label='是否顶级部门' name='isTop' rules={[{ required: true, message: '' }]}>
							<Radio.Group
								options={['是', '否']}
								defaultValue='是'
								onChange={(item: any) => {
									setIsTop(item.target.value);
								}}
								value={isTop}
							/>
						</Form.Item>
					</Col>
					{isTop == '否' && (
						<Col span={12} pull={3}>
							<Form.Item label='上级部门' name='parent_id' rules={[{ required: true, message: '必须：上级部门' }]}>
								<TreeSelect
									style={{ width: '100%' }}
									value={value}
									variant='filled'
									placeholder='请选择上级部门'
									allowClear
									onChange={newValue => {
										setValue(newValue);
									}}
									treeData={treeData}
									dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
									className='custom-tree-dropdown'
								/>
							</Form.Item>
						</Col>
					)}
					<Col span={24} pull={3}>
						<Form.Item label='菜单类型' name='type' rules={[{ required: true, message: '创建菜单需 type' }]}>
							<Radio.Group
								options={['目录', '菜单', '按钮']}
								defaultValue='目录'
								onChange={(item: any) => {
									SetmenuType(item.target.value);
								}}
								value={menuType}
							/>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label='菜单图标'
							name='icon'
							tooltip={
								<a href='https://ant.design/components/icon-cn' target='_blank'>
									ant-icon 🚀
								</a>
							}
							rules={[{ required: true, message: '创建菜单需 图标' }]}
						>
							<Input placeholder='到antd中选择图标、格式： MenuUnfoldOutlined' maxLength={30} />
						</Form.Item>
					</Col>
					<Col>
						<Form.Item />
					</Col>
					<Col span={12}>
						<Form.Item label='菜单路由路径' name='path' tooltip={{ title: '路由路径必须填写' }} rules={[{ required: true, message: '地址栏中的路由路径 path' }]}>
							<Input placeholder='path: /home/index' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='菜单组件路径' name='element' tooltip={{ title: '代码写到哪个文件夹的路径' }}>
							<Input placeholder='element: /home/index' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item />
					</Col>
					{menuType == '目录' ? (
						<Col span={12}>
							<Form.Item label='重定向路径' name='redirect' tooltip={{ title: '目录中的菜单有重定向功能' }}>
								<Input placeholder='redirect: /author/page' />
							</Form.Item>
						</Col>
					) : (
						<Col span={12}>
							<Form.Item />
						</Col>
					)}
					<Col span={12}>
						<Form.Item label='菜单唯一标识' name='key' rules={[{ required: true, message: '创建菜单需 key' }]}>
							<Input placeholder='home' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='菜单标题' name='title' rules={[{ required: true, message: '创建菜单需 title' }]}>
							<Input placeholder='首页' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='外链URL' name='isLink'>
							<Input placeholder='外链链接地址 eg：www.baidu.com' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='是否隐藏菜单项' name='isHide' rules={[{ required: true, message: '创建菜单需 isHide' }]}>
							<Radio.Group options={['是', '否']} defaultValue='否' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='是否全屏显示' name='isFull' rules={[{ required: true, message: '创建菜单需 isFull' }]}>
							<Radio.Group options={['是', '否']} defaultValue='否' />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label='是否固定标签页' name='isAffix' rules={[{ required: true, message: '创建菜单需 isAffix' }]}>
							<Radio.Group options={['是', '否']} defaultValue='否' />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label='显示排序' name='sort' tooltip={{ title: '最小值：1、最大值：999、数值小排在前面' }}>
							<InputNumber controls min={1} max={999} defaultValue={1} />
						</Form.Item>
					</Col>
				</Row>
				<Card title={<span className='text-[14px]'>菜单结构 JSON 数据、参考如何创建菜单</span>} bodyStyle={{ height: 400, overflow: 'auto' }}>
					<pre style={{ backgroundColor: '#f5f5f5', padding: '12px', borderRadius: '6px', overflow: 'auto', fontSize: 13 }}>
						<code>{JSON.stringify(menu, null, 2)}</code>
					</pre>
				</Card>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
