import React from 'react';

const ComponentsRole = 
`import React, { Component } from "react";
import { Button, Form, Input, message, Tree } from "antd";
import menuList from "../../config/menuConfig";
import { update } from "../../api/role";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { doLogout } from "../../redux/actions";

/***--- 设置角色权限 树结构 ---**/
class AuthFrom extends Component {
  // 初始化
  constructor(props) {
    // props 中可以从 Redux 中获取数据
    super(props);
    // console.log(props)
    // console.log(props.rowRole)
    this.state.checkedKeys = props.rowRole.menus;
    this.state.roleName = props.rowRole.name;
  }
  state = {
    checkedKeys: [],
    roleName: "",
  };
  // 修改事件
  auth = () => {
    // console.log(this.props.user,  this.props.rowRole._id)
    // return
    const { _id } = this.props.rowRole;
    const menus = this.state.checkedKeys;
    const auth_time = new Date().getTime(); // 1667816575119
    const auth_name = this.props.user.username; // "admin"
    const data = { _id, menus, auth_time, auth_name };
    update(data).then((res) => {
      if (res.status === 0) {
        // 如果修改是自己的用户权限，强制退出
        if (_id === this.props.user.role_id) {
          message.warning("当前权限已更新，请重新登录");
          this.props.doLogout("");
          this.props.history.replace("/login");
        } else {
          message.success("修改成功");
          //隐藏模态框
          this.props.handleCancel();
          //修改成功后重新加载数据
          this.props.init();
          //设置tree为最新的menus
          this.props.rowRole.menus = menus;
        }
      } else message.error("更新失败");
    });
  };
  // 点击树形复选框触发事件
  onCheck = (checkedKeys) => {
    // console.log(checkedKeys) //(10) ['/home', '/products', '/category', '/product', '/charts', '/charts/bar', '/charts/line', '/charts/pie', '/role', '/user']
    this.setState({ checkedKeys });
  };

  render() {
    const { checkedKeys, roleName } = this.state;
    // console.log(roleName, checkedKeys)
    return (
      <Form onFinish={this.auth} initialValues={{ name: roleName }}>
        <Form.Item label="角色名称" name="name">
          <Input disabled placeholder="请输入角色名称" />
        </Form.Item>

        <Form.Item>
          <Tree
            checkable
            checkedKeys={{ checked: checkedKeys }}
            defaultExpandAll
            treeData={menuList}
            onCheck={this.onCheck}
          />
        </Form.Item>

        <Form.Item>
          <Button onClick={this.props.handleCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            授权
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
export default connect((state) => ({ user: state.user }), { doLogout })(
  withRouter(AuthFrom)
); `

export default ComponentsRole;
