/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Card, Typography, Button, Space, Select, Divider, Menu, Form, Radio, Input, Row, Col } from 'antd';
import './index.less';
import { UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import CollectionCreateForm from './Modal';
const { Text, Title } = Typography;
type LayoutType = Parameters<typeof Form>[0]['layout'];

const userForm: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const [form] = Form.useForm();
	const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

	const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
		// 监听 name=layout 的事件改变
		setFormLayout(layout);
	};

	const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

	const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

	let colProps = {
		xs: 24,
		md: 11,
		xxl: 7,
	};
	const onEdit = () => {
		setVisible(true);
	};
	// 弹出框内提交的表单数据回调
	const onCreate = (values: any) => {
		console.log('Received values of form: ', values);
		setVisible(false);
	};
	console.log(visible);

	return (
		<div className='userForm'>
			<Card className='card-top mb-[15px]'>
				<div className='div-top'>
					<div className='userInfo'>
						<div className='avatar'>
							<UserOutlined />
						</div>
						<div className='auth'>
							<span className='person'>人员</span>
							<span className='admin'>管理员</span>
						</div>
					</div>
					<div className='userUpdate'>
						<Space>
							<Button onClick={onEdit}>编辑</Button>
							<Button>修改密码</Button>
						</Space>
					</div>
				</div>
				<div className='div-bottom'>
					<UserSwitchOutlined />
					<a href='#'>岗位成员(0)</a>
				</div>
			</Card>
			<Card className='mb-[15px]'>
				<Form
					{...formItemLayout}
					layout={formLayout}
					form={form}
					initialValues={{ layout: formLayout }}
					onValuesChange={onFormLayoutChange}
					// style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
				>
					{/* <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
					<Card className='mb-[15px]'>
						<Row>
							<Col {...colProps}>
								<Form.Item label='姓名'>
									<Input placeholder='input placeholder' disabled />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='工号'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='用户名'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='邮件'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='手机'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='部分（多选）'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='职务'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='上级主管'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='简档'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='工作电话'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='语言'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='排序号'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='接收邮件通知'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='接收短信提醒'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='有效'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='密码已过期'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item label='头像'>
									<Input placeholder='input placeholder' />
								</Form.Item>
							</Col>
							<Col {...colProps}>
								<Form.Item {...buttonItemLayout}>
									<Button type='primary'>Submit</Button>
								</Form.Item>
							</Col>
						</Row>
					</Card>
				</Form>
			</Card>
			<CollectionCreateForm open={visible} onCreate={onCreate} onCancel={() => setVisible(false)} />
		</div>
	);
};

export default userForm;
