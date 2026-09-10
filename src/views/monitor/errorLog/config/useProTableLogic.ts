// src/pages/JobManage/useProTableLogic.ts
import { useCallback, useRef, useState } from 'react';
import { Form } from 'antd';
import type { ActionType } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { message } from '@/hooks/useMessage';
import { addJob, delJob, delMoreJob, ExJob, findJob, modifyJob } from '@/api/modules/system';
import { findError, findOperate } from '@/api/modules/monitor';

// 定义类型，提高代码可读性
interface JobItem {
	_id: string;
	postName: string;
	// ... 其他属性
}

export const useProTableLogic = () => {
	const actionRef = useRef<ActionType>(undefined);
	const formRef = useRef<FormInstance>(undefined);
	const [form] = Form.useForm();

	// 状态管理
	const [openSearch, setOpenSearch] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
	const [selectedRows, setSelectedRows] = useState<JobItem[]>([]);

	// Modal 状态
	const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<string>('');
	const [modalType, setModalType] = useState<'create' | 'edit' | 'detail'>('create');
	const [modalUserInfo, setModalUserInfo] = useState<Partial<JobItem>>({});

	// Drawer 状态
	const [drawerCurrentRow, setDrawerCurrentRow] = useState<Partial<JobItem>>({});
	const [drawerIsVisible, setDrawerIsVisible] = useState<boolean>(false);

	// Modal 操作：创建、编辑、详情
	const handleModalOperate = (type: 'create' | 'edit' | 'detail', item?: JobItem) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else {
			setModalIsVisible(true);
			setModalUserInfo(item || {});
			setModalTitle(type === 'create' ? '新建用户' : '编辑用户');
		}
	};

	// Modal 结果处理：增删改
	const handleModalResult = async (type: string, item: any) => {
		try {
			if (['create', 'edit'].includes(type)) {
				const hide = message.loading(type === 'create' ? '正在添加' : '正在编辑');
				const res = type === 'create' ? await addJob(item) : await modifyJob(item._id, item);
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
				const res = type === 'delete' ? await delJob(item._id) : await delMoreJob(ids);
				hide();
				if (res) {
					if (type === 'moreDelete') setSelectedRows([]);
					actionRef.current?.reloadAndRest?.();
					message.success(`成功删除${type === 'delete' ? ` ${item?.postName}` : '多条'}记录`);
				}
			}
		} catch (error: any) {
			message.error(error.message || '操作失败，请重试！');
		}
	};

	// 导出数据
	const handleImportData = useCallback(async (data: any) => {
		const hide = message.loading('数据正在导入中');
		try {
			await ExJob(data);
			hide();
			actionRef.current?.reload();
			message.success('导入完成');
		} catch (error: any) {
			hide();
			message.error(error.message || error.msg || '导入失败');
		}
	}, []);

	// ProTable 请求
	const handleProTableRequest: any = useCallback(async (params: any, sort: any, filter: any) => {
		setLoading(true);
		try {
			const { current, pageSize, ...searchParams } = params;
			const mappedSort = Object.fromEntries(Object.entries(sort).map(([field, order]) => [field, order === 'ascend' ? 'asc' : 'desc']));
			const payload = { pagination: { page: current, pageSize }, sort: mappedSort, filter, search: searchParams };
			const { data }: any = await findError(payload);
			// console.log('data', data);
			setPagination(prev => ({ ...prev, total: data.total }));
			return { data: data.list, success: true, total: data.total };
		} catch (error) {
			message.error('数据加载失败');
			return { data: [], success: false, total: 0 };
		} finally {
			setLoading(false);
		}
	}, []);

	return {
		// Refs
		actionRef,
		formRef,
		form,
		// States
		openSearch,
		setOpenSearch,
		loading,
		pagination,
		setPagination,
		selectedRows,
		setSelectedRows,
		// Modal
		modalIsVisible,
		setModalIsVisible,
		modalTitle,
		modalType,
		modalUserInfo,
		// Drawer
		drawerCurrentRow,
		setDrawerCurrentRow,
		drawerIsVisible,
		setDrawerIsVisible,
		// Handlers
		handleModalOperate,
		handleModalResult,
		handleImportData,
		handleProTableRequest,
	};
};
