import React from 'react'
import { Button, DatePicker, Form, TimePicker } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
}

const onFinish = (fieldsValue: any) => {
	console.log('未处理的值：', fieldsValue)
	// 应在提交前格式化日期值.
	const rangeValue = fieldsValue['range-picker'] // type: array
	const rangeTimeValue = fieldsValue['range-time-picker'] // type: array
	const values = {
		...fieldsValue,
		'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
		'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
		'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
		'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
		'range-time-picker': [rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'), rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')],
		'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
	}
	console.log('Received values of form: ', values)
}
const App: React.FC = () => {
	const config = {
		rules: [{ type: 'object' as const, required: false, message: 'Please select time!' }],
	}
	const rangeConfig = {
		rules: [{ type: 'array' as const, required: false, message: 'Please select time!' }],
	}
	console.log('dayjs：', dayjs('2022-01-01').format('YYYY-MM-DD')) //  2022-01-01

	return (
		<Form
			name="time_related_controls"
			{...formItemLayout}
			initialValues={{
				'date-picker': dayjs(new Date()),
				'date-time-picker': dayjs(),
				'month-picker': dayjs(),
				'range-picker': [dayjs(), dayjs()],
				'range-time-picker': [dayjs(), dayjs()],
				'time-picker': dayjs(),
			}}
			onFinish={onFinish}
			style={{ maxWidth: 1200 }}>
			{/* 2024-04-06 */}
			<Form.Item name="date-picker" label="DatePicker" {...config}>
				<DatePicker />
			</Form.Item>
			{/* 2024-04-06 02:02:05 */}
			<Form.Item name="date-time-picker" label="DatePicker[showTime]" {...config}>
				<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
			</Form.Item>
			{/* 2024-04 */}
			<Form.Item name="month-picker" label="MonthPicker" {...config}>
				<DatePicker picker="month" />
			</Form.Item>
			{/* 2024-04-04  -  2024-05-10 */}
			<Form.Item name="range-picker" label="RangePicker" {...rangeConfig}>
				<RangePicker />
			</Form.Item>
			{/* 2024-04-03 04:04:04  -  2024-04-21 03:03:03 */}
			<Form.Item name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
				<RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
			</Form.Item>
			{/* 14:06:06 */}
			<Form.Item name="time-picker" label="TimePicker" {...config}>
				<TimePicker />
			</Form.Item>
			<Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } }}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default App
