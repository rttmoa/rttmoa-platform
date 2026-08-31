import { DelMoreProTableUser } from '@/api/modules/system';
import { message } from '@/hooks/useMessage';

/**
 *  Delete node
 * @zh-CN 删除多个节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: any[]) => {
	const hide = message.loading('正在删除');
	if (!selectedRows.length) return true;
	try {
		let ids = selectedRows.map(row => row._id);
		await DelMoreProTableUser({ ids: ids });
		hide();
		message.success('已成功删除，将很快刷新');
		return true;
	} catch (error) {
		hide();
		message.error('删除失败，请重试');
		return false;
	}
};

export default {
	handleRemove,
};
