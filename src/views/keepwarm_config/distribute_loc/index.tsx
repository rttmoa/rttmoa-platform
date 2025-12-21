import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { keepwarm_config_distribute_loc_API } from '@/api/modules/keepwarm_config';

const useProTable = () => {
	const api = {
		find: keepwarm_config_distribute_loc_API.find,
		add: keepwarm_config_distribute_loc_API.add,
		modify: keepwarm_config_distribute_loc_API.mod,
		del: keepwarm_config_distribute_loc_API.del,
		delMore: keepwarm_config_distribute_loc_API.delMore,
		importEx: keepwarm_config_distribute_loc_API.importEx,
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
