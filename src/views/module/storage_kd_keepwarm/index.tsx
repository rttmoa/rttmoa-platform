import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.less';
import Warm from './components/Warm';
import Lay1 from './components/Lay1';
import Lay2 from './components/Lay2';
import Lay3 from './components/Lay3';
const onChange = (key: string) => {
	console.log(key);
};

const items: TabsProps['items'] = [
	{
		key: '0',
		label: '保温库',
		children: <Warm />,
	},
	{
		key: '1',
		label: '保温库 一层',
		children: <Lay1 />,
	},
	{
		key: '2',
		label: '保温库 二层',
		children: <Lay2 />,
	},
	{
		key: '3',
		label: '保温库 三层',
		children: <Lay3 />,
	},
];
const Storage: React.FC = () => {
	return (
		<div className='scada-container'>
			<Card className='w-full'>
				<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
			</Card>
		</div>
	);
};

export default Storage;
