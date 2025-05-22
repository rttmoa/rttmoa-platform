import React from 'react'
import './index.less'
import { Button } from 'antd'

// 点击粒子效果
export default function GrainButton() {
	// @button-active-animation: https://codepen.io/xboxyan/pen/xxbYYmr
	return <button className="button">Button</button>
	return (
		<Button className="button" size="middle">
			新建
		</Button>
	)
}
// antd button Api:
// 		block
// 		danger
// 		disabled
// 		ghost
// 		href
// 		htmlType
// 		icon
// 		loading
// 		shape
// 		size
// 		target
// 		type
// 		onClick
