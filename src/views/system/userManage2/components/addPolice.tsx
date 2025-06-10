import { fetchUserAdd, fetchUserDetailUpdate } from '@/api/modules/system/userManage2';
import { regExpConfig } from '@/config/regular';
import { message } from '@/hooks/useMessage';
import { Button, Drawer, Form, Input, Select } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
const FormItem = Form.Item;
const { Option } = Select;

export default function AddPolice(props: any) {
	const [loading, setloading] = useState(false);

	const { form } = props;

	useEffect(() => {
		return () => {
			form.resetFields();
		};
	});

	const handleSubmit = () => {
		const values = props.form.getFieldsValue();
		setloading(true);
		if (props.type === 'edit') {
			fetchUserDetailUpdate({ ...values, deptCode: props.deptId, id: props.currPeopleId }).then((res: any) => {
				message.success(res.msg);
				props.handleOk();
			});
			setloading(false);
		} else {
			fetchUserAdd({ ...values, deptCode: props.deptId }).then((res: any) => {
				message.success(res.msg);
				props.handleOk();
			});
			setloading(false);
		}
	};

	const formItemLayout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 17 },
	};
	const footer: any = () => {
		return (
			<React.Fragment>
				<Button type='primary' onClick={handleSubmit} loading={loading}>
					确定
				</Button>
				<Button type='primary' onClick={props.onCancel}>
					取消
				</Button>
			</React.Fragment>
		);
	};
	const { visible, type, title, roleList, values, deptId, currPeopleId, onCancel, handleOk } = props;
	console.log('Drawer props：', props);
	return (
		<Drawer open={visible} title={title} onClose={onCancel} footer={footer} className='modal-header modal-body'>
			<div className='modalcontent'>
				<Form
					form={form}
					layout='horizontal'
					onFinish={handleSubmit}
					initialValues={{
						chineseName: type === 'add' ? '' : values.chineseName,
						idcardNo: type === 'add' ? '' : values.idcardNo,
						policeCode: type === 'add' ? '' : values.policeCode,
						username: type === 'add' ? '' : values.username,
						password: type === 'add' ? '' : values.password,
						phoneNo: type === 'add' ? '' : values.phoneNo,
						shortPhoneNo: type === 'add' ? '' : values.shortPhoneNo,
						post: type === 'add' ? '' : values.post,
						roleIds: type === 'add' ? '' : values.roleIds,
					}}
				>
					<FormItem name='chineseName' {...formItemLayout} label='名称' hasFeedback rules={[{ required: true, message: '请输入名称' }]}>
						<Input placeholder='请输入名称' />
					</FormItem>
					<FormItem
						name='idcardNo'
						{...formItemLayout}
						label='身份证'
						hasFeedback
						rules={[
							{ required: true, message: '请输入身份证号' },
							{ pattern: regExpConfig.IDcard, message: '身份证号格式不正确' },
						]}
					>
						<Input placeholder='请输入身份证号' disabled={props.type === 'edit'} />
					</FormItem>
					<FormItem
						name='policeCode'
						{...formItemLayout}
						label='警号'
						hasFeedback
						rules={[
							{ required: true, message: '请输入警号' },
							{ pattern: regExpConfig.policeNo, message: '请输入4-10位数字或字母' },
						]}
					>
						<Input placeholder='请输入警号' />
					</FormItem>
					<FormItem
						name='username'
						{...formItemLayout}
						label='登陆用户名'
						hasFeedback
						rules={[
							{ required: true, message: '请输入4-10位数字或字母' },
							{ pattern: regExpConfig.policeNo, message: '请输入4-10位数字或字母' },
						]}
					>
						<Input placeholder='请输入登陆用户名' disabled={props.type === 'edit'} />
					</FormItem>
					{/* <FormItem name="password" style={{ position: "absolute", zIndex: -10 }}>
            <input type="password" />
          </FormItem> */}
					{props.type === 'edit' ? (
						<FormItem name='password' {...formItemLayout} label='修改密码' rules={[{ pattern: regExpConfig.pwd, message: '请输入6-16位数字或者字母' }]}>
							<Input type='password' placeholder='不改密码此项为空' />
						</FormItem>
					) : (
						<FormItem
							name='password'
							{...formItemLayout}
							label='登陆密码'
							hasFeedback
							rules={[
								{ required: true, message: '密码请输入6-16位数字或者字母' },
								{ pattern: regExpConfig.pwd, message: '密码请输入6-16位数字或者字母' },
							]}
						>
							<Input placeholder='请输入密码' type='password' />
						</FormItem>
					)}
					<FormItem
						name='phoneNo'
						{...formItemLayout}
						label='手机号码'
						hasFeedback
						rules={[
							{ required: true, message: '请输入手机号码' },
							{ pattern: regExpConfig.mobile, message: '手机号码格式不正确' },
						]}
					>
						<Input placeholder='请输入手机号码' />
					</FormItem>
					<FormItem name='shortPhoneNo' {...formItemLayout} label='手机短号' hasFeedback>
						<Input placeholder='请输入手机短号' />
					</FormItem>
					<FormItem name='post' {...formItemLayout} label='职务' hasFeedback>
						<Input placeholder='请输入职务' />
					</FormItem>
					<FormItem name='roleIds' {...formItemLayout} label='角色' hasFeedback rules={[{ required: true, message: '请选择用户的角色' }]}>
						<Select mode='multiple' placeholder='请选择用户的角色' showSearch>
							{roleList.map((item: any) => (
								<Option key={item.role_name} value={`${item.id}`}>
									{item.role_name}
								</Option>
							))}
						</Select>
					</FormItem>
					<Button className='hide' type='primary' htmlType='submit'>
						确定
					</Button>
				</Form>
			</div>
		</Drawer>
	);
}
