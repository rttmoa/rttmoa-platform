import { Avatar, Button, Card, Form, Input, Radio, Select, Space, Tabs } from 'antd';
import React, { ReactNode } from 'react';
import avatar from '@/assets/images/avatar.png';
import type { TabsProps } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import UserInfo from './components/userInfo';
import OperationLog from './components/OperationLog';
import { useLocation } from 'react-router-dom';
import Notice from './components/Notice';

// svg: https://heroicons.com/outline
export default function Index() {
	const items: TabsProps['items'] = [
		{
			key: '1',
			label: '基本资料',
			children: Basic(),
		},
		{
			key: '2',
			label: '修改密码',
			children: UpdatePassword(),
		},
		{
			key: '3',
			label: '社交信息',
			children: SocialInformation(),
		},
		{
			key: '4',
			label: '操作日志',
			children: OperationLog(),
		},
		{
			key: '5',
			label: '通知设置',
			children: Notice(),
		},
	];
	const onChange = (key: string) => {
		console.log(key);
	};
	return (
		<div className='flex'>
			<div className='bg-white px-[40px] py-[15px] w-1/3 mr-7 rounded-lg'>
				<h2 className='py-2 mb-6 flex justify-center border-b  text-base'>个人信息</h2>
				<div className='mb-8 flex justify-center'>
					<Avatar size={84} src={avatar} />
				</div>
				<UserInfo />
			</div>
			<div className='w-2/3 bg-white px-[40px] py-[15px] rounded-lg'>
				<h2 className='py-2 mb-6 flex justify-center border-b text-base'>基本信息</h2>
				<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
			</div>
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
		wrapperCol: { span: 16 },
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};
	return (
		<>
			<Form
				style={{ maxWidth: 600 }}
				{...layout}
				form={form}
				onFinish={onFinish}
				initialValues={{ nickName: 'rttmoa', phone: '18888888888', email: 'rttmoa@gmail.com', sex: 2 }}
			>
				<Form.Item name='nickName' label='用户昵称' required={true}>
					<Input />
				</Form.Item>
				<Form.Item name='phone' label='手机号码' required={true}>
					<Input />
				</Form.Item>
				<Form.Item name='email' label='用户邮箱' required={true}>
					<Input />
				</Form.Item>
				<Form.Item name='sex' label='性别' required={true}>
					<Radio.Group name='radiogroup' defaultValue={1}>
						<Radio value={1}>男</Radio>
						<Radio value={2}>女</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space>
						<Button type='primary' htmlType='submit'>
							保存
						</Button>
						<Button htmlType='button' onClick={onReset}>
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
		wrapperCol: { span: 16 },
	};
	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};
	return (
		<>
			<Form
				style={{ maxWidth: 600 }}
				{...layout}
				form={form}
				onFinish={onFinish}
				initialValues={{ nickName: 'rttmoa', phone: '18888888888', email: 'rttmoa@gmail.com', sex: 2 }}
			>
				<Form.Item name='pass' label='旧密码' required={true}>
					<Input.Password placeholder='请输入旧密码' iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
				</Form.Item>
				<Form.Item name='newPass' label='新密码' required={true}>
					<Input.Password placeholder='请输入新密码' iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
				</Form.Item>
				<Form.Item name='repeatPass' label='重复密码' required={true}>
					<Input.Password placeholder='确认新密码' iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Space>
						<Button type='primary' htmlType='submit'>
							保存
						</Button>
						<Button htmlType='button' onClick={onReset}>
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
			<div className=' mx-auto'>
				<h2 className='text-lg'>账号绑定</h2>
				<div className='mb-3 px-4 py-2 flex justify-between border-b'>
					<div className='flex'>
						<span className='mr-2'>
							<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z'
								/>
							</svg>
						</span>
						<span>微信号</span>
					</div>
					<span>
						已绑定<a className='text-cyan-500'>（解绑）</a>
					</span>
				</div>
				<div className='mb-3 px-4 py-2 flex justify-between border-b'>
					<div className='flex'>
						<span className='mr-2'>
							<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1876' width='24' height='24'>
								<path
									d='M227.28704 137.87136a104.40704 104.40704 0 1 0 0 208.77312 104.40704 104.40704 0 0 0 0-208.77312zM179.8144 242.2784a47.47264 47.47264 0 1 1 94.90432 0 47.47264 47.47264 0 0 1-94.90432 0zM122.88 394.11712c0-15.72864 12.73856-28.4672 28.4672-28.4672h151.83872c15.72864 0 28.50816 12.73856 28.50816 28.4672v493.52704a28.4672 28.4672 0 0 1-28.50816 28.4672H151.3472A28.4672 28.4672 0 0 1 122.88 887.6032V394.11712z m56.9344 28.4672v436.59264h94.90432V422.58432H179.8144z m208.81408-28.4672c0-15.72864 12.73856-28.4672 28.4672-28.4672h151.83872c15.72864 0 28.4672 12.73856 28.4672 28.4672v16.46592l16.54784-7.08608a295.81312 295.81312 0 0 1 89.4976-22.60992C808.79616 371.34336 901.12 454.08256 901.12 560.41472v327.22944a28.4672 28.4672 0 0 1-28.4672 28.4672h-151.83872a28.4672 28.4672 0 0 1-28.50816-28.4672v-265.74848a47.47264 47.47264 0 1 0-94.90432 0v265.74848a28.4672 28.4672 0 0 1-28.4672 28.4672h-151.83872a28.4672 28.4672 0 0 1-28.4672-28.4672V394.11712z m56.9344 28.4672v436.59264h94.90432v-237.28128a104.40704 104.40704 0 1 1 208.81408 0v237.28128h94.90432v-298.76224c0-72.2944-63.0784-129.4336-135.53664-122.79808a239.53408 239.53408 0 0 0-72.2944 18.2272l-56.15616 24.12544a28.4672 28.4672 0 0 1-39.7312-26.2144v-31.1296h-94.90432z'
									p-id='1877'
								></path>
							</svg>
						</span>
						<span>Linkedin</span>
					</div>
					<span>
						未绑定<a className='text-cyan-500'>（绑定）</a>
					</span>
				</div>
				<div className='mb-3 px-4 py-2 flex justify-between border-b'>
					<div className='flex'>
						<span className='mr-2'>
							<svg className='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1723' width='24' height='24'>
								<path
									d='M659.53792 130.6624H522.6496a27.648 27.648 0 0 0-27.648 27.60704l-0.24576 265.46176 0.24576 236.21632c0.57344 40.46848-31.5392 79.6672-77.16864 79.6672-45.13792 0-77.824-38.66624-77.824-75.5712 0-24.576 9.95328-48.04608 32.768-65.24928 14.82752-11.264 38.0928-16.46592 80.11776-16.46592a27.648 27.648 0 0 0 27.648-27.68896v-121.11872a27.648 27.648 0 0 0-26.33728-27.648c-123.61728-5.9392-212.70528 39.7312-262.144 136.192-87.12192 169.94304 14.00832 381.25568 234.2912 381.25568 104.81664 0 176.5376-44.032 217.78432-118.04672l5.77536-10.97728a309.94432 309.94432 0 0 0 31.62112-131.23584v-205.74208l1.76128 0.94208c31.62112 16.67072 59.96544 27.4432 85.1968 32.19456l16.46592 2.99008 14.336 2.37568 6.43072 0.94208 11.38688 1.4336c8.72448 0.90112 15.48288 1.18784 20.56192 0.77824a27.648 27.648 0 0 0 25.47712-27.56608V346.84928a27.648 27.648 0 0 0-24.33024-27.4432c-27.27936-3.2768-50.46272-9.46176-69.55008-18.35008-45.2608-21.01248-82.04288-57.5488-82.04288-94.69952V158.26944a27.648 27.648 0 0 0-27.648-27.60704z m-109.32224 55.296h81.7152v20.19328c0 64.96256 51.2 115.9168 113.99168 145.03936l10.8544 4.7104c14.7456 5.9392 30.88384 10.6496 48.29184 14.09024l2.74432 0.49152v70.656l-8.8064-1.39264-13.1072-2.29376-7.24992-1.35168c-28.4672-5.3248-65.37216-22.03648-109.9776-50.29888a27.648 27.648 0 0 0-42.43456 23.3472v253.37856c-0.69632 34.89792-9.29792 77.824-30.47424 115.83488-31.66208 56.85248-85.11488 89.66144-169.45152 89.66144-175.59552 0-254.60736-165.0688-185.05728-300.76928l4.25984-7.9872c35.2256-62.6688 92.16-95.27296 174.08-98.34496l5.57056-0.16384v67.09248l-1.92512 0.12288c-36.70016 2.58048-62.75072 10.73152-83.88608 26.70592a134.18496 134.18496 0 0 0-54.6816 109.3632c0 65.536 55.21408 130.8672 133.12 130.8672 76.43136 0 129.88416-62.2592 132.38272-129.024l-0.16384-86.4256 0.2048-393.50272z'
									p-id='1724'
								></path>
							</svg>
						</span>
						<span>tiktok</span>
					</div>
					<span>
						已绑定<a className='text-cyan-500'>（解绑）</a>
					</span>
				</div>
			</div>
		</>
	);
};
