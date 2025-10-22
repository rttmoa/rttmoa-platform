import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import type { TableProps } from 'antd';
import './index.less';
import axios from 'axios';
import { ProSkeleton } from '@ant-design/pro-components';
import { RedoOutlined } from '@ant-design/icons';
import { moduleAPI } from '@/api/modules/module';

// ! http://localhost:9527/#/module/storage

interface DataType {
	key?: string;
	lane: number;
	row: number;
	layer: number;
	column1: number;
	column2: number;
	column3: number;
	column4: number;
	column5: number;
	column6: number;
	column7: number;
	column8: number;
	column9: number;
	column10: number;
	column12: number;
}

//* 表格提示框，鼠标悬停时显示的内容  ——  货位信息：货品名词、生产日期、在库整数总数
function titleFN(data: number, record?: any, index?: number, apiData?: any) {
	// console.log('titleFN', data, record, index, apiData);
	// return
	if (!data) {
		return <div className='py-1 px-2 text-center font-sans'>空</div>;
	}
	const row = record?.row__c ?? '';
	const layer = record?.lay__c ?? '';
	const str = `${row}排 - ${data}列 - ${layer}层`;

	const position = `0${row}0${layer}${data >= 10 ? data : '0' + data}`;

	const currStatus = apiData.filter((v: any) => v.position__c == position);

	function GetColor(data: any) {
		if (data && data.length && data[0]) {
			const status = data[0].status__c;
			if (status == '空') return '#03de6d';
			else if (status == '预占用') return '#f9a8d4';
			else if (status == '占用') return '#f95222';
			else if (status == '禁用') return '#b4b4b4';
			else return '#fff';
		} else {
			return '#fff';
		}
	}

	let color = GetColor(currStatus);
	// <div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#03de6d] text-[#ffffff]'>空库位</div>
	// 			<div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#f9a8d4] text-[#ffffff]'>预占用库位</div>
	// 			<div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#f95222] text-[#ffffff]'>占用</div>
	// 			<div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#b4b4b4] text-[#ffffff]'>禁用</div>
	return (
		<Tooltip
			placement='top'
			color='#fff'
			title={
				<table className='w-full border-collapse  text-slate-700 '>
					<tr>
						<th className='w-[250px] text-[12px] text-center'>仓位</th>
						<th className='w-[250px] text-[12px] text-center'>货品名词</th>
						<th className='w-[150px] text-[12px] text-center'>生产日期</th>
						<th className='w-[350px] text-[12px] text-center'>在库整数总数</th>
					</tr>
					<tr>
						<td className='  text-[12px] text-center'>{position}</td>
						<td className='  text-[12px] text-center'>食品火腿肠</td>
						<td className='  text-[12px] text-center'>2020-11-19 12:32:00</td>
						<td className='w-[350px] text-[12px] text-center'>500箱0根</td>
					</tr>
				</table>
			}
		>
			<div className='py-1 px-2 text-center font-sans' style={{ backgroundColor: color }}>
				{str}
			</div>
		</Tooltip>
	);
}

