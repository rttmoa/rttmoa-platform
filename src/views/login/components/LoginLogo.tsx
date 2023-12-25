import React from "react";
import { QqOutlined, WechatOutlined } from "@ant-design/icons";

const LoginLogo = () => {
  return (
    <div className="login-logo">
      <span>{<QqOutlined />}</span>{" "}
      <a href="#" className="link">
        QQ
      </a>{" "}
      | <span>{<WechatOutlined />}</span>{" "}
      <a href="#" className="link">
        微信
      </a>
    </div>
  );
};

export default LoginLogo;
