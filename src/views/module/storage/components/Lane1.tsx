import React from 'react'
import { Space, Table, Tag, Tooltip } from 'antd'
import type { TableProps } from 'antd'
import './index.less'

interface DataType {
	key?: string
	lane: number
	row: number
	layer: number
	column1: number
	column2: number
	column3: number
	column4: number
	column5: number
	column6: number
	column7: number
	column8: number
	column9: number
	column10: number
	column11: number
}

let title = (
	<table className="w-full border-collapse  text-slate-700 ">
		<tr>
			<th className="w-[250px] text-[12px] text-center">货品名词</th>
			<th className="w-[150px] text-[12px] text-center">生产日期</th>
			<th className="w-[350px] text-[12px] text-center">在库整数总数</th>
		</tr>
		<tr>
			<td className="  text-[12px] text-center">食品火腿肠</td>
			<td className="  text-[12px] text-center">2020-11-19 12:32:00</td>
			<td className="w-[350px] text-[12px] text-center">500箱0根</td>
		</tr>
	</table>
)

let data: any[] = []
// 巷道
for (let w = 1; w < 2; w++) {
	// 排 【2】
	for (let i = 1; i < 3; i++) {
		// 列
		for (let j = 1; j < 4; j++) {
			// 层  【3】
			for (let k = 1; k < 5; k++) {
				const res = '第' + i + '排' + j + '列' + k + '层'
				console.log(res)
				let obj = {
					column1: k == 1 ? 1 : null,
					column2: k == 2 ? 2 : null,
					column3: k == 3 ? 3 : null,
					column4: k == 4 ? 4 : null,
					column5: k == 5 ? 5 : null,
				}
				data.push({
					key: res,
					lane: w, // 巷道
					row: i, // 排
					layer: j, // 层
					...obj,
					// column1: k,
					// column2: k,
					// column3: k,
					// column4: k,
					// column5: k,
					// column6: k,
					// column7: k,
					// column8: k,
					// column9: k,
					// column10: k,
					// column11: 11,
				})
			}
		}
	}
}
console.log(data)

// !  这个数组，lane相同合并行，row一样合并行，该如何处理这个数组？
// 计算合并行
const getRowSpan = (data: any) => {
	let laneRowCount: any = {} // 记录 (lane, row) 组合出现次数
	let laneCount: any = {} // 记录 lane 出现次数
	let rowSpans: any = new Array(data.length).fill(0)

	data.forEach((item: any, index: string | number) => {
		const laneKey = item.lane
		const rowKey = `${item.lane}-${item.row}`

		// 统计相同 lane 出现的次数
		if (!laneCount[laneKey]) laneCount[laneKey] = 0
		laneCount[laneKey] += 1

		// 统计相同 (lane, row) 出现的次数
		if (!laneRowCount[rowKey]) laneRowCount[rowKey] = 0
		laneRowCount[rowKey] += 1

		// 如果是该 (lane, row) 组合的第一行，则设置 rowSpan
		if (laneRowCount[rowKey] === 1) {
			rowSpans[index] = data.filter((d: any) => d.lane === item.lane && d.row === item.row).length
		}
		// console.log('巷道 相同数', laneCount) // 24
		// console.log('排 相同数', laneRowCount) // {1-1: 12, 1-2: 12}
	})
	console.log('rowSpans', rowSpans)
	return rowSpans
}
// 计算行合并
const rowSpans = getRowSpan(data)
const columns: TableProps<DataType>['columns'] = [
	{
		title: '巷道',
		dataIndex: 'lane',
		key: 'lane',
		// onCell: (_, index) => ({
		// 	rowSpan: rowSpans[index], // 相同 lane 合并
		// }),
	},
	{
		title: '排',
		dataIndex: 'row',
		key: 'row',
		// onCell: (_, index) => ({
		// 	rowSpan: rowSpans[index], // 相同 row 合并
		// }),
	},
	{
		title: '层',
		dataIndex: 'layer',
		key: 'layer',
	},
	{
		title: '第1列',
		dataIndex: 'column1',
		key: 'column1',
		render: (value, record, index) => {
			// console.log('record', record.column1, record.lane)
			return (
				<Tooltip placement="top" color="#fff" title={title}>
					{value}
				</Tooltip>
			)
		},
	},
	{
		title: '第2列',
		dataIndex: 'column2',
		key: 'column2',
		render: (value, record, index) => {
			// console.log('record', record.column1, record.lane)
			return (
				<Tooltip placement="top" color="#fff" title={title}>
					{value}
				</Tooltip>
			)
		},
	},
	{
		title: '第3列',
		dataIndex: 'column3',
		key: 'column3',
		render: (value, record, index) => {
			// console.log('record', record.column1, record.lane)
			return (
				<Tooltip placement="top" color="#fff" title={title}>
					{value}
				</Tooltip>
			)
		},
	},
	{
		title: '第4列',
		dataIndex: 'column4',
		key: 'column4',
		render: (value, record, index) => {
			// console.log('record', record.column1, record.lane)
			return (
				<Tooltip placement="top" color="#fff" title={title}>
					{value}
				</Tooltip>
			)
		},
	},
	{
		title: '第5列',
		dataIndex: 'column5',
		key: 'column5',
	},
	{
		title: '第6列',
		dataIndex: 'column6',
		key: 'column6',
	},
	{
		title: '第7列',
		dataIndex: 'column7',
		key: 'column7',
		// width: 1200,
	},
	{
		title: '第8列',
		dataIndex: 'column8',
		key: 'column8',
		// width: 500,
	},
	{
		title: '第9列',
		dataIndex: 'column9',
		key: 'column9',
	},
]
console.log('columns length', columns.length)

const Lane: React.FC = () => {
	console.log('巷道一')
	let Header = (
		<div className="flex">
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-slate-100">空库位</div>
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-pink-300">预占用库位</div>
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-green-400">有库存库位</div>
			<div className="w-[80px] px-[4px] py-[6px]  text-center text-[12px] bg-slate-100 text-red-500">选中库位</div>
		</div>
	)
	return (
		<Table<DataType>
			className="cusTable"
			title={() => Header}
			columns={columns}
			dataSource={data}
			// scroll={{ x: "max-content" }}
			scroll={{ x: columns.length * 150 }}
			pagination={false}
		/>
	)
}

export default Lane
