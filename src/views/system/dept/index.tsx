import { useRef, useState } from 'react';
import { Form } from 'antd';
import { formatDataForProTable } from '@/utils';
import { UserList } from '@/api/interface';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import TableColumnsConfig from './component/ColumnConfig';
import ToolBarRender from './component/ToolBar';
import { addDept, delDept, findDept, modifyDept } from '@/api/modules/system/common';
import './index.less';
import ModalComponent from './component/Modal';
import DrawerComponent from './component/Drawer';
import FooterComponent from './component/Footer';

export type FormValueType = {
	target?: string;
	template?: string;
	type?: string;
	time?: string;
	frequency?: string;
} & Partial<UserList>;

const useProTable = () => {
	const actionRef = useRef<ActionType>(); // 表格 ref
	const formRef = useRef<FormInstance>(); // 表单 ref

	const [form] = Form.useForm();

	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据
	const [loading, SetLoading] = useState<boolean>(false); // Loading
	const [menuList, setMenuList] = useState<[]>([]); // Menu：接口中菜单、拿给子组件用
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据

	// Drawer
	const [drawerCurrentRow, setDrawerCurrentRow] = useState({}); // Drawer 选择当前行数据
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false); // Drawer 是否显示

	// Modal
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<string>('');
	const [modalUserInfo, setModalUserInfo] = useState({});

	const quickSearch = () => {};

	// * 操作 — 员工： 新建、编辑、详情、删除  按钮
	const handleOperator = async (type: string, item: any) => {
		console.log('操作：类型+记录', type, item);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item);
		} else if (type === 'create') {
			setModalIsVisible(true);
			setModalTitle('新建菜单');
			setModalType(type);
			setModalUserInfo({});
		} else if (['edit'].includes(type)) {
			setModalIsVisible(true);
			setModalTitle(type === 'edit' ? '编辑菜单' : '查看详情');
			setModalType(type);
			setModalUserInfo(item);
		} else if (type === 'delete') {
			const hide = message.loading('正在删除');
			try {
				const result: any = await delDept(item.unique);
				// console.log('删除菜单结果：', result);
				if (result) {
					hide();
					actionRef?.current?.reload();
					message.success(`删除 ${item?.name} 成功`);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		} else if (type === 'moreDelete') {
			message.loading('删除更多按钮、正在实现');
			// const hide = message.loading('正在删除');
			// try {
			// 	const selectIds = selectedRows.map(value => value?._id);
			// 	console.log('selectIds', selectIds);
			// 	const res: any = await delMoreJob(selectIds || []);
			// 	if (res) {
			// 		hide();
			// 		setSelectedRows([]);
			// 		actionRef.current?.reloadAndRest?.();
			// 		message.success('全部删除完成！');
			// 	}
			// } catch (error) {
			// 	hide();
			// 	message.error('删除失败、请再试一次！');
			// }
		}
	};
	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const handleModalSubmit = async (type: string, item: any) => {
		console.log('Modal 提交：', type, item);
		// 1、获取字段数据
		// 2、将字段传入到接口中
		// 3、获取返回值并展示
		// 4、清空表单值
		// 5、关闭弹窗
		// 6、重新回去菜单列表
		const hide = message.loading(type == 'create' ? '正在添加' : '正在编辑');
		try {
			let res = type === 'create' ? await addDept(item) : await modifyDept(item._id, item);
			if (res) {
				hide();
				form.resetFields();
				setModalTitle('');
				setModalType('');
				setModalIsVisible(false);
				setModalUserInfo({});
				if (actionRef.current) actionRef.current.reload();
				message.success(type == 'create' ? '添加成功' : '编辑成功');
			}
		} catch (error: any) {
			hide();
			message.error(error.message || error.msg);
		}
	};

	// * 工具栏 ToolBar
	let ToolBarParams: any = {
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
		handleOperator,
	};
	// * 表格封装成通用
	return (
		<>
			<ProTable<UserList>
				rowKey='unique' // ! 此key设置错误、导致点击某一个展开、全部节点全展开
				className='ant-pro-table-scroll'
				scroll={{ y: '100vh' }} // 100vh
				// bordered
				// cardBordered
				dateFormatter='string'
				headerTitle='使用 ProTable'
				defaultSize='small'
				loading={loading}
				columns={TableColumnsConfig(handleOperator)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				actionRef={actionRef} // Table action 的引用，便于自定义触发 actionRef.current.reset()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				request={async (params, sort, filter) => {
					SetLoading(true);
					const res: any = await findDept({});
					console.log('获取部门：', res);
					let format = {
						list: res.data,
						current: res.page || 1,
						pageSize: res.pageSise || 10,
						total: res.total || 10,
					};
					setMenuList(res.data);
					SetLoading(false);
					SetPagination({ ...pagination, total: format.total });
					return formatDataForProTable<any>({ ...format });
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
			{selectedRows?.length > 0 && <FooterComponent actionRef={actionRef} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOperator={handleOperator} />}
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
				drawerCurrentRow={drawerCurrentRow}
				setDrawerCurrentRow={setDrawerCurrentRow}
				setDrawerIsVisible={setDrawerIsVisible}
				handleOperator={handleOperator}
			/>
		</>
	);
};

export default useProTable;
