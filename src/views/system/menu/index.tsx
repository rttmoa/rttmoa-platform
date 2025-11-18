import { useCallback, useRef, useState } from 'react';
import { Form } from 'antd';
import { formatDataForProTable } from '@/utils';
import { UserList } from '@/api/interface';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import ColumnsConfig from './component/Column';
import ToolBarRender from './component/ToolBar';
import { DelMenu, delMoreJob, FindAllMenu, InsNewMenu, UpMenu } from '@/api/modules/system';
import './index.less';
import ModalComponent from './component/Modal';
import FooterComponent from '@/components/TableFooter';
import DrawerComponent from '@/components/TableDrawer';
import usePermissions from '@/hooks/usePermissions';
import { RootState, useSelector } from '@/redux';

export type FormValueType = {
	target?: string;
	template?: string;
	type?: string;
	time?: string;
	frequency?: string;
} & Partial<UserList>;

const useProTable = () => {
	const globalToken = useSelector((state: RootState) => state.user.token);
	const { initPermissions } = usePermissions();

	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref

	const [form] = Form.useForm();

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	const [loading, SetLoading] = useState<boolean>(false); // Loading：加载Loading
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	const [menuList, setMenuList] = useState<[]>([]);
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据

	// Drawer
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({}); // Drawer 选择当前行数据
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false); // Drawer 是否显示

	// Modal
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<string>('');
	const [modalUserInfo, setModalUserInfo] = useState({});

	const [rowKeys, setRowKeys] = useState([]);

	const quickSearch = () => {};

	// * 操作 — 新建、编辑、详情、删除  按钮
	const handleOperator = (type: 'create' | 'edit' | 'detail', item?: any) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else {
			setModalIsVisible(true);
			setModalUserInfo(item || {});
			setModalTitle(type === 'create' ? '新建岗位' : '编辑岗位	');
		}
	};

	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const handleModalSubmit = useCallback(
		async (type: string, item: any) => {
			try {
				if (['create', 'edit'].includes(type)) {
					const hide = message.loading(type === 'create' ? '正在添加' : '正在编辑');
					const res = type === 'create' ? await InsNewMenu(item) : await UpMenu(item);
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
					const res = type === 'delete' ? await DelMenu(item) : message.warning('多选删除正在开发中');
					hide();
					if (res) {
						if (type === 'moreDelete') setSelectedRows([]);
						actionRef.current?.reloadAndRest?.();
						message.success(`成功删除${type === 'delete' ? ` ${item?.postName}` : '多条'}记录`);
					}
				}
				await initPermissions(globalToken);
			} catch (error: any) {
				message.error(error.message || '操作失败，请重试！');
			}
		},
		[selectedRows, form]
	);

	// * 工具栏 ToolBar
	let ToolBarParams: any = {
		quickSearch,
		openSearch,
		SetOpenSearch,
		handleOperator,
		setRowKeys,
		SetLoading,
		menuList,
	};

	// * 表格封装成通用
	return (
		<>
			<ProTable<UserList>
				rowKey='unique' // ! 此key设置错误、导致点击某一个展开、全部节点全展开
				className='ant-pro-table-scroll'
				scroll={{ y: '100vh' }} // 100vh
				bordered
				// cardBordered
				dateFormatter='string'
				headerTitle='使用 ProTable'
				defaultSize='small'
				loading={loading}
				columns={ColumnsConfig(handleOperator, handleModalSubmit)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				actionRef={actionRef} // Table action 的引用，便于自定义触发 actionRef.current.reset()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				request={async (params, sort, filter) => {
					SetLoading(true);
					const res: any = await FindAllMenu({ name: 'all' });
					// console.log('获取菜单结果：', res);
					let format = {
						list: res.data,
						current: res.page,
						pageSize: res.pageSise,
						total: res.total,
					};
					setMenuList(res.data);
					SetLoading(false);
					SetPagination({ ...pagination, total: format.total });
					return formatDataForProTable<any>({ ...format });
				}}
				expandable={{
					defaultExpandAllRows: true,
					expandedRowKeys: rowKeys, // * 默认展开，  展开全部的话就是所有的父节点集合
					onExpandedRowsChange: (data: any) => {
						setRowKeys(data);
					},
				}}
				search={false}
				pagination={false}
				options={false}
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
				menuList={menuList}
				modalTitle={modalTitle} // 标题
				modalType={modalType} // 类型
				modalIsVisible={modalIsVisible} // 显示
				modalMenuInfo={modalUserInfo} // 菜单信息
				setModalIsVisible={setModalIsVisible} // 设置显示
				handleModalSubmit={handleModalSubmit}
			/>

			<DrawerComponent
				drawerIsVisible={drawerIsVisible}
				drawerCurrentRow={{ ...drawerCurrentRow, name: drawerCurrentRow?.meta?.title }}
				drawerClose={() => {
					setDrawerCurrentRow({});
					setDrawerIsVisible(false);
				}}
				columnsConfig={ColumnsConfig}
				modalOperate={handleOperator}
				modalResult={handleModalSubmit}
			/>
		</>
	);
};

export default useProTable;
