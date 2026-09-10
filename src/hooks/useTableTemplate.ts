import { useCallback, useRef, useState } from 'react';
import { Form } from 'antd';
import type { ActionType } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { message } from '@/hooks/useMessage';

// 定义表格数据类型接口
export interface TableDataItem {
	_id: string;
	[key: string]: any;
}

// 定义操作类型
export type ModalType = 'create' | 'edit' | 'detail';

// 定义表格配置接口
export interface TableTemplateConfig<T extends TableDataItem> {
	tableName: string;
	apiMethods: {
		find: (payload: any) => Promise<any>;
		add: (data: any) => Promise<any>;
		modify: (id: string, data: any) => Promise<any>;
		del: (id: string) => Promise<any>;
		delMore: (ids: string[]) => Promise<any>;
		import?: (data: any) => Promise<any>;
	};
	nameField: keyof T;
	columnsConfig: (modalOperate: any, modalResult: any) => any[];
}

/**
 * 通用表格模板 Hooks
 * 可用于快速构建具备 CRUD 功能的表格页面
 * 【job_1 模板的 公共函数部分】
 */
export const useTableTemplate = <T extends TableDataItem>(config: TableTemplateConfig<T>) => {
	const { tableName, apiMethods, nameField, columnsConfig } = config;

	// 表格相关状态
	const actionRef = useRef<ActionType>(undefined);
	const formRef = useRef<FormInstance>(undefined);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState<{ page: number; pageSize: number; total: number }>({
		page: 1,
		pageSize: 10,
		total: 0,
	});
	const [selectedRows, setSelectedRows] = useState<T[]>([]);
	const [openSearch, setOpenSearch] = useState<boolean>(false);

	// Drawer 相关状态
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false);
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({});

	// Modal 相关状态
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<ModalType>('create');
	const [modalData, setModalData] = useState<T | {}>({});

	// Modal 操作：创建、编辑、详情
	const modalOperate = useCallback(
		(type: ModalType, item?: T) => {
			setModalType(type);
			if (type === 'detail') {
				setDrawerIsVisible(true);
				setDrawerCurrentRow(item || {});
			} else {
				setModalIsVisible(true);
				setModalData(item || {});
				setModalTitle(type === 'create' ? `新建${tableName}` : `编辑${tableName}`);
			}
		},
		[tableName]
	);

	// 处理表单提交结果
	const modalResult = useCallback(
		async (type: string, item: any) => {
			try {
				if (['create', 'edit'].includes(type)) {
					const hide = message.loading(type === 'create' ? '正在添加' : '正在编辑');
					const res = type === 'create' ? await apiMethods.add(item) : await apiMethods.modify(item._id, item);
					hide();

					if (res) {
						form.resetFields();
						setModalIsVisible(false);
						actionRef.current?.reload();
						message.success(type === 'create' ? '添加成功' : '编辑成功');
					}
				} else if (['delete', 'moreDelete'].includes(type)) {
					const hide = message.loading('正在删除');
					const ids = type === 'delete' ? [item._id] : selectedRows.map(row => row._id);
					const res = type === 'delete' ? await apiMethods.del(item._id) : await apiMethods.delMore(ids);
					hide();

					if (res) {
						if (type === 'moreDelete') setSelectedRows([]);
						actionRef.current?.reloadAndRest?.();
						message.success(`成功删除${type === 'delete' ? ` ${item?.[nameField]}` : '多条'}记录`);
					}
				}
			} catch (error: any) {
				message.error(error.message || '操作失败，请重试！');
			}
		},
		[selectedRows, form, apiMethods, nameField]
	);

	// 导入数据处理
	const handleImport = useCallback(
		async (data: any) => {
			if (!apiMethods.import) {
				message.error('导入功能未实现');
				return;
			}

			const hide = message.loading('数据正在导入中');
			try {
				await apiMethods.import(data);
				hide();
				actionRef.current?.reload();
				message.success('导入完成');
			} catch (error: any) {
				hide();
				message.error(error.message || error.msg || '导入失败');
			}
		},
		[apiMethods]
	);

	// 处理表格数据请求
	const handleRequest = useCallback(
		async (params: any, sort: any, filter: any) => {
			setLoading(true);
			try {
				const searchParams = { ...params };
				delete searchParams.current;
				delete searchParams.pageSize;

				const mappedSort = Object.fromEntries(Object.entries(sort).map(([field, order]) => [field, order === 'ascend' ? 'asc' : 'desc']));

				const payload = {
					search: searchParams,
					filter,
					pagination: {
						page: params.current,
						pageSize: params.pageSize,
					},
					sort: mappedSort,
				};

				const { data }: any = await apiMethods.find(payload);
				setPagination(prev => ({ ...prev, total: data.total }));

				return {
					data: data.list,
					success: true,
					total: data.total,
				};
			} catch (error) {
				message.error('数据加载失败');
				return { data: [], success: false, total: 0 };
			} finally {
				setLoading(false);
			}
		},
		[apiMethods.find]
	);

	// 计算表格总宽度
	const calculateTableWidth = useCallback(() => {
		const columns = columnsConfig(modalOperate, modalResult);
		return columns.reduce((sum: number, col: any) => sum + (col.width || 0), 0);
	}, [columnsConfig, modalOperate, modalResult]);

	// 获取工具栏参数
	const getToolBarParams = useCallback(() => {
		return {
			openSearch,
			setOpenSearch,
			modalOperate,
			tableName,
			handleImport,
		};
	}, [openSearch, setOpenSearch, modalOperate, tableName, handleImport]);

	return {
		// 状态
		loading,
		pagination,
		setPagination,
		selectedRows,
		setSelectedRows,
		openSearch,
		setOpenSearch,
		drawerIsVisible,
		setDrawerIsVisible,
		drawerCurrentRow,
		setDrawerCurrentRow,
		modalIsVisible,
		setModalIsVisible,
		modalTitle,
		modalType,
		modalData,

		// 引用
		actionRef,
		formRef,
		form,

		// 方法
		modalOperate,
		modalResult,
		handleRequest,
		calculateTableWidth,
		getToolBarParams,

		// 配置
		tableName,
		columnsConfig,
		nameField,
	};
};

// 导出类型
export type TableTemplateReturn<T extends TableDataItem> = ReturnType<typeof useTableTemplate<T>>;
