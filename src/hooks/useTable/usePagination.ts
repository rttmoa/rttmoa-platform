import { TablePaginationConfig } from 'antd';
import { useState } from 'react';

// ✅ usePagination.ts（可直接复制）
export const usePagination = () => {
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 20,
		total: 0,
	});

	/** 生成 ProTable.pagination 配置 */
	const paginationProps: TablePaginationConfig = {
		size: 'default',
		showQuickJumper: true,
		showSizeChanger: true,
		pageSizeOptions: [10, 15, 20, 30, 50],

		current: pagination.page,
		pageSize: pagination.pageSize,
		total: pagination.total,

		onChange: (page: number, pageSize: number) => {
			setPagination(prev => ({
				...prev,
				page,
				pageSize,
			}));
		},

		showTotal: () => `第 ${pagination.page} 页，共 ${pagination.total} 条`,
	};

	return {
		pagination,
		setPagination,
		paginationProps,
	};
};
