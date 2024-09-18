import React, { useEffect, useState } from 'react'
import { Button, Card, Popconfirm, Table, TableColumnsType, message, Image } from 'antd'
import { useNavigate } from 'react-router-dom'
import defaultImg from '@/assets/images/defaultImg.jpg'
import { productList } from '@/api/modules/module/product'

export interface listProps {
	list?: any
	total?: number
	page?: number
	pageSize?: number
}

// coverImg: "http://localhost:3009/uploads/20230406/1680794476636.jpg"
export const serverUrl = 'http://localhost:3009'

const List = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const [searchName, setsearchName] = useState('')
	const [searchType, setsearchType] = useState('productName')
	const [data, setData] = useState<listProps>({ list: [], total: 0, page: 1, pageSize: 5 })
	const { list, total, page, pageSize } = data

	// 发送请求 | 通过redux去处理
	const loadData = async (page: number, pageSize: number) => {
		setData({ page: page })
		setLoading(true)
		let result: any
		if (searchName) {
			result = await productList(page, pageSize, searchName, searchType)
		} else {
			result = await productList(page, pageSize)
		}
		if (result.code == 200) {
			setLoading(false)
			setData(result.data)
		}
	}

	useEffect(() => {
		loadData(page!, pageSize!)
	}, [])

	const columns: TableColumnsType = [
		{
			title: '序号',
			key: '_id',
			width: 80,
			align: 'center',
			render: (text: any, record: any, index: number): any => index + 1,
		},
		{
			title: '商品名称',
			dataIndex: 'name',
		},
		{
			title: '主图',
			dataIndex: 'coverImg',
			render: (txt: any, record: any) => (
				// <Image src={record.coverImg ? serverUrl + record.coverImg : defaultImg} alt={record.name} style={{ width: 60 }} />
				<Image src={record.coverImg} alt={record.name} style={{ width: 60 }} />
			),
		},
		{
			title: '价格',
			dataIndex: 'price',
			render(price) {
				return `￥${price}`
			},
		},
		{
			title: '是否在售',
			dataIndex: 'onSale',
			render: (txt: any, record: any) => (record.onSale ? '在售' : '已下架'),
		},
		{
			title: '商品描述',
			dataIndex: 'desc',
		},
		{
			title: '操作',
			render: (txt: any, record: any, index: any) => {
				return (
					<div>
						<Button
							type="primary"
							size="small"
							onClick={() => {
								navigate(`/module/product/detail?id=${record._id}`)
							}}>
							修改
						</Button>
						<Popconfirm
							title="确定删除此项"
							onCancel={() => {
								console.log('用户取消删除')
							}}
							onConfirm={() => {
								// todo 此处调用api接口进行删除
								// delOne(record._id).then(res => {
								//   loadData();
								// });
								message.info(`删除： _id=${record._id}`)
							}}>
							<Button type="dashed" size="small" style={{ margin: '0 1rem' }}>
								删除
							</Button>
						</Popconfirm>
						<Button
							size="small"
							onClick={() => {
								// modifyOne(record._id, { onSale: !record.onSale }).then(res => {
								//   重新拿参数去请求：页码，请求参数，信息去请求
								//   loadData(page!, pageSize!);
								// });
								message.info(`修改在售： _id=${record._id}`)
							}}>
							{record.onSale ? '下架' : '上架'}
						</Button>
					</div>
				)
			},
		},
	]

	return (
		<div>
			<Card
				title="商品列表"
				extra={
					<Button
						type="primary"
						size="small"
						onClick={() => {
							navigate('/module/product/detail')
						}}>
						新增
					</Button>
				}>
				<Table
					bordered
					rowKey="_id"
					loading={loading}
					rowClassName={(record: any) => (record?.onSale ? '' : 'bg-red')}
					columns={columns}
					dataSource={list}
					pagination={{
						current: page, // 当前页数
						total, // 数据总数
						defaultPageSize: pageSize, // 默认的每页条数
						showSizeChanger: true,
						pageSizeOptions: ['3', '5', '10', '15'],
						showQuickJumper: true,
						onChange: loadData, // 页码改变的回调，参数是改变后的页码及每页条数
						onShowSizeChange: (current, size) => {
							// console.log('pageSize 变化的回调', current, size);
							setData({ pageSize: size })
							loadData(page!, size)
						},
					}}
				/>
			</Card>
		</div>
	)
}

export default List
