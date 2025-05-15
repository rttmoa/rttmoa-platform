import React from 'react'
import { QqOutlined, WechatOutlined } from '@ant-design/icons'

const LoginLogo = () => {
	return (
		<div className="login-logo flex   items-center">
			<span className="font-mono text-[12px] text-slate-900 mr-3">Other login methods</span>
			<span className="mr-4">
				<a href="#">{<WechatOutlined />}</a>
			</span>
			<span>
				<a href="#">{<QqOutlined />}</a>
			</span>
		</div>
	)
}

export default LoginLogo
