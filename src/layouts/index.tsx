/* eslint-disable prettier/prettier */
import React from 'react'
import { Watermark } from 'antd'
import { RootState, useSelector } from '@/redux'
import LayoutVertical from './LayoutVertical'
import LayoutClassic from './LayoutClassic'
import LayoutTransverse from './LayoutTransverse'
import LayoutColumns from './LayoutColumns'
import ThemeDrawer from '@/layouts/components/ThemeDrawer' // todo 侧边 主题配置

// TODO: Layouts 同步加载页面    (封装过程：水印、四种布局方式、主题配置遮罩)
const LayoutIndex: React.FC = () => {
	const layout = useSelector((state: RootState) => state.global.layout) // vertical | classic | transverse | columns
	const watermark = useSelector((state: RootState) => state.global.watermark)

	// ? 分析页面结构：HTML + CSS 如何布局
	const LayoutComponents = {
		vertical: <LayoutVertical />, // ! ------ 一、纵向
		classic: <LayoutClassic />, // ! -------- 二、经典
		transverse: <LayoutTransverse />, // ! -- 三、横向
		columns: <LayoutColumns />, // ! --------- 四、分栏 (测试分栏)
	}

	return (
		<Watermark className="watermark-content" zIndex={1001} content={watermark ? ['Watermark Content', 'Happy Working'] : []}>
			{LayoutComponents[layout]}
			<ThemeDrawer />
		</Watermark>
	)
}

export default LayoutIndex
