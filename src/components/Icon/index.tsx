import React from 'react';
import * as Icons from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

interface IconProps {
	name: string;
	className?: string;
}

export const Icon: React.FC<IconProps> = React.memo(({ name, className }) => {
	try {
		const customIcons: { [key: string]: any } = Icons;
		const IconComponent = customIcons[name];
		// console.log('IconComponent', typeof IconComponent); // {$$typeof: Symbol(react.forward_ref), render: ƒ}
		if (IconComponent && typeof IconComponent === 'object') {
			return React.createElement(IconComponent, { className });
		} else {
			console.log(`⚠️ Icon组件： "${name}" 不存在于 @ant-design/icons 中`);
			return null;
		}
	} catch (error) {
		console.log('Icon组件：error', error);
		return null;
	}
});
// 使用；<Icon name="AppstoreOutlined" />

export const IconFont = createFromIconfontCN({
	scriptUrl: ['//at.alicdn.com/t/c/font_3878708_l04g6iwc6y.js' as string],
});
// 使用；<IconFont style={{ fontSize: 22 }} type="icon-xiala" />
