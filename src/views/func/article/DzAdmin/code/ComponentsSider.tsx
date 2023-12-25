import React from 'react';

const ComponentsSider = 
`import React, { Component } from "react";
import { Layout, Menu } from "antd";
import "./index.less";
import logo from "../../pages/Login/images/logo.png";
import { Link, withRouter } from "react-router-dom";
//菜单列表
import menuList from "../../config/menuConfig";
import { getUser } from "../../utils/storaUtil";

const { Sider } = Layout;
const { SubMenu } = Menu;

/***--- 侧边栏 ---**/
class SiderNav extends Component {
  /**
   * 根据menu的数据数组生成对应的标签按钮
   * @param menuList
   */
  getMenuNodes = (menuList) => {
    // console.log(menuList)
    //当前选择的路由路径
    const pathname = this.props.location.pathname;
    //得到需要打开的菜单项的openKey
    return menuList.map((item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          return (
            // 一级菜单
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key}>{item.title}</Link>
            </Menu.Item>
          );
        } else {
          //查找一个与当前请求路径匹配的子item
          const cItem = item.children.find(
            (child) => pathname.indexOf(child.key) === 0
          );
          if (cItem) {
            //如果存在，说明当前item的子节点需要展开
            this.openKey = item.key;
          }
          return (
            // 二级菜单 - 子菜单
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          );
        }
      }
    });
  };

  // 判断当前登录用户是否有哪些显示权限菜单
  hasAuth = (item) => {
    //menuList里面的key
    const { isPublic, key } = item;
    //获取登录用户的权限
    const menus = getUser().role.menus;
    const username = getUser().username;
    /**
     * 1.如果当前用户是admin
     * 2.如果当前item是公开的
     * 3.当前用户有此item的权限，key有没有在item中
     */
    if (username === "admin" || isPublic || menus.indexOf(key) !== -1) {
      return true;
    } else if (item.children) {
      //如果当前用户有此item的某个子item的权限
      return !!item.children.find((child) => menus.indexOf(child.key) !== -1);
    }
    return false;
  };

  /**
   * 在第一次render()之前执行,用户获取用户选择的节点是否需要展开，
   * 实现对this.openKey提前赋值，这样render()方法执行就直接取了
   */
  constructor(props) {
    super(props);
    this.menuNodes = this.getMenuNodes(menuList);
  }

  render() {
    //当前选择的路由路径
    let pathname = this.props.location.pathname;
    //得到需要展开的菜单项key
    const openKey = this.openKey;

    //设置子路由也选中比如/product/detail
    if (pathname.indexOf("/product") === 0) {
      pathname = "/product";
    }
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <Link to="/" className="logo">
          <img className="img" src={logo} alt={logo} />
          <span className="font">夕颜后台</span>
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={[openKey]}
          selectedKeys={[pathname]}
        >
          {this.menuNodes}
        </Menu>
      </Sider>
    );
  }
}

//withRouter让一般组件拥有路由组件的功能属性
export default withRouter(SiderNav);`

export default ComponentsSider;
