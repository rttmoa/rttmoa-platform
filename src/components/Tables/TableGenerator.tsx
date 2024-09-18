import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Button, Popconfirm, Modal, message, DatePicker, Input, Select } from 'antd'
import { SearchOutlined, ReloadOutlined, DeleteOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const initFilter = (arr: any) => {
	const obj: any = {}
	arr.forEach((item: any) => {
		switch (item.type) {
			case 'inputString':
				obj[item.name] = item.initValue || ''
				break
			case 'select':
				obj[item.name] = item.initValue || 0
				break
			case 'dateRange':
				item.name.forEach((name: string) => {
					obj[name] = ''
				})
				break
			default:
				break
		}
	})

	return obj
}
const getFormItem = (arr: any, { filter, handleInputChange, handleSelectChange, handleDateChange }: any) => {
	const Eles: React.ReactNode[] = []
	arr.forEach((item: any) => {
		const name = item.name
		const label = item.label
		const value = filter[name]
		switch (item.type) {
			case 'inputString':
				Eles.push(
					<Form.Item>
						<Input size="small" placeholder={label} name={name} value={value} onChange={handleInputChange} />
					</Form.Item>
				)
				break
			case 'select':
				Eles.push(
					<Form.Item>
						<Select
							size="small"
							style={{ width: 120 }}
							onChange={v => {
								handleSelectChange(name, v)
							}}
							value={value}
							options={item.options}
						/>
					</Form.Item>
				)
				break
			case 'dateRange':
				Eles.push(
					<Form.Item>
						<RangePicker
							onChange={dates => {
								handleDateChange(name, dates)
							}}
							value={[filter[name[0]], filter[name[1]]]}
							placeholder={label}
							size="small"
						/>
					</Form.Item>
				)
				break
			default:
				break
		}
	})

	return Eles
}

/**
 * const [DeleteEle] = useDelete({
    url: "ajax/deleteItem.json",
    data: {
      uuids: selectedKeys,
    },
    success: () => {
      setSelectedKeys([]);
      getList();
    },
    keys: selectedKeys,
  });
	<Form layout="inline">
		{DeleteEle}
		{FilterEles}
	</Form>
	*/
const useDelete = ({ url = '', data = {}, success = Function, keys = [] }) => {
	const OPER = { isDelete: true }
	const handleDel = () => {
		// 请求..
		message.success('删除成功')
		success && success()
	}

	const DeleteEle = (
		<React.Fragment>
			{OPER.isDelete && (
				<Form.Item>
					{keys.length === 0 ? (
						<Button icon={<DeleteOutlined />} size="small" disabled>
							批量删除
						</Button>
					) : (
						<Popconfirm title="批量删除" description="你确定要删除吗？" okText="确定" cancelText="取消" onConfirm={handleDel}>
							<Button type="primary" danger icon={<DeleteOutlined />} size="small">
								批量删除
							</Button>
						</Popconfirm>
					)}
				</Form.Item>
			)}
		</React.Fragment>
	)

	return [DeleteEle]
}

/**
 * const { FilterEles, filterRefresh } = useFilter([
    {
      name: "name",
      label: "平台名称",
      type: "inputString", // 字符串输入框
    },
    {
      name: "status",
      label: "状态",
      type: "select", // 选择器组件
      initValue: 0,
      options: [
        { value: 0, label: "全部状态" },
        { value: 1, label: "成功" },
        { value: 2, label: "失败" },
      ],
    },
    {
      name: ["start_date", "end_date"],
      label: ["开始日期", "结束日期"],
      type: "dateRange",
    },
  ]);
	 <Form layout="inline">
			{DeleteEle}
			{FilterEles}
		</Form>
 */
const useFilter = (config = []) => {
	const [filter, setFilter] = useState(initFilter(config))
	const [refresh, setRefresh] = useState(false)

	const handleResetFilter = () => {
		setFilter(initFilter(config))
		setRefresh(!refresh)
	}

	const handleDateChange = ([startField, endField]: any, [startTime, endTime]: any) => {
		setFilter({ ...filter, [startField]: startTime, [endField]: endTime })
	}

	const handleInputChange = (e: any) => {
		const { name, value } = e.target
		setFilter({ ...filter, [name]: value })
	}

	const handleSelectChange = (name: any, value: any) => {
		setFilter({ ...filter, [name]: value })
	}

	const FormItemEles = getFormItem(config, {
		filter,
		handleInputChange,
		handleSelectChange,
		handleDateChange,
	})
	const handleSearch = () => {
		setRefresh(!refresh) // 通知查询
	}

	const HandlerEles = [
		<Form.Item>
			<Button type="primary" size="small" onClick={handleSearch} icon={<SearchOutlined />}>
				查询
			</Button>
		</Form.Item>,
		<Form.Item>
			<Button type="primary" size="small" onClick={handleResetFilter} icon={<ReloadOutlined />}>
				重置
			</Button>
		</Form.Item>,
	]

	return {
		filter,
		FilterEles: [...FormItemEles, ...HandlerEles], // DOM
		filterRefresh: refresh,
	}
}

/**
 *  const { pagination, pageRefresh, paginationConfig, setPagination } =
    usePagination();
 */
const usePagination = () => {
	const [pagination, setPagination] = useState<any>({
		page: 1,
		pageSize: 10,
		total: 0,
	})
	const [pageRefresh, setPageRefresh] = useState(false)

	const config = {
		size: 'small',
		showQuickJumper: false,
		total: pagination.total,
		current: pagination.page,
		showSizeChanger: true,
		onChange: (current: number) => {
			setPagination({
				...pagination,
				page: current,
			})
			setPageRefresh(() => !pageRefresh)
		},
		pageSize: pagination.pageSize,
		onShowSizeChange: (page: number, pageSize: number) => {
			setPagination({
				page,
				pageSize,
			})
			setPageRefresh(() => !pageRefresh)
		},
	}

	return {
		pagination,
		pageRefresh,
		setPagination,
		paginationConfig: config,
	}
}

// const { selectedKeys, rowSelection, setSelectedKeys } = useSelect();
const useSelect = () => {
	const [selectedKeys, setSelectedKeys] = useState([])
	const rowSelection = {
		onChange: (selectedKeys = []) => {
			setSelectedKeys(selectedKeys)
		},
		selectedRowKeys: selectedKeys,
	}
	return { selectedKeys, rowSelection, setSelectedKeys }
}

/**
 * const { ModalEle, setModal } = useModal([
    {
      title: "详情",
      action: "detail",
      getComponent: (record) => <Detail data={record} />, // 描述详情
    },
  ]);
	{ModalEle} 
 */
const useModal = (
	config = [
		{
			title: '详情',
			action: 'detail',
			getComponent: <div>详情</div>,
		},
	]
) => {
	const [modal, setModal] = useState({
		isShow: false,
		record: null,
		action: '',
	})
	const handleCancel = () => {
		setModal({
			isShow: false,
			record: null,
			action: '',
		})
	}

	//对话框信息
	let modalProps = {
		open: modal.isShow,
		onCancel: handleCancel,
		maskClosable: false,
		footer: null,
	}

	const currentModal: any = config.find(item => item.action === modal.action)
	if (currentModal) {
		const { action, getComponent, ...other } = currentModal
		modalProps = {
			...modalProps,
			...other,
		}
	}

	let ModalEle: any = (
		<Modal width="80%" {...modalProps}>
			{currentModal && currentModal.getComponent(modal.record)}
		</Modal>
	)
	return { ModalEle, modal, setModal }
}

const useTimer = (interval: number, handler: any) => {
	const [isTimerOpen, setTimerOpen] = useState(false)

	useEffect(() => {
		let timer: any

		// 启动定时器
		if (isTimerOpen) {
			timer = setInterval(() => {
				handler()
			}, interval)

			// 第一次加载时手动触发一次请求
			handler()
		} else {
			// 清除定时器
			clearInterval(timer)
		}

		// 在组件卸载时清除定时器，防止内存泄漏
		return () => {
			clearInterval(timer)
		}
	}, [isTimerOpen]) // 当 isTimerOpen 改变时重新运行 useEffect

	return {
		setTimerOpen,
	}
}

export default {
	useModal,
	useDelete,
	useSelect,
	usePagination,
	useFilter,
	useTimer,
}
