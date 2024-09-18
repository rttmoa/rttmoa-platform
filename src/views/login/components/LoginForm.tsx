import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Tabs } from 'antd'
import { HOME_URL } from '@/config'
import { getTimeState } from '@/utils'
import { useDispatch } from '@/redux'
import { setToken } from '@/redux/modules/user'
import { setTabsList } from '@/redux/modules/tabs'
import { notification } from '@/hooks/useMessage'
import { loginApi } from '@/api/modules/login'
import { ReqLogin } from '@/api/interface'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { message } from '@/hooks/useMessage'
import type { FormInstance, FormProps } from 'antd/es/form'
import { LockOutlined, UserOutlined, CloseCircleOutlined, CheckCircleFilled, PhoneOutlined } from '@ant-design/icons'
import usePermissions from '@/hooks/usePermissions'
import md5 from 'md5'

/* 自定义表单校验规则 （手机号、验证码） */
const validate = {
	phone(_: any, value: string) {
		value = value.trim()
		let reg = /^(?:(?:\+|00)86)?1\d{10}$/
		if (value.length === 0) return Promise.reject(new Error('手机号是必填项!'))
		if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误!'))
		return Promise.resolve()
	},
	code(_: any, value: string) {
		value = value.trim()
		let reg = /^\d{6}$/
		if (value.length === 0) return Promise.reject(new Error('验证码是必填项!'))
		if (!reg.test(value)) return Promise.reject(new Error('验证码格式有误!'))
		return Promise.resolve()
	},
}

// todo
// todo 登陆业务逻辑
const LoginForm: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [usp] = useSearchParams()

	const dispatch = useDispatch()

	const { initPermissions } = usePermissions()

	const formRef = React.useRef<FormInstance>(null)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const [sendText, setSendText] = useState('发送验证码')
	const [type, setType] = useState('account')

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
			await formRef?.current?.validateFields()
			let getValues = formRef?.current?.getFieldsValue() // 得到表单内容

			setLoading(true)
			message.open({ type: 'loading', content: '登录中...' })

			const { data } = await loginApi({
				...values,
				password: values.password ? md5(values.password) : '',
			}) // 得到 {access_token: 'bqddxxwqmfncffacvbpkuxvwvqrhln'}
			console.log(data)

			dispatch(setToken(data.access_token))
			// 存储Token + 派发任务存储redux
			// _.storage.set('tk', token)
			// await queryUserInfoAsync()

			// 清除最后一个帐户选项卡
			dispatch(setTabsList([]))

			// todo 初始化权限： 获取用户按钮权限 && 获取用户菜单权限
			await initPermissions(data.access_token)
			// return

			notification.success({
				message: getTimeState(),
				description: '欢迎登录！',
				icon: <CheckCircleFilled style={{ color: '#73d13d' }} />,
			})

			navigate(HOME_URL)

			// let to = usp.get("to");
			// to ? navigate(to, { replace: true }) : navigate(-1);
		} catch (error: any) {
			console.log('登陆错误：', error)
		} finally {
			setLoading(false)
			// message.destroy(); // FIXME: 阻止了其他 message 的提示
		}
	}
	const onFinishFailed: FormProps['onFinishFailed'] = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	const onReset = () => {
		formRef.current?.resetFields()
	}

	// ! 监听 回车 document.onKeydown
	useEffect(() => {
		document.onkeydown = event => {
			if (event.code === 'Enter') {
				event.preventDefault()
				formRef.current?.submit()
			}
		}
		return () => {
			document.onkeydown = () => {}
		}
	}, [])

	// .
	// !  发送验证码
	let timer: string | number | NodeJS.Timeout | null | undefined = null,
		num = 60
	const CountDown = () => {
		num--
		if (num === 0) {
			clearInterval(timer!)
			timer = null
			setSendText('发送验证码')
			setDisabled(false)
			return
		}
		setSendText(`${num}秒后重发`)
	}
	const sendCode = async () => {
		try {
			await formRef.current?.validateFields(['username'])
			let userName = formRef.current?.getFieldValue('username')
			if (userName !== '18888888888') return
			// 模拟调用后台接口 成功
			// let { code } = await api.sendPhoneCode(phone);
			setDisabled(true)
			CountDown()
			if (!timer) timer = setInterval(CountDown, 1000)
		} catch (error: any) {
			console.log('sendCode Error', console.log(error))
		}
	}

	useEffect(() => {
		return () => {
			if (timer) {
				clearInterval(timer)
				timer = null
			}
		}
	}, [])

	return (
		<div className="login-form-content">
			<Form name="login" size="large" autoComplete="off" ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
				<Tabs
					activeKey={type}
					onChange={setType}
					centered
					items={[
						{ key: 'account', label: '账户密码登陆' },
						{ key: 'mobile', label: '手机号登陆' },
					]}
				/>
				{type === 'account' && (
					<>
						<Form.Item name="username" initialValue="18888888888" rules={[{ required: true, message: 'Please input your username!' }]}>
							<Input prefix={<UserOutlined />} placeholder="User: admin / user" />
						</Form.Item>
						<Form.Item name="password" initialValue="123123" rules={[{ required: true, message: 'Please input your password!' }]}>
							<Input prefix={<LockOutlined />} placeholder="Password: 123123" />
						</Form.Item>
					</>
				)}
				{type === 'mobile' && (
					<>
						<Form.Item name="phone" initialValue="18888888888" rules={[{ required: true, message: 'Please input your username!' }]}>
							<Input prefix={<UserOutlined />} placeholder="User：admin / user" />
						</Form.Item>
						<Form.Item name="code" initialValue="123123" rules={[{ required: true, message: 'Please input your Code!' }]}>
							<Input
								prefix={<PhoneOutlined />}
								suffix={
									<Button type="primary" size="small" onClick={sendCode} disabled={disabled}>
										{sendText}
									</Button>
								}
							/>
						</Form.Item>
					</>
				)}
				<Form.Item className="login-form-button">
					<Button shape="round" icon={<CloseCircleOutlined />} onClick={onReset}>
						Reset
					</Button>
					<Button type="primary" shape="round" icon={<UserOutlined />} loading={loading} htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginForm
