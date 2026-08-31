import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Form } from 'antd';
import type { ActionType, FormInstance, ProTableProps } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import useTabColumnSchema from '@/hooks/useTableSchema/useTabColumnSchema';
import useTabFormSchema from '@/hooks/useTableSchema/useTabFormSchema';
import ColumnsConfig from '@/components/TableColumns';
import { usePagination } from '@/hooks/useTable/usePagination';
import { useSearchSpan } from '@/hooks/useTable/useSearchSpan';
import useTableRequest from '@/hooks/useTable/useTableRequest';
import _ from 'lodash';

const useProTableDynamic = ({ api }: any) => {
	const { setPagination, paginationProps } = usePagination({
		onBeforeChange: () => setLoading(true),
	});

	const [loading, setLoading] = useState<boolean>(false);
	const [columnSchema, setcolumnSchema] = useState<any>({});
	const [initColumnSchema, setInitColumnSchema] = useState<any>({});
	const [tableInfo, setTableInfo] = useState<any>({ tableName: '', collection: '' });
	const { tableName, collection } = tableInfo;
	const searchSpan = useSearchSpan();

	const actionRef = useRef<ActionType>();
	const formRef = useRef<FormInstance>();
	const [form] = Form.useForm();

	const [editableKeys, setEditableKeys] = useState<React.Key[]>([]); // 行内编辑

	const [openSearch, setOpenSearch] = useState<boolean>(false);
	const [tableData, setTableData] = useState<any[]>([]);
	const { handleRequest } = useTableRequest(api, setLoading, setcolumnSchema, setPagination, setTableInfo, setInitColumnSchema, setTableData);
	const [selectedRows, setSelectedRows] = useState<any[]>([]);
	const [printModalVisible, setPrintModalVisible] = useState<boolean>(false);
	const [printRecord, setPrintRecord] = useState<any>({});
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({});
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false);

	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<'create' | 'edit' | 'detail'>('create');
	const [modalUserInfo, setModalUserInfo] = useState<any>({});

	const modalOperate = (type: 'create' | 'edit' | 'detail', item?: any) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else {
			setModalIsVisible(true);
			setModalUserInfo(item || {});
			setModalTitle(type === 'create' ? '创建单据' : '编辑');
		}
	};
	
	const clearSelection = useCallback(() => {
		setSelectedRowKeys([]);
		setSelectedRows([]);
	}, []);
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
				} else if (type === 'refresh') {
					actionRef.current?.reload();
				}
			} catch (error: any) {
				message.error(error.message || '操作失败，请重试！');
			}
		},
		[selectedRows, form, clearSelection]
	);

	const quickSearch = () => {};
	const openPrintModal = (record: any) => {
		setPrintRecord(record || {});
		setPrintModalVisible(true);
	};

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

	const columnsSchemaField = useTabColumnSchema(columnSchema);
	const formSchemaField = useTabFormSchema(columnSchema);
	const tableOps = columnSchema?.__ops__ || {};
	const columnsCfg = ColumnsConfig(modalOperate, modalResult, columnsSchemaField, tableOps);

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

	const reloadTable = useCallback(async () => {
		const current = Number(paginationProps.current) || 1;
		const pageSize = Number(paginationProps.pageSize) || 50;

		setcolumnSchema({});
		setInitColumnSchema({});
		await handleRequest({ current, pageSize }, {}, {});
		actionRef.current?.reload();
	}, [handleRequest, paginationProps.current, paginationProps.pageSize]);

	const toolBarParams: any = {
		quickSearch,
		openSearch,
		setOpenSearch,
		modalOperate,
		tableName,
		tableData,
		ImportData,
		columnsCfg,
		ops: tableOps,
		loading,
		selectedRows,
		openPrintModal,
		columnSchema,
		initColumnSchema,
		reloadTable,
	};

	const proTableProps: ProTableProps<any, any> = {
		rowKey: '_id',
		className: 'ant-pro-table-scroll  ant-pro-table-compact    mater-stock-hover-table',
		scroll: { y: '100vh' },
		headerTitle: tableName,
		loading,
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
		options: {
			reload: true,
			density: false,
			setting: true,
		},
		// 表头查询方式： query | light
		search: openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: searchSpan, showHiddenNum: true },
		request: handleRequest,
		form: {
			onValuesChange: () => debouncedSubmit(),
		},
		pagination: paginationProps,
		rowSelection: {
			selectedRowKeys,
			onChange: (keys: React.Key[], rows: any[]) => {
				setSelectedRowKeys(keys);
				setSelectedRows(rows);
			},
		},
		editable: {
			type: 'multiple',
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
		},
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

	const modalProps = {
		api,
		form,
		modalIsVisible,
		setModalIsVisible,
		modalTitle,
		modalType,
		modalUserInfo,
		modalResult,
		formSchemaField,
	};

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

	const printModalProps = {
		api,
		open: printModalVisible,
		record: printRecord,
		onCancel: () => {
			setPrintModalVisible(false);
			setPrintRecord({});
		},
	};

	return { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps, printModalProps };
};

export default useProTableDynamic;
