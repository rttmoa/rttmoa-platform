/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, Form, Input, Space, DatePicker, InputNumber, Radio, Select, Slider, ColorPicker, Cascader, TreeSelect } from 'antd';
import { message } from '@/hooks/useMessage';
// import { CompoundedComponent } from 'antd/lib/float-button/interface'

const { RangePicker } = DatePicker;

interface BasicFormProps {
	title: string;
	date: string[];
	goal: string;
	standard: string;
	client: string;
	invites: string;
	weight: number;
	publicType: string;
	publicUsers: string[];
}
type LayoutType = Parameters<typeof Form>[0]['layout'];
type SizeType = Parameters<typeof Form>[0]['size'];
const FormCollectUser: React.FC = () => {
	const [form] = Form.useForm();
	const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
	const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
	const onFormLayoutChange = ({ layout, size }: { layout: LayoutType; size: SizeType }) => {
		setFormLayout(layout);
		setComponentSize(size);
	};

	const onReset = () => {
		console.log('form.setFieldsValue', form.setFieldsValue({ title: undefined, date: undefined })); // 设置表单值为空
	};

	// get Form Value
	const onFinish = (values: any) => {
		message.success('提交的数据为 : ' + JSON.stringify(values));
		console.log('表单结果：', values);
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('失败原因:', errorInfo);
	};

	const initialValues: Partial<BasicFormProps> = { weight: 0, publicType: '1' };

	const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 10 }, wrapperCol: { span: 16 } } : null;

	const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { offset: 10, span: 16 } } : null;
	return (
		<>
			{
				<Form<any>
					{...formItemLayout}
					name='basic'
					form={form}
					disabled={false}
					style={{ maxWidth: formLayout === 'inline' ? 'none' : 800 }}
					layout={formLayout} //  horizontal | inline | vertical
					// size={componentSize as SizeType}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed} // 失败
					onValuesChange={onFormLayoutChange}
					autoComplete='off'
					initialValues={initialValues}
				>
					<Form.Item label='Form Layout' name='layout'>
						<Radio.Group value={formLayout}>
							<Radio.Button value='horizontal'>Horizontal</Radio.Button>
							<Radio.Button value='vertical'>Vertical</Radio.Button>
							<Radio.Button value='inline'>Inline</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label='Form Size' name='size'>
						<Radio.Group>
							<Radio.Button value='small'>Small</Radio.Button>
							<Radio.Button value='default'>Default</Radio.Button>
							<Radio.Button value='large'>Large</Radio.Button>
						</Radio.Group>
					</Form.Item>
					<Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
						<Input placeholder='给目标起个名字' />
					</Form.Item>
					<Form.Item label='起止日期' name='date' rules={[{ required: false, message: '请选择起止日期' }]}>
						<RangePicker showTime format='YYYY-MM-DD HH:mm:ss' />
					</Form.Item>
					<Form.Item label='目标描述' name='goal' rules={[{ required: false, message: '请输入目标描述' }]}>
						<Input.TextArea rows={3} showCount maxLength={100} placeholder='请输入你的阶段性工作目标' />
					</Form.Item>
					<Form.Item label='衡量标准' name='standard' rules={[{ required: false, message: '请输入衡量标准' }]}>
						<Input.TextArea rows={3} showCount maxLength={100} placeholder='请输入衡量标准' />
					</Form.Item>
					<Form.Item
						label={
							<span>
								客户<span className='optional'>（选填）</span>
							</span>
						}
						name='client'
						tooltip='目标的服务对象'
					>
						<Input placeholder='请描述你服务的客户，内部客户直接 @姓名／工号' />
					</Form.Item>
					<Form.Item
						label={
							<span>
								邀评人<span className='optional'>（选填）</span>
							</span>
						}
						name='invites'
					>
						<Input placeholder='请直接 @姓名／工号，最多可邀请 5 人' />
					</Form.Item>
					<Form.Item
						label={
							<span>
								权重<span className='optional'>（选填）</span>
							</span>
						}
						name='weight'
						wrapperCol={{ span: 5 }}
					>
						<InputNumber min={0} max={100} precision={0} placeholder='请输入' addonAfter={'%'} />
					</Form.Item>
					<Form.Item
						label={
							<span>
								目标公开<span className='optional'>（客户、邀评人默认被分享）</span>
							</span>
						}
						name='publicType'
					>
						<Radio.Group className='mb-[15px]'>
							<Radio value='1'>公开</Radio>
							<Radio value='2'>不公开</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item label='DatePicker'>
						<DatePicker />
					</Form.Item>
					<Form.Item label='RangePicker'>
						<RangePicker />
					</Form.Item>
					<Form.Item label='TreeSelect'>
						<TreeSelect value='bamboo' treeData={[{ title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }]} />
					</Form.Item>
					<Form.Item label='Cascader'>
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
					<Form.Item label='Slider'>
						<Slider value={66} />
					</Form.Item>
					<Form.Item label='ColorPicker'>
						<ColorPicker />
					</Form.Item>
					<Form.Item {...buttonItemLayout}>
						<Space>
							<Button type='primary' htmlType='submit'>
								提交
							</Button>
							<Button htmlType='button' onClick={onReset}>
								重置
							</Button>
						</Space>
					</Form.Item>
				</Form>
			}
		</>
	);
};

export default FormCollectUser;
