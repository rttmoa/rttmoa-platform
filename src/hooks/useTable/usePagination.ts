import { TablePaginationConfig } from 'antd';
import { useCallback, useMemo, useState } from 'react';

/**
 * ！！！分页
 */
export const usePagination = ({ onBeforeChange, initialPageSize = 50 }: { onBeforeChange?: () => void; initialPageSize?: number } = {}) => {
	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: initialPageSize,
		total: 0,
	});

	const handleChange = useCallback(
		(page: number, pageSize: number) => {
			setPagination(prev => {
				if (prev.page === page && prev.pageSize === pageSize) return prev;
				onBeforeChange?.();
				return {
					...prev,
					page,
					pageSize,
				};
			});
		},
		[onBeforeChange]
	);

	/** 生成 ProTable.pagination 配置 */
	const paginationProps: TablePaginationConfig = useMemo(
		() => ({
			size: 'default',
			showQuickJumper: true,
			showSizeChanger: true,
			pageSizeOptions: [10, 15, 20, 30, 50, 100],
			current: pagination.page,
			pageSize: pagination.pageSize,
			total: pagination.total,
			onChange: handleChange,
			showTotal: () => `第 ${pagination.page} 页，共 ${pagination.total} 条`,
		}),
		[handleChange, pagination.page, pagination.pageSize, pagination.total]
	);

	return {
		pagination,
		setPagination,
		paginationProps,
	};
};
