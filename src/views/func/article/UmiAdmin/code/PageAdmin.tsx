const Admin = 
`import React, {Component} from 'react';
import {Layout} from 'antd';
import './index.less'
import SiderNav from "../../components/Sider";
import HeaderNav from "../../components/Header";
import ContentNav from "../../components/Content";
import FooterNav from "../../components/Footer";
import BreadcrumbNav from "../../components/BreadcrumbNav";
import PubSub from 'pubsub-js';      //-->  发布订阅模式
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from "../Home";
import Category from "../Category";
import Product from "../Product";
import Role from "../Role";
import User from "../User";
import Bar from "../Charts/bar";
import Line from "../Charts/line";
import Pie from "../Charts/pie";
import {getUser} from '../../utils/storaUtil';
import Error from "../Error";
 

// TODO: 封装后台管理布局：Header、侧边栏、面包屑、Content、Footer
class Admin extends Component {

    state = {
        collapsed: false,
    }

    // 初始化事件
    componentDidMount() {
        // 订阅消息
        this.token = PubSub.subscribe('collapsed', (_, collapsed) => { // tabBar的展开与收缩
            // console.log(collapsed)
            this.setState({collapsed: collapsed})
        });
    }

    // 卸载事件
    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }
 
    render() {

        // console.log(getUser()) // 对象格式的数据
        if (!getUser()) {
            return <Redirect to="/login"></Redirect>
        }
        return (
            <>
                <Layout id="components-layout-demo-custom-trigger">

                    <SiderNav collapsed={this.state.collapsed} />
                    
                    <Layout className="site-layout">

                        <HeaderNav collapsed={this.state.collapsed} />

                        <BreadcrumbNav />

                        <ContentNav>
                            {/*注册二级路由*/}
                            <Switch>
                                {/*开启严格匹配*/}
                                <Redirect exact from="/" to="/home"></Redirect>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/product" component={Product}></Route>
                                <Route path="/category" component={Category}></Route>
                                <Route path="/role" component={Role}></Route>
                                <Route path="/user" component={User}></Route>

                                <Route path="/charts/bar" exact component={Bar}></Route>
                                <Route path="/charts/line" exact component={Line}></Route>
                                <Route path="/charts/pie" exact component={Pie}></Route>
                                {/*配置404页面*/}
                                <Route component={Error}></Route>
                            </Switch>
                        </ContentNav >
                        
                        <FooterNav />

                    </Layout>
                </Layout>
            </>
        );
    }
}`

export default Admin;