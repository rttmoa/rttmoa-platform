import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { cwwarm_config_distribute_lay_API } from '@/api/modules/cwwarm_config';

const useProTable = () => {
	const api = {
		find: cwwarm_config_distribute_lay_API.find,
		add: cwwarm_config_distribute_lay_API.add,
		modify: cwwarm_config_distribute_lay_API.mod,
		del: cwwarm_config_distribute_lay_API.del,
		delMore: cwwarm_config_distribute_lay_API.delMore,
		importEx: cwwarm_config_distribute_lay_API.importEx,
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
