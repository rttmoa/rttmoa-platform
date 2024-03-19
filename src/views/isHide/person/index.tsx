import { Avatar, Button, Card, Form, Input, Radio, Select, Space, Tabs } from "antd";
import React, { ReactNode } from "react";
import avatar from "@/assets/images/atatorss.jpg";
import type { TabsProps } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function Index() {
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "基本资料",
			children: Basic()
		},
		{
			key: "2",
			label: "修改密码",
			children: UpdatePassword()
		},
		{
			key: "3",
			label: "社交信息",
			children: SocialInformation()
		}
	];
	const onChange = (key: string) => {
		console.log(key);
	};
	return (
		<div className="flex">
			<Card className="w-1/3 mr-7">
				<h2 className="py-2 mb-6 flex justify-center border-b">个人信息</h2>
				<div className="mb-8 flex justify-center">
					<Avatar size={84} src={avatar} />
				</div>

				<div className="mb-3 py-2 flex justify-between border-b">
					<span>用户名称</span>
					<span>admin</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>手机号码</span>
					<span>188888888888</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>用户邮箱</span>
					<span>rttmoa@gmail.com</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>所属部门</span>
					<span>开发部</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>所属岗位</span>
					<span>员工</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>所属角色</span>
					<span>超级管理员,普通角色</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>创建日期</span>
					<span>2023-11-1</span>
				</div>
			</Card>
			<Card className="w-2/3">
				<h2 className="py-2 mb-6 flex justify-center border-b text-base">基本信息</h2>
				<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
			</Card>
		</div>
	);
}
const Basic = () => {
	const [form] = Form.useForm();
	const onReset = () => {
		form.resetFields();
	};
	const onFinish = (values: any) => {
		console.log(values);
	};
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 }
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 }
	};
	return (
		<>
			<Form
				style={{ maxWidth: 600 }}
				{...layout}
				form={form}
				onFinish={onFinish}
				initialValues={{ nickName: "rttmoa", phone: "18888888888", email: "rttmoa@gmail.com", sex: 2 }}>
				<Form.Item name="nickName" label="用户昵称" required={true}>
					<Input />
				</Form.Item>
				<Form.Item name="phone" label="手机号码" required={true}>
					<Input />
				</Form.Item>
				<Form.Item name="email" label="用户邮箱" required={true}>
					<Input />
				</Form.Item>
				<Form.Item name="sex" label="性别" required={true}>
					<Radio.Group name="radiogroup" defaultValue={1}>
						<Radio value={1}>男</Radio>
						<Radio value={2}>女</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space>
						<Button type="primary" htmlType="submit">
							保存
						</Button>
						<Button htmlType="button" onClick={onReset}>
							重置
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};
const UpdatePassword = () => {
	const [form] = Form.useForm();
	const onReset = () => {
		form.resetFields();
	};
	const onFinish = (values: any) => {
		console.log(values);
	};
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 }
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 }
	};
	return (
		<>
			<Form
				style={{ maxWidth: 400 }}
				{...layout}
				form={form}
				onFinish={onFinish}
				initialValues={{ nickName: "rttmoa", phone: "18888888888", email: "rttmoa@gmail.com", sex: 2 }}>
				<Form.Item name="pass" label="旧密码" required={true}>
					<Input.Password placeholder="请输入旧密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
				</Form.Item>
				<Form.Item name="newPass" label="新密码" required={true}>
					<Input.Password placeholder="请输入新密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
				</Form.Item>
				<Form.Item name="repeatPass" label="重复密码" required={true}>
					<Input.Password placeholder="确认新密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space>
						<Button type="primary" htmlType="submit">
							保存
						</Button>
						<Button htmlType="button" onClick={onReset}>
							重置
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};
const SocialInformation = () => {
	return (
		<>
			<div className="w-2/3 mx-auto">
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>微信号</span>
					<span>
						已绑定<a className="text-cyan-500">（解绑）</a>
					</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>QQ号</span>
					<span>
						未绑定<a className="text-cyan-500">（绑定）</a>
					</span>
				</div>
				<div className="mb-3 py-2 flex justify-between border-b">
					<span>微博号</span>
					<span>
						未绑定<a className="text-cyan-500">（绑定）</a>
					</span>
				</div>
			</div>
		</>
	);
};
