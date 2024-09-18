import React from 'react'
import * as Icons from '@ant-design/icons'
import { createFromIconfontCN } from '@ant-design/icons'

interface IconProps {
	name: string
	className?: string
}

export const Icon: React.FC<IconProps> = React.memo(({ name, className }) => {
	const customIcons: { [key: string]: any } = Icons
	return React.createElement(customIcons[name], { className })
})
// 使用；<Icon name="AppstoreOutlined" />

export const IconFont = createFromIconfontCN({
	scriptUrl: ['//at.alicdn.com/t/c/font_3878708_l04g6iwc6y.js' as string],
})
// 使用；<IconFont style={{ fontSize: 22 }} type="icon-xiala" />
