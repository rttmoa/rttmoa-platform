import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';

const ModalComponent = (Props: any) => {
	const {
		form, // form
		menuList, // 菜单

		modalTitle: title, // 标题
		modalType: type, // 类型
		modalIsVisible, // 显示
		modalMenuInfo: data, // 菜单信息

		setModalIsVisible, // 设置显示

		handleModalSubmit, // 提交
	} = Props;

	const [isTop, setIsTop] = useState('是');
	const [value, setValue] = useState<string>('');

	useEffect(() => {
		form.setFieldsValue({
			isTop: type === 'create' ? '是' : data?.parent_id == 0 ? '是' : '否',
			parent_id: type === 'create' ? null : data?.parent_id,
			email: type === 'create' ? null : data?.email,
			leader: type === 'create' ? null : data?.leader,
			name: type === 'create' ? null : data?.name,
			phone: type === 'create' ? null : data?.phone,
			sort: type === 'create' ? null : data?.sort,
			status: type === 'create' ? '启用' : data?.status,
		});
		setIsTop(type === 'create' ? '是' : data?.parent_id == 0 ? '是' : '否');
		setValue(type === 'create' ? '' : data?.parent_id);
	}, [data, type]);

	// & 这里可以提取 公共
	// * 处理菜单结构：  处理成TreeSelect需要的格式
	const handleMenu = (menuConfig: any, type: string) => {
		return menuConfig?.map((item: any) => {
			const option: any = {
				value: item.name || null,
				label: item.name || null,
			};
			if (item.children && item.children.length) {
				option.children = handleMenu(item.children, 'children');
			}
			return option;
		});
	};
	const treeData = handleMenu(menuList, '');

	// 取消
	const OnCancel = () => {
		setModalIsVisible(false);
	};
	// * Modal 提交
	const Submit = () => {
		form.submit();
	};
	// * Form 提交
	const FormOnFinish = () => {
		// console.log('提交');
		const formList = form.getFieldsValue();
		formList.isTop = isTop; // 是否 是顶级上级
		if (isTop == '是') formList.parent_id = 0; // 父 id
		if (isTop == '否') formList.parent_id = value;
		if (type == 'edit') {
			formList._id = data.unique;
		}
		console.log('parent_id', isTop, '+', formList.parent_id);
		handleModalSubmit && handleModalSubmit(type, formList);
	};
	return (
		<Modal
			title={title}
			width={800}
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
			<Form
				className='mt-[40px] mb-[100px] px-[20px] max-h-[500px] overflow-auto'
				form={form}
				onFinish={FormOnFinish}
				layout='horizontal'
				size='middle'
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 16 }}
			>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item label='部门名称' name='name' rules={[{ required: true, message: '必填：部门名称' }]}>
							<Input variant='outlined' placeholder='请输入部门名称' maxLength={30} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='部门排序' name='sort' rules={[{ required: true, message: '必填：部门排序' }]}>
							<InputNumber variant='outlined' placeholder='请输入' maxLength={30} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='负责人' name='leader' rules={[{ required: false, message: '' }]}>
							<Input variant='outlined' placeholder='请输入负责人' maxLength={30} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='联系电话' name='phone' rules={[{ required: false, message: '' }]}>
							<Input variant='outlined' placeholder='请输入联系电话' maxLength={30} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label='邮箱' name='email' rules={[{ required: false, message: '' }]}>
							<Input variant='outlined' placeholder='请输入邮箱' maxLength={30} />
						</Form.Item>
					</Col>

					<Col span={12}>
						<Form.Item label='部门状态' name='status' rules={[{ required: false, message: '' }]}>
							<Radio.Group
								name='radiogroup'
								defaultValue='启用'
								options={[
									{ value: '启用', label: '启用' },
									{ value: '停用', label: '停用' },
								]}
							/>
						</Form.Item>
					</Col>
					<Col span={24} pull={3}>
						<Form.Item label='部门描述' name='desc' rules={[{ required: false, message: '' }]}>
							<Input.TextArea rows={3} placeholder='请输入部门描述' maxLength={6} />
						</Form.Item>
					</Col>
					<Col span={24} pull={3}>
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
					{isTop == '是' && (
						<Col span={24} pull={3}>
							<Form.Item />
						</Col>
					)}
					{isTop == '否' && (
						<Col span={24} pull={3}>
							<Form.Item label='上级部门' name='parent_id' rules={[{ required: true, message: '必须：上级部门' }]}>
								<TreeSelect
									style={{ width: '100%' }}
									value={value}
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
				</Row>
			</Form>
		</Modal>
	);
};
export default ModalComponent;
