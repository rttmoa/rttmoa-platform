import { Card, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import { useEffect } from 'react';

const UserFormModal: any = ({ userInfo, type, form, roles }: any) => {
	useEffect(() => {
		return () => {
			form.resetFields(); // 组件卸载将清空Form值
		};
	});
	const OnFinish = async (data: any) => {
		console.log('表单参数：', data);
	};
	let rowCounts = 24 / 2;
	const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
	return (
		<Card size='small'>
			<Form
				{...formItemLayout}
				name={'UserFormModal'}
				size='middle'
				layout='horizontal'
				// variant="filled"
				form={form}
				disabled={type == 'detail'}
				initialValues={{
					id: type === 'create' ? null : userInfo.id,
					user_name: type === 'create' ? null : userInfo.username,
					sex: type === 'create' ? null : userInfo.sex,
					state: type === 'create' ? null : userInfo['state'],
					// birthday: type === "create" ? null : userInfo.birthday,
					address: type === 'create' ? null : userInfo.address,
					roleiD: type === 'create' ? null : userInfo.role_id,
				}}
				onFinish={OnFinish}
			>
				<Row gutter={24}>
					{type !== 'create' && (
						<Col span={rowCounts}>
							<Form.Item name='id' label='id' hidden={type === 'create'}>
								<Input type='text' disabled />
							</Form.Item>
						</Col>
					)}
					<Col span={rowCounts}>
						<Form.Item name='user_name' label='姓名'>
							<Input type='text' placeholder='请输入姓名' />
						</Form.Item>
					</Col>
					<Col span={rowCounts}>
						<Form.Item name='sex' label='性别'>
							<Radio.Group>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
							</Radio.Group>
						</Form.Item>
					</Col>
					<Col span={rowCounts}>
						<Form.Item name='state' label='状态'>
							<Select>
								<Select.Option value={1}>痛苦</Select.Option>
								<Select.Option value={2}>委屈</Select.Option>
								<Select.Option value={3}>迷茫</Select.Option>
								<Select.Option value={4}>平淡</Select.Option>
								<Select.Option value={5}>开心</Select.Option>
							</Select>
						</Form.Item>
					</Col>
					<Col span={rowCounts}>
						<Form.Item name='roleiD' label='角色'>
							<Select>
								{roles.map((role: any) => {
									return (
										<Select.Option key={role.id} value={role.id}>
											{role.role_name}
										</Select.Option>
									);
								})}
							</Select>
						</Form.Item>
					</Col>
					<Col span={rowCounts}>
						<Form.Item name='birthday' label='生日'>
							<DatePicker />
						</Form.Item>
					</Col>
					<Col span={rowCounts}>
						<Form.Item name='address' label='联系地址'>
							<Input.TextArea rows={1} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Card>
	);
};
export default UserFormModal;
