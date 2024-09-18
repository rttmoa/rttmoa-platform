import { useState, useEffect } from 'react'
import { RouterProvider as Router, RouteObject, createHashRouter, createBrowserRouter } from 'react-router-dom'
import { convertToDynamicRouterFormat } from './helper/ConvertRouter'
import { wrappedStaticRouter } from './modules/staticRouter' // 静态 Router
import { RootState, useSelector } from '@/redux'
import { RouteObjectType } from './interface'
import useTheme from '@/hooks/useTheme'
import useMessage from '@/hooks/useMessage'
import usePermissions from '@/hooks/usePermissions'
import NotFound from '@/components/Error/404'
const mode = import.meta.env.VITE_ROUTER_MODE

// TODO: 路由  <RouterProvider />
// ! 1、处理全局主题颜色
// ! 2、处理全局 Message
// ! 3、处理用户权限 (用户按钮权限 | 用户菜单权限)
// ! 4、合并 静态路由 和 动态路由
const RouterProvider: React.FC = () => {
	// console.log("登陆成功/刷新页面 进入 routers");

	useTheme() //    ! 设置全局主题颜色
	useMessage() //  ! 设置消息
	// Watermark({ content: "rttmoa", container: document.getElementById("root") });

	const { initPermissions } = usePermissions()

	const token = useSelector((state: RootState) => state.user.token)
	const authMenuList = useSelector((state: RootState) => state.auth.authMenuList) // ! authMenuList: 接口中获取的菜单列表
	const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter) // ! 静态路由 -> 所有路由

	useEffect(() => {
		// 刷新页面时，redux 中没有菜单列表
		if (!authMenuList.length) {
			initPermissions(token)
			return
		}

		const dynamicRouter = convertToDynamicRouterFormat(authMenuList) // ! 处理动态路由； 接口菜单列表 转换为 react-router 所需的路由结构
		let allRouter = [...wrappedStaticRouter, ...dynamicRouter]

		allRouter.forEach(item => item.path === '*' && (item.element = <NotFound />)) // 为了防止404刷新页面，在最后添加*路由

		setRouterList(allRouter)
	}, [authMenuList])

	// console.log(routerList); // 6个static + 3个dynamic； Array (9)[{…}, ...]
	const routerMode = {
		hash: () => createHashRouter(routerList as RouteObject[]),
		history: () => createBrowserRouter(routerList as RouteObject[]),
	}
	return <Router router={routerMode[mode]()} />
	// Props：<Route path={item.path} exact={item.exact} render={item.render} key={index} component {...props} />
}

export default RouterProvider