const columns = (apiData: any) => [
	{
		title: 'RowHead',
		dataIndex: 'key',
		width: 80,
		fixed: 'left',
		render: (value: any, record: any, index: any) => {
			return <b>{value}</b>;
		},
	},
	{
		title: '排',
		dataIndex: 'row__c',
		key: 'row__c',
		width: 50,
		fixed: 'left',
		render: (value: any, row: any, index: number) => {
			// 拿到当前行
			const currentRow = row.row__c;
			// console.log('currentRow', currentRow);

			// 查找前面的行
			const prevRow = groupedData[index - 1];
			if (prevRow && prevRow.row__c === currentRow) {
				// 如果上一行 lane、row 一样，说明应该被合并
				return {
					children: null,
					props: { rowSpan: 0 },
				};
			}
			// 计算有多少行是需要合并的
			let rowSpan = 1;
			for (let i = index + 1; i < groupedData.length; i++) {
				if (groupedData[i].row__c === currentRow) {
					rowSpan++;
				} else {
					break;
				}
			}
			return {
				children: <b>{value}</b>,
				props: { rowSpan },
			};
		},
	},
	{
		title: '层',
		dataIndex: 'lay__c',
		key: 'lay__c',
		width: 50,
		fixed: 'left',
		render: (value: any, row: any, index: number) => {
			// 拿到当前行
			const currentLay = row.lay__c;

			// 查找前面的行
			const prevRow = groupedData[index - 1];
			if (prevRow && prevRow.lay__c === currentLay) {
				// 如果上一行 lane、row 一样，说明应该被合并
				return {
					children: null,
					props: { rowSpan: 0 },
				};
			}
			// 计算有多少行是需要合并的
			let rowSpan = 1;
			for (let i = index + 1; i < groupedData.length; i++) {
				if (groupedData[i].lay__c === currentLay) {
					rowSpan++;
				} else {
					break;
				}
			}
			return {
				children: <b>{value}</b>,
				props: { rowSpan },
			};
		},
	},
	{
		title: '第 1 列',
		dataIndex: 'column1',
		key: 'column1',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 2 列',
		dataIndex: 'column2',
		key: 'column2',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 3 列',
		dataIndex: 'column3',
		key: 'column3',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 4 列',
		dataIndex: 'column4',
		key: 'column4',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 5 列',
		dataIndex: 'column5',
		key: 'column5',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 6 列',
		dataIndex: 'column6',
		key: 'column6',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 7 列',
		dataIndex: 'column7',
		key: 'column7',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 8 列',
		dataIndex: 'column8',
		key: 'column8',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 9 列',
		dataIndex: 'column9',
		key: 'column9',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 10 列',
		dataIndex: 'column10',
		key: 'column10',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 11 列',
		dataIndex: 'column11',
		key: 'column11',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 12 列',
		dataIndex: 'column12',
		key: 'column12',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
];
let groupedData: any[] = [];
const Lane: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]); // 处理后的值
	const [apiData, setApiData] = useState<DataType[]>([]); // 接口返回的值
	const [loading, setLoading] = useState<Boolean>(true);
	const [error, setError] = useState<String>('');
	async function execFunc() {
		try {
			setLoading(true);
			const { data }: any = await moduleAPI.getShelf_kd({});
			console.log('data =====', data);
			const rawData = data.data.filter((v: any) => v.lay__c == 1);
			// console.log('rawData', rawData);
			setApiData(rawData);
			rawData.forEach((item: any) => {
				const { row__c, lay__c, col__c } = item;
				const key = `${row__c}排 - ${lay__c}层`;

				let existing = groupedData.find(d => d.key === key);
				if (!existing) {
					existing = {
						key,
						row__c: row__c,
						lay__c: lay__c,
						// column1: null,
						// column2: null,
						...item,
					};
					groupedData.push(existing);
				}
				// 按列号填充 column1 ~ columnN
				existing[`column${col__c}`] = col__c;
			});
			console.log('处理后的rawData：', rawData); //* 总共24条
			console.log('合并 groupedData', groupedData); //* 总共8条    将库位数据合并

			// 📌 2️⃣ 处理 rowSpan，合并相同行
			const rowSpanMap = new Map<string, number>();
			groupedData.forEach((item, index) => {
				const key = `${item.row__c}-${item.lay__c}`;
				if (!rowSpanMap.has(key)) rowSpanMap.set(key, groupedData.filter(d => d.row__c === item.row__c && d.lay__c === item.lay__c).length);
			});
			// console.log('处理排序后 groupedData', groupedData)

			// * 这里排序是因为按照货架的样子、从一层到四层
			groupedData.sort((a, b) => {
				if (a.row__c != b.row__c) return a.row__c - b.row__c; // 按 row 升序
				return b.lay__c - a.lay__c; // 按 layer 降序
			});
			// console.log('排序 groupedData', groupedData)
			setData(groupedData);
			setLoading(false);
		} catch (error) {
			console.log('error Line', error);
			setLoading(false);
		}
	}
	useEffect(() => {
		execFunc();
	}, []);

	if (loading) {
		return <ProSkeleton type='list' />;
	}

	// console.log('巷道一 ==================================================================')
	let Header = (
		<div className='flex flex-row justify-between'>
			<div className='flex flex-row'>
				<div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#03de6d] text-[#ffffff]'>空库位</div>
				<div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#f9a8d4] text-[#ffffff]'>预占用库位</div>
				<div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#f95222] text-[#ffffff]'>占用</div>
				<div className='w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-[#b4b4b4] text-[#ffffff]'>禁用</div>
			</div>
			<div>
				<Button type='text' icon={<RedoOutlined />} onClick={execFunc}>
					刷新
				</Button>
			</div>
		</div>
	);
	// console.log('结果： ', data)
	return (
		<Table<DataType>
			className='cusTable'
			title={() => Header}
			columns={apiData ? (columns(apiData) as any) : []}
			dataSource={data}
			// scroll={{ x: "max-content" }}
			scroll={{ x: columns(data).length * 150, y: 700 }}
			pagination={false}
		/>
	);
};

export default Lane;
