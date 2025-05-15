/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { Card, Typography, Button, Space, Select, Divider } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import SelectComp from './index_selectComp'
import './index.less'
import {
	FomCollectUser,
	FormBasic,
	FormDisabled,
	FormLayout,
	FormLogin,
	FormModal,
	FormRegister,
	FormSize,
	FormTime,
	FormValidateOther,
	FormValidateStatic,
	FormWithout,
} from './components'
import Title from 'antd/lib/typography/Title'

// import FomCollectUser from './fomCollectUser'

// https://blog.csdn.net/Yin_yihui/article/details/129420273
// https://ant.design/components/form-cn
// https://procomponents.ant.design/components/login-form
const BasicForm = () => {
	const navigate = useNavigate()
	const location = useLocation()
	let initValue = location.search ? location.search.split('=')[1] : 'FromCollectUser'
	const [value, setValue] = React.useState<string>(initValue)

	// 要新添加 ? 自定义表单控件、多表单联动、内联登陆栏、普通登陆框、注册新用户、弹出层中的新建表单、时间类控件、自行处理表单数据
	const handleChange = (value: string) => {
		setValue(value)
		navigate(`/form/basicForm?select=${value}`)
	}
	// return (
	// 	<React.Fragment>
	// 		<Card className="mb10">
	// 			<Title level={4} className="mb15">
	// 				基础表单
	// 			</Title>
	// 			<SelectComp handleChange={handleChange} initValue={initValue} />
	// 		</Card>
	// 		{/* <Card className="max-w-[800px]">
	// 			{/* <FomCollectUser value={value} /> {/* 收集用户信息 */}
	// 			<FormBasic value={value} /> {/* 表单使用 */}
	// 			<FormLayout value={value} /> {/* 表单布局 */}
	// 			<FormDisabled value={value} /> {/* 禁用表单 */}
	// 			<FormSize value={value} /> {/* 表单尺寸 */}
	// 			<FormLogin value={value} /> {/* 普通登陆 */}
	// 			<FormRegister value={value} /> {/* ! 新用户注册 */}
	// 			<FormModal value={value} /> {/* ! 弹窗 */}
	// 			<FormTime value={value} /> {/* ! 时间类 */}
	// 			<FormWithout value={value} /> {/* ! 自行处理表单 */}
	// 			<FormValidateStatic value={value} /> {/* 自定义校验 */}
	// 			<FormValidateOther value={value} /> 校验其他组件 */}
	// 		</Card> */}
	// 	</React.Fragment>
	// )
}

export default BasicForm
