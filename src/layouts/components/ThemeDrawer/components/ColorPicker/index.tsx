/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { Input } from 'antd'
import { HexColorPicker } from 'react-colorful'
import { isHexColor } from '@/utils/is'
import { convertToSixDigitHexColor } from '@/utils'

import { setGlobalState } from '@/redux/modules/global'
import { RootState, useDispatch, useSelector } from '@/redux'
import './index.less'

const presetColors = ['#1677FF', '#00B96B', '#E0282E', '#DAA96E', '#0C819F', '#409EFF', '#FF5C93', '#E74C3C', '#27AE60', '#FD726D', '#F39C12', '#9B59B6']

// todo
// todo 颜色挑选  (全局主题 / 主题颜色设置)
const ColorPicker = () => {
	const dispatch = useDispatch()
	const primary = useSelector((state: RootState) => state.global.primary)
	const [inputPrimary, setInputPrimary] = useState(primary) // 设置输入框内的 HEX：#1677FF

	const changePrimary = (value: string) => {
		dispatch(setGlobalState({ key: 'primary', value }))
	}
	const onChageEvent = (params: any) => {
		changePrimary(params)
		setInputPrimary(params)
	}
	return (
		// ! 随机选择颜色 || 按钮选择颜色
		<div className="color-picker">
			<HexColorPicker
				color={primary}
				onChange={e => {
					onChageEvent(e.toLocaleUpperCase())
				}}
			/>
			<Input
				value={inputPrimary}
				className="picker-input"
				addonBefore="HEX"
				onChange={e => setInputPrimary(e.target.value)}
				onBlur={e => {
					if (isHexColor(e.target.value)) {
						let value = e.target.value
						if (e.target.value[0] !== '#') value = `#${e.target.value}`
						changePrimary(convertToSixDigitHexColor(value))
						setInputPrimary(convertToSixDigitHexColor(value))
					}
				}}
			/>
			<div className="picker-swatches">
				{presetColors.map(presetColor => (
					<button
						className="picker-swatch"
						key={presetColor}
						style={{ background: presetColor }}
						onClick={() => {
							onChageEvent(presetColor)
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default ColorPicker
