import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from './component/ModalComponent';
import PrintModal from './component/PrintModal';
import ToolBarRender from './component/ToolBarRender';
import useProTableDynamic from './component/useProTableDynamic';
import { hk_auxiliary_doc__c_API } from '@/api/modules/auxiliary';

const useProTable = () => {
	const api = {
		find: hk_auxiliary_doc__c_API.find,
		add: hk_auxiliary_doc__c_API.add,
		modify: hk_auxiliary_doc__c_API.mod,
		del: hk_auxiliary_doc__c_API.del,
		delMore: hk_auxiliary_doc__c_API.delMore,
		importEx: hk_auxiliary_doc__c_API.importEx,

		byOrderGetHTML: hk_auxiliary_doc__c_API.byOrderGetHTML,
		globalWarehouseInfo: hk_auxiliary_doc__c_API.globalWarehouseInfo,
		searchSapDocs: hk_auxiliary_doc__c_API.searchSapDocs,
		searchSapDocument: hk_auxiliary_doc__c_API.searchSapDocument,
		submitSapDocument: hk_auxiliary_doc__c_API.submitSapDocument,
	};

	const { proTableProps, toolBarParams, showFooter, footerProps, modalProps, drawerProps, printModalProps } = useProTableDynamic({ api });

	const toolBar = { toolBarRender: () => ToolBarRender(toolBarParams) };

	return (
		<>
			<ProTable<any> {...proTableProps} {...toolBar} className={`${proTableProps.className || ''} `} />

			{showFooter && <FooterComponent {...footerProps} />}

			{/* 创建单据(SAP) Modal */}
			<ModalComponent {...modalProps} />

			{/* 打印单据 */}
			<PrintModal {...printModalProps} />

			{/* 查看详情 */}
			<DrawerComponent {...drawerProps} />
		</>
	);
};

export default useProTable;

// 这里搜索条件需要改一下、第一步还是选单据类型没问题，方式一：选择单据号获取数据，方式二：直接搜索单据号获取数据，方式一中开始日期日历组件选择日期比如今天2026年6月13日，传递服务端的格式是20260613，结束日期日历组件选择日期比如今天2026年6月13日，传递服务端的格式是20260613，在服务端这个接口/mater_config/hk_mater_doc__c/searchSapDocs中，传递的参数docType+startData+endDate，返回的数据为{
//   "code": 200,
//   "msg": "请求成功",
//   "data": {
//     "success": true,
//     "results": [
//       "32937997",
//       "32937998",
//       "32937999",
//       "32938000",
//       "32938001",
//       "32938002"
//     ]
//   }
// }   服务端接口我已经过好了，在这里，返回的数据用下拉框展示，默认用今天的开始日期和结束日期搜索并展示到下拉框中，这个用第一个提交按钮去搜索，第一个提交按钮函数是handleSubmitDocument，第二种方式是直接选择单据类型docType+输入单号docNo+输入年份year的方式去搜索，还是这个函数handleSubmitDocument，只不过两次提交的单号不同
