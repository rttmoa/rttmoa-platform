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
}

const columns: TableProps<DataType>['columns'] = [
	{
		title: '巷道',
		dataIndex: 'lane',
		key: 'lane',
	},
	{
		title: '排',
		dataIndex: 'row',
		key: 'row',
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
			console.log('record', record.column1, record.lane)
			return (
				<Tooltip
					placement="top"
					color="#fff"
					title={
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
					}>
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
			console.log('record', record.column1, record.lane)
			return (
				<Tooltip
					placement="top"
					color="#fff"
					title={
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
					}>
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
			console.log('record', record.column1, record.lane)
			return (
				<Tooltip
					placement="top"
					color="#fff"
					title={
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
					}>
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
			console.log('record', record.column1, record.lane)
			return (
				<Tooltip
					placement="top"
					color="#fff"
					title={
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
					}>
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
	},
	{
		title: '第8列',
		dataIndex: 'column8',
		key: 'column8',
	},
	{
		title: '第9列',
		dataIndex: 'column9',
		key: 'column9',
	},
]

const data: DataType[] = [
	{
		key: '1',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 13,
		column4: 23,
	},
	{
		key: '2',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 13,
		column3: 3,
		column4: 33,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},

	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
	{
		key: '3',
		lane: 1,
		row: 32,
		layer: 234,
		column1: 2,
		column2: 3,
		column3: 23,
		column4: 15,
	},
]

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
	return <Table<DataType> className="cusTable" title={() => Header} columns={columns} dataSource={data} />
}

export default Lane
