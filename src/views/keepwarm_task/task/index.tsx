import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { keepwarm_task_task_API } from '@/api/modules/keepwarm_task';

const useProTable = () => {
	const api = {
		find: keepwarm_task_task_API.find,
		add: keepwarm_task_task_API.add,
		modify: keepwarm_task_task_API.mod,
		del: keepwarm_task_task_API.del,
		delMore: keepwarm_task_task_API.delMore,
		importEx: keepwarm_task_task_API.importEx,
	};

	const { proTableProps, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api });

	return (
		<>
			<ProTable<any> {...proTableProps} />

			{showFooter && <FooterComponent {...footerProps} />}

			<ModalComponent {...modalProps} />

			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;
