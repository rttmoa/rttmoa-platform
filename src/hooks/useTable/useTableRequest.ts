import { useCallback } from 'react';
import { message } from '@/hooks/useMessage';

/**
 * ！！！公共：请求服务端
 */
export default function useTableRequest(api?: any, setLoading?: any, setSchema?: any, setPagination?: any, setTableInfo?: any, setInitSchema?: any, setDataList?: any) {
	const handleRequest = useCallback(
		async (params: any, sort: any, filter: any) => {
			try {
				const searchParams = { ...params };
				delete searchParams.current;
				delete searchParams.pageSize;

				const mappedSort = Object.fromEntries(Object.entries(sort || {}).map(([k, v]) => [k, v === 'ascend' ? 'asc' : 'desc']));

				const payload = {
					search: searchParams,
					filter,
					pagination: { page: params.current, pageSize: params.pageSize },
					...(Object.keys(mappedSort).length ? { sort: mappedSort } : {}),
				};

				const { data }: any = await api.find(payload);

				const list = data?.list || [];
				const total = data?.total || 0;

				setDataList?.(list);

				setPagination?.((prev: any) => {
					if (prev?.total === total) return prev;
					return { ...prev, total };
				});

				setSchema?.((prev: any) => {
					if (prev && Object.keys(prev).length) return prev;
					if (!data?.schema) return prev;
					return data.schema;
				});

				setInitSchema?.((prev: any) => {
					if (prev && Object.keys(prev).length) return prev;
					if (!data?.init_schema && !data?.schema) return prev;
					return data.init_schema || data.schema;
				});

				setTableInfo?.((prev: any) => {
					if (prev?.collection || prev?.tableName) return prev;
					if (!data?.tableInfo) return prev;
					return data.tableInfo;
				});

				return { data: list, success: true, total };
			} catch (err) {
				message.error('数据加载失败');
				return {
					data: [],
					success: false,
					total: 0,
				};
			}
		},
		[api.find]
	);

	const findApi = useCallback(() => api.find(), [api.find]);

	return { handleRequest, findApi };
}
