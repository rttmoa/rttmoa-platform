import { ProTable } from '@ant-design/pro-components';
import DrawerComponent from '@/components/TableDrawer';
import FooterComponent from '@/components/TableFooter';
import ModalComponent from './unique/Modal_other';
import ToolBarRender from './component/ToolBarRender';
import useProTableDynamic from './component/useProTableDynamic';
import { hk_mater_doc_detail__c_API } from '@/api/modules/mater';

const useProTable = () => {
	const api = {
		find: hk_mater_doc_detail__c_API.find,
		add: hk_mater_doc_detail__c_API.add,
		modify: hk_mater_doc_detail__c_API.mod,
		del: hk_mater_doc_detail__c_API.del,
		delMore: hk_mater_doc_detail__c_API.delMore,
		importEx: hk_mater_doc_detail__c_API.importEx,
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

// 需求一：其他出库单按钮：这里其他出库单的Modal弹窗中展示需求：其他出库单创建时：表单必填字段是：只展示这些字段就可以，库区area__c、物料代码material_code__c、批号batch__c、出库数量quantity__c、单位unit__c、移动类型type_move__c、如果移动类型选择"Z05 成本中心发料"，那么需要填成本中心cost_center__c、如果移动类型选择"311 库存调拨"，那么需要填接收仓库recept_area__c，属于新建按钮，类型是create，只不过不是填所有字段，只填写部分字段就可以

// 需求二：回传SAP按钮：只允许勾选一条数据，不能勾选多条数据，并点击这个按钮后，页面显示加载状态，等回传SAP接口返回结果后，根据结果，展示不同的提示信息：
// 根据不同单据类型请求不同接口：如果勾选的是采购入库单，那么接口为 "/api/Scheduled/transfer_sap/Material_e_purchase", 如果是销售出库单，接口为 "/api/Scheduled/transfer_sap/Material_o_sale", 如果是需求出库单，接口为 "/api/Scheduled/transfer_sap/Material_o_demand" 如果是其他出库单，接口为 "/api/Scheduled/transfer_sap/Material_o_other"
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
// "/api/Wcs/Material_Roundup"

// 需求三：输入物料代码带出物料名称和单位，物料代码可选择可搜索Select组件，请求这个接口"/api/global/global_material"获取服务端数据，服务端数据是
//  {
// 			code: 200,
// 			msg: "请求成功",
// 			data: {
// 				success: true,
// 				message: "成功：数据处理完成",
// 				data: [
// 					{
// 						_id: "6a2fc9f405b8afa85f718d45",
// 						time__c: "2026/06/15 17:46:28",
// 						factory__c: "7600",
// 						material_code__c: "10001",
// 						material_name__c: "百味鸡",
// 						unit__c: "KG",
// 						material_type__c: "Z001",
// 						mhdrz__c: "1",
// 						mhdhb__c: "365",
// 						space: "61c51b8f4cada30031994f3d",
// 						created_by: "63dc7de4902db72a48e718f2",
// 						owner: "63dc7de4902db72a48e718f2",
// 						created: "2026-06-15T09:46:28.244Z",
// 					},
// 				],
// 			},
// 		};这种格式，需要根据material_code__c字段，展示material_name__c和unit__c字段

// 需求四：其他出库单移动类型type_move__c如果选择成本中心cost_center__c，需求请求这个接口"/api/global/global_cost_center"获取服务端数据，服务端数据是
// {
// 			code: 200,
// 			msg: "请求成功",
// 			data: {
// 				success: true,
// 				message: "成功：数据处理完成",
// 				data: [
// 					{
// 						_id: "6a2fca0005b8afa85f719bc8",
// 						time__c: "2026/06/15 17:46:40",
// 						department_code__c: "76080000",
// 						factory__c: "7600",
// 						department__c: "海南云紫采购部",
// 						space: "61c51b8f4cada30031994f3d",
// 						created_by: "63dc7de4902db72a48e718f2",
// 						owner: "63dc7de4902db72a48e718f2",
// 						created: "2026-06-15T09:46:40.331Z",
// 					},
// 				],
// 			},
// 		};
// 使用下拉框展示数据，label是department__c，value是department_code__c，

// 其他出库单移动类型type_move__c如果选择接收仓库recept_area__c，需求请求这个接口"/api/global/global_warehouse_info"获取服务端数据，服务端数据是
// {
// 			code: 200,
// 			msg: "请求成功",
// 			data: {
// 				success: true,
// 				message: "成功：数据处理完成",
// 				data: [
// 					{
// 						_id: "6a0876f107652002d45bb8a9",
// 						factory__c: "7600",
// 						area_code__c: "7601",
// 						area__c: "原料一号冻库",
// 						space: "61c51b8f4cada30031994f3d",
// 						created_by: "63dc7de4902db72a48e718f2",
// 						owner: "63dc7de4902db72a48e718f2",
// 						created: "2026-05-16T13:53:53.514Z",
// 					},
// 				],
// 			},
// 		};
// 使用下拉框展示数据，label是area__c，value是area__c，

const arr = [
	{
		localtion: '071202',
		material_code: '50007',
	},
	{
		localtion: '071303',
		material_code: '50007',
	},
	{
		localtion: '071402',
		material_code: '50007',
	},
	{
		localtion: '071502',
		material_code: '50007',
	},
];
