import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Tabs } from 'antd';
import { HOME_URL } from '@/config';
import { getTimeState } from '@/utils';
import { useDispatch } from '@/redux';
import { setToken } from '@/redux/modules/user';
import { setTabsList } from '@/redux/modules/tabs';
import { notification } from '@/hooks/useMessage';
import { loginApi } from '@/api/modules/login';
import { ReqLogin } from '@/api/interface';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { message } from '@/hooks/useMessage';
import type { FormInstance, FormProps } from 'antd/es/form';
import { LockOutlined, UserOutlined, CheckCircleFilled, PhoneOutlined, UserAddOutlined, BulbOutlined } from '@ant-design/icons';
import usePermissions from '@/hooks/usePermissions';
import { userLogin, userRegister } from '@/api/modules/system/login';

/* 自定义表单校验规则 （手机号、验证码） */
const validate = {
	phone(_: any, value: string) {
		value = value.trim();
		let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
		if (value.length === 0) return Promise.reject(new Error('手机号是必填项!'));
		if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误!'));
		return Promise.resolve();
	},
	code(_: any, value: string) {
		value = value.trim();
		let reg = /^\d{6}$/;
		if (value.length === 0) return Promise.reject(new Error('验证码是必填项!'));
		if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误!'));
		return Promise.resolve();
	},
};

