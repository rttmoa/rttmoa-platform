import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Popover, Select, Table } from 'antd';
import { ProSkeleton } from '@ant-design/pro-components';
import { RedoOutlined } from '@ant-design/icons';
import './index.less';

export type ShelfItem = {
	china_and_aboard__c: string;
	entry_stock_date__c: string;
	contract__c: string;
	supplier__c: string;
	material_code__c: string;
	loc_name__c: string;
	row__c: number;
	col__c: number;
	lay__c: number;
	position__c?: string;
	shelf_status__c?: '空闲' | '预占用' | '占用' | '禁用' | string;
	pallet__c?: string;
	material_name__c?: string;
	production_date__c?: string;
	batch__c?: string;
	cabinet__c?: string;
	group_id__c?: string;
	is_tax__c?: string;
	now_quantity__c: number;
};

export type ColRecord = {
	key: string;
	col__c: number;
};

type ShelfLaneProps = {
	currLay: number;
	apiData: ShelfItem[];
	loading: boolean;
	onRefresh: () => void | Promise<void>;
};

const AISLE_ROWS = new Set<number>([6, 19]);
const HIGHLIGHT_COLOR = '#2700f4';
const POPOVER_STYLE = { padding: 0, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' };
const LEGEND_ITEMS = [
	{ label: '空库位', color: '#03de6d' },
	{ label: '预占用库位', color: '#f9a8d4' },
	{ label: '待出库', color: '#00dfde' },
	{ label: '占用', color: '#f95222' },
	{ label: '禁用', color: '#b4b4b4' },
];

const pad2 = (n: number) => String(n).padStart(2, '0');
const getPosition = (row: number, col: number, lay: number) => `${pad2(row)}${pad2(col)}${pad2(lay)}`;
const isRowGroupSplit = (row: number) => row === 13;

const getColor = (status?: string) => {
	if (status === '空闲') return '#03de6d';
	if (status === '预占用') return '#f9a8d4';
	if (status === '待出库') return '#00dfde';
	if (status === '占用') return '#f95222';
	if (status === '禁用') return '#b4b4b4';
	return '#b4b4b4';
};

const getSelectOptions = (values: Array<string | undefined>) =>
	Array.from(new Set(values.map(value => value?.trim()).filter((value): value is string => Boolean(value)))).map(value => ({
		label: value,
		value,
	}));

const getPopoverContent = (shelf?: ShelfItem) => {
	const list = shelf ? [shelf] : [];

	return (
		<div className='max-w-[1200px]'>
			<table className='table-fixed w-full text-slate-700 text-[13px] border border-slate-200'>
				<thead className='bg-slate-50'>
					<tr>
						{/* <th className='px-2 py-2 text-center whitespace-nowrap w-[115px] border-2 border-gray-300'>位置名称</th> */}
						<th className='px-2 py-2 text-center whitespace-nowrap w-[70px] border-2 border-gray-300'>仓位</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[90px] border-2 border-gray-300'>组号</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[110px] border-2 border-gray-300'>托盘号</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[100px]  border-2 border-gray-300'>关税状态</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[70px] border-2 border-gray-300'>件数</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[70px] border-2 border-gray-300'>物料代码</th>
						<th className='px-2 py-2 text-center whitespace-nowrap max-w-[200px]  border-2 border-gray-300'>物料名称</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[100px] border-2 border-gray-300'>生产日期</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[100px] border-2 border-gray-300'>入库日期</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[180px] border-2 border-gray-300'>合同号</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[110px] border-2 border-gray-300'>批号</th>
						<th className='px-2 py-2 text-center whitespace-nowrap w-[110px] border-2 border-gray-300'>柜号</th>
					</tr>
				</thead>
				<tbody>
					{list.length ? (
						list.map((item, idx) => (
							<tr key={idx} className='divide-y divide-slate-200 font-bold'>
								{/* <td className='  px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.loc_name__c ?? '-'}</td> */}
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.position__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.group_id__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.pallet__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.is_tax__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.now_quantity__c ?? '0'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.material_code__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.material_name__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.production_date__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.entry_stock_date__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.contract__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.batch__c ?? '-'}</td>
								<td className='px-2 py-2 text-center whitespace-nowrap border-r-2 border-gray-300 overflow-hidden'>{item.cabinet__c ?? '-'}</td>
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

export const ShelfLane: React.FC<ShelfLaneProps> = ({ currLay, apiData, loading, onRefresh }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [tableHeight, setTableHeight] = useState<number>(600);
	const [selectedMaterialCode, setSelectedMaterialCode] = useState<string>();
	const [selectedBatch, setSelectedBatch] = useState<string>();
	const [selectedContract, setSelectedContract] = useState<string>();
	const [selectedCabinet, setSelectedCabinet] = useState<string>();

	useEffect(() => {
		const computeHeight = () => {
			const top = containerRef.current?.getBoundingClientRect().top || 0;
			const h = Math.max(240, window.innerHeight - top);
			setTableHeight(h);
		};
		computeHeight();
		window.addEventListener('resize', computeHeight);
		return () => window.removeEventListener('resize', computeHeight);
	}, []);

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

	const materialCodeOptions = useMemo(() => getSelectOptions(apiData.map(item => item.material_code__c)), [apiData]);
	const materialRelatedData = useMemo(() => apiData.filter(item => item.material_code__c === selectedMaterialCode), [apiData, selectedMaterialCode]);
	const batchOptions = useMemo(() => getSelectOptions(materialRelatedData.map(item => item.batch__c)), [materialRelatedData]);
	const contractOptions = useMemo(() => getSelectOptions(materialRelatedData.map(item => item.contract__c)), [materialRelatedData]);
	const cabinetOptions = useMemo(() => getSelectOptions(materialRelatedData.map(item => item.cabinet__c)), [materialRelatedData]);

	const isShelfHighlighted = (shelf?: ShelfItem) => {
		if (!shelf || !selectedMaterialCode || shelf.material_code__c !== selectedMaterialCode) return false;
		if (selectedBatch && shelf.batch__c !== selectedBatch) return false;
		if (selectedContract && shelf.contract__c !== selectedContract) return false;
		if (selectedCabinet && shelf.cabinet__c !== selectedCabinet) return false;
		return true;
	};

	const header = useMemo(
		() => (
			<div className='flex flex-row justify-between gap-3'>
				<div className='flex flex-row'>
					{LEGEND_ITEMS.map(item => (
						<div key={item.label} className='w-[80px] px-[4px] py-[6px] text-center text-[12px] text-[#ffffff]' style={{ backgroundColor: item.color }}>
							{item.label}
						</div>
					))}
				</div>
				<div className='flex flex-row gap-2'>
					<Select
						allowClear
						showSearch
						placeholder='物料代码'
						options={materialCodeOptions}
						value={selectedMaterialCode}
						style={{ width: 180 }}
						optionFilterProp='label'
						onChange={value => {
							setSelectedMaterialCode(value);
							setSelectedBatch(undefined);
							setSelectedContract(undefined);
							setSelectedCabinet(undefined);
						}}
					/>
					<Select
						allowClear
						showSearch
						disabled={!selectedMaterialCode}
						placeholder='批次'
						options={batchOptions}
						value={selectedBatch}
						style={{ width: 150 }}
						optionFilterProp='label'
						onChange={setSelectedBatch}
					/>
					<Select
						allowClear
						showSearch
						disabled={!selectedMaterialCode}
						placeholder='合同号'
						options={contractOptions}
						value={selectedContract}
						style={{ width: 180 }}
						optionFilterProp='label'
						onChange={setSelectedContract}
					/>
					<Select
						allowClear
						showSearch
						disabled={!selectedMaterialCode}
						placeholder='柜号'
						options={cabinetOptions}
						value={selectedCabinet}
						style={{ width: 150 }}
						optionFilterProp='label'
						onChange={setSelectedCabinet}
					/>
				</div>
				<div>
					<Button type='text' icon={<RedoOutlined />} onClick={onRefresh}>
						刷新
					</Button>
				</div>
			</div>
		),
		[batchOptions, cabinetOptions, contractOptions, materialCodeOptions, onRefresh, selectedBatch, selectedCabinet, selectedContract, selectedMaterialCode]
	);

	const { columns, dataSource } = useMemo(() => {
		const rowList = Array.from({ length: 25 }, (_, i) => i + 1);
		const colList = Array.from({ length: 17 }, (_, i) => i + 1);

		const columnsBuilt: any = [
			{
				title: '列\\排',
				dataIndex: 'col__c',
				key: 'col__c',
				width: 45,
				fixed: 'left' as const,
				render: (value: number) => <b>{`${value}列`}</b>,
			},
			...rowList.map(row => ({
				title: AISLE_ROWS.has(row) ? '过道' : `${row}排`,
				dataIndex: `r${row}`,
				key: `r${row}`,
				width: 65,
				className: isRowGroupSplit(row) ? 'row-group-split' : undefined,
				onHeaderCell: () => ({
					className: isRowGroupSplit(row) ? 'row-group-split' : '',
				}),
				render: (_: unknown, record: ColRecord) => {
					const col = record.col__c;
					const aisleCols = [4, 13];
					const isAisle = AISLE_ROWS.has(row) || (aisleCols.includes(col) && row >= 7 && row <= 18);

					if (isAisle) {
						return (
							<div className='py-1 px-2 text-center font-sans' style={{ backgroundColor: '#f2f702' }}>
								过道
							</div>
						);
					}

					const shelf = posMap.get(getPosition(row, col, currLay));
					const status = shelf?.shelf_status__c;
					const color = isShelfHighlighted(shelf) ? HIGHLIGHT_COLOR : getColor(status);
					const hasPos = shelf && Number.isFinite(Number(shelf.row__c)) && Number.isFinite(Number(shelf.col__c)) && Number.isFinite(Number(shelf.lay__c));
					const label = hasPos ? `${col}列-${row}排-${currLay}层` : '';

					return (
						<Popover placement='top' trigger='hover' overlayInnerStyle={POPOVER_STYLE} content={getPopoverContent(shelf)}>
							<div className='text-[10px] py-1 text-center font-sans cursor-pointer' style={{ backgroundColor: color, color: 'white', whiteSpace: 'nowrap' }}>
								{label}
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
	}, [apiData, currLay, posMap, selectedBatch, selectedCabinet, selectedContract, selectedMaterialCode]);

	if (loading) {
		return <ProSkeleton type='list' />;
	}

	return (
		<div ref={containerRef}>
			<Table className='cusTable' title={() => header} columns={columns} dataSource={dataSource} scroll={{ x: columns.length * 50, y: tableHeight }} pagination={false} bordered size='small' />
		</div>
	);
};
