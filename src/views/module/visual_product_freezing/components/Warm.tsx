import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Popover, Table } from 'antd';
import './index.less';
import { ProSkeleton } from '@ant-design/pro-components';
import { RedoOutlined } from '@ant-design/icons';
import { moduleAPI } from '@/api/modules/module';

const CurrLay: number = 0;

type ShelfItem = {
	row__c: number;
	col__c: number;
	lay__c: number;
	position__c?: string;
	shelf_status__c?: '空闲' | '预占用' | '占用' | '禁用' | string;
	pallet__c?: string;
	material_name__c?: string;
	production_date__c?: string;
	batch__c?: string;
};

type ColRecord = {
	key: string;
	col__c: number;
};

const pad2 = (n: number) => String(n).padStart(2, '0');
const getPosition = (row: number, col: number, lay: number) => `${pad2(row)}${pad2(col)}${pad2(lay)}`;
const getColor = (status?: string) => {
	if (status === '空闲') return '#03de6d';
	if (status === '预占用') return '#f9a8d4';
	if (status === '占用') return '#f95222';
	if (status === '禁用') return '#b4b4b4';
	return '#b4b4b4';
};

const getPopoverContent = (shelf?: ShelfItem) => {
	const list = shelf ? [shelf] : [];
	return (
		<div className='max-w-[750px]'>
			<table className='table-fixed w-full text-slate-700 text-[13px] border border-slate-200'>
				<thead className='bg-slate-50'>
					<tr>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[120px] border-2 border-gray-300'>托盘号</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[80px] border-2 border-gray-300'>仓位</th>
						<th className='px-2 py-2 text-center whitespace-nowrap max-w-[180px] border-2 border-gray-300'>物料名称</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[140px] border-2 border-gray-300'>生产日期</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[150px] border-2 border-gray-300'>批次</th>
					</tr>
				</thead>
				<tbody>
					{list.length ? (
						list.map((item: any, idx: number) => (
							<tr key={idx} className='divide-y divide-slate-200'>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.pallet__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.position__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.material_name__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.production_date__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.batch__c ?? '-'}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={5} className='text-center py-2 text-gray-500'>
								暂无数据
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

const Lane: React.FC = () => {
	const [apiData, setApiData] = useState<ShelfItem[]>([]);
	const [loading, setLoading] = useState<Boolean>(true);
	const containerRef = useRef<HTMLDivElement>(null);
	const [tableHeight, setTableHeight] = useState<number>(600);

	const execFunc = useCallback(async () => {
		try {
			setLoading(true);
			const { data }: any = await moduleAPI.getShelf_hk_freezing({});
			let rawData = [];
			if ([1, 2, 3, 4].includes(CurrLay)) {
				rawData = data.data.filter((v: any) => v.lay__c == CurrLay);
			}
			if (CurrLay == 0) {
				rawData = data.data;
			}
			setApiData((rawData || []) as ShelfItem[]);
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

	const Header = (
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

	const aisleRows = useMemo(() => new Set<number>([8, 18]), []);
	const posMap = useMemo(() => {
		const map = new Map<string, ShelfItem>();
		for (const item of apiData) {
			const row = Number(item.row__c);
			const col = Number(item.col__c);
			const lay = Number(item.lay__c);
			if (!Number.isFinite(row) || !Number.isFinite(col) || !Number.isFinite(lay)) continue;
			map.set(getPosition(row, col, lay), item);
		}
		return map;
	}, [apiData]);

	const { columns, dataSource } = useMemo(() => {
		const colsFromApi = Array.from(new Set(apiData.map(v => Number(v.col__c)).filter(n => Number.isFinite(n)))).sort((a, b) => a - b);
		const rowsFromApi = Array.from(new Set(apiData.map(v => Number(v.row__c)).filter(n => Number.isFinite(n)))).sort((a, b) => a - b);

		const maxRow = Math.max(1, ...rowsFromApi, 18);
		const rowList: number[] = [];
		for (let r = 1; r <= maxRow; r += 1) rowList.push(r);

		const maxCol = Math.max(1, ...colsFromApi);
		const colList = colsFromApi.length ? colsFromApi : Array.from({ length: Math.max(24, maxCol) }, (_, i) => i + 1);

		const columnsBuilt: any[] = [
			{
				title: '列\\排',
				dataIndex: 'col__c',
				key: 'col__c',
				width: 70,
				fixed: 'left',
				render: (value: any) => <b>{value}</b>,
			},
			...rowList.map(row => ({
				title: aisleRows.has(row) ? '过道' : `${row}`,
				dataIndex: `r${row}`,
				key: `r${row}`,
				width: 150,
				render: (_: any, record: ColRecord) => {
					if (aisleRows.has(row)) {
						return (
							<div className='py-1 px-2 text-center font-sans' style={{ backgroundColor: '#f2f702' }}>
								过道
							</div>
						);
					}
					const col = record.col__c;
					const shelf = posMap.get(getPosition(row, col, CurrLay));
					const status = shelf?.shelf_status__c;
					const color = getColor(status);
					const str = `${row}排 - ${col}列 - ${CurrLay}层`;
					return (
						<Popover placement='top' trigger='hover' overlayInnerStyle={{ padding: 0, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} content={getPopoverContent(shelf)}>
							<div className='py-1 px-2 text-center font-sans cursor-pointer' style={{ backgroundColor: color, color: 'white', whiteSpace: 'nowrap' }}>
								{str}
							</div>
						</Popover>
					);
				},
			})),
		];

		const dataBuilt: ColRecord[] = colList.map(col => ({
			key: `col-${col}`,
			col__c: col,
		}));

		return { columns: columnsBuilt, dataSource: dataBuilt };
	}, [apiData, aisleRows, posMap]);

	if (loading) {
		return <ProSkeleton type='list' />;
	}

	return (
		<div ref={containerRef}>
			<Table<ColRecord> className='cusTable' title={() => Header} columns={columns} dataSource={dataSource} scroll={{ x: columns.length * 150, y: tableHeight }} pagination={false} bordered size='small' />
		</div>
	);
};

export default Lane;
