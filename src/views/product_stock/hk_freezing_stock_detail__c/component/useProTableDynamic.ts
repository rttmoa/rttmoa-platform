import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'antd';
import type { ActionType, FormInstance, ProTableProps } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import _ from 'lodash';
import { useSearchSpan } from '@/hooks/useTable/useSearchSpan'; // 公共：屏幕宽度自动计算
import { usePagination } from '@/hooks/useTable/usePagination'; // 公共：页码配置
import useTableRequest from '@/hooks/useTable/useTableRequest'; // 公共：统一请求服务端
import useTabFormSchema from '@/hooks/useTableSchema/useTabFormSchema'; // 公共：表格Form配置
import useTabColumnSchema from '@/hooks/useTableSchema/useTabColumnSchema'; // 公共：表格列配置
import ColumnsConfig from '@/components/TableColumns'; // 公共：表格列配置
import ToolBarRender from './ToolBarRender'; // 新增按钮
import { useWindowSize } from '@/hooks/useWinSize';
import useConfigVirtual from '@/hooks/useTable/useConfig_Virtual';

const selectionColumnWidth = 60;
const emptyTableOps = {};

const useProTableDynamic = ({ api, Virtual = false }: { api: any; Virtual?: boolean }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const handleBeforePageChange = useCallback(() => setLoading(true), []);
	const { setPagination, paginationProps } = usePagination({
		onBeforeChange: handleBeforePageChange,
		initialPageSize: 50,
	});
	const [columnSchema, setcolumnSchema] = useState<any>({}); // 每个表的 FieldSchema 配置
	const [tableInfo, setTableInfo] = useState<any>({ tableName: '', collection: '' }); // 每个表的表名
	const [tableData, setTableData] = useState<any[]>([]);
	const { tableName, collection } = tableInfo;
	const { handleRequest, findApi } = useTableRequest(api, setLoading, setcolumnSchema, setPagination, setTableInfo, undefined, setTableData);

	const searchSpan = useSearchSpan();
	const { innerHeight } = useWindowSize();

	const actionRef = useRef<ActionType>();
	const formRef = useRef<FormInstance>();
	const [form] = Form.useForm();

	const [editableKeys, setEditableKeys] = useState<React.Key[]>([]); // 行内编辑

	const [openSearch, setOpenSearch] = useState<boolean>(false);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // 操作后，取消勾选的表格数据
	const [roundupLoading, setRoundupLoading] = useState<boolean>(false);

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

	const handleRoundup = useCallback(async () => {
		if (selectedRows.length === 0) {
			message.warning('请先勾选需要出库的数据');
			return false;
		}

		setRoundupLoading(true);
		try {
			const res: any = await api.roundup({ selectedRows });
			if (res?.code === 200 && res?.data?.success) {
				message.success(res?.data?.message || '出库成功');
				clearSelection();
				actionRef.current?.reloadAndRest?.();
				return true;
			}

			message.error(res?.data?.message || res?.msg || '出库失败');
			return false;
		} catch (error: any) {
			message.error(error?.message || error?.msg || '出库失败，请重试！');
			return false;
		} finally {
			setRoundupLoading(false);
		}
	}, [api, selectedRows, clearSelection]);

	const columnsSchemaField = useTabColumnSchema(columnSchema); // 设置列：标题、宽度、类型(string,number)等
	const formSchemaField = useTabFormSchema(columnSchema);
	const tableOps = columnSchema?.__ops__ || emptyTableOps;
	const columnsCfg = useMemo(
		() =>
			ColumnsConfig(modalOperate, modalResult, columnsSchemaField, tableOps).map((column: any) => {
				const field = column.dataIndex;
				if (typeof field !== 'string' || columnSchema?.[field]?.editable) return column;

				return {
					...column,
					shouldCellUpdate: (record: any, prevRecord: any) => record?.[field] !== prevRecord?.[field],
				};
			}),
		[modalOperate, modalResult, columnsSchemaField, tableOps, columnSchema]
	);
	const tableScrollX = useMemo(
		() => selectionColumnWidth + columnsCfg.reduce((total, column: any) => total + (Number(column.width) || 120), 0),
		[columnsCfg]
	);
	const { virtualClassName, virtualProps } = useConfigVirtual({
		Virtual,
		innerHeight,
		openSearch,
		selectedRowsLength: selectedRows.length,
		tableScrollX,
	});

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
		const pageSize = Number(paginationProps.pageSize) || 20;

		setcolumnSchema({});
		await handleRequest({ current, pageSize }, {}, {});
		actionRef.current?.reload();
	}, [handleRequest, paginationProps.current, paginationProps.pageSize]);
	const toolBarParams: any = useMemo(
		() => ({
			loading,
			roundupLoading,
			quickSearch,
			openSearch,
			setOpenSearch,
			modalOperate,
			tableInfo,
			tableData,
			findApi,
			ImportData,
			columnsCfg,
			ops: tableOps,
			columnSchema,
			reloadTable,
			selectedRows,
			handleRoundup,
		}),
		[loading, roundupLoading, quickSearch, openSearch, modalOperate, tableInfo, tableData, findApi, ImportData, columnsCfg, tableOps, columnSchema, reloadTable, selectedRows, handleRoundup]
	);

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
		className: `ant-pro-table-scroll ant-pro-table-compact mater-stock-hover-table${virtualClassName}`,
		...virtualProps,
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
		tableLayout: 'fixed',
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

	const footerProps = { selectedRows, modalResult };
	
	const showFooter = selectedRows?.length > 0 && tableOps?.allowBatchDelete !== false;

	// 新建弹窗 Modal
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

	return { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps };
};

export default useProTableDynamic;
