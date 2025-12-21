import { Popover } from 'antd';
export interface DataType {
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
	column13: number;
	column14: number;
	column15: number;
	column16: number;
	column17: number;
	column18: number;
	column19: number;
	column20: number;
	column21: number;
	column22: number;
	column23: number;
	column24: number;
	column25: number;
	column26: number;
	column27: number;
	column28: number;
	column29: number;
	column30: number;
	column31: number;
	column32: number;
	column33: number;
	column34: number;
	column35: number;
	column36: number;
	column37: number;
	column38: number;
}

function titleFN(data: number, record?: any, index?: number, apiData?: any[]) {
	if ([7, 17, 25].includes(record?.row__c)) {
		return (
			<div className='py-1 px-2 text-center font-sans' style={{ backgroundColor: '#f2f702' }}>
				过道
			</div>
		);
	}

	if (!data) {
		return <div className='py-1 px-2 text-center font-sans'>不可用</div>;
	}
	const row = record?.row__c ?? '';
	const layer = record?.lay__c ?? '';
	const str = `${row}排 - ${data}列 - ${layer}层`;

	const position = `${row >= 10 ? row : '0' + row}${data >= 10 ? data : '0' + data}0${layer}`;

	const currStatus = (apiData || []).filter((v: any) => v.position__c == position);

	function GetColor(data: any) {
		if (data && data.length && data[0]) {
			const status = data[0].shelf_status__c;
			if (status == '空闲') return '#03de6d';
			else if (status == '预占用') return '#f9a8d4';
			else if (status == '占用') return '#f95222';
			else if (status == '禁用') return '#b4b4b4';
			else return '#b4b4b4';
		} else {
			return '#b4b4b4';
		}
	}

	let color = GetColor(currStatus);
	return (
		<Popover
			placement='top'
			trigger='hover'
			overlayInnerStyle={{ padding: 0, backgroundColor: '#fff', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
			content={
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
							{currStatus?.length ? (
								currStatus.map((item: any, idx: number) => (
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
			}
		>
			<div className='py-1 px-2 text-center font-sans cursor-pointer' style={{ backgroundColor: color, color: 'white', whiteSpace: 'nowrap' }}>
				{str}
			</div>
		</Popover>
	);
}
const buildColumns = (apiData: any[], groupedData: any[]) => [
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
	{
		title: '第 13 列',
		dataIndex: 'column13',
		key: 'column13',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 14 列',
		dataIndex: 'column14',
		key: 'column14',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 15 列',
		dataIndex: 'column15',
		key: 'column15',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 16 列',
		dataIndex: 'column16',
		key: 'column16',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 17 列',
		dataIndex: 'column17',
		key: 'column17',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 18 列',
		dataIndex: 'column18',
		key: 'column18',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 19 列',
		dataIndex: 'column19',
		key: 'column19',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 20 列',
		dataIndex: 'column20',
		key: 'column20',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 21 列',
		dataIndex: 'column21',
		key: 'column21',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 22 列',
		dataIndex: 'column22',
		key: 'column22',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 23 列',
		dataIndex: 'column23',
		key: 'column23',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 24 列',
		dataIndex: 'column24',
		key: 'column24',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 25 列',
		dataIndex: 'column25',
		key: 'column25',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 26 列',
		dataIndex: 'column26',
		key: 'column26',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 27 列',
		dataIndex: 'column27',
		key: 'column27',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 28 列',
		dataIndex: 'column28',
		key: 'column28',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 29 列',
		dataIndex: 'column29',
		key: 'column29',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 30 列',
		dataIndex: 'column30',
		key: 'column30',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 31 列',
		dataIndex: 'column31',
		key: 'column31',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 32 列',
		dataIndex: 'column32',
		key: 'column32',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 33 列',
		dataIndex: 'column33',
		key: 'column33',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 34 列',
		dataIndex: 'column34',
		key: 'column34',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 35 列',
		dataIndex: 'column35',
		key: 'column35',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 36 列',
		dataIndex: 'column36',
		key: 'column36',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 37 列',
		dataIndex: 'column37',
		key: 'column37',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
	{
		title: '第 38 列',
		dataIndex: 'column38',
		key: 'column38',
		render: (value: number, record: any, index: number | undefined) => titleFN(value, record, index, apiData),
	},
];

export default buildColumns;
