import { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from 'antd';
import { formatDataForProTable } from '@/utils';
import { UserList } from '@/api/interface';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import ColumnsConfig from './component/Column';
import ToolBarRender from './component/ToolBar';
import ModalComponent from './component/Modal';
import FooterComponent from '@/components/TableFooter';
import DrawerComponent from '@/components/TableDrawer';
import { roleAPI, user_manageAPI } from '@/api/modules/system';

export type FormValueType = {
	target?: string;
	template?: string;
	type?: string;
	time?: string;
	frequency?: string;
} & Partial<UserList>;

// & 表格待实现：
// * 表头：排序、筛选、过滤
// * 待实现：列拖拽排序、可编辑行、可编辑单元格、响应式、随页面滚动的固定表头和滚动条
const useProTable = () => {
	const api = {
		find: user_manageAPI.find,
		add: user_manageAPI.add,
		modify: user_manageAPI.mod,
		del: user_manageAPI.del,
		delMore: user_manageAPI.delMore,
		// importEx: user_manageAPI.importEx,
	};

	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref

	const [form] = Form.useForm();

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	// const [dataSource, setdataSource] = useState([]);
	const [loading, SetLoading] = useState<boolean>(false); // Loading：加载 Loading
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

	const [roleOption, setRoleOption] = useState([]);

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

	// * 工具栏 ToolBar
	let ToolBarParams = {
		setModalIsVisible, // 工具栏：新建按钮
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
		handleOperator,
	};
	const allWidth = ColumnsConfig('', '').reduce((sum: any, col: any) => sum + (col.width || 0), 0);
	return (
		<>
			<ProTable<UserList>
				rowKey='_id'
				className='ant-pro-table-scroll'
				scroll={{ x: allWidth, y: '100vh' }} // 100vh
				bordered
				cardBordered
				dateFormatter='string'
				headerTitle='用户列表'
				defaultSize='small'
				loading={loading}
				columns={ColumnsConfig(handleOperator, handleModalSubmit)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				actionRef={actionRef} // Table action 的引用，便于自定义触发 actionRef.current.reset()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: 6 }} // 搜索表单配置
				// onSubmit={params => {}} // {username: '张三'}  提交表单时触发
				// onReset={() => {}} // 重置表单时触发
				// dataSource={dataSource}
				// request请求、获取所有数据、将数据存储起来、
				request={async (params, sort, filter) => {
					SetLoading(true);
					// console.log('request请求参数：', params, sort, filter);
					const Param = {};
					const { data }: any = await api.find(Param);
					SetPagination({ ...pagination, total: data?.total });

					const role: any = await roleAPI.find({ name: '全部1' });
					const roleList = role?.data?.list || [];
					const option =
						roleList &&
						roleList.map((value: any) => {
							return {
								label: value.role_name,
								value: value.permission_str,
							};
						});
					setRoleOption(option || []);

					SetLoading(false);
					return formatDataForProTable<UserList>({ ...data, current: params.current });
				}}
				pagination={{
					size: 'default',
					...pagination,
					pageSizeOptions: [10, 20, 30, 50],
					onChange: (page, pageSize) => {
						SetPagination({ ...pagination, page, pageSize });
					},
				}}
				rowSelection={{
					onChange: (selectedRowKeys, selectedRows) => {
						setSelectedRows(selectedRows);
					},
				}}
				onSizeChange={() => {}} // Table 尺寸发生改变、将尺寸存储到数据库中
				onRequestError={(error: any) => {
					message.error(`数据加载失败！ ${error}`);
				}} // 数据加载失败时触发
				editable={{ type: 'multiple' }}
				columnsState={{
					// 持久化列的 key，用于判断是否是同一个 table
					persistenceKey: 'use-pro-table-key',
					// 持久化列的类型: localStorage | sessionStorage
					persistenceType: 'localStorage',
				}}
			/>

			{selectedRows?.length > 0 && <FooterComponent selectedRows={selectedRows} modalResult={handleOperator} />}

			<ModalComponent
				form={form}
				modalIsVisible={modalIsVisible}
				setModalIsVisible={setModalIsVisible}
				modalTitle={modalTitle}
				modalType={modalType}
				modalUserInfo={modalUserInfo}
				handleModalSubmit={handleModalSubmit} // 提交表单
				roleOption={roleOption}
			/>

			<DrawerComponent
				drawerIsVisible={drawerIsVisible}
				drawerCurrentRow={{ ...drawerCurrentRow, name: drawerCurrentRow?.username }}
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
