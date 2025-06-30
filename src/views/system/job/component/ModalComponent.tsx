import { Button, Col, Form, Input, Modal, Radio, Row, Space, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo: userInfo, handleModalSubmit } = Params;
	// console.log('userInfo', userInfo);
	useEffect(() => {
		if (modalType == 'create') {
			// 创建要给字段初始值、否则服务端获取不到
			form.setFieldsValue({
				job_name: '',
				job_sort: '',
				status: false,
				desc: '',
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
						<Form.Item label='岗位名称' name='job_name' rules={[{ required: true, message: '必填：岗位名称' }]}>
							<Input placeholder='请输入岗位名称' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='岗位排序' name='job_sort' rules={[{ required: true, message: '必填：岗位排序' }]}>
							<Input placeholder='请输入岗位排序' />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='状态' name='status' rules={[{ required: false }]}>
							<Switch />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item label='岗位描述' name='desc' rules={[{ required: false }]}>
							<TextArea rows={3} placeholder='岗位说明' maxLength={60} />
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
