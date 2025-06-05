import useEventListener from '@/hooks/useEventListener'
import math from '@/utils/math'
import { Table } from 'antd'
import { TableProps } from 'antd/es/table/InternalTable'
import { TableRowSelection } from 'antd/es/table/interface'
import React, { useCallback, useEffect, useState } from 'react'
// import { createStyles } from 'antd-style'
// const useStyle = createStyles(({ css, token }: any) => {
// 	const { antCls } = token
// 	return {
// 		customTable: css`
// 			${antCls}-table {
// 				${antCls}-table-container {
// 					${antCls}-table-body,
// 					${antCls}-table-content {
// 						scrollbar-width: thin;
// 						scrollbar-color: #eaeaea transparent;
// 						scrollbar-gutter: stable;
// 					}
// 				}
// 			}
// 		`,
// 	}
// })
interface TablesProps {
	size?: string
	id?: string
	heghtAuto?: boolean
	xScroll?: boolean
	yScroll?: boolean
	sticky?: any
	loading?: TableProps['loading']
	columns: TableProps['columns']
	dataSource: TableProps['dataSource']
	// 分页配置
	pagination: {
		page?: number
		pageSize?: number
		totalCount?: number
	}
	scroll?: TableProps['scroll']
	rowSelection?: 'checkbox' | 'radio' | false | null

	selectedRowKeys?: number[]
	selectedIds?: number[]
	selectedItem?: any
	updateSelectedItem?: (selectKey?: any, selectedRows?: any, selectedIds?: any) => void
	/**
	 * @param page 页码回调
	 * @param pageSize 每页数量回调
	 * @returns
	 */
	updatePage?: (page: number, pageSize: number) => void
	summary?: () => any
}

interface MultiTableProps<T> extends TableProps<T> {
	size?: any
	id?: string
	heghtAuto?: boolean
	xScroll?: boolean
	yScroll?: boolean
	sticky?: any
	loading?: TableProps['loading']
	columns: any // TableProps['columns']
	dataSource: TableProps['dataSource']
	// 分页配置
	pagination: {
		page?: number
		pageSize?: number
		totalCount?: number
	}
	scroll?: TableProps['scroll']
	rowSelection?: any // 'checkbox' | 'radio' | false | null

	selectedRowKeys?: number[]
	selectedIds?: number[]
	selectedItem?: any
	updateSelectedItem?: (selectKey?: any, selectedRows?: any, selectedIds?: any) => void
	/**
	 * @param page 页码回调
	 * @param pageSize 每页数量回调
	 * @returns
	 */
	updatePage?: (page: number, pageSize: number) => void
	summary?: () => any
}

