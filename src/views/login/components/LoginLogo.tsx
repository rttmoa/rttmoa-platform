import React from "react";
import { QqOutlined, WechatOutlined } from "@ant-design/icons";

const LoginLogo = () => {
	return (
		<div className="login-logo">
			<span className="mr-4">
				<a href="#">{<QqOutlined />}</a>
			</span>
			<span>
				<a href="#">{<WechatOutlined />}</a>
			</span>
		</div>
	);
};

export default LoginLogo;
