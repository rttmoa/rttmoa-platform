import { Button, Card, Col, Form, Input, Modal, Row, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { Space, Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { Icon } from '@/components/Icon'
import CreateMenuModal from './component/CreateMenuModal'
import { DelMenu, FindAllMenu } from '@/api/modules/upack/common'
import { message } from '@/hooks/useMessage'

type TableRowSelection<T> = TableProps<T>['rowSelection']
type ModalType = 'create' | 'edit' | 'view'

interface DataType {
	title: string
	icon: string
	key: string
	path: string
	element: string
	children?: DataType[]
}

const MenuMange: React.FC = () => {
	const [checkStrictly, setCheckStrictly] = useState<boolean>(false)
	const [modalTitle, setModalTitle] = useState<string>('新建菜单')
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
	const [modalType, setModalType] = useState<ModalType>('create')
	const [modalMenuInfo, setModalMenuInfo] = useState<any>({}) // 行菜单信息

	const [menuList, setMenuList] = useState<Array<any>[]>([])
	const [form] = Form.useForm()

	const getMenu = async () => {
		const res: any = await FindAllMenu({})
		console.log('获取菜单：', res)
		setMenuList(res?.data.list)
	}

	useEffect(() => {
		getMenu()
	}, [])

	const columns: TableColumnsType<DataType> = [
		{
			title: '菜单标题',
			key: 'title',
			dataIndex: 'title',
			width: 200,
			ellipsis: { showTitle: false },
			render: value => (
				<Tooltip placement="top" title={value}>
					{value || '-'}
				</Tooltip>
			),
		},
		{
			title: '菜单图标',
			key: 'icon',
			dataIndex: 'icon',
			align: 'center',
			width: 80,
			render: (text, record) => <Icon name={record.icon} />,
		},
		{
			title: '菜单类型',
			key: 'type',
			dataIndex: 'type',
			align: 'center',
			width: 80,
		},
		{
			title: '菜单标识',
			key: 'key',
			dataIndex: 'key',
			align: 'center',
			width: 100,
			ellipsis: { showTitle: false },
			render: value => (
				<Tooltip placement="top" title={value}>
					{value || '-'}
				</Tooltip>
			),
		},
		{
			title: '路由路径',
			key: 'path',
			dataIndex: 'path',
			align: 'center',
			width: 180,
			ellipsis: { showTitle: false },
			render: value => (
				<Tooltip placement="topLeft" title={value}>
					{value || '-'}
				</Tooltip>
			),
		},
		{
			title: '组件路径',
			key: 'element',
			dataIndex: 'element',
			align: 'center',
			width: 180,
			ellipsis: { showTitle: false },
			render: value => (
				<Tooltip placement="top" title={value}>
					{value || '-'}
				</Tooltip>
			),
		},
		{
			title: '重定向路径',
			key: 'redirect',
			dataIndex: 'redirect',
			align: 'center',
			width: 180,
			ellipsis: { showTitle: false },
			render: value => (
				<Tooltip placement="top" title={value}>
					{value || '-'}
				</Tooltip>
			),
		},
		{
			title: '外链 url',
			key: 'isLink',
			dataIndex: 'isLink',
			align: 'center',
			width: 180,
			ellipsis: { showTitle: false },
			render: value => (
				<Tooltip placement="top" title={value}>
					{value || '-'}
				</Tooltip>
			),
		},
		{
			title: '隐藏菜单项',
			key: 'isHide',
			dataIndex: 'isHide',
			align: 'center',
			width: 90,
			render: (text: string, record: any) => record.is_hide || '否',
		},
		{
			title: '全屏显示',
			key: 'isFull',
			dataIndex: 'isFull',
			align: 'center',
			width: 90,
			render: (text: string, record: any) => record.is_full || '否',
		},
		{
			title: '固定标签页',
			key: 'isAffix',
			dataIndex: 'isAffix',
			align: 'center',
			width: 90,
			render: (text: string, record: any) => record.is_affix || '否',
		},
		{
			title: '排序值',
			key: 'sort',
			dataIndex: 'sort',
			align: 'center',
			width: 60,
		},
		{
			title: '操作',
			align: 'center',
			fixed: 'right',
			width: 120,
			render: (text: string, record: any) => {
				return (
					<Space size="small">
						<Button type="dashed" size="small" onClick={() => handleEdit(record)}>
							修改
						</Button>
						<Button type="dashed" size="small" onClick={() => handleDelete(record)}>
							删除
						</Button>
					</Space>
				)
			},
		},
	]

	// * 操作：编辑菜单
	const handleEdit = (menuItem: any) => {
		// 编辑菜单：点击编辑时、要获取几级菜单的属性
		setModalMenuInfo(menuItem)
		setModalTitle('修改菜单')
		setModalType('edit')
		setModalIsVisible(true)
	}
	// * 操作：删除菜单
	const handleDelete = async (record: any) => {
		// 删除菜单：判断下面是否有children、有children无法删除
		const result: any = await DelMenu(record)
		console.log('删除菜单结果：', result)
		if (result?.data.message?.includes('失败')) message.error(result?.data.message || '删除失败')
		else message.success(result?.data.message || '删除成功')
	}
	// * 表格数据：树结构表格
	function getShowMenuList(menuList: any) {
		let newMenuList: any = JSON.parse(JSON.stringify(menuList))
		return newMenuList.map((item: any) => {
			return { ...item, ...item.meta, children: item.children ? getShowMenuList(item.children) : null }
		})
	}
	let NewMenuModalConfig = {
		form,
		getMenu,
		menuList,
		modalTitle,
		setModalTitle,
		modalType,
		setModalType,
		modalIsVisible,
		setModalIsVisible,
		modalMenuInfo,
		setModalMenuInfo,
	}
	return (
		<>
			<Card>
				<Button
					className="mb-3"
					size="small"
					onClick={() => {
						setModalTitle('新建菜单')
						setModalType('create')
						setModalIsVisible(true)
					}}>
					新增菜单
				</Button>
				<Table
					size="small"
					bordered
					columns={columns}
					// rowSelection={{ ...rowSelection, checkStrictly }}
					dataSource={getShowMenuList(menuList)}
					expandable={{
						indentSize: 20,
					}}
					scroll={{ x: 1800, y: 580 }}
				/>
			</Card>
			<CreateMenuModal {...NewMenuModalConfig} />
		</>
	)
}

export default MenuMange
