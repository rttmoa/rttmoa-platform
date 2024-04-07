import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd'
import React, { useCallback, useState } from 'react'

const initFilter = (arr: any[]) => {
	const obj: any = {}
	arr.forEach((item: any) => {
		switch (item.type) {
			case 'inputString':
				obj[item.name] = item.initValue || ''
				break
			case 'select':
				obj[item.name] = item.initValue || 0
				break
			case 'dateRange':
				item.name.forEach((name: string | number) => {
					obj[name] = ''
				})
				break
			default:
				break
		}
	})
	return obj
}

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
	return `${date.getFullYear()}-${month}-${data}`
}

function renderFormItem(item: any) {
	const { label, field, type, placeholder, width, list, style } = item
	switch (type) {
		case 'TIME':
			return [
				<Col xs={24} sm={24} md={24} lg={12} xl={8}>
					<Form.Item name={'startTime'} label="开始时间" key={'startTime'}>
						<DatePicker style={width} showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
					</Form.Item>
				</Col>,
				<Col xs={24} sm={24} md={24} lg={12} xl={8}>
					<Form.Item name={'endTime'} label="结束时间" key={'endTime'}>
						<DatePicker style={width} showTime={true} placeholder={placeholder} format="YYYY-MM-DD hh:mm:ss" />
					</Form.Item>
				</Col>,
			]
		case 'INPUT':
			return (
				<Col xs={24} sm={24} md={24} lg={12} xl={8}>
					<Form.Item name={field} label={label} key={field} style={style}>
						<Input type="text" placeholder={placeholder} style={{ width }} />
					</Form.Item>
				</Col>
			)
		case 'SELECT':
			return (
				<Col xs={24} sm={24} md={24} lg={12} xl={8}>
					<Form.Item name={field} label={label} key={field} style={style}>
						<Select style={{ width }} placeholder={placeholder}>
							{getOptionList(list)}
						</Select>
					</Form.Item>
				</Col>
			)
		case 'CHECKBOX':
			return (
				<Col xs={24} sm={24} md={24} lg={12} xl={8}>
					<Form.Item name={field} label={label} key={field}>
						<Checkbox>{label}</Checkbox>
					</Form.Item>
				</Col>
			)
		default:
			return null
	}
}

/**
 * 封装 Form 表格查询条件条件
 * @param props
 * @returns
 */
export default function MultiForm(props: any) {
	const { filterSubmit, multiForm } = props
	const [expand, setexpand] = useState(false)

	const Submit = useCallback(() => {
		let filterValue = multiForm.getFieldsValue()
		if (filterValue.startTime) {
			filterValue.startTime = formateDate(filterValue.startTime)
		}
		if (filterValue.endTime) {
			filterValue.endTime = formateDate(filterValue.endTime)
		}
		filterSubmit && filterSubmit(filterValue)
	}, [filterSubmit, multiForm])

	const reset = useCallback(() => {
		multiForm.resetFields()
	}, [multiForm])

	const initFormList = () => {
		const { formList, extendFormList } = props
		let formItemList = []
		if (formList && formList.length > 0) {
			formItemList = formList.map(renderFormItem)
		}
		if (extendFormList && extendFormList.length > 0) {
			const extraItems = expand ? extendFormList.map(renderFormItem) : []
			formItemList = [...formItemList, ...extraItems]
		}
		console.log(formItemList)
		return formItemList
	}
	const toggleExpand = useCallback(() => {
		setexpand(prevExpand => !prevExpand)
	}, [])
	const formList = initFormList()
	return (
		<div>
			<Form layout="horizontal" form={multiForm}>
				<div style={{ display: 'flex' }}>
					<Row style={{ width: 'calc(100% - 250px)' }}>{formList.map((value: any, index: number) => value)}</Row>
					<div style={{ width: 200 }}>
						<Form.Item>
							<Button type="primary" onClick={Submit}>
								查询
							</Button>
							<Button className="mx-3" onClick={reset}>
								重置
							</Button>
							{props.extendFormList?.length > 0 && (
								<button type="button" onClick={toggleExpand}>
									{expand ? '收起' : '展开'}
								</button>
							)}
						</Form.Item>
					</div>
				</div>
			</Form>
		</div>
	)
}
