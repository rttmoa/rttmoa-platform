import { useCallback, useRef, useState } from 'react';
import { Form } from 'antd';
import { formatDataForProTable } from '@/utils';
import { UserList } from '@/api/interface';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import ColumnsConfig from './component/Column';
import ToolBarRender from './component/ToolBar';
import { FindAllMenu, roleAPI } from '@/api/modules/system';
import ModalComponent from './component/Modal';
import ModalAuth from './component/ModalAuth';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';

const useProTable = () => {
	const api = {
		find: roleAPI.find,
		add: roleAPI.add,
		modify: roleAPI.mod,
		del: roleAPI.del,
		delMore: roleAPI.delMore,
	};

	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref

	const [form] = Form.useForm();

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	const [loading, SetLoading] = useState<boolean>(false); // Loading：加载Loading
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据

	// Drawer
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({}); // Drawer 选择当前行数据
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false); // Drawer 是否显示

	// Modal
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<string>('');
	const [modalUserInfo, setModalUserInfo] = useState({});

	const [modalIsOpenAuth, setModalIsOpenAuth] = useState<boolean>(false);

	const [Menus, setMenus] = useState([]);

	const quickSearch = () => {};

	const handleOperator = (type: 'create' | 'edit' | 'detail', item?: any) => {
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
	const handleModalSubmit = useCallback(
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
	('');
	// * 工具栏 ToolBar
	let ToolBarParams: any = {
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
		handleOperator,
	};

	return (
		<>
			<ProTable<UserList>
				rowKey='_id'
				className='ant-pro-table-scroll'
				bordered
				cardBordered
				dateFormatter='string'
				headerTitle='使用 ProTable'
				defaultSize='small'
				loading={loading}
				columns={ColumnsConfig(handleOperator, handleModalSubmit)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				actionRef={actionRef} // Table action 的引用，便于自定义触发 actionRef.current.reset()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: 6 }} // 搜索表单配置
				request={async (params, sort, filter) => {
					SetLoading(true);
					const { data }: any = await api.find({ ...params, page: params.current });
					SetPagination({ ...pagination, total: data.total });

					// const menu: any = await FindAllMenu({ name: '开启' });
					const menu: any = await FindAllMenu({ name: '全部' });
					setMenus(menu?.data || []);

					SetLoading(false);
					return formatDataForProTable<any>({ ...data, page: params.current });
				}}
				pagination={{
					...pagination,
					pageSizeOptions: [10, 20, 30, 50, 100],
					onChange: (page, pageSize) => {
						SetPagination({ ...pagination, page, pageSize });
					},
				}}
				rowSelection={{
					onChange: (selectedRowKeys, selectedRows) => {
						setSelectedRows(selectedRows);
					},
				}}
				ghost={false}
				onSizeChange={() => {}} // Table 尺寸发生改变、将尺寸存储到数据库中
				onRequestError={(error: any) => {}} // 数据加载失败时触发
				editable={{ type: 'multiple' }}
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: 'use-pro-table-key',
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
			/>

			{selectedRows?.length > 0 && <FooterComponent selectedRows={selectedRows} modalResult={handleModalSubmit} />}

			<ModalComponent
				form={form}
				modalIsVisible={modalIsVisible}
				setModalIsVisible={setModalIsVisible}
				modalTitle={modalTitle}
				modalType={modalType}
				modalUserInfo={modalUserInfo}
				handleModalSubmit={handleModalSubmit}
				Menus={Menus}
			/>
			<DrawerComponent
				drawerIsVisible={drawerIsVisible}
				drawerCurrentRow={{ ...drawerCurrentRow, name: drawerCurrentRow?.role_name }}
				drawerClose={() => {
					setDrawerCurrentRow({});
					setDrawerIsVisible(false);
				}}
				columnsConfig={ColumnsConfig}
				modalOperate={handleOperator}
				modalResult={handleModalSubmit}
			/>

			{/* 用户授权组件 */}
			<ModalAuth modalIsOpenAuth={modalIsOpenAuth} setModalIsOpenAuth={setModalIsOpenAuth} />
		</>
	);
};

export default useProTable;
