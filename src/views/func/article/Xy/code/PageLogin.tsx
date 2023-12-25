import React from 'react';

const PageLogin =
`import React, { Component } from "react";
import "./index.less";
import logo from "./images/logo.png";
import { Redirect } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { doLogin } from "../../redux/actions";

class Login extends Component {
  onFinish = (user) => {
    // console.log(user) // {。username: 'admin', password: 'admin'}
    // return
    this.props.doLogin(user);
  };

  render() {
    // console.log(this.props)
    //如果用户已经登录跳转到主页
    if (this.props.user) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div className="login">
        <header className="login-header">
          <img alt="logo" src={logo} />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                  { min: 4, message: "最少长度为4位" },
                  { max: 12, message: "最大长度为12位" },
                  {
                    pattern: /^[0-9a-zA-Z_]{1,}$/,
                    message: "必须为数字，字母，下划线组成",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    whitespace: false,
                    message: "Please input your Username!",
                  },
                  { min: 4, message: "最少长度为4位" },
                  { max: 12, message: "最大长度为12位" },
                  {
                    pattern: /^[0-9a-zA-Z_]{1,}$/,
                    message: "必须为数字，字母，下划线组成",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { doLogin })(Login);
`

export default PageLogin;