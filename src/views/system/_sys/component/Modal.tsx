import { Button, Col, Form, Input, Modal, Radio, Row, Select, Space, Switch } from 'antd';
import { useEffect } from 'react';

const ModalComponent = (Params: any) => {
	const { form, modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalResult } = Params;

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault(); // 阻止默认提交行为
				Submit(); // 调用提交函数
			}
		};
		if (modalIsVisible) {
			window.addEventListener('keydown', handleKeyDown);
		} else {
			window.removeEventListener('keydown', handleKeyDown);
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [modalIsVisible]);

	useEffect(() => {
		form.setFieldsValue({
			postName: modalType == 'create' ? '' : modalUserInfo.postName,
			postSort: modalType == 'create' ? '' : modalUserInfo.postSort,
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
						<Form.Item className='!mb-[8px] !text-[12px]' label={<span className='text-[12px]'>岗位名称</span>} name='postName' rules={[{ required: true, message: '必填：岗位名称' }]}>
							<Input placeholder='请输入岗位名称' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>岗位排序</span>} name='postSort' rules={[{ required: true, message: '必填：岗位排序' }]}>
							<Input placeholder='请输入岗位排序' />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>状态</span>} name='status' rules={[{ required: false }]}>
							{/* <Radio.Group options={['启用', '停用']} /> */}
							<Radio.Group defaultValue='启动' size='middle'>
								<Radio.Button value='启动'>启动</Radio.Button>
								<Radio.Button value='停用'>停用</Radio.Button>
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item className='!mb-[8px]' label={<span className='text-[12px]'>运行状态</span>} name='status' rules={[{ required: false }]}>
							<Select
								defaultValue='lucy'
								style={{ width: 120 }}
								options={[
									{ value: '全部', label: '全部' },
									{ value: '启用', label: '启用' },
									{ value: '运行中', label: '运行中' },
									{ value: '关闭', label: '关闭' },
									{ value: '已上线', label: '已上线' },
								]}
							/>
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
