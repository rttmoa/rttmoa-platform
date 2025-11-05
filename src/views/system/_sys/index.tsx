import { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import ColumnsConfig from './component/Column';
import ToolBarRender from './component/ToolBar';
import ModalComponent from './component/Modal';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import { systemAPI } from '@/api/modules/system';

// 新增表时：
// 	1、前端修改路由、表格api查询等方法的修改
// 	2、列字段修改 — Column.tsx
// 	3、弹窗字段修改 — Modal.tsx
// 常用字段：文本、数值、选择框、日期

const useProTable = () => {
	const tableName = '岗位管理';
	const tablePersistence = 'system_sys'; // 持久化 Key

	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref
	const [form] = Form.useForm();

	const [searchSpan, setSearchSpan] = useState(6); // 搜索条件显示多少个 span
	const [editableKeys, setEditableKeys] = useState<React.Key[]>([]); // 可编辑行

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	const [loading, setLoading] = useState<boolean>(false); // Loading：加载Loading
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	const [tableData, setTableData] = useState<any[]>([]); // 表格数据
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据

	// Drawer
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({}); // Drawer 选择当前行数据
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false); // Drawer 是否显示

	// Modal
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<'create' | 'edit' | 'detail'>('create');
	const [modalUserInfo, setModalUserInfo] = useState<any>({});

	const api = {
		find: systemAPI.sysFind,
		add: systemAPI.sysAdd,
		modify: systemAPI.sysMod,
		del: systemAPI.sysDel,
		delMore: systemAPI.sysDelMore,
		importEx: systemAPI.sysImportEx,
	};

	useEffect(() => {
		const updateSpan = () => {
			const width = window.innerWidth;
			if (width >= 1600) {
				setSearchSpan(4);
			} else if (width >= 1200) {
				setSearchSpan(6);
			} else if (width >= 768) {
				setSearchSpan(8);
			} else {
				setSearchSpan(12);
			}
		};
		updateSpan(); // 初始化执行一次
		window.addEventListener('resize', updateSpan); // 监听窗口大小变化
		return () => window.removeEventListener('resize', updateSpan); // 卸载时移除监听
	}, []);

	// Modal 操作：创建、编辑、详情
	const modalOperate = (type: 'create' | 'edit' | 'detail', item?: any) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else {
			setModalIsVisible(true);
			setModalUserInfo(item || {});
			setModalTitle(type === 'create' ? '新建' : '编辑');
		}
	};

	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const modalResult = useCallback(
		async (type: string, item: any) => {
			try {
				if (['create', 'edit'].includes(type)) {
					const hide = message.loading(type === 'create' ? '正在添加' : '正在编辑');
					const res = type === 'create' ? await api.add(item) : await api.modify(item._id, item);
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
					const res = type === 'delete' ? await api.del(item._id) : await api.delMore(ids);
					hide();
					if (res) {
						if (type === 'moreDelete') setSelectedRows([]);
						actionRef.current?.reloadAndRest?.();
						message.success(`${type === 'delete' ? `删除成功` : `删除 ${selectedRows.length} 条记录成功`}`);
					}
				}
			} catch (error: any) {
				message.error(error.message || '操作失败，请重试！');
			}
		},
		[selectedRows, form]
	);

	const quickSearch = () => {};

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

	// * 发请求：当表格参数变化
	// * 搜索条件类型为：字符串、数字、日期、筛选比如男女这样的等格式测试
	// * 表头搜索、排序搜索、分页搜索等
	// * 统一搜索格式
	// * 排序：每个字段排序、不可多个字段排序
	const handleRequest = useCallback(
		async (params: any, sort: any, filter: any) => {
			setLoading(true);
			try {
				const searchParams = { ...params };
				delete searchParams.current;
				delete searchParams.pageSize;

				const mappedSort = Object.fromEntries(Object.entries(sort).map(([field, order]) => [field, order === 'ascend' ? 'asc' : 'desc']));

				const payload = {
					search: searchParams, // 表头过滤
					filter,
					pagination: {
						page: params.current,
						pageSize: params.pageSize,
					},
					sort: mappedSort,
				};
				// console.log('岗位搜索条件：', payload);
				// console.log('岗位查询：', payload.search);

				const { data }: any = await api.find(payload);
				// console.log('岗位接口数据：', data);
				SetPagination((prev: any) => ({ ...prev, total: data.total }));
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
		[api.find]
	);

	// * 工具栏 ToolBar
	let toolBarParams: any = {
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
		modalOperate,
		tableName,
		tableData,
		ImportData,
	};

	const pageConfig = {
		size: 'default',
		showQuickJumper: true,
		showSizeChanger: true,
		...pagination,
		pageSizeOptions: [10, 15, 20, 30, 50],
		onChange: (page: number, pageSize: number) => {
			SetPagination({ ...pagination, page, pageSize });
		},
		showTotal: () => `第 ${pagination.page} 页，共 ${pagination.total} 条`,
	};

	const allWidth = ColumnsConfig('', '').reduce((sum: any, col: any) => sum + (col.width || 0), 0);

	return (
		<>
			<ProTable<any>
				rowKey='_id'
				className='ant-pro-table-scroll'
				scroll={{ x: allWidth, y: '100vh' }} // 100vh
				headerTitle={tableName}
				loading={loading}
				formRef={formRef} // 可以获取到查询表单的 form 实例
				actionRef={actionRef} // 操作 Table
				bordered
				cardBordered
				dateFormatter='number'
				defaultSize='small'
				columns={ColumnsConfig(modalOperate, modalResult)}
				toolBarRender={() => ToolBarRender(toolBarParams)} // 渲染工具栏
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: searchSpan, showHiddenNum: true }} // 搜索表单配置
				request={handleRequest}
				pagination={{ ...pageConfig }}
				rowSelection={{
					onChange: (selectedRowKeys, selectedRows) => setSelectedRows(selectedRows),
				}}
				editable={{
					type: 'multiple',
					editableKeys,
					onChange: setEditableKeys,
					onSave: async (key, row) => {
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
							// handleRequest()
							message.success(`删除成功`);
						} else {
							message.success(`删除失败：服务器错误！`);
						}
					},
				}}
				ghost={false}
				onSizeChange={() => {}} // Table 尺寸发生改变、将尺寸存储到数据库中
				onRequestError={(error: any) => {}} // 数据加载失败时触发
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: `key_${tablePersistence}`,
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
			/>

			{selectedRows?.length > 0 && <FooterComponent selectedRows={selectedRows} modalResult={modalResult} />}

			<ModalComponent form={form} modalIsVisible={modalIsVisible} setModalIsVisible={setModalIsVisible} modalTitle={modalTitle} modalType={modalType} modalUserInfo={modalUserInfo} modalResult={modalResult} />

			<DrawerComponent
				drawerIsVisible={drawerIsVisible}
				drawerCurrentRow={{ ...drawerCurrentRow, name: drawerCurrentRow?.postName }}
				drawerClose={() => {
					setDrawerCurrentRow({});
					setDrawerIsVisible(false);
				}}
				columnsConfig={ColumnsConfig}
				modalOperate={modalOperate}
				modalResult={modalResult}
			/>
		</>
	);
};

export default useProTable;
