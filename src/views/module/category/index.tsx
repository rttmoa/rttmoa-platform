import { categoryAdd, categoryList, categoryUpdate } from '@/api/modules/module/category'
import { Icon } from '@/components/Icon'
import { Button, Card, Form, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'

const Category = () => {
	const [loading, setLoading] = useState(false)
	const [parentID, setparentID] = useState<string>('0')
	const [parentName, setparentName] = useState('')
	const [categoryObj, setcategoryObj] = useState<any>({})
	const [categorys, setcategorys] = useState([])
	const [subCategorys, setsubCategorys] = useState([])
	const [showStatus, setshowStatus] = useState(0)

	const [form_ins] = Form.useForm()
	const [form_up] = Form.useForm()

	// ! 异步获取一级/二级分类列表显示
	const getCategorys = async (parentId: string) => {
		setLoading(true)
		parentId = parentId || parentID
		const res: any = await categoryList(parentId)
		setLoading(false)
		console.log('结果：', res)
		if (res.code === 200) {
			let categorys: any = res.data.map((item: any, idn: any) => ({ ...item, key: idn }))
			console.log(parentId)
			if (parentId == '0') {
				setcategorys(categorys)
			} else {
				setsubCategorys(categorys)
			}
		} else {
			message.error('获取分类列表失败')
		}
	}
	useEffect(() => {
		getCategorys('')
	}, [])

	const column = [
		{
			title: parentID === '0' ? '一级分类名称' : '二级分类名称',
			dataIndex: 'name', // 显示数据对应的属性名
		},
		{
			title: '操作',
			width: 300,
			render: (category: any) => {
				return (
					<span>
						<Button
							style={{ color: '#fe8281' }}
							type="link"
							onClick={() => {
								showUpdate(category)
							}}>
							{parentID === '0' ? '修改一级分类' : '修改二级分类'}
						</Button>
						{parentID === '0' ? (
							<Button
								type="link"
								onClick={() => {
									showSubCategorys(category)
								}}>
								查看子分类
							</Button>
						) : null}
					</span>
				)
			},
		},
	]

	// 修改分类按钮 > 开启弹窗
	const showUpdate = (category: any) => {
		setcategoryObj(category)
		setshowStatus(2)
	}
	// 查看子分类按钮 > 显示子分类列表
	const showSubCategorys = (category: any) => {
		setparentID(category._id)
		setparentName(category.name)
		// console.log(category.name, category._id);
		getCategorys(category._id)
	}

	// 显示指定一级分类列表
	const shwoCategorys = () => {
		setparentID('0')
		setparentName('')
		setsubCategorys([])
	}

	// 添加分类
	const addCategory = async () => {
		const { parentId, categoryName } = form_ins.getFieldsValue()
		console.log(parentId, categoryName) // 5e130ec7e31bb727e4b0e34c Vivo
		const res = await categoryAdd(parentId, categoryName)
		setshowStatus(0)
		if (res.code === 200) {
			// 添加的分类就是当前分类列表下的分类
			if (parentId === parentID) {
				// 重新获取当前分类列表显示
				getCategorys(parentId)
			} else if (parentId === '0') {
				// 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
				getCategorys('0')
			}
		}
	}
	// 更新分类
	const updateCategory = async () => {
		// 1. 隐藏确定框
		setshowStatus(0)

		// 2.准备数据
		const categoryId = categoryObj._id
		const { categoryName } = form_up.getFieldsValue()

		// 3. 发请求更新分类
		const res = await categoryUpdate(categoryId, categoryName)
		if (res.code === 200) {
			// 4. 重新显示列表
			getCategorys('')
		}
	}
	return (
		<>
			<Card
				title={
					parentID === '0' ? (
						'一级分类列表'
					) : (
						<span>
							<Button onClick={shwoCategorys} type="link">
								<b>一级分类列表</b>
							</Button>
							{/* <Icon name="arrow-right" /> */}
							{'->'}&nbsp;&nbsp;&nbsp;
							<span className="font-normal font-serif">{parentName}</span>
						</span>
					)
				}
				extra={
					<Button
						type="primary"
						onClick={() => {
							setshowStatus(1)
						}}>
						{/* <Icon name="plus" /> */}
						添加分类
					</Button>
				}>
				<Table loading={loading} columns={column} dataSource={parentID === '0' ? categorys : subCategorys} />
			</Card>
			<Modal
				title="添加分类"
				open={showStatus === 1}
				onOk={addCategory}
				onCancel={() => {
					setshowStatus(0)
				}}>
				<AddForm categorys={categorys} parentId={parentID} form={form_ins} />
			</Modal>
			<Modal
				title="修改分类"
				open={showStatus === 2}
				onOk={updateCategory}
				onCancel={() => {
					setshowStatus(0)
				}}>
				<UpdateForm categoryName={categoryObj.name} form={form_up} />
			</Modal>
		</>
	)
}

function AddForm({ categorys, parentId, form }: any) {
	useEffect(() => {
		return () => {
			form.resetFields()
		}
	})
	return (
		<>
			<Form form={form} initialValues={{ parentId: parentId }}>
				<Form.Item name="parentId">
					<Select>
						<Select.Option value={'0'}>一级分类</Select.Option>
						{categorys.map((item: any) => {
							return (
								<Select.Option key={item._id} value={item._id}>
									{item.name}
								</Select.Option>
							)
						})}
					</Select>
				</Form.Item>
				<Form.Item name="categoryName">
					<Input placeholder="请输入分类名称" />
				</Form.Item>
			</Form>
		</>
	)
}

function UpdateForm({ categoryName, form }: any) {
	useEffect(() => {
		return () => {
			form.resetFields()
		}
	})
	return (
		<>
			<Form form={form} initialValues={{ categoryName: categoryName }}>
				<Form.Item name="categoryName">
					<Input placeholder="请输入分类名称" />
				</Form.Item>
			</Form>
		</>
	)
}

export default Category
