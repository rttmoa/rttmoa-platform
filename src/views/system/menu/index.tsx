import { useCallback, useRef, useState } from 'react';
import type { Key } from 'react';
import { Form } from 'antd';
import { formatDataForProTable } from '@/utils';
import { UserList } from '@/api/interface';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import ColumnsConfig from './component/Column';
import ToolBarRender from './component/ToolBar';
import { DelMenu, DelMoreMenu, FindAllMenu, InsNewMenu, UpMenu } from '@/api/modules/system';
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

const findMenuByUnique = (list: any[] = [], key: any): any => {
	for (const item of list) {
		if (item?.unique === key || item?._id === key || item?.id === key) return item;
		const child = findMenuByUnique(item?.children || [], key);
		if (child) return child;
	}
	return null;
};

const toYesNo = (value: any) => {
	if (value === true || value === 1 || value === '是') return '是';
	return '否';
};

const getMetaValue = (row: any, original: any, key: string) => {
	return row?.meta?.[key] ?? row?.[`meta.${key}`] ?? row?.[`meta,${key}`] ?? original?.meta?.[key];
};

const buildMenuUpdatePayload = (row: any, original: any, key: any) => {
	return {
		_id: row?._id ?? row?.unique ?? original?._id ?? original?.unique ?? key,
		parent_id: row?.parent_id ?? original?.parent_id ?? 0,
		path: row?.path ?? original?.path,
		element: row?.element ?? original?.element,
		redirect: row?.redirect ?? original?.redirect,
		type: getMetaValue(row, original, 'type'),
		key: getMetaValue(row, original, 'key'),
		title: getMetaValue(row, original, 'title'),
		icon: getMetaValue(row, original, 'icon'),
		sort: getMetaValue(row, original, 'sort'),
		enable: getMetaValue(row, original, 'enable'),
		isLink: getMetaValue(row, original, 'isLink'),
		isHide: toYesNo(getMetaValue(row, original, 'isHide')),
		isFull: toYesNo(getMetaValue(row, original, 'isFull')),
		isAffix: toYesNo(getMetaValue(row, original, 'isAffix')),
	};
};

const useProTable = () => {
	const globalToken = useSelector((state: RootState) => state.user.token);
	const { initPermissions } = usePermissions();

	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref

	const [form] = Form.useForm();

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	const [loading, SetLoading] = useState<boolean>(false); // Loading：加载Loading
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	const [menuList, setMenuList] = useState<[]>([]); // 菜单全部
	const [menuOpen, setMenuOpen] = useState<[]>([]); // 菜单开启部分
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据

	console.log('menuList', menuList);

	// Drawer
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<any>({}); // Drawer 选择当前行数据
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false); // Drawer 是否显示

	// Modal
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<string>('');
	const [modalSubMenu, setModalSubMenu] = useState<string>(''); // key
	const [modalItemInfo, setModalItemInfo] = useState({});

	const [rowKeys, setRowKeys] = useState([]);
	const [editableKeys, setEditableKeys] = useState<Key[]>([]);

	const quickSearch = () => {};

	const handleOperator = (type: 'create' | 'edit' | 'detail' | 'createSubMenu', item?: any) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else if (type == 'createSubMenu') {
			setModalItemInfo(item || {});
			setModalTitle('新建子菜单');
			// 设置顶级部门是当前这个 key
			setModalSubMenu(item?.meta?.key);
			setModalIsVisible(true);
		} else {
			setModalIsVisible(true);
			setModalItemInfo(item || {});
			setModalTitle(type === 'create' ? '新建菜单' : '编辑菜单');
		}
	};

	const handleModalSubmit = useCallback(
		async (type: string, item: any) => {
			try {
				console.log('item', item);
				if (['create', 'edit', 'createSubMenu'].includes(type)) {
					const hide = message.loading(type === 'create' ? '正在添加' : '正在编辑');
					// const res = type === 'create' ? await InsNewMenu(item) : await UpMenu(item);
					let res: any = null;
					hide();
					if (type == 'create' || type == 'createSubMenu') {
						res = await InsNewMenu(item);
					} else if (type == 'edit') {
						res = await UpMenu(item);
					}
					if (res) {
						form.resetFields();
						setModalIsVisible(false);
						actionRef.current?.reload();
						message.success(type === 'create' ? '添加成功' : '编辑成功');
					}
				} else if (['delete', 'moreDelete'].includes(type)) {
					const hide = message.loading('正在删除');
					console.log('selectedRows', selectedRows);
					const ids = type === 'delete' ? [item._id] : selectedRows.map(row => row.unique);
					const res = type === 'delete' ? await DelMenu(item) : await DelMoreMenu(ids);
					// const res = type === 'delete' ? await DelMenu(item) : message.warning('禁止删除多个菜单！');

					hide();
					if (res) {
						if (type === 'moreDelete') setSelectedRows([]);
						actionRef.current?.reloadAndRest?.();
						message.success(`成功删除${type === 'delete' ? ` ${item?.postName}` : '多条'}记录`);
					}
				}
				await initPermissions(globalToken, '');
			} catch (error: any) {
				message.error(error.message || '操作失败，请重试！');
			}
		},
		[selectedRows, form]
	);

	// * 工具栏 ToolBar
	const handleInlineSave = useCallback(
		async (key: any, row: any) => {
			const original = findMenuByUnique(menuList, key) || {};
			const payload = buildMenuUpdatePayload(row, original, key);

			if (!payload._id) {
				message.error('编辑失败：行 ID 不存在');
				return;
			}

			const hide = message.loading('正在编辑');
			try {
				const res = await UpMenu(payload);
				hide();
				if (res) {
					form.resetFields();
					setEditableKeys(keys => keys.filter(item => item !== key));
					actionRef.current?.reload();
					message.success('编辑成功');
					await initPermissions(globalToken, '');
				}
			} catch (error: any) {
				hide();
				message.error(error.message || '编辑失败，请重试！');
			}
		},
		[form, globalToken, initPermissions, menuList]
	);

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
				className='ant-pro-table-scroll ant-pro-table-compact mater-stock-hover-table'
				scroll={{ y: '100vh' }} // 100vh
				bordered
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
					const res: any = await FindAllMenu({ name: '全部' });
					// console.log('获取菜单结果：', res);
					let format = {
						list: res?.data,
						current: res?.page,
						pageSize: res?.pageSise,
						total: res?.total,
					};
					setMenuList(res?.data);
					SetPagination({ ...pagination, total: format.total });

					const open: any = await FindAllMenu({ name: '开启' });
					setMenuOpen(open?.data);

					SetLoading(false);
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
				editable={{
					type: 'multiple',
					editableKeys,
					onChange: keys => setEditableKeys(keys as Key[]),
					onSave: handleInlineSave,
				}}
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
				menuOpen={menuOpen}
				modalTitle={modalTitle} // 标题
				modalType={modalType} // 类型
				modalIsVisible={modalIsVisible} // 显示
				modalSubMenu={modalSubMenu}
				modalItemInfo={modalItemInfo} // 菜单信息
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
