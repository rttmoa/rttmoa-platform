import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Select, Slider, Switch, TreeSelect, Upload } from 'antd'

const { RangePicker } = DatePicker
const { TextArea } = Input

const normFile = (e: any) => {
	if (Array.isArray(e)) {
		return e
	}
	return e?.fileList
}

const FormDisabledDemo: React.FC = () => {
	const [componentDisabled, setComponentDisabled] = useState<boolean>(true)

	return (
		<>
			<>
				<Checkbox style={{ marginLeft: 280 }} checked={componentDisabled} onChange={e => setComponentDisabled(e.target.checked)}>
					<b>禁用表单</b>
				</Checkbox>
				<Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} layout="horizontal" disabled={componentDisabled} style={{ maxWidth: 600 }}>
					<Form.Item label="Checkbox" name="disabled" valuePropName="checked">
						<Checkbox>Checkbox</Checkbox>
					</Form.Item>
					<Form.Item label="Radio" name="fruits">
						<Radio.Group value="apple">
							<Radio value="apple"> Apple </Radio>
							<Radio value="pear"> Pear </Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label="Input">
						<Input value="我是输入框" />
					</Form.Item>
					<Form.Item label="Select">
						<Select value="demo">
							<Select.Option value="demo">Demo</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item label="TreeSelect">
						<TreeSelect value="bamboo" treeData={[{ title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }]} />
					</Form.Item>
					<Form.Item label="Cascader">
						<Cascader
							value={['hangzhou']}
							options={[
								{
									value: 'zhejiang',
									label: 'Zhejiang',
									children: [
										{
											value: 'hangzhou',
											label: 'Hangzhou',
										},
									],
								},
							]}
						/>
					</Form.Item>
					<Form.Item label="DatePicker">
						<DatePicker />
					</Form.Item>
					<Form.Item label="RangePicker">
						<RangePicker />
					</Form.Item>
					<Form.Item label="InputNumber">
						<InputNumber value={45} />
					</Form.Item>
					<Form.Item label="TextArea">
						<TextArea rows={4} value="我是一个多行的文本输入控件" />
					</Form.Item>
					<Form.Item label="Switch" valuePropName="checked">
						<Switch value={true} />
					</Form.Item>
					<Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
						<Upload action="/upload.do" listType="picture-card">
							<div>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>Upload</div>
							</div>
						</Upload>
					</Form.Item>
					<Form.Item label="Button">
						<Button>Button</Button>
					</Form.Item>
					<Form.Item label="Slider">
						<Slider value={66} />
					</Form.Item>
					<Form.Item label="ColorPicker">
						<ColorPicker />
					</Form.Item>
				</Form>
			</>
		</>
	)
}
export default FormDisabledDemo
// export default () => <FormDisabledDemo />;
