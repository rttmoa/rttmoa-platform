import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'antd';
import type { ActionType, FormInstance, ProTableProps } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import _ from 'lodash';
import useHeaderStretch from '@/hooks/useTable/useHeaderStretch';
import { useSearchSpan } from '@/hooks/useTable/useSearchSpan'; // 公共：屏幕宽度自动计算
import { usePagination } from '@/hooks/useTable/usePagination'; // 公共：页码配置
import useTableRequest from '@/hooks/useTable/useTableRequest'; // 公共：统一请求服务端
import useTabFormSchema from '@/hooks/useTableSchema/useTabFormSchema'; // 公共：表格Form配置
import useTabColumnSchema from '@/hooks/useTableSchema/useTabColumnSchema'; // 公共：表格列配置
import ColumnsConfig from '@/components/TableColumns'; // 公共：表格列配置

const useProTableDynamic = ({ api, headerStretch = false }: any) => {
	const [loading, setLoading] = useState<boolean>(false);
	const { setPagination, paginationProps } = usePagination({
		onBeforeChange: () => setLoading(true),
	});
	const [columnSchema, setcolumnSchema] = useState<any>({}); // 每个表的 FieldSchema 配置
	const [initColumnSchema, setInitColumnSchema] = useState<any>({});

	const [tableInfo, setTableInfo] = useState<any>({ tableName: '', collection: '' }); // 每个表的表名
	const { tableName, collection } = tableInfo;
	const searchSpan = useSearchSpan();

	const actionRef = useRef<ActionType>();
	const formRef = useRef<FormInstance>();
	const [form] = Form.useForm();

	const [editableKeys, setEditableKeys] = useState<React.Key[]>([]); // 行内编辑

	const [openSearch, setOpenSearch] = useState<boolean>(false);
	const [dataList, setDataList] = useState<any[]>([]);
	const { handleRequest, findApi } = useTableRequest(api, setLoading, setcolumnSchema, setPagination, setTableInfo, setInitColumnSchema, setDataList);

	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 操作后，取消勾选的表格数据

	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({});
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false);

	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<'create' | 'edit' | 'detail'>('create');
	const [modalUserInfo, setModalUserInfo] = useState<any>({});

	// Modal 设置 type
	const modalOperate = useCallback((type: 'create' | 'edit' | 'detail', item?: any) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else {
			setModalIsVisible(true);
			setModalUserInfo(item || {});
			setModalTitle(type === 'create' ? '新建' : '编辑');
		}
	}, []);

	// 清空选中项
	const clearSelection = useCallback(() => {
		setSelectedRowKeys([]);
		setSelectedRows([]);
	}, []);

	// Modal 新建、编辑、删除、删除更多按钮，统一处理处
	const modalResult = useCallback(
		async (type: string, item: any) => {
			try {
				if (['create', 'edit'].includes(type)) {
					const hide = message.loading(type === 'create' ? '正在添加' : '正在编辑');
					const res = type === 'create' ? await api.add(item) : await api.modify(item._id, item);
					hide();
					if (res) {
						clearSelection();
						form.resetFields();
						setModalIsVisible(false);
						actionRef.current?.reload();
						message.success(type === 'create' ? '添加成功' : '编辑成功');
					}
				} else if (['delete', 'moreDelete'].includes(type)) {
					const hide = message.loading('正在删除');
					const ids = type === 'delete' ? [item._id] : selectedRows.map(row => row._id);
					const res = type === 'delete' ? await api.del(item._id) : await api.delMore(ids);
					hide();
					if (res) {
						clearSelection();
						// if (type === 'moreDelete') setSelectedRows([]);
						actionRef.current?.reloadAndRest?.();
						message.success(`${type === 'delete' ? `删除成功` : `删除 ${selectedRows.length} 条记录成功`}`);
					}
				}
			} catch (error: any) {
				message.error(error.message || '操作失败，请重试！');
			}
		},
		[selectedRows, form, clearSelection]
	);

	const quickSearch = useCallback(() => {}, []);

	const ImportData = useCallback(
		async (data: any) => {
			const hide = message.loading('数据正在导入中');
			try {
				await api.importEx(data);
				hide();
				actionRef?.current?.reload();
				message.success('导入完成');
			} catch (error: any) {
				hide();
				message.error(error.message || error.msg || '导入失败');
			}
		},
		[api.importEx]
	);

	const columnsSchemaField = useTabColumnSchema(columnSchema); // 设置列：标题、宽度、类型(string,number)等
	const formSchemaField = useTabFormSchema(columnSchema);
	const tableOps = columnSchema?.__ops__ || {};
	const columnsCfg = useMemo(() => ColumnsConfig(modalOperate, modalResult, columnsSchemaField, tableOps), [modalOperate, modalResult, columnsSchemaField, tableOps]);

	// * 表头搜索条件变化自动调用服务端
	const debouncedSubmit = useMemo(
		() =>
			_.debounce(() => {
				formRef.current?.submit?.();
			}, 500),
		[]
	);
	useEffect(() => {
		return () => {
			debouncedSubmit.cancel();
		};
	}, [debouncedSubmit]);

	// 工具栏 Config
	const reloadTable = useCallback(async () => {
		const current = Number(paginationProps.current) || 1;
		const pageSize = Number(paginationProps.pageSize) || 50;

		setcolumnSchema({});
		setInitColumnSchema({});
		await handleRequest({ current, pageSize }, {}, {});
		actionRef.current?.reload();
	}, [handleRequest, paginationProps.current, paginationProps.pageSize]);

	// 工具栏 Config
	const toolBarParams: any = useMemo(
		() => ({
			loading,
			quickSearch,
			openSearch,
			setOpenSearch,
			modalOperate,
			tableInfo,
			dataList,
			ImportData,
			columnsCfg,
			ops: tableOps,
			columnSchema,
			initColumnSchema,
			reloadTable,
			findApi,
			selectedRows,
			clearSelection,
		}),
		[loading, quickSearch, openSearch, modalOperate, tableInfo, dataList, ImportData, columnsCfg, tableOps, columnSchema, initColumnSchema, reloadTable, findApi, selectedRows, clearSelection]
	);

	// 勾选表格数据
	const rowSelection = useMemo(
		() => ({
			selectedRowKeys,
			onChange: (keys: React.Key[], rows: any[]) => {
				setSelectedRowKeys(keys);
				setSelectedRows(rows);
			},
		}),
		[selectedRowKeys]
	);

	// 行内编辑
	const editableConfig = useMemo(
		() => ({
			type: 'multiple' as const,
			editableKeys,
			onChange: setEditableKeys,
			onSave: async (_key: any, row: any) => {
				if (row._id) {
					const res = await api.modify(row._id, row);
					if (res) {
						form.resetFields();
						actionRef.current?.reload();
						message.success(`编辑成功！`);
					} else {
						message.success(`编辑失败：服务器错误！`);
					}
				} else {
					message.success(`编辑失败：行iD不存在！`);
				}
			},
			onDelete: async (key: any) => {
				const res = await api.del(key);
				if (res) {
					actionRef.current?.reloadAndRest?.();
					message.success(`删除成功`);
				} else {
					message.success(`删除失败：服务器错误！`);
				}
			},
		}),
		[editableKeys, api, form]
	);

	const proTableProps: ProTableProps<any, any> = {
		rowKey: '_id',
		className: 'ant-pro-table-scroll  ant-pro-table-compact    mater-stock-hover-table',
		scroll: { y: '100vh' },
		headerTitle: tableName,
		formRef,
		actionRef,
		onLoadingChange: nextLoading => {
			if (typeof nextLoading === 'boolean') {
				setLoading(nextLoading);
				return;
			}
			setLoading(Boolean(nextLoading?.spinning ?? nextLoading));
		},
		bordered: true,
		cardBordered: true,
		dateFormatter: 'number',
		defaultSize: 'small',
		columns: columnsCfg,
		// options: false,
		options: {
			reload: true,
			density: false,
			setting: true,
		},
		// 表头查询方式： query | light
		search: openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: searchSpan, showHiddenNum: true },
		debounceTime: 0,
		request: handleRequest, // 服务端接口数据
		form: {
			onValuesChange: () => debouncedSubmit(),
		},
		pagination: paginationProps,
		rowSelection,
		editable: editableConfig,
		ghost: false,
		onSizeChange: () => {},
		onRequestError: (_error: any) => {},
		columnsState: {
			persistenceKey: collection || 'persistenceKey',
			persistenceType: 'localStorage',
		},
	};

	// 表头拖拽功能
	const headerStretchProps = useHeaderStretch(proTableProps);
	const finalProTableProps = headerStretch ? { ...proTableProps, ...headerStretchProps } : proTableProps;

	// Footer 配置
	const footerProps = { selectedRows, modalResult };

	const showFooter = selectedRows?.length > 0 && tableOps?.allowBatchDelete !== false;

	// 新建弹窗 Modal Config
	const modalProps = {
		form,
		modalIsVisible,
		setModalIsVisible,
		modalTitle,
		modalType,
		modalUserInfo,
		modalResult,
		formSchemaField,
	};

	// 查看数据详情的 Drawer
	const drawerProps = {
		drawerIsVisible,
		drawerCurrentRow: { ...drawerCurrentRow },
		drawerClose: () => {
			setDrawerCurrentRow({});
			setDrawerIsVisible(false);
		},
		columnsConfig: ColumnsConfig,
		modalOperate,
		modalResult,
		columnsSchemaField,
		tableOps,
	};

	return { proTableProps: finalProTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps };
};

export default useProTableDynamic;
