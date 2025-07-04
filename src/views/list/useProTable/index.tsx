import { useEffect, useRef, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Modal, Row, Space } from 'antd';
import { formatDataForProTable } from '@/utils';
import { pagination as paginationConfig } from '@/config/proTable';
import { UserList } from '@/api/interface';
import { FooterToolbar, ProDescriptions, ProTable } from '@ant-design/pro-components';
import type { ActionType, FormInstance, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';
import { addRule, updateRule } from '@/api/modules/api_useProTable_eg/api';
import UpdateForm from './component/UpdateForm';
import TableColumnsConfig, { TableColumnsParams } from './component/ColumnConfig';
import ToolBarRender from './component/ToolBar';
import { DelMoreUser, DelUser, GetProTableUser } from '@/api/modules/system/common';
import './index.less';
import { DeleteOutlined } from '@ant-design/icons';
import handle from './component/Operate';
import ModalComponent from './component/ModalComponent';
import DrawerComponent from './component/DrawerComponent';
import FooterComponent from './component/FooterComponent';

export type FormValueType = {
	target?: string;
	template?: string;
	type?: string;
	time?: string;
	frequency?: string;
} & Partial<UserList>;

// TODO: refer： https://github.com/ant-design/ant-design-pro
// ProTable：https://procomponents.ant.design/components/table
const useProTable = () => {
	// console.log('defalut', defalut)

	const actionRef = useRef<ActionType>();
	const formRef = useRef<FormInstance>();
	const [createModalOpen, handleModalOpen] = useState<boolean>(false);
	const [selectedRowsState, setSelectedRows] = useState<any[]>([]); // 表格：选择行数据
	const [currentRow, setCurrentRow] = useState<UserList>();
	const [showDetail, setShowDetail] = useState<boolean>(false);
	const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
	const [pagination, SetPagination] = useState<any>({ page: 1, pageSize: 10, total: 0 }); // 分页数据
	const [dataSource, SetdataSource] = useState([]);
	const [openSearch, SetOpenSearch] = useState<boolean>(false); // 工具栏：开启关闭表单搜索
	const [loading, SetLoading] = useState<boolean>(false); // Loading：加载Loading
	const [form] = Form.useForm();

	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<string>('');
	const [modalUserInfo, setModalUserInfo] = useState({});

	// TODO:
	// 设置 页码值的 useState
	// 设置 搜索条件的 useState
	// useEffect 监听值的变化去请求服务端
	// const GetData = async () => {
	// 	SetLoading(true);
	// 	let queryParams = { ...pagination };
	// 	const { data }: any = await GetProTableUser(queryParams);
	// 	console.log('请求数据：', data);
	// 	if (data?.list?.length) {
	// 		SetdataSource(data.list);
	// 		SetPagination({ ...pagination, total: data.total });
	// 	} else {
	// 		SetdataSource([]);
	// 		SetPagination({ ...pagination, total: 0 });
	// 	}
	// 	SetLoading(false);
	// };
	// useEffect(() => {
	//  GetData();
	// }, [pagination.page, pagination.pageSize]);

	const quickSearch = () => {};

	// * 操作 — 员工： 新建、编辑、详情、删除  按钮
	const handleOperator = async (type: string, item: any) => {
		// console.log('handleOperator', type, item);
		if (type === 'create') {
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
				const result: any = await DelUser(item._id);
				if (result) {
					hide();
					actionRef?.current?.reload();
					message.success(result.data.message);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		} else if (type === 'moreDelete') {
			const hide = message.loading('正在删除');
			try {
				const selectIds = selectedRowsState.map(value => value?._id);
				const res: any = await DelMoreUser(selectIds || []);
				if (res) {
					hide();
					setSelectedRows([]);
					actionRef.current?.reloadAndRest?.();
					message.success(res.data.message);
				}
			} catch (error) {
				hide();
				message.error('删除失败、请再试一次！');
			}
		}
	};
	// * 操作 — 员工： 新建、编辑、详情  弹窗内容提交
	const handleModalSubmit = (type: string, item: any) => {
		// 1、获取form字段值 并 过滤出有值的字段
		// 2、字段值传递接口、获取接口结果、并提示出信息
		// 3、重置Modal信息
		// 4、重新请求，根据页码等条件
		// let type = modalType;
		// let formData = form.getFieldsValue();
		// console.log('弹窗Modal：', formData);
		// let res = type === 'create' ? createUser(formData) : editUser(formData)
		console.log('Modal 提交：', type, item);
		// setModalTitle('');
		// setModalType('');
		// setModalIsVisible(false);
		// setModalUserInfo({});
		message.info('待实现');
	};

	const handleUserAdd = async () => {
		const hide = message.loading('正在添加');
		try {
			const formValues = form.getFieldsValue();
			console.log('formValues', formValues);
			const result = await addRule({ ...formValues });
			if (result) {
				hide();
				form.resetFields();
				setModalIsVisible(false);
				if (actionRef.current) actionRef.current.reload();
				message.success('Added successfully');
			}
		} catch (error) {
			hide();
			message.error('Adding failed, please try again!');
		}
	};
	// * 工具栏 ToolBar
	let ToolBarParams = {
		setModalIsVisible, // 工具栏：新建按钮
		quickSearch, // 工具栏：快捷搜索
		openSearch,
		SetOpenSearch, // 工具栏：开启表单搜索
		handleOperator,
	};
	// * 列配置 Column
	let columnParams: TableColumnsParams = {
		setCurrentRow,
		setShowDetail,
		handleOperator,
	};
	// & 表格封装成通用
	// 表格数量量多会如何？ 500 - 5000 - 50000
	return (
		<>
			<ProTable<UserList>
				rowKey='_id'
				className='ant-pro-table-scroll'
				scroll={{ x: 2500, y: '100vh' }} // 100vh
				bordered
				cardBordered
				dateFormatter='string'
				headerTitle='使用 ProTable'
				defaultSize='small'
				loading={loading}
				columns={TableColumnsConfig(columnParams)}
				toolBarRender={() => ToolBarRender(ToolBarParams)} // 渲染工具栏
				actionRef={actionRef} // Table action 的引用，便于自定义触发      actionRef.current.reload()  |  actionRef.current.reset()   |   actionRef.current.clearSelected()
				formRef={formRef} // 可以获取到查询表单的 form 实例
				search={openSearch ? false : { labelWidth: 'auto', filterType: 'query', span: 6 }} // 搜索表单配置 Form
				// onSubmit={params => {}} // {username: '张三'}  提交表单时触发
				// onReset={() => {}} // 重置表单时触发
				// dataSource={dataSource}
				// request请求、获取所有数据、将数据存储起来、
				request={async (params, sort, filter) => {
					SetLoading(true);
					console.log('request请求参数：', params, sort, filter);
					// const { data } = await getUserList(params)
					const { data }: any = await GetProTableUser({ ...params, page: params.current });
					// console.log('请求数据：', data);
					SetLoading(false);
					SetPagination({ ...pagination, total: data.total });
					return formatDataForProTable<UserList>({ ...data, current: params.current });
				}}
				pagination={{
					...pagination,
					pageSizeOptions: [10, 20, 30, 50, 100],
					onChange: (page, pageSize) => {
						// SetLoading(true);
						console.log('page, pageSize', page, pageSize);
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
			{selectedRowsState?.length > 0 && (
				<FooterComponent actionRef={actionRef} selectedRowsState={selectedRowsState} setSelectedRows={setSelectedRows} handleOperator={handleOperator} />
			)}
			<ModalComponent
				form={form}
				modalIsVisible={modalIsVisible}
				setModalIsVisible={setModalIsVisible}
				modalTitle={modalTitle}
				modalType={modalType}
				modalUserInfo={modalUserInfo}
				handleModalSubmit={handleModalSubmit}
			/>
			<DrawerComponent showDetail={showDetail} currentRow={currentRow} setCurrentRow={setCurrentRow} setShowDetail={setShowDetail} columnParams={columnParams} />
		</>
	);
};

export default useProTable;