export default function Tables<T extends object>(props: MultiTableProps<T>) {
	// console.log('Tables props: ', props);
	const {
		// className = '',
		// 因为页面里面可能存在多个表格，或者单页面缓存时存在多个表格，计算高度时的找表格判断
		id,
		// 是否取消在一定范围内的高度自适应，默认不，开启后就算yScroll开启也没用
		heghtAuto = false,
		// 是否开启表头横向滚动
		xScroll = false,
		// 是否开启表格内容的高度自适应滚动
		yScroll = false,
		// 已知占位的区域高度
		scroll,
		sticky,
		// 数据源
		dataSource,
		columns,
		pagination,
		selectedRowKeys,
		rowSelection,
		updateSelectedItem,
		updatePage,
	} = props
	const [state, setState] = useState<any>({})

	const dataSourceLength = dataSource?.length
	const [x, setX] = useState(scroll?.x)
	const [y, setY] = useState(scroll?.y)

	// 没数据的时候，表头过长，请一定要在规定的区域内，都能左右滑动表头，不能死死的规定鼠标只能在表头范围内才能滑动
	useEffect(() => {
		if (xScroll && id) {
			const parent = document.getElementById(id)
			if (parent) {
				const FixedWidth = props
					.columns!.filter((item: { width: any }) => item.width)
					.map((item: { width: any }) => Number(item.width))
					.reduce((m: any, n: any) => m + n, 0)
				const RemainItemArr = props.columns!.filter((item: { width: any }) => !item.width).map((item: { title: any }) => item.title!.toString().length)
				const RemainItemWidth = (Math.max(...RemainItemArr) + 1) * 12 + 8 * 2 + 2
				const RemainWidth = RemainItemArr.length * RemainItemWidth
				// debugger
				// console.log("sss", parent.getBoundingClientRect().width);
				// 表头列数据过多时，自动可以横向滚动，不要挤压在一起
				setX(Math.max(parent.getBoundingClientRect().width, FixedWidth + RemainWidth))
			}
		}
	}, [xScroll, id])

	// 有数据的时候，请一定要在规定的区域内，表头死活不能上下移动，表格内容死活一定要能上下左右随意滑动
	const handleResizeY = useCallback(() => {
		if (yScroll && id) {
			const parent = document.getElementById(id)
			if (parent) {
				const thead = parent.getElementsByClassName('ant-table-thead')[0]
				if (thead) {
					const ParentHeight = parent.getBoundingClientRect().height
					const TheadHeight = thead.getBoundingClientRect().height
					const height = math.subtract(ParentHeight, TheadHeight)
					setY(height)
					// debugger
					setTimeout(() => {
						const tbody = parent.getElementsByClassName('ant-table-body')[0]
						if (tbody) (tbody as HTMLElement).style.height = height + 'px'
						// 没数据的时候，请一定将“暂无数据”的UI图上下左右居中
						const placeholder = parent.getElementsByClassName('ant-table-placeholder')[0]
						if (placeholder) (placeholder as HTMLElement).style.height = height + 'px'
					}, 30)
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [yScroll, id, dataSourceLength])

	// 初始化
	useEffect(() => {
		handleResizeY()
	}, [handleResizeY])

	// 监听页面缩放，重新计算高度和宽度
	useEventListener('resize', handleResizeY)

	//* 处理行点击事件
	const onRowClick = useCallback((record: any, index: number) => {
		// console.log("处理行点击事件 onRowClick");
		if (rowSelection === 'checkbox') {
			let selectedRowKeys = props.selectedRowKeys!
			let selectedIds = props.selectedIds
			let selectedItem = props.selectedItem
			// if (selectedIds && selectedIds.length > 0) {
			//   const i = selectedIds.indexOf(record.id);
			//   if (i === -1) {  // 避免重复添加
			//     selectedIds && selectedIds.push(record.id);
			//     selectedRowKeys.push(index);
			// 		selectedItem = record
			//   } else {
			//     selectedIds.splice(i, 1);
			//     selectedRowKeys.splice(i, 1);
			// 		selectedItem = record
			//   }
			// } else {
			//   selectedIds = [record.id];
			//   selectedRowKeys = [index];
			//   selectedItem = record;
			// }
			// updateSelectedItem && updateSelectedItem(selectedRowKeys, selectedItem, selectedIds);
		} else {
			let selectKey = [index]
			const selectedRowKeys = props.selectedRowKeys
			if (selectedRowKeys && selectedRowKeys[0] === index) {
				return
			}
			updateSelectedItem && updateSelectedItem(selectKey, record || {})
		}
	}, [])

	//* 处理行单选框,复选框点击事件
	const rowChange = useCallback((selectedRowKeys: any, selectedRows: any[]) => {
		// console.log("行选择");
		// console.log("selectedRowKeys", selectedRowKeys) // (10) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		// console.log('selectedRows', selectedRows) // (10) [{…}, {…}, {…}, {…}, ....]
		let rowSelectProps = rowSelection
		let selectedIds: number[] = []
		if (rowSelectProps === 'checkbox') {
			selectedRows.forEach((item: any) => {
				selectedIds.push(item.id)
			})
			setState({
				selectedRowKeys,
				selectedIds: selectedIds,
				selectedItem: selectedRows[0],
			})
		}
		updateSelectedItem && updateSelectedItem(selectedRowKeys, selectedRows[0], selectedIds)
	}, [])

	const rowSelectConfig: TableProps['rowSelection'] = {
		type: 'radio',
		selectedRowKeys: selectedRowKeys, // 选择的行数据
		onChange: rowChange,
		onSelect: (record: any, selected: any, selectedRows: any) => {
			console.log('....')
		},
		// onSelectAll: onSelectAll,
		// renderCell(checked, record, index, originNode): any {
		// 	console.log('redner', checked, record, index, originNode);
		// }
	}
	//* 处理行选择：单选框，复选框，无
	let rowSelect: TablesProps['rowSelection'] = rowSelection
	if ([false, null].includes(rowSelect as any)) {
		rowSelect = false
	} else if (rowSelect === 'checkbox') {
		rowSelectConfig.type = 'checkbox'
	} else {
		rowSelect = 'radio'
	}

	// console.log("x,y: ", x, y);

	return (
		<Table<T>
			// className={}
			{...props}
			bordered
			columns={columns}
			dataSource={dataSource}
			rowSelection={rowSelect ? rowSelectConfig : undefined} // 行选择：checkbox|radio及 选择事件
			onRow={(record: any, index: any) => ({
				onClick() {
					if (!rowSelect) return
					onRowClick(record, index)
				},
			})}
			scroll={{ x, y }}
			pagination={{
				size: 'small',
				// 页码改变的回调，参数是改变后的页码及每页条数
				onChange: (page: number, pageSize: number) => {
					console.log('onChange 变化的回调', page, pageSize)
					return updatePage && updatePage(page!, pageSize!)
				},
				onShowSizeChange: (page: number, pageSize: number) => {
					// console.log("onShowSizeChange 变化的回调", current, size);
				},
				// hideOnSinglePage: true, // 只有一个隐藏分页器 (不需要隐藏分页器)
				current: pagination.page,
				pageSize: pagination.pageSize,
				pageSizeOptions: [10, 20, 50, 100, 500, 1000, 5000, 10000],
				total: pagination.totalCount,
				showTotal: () => `共 ${pagination.totalCount} 条`,
				showQuickJumper: true,
				showSizeChanger: true,
			}}

			// function pagination(data: any, callback: (page: number, pageSize: number) => void) {
			// 	return { ... }
			// }
		/>
	)
}
