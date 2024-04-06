/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Card, Typography, Button, Space, Select, Divider } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import SelectComp from './selectComp'
import './index.less'
import FormCollectUser from './components/fomCollectUser'
import FormBaisc from './components/formBasic'
import FromLayout from './components/formLayout'
import FormDisabled from './components/formDisabled'
import FormSize from './components/formSize'
import FormValidateOther from './components/formValidateOther'
import FormValidateStatic from './components/formValidateStatic'
import FormLogin from './components/formLogin'
import FormRegister from './components/formRegister'
import FormModal from './components/formModal'
import FormTime from './components/formTime'
import FormWithout from './components/formWithout'

// https://blog.csdn.net/Yin_yihui/article/details/129420273
// https://ant.design/components/form-cn
// https://procomponents.ant.design/components/login-form
const BasicForm: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	let initValue = location.search ? location.search.split('=')[1] : 'FromCollectUser'
	const [value, setValue] = React.useState<string>(initValue)

	// 要新添加 ? 自定义表单控件、多表单联动、内联登陆栏、普通登陆框、注册新用户、弹出层中的新建表单、时间类控件、自行处理表单数据
	const handleChange = (value: string) => {
		setValue(value)
		navigate(`/form/basicForm?select=${value}`)
	}

	return (
		<>
			<Card className="mb10">
				<Space size="middle" className="mb15">
					<b>基础表单</b> - <SelectComp handleChange={handleChange} initValue={initValue} />
				</Space>
			</Card>
			<Card className="max-w-[800px] mx-auto">
				<FormCollectUser value={value} />
				<FormBaisc value={value} />
				<FromLayout value={value} />
				<FormDisabled value={value} />
				<FormSize value={value} />
				<FormLogin value={value} />
				<FormRegister value={value} /> {/* ! */}
				<FormModal value={value} /> {/* ! */}
				<FormTime value={value} /> {/* ! */}
				<FormWithout value={value} /> {/* ! */}
				<FormValidateStatic value={value} />
				<FormValidateOther value={value} />
			</Card>
		</>
	)
}

export default BasicForm
