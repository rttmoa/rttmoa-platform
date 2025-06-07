import { TableProps } from 'antd';

interface TablesProps {
	size?: string;
	id?: string;
	heghtAuto?: boolean;
	xScroll?: boolean;
	yScroll?: boolean;
	sticky?: any;
	loading?: TableProps['loading'];
	columns: TableProps['columns'];
	dataSource: TableProps['dataSource'];
	// 分页配置
	pagination: {
		page?: number;
		pageSize?: number;
		totalCount?: number;
	};
	scroll?: TableProps['scroll'];
	rowSelection?: 'checkbox' | 'radio' | false | null;

	selectedRowKeys?: number[];
	selectedIds?: number[];
	selectedItem?: any;
	updateSelectedItem?: (selectKey?: any, selectedRows?: any, selectedIds?: any) => void;
	/**
	 * @param page 页码回调
	 * @param pageSize 每页数量回调
	 * @returns
	 */
	updatePage?: (page: number, pageSize: number) => void;
	summary?: () => any;
}

export interface MultiTableProps<T> extends TableProps<T> {
	size?: any;
	id?: string;
	heghtAuto?: boolean;
	xScroll?: boolean;
	yScroll?: boolean;
	sticky?: any;
	loading?: TableProps['loading'];
	columns: any; // TableProps['columns']
	dataSource: TableProps['dataSource'];
	// 分页配置
	pagination: {
		page?: number;
		pageSize?: number;
		totalCount?: number;
	};
	scroll?: TableProps['scroll'];
	rowSelection?: any; // 'checkbox' | 'radio' | false | null

	selectedRowKeys?: number[];
	selectedIds?: number[];
	selectedItem?: any;
	updateSelectedItem?: (selectKey?: any, selectedRows?: any, selectedIds?: any) => void;
	/**
	 * @param page 页码回调
	 * @param pageSize 每页数量回调
	 * @returns
	 */
	updatePage?: (page: number, pageSize: number) => void;
	summary?: () => any;
}
