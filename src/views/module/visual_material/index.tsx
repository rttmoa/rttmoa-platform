import React from 'react';
import { Card, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './index.less';
import Lane1 from './components/Warm';
import Lay1 from './components/Lay1';
import Lay2 from './components/Lay2';
import Lay3 from './components/Lay3';
const onChange = (key: string) => {
	console.log(key);
};

const items: TabsProps['items'] = [
	{
		key: '1',
		label: '原料库 一层',
		children: <Lay1 />,
	},
	{
		key: '2',
		label: '原料库 二层',
		children: <Lay2 />,
	},
	{
		key: '3',
		label: '原料库 三层',
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

//  E:\Project\upack\upack-haikouZY@2.1.85\rttmoa-platform-haikouZY\src\views\module\visual_material\components\common.tsx 这个文件中，
//  <div>123</div>header变量中<div>123</div>这个帮我修改成下拉框筛选条件，第一个条件是物料代码apiData接口数据中material_code__c字段，筛选条件中需要根据material_code__c字段去重，因为apiData数组中含有很多相同的material_code__c字段，选择material_code__c中数据时，表格中相同的material_code__c需要高亮显示，显示的颜色是："#2700f4", 第二个筛选条件是：batch__c需要是material_code__c中有的 | 第三个筛选条件是合同号字段contract__c合同号contract__c需要是material_code__c中有的、第四个筛选条件是柜号cabinet__c需要是material_code__c中有的
