import { useRef, useState } from 'react';
import { Form } from 'antd';
import { formatDataForProTable } from '@/utils';
import { UserList } from '@/api/interface';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import TableColumnsConfig from './component/ColumnConfig';
import ToolBarRender from './component/ToolBar';
import { addJob, delJob, delMoreJob, findJob, modifyJob } from '@/api/modules/system/common';
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
	const [loading, SetLoading] = useState<boolean>(false); // Loading：加载Loading
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	// const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据
	const [selectedRows, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据

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
		// console.log('handleOperator', type, item);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item);
		} else if (type === 'create') {
			setModalIsVisible(true);
			setModalTitle('新建用户');
			setModalType(type);
			setModalUserInfo({});
		} else if (['edit'].includes(type)) {
			setModalIsVisible(true);
			setModalTitle(type === 'edit' ? '编辑用户' : '查看详情');
			setModalType(type);
			setModalUserInfo(item);
		} else if (type === 'delete') {
			const hide = message.loading('正在删除');
			try {
				const result: any = await delJob(item._id);
				if (result) {
					hide();
					actionRef?.current?.reload();
					message.success(`删除 ${item?.postName} 成功`);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		} else if (type === 'moreDelete') {
			const hide = message.loading('正在删除');
			try {
				const selectIds = selectedRows.map(value => value?._id);
				console.log('selectIds', selectIds);
				const res: any = await delMoreJob(selectIds || []);
				if (res) {
					hide();
					setSelectedRows([]);
					actionRef.current?.reloadAndRest?.();
					message.success('全部删除完成！');
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		}
	};
	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const handleModalSubmit = async (type: string, item: any) => {
		console.log('Modal 提交：', type, item);
		// 1、获取form字段值 并 过滤出有值的字段
		// 2、字段值传递接口、获取接口结果、并提示出信息
		// 3、重置Modal信息
		// 4、重新请求，根据页码等条件
		const hide = message.loading(type == 'create' ? '正在添加' : '正在编辑');
		try {
			let res = type === 'create' ? await addJob(item) : await modifyJob(item);
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

	return (
		<>
			<ProTable<UserList>
				rowKey='_id'
				className='ant-pro-table-scroll'
				// scroll={{ x: 2500, y: '100vh' }} // 100vh
				bordered
				cardBordered
				dateFormatter='string'
				headerTitle='使用 ProTable'
				defaultSize='small'
				loading={loading}
				columns={TableColumnsConfig(handleOperator)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				actionRef={actionRef} // Table action 的引用，便于自定义触发 actionRef.current.reset()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: 6 }} // 搜索表单配置
				request={async (params, sort, filter) => {
					SetLoading(true);
					// console.log('request请求参数：', params, sort, filter);
					const { data }: any = await findJob({ ...params, page: params.current });
					// console.log('data', data);
					SetLoading(false);
					SetPagination({ ...pagination, total: data.total });
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
			{selectedRows?.length > 0 && <FooterComponent actionRef={actionRef} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleOperator={handleOperator} />}
			<ModalComponent
				form={form}
				modalIsVisible={modalIsVisible}
				setModalIsVisible={setModalIsVisible}
				modalTitle={modalTitle}
				modalType={modalType}
				modalUserInfo={modalUserInfo}
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
