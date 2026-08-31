import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from '@/components/TableModal';
import ToolBarRender from './component/ToolBarRender';
import useProTableDynamic from './component/useProTableDynamic';
import { hk_main_cost_center__c_API } from '@/api/modules/global_wms';

const useProTable = () => {
	const api = {
		find: hk_main_cost_center__c_API.find,
		add: hk_main_cost_center__c_API.add,
		modify: hk_main_cost_center__c_API.mod,
		del: hk_main_cost_center__c_API.del,
		delMore: hk_main_cost_center__c_API.delMore,
		importEx: hk_main_cost_center__c_API.importEx,
	};

	const { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps } = useProTableDynamic({ api });

	const toolBar = { toolBarRender: () => ToolBarRender(toolBarParams) };

	return (
		<>
			<ProTable<any> {...proTableProps} {...toolBar} className={`${proTableProps.className || ''} `} />

			{showFooter && <FooterComponent {...footerProps} />}

			<ModalComponent {...modalProps} />

			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;

// 当我点击同步SAP接口最新数据，去请求/api/Sap/Get_Unit这个接口，
// 服务端返回的结果有三种：
// {
//   "code": 200,
//   "msg": "请求成功",
//   "data": {
//     "success": true,
//    "message": "回传SAP成功，任务结束！"
//   }
// }
// {
//   "code": 200,
//   "msg": "请求成功",
//   "data": {
//     "success": false,
//     "message": "状态为：正在执行 | 重新执行 | 回传SAP错误，其他状态不可回传！"
//   }
// }
// {
//   "code": 500,
//   "data": null,
//   "msg": "connect ETIMEDOUT 117.135.61.175:8042"
// }
