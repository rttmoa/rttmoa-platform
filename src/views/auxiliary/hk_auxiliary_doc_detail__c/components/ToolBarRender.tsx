import { FullscreenOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
import TableListView from '@/components/TableListView';
import { message } from '@/hooks/useMessage';
import { hk_auxiliary_doc_detail__c_API } from '@/api/modules/auxiliary';
import { useState } from 'react';

type ToolBarProps = {
	loading?: boolean;
	quickSearch: () => void;
	openSearch: string;
	setOpenSearch: any;
	modalOperate: (type: string, data: any) => void;
	dataList: Array<any>[];
	ImportData: (data: any) => void;
	columnsCfg: any;
	ops?: { allowCreate?: boolean; allowBatchEdit?: boolean };
	tableInfo: { tableName: string; collection: string };
	columnSchema: Object;
	initColumnSchema?: Object;
	reloadTable?: () => void;
	findApi?: () => Promise<any>;
	selectedRows?: any[];
	clearSelection?: () => void;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { openSearch, setOpenSearch, modalOperate, dataList, tableInfo, ImportData, columnsCfg, ops, loading, columnSchema, initColumnSchema, reloadTable, findApi, selectedRows = [], clearSelection } = props;

	const dispatch = useDispatch();
	const [outLoading, setOutLoading] = useState(false);
	const [transferLoading, setTransferLoading] = useState(false);
	const compactBtnStyle = {
		height: 28,
		paddingInline: 10,
		fontSize: 12,
		borderRadius: 4,
	};

	const toolbarIconStyle = {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '0 4px',
		cursor: 'pointer',
	};

	const showMaximize = () => {
		dispatch(setGlobalState({ key: 'maximize', value: true }));
	};
	const executeOutTask = async () => {
		if (selectedRows.length !== 1) {
			message.error(selectedRows.length === 0 ? '请先勾选一条数据后再执行出库任务' : '执行出库任务只允许勾选一条数据', 5);
			return;
		}

		const selectedRow = selectedRows[0] || {};
		if (String(selectedRow.cmdtype__c || '').trim() !== '出库任务') {
			message.error('勾选数据的任务类型必须是出库任务', 5);
			return;
		}
		if (String(selectedRow.area__c || '').trim() !== '辅料库') {
			message.error('只有库存库区为辅料库的数据才允许执行出库', 5);
			return;
		}
		if (String(selectedRow.status__c || '').trim() !== '未执行') {
			message.error('勾选数据的执行状态必须是未执行', 5);
			return;
		}

		setOutLoading(true);
		try {
			const res: any = await hk_auxiliary_doc_detail__c_API.auxiliaryOut({ selectedRows: [selectedRow] });
			const responseData = res?.data ?? {};
			if (responseData.success !== true) {
				message.error(responseData.message || res?.msg || '执行出库任务失败', 5);
				return;
			}

			message.success(responseData.message || res?.msg || '执行出库任务成功');
		} catch (error: any) {
			message.error(error?.message || error?.msg || '执行出库任务失败', 5);
		} finally {
			clearSelection?.();
			reloadTable?.();
			setOutLoading(false);
		}
	};

	const transferSapResult = async () => {
		if (selectedRows.length !== 1) {
			message.error(selectedRows.length === 0 ? '请先勾选一条数据后再回传SAP' : '回传SAP时只允许勾选一条数据', 5);
			return;
		}

		const selectedRow = selectedRows[0] || {};
		const documentType = String(selectedRow.document_type__c || '').trim();
		const cmdType = String(selectedRow.cmdtype__c || '').trim();
		const area = String(selectedRow.area__c || '').trim();
		const receptArea = String(selectedRow.recept_area__c || '').trim();
		const requestUrlMap: Record<string, string> = {
			采购入库单: '/api/Scheduled/transfer_sap/Auxiliary_e_purchase',
			销售退货单: '/api/Scheduled/transfer_sap/Auxiliary_e_sale_back',
			销售出库单: '/api/Scheduled/transfer_sap/Auxiliary_o_sale',
			需求出库单: '/api/Scheduled/transfer_sap/Auxiliary_o_demand',
			其他出库单: '/api/Scheduled/transfer_sap/Auxiliary_o_other',
		};
		const moveRequestUrlMap: Record<string, string> = {
			需求出库单: '/api/Scheduled/transfer_sap/Auxiliary_o_demand_move',
			其他出库单: '/api/Scheduled/transfer_sap/Auxiliary_o_other_move',
		};
		const isLineSideToAuxiliaryMove = cmdType === '出库任务' && area === '线边库' && receptArea === '辅料库';
		const requestUrl = (isLineSideToAuxiliaryMove && moveRequestUrlMap[documentType]) || requestUrlMap[documentType];

		if (!requestUrl) {
			message.error(`当前单据类型${documentType ? `“${documentType}”` : ''}暂不支持回传SAP`, 5);
			return;
		}

		setTransferLoading(true);
		try {
			const res: any = await hk_auxiliary_doc_detail__c_API.transferSap(requestUrl, {
				documentType,
				selectedRow,
				selectedRows: [selectedRow],
			});
			const responseData = res?.data ?? {};
			if (responseData.success === true) {
				message.success(responseData.message || res?.msg || '回传SAP成功');
			} else {
				message.error(responseData.message || res?.msg || '回传SAP失败', 5);
			}
			reloadTable?.();
		} catch (error: any) {
			if (!error?.msg) {
				message.error(error?.message || '回传SAP失败', 5);
			}
		} finally {
			clearSelection?.();
			setTransferLoading(false);
		}
	};

	// Excel 头
	const excelHeader = columnsCfg
		.filter((v: any) => {
			return v?.title != '操作' && v?.title != '创建日期';
		})
		.map((v: any) => v?.title);
	const handleImport = (data: any) => {
		const handle = data.map((v: any) => {
			return {
				postName: v.岗位名称,
				postSort: v.岗位排序,
				status: v.岗位状态,
			};
		});
		ImportData && ImportData(handle);
	};

	return [
		<Button size='small' type='primary' style={compactBtnStyle} onClick={() => modalOperate('create', {})}>
			手动创建其他出库单(WMS)
		</Button>,
		<Popconfirm title='确认执行出库任务' description='是否对当前勾选的数据执行出库任务？' okText='确定' cancelText='取消' onConfirm={executeOutTask}>
			<Button size='small' style={{ ...compactBtnStyle, backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }} disabled={loading || outLoading} loading={outLoading}>
				执行出库任务(WMS)
			</Button>
		</Popconfirm>,
		<Popconfirm title='确认回传SAP' description='是否对当前勾选的数据回传SAP单据结果？' okText='确定' cancelText='取消' onConfirm={transferSapResult}>
			<Button size='small' style={{ ...compactBtnStyle, backgroundColor: '#eb2f96', borderColor: '#eb2f96', color: '#fff' }} disabled={loading || transferLoading} loading={transferLoading}>
				回传SAP单据结果
			</Button>
		</Popconfirm>,
		<Excel TableName={tableInfo.tableName} tableHeaders={excelHeader} ExportData={dataList} ImportData={handleImport} columnSchema={columnSchema} disabled={loading} findApi={findApi} />,

		<TableListView columnSchema={columnSchema as any} initColumnSchema={initColumnSchema as any} disabled={loading} toolbarIconStyle={toolbarIconStyle} reloadTable={reloadTable} />,

		<Tooltip title={!openSearch ? '关闭表单搜索' : '开启表单搜索'} className='text-lg'>
			<span style={toolbarIconStyle} onClick={() => setOpenSearch(!openSearch)}>
				<SearchOutlined />
			</span>
		</Tooltip>,
		<Tooltip title='全屏' className='text-lg'>
			<span style={toolbarIconStyle} onClick={showMaximize}>
				<FullscreenOutlined />
			</span>
		</Tooltip>,
	];
};
export default ToolBarRender;
