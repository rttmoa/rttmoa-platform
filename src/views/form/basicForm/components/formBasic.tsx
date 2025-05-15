/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

const FormBaisc: React.FC = () => {
	const [form] = Form.useForm()

	useEffect(() => {
		console.log('组件开始2')
		return () => {
			console.log('切换组件，组件销毁2')
		}
	}, [])

	const onFinish = (values: any) => {
		console.log('成功:', values) // 成功: {username: 'admin', password: '123456', remember: true}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('失败原因:', errorInfo) // {values: {…}, errorFields: Array(2), outOfDate: false}
	}

	type FieldType = {
		username?: string
		password?: string
		remember?: string
	}

	return (
		<>
			{
				<Form
					name="basic"
					labelCol={{ span: 8 }} // labelCol
					wrapperCol={{ span: 16 }} // wrapperCol
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }} // 初始值
					onFinish={onFinish} // 完成
					onFinishFailed={onFinishFailed} // 失败
					autoComplete="off"
					onChange={e => {
						// console.log(e);
					}}>
					<Form.Item<FieldType> label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input />
					</Form.Item>

					<Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input.Password />
					</Form.Item>

					<Form.Item<FieldType>
						name="remember"
						// label="Checked"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			}
		</>
	)
}

export default FormBaisc
