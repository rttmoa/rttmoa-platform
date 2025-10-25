import { Button, Col, Form, Input, Modal, Radio, Row, Space, Switch } from 'antd';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalResult } = Params;

	useEffect(() => {
		form.setFieldsValue({
			job_name: modalType == 'create' ? '' : modalUserInfo.postName,
			job_sort: modalType == 'create' ? '' : modalUserInfo.postSort,
			status: modalType == 'create' ? '启用' : modalUserInfo.status,
			desc: modalType == 'create' ? '' : modalUserInfo.desc,
		});
	}, [modalType, modalUserInfo]);

	const FormOnFinish = () => {
		const formList = form.getFieldsValue();
		if (modalType == 'edit') {
			formList._id = modalUserInfo._id;
		}
		modalResult && modalResult(modalType, formList);
	};
	const OnCancel = () => setModalIsVisible(false);
	const Submit = () => form.submit();
	return (
		<Modal
			width={950}
			title={modalTitle}
			open={modalIsVisible}
			onCancel={OnCancel}
			footer={[
				<Button loading={false} onClick={OnCancel}>
					取消
				</Button>,
				<Button key='link' type='primary' loading={false} onClick={Submit}>
					提交
				</Button>,
			]}
		>
			<Form className='mt-[20px] mb-[60px] px-[20px] max-h-[650px] overflow-auto' layout='vertical' form={form} onFinish={FormOnFinish}>
				<Row gutter={[16, 0]}>
					<Col span={12}>
						<Form.Item className='!mb-[8px] !text-[12px]' label={<span className='text-[12px]'>岗位名称</span>} name='job_name' rules={[{ required: true, message: '必填：岗位名称' }]}>
							<Input placeholder='请输入岗位名称' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位排序</span>} name='job_sort' rules={[{ required: true, message: '必填：岗位排序' }]}>
							<Input placeholder='请输入岗位排序' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>状态</span>} name='status' rules={[{ required: false }]}>
							<Radio.Group options={['启用', '停用']} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位描述</span>} name='desc' rules={[{ required: false }]}>
							<Input placeholder='岗位说明' />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
