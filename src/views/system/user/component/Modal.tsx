import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Radio, Row, Select, Space } from 'antd';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo: userInfo, handleModalSubmit, roleOption } = Params;

	console.log('userInfo', userInfo);

	useEffect(() => {
		if (modalType == 'create') {
			form.resetFields();
		}
		if (modalType == 'edit') {
			form.setFieldsValue({
				username: userInfo.username,
				age: userInfo.age,
				email: userInfo.email,
				sex: userInfo.sex,
				status: userInfo.status,
				phone: userInfo.phone,
				city: userInfo.city,
				role: userInfo.role,
				user_auth: userInfo.user_auth, // 用户权限字符
				password: userInfo.password,
			});
		}
	}, [modalType, userInfo]);

	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		if (modalType == 'edit') {
			formList._id = userInfo._id;
		}
		handleModalSubmit && handleModalSubmit(modalType, formList);
	};
	const OnCancel = () => setModalIsVisible(false);
	const OnSubmit = () => form.submit();
	return (
		<Modal
			title={modalTitle}
			width={800}
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
			<Form className='mt-[40px] mb-[100px] px-[20px] max-h-[500px] overflow-auto' layout='vertical' form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 18 }} onFinish={FormOnFinish}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label='用户名称' name='username' rules={[{ required: true, message: '请输入用户名称' }]}>
							<Input placeholder='请输入用户名称' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='用户权限字符' name='user_auth' rules={[{ required: true, message: '请输入用户权限字符' }]}>
							<Input placeholder='请输入用户权限字符' />
						</Form.Item>
					</Col>
					{/* <Col span={12}>
						<Form.Item label='性别' name='sex' rules={[{ required: false, message: '请输入年龄' }]}>
							<Radio.Group defaultValue={1}>
								<Radio.Button value={1}>男</Radio.Button>
								<Radio.Button value={0}>女</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col> */}
					{/* <Col span={12}>
						<Form.Item label='年龄' name='age' rules={[{ required: false, message: '请输入姓名' }]}>
							<Input placeholder='请输入年龄' />
						</Form.Item>
					</Col> */}
					{/* <Col span={12}>
						<Form.Item label='状态' name='status' rules={[{ required: false, message: '请输入年龄' }]}>
							<Input placeholder='请选择状态' />
						</Form.Item>
					</Col> */}
					{/* <Col span={12}>
						<Form.Item label='邮箱' name='email' rules={[{ required: false, message: '请输入姓名' }]}>
							<Input placeholder='请输入邮箱' />
						</Form.Item>
					</Col> */}
					<Col span={12}>
						<Form.Item label='手机号' name='phone' rules={[{ required: false, message: '请输入年龄' }]}>
							<Input placeholder='请输入手机号' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='密码' name='password' rules={[{ required: false, message: '请输入密码' }]}>
							<Input.Password placeholder='请输入密码' iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
						</Form.Item>
					</Col>
					{/* <Col span={12}>
						<Form.Item label='时间' name='time' rules={[{ required: false, message: '请输入年龄' }]}>
							<Input placeholder='请选择时间' />
						</Form.Item>
					</Col> */}
					<Col span={12}>
						<Form.Item label='角色' name='role' rules={[{ required: true, message: '请选择角色' }]}>
							<Select mode='multiple' allowClear style={{ width: '100%' }} placeholder='请选择角色' options={roleOption} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
