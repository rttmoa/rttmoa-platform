import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { cwwarm_task_move_API } from '@/api/modules/cwwarm_task';

const useProTable = () => {
	const api = {
		find: cwwarm_task_move_API.find,
		add: cwwarm_task_move_API.add,
		modify: cwwarm_task_move_API.mod,
		del: cwwarm_task_move_API.del,
		delMore: cwwarm_task_move_API.delMore,
		importEx: cwwarm_task_move_API.importEx,
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
