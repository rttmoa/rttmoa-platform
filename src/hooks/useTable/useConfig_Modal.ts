import { useCallback, useState } from 'react';
import type { ActionType, FormInstance } from '@ant-design/pro-components';
import { message } from '@/hooks/useMessage';

type ModalType = 'create' | 'edit' | 'detail';

interface UseConfigModalParams {
	api: any;
	form: FormInstance;
	actionRef: React.MutableRefObject<ActionType | undefined>;
	selectedRows: any[];
	setSelectedRows: React.Dispatch<React.SetStateAction<any[]>>;
	setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
	setDrawerCurrentRow: React.Dispatch<React.SetStateAction<any>>;
	setDrawerIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const useConfigModal = ({ api, form, actionRef, selectedRows, setSelectedRows, setSelectedRowKeys, setDrawerCurrentRow, setDrawerIsVisible }: UseConfigModalParams) => {
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [modalTitle, setModalTitle] = useState('');
	const [modalType, setModalType] = useState<ModalType>('create');
	const [modalUserInfo, setModalUserInfo] = useState<any>({});

	const modalOperate = useCallback((type: ModalType, item?: any) => {
		setModalType(type);
		if (type === 'detail') {
			setDrawerIsVisible(true);
			setDrawerCurrentRow(item || {});
		} else {
			setModalIsVisible(true);
			setModalUserInfo(item || {});
			setModalTitle(type === 'create' ? '新建' : '编辑');
		}
	}, [setDrawerCurrentRow, setDrawerIsVisible]);

	const clearSelection = useCallback(() => {
		setSelectedRowKeys([]);
		setSelectedRows([]);
	}, [setSelectedRowKeys, setSelectedRows]);

	const modalResult = useCallback(async (type: string, item: any) => {
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
					actionRef.current?.reloadAndRest?.();
					message.success(type === 'delete' ? '删除成功' : `删除 ${selectedRows.length} 条记录成功`);
				}
			}
		} catch (error: any) {
			message.error(error.message || '操作失败，请重试');
		}
	}, [api, selectedRows, form, actionRef, clearSelection]);

	return { modalIsVisible, setModalIsVisible, modalTitle, modalType, modalUserInfo, modalOperate, modalResult };
};

export default useConfigModal;
