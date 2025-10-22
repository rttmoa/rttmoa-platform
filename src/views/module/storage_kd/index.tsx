import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.less';
import Lane1 from './components/Lane1';
import Lay1 from './components/Lay1';
const onChange = (key: string) => {
	console.log(key);
};

const items: TabsProps['items'] = [
	{
		key: '0',
		label: '保温库',
		children: <Lane1 />,
	},
	{
		key: '1',
		label: '保温库 一层',
		children: <Lay1 />,
	},
];
const Storage: React.FC = () => {
	return (
		<div className='scada-container flex h-full'>
			<Card className='w-full h-full'>
				<Tabs defaultActiveKey='1' items={items} onChange={onChange} />
			</Card>
		</div>
	);
};

export default Storage;
