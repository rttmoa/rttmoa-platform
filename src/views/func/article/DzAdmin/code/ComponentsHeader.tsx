import React from 'react';

const ComponentsHeader = 
`import React, { Component } from "react";
import {
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Button, Modal, Dropdown, Menu } from "antd";
import PubSub from "pubsub-js";
import "./index.less";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { doLogout } from "../../redux/actions";
import i18next from "../../i18n";
import Cookie from "js-cookie";

const { Header } = Layout;

class HeaderNav extends Component {
  state = {
    locale: "",
  };

  toggle = () => {
    //发布消息
    PubSub.publish("collapsed", !this.props.collapsed);
  };

  constructor(props) {
    super(props);
    if (Cookie.get("lang") === undefined) {
      Cookie.set("lang", "CN");
      this.state.locale = i18next.t("zh");
    } else {
      if (Cookie.get("lang") === "CN") {
        Cookie.set("lang", "CN");
        this.state.locale = i18next.t("cn");
      } else if (Cookie.get("lang") === "EN") {
        Cookie.set("lang", "EN");
        this.state.locale = i18next.t("en");
      }
    }
  }

  onClick = (key) => {
    Cookie.set("lang", key.key);
    //设置语言
    i18next.changeLanguage(key.key.toUpperCase());
    this.setState({ locale: i18next.t(key.key.toUpperCase()) });
    window.location.reload();
  };
  logout = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确认要退出吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        this.props.doLogout("");
        this.props.history.replace("/login");
      },
    });
  };

  render() {
    const menu = (
      <Menu selectedKeys={[Cookie.get("lang")]} onClick={this.onClick}>
        <Menu.Item key="EN">{i18next.t("en")}</Menu.Item>
        <Menu.Item key="CN">{i18next.t("cn")}</Menu.Item>
      </Menu>
    );
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {/* 这是创建的发布订阅按钮 */}
        {React.createElement(
          this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: this.toggle,
          }
        )}
        <div className="logout">
          <span>
            {i18next.t("welcome")}
            {this.props.user.username}
            <Button onClick={this.logout} type="link">
              {i18next.t("logout")}
            </Button>
            <Dropdown overlay={menu}>
              <Button
                type="link"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {this.state.locale} <DownOutlined />
              </Button>
            </Dropdown>
          </span>
        </div>
      </Header>
    );
  }
}

export default connect((state) => ({ user: state.user }), { doLogout })(
  withRouter(HeaderNav)
);
`

export default ComponentsHeader;