import { Button, Col, Form, Input, Modal, Radio, Row, Space } from 'antd';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo: userInfo, handleModalSubmit } = Params;

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
		// 处理一下表单数据
		// console.log('formList', formList);
		handleModalSubmit && handleModalSubmit(modalType, formList);
	};

	return (
		<Modal
			className='relative '
			title={modalTitle}
			width={1000}
			// loading={false}
			open={modalIsVisible}
			onCancel={OnCancel}
			footer={false}
			// footer={[
			// 	<Button loading={loading} onClick={() => {}}>取消</Button>,
			// 	<Button key='back' onClick={() => {}}>
			// 		重置表单
			// 	</Button>,
			// 	<Button key='link' type='primary' loading={loading} onClick={() => {}}>提交</Button>,
			// ]}
		>
			<Form className='mb-[120px] max-h-[500px] overflow-auto' layout='horizontal' form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} onFinish={FormOnFinish}>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label='姓名' name='username' rules={[{ required: true, message: '请输入姓名' }]}>
							<Input placeholder='请输入姓名' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='性别' name='sex' rules={[{ required: false, message: '请输入年龄' }]}>
							{/* <Input placeholder='请输入性别' /> */}
							<Radio.Group defaultValue={1}>
								<Radio.Button value={1}>男</Radio.Button>
								<Radio.Button value={0}>女</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='年龄' name='age' rules={[{ required: false, message: '请输入姓名' }]}>
							<Input placeholder='请输入年龄' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='状态' name='status' rules={[{ required: false, message: '请输入年龄' }]}>
							<Input placeholder='请选择状态' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='邮箱' name='email' rules={[{ required: false, message: '请输入姓名' }]}>
							<Input placeholder='请输入邮箱' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='手机号' name='phone' rules={[{ required: false, message: '请输入年龄' }]}>
							<Input placeholder='请输入手机号' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='地址' name='city' rules={[{ required: false, message: '请输入年龄' }]}>
							<Input placeholder='请输入地址' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='时间' name='time' rules={[{ required: false, message: '请输入年龄' }]}>
							<Input placeholder='请选择时间' />
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
