import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, DatePicker, Form, FormProps, Input, Row, Select, Space, theme, Typography } from 'antd';
import './index.less';

/**
 * & 高级搜索表格 & 新建表单数据 Form
 * @param props
 * @returns
 */
// 完成：待实现1：ProTable 新建按钮使用封装的 AdvancedSearchForm 组件
// 完成：待实现2：用户管理中表头也需要使用 AdvancedSearchForm 组件
export type FormItemType = 'INPUT' | 'SELECT' | 'CHECKBOX' | 'TIME_START' | 'TIME_END';
type FormFieldItem = {
	type?: 'INPUT' | 'SELECT' | 'CHECKBOX' | 'TIME_START' | 'TIME_END';
	label: string;
	field: string;
	placeholder?: string;
	list?: any[];
	component?: React.ReactNode; // 👈 支持传入完整组件
};
type FormPropsType = {
	cid?: string;
	name?: string; // 表示每个Form表格、必须不相同
	isSearch?: boolean; // 是否是表单搜索
	loading: boolean;
	rowCount?: number; // 每行的数量
	FormListConfig?: any[]; // 表单的配置项
	tableYHeight: any;
	FormOnFinish: (data: any) => any; // 将结果传递到父组件
};
const AdvancedSearchForm = (Props: FormPropsType) => {
	const { cid, name = 'advanced_search', loading, FormListConfig = [], rowCount = 3, tableYHeight, FormOnFinish } = Props;
	const FormConfig = FormListConfig;

	const [form] = Form.useForm();
	const [expand, setExpand] = useState<boolean>(false); // 是否展开
	const [isSearch, SetIsSearch] = useState<boolean>(true); // 是否是表单搜索

	const [tableHeight, setTableHeight] = useState(350);

	useEffect(() => {
		const total = document.body.clientHeight;
		const topHeight = document.getElementById('AdvancedSearchForm')?.offsetHeight || 0;
		const header = 55 + 45;
		const footer = 30; // 假设有底部
		console.log('params: ', total, topHeight); // 898  69|289
		setTableHeight(total - topHeight - header - footer - 40);
		let tableY: number = total - topHeight - header - footer - 40;
		tableYHeight && tableYHeight(tableY);
	}, [expand]);
	console.log('tableHeight', tableHeight);

	function formateDate(time: string | number) {
		if (!time) return '';
		const date = new Date(time);
		const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		const data = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
		return `${date.getFullYear()}-${month}-${data}`; // * 2025-06-05
	}
	// 提交表单数据
	const OnFinish = (values: any) => {
		// 处理字段：input、time、select、checkbox
		// console.log('Received values of form: ', values)
		const formValue = form.getFieldsValue();
		// console.log('formValue', formValue)
		if (formValue.startTime) formValue.startTime = formateDate(formValue.startTime);
		if (formValue.endTime) formValue.endTime = formateDate(formValue.endTime);
		// console.log('formValue', formValue)
		// console.log('value', values)
		FormOnFinish && FormOnFinish(formValue);
	};
	const OnFailed: FormProps<any>['onFinishFailed'] = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	// * 处理 Form.Item 字段 👈
	const FormFields = useMemo(() => {
		const colsPerRow = rowCount || 3;
		const colSpan = 24 / colsPerRow;
		const collapsedCount = colsPerRow === 1 ? 1 : FormConfig.length >= colsPerRow ? colsPerRow - 1 : FormConfig.length;

		const shownList = expand ? FormConfig : FormConfig.slice(0, collapsedCount);

		const fieldNodes = shownList.map((cfg: FormFieldItem, idx: number) => {
			const { type, label, field, placeholder, list, component } = cfg;

			let inputEl: React.ReactNode = null;

			if (component) {
				// 👈 优先使用自定义组件 {label: "年末", component: <Input placeholder="" /> }
				inputEl = component;
			} else {
				switch (type) {
					case 'INPUT':
						inputEl = <Input placeholder={placeholder} />;
						break;
					case 'SELECT':
						inputEl = <Select placeholder={placeholder}>{/* {getOptionList(list)} */}</Select>;
						break;
					case 'CHECKBOX':
						inputEl = <Checkbox>{label}</Checkbox>;
						break;
					case 'TIME_START':
					case 'TIME_END':
						inputEl = <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} />;
						break;
					default:
						return null;
				}
			}

			return (
				<Col span={colSpan} key={idx}>
					<Form.Item name={field} label={label}>
						{inputEl}
					</Form.Item>
				</Col>
			);
		});

		// 🔽 渲染操作按钮（补空位 + 查询/重置）
		let actionNode: React.ReactNode[] = [];
		if (isSearch) {
			const remainder = shownList.length % colsPerRow;
			const fillCount = remainder === 0 ? colsPerRow - 1 : colsPerRow - remainder - 1;

			const blankCols = Array.from({ length: fillCount }, (_, i) => <Col span={colSpan} key={`blank-${i}`} />);

			const actions = (
				<Col span={colSpan} key='actions' style={{ textAlign: 'right' }}>
					<Form.Item>
						<Space size='small'>
							<Button type='primary' htmlType='submit'>
								查询
							</Button>
							<Button onClick={() => form.resetFields()}>重置</Button>
							{FormConfig.length < colsPerRow ? null : (
								<Button type='link' className='text-[12px]' onClick={() => setExpand(!expand)}>
									{expand ? '关闭' : '展开'} <DownOutlined />
								</Button>
							)}
						</Space>
					</Form.Item>
				</Col>
			);

			actionNode = [...blankCols, actions];
		}

		return [...fieldNodes, ...actionNode];
	}, [expand, FormConfig, rowCount, isSearch]);

	let layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};
	let maxWidth = { maxWidth: 600 };
	return (
		<Card id={'AdvancedSearchForm'} size='small' hoverable>
			<Form disabled={loading} name={name} form={form} layout='horizontal' size='middle' variant='outlined' onFinish={OnFinish} onFinishFailed={OnFailed}>
				<Row gutter={24}>{FormFields}</Row>
			</Form>
		</Card>
	);
};

export default AdvancedSearchForm;
