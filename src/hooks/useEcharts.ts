import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
/**
 * @description 使用Echarts(只是为了添加图表响应式)
 * @param {Element} data 数据 目前只针对于次Hooks-admin里一些data都是写死在options 所以data为可选 根据项目自行修改即可
 * @param {Object} options 绘制Echarts的参数(必传)
 * @return chart
 * @link echarts https://echarts.apache.org/examples/zh/index.html
 * */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: any) => {
	// 饼图	- Gitee / GitHub 访问量占比
	// 柱状图	- 数据来源
	// TODO: 所有Charts都会使用此组件 useEcharts
	const myChart = useRef<echarts.EChartsType>()
	const echartsRef = useRef<HTMLDivElement>(null)

	const echartsResize = () => {
		echartsRef && myChart?.current?.resize()
	}

	useEffect(() => {
		if (data?.length !== 0) {
			myChart?.current?.setOption(options)
		}
	}, [data])

	useEffect(() => {
		if (echartsRef?.current) {
			myChart.current = echarts.init(echartsRef.current as HTMLDivElement)
		}
		myChart?.current?.setOption(options)
		window.addEventListener('resize', echartsResize, false) // TODO: resize: 尺寸宽度改变
		return () => {
			window.removeEventListener('resize', echartsResize)
			myChart?.current?.dispose()
		}
	}, [])

	return [echartsRef]
}
