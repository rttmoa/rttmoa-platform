import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { cwwarm_stock_API } from '@/api/modules/cwwarm_stock';

const useProTable = () => {
	const api = {
		find: cwwarm_stock_API.find,
		add: cwwarm_stock_API.add,
		modify: cwwarm_stock_API.mod,
		del: cwwarm_stock_API.del,
		delMore: cwwarm_stock_API.delMore,
		importEx: cwwarm_stock_API.importEx,
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
