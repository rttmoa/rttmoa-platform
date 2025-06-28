import { FindAllMenu } from '@/api/modules/upack/common';
import { Button, Checkbox, Col, Form, Input, InputNumber, Modal, Radio, Row, Space, Switch, Tree } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo: userInfo, handleModalSubmit } = Params;
	// console.log('userInfo', userInfo);

	const [menuList, setMenuList] = useState([]);

	useEffect(() => {
		if (modalType == 'create') {
			// 创建要给字段初始值、否则服务端获取不到
			FindAllMenu({}).then(res => {
				console.log('res', res);
				const menuList: any = res.data;
				function transformRoutes(routes: any[]) {
					return routes.map((route: any) => {
						const item: any = {
							title: route.meta?.title || '',
							key: route.meta?.key || '',
						};

						if (Array.isArray(route.children) && route.children.length > 0) {
							item.children = transformRoutes(route.children);
						}

						return item;
					});
				}
				const menu: any = transformRoutes(menuList || []);
				console.log('menu', menu);
				setMenuList(menu || []);
			});
			form.setFieldsValue({
				job_name: '',
				job_sort: '',
				status: false,
				desc: '',
				// permission_menu: menuList,
			});
		}
		if (modalType == 'edit') {
			form.setFieldsValue({
				job_name: userInfo.postName,
				job_sort: userInfo.postSort,
				status: userInfo.status == '0' ? false : true,
				desc: userInfo.desc,
			});
		}
	}, [modalType, userInfo]);

	const OnCancel = () => {
		setModalIsVisible(false);
	};
	const OnReset = () => {
		form.resetFields();
	};
	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		if (modalType == 'edit') {
			formList._id = userInfo._id;
		}
		handleModalSubmit && handleModalSubmit(modalType, formList);
	};

	return (
		<Modal
			className='relative'
			title={modalTitle}
			width={600}
			// loading={false}
			open={modalIsVisible}
			onCancel={OnCancel}
			footer={false}
		>
			<Form className='mb-[60px] max-h-[500px] overflow-auto' layout='horizontal' form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} onFinish={FormOnFinish}>
				<Row gutter={16}>
					<Col span={24}>
						<Form.Item label='角色名称' name='role_name' rules={[{ required: true, message: '必填：角色名称' }]}>
							<Input placeholder='请输入角色名称' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='权限字符' name='permission_str' rules={[{ required: true, message: '必填：权限字符' }]}>
							<Input placeholder='请输入权限字符' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='角色级别' name='level' rules={[{ required: true, message: '必填：角色级别' }]}>
							<InputNumber defaultValue={1} className='always-show-handler' keyboard={false} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='角色顺序' name='order' rules={[{ required: true, message: '必填：角色顺序' }]}>
							<InputNumber defaultValue={1} className='always-show-handler' keyboard={false} />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='状态' name='status' rules={[{ required: false }]}>
							<Switch />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='菜单权限' name='permission_menu' rules={[{ required: true, message: '必填：菜单权限' }]}>
							<div className='mt-[6px] px-3 w-full flex justify-between'>
								<div>
									<Checkbox onChange={() => {}}>展开/折叠</Checkbox>
								</div>
								<div>
									<Checkbox onChange={() => {}}>全选/全不选</Checkbox>
								</div>
								<div>
									<Checkbox onChange={() => {}}>父子联动</Checkbox>
								</div>
							</div>
							<div className='mt-3 w-full p-3  border-[1px] rounded-lg'>
								<Tree
									checkable
									// defaultExpandedKeys={['0-0-0', '0-0-1']}
									// defaultSelectedKeys={['0-0-1']}
									// defaultCheckedKeys={['0-0-0', '0-0-1']}
									// onSelect={() => {}}
									// onCheck={() => {}}
									showLine
									autoExpandParent={true}
									defaultExpandAll
									defaultExpandParent
									treeData={menuList}
								/>
							</div>
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='角色描述' name='desc' rules={[{ required: false }]}>
							<TextArea rows={3} placeholder='请输入内容' maxLength={60} />
						</Form.Item>
					</Col>
				</Row>
				<Row className='absolute right-[105px] bottom-[0px]'>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Space>
							<Button type='default' htmlType='button' onClick={OnCancel}>
								取消
							</Button>
							<Button type='default' htmlType='button' onClick={OnReset}>
								重置
							</Button>
							<Button type='primary' htmlType='submit'>
								提交
							</Button>
						</Space>
					</Form.Item>
				</Row>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
