import { useEffect } from 'react'
import { theme } from 'antd'
import { shallowEqual } from 'react-redux'
import { RootState, useSelector } from '@/redux'
import { setStyleProperty } from '@/utils'
import { getLightColor, getDarkColor } from '@/utils/color'
import siderTheme from '@/styles/theme/sider'
import headerTheme from '@/styles/theme/header'
import globalTheme from '@/styles/theme/global'

type ThemeType = 'light' | 'inverted' | 'dark'

/**
 * @description  use Hooks 设置全局主题颜色 （routers/index.tsx 中 刷新页面调用此函数）
 */
const useTheme = () => {
	const { token } = theme.useToken() // ? antd TS token: GlobalToken
	// console.log(token); // 很多CSS属性： {blue: '#1677ff', purple: '#722ED1', cyan: '#13C2C2', green: '#52C41A', magenta: '#EB2F96', …}

	const { isDark, primary, isGrey, isWeak, borderRadius, compactAlgorithm, siderInverted, headerInverted } = useSelector((state: RootState) => {
		// console.log("获取全局属性：", state.global);
		return {
			isDark: state.global.isDark,
			primary: state.global.primary,
			isGrey: state.global.isGrey,
			isWeak: state.global.isWeak,
			borderRadius: state.global.borderRadius,
			compactAlgorithm: state.global.compactAlgorithm,
			siderInverted: state.global.siderInverted,
			headerInverted: state.global.headerInverted,
		}
	}, shallowEqual)

	// 测试；
	// document.documentElement.style.filter = "invert(80%)";
	// document.documentElement.style.filter = "grayscale(1)";
	// document.documentElement.setAttribute("class", "dark");

	// TODO: 切换黑暗模式
	useEffect(() => switchDark(), [isDark])
	const switchDark = () => {
		const html = document.documentElement
		// console.log("切换黑暗模式");
		html.setAttribute('class', isDark ? 'dark' : '')
		changePrimary()
	}

	// TODO: 切换 主题颜色
	useEffect(() => changePrimary(), [primary, borderRadius, compactAlgorithm])
	const changePrimary = () => {
		const type: ThemeType = isDark ? 'dark' : 'light'
		// custom less variable
		Object.entries(globalTheme[type]).forEach(([key, val]) => setStyleProperty(key, val))
		// antd less variable
		Object.entries(token).forEach(([key, val]) => setStyleProperty(`--hooks-${key}`, val))
		// antd primaryColor less variable
		for (let i = 1; i <= 9; i++) {
			// console.log("primaryColor", getLightColor(primary, i / 10));
			setStyleProperty(`--hooks-colorPrimary${i}`, isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`)
		}
	}

	// TODO: 切换在 灰色模式 | 色弱模式
	useEffect(() => changeGreyOrWeak(), [isGrey, isWeak])
	const changeGreyOrWeak = () => {
		const html = document.documentElement
		html.style.filter = isWeak ? 'invert(80%)' : isGrey ? 'grayscale(1)' : ''
	}

	// TODO: 切换 侧边栏反转色
	useEffect(() => changeSiderTheme(), [isDark, siderInverted])
	const changeSiderTheme = () => {
		const type: ThemeType = isDark ? 'dark' : siderInverted ? 'inverted' : 'light'
		Object.entries(siderTheme[type]).forEach(([key, val]) => setStyleProperty(key, val))
	}

	// TODO: 切换 头部反转色
	useEffect(() => changeHeaderTheme(), [isDark, headerInverted])
	const changeHeaderTheme = () => {
		const type: ThemeType = isDark ? 'dark' : headerInverted ? 'inverted' : 'light'
		Object.entries(headerTheme[type]).forEach(([key, val]) => setStyleProperty(key, val))
	}
}

export default useTheme
