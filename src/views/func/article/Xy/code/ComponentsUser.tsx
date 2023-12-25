import React from 'react';

const ComponentsUser = 
`import React, { Component } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { add, update } from "../../api/user";

const { Option } = Select;

class AddUpdate extends Component {
  onFinish = (data) => {
    // console.log(data)
    // return
    if (this.props.title === "添加用户") {
      add(data).then((res) => {
        if (res.status === 0) {
          message.success("添加用户成功");
          this.props.handleCancel();
          this.props.init();
        }
      });
    } else {
      update(data).then((res) => {
        if (res.status === 0) {
          message.success("修改用户成功");
          this.props.handleCancel();
          this.props.init();
        }
      });
    }
  };

  render() {
    const { title, roleList, handleCancel, user } = this.props;
    // console.log(roleList)
    return (
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          _id: user._id,
          username: user.username,
          password: user.password,
          phone: user.phone,
          email: user.email,
          role_id: user.role_id,
        }}
        onFinish={this.onFinish}
      >
        <Form.Item hidden name="_id">
          <Input />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "用户名不能为空" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          hidden={title === "修改用户" ? true : false}
          label="密码"
          name="password"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: "手机号不能为空" },
            { pattern: /^1[3456789]d{9}$/, message: "手机号码不正确！" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: "邮箱不能为空" },
            {
              pattern:
                /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/,
              message: "邮箱格式不正确！",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="角色"
          name="role_id"
          rules={[{ required: true, message: "角色不能为空" }]}
        >
          <Select placeholder="请输入角色">
            {roleList.map((role) => {
              return (
                <Option key={role._id} value={role._id}>
                  {role.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            {title}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AddUpdate;`

export default ComponentsUser;
