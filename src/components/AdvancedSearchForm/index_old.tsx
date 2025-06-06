import React, { useCallback, useState } from 'react'
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, DatePicker, Form, FormProps, Input, Row, Select, Space, theme, Typography } from 'antd'
import './index.less'

function getOptionList(data = []) {
	if (!data) {
		return []
	}
	let options: any = [] //[<Option value="0" key="all_key">全部</Option>];
	data.forEach((item: any) => {
		options.push(
			<Select.Option value={item.id} key={item.id}>
				{item.name}
			</Select.Option>
		)
	})
	return options
}
function formateDate(time: string | number) {
	if (!time) return ''
	const date = new Date(time)
	const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
	const data = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
	return `${date.getFullYear()}-${month}-${data}` // * 2025-06-05
}

/**
 * & 高级搜索表格 & 新建表单数据 Form
 * @param props
 * @returns
 */
// 完成：待实现1：ProTable 新建按钮使用封装的 AdvancedSearchForm 组件
// 完成：待实现2：用户管理中表头也需要使用 AdvancedSearchForm 组件
type FormPropsType = {
	name?: string // 表示每个Form表格、必须不相同
	isSearch?: boolean // 是否是表单搜索
	loading: boolean
	rowCount?: number // 每行的数量
	FormListConfig?: any[] // 表单的配置项
	FormOnFinish: (data: any) => any // 将结果传递到父组件
}
const AdvancedSearchForm = (Props: FormPropsType) => {
	const { name = 'advanced_search', loading, FormListConfig = [], rowCount = 3, FormOnFinish } = Props
	const FormConfig = FormListConfig

	const [form] = Form.useForm()
	const [expand, setExpand] = useState<boolean>(false) // 是否展开
	const [isSearch, SetIsSearch] = useState<boolean>(true) // 是否是表单搜索

	// * 处理 Form.Item 字段
	const GetFieldsForms = () => {
		const colsPerRow = rowCount || 3 // 每行占几个 <Col />
		const rowCounts = 24 / colsPerRow // 动态计算span: 1、2、3、4   不可超过4个

		let closeCount = null
		if (colsPerRow == 1) closeCount = FormConfig.slice(0, 1)
		else closeCount = FormConfig.length >= colsPerRow ? FormConfig.slice(0, colsPerRow - 1) : FormConfig // 闭合时数量

		const FormList: any[] = expand ? FormConfig : closeCount // 展开与关闭的数量

		const children: React.ReactNode[] = []

		for (let i = 0; i < FormList.length; i++) {
			const { type, label, field, placeholder, list } = FormList[i]
			let FormItem = null
			if (type == 'INPUT') {
				FormItem = (
					<Col span={rowCounts} key={i}>
						<Form.Item name={field} label={label} key={field}>
							<Input type="text" placeholder={placeholder} />
						</Form.Item>
					</Col>
				)
			} else if (type === 'SELECT') {
				FormItem = (
					<Col span={rowCounts} key={i}>
						<Form.Item name={field} label={label} key={field}>
							<Select placeholder={placeholder}>{getOptionList(list)}</Select>
						</Form.Item>
					</Col>
				)
			} else if (type === 'CHECKBOX') {
				FormItem = (
					<Col span={rowCounts} key={i}>
						<Form.Item name={field} label={label} key={field}>
							<Checkbox>{label}</Checkbox>
						</Form.Item>
					</Col>
				)
			} else if (type === 'TIME_START') {
				FormItem = (
					<Col span={rowCounts} key={i}>
						<Form.Item name={'startTime'} label="开始时间" key={'startTime'}>
							<DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
						</Form.Item>
					</Col>
				)
			} else if (type === 'TIME_END') {
				FormItem = (
					<Col span={rowCounts} key={i}>
						<Form.Item name={'endTime'} label="结束时间" key={'endTime'}>
							<DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
						</Form.Item>
					</Col>
				)
			}
			children.push(FormItem)
			// children.push(
			// 	<Col span={rowCounts} key={i}>
			// 		<Form.Item name={`field-${i}`} label={`Field ${i}`} rules={[{ required: true, message: 'Input something!' }]} required tooltip={{ title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}>
			// 			<Input placeholder="placeholder  禁用" />
			// 		</Form.Item>
			// 	</Col>
			// )
		}
		if (isSearch) {
			// 当前行剩余列数 （按钮插入新行 or 同一行补齐）
			const remainder = FormList.length % colsPerRow
			if (remainder !== 0) {
				for (let i = 0; i < colsPerRow - remainder - 1; i++) {
					children.push(<Col span={rowCounts} key={`blank-${i}`} />)
				}
			} else {
				for (let i = 0; i < colsPerRow - 1; i++) {
					children.push(<Col span={rowCounts} key={`blank-${i}`} />)
				}
			}
			children.push(
				<Col span={rowCounts} key="actions" style={{ textAlign: 'right' }}>
					<Form.Item>
						<Space size="small">
							<Button type="primary" htmlType="submit">
								查询
							</Button>
							<Button onClick={() => form.resetFields()}>重置</Button>
							{FormConfig.length < colsPerRow ? null : (
								<Button type="link" className="text-[12px]" onClick={() => setExpand(!expand)}>
									{expand ? '关闭' : '展开'} <DownOutlined />
								</Button>
							)}
						</Space>
					</Form.Item>
				</Col>
			)
		}

		return children
	}

	// 提交表单数据
	const OnFinish = (values: any) => {
		// 处理字段：input、time、select、checkbox
		// console.log('Received values of form: ', values)
		const formValue = form.getFieldsValue()
		// console.log('formValue', formValue)
		if (formValue.startTime) formValue.startTime = formateDate(formValue.startTime)
		if (formValue.endTime) formValue.endTime = formateDate(formValue.endTime)
		// console.log('formValue', formValue)
		// console.log('value', values)
		FormOnFinish && FormOnFinish(formValue)
	}
	const OnFailed: FormProps<any>['onFinishFailed'] = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	let layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	}
	let maxWidth = { maxWidth: 600 }
	return (
		<Card size="small" hoverable>
			<Form disabled={loading} name={name} form={form} layout="horizontal" size="middle" variant="outlined" onFinish={OnFinish} onFinishFailed={OnFailed}>
				<Row gutter={24}>{GetFieldsForms()}</Row>
			</Form>
			{/* <Typography>
				<pre>Name Value: useWatch</pre>
				<pre>Custom Value: Form.useWatch</pre>
			</Typography> */}
		</Card>
	)
}

export default AdvancedSearchForm
