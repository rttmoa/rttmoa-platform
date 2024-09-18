import { lazy } from 'react'
import { getFlatMenuList } from '@/utils'
import { Navigate } from 'react-router-dom'
import { RouteObjectType } from '../interface'
import RouterGuard from './RouterGuard' // 路由守卫组件
import LayoutIndex from '@/layouts' // 布局 Layouts
import LazyComponent from '@/components/Lazy' // 懒加载 Lazy

/**
 * @description TODO: Convert menuList to the format required by react-router
 * @param {Array} authMenuList Permissions menu list
 * @returns {Array} The routing format required by the react-router
 */
// TODO: 接口菜单列表 转换为 动态路由器格式
// 1、将传递的菜单列表，转换为扁平化的数组
// 2、重新处理扁平化的数组 flatMenuList 中 item
// 3、导入 views 目录下的所有 view 文件
// 4、将导入的view文件，变成 Lazy 懒加载格式
// 5、Lazy Component 添加 <RouterGuard />
// 6、路由守卫组件；Title、路由白名单、权限校验、登录拦截
// 7、处理dynamicRouter数组，是否有 isFull 属性，有则为全屏
// 8、最终返回动态路由器 dynamicRouter
const modules = import.meta.glob('@/views/**/*.tsx') as Record<string, Parameters<typeof lazy>[number]>
export const convertToDynamicRouterFormat = (authMenuList: RouteObjectType[]) => {
	const flatMenuList = getFlatMenuList(authMenuList)
	// console.log("扁平化数组：", authMenuList, flatMenuList); // 接口中菜单 转换 react-router格式：(12) Array [{…},....]  -->  (66) Array [{…},....]

	// 重新处理 flatMenuList 数组
	const handleMenuList = flatMenuList.map(item => {
		item.children && delete item.children

		if (item.redirect) item.element = <Navigate to={item.redirect} />

		// 将 element 转换为 antd 组件,  提前处理懒加载，在Layout中正常加载就可以
		if (item.element && typeof item.element == 'string') {
			const Component = LazyComponent(lazy(modules['/src/views' + item.element + '.tsx'])) // item.element： /home/index | /menu/menu2/menu21/index
			item.element = <RouterGuard>{Component}</RouterGuard> // ? 路由守卫组件；Title、路由白名单、权限校验、登录拦截
		}

		item.loader = () => {
			return { ...item.meta, redirect: !!item.redirect }
		}
		return item
	})

	const dynamicRouter: RouteObjectType[] = [{ element: <LayoutIndex />, children: [] }] // [{element: {…}, children: Array(0)}]

	// isFull 是否全屏，动态处理数组，全屏的页面为，"No Layout"，"数据大屏"
	handleMenuList.forEach(item => {
		if (item.meta?.isFull) dynamicRouter.push(item)
		else dynamicRouter[0].children?.push(item)
	})

	return dynamicRouter
}
