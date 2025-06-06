import { InfoCircleOutlined } from '@ant-design/icons'
import { Input } from 'antd'

// types.ts
export type FormItemType = 'INPUT' | 'SELECT' | 'CHECKBOX' | 'TIME_START' | 'TIME_END'

export interface FormFieldConfig {
	type: FormItemType
	label: string
	field: string
	placeholder?: string
	list?: { value: string | number; label: string }[]
	uname?: any
	rules?: any
	wrapperCol?: any
	require?: any
	tooltip?: any
	initialValue?: any
	component?: any
}

// * 表单配置项
let FormConfig: FormFieldConfig[] = [
	{
		type: 'INPUT',
		// Form.Item属性
		label: '用户名',
		uname: 'username',
		rules: null,
		wrapperCol: { offset: 6, span: 16 },
		require: true,
		tooltip: { title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> },
		// Input属性
		field: 'user_name',
		placeholder: '请输入用户名',
		initialValue: '',
		// width: 120,
		component: <Input.TextArea rows={4} placeholder="请输入描述信息" />,
	},
	{
		type: 'INPUT',
		label: '年纪',
		uname: 'age',
		field: 'age',
		placeholder: '请输入年纪',
		initialValue: '',
		// width: 120,
	},
	{
		type: 'INPUT',
		label: '爱好',
		uname: 'hobby',
		field: 'hobby',
		placeholder: '请输入爱好',
		initialValue: '',
	},
	{
		type: 'INPUT',
		label: '托盘号',
		uname: 'pallet',
		field: 'pallet',
		placeholder: '请输入托盘号',
		initialValue: '',
		// width: 120,
	},
	{
		type: 'TIME_START',
		label: '开始时间',
		uname: 'pallet',
		field: 'pallet',
		placeholder: '请输入托盘号',
		initialValue: '',
	},
	{
		type: 'TIME_END',
		label: '结束时间',
		uname: 'pallet',
		field: 'pallet',
		placeholder: '请输入托盘号',
		initialValue: '',
	},
]

// export default {
// 	FormConfig,
// }
