import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Table } from 'antd';
import './index.less';
import { ProSkeleton } from '@ant-design/pro-components';
import { RedoOutlined } from '@ant-design/icons';
import { moduleAPI } from '@/api/modules/module';
import buildColumns, { DataType } from './columns_config';

const CurrLay: number = 2;
const Lane: React.FC = () => {
	const [data, setData] = useState<DataType[]>([]); // 处理后的值
	const [apiData, setApiData] = useState<DataType[]>([]); // 接口返回的值
	const [loading, setLoading] = useState<Boolean>(true);
	const [groupedData, setGroupedData] = useState<any[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);
	const [tableHeight, setTableHeight] = useState<number>(600);

	const execFunc = useCallback(async () => {
		try {
			setLoading(true);
			const { data }: any = await moduleAPI.getShelf_kd_cwkeep({});
			let rawData = [];
			if ([1, 2, 3, 4].includes(CurrLay)) {
				rawData = data.data.filter((v: any) => v.lay__c == CurrLay);
			}
			if (CurrLay == 0) {
				rawData = data.data;
			}
			rawData.push({ row__c: 7, lay__c: CurrLay }, { row__c: 17, lay__c: CurrLay }, { row__c: 25, lay__c: CurrLay });

			setApiData(rawData);
			const grouped: any[] = [];
			rawData.forEach((item: any) => {
				const { row__c, lay__c, col__c } = item;
				const key = `${row__c}排 - ${lay__c}层`;
				let existing = grouped.find(d => d.key === key);
				if (!existing) {
					existing = { key, row__c, lay__c, ...item };
					grouped.push(existing);
				}
				existing[`column${col__c}`] = col__c;
			});
			grouped.sort((a, b) => {
				if (a.row__c != b.row__c) return a.row__c - b.row__c;
				return b.lay__c - a.lay__c;
			});
			setGroupedData(grouped);
			setData(grouped);
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}, []);
	useEffect(() => {
		execFunc();
	}, []);

	useEffect(() => {
		const computeHeight = () => {
			const top = containerRef.current?.getBoundingClientRect().top || 0;
			const h = Math.max(240, window.innerHeight - top - 0);
			setTableHeight(h);
		};
		computeHeight();
		window.addEventListener('resize', computeHeight);
		return () => window.removeEventListener('resize', computeHeight);
	}, []);

	if (loading) {
		return <ProSkeleton type='list' />;
	}

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
	const columnsMemo = buildColumns(apiData as any, groupedData);
	return (
		<div ref={containerRef}>
			<Table<DataType> className='cusTable' title={() => Header} columns={columnsMemo as any} dataSource={data} scroll={{ x: columnsMemo.length * 150, y: tableHeight }} pagination={false} />
		</div>
	);
};

export default Lane;
