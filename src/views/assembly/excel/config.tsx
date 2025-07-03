import { Input } from 'antd';
import { useState } from 'react';

const Config = () => {
	const [editedCells, setEditedCells] = useState<{ [key: string]: boolean }>({});

	const dataSource = [
		{
			key: 0,
			序号: 1,
			学科: 'Java',
			项目名称: '苍穹外卖',
			端: '管理后台',
			账号: 'demo',
			密码: '525itheima.CN032@.当前日期',
			公共: 'common',
		},
		{
			key: 1,
			序号: 2,
			学科: 'Java',
			项目名称: '帝可得',
			端: '管理后台',
			账号: 'demo',
			密码: '123itheima.CN032@.当前日期',
			公共: 'common',
		},
		{
			key: 2,
			序号: 1,
			学科: 'Java',
			项目名称: '帝可得',
			端: '商户端',
			账号: 12000000000,
			密码: '321itheima.CN032@.当前日期',
			公共: 'common',
		},
		{
			key: 3,
			序号: 3,
			学科: 'Java',
			项目名称: '天机学堂',
			端: '管理后台',
			账号: 12088888888,
			密码: '666itheima.CN032@.当前日期',
			公共: 'common',
		},
		{
			key: 4,
			序号: 1,
			学科: 'Java',
			项目名称: '帝可得',
			端: '用户端',
			账号: 12077777777,
			密码: '888itheima.CN032@.当前日期',
			公共: 'common',
		},
	];
	const [data, setData] = useState(dataSource);
	// 修改数据并记录已修改的单元格
	const changeTableData = (value: any, rowIndex: number, dataIndex: string) => {
		const newData: any = [...data];
		newData[rowIndex][dataIndex] = value;
		setData(newData);

		const cellKey = `${rowIndex}_${dataIndex}`;
		setEditedCells(prev => ({ ...prev, [cellKey]: true }));
	};

	const column = [
		{
			title: '序号',
			dataIndex: '序号',
			key: '序号',
			align: 'center',
		},
		{
			title: '学科',
			dataIndex: '学科',
			key: '学科',
			align: 'center',
			// render: (text: any, record: any, index: number) => {
			// 	const key = `${index}_学科`;
			// 	const isEdited = editedCells[key];
			// 	return (
			// 		<Input
			// 			// bordered={false}
			// 			defaultValue={text}
			// 			style={{
			// 				backgroundColor: isEdited ? '#fff2ac' : undefined,
			// 				textAlign: 'center',
			// 			}}
			// 			onBlur={e => changeTableData(e.target.value, index, '学科')}
			// 		/>
			// 	);
			// },
		},
		{
			title: '项目名称',
			dataIndex: '项目名称',
			key: '项目名称',
			align: 'center',
			// render: (text: any, record: any, index: number) => {
			// 	const key = `${index}_项目名称`;
			// 	const isEdited = editedCells[key];
			// 	return (
			// 		<Input
			// 			defaultValue={text}
			// 			style={{
			// 				backgroundColor: isEdited ? '#fff2ac' : undefined,
			// 				textAlign: 'center',
			// 			}}
			// 			onBlur={e => changeTableData(e.target.value, index, '项目名称')}
			// 		/>
			// 	);
			// },
		},
		{
			title: '端',
			dataIndex: '端',
			key: '端',
			align: 'center',
		},
		{
			title: '账号',
			dataIndex: '账号',
			key: '账号',
			align: 'center',
		},
		{
			title: '密码',
			dataIndex: '密码',
			key: '密码',
			align: 'center',
		},
		{
			title: '公共',
			dataIndex: '公共',
			key: '公共',
			align: 'center',
		},
	];

	return {
		column,
		dataSource,
	};
};

export default Config;
