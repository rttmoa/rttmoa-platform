import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import useProTableDynamic from '@/hooks/useTable/useProTableDynamic';
import { keepwarm_stock_detail_API } from '@/api/modules/keepwarm_stock';

const useProTable = () => {
	const api = {
		find: keepwarm_stock_detail_API.find,
		add: keepwarm_stock_detail_API.add,
		modify: keepwarm_stock_detail_API.mod,
		del: keepwarm_stock_detail_API.del,
		delMore: keepwarm_stock_detail_API.delMore,
		importEx: keepwarm_stock_detail_API.importEx,
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
