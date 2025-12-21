import { useCallback } from 'react';
import { message } from '@/hooks/useMessage';

// * 📌 useTableRequest.ts（统一请求）
// * 发请求：当表格参数变化
// * 搜索条件类型为：字符串、数字、日期、筛选比如男女这样的等格式测试
// * 表头搜索、排序搜索、分页搜索等
// * 排序：每个字段排序、不可多个字段排序
export default function useTableRequest(api?: any, setLoading?: any, setSchema?: any, setPagination?: any, setTableInfo?: any) {
	const handleRequest = useCallback(
		async (params: any, sort: any, filter: any) => {
			setLoading(true);
			try {
				const searchParams = { ...params };
				delete searchParams.current;
				delete searchParams.pageSize;

				const mappedSort = Object.fromEntries(Object.entries(sort).map(([k, v]) => [k, v === 'ascend' ? 'asc' : 'desc']));

				const payload = {
					search: searchParams,
					filter,
					pagination: { page: params.current, pageSize: params.pageSize },
					sort: mappedSort,
				};

				const { data }: any = await api.find(payload);

				setTableInfo(data?.tableInfo || {});
				setSchema(data?.schema || {});
				setPagination((prev: any) => ({ ...prev, total: data.total }));

				return { data: data.list, success: true, total: data.total };
			} catch (err) {
				message.error('数据加载失败');
				return {
					data: [],
					success: false,
					total: 0,
				};
			} finally {
				setLoading(false);
			}
		},
		[api.find]
	);

	return { handleRequest };
}
