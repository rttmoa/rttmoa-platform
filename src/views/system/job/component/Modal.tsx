import { Button, Col, Form, Input, Modal, Radio, Row, Space, Switch } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, handleModalSubmit } = Params;

	useEffect(() => {
		form.setFieldsValue({
			job_name: modalType == 'create' ? '' : modalUserInfo.postName,
			job_sort: modalType == 'create' ? '' : modalUserInfo.postSort,
			status: modalType == 'create' ? false : modalUserInfo.status == '0' ? false : true,
			desc: modalType == 'create' ? '' : modalUserInfo.desc,
		});
	}, [modalType, modalUserInfo]);

	const OnCancel = () => {
		setModalIsVisible(false);
	};
	const OnReset = () => {
		form.resetFields();
	};
	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		if (modalType == 'edit') {
			formList._id = modalUserInfo._id;
		}
		handleModalSubmit && handleModalSubmit(modalType, formList);
	};
	const Submit = () => {
		form.submit();
	};
	return (
		<Modal
			className='relative'
			title={modalTitle}
			width={600}
			// loading={false}
			open={modalIsVisible}
			onCancel={OnCancel}
			footer={[
				<Button loading={false} onClick={OnCancel}>
					取消
				</Button>,
				// & 修改此处、提交使用 form.submit()
				<Button key='link' type='primary' loading={false} onClick={Submit}>
					提交
				</Button>,
			]}
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
			</Form>
		</Modal>
	);
};
export default ModalComponent;
