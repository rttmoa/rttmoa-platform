import React from 'react'
import { Card, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import './index.less'
import Lane1 from './components/Lane1'
import Lane2 from './components/Lane2'
import Lane3 from './components/Lane3'
const onChange = (key: string) => {
	console.log(key)
}

// & 接口数据来自  E:\Project\upack\upack-nbzy@2.6.34\server\
const items: TabsProps['items'] = [
	{
		key: '1',
		label: '第一巷道',
		children: <Lane1 />,
	},
	{
		key: '2',
		label: '第二巷道',
		children: <Lane1 />,
	},
	{
		key: '3',
		label: '第三巷道',
		children: <Lane1 />,
	},
]
const Storage: React.FC = () => {
	return (
		<div className="scada-container flex">
			<Card className="w-full h-full">
				<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
			</Card>
		</div>
	)
}

export default Storage
