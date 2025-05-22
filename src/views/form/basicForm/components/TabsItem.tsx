import FomCollectUser from './fomCollectUser'
import FormBasic from './formBasic'
import FormDisabled from './formDisabled'
import FormLayout from './formLayout'
import FormLogin from './formLogin'
import FormModal from './formModal'
import FormRegister from './formRegister'
import FormSize from './formSize'
import FormTime from './formTime'
import FormValidateOther from './formValidateOther'
import FormValidateStatic from './formValidateStatic'
import FormWithout from './formWithout'

export const TabItems = [
	{
		label: `收集用户信息`,
		key: '1',
		children: <FomCollectUser />,
	},
	{
		label: `表单使用`,
		key: '2',
		children: <FormBasic />,
	},
	{
		label: `禁用表单`,
		key: '3',
		children: <FormDisabled />,
	},
	{
		label: `表单布局`,
		key: '4',
		children: <FormLayout />,
	},
	{
		label: `普通登陆`,
		key: '5',
		children: <FormLogin />,
	},
	{
		label: `# 弹窗类`,
		key: '6',
		children: <FormModal />,
	},
	{
		label: `# 新用户注册`,
		key: '7',
		children: <FormRegister />,
	},
	{
		label: `表单尺寸`,
		key: '8',
		children: <FormSize />,
	},
	{
		label: `# 时间类`,
		key: '9',
		children: <FormTime />,
	},
	{
		label: `# 自行处理表单`,
		key: '10',
		children: <FormWithout />,
	},
	{
		label: `校验其他组件`,
		key: '11',
		children: <FormValidateOther />,
	},
	{
		label: `自定义校验`,
		key: '12',
		children: <FormValidateStatic />,
	},

	{
		label: `# 验证滚动 None`,
		key: '13',
		children: '',
	},
	{
		label: `# 验证滚动 None`,
		key: '14',
		children: '',
	},
	{
		label: `# 验证滚动 None`,
		key: '15',
		children: '',
	},
	{
		label: `# 验证滚动 None`,
		key: '16',
		children: '',
	},
]
