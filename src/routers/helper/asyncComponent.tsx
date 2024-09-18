import React from 'react'
import NProgress from '@/config/nprogress'

// 菜单配置：路由懒加载组件
export default (loadComponent: any) =>
	class AsyncComponent extends React.Component {
		state: {
			Component: null | any
		} = {
			Component: null,
		}
		async componentDidMount() {
			if (this.state.Component !== null) return

			try {
				const { default: Component } = await loadComponent()
				this.setState({ Component })
			} catch (err) {
				console.error(`Cannot load component in <AsyncComponent />`)
				throw err
			}
			NProgress.done()
		}

		render() {
			const { Component } = this.state
			return Component ? <Component {...this.props} /> : null
		}
	}

// import asyncComponent from "asyncComponent";
// const _import_components = (dirName: string) => asyncComponent(() => import(`components/${dirName}`));
// const _import_views = (dirName: string) => asyncComponent(() => import(`views/${dirName}`));
// const routerConfig = [
//   {
//     path: "/",
//     exact: true,
//     login: true,
//     layout: true,
//     icon: "user",
//     name: "首页",
//     component: _import_views("Home")
//   },
//   {
//     path: "/auth",
//     login: true,
//     layout: true,
//     icon: "lock",
//     name: "权限管理",
//     role: ["admin"],
//     component: _import_views("Auth")
//   }
// ];
