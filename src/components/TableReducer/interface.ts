// types.ts
import { TableProps } from 'antd/lib/table/InternalTable'

export interface Columns {
	[propName: string]: any
}

// 查询方法
interface queryActionType {
	(arg: any): Promise<any>
}

// 生成表头方法
export interface ColumnFunc {
	(updateMethod?: queryActionType): Array<Columns>
}

// 表格组件Props
export interface ArgTableProps {
	baseProps?: TableProps<any>
	owncolumns: ColumnFunc
	queryAction: queryActionType
	params?: any
	defaultCurrent?: number
	noInit?: boolean
}

// 页码状态
export interface paginationInitialType {
	current: number
	pageSize: number
	total: number
}

// 表格初始化状态
export interface initialStateType {
	loading: boolean
	pagination: paginationInitialType
	dataSource: Array<any>
}

// 操作类型
export interface actionType {
	type: string
	payload?: any
}
