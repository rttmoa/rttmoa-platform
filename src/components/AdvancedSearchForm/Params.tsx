import { InfoCircleOutlined } from '@ant-design/icons'

// * 表单配置项
let FormConfig = [
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