// todo
// todo 登陆业务逻辑
const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [usp] = useSearchParams();

	const dispatch = useDispatch();

	const { initPermissions } = usePermissions();

	const formRef = React.useRef<FormInstance>(null);
	const [loading, setLoading] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [sendText, setSendText] = useState('发送验证码');
	const [type, setType] = useState('account');

	// TODO:  登陆 提交到后台及前台的逻辑
	// 1、获取表单内容
	// 2、设置按钮加载状态
	// 3、设置提示消息，正在加载中
	// 4、将表单内容提交到后台，获取 token
	// 5、将 token 存到 redux 中， 并重置 redux 中 数据
	// ! 6、初始化权限；获取用户按钮权限 && 获取用户菜单权限  (请求 /menu/list  /auth/buttons 两个接口, 每个用户获得的数据不同)  接口的数据存储到redux
	// 7、提示用户进入系统中了
	// 8、跳转到首页
	// 9、取消加载状态 & 取消提示的消息
	const onFinish = async (values: ReqLogin) => {
		try {
			await formRef?.current?.validateFields();
			let getValues = formRef?.current?.getFieldsValue(); // 得到表单内容

			setLoading(true);
			message.open({ type: 'loading', content: '登录中...' });

			const { code, data }: any = type === 'account' ? await userLogin(getValues) : await userRegister(getValues);
			console.log('data', data);
			if (code != 200) {
				message.error('请求失败');
				setLoading(false);
				return null;
			}

			formRef?.current?.resetFields();
			// const { data } = await loginApi({ ...values, 	password: values.password }); // 得到 {access_token: 'bqddxxwqmfncffacvbpkuxvwvqrhln'}

			// 存储Token + 派发任务存储redux
			dispatch(setToken(data.token));

			// 清除最后一个帐户选项卡
			dispatch(setTabsList([]));

			// * 初始化权限： 获取用户按钮权限 && 获取用户菜单权限
			await initPermissions(data.token);

			notification.success({
				message: getTimeState(),
				description: '欢迎登录！',
				icon: <CheckCircleFilled style={{ color: '#73d13d' }} />,
			});

			navigate(HOME_URL);

			// let to = usp.get("to");
			// to ? navigate(to, { replace: true }) : navigate(-1);
		} catch (error: any) {
			console.log('登陆错误：', error);
		} finally {
			setLoading(false);
			// message.destroy(); // FIXME: 阻止了其他 message 的提示
		}
	};
	const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
		console.log('Failed:', errorInfo);
		// message.error('失败');
	};

	// ! 监听 回车 document.onKeydown
	useEffect(() => {
		document.onkeydown = event => {
			if (event.code === 'Enter') {
				event.preventDefault();
				formRef.current?.submit();
			}
		};
		return () => {
			document.onkeydown = () => {};
		};
	}, []);

	// .
	// ! 发送验证码
	let timer: string | number | NodeJS.Timeout | null | undefined = null,
		num = 60;
	const CountDown = () => {
		num--;
		if (num === 0) {
			clearInterval(timer!);
			timer = null;
			setSendText('发送验证码');
			setDisabled(false);
			return;
		}
		setSendText(`${num}秒后重发`);
	};
	const sendCode = async () => {
		try {
			if (type == 'register') {
				await formRef.current?.validateFields(['username']);
			}
			await formRef.current?.validateFields(['phone']);
			// let userName = formRef.current?.getFieldValue('username')
			// if (userName !== '18888888888') return
			// 模拟调用后台接口 成功
			// let { code } = await api.sendPhoneCode(phone);
			setDisabled(true);
			CountDown();
			if (!timer) timer = setInterval(CountDown, 1000);
		} catch (error: any) {
			console.log('sendCode Error', console.log(error));
		}
	};

	useEffect(() => {
		return () => {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		};
	}, []);

	return (
		<div className='login-form-content'>
			<Form name='login' size='large' autoComplete='off' ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Tabs
					size='small'
					activeKey={type}
					onChange={type => {
						formRef.current?.resetFields();
						setType(type);
					}}
					centered={false}
					items={[
						{ key: 'account', label: '账户登陆' },
						{ key: 'register', label: '注册账号' },
						{ key: 'forget', label: '忘记密码' },
					]}
				/>
				{type === 'account' && (
					<>
						<Form.Item name='username' rules={[{ required: true, message: '必填：用户名称或手机号' }]}>
							<Input className='text-[14px]' prefix={<UserOutlined />} placeholder='请输入用户名称 / 手机号' />
						</Form.Item>
						<Form.Item name='password' rules={[{ required: true, message: '必填：密码' }]}>
							<Input.Password className='text-[14px]' prefix={<LockOutlined />} placeholder='请输入登陆密码' />
						</Form.Item>
					</>
				)}
				{type === 'register' && (
					<>
						<Form.Item name='username' rules={[{ required: true, message: '必填：用户名称！' }]}>
							<Input className='text-[14px]' prefix={<UserOutlined />} placeholder='请输入用户名称' />
						</Form.Item>
						<Form.Item name='phone' rules={[{ required: true, message: '必填：手机号！' }]}>
							<Input className='text-[14px]' prefix={<PhoneOutlined />} placeholder='请输入手机号码' />
						</Form.Item>
						<Form.Item name='code' rules={[{ required: true, message: '必填：验证码！' }]}>
							<Input
								className='text-[14px]'
								prefix={<BulbOutlined />}
								suffix={
									<Button type='primary' size='small' onClick={sendCode} disabled={disabled}>
										<span className='text-white'>{sendText}</span>
									</Button>
								}
							/>
						</Form.Item>
						<Form.Item name='password' rules={[{ required: true, message: '必填：密码！' }]}>
							{/* <Input
								className='text-[14px]'
								prefix={<PhoneOutlined />}
								suffix={
									<Button type='primary' size='small' onClick={sendCode} disabled={disabled}>
										{sendText}
									</Button>
								}
							/> */}
							<Input.Password className='text-[14px]' prefix={<LockOutlined />} placeholder='请输入密码' />
						</Form.Item>
					</>
				)}
				{type === 'forget' && (
					<>
						<Form.Item name='phone' rules={[{ required: true, message: '必填：手机号！' }]}>
							<Input className='text-[14px]' prefix={<PhoneOutlined />} placeholder='请输入手机号码' />
						</Form.Item>
						<Form.Item name='code' rules={[{ required: true, message: '必填：验证码！' }]}>
							<Input
								className='text-[14px]'
								prefix={<BulbOutlined />}
								suffix={
									<Button type='primary' size='small' onClick={sendCode} disabled={disabled}>
										<span className='text-white'>{sendText}</span>
									</Button>
								}
							/>
						</Form.Item>
						<Form.Item name='password' rules={[{ required: true, message: '必填：密码！' }]}>
							<Input.Password className='text-[14px]' prefix={<LockOutlined />} placeholder='请输入密码' />
						</Form.Item>
					</>
				)}
				<Form.Item className='w-full login-form-button pt-[5px]  '>
					<Button
						className='w-full text-[14px] '
						type={type == 'account' ? 'primary' : 'default'}
						shape='default'
						icon={type == 'account' ? <UserOutlined /> : <UserAddOutlined />}
						loading={loading}
						htmlType='submit'
					>
						{type == 'account' && '登陆'}
						{type == 'register' && '注册'}
						{type == 'forget' && '提交'}
					</Button>
				</Form.Item>
			</Form>
			{/* {type == 'account' && (
				<div className='pl-[12px] text-[12px]'>
					<span>忘记密码</span>
				</div>
			)} */}
		</div>
	);
};

export default LoginForm;
