import { FullscreenOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
import TableListView from '@/components/TableListView';
import { message } from '@/hooks/useMessage';
import { hk_pack_doc_detail__c_API } from '@/api/modules/pack';
import { useState } from 'react';
import ModalEntry from './Modal_Entry';
import ModalMove from './Modal_Move';
import ModalOut from './Modal_Out';

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
	const [entryOpen, setEntryOpen] = useState(false);
	const [entryRow, setEntryRow] = useState<any>({});
	const [moveOpen, setMoveOpen] = useState(false);
	const [moveRow, setMoveRow] = useState<any>({});
	const [outOpen, setOutOpen] = useState(false);
	const [outRow, setOutRow] = useState<any>({});
	const [outStock, setOutStock] = useState<any>({});
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
	const openEntryModal = () => {
		if (selectedRows.length !== 1) {
			message.error(selectedRows.length === 0 ? '请先勾选一条数据后再执行包材库入库' : '包材库入库只允许勾选一条数据', 5);
			return;
		}

		const selectedRow = selectedRows[0] || {};
		if (String(selectedRow.cmdtype__c || '').trim() !== '入库任务') {
			message.error('勾选数据的任务类型必须是入库任务', 5);
			return;
		}

		setEntryRow(selectedRow);
		setEntryOpen(true);
	};
	const openOutModal = async () => {
		if (selectedRows.length !== 1) {
			message.error(selectedRows.length === 0 ? '请先勾选一条数据后再执行包材库出库' : '包材库出库只允许勾选一条数据', 5);
			return;
		}

		const selectedRow = selectedRows[0] || {};
		if (String(selectedRow.cmdtype__c || '').trim() !== '出库任务') {
			message.error('勾选数据的任务类型必须是出库任务', 5);
			return;
		}
		if (String(selectedRow.area__c || '').trim() === '线边库' && String(selectedRow.recept_area__c || '').trim() === '包材库') {
			setMoveRow(selectedRow);
			setMoveOpen(true);
			return;
		}

		setOutLoading(true);
		try {
			const res: any = await hk_pack_doc_detail__c_API.getPackOutStock(selectedRow);
			const responseData = res?.data ?? {};
			if (responseData.success !== true) {
				message.error(responseData.message || res?.msg || '获取包材库库存失败', 5);
				return;
			}

			const stockList = Array.isArray(responseData.data) ? responseData.data : [];
			if (!stockList.length) {
				message.error('未获取到包材库库存数据', 5);
				return;
			}

			setOutRow(selectedRow);
			setOutStock(stockList[0]);
			setOutOpen(true);
		} catch (error: any) {
			message.error(error?.message || error?.msg || '获取包材库库存失败', 5);
		} finally {
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
			采购入库单: '/api/Scheduled/transfer_sap/Pack_e_purchase',
			销售退货单: '/api/Scheduled/transfer_sap/Pack_e_sale_back',
			销售出库单: '/api/Scheduled/transfer_sap/Pack_o_sale',
			需求出库单: '/api/Scheduled/transfer_sap/Pack_o_demand',
			其他出库单: '/api/Scheduled/transfer_sap/Pack_o_other',
		};
		const moveRequestUrlMap: Record<string, string> = {
			需求出库单: '/api/Scheduled/transfer_sap/Pack_o_deman_move',
			其他出库单: '/api/Scheduled/transfer_sap/Pack_o_other_move',
		};
		const isLineSideToPackMove = cmdType === '出库任务' && area === '线边库' && receptArea === '包材库';
		const requestUrl = (isLineSideToPackMove && moveRequestUrlMap[documentType]) || requestUrlMap[documentType];

		// console.log('url', requestUrl);

		if (!requestUrl) {
			message.error(`当前单据类型${documentType ? `“${documentType}”` : ''}暂不支持回传SAP`, 5);
			return;
		}

		setTransferLoading(true);
		try {
			const res: any = await hk_pack_doc_detail__c_API.transferSap(requestUrl, {
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
		<Button size='small' type='primary' style={compactBtnStyle} onClick={openEntryModal} disabled={loading}>
			包材库入库
		</Button>,
		<ModalEntry
			open={entryOpen}
			selectedRow={entryRow}
			onOpenChange={setEntryOpen}
			onSuccess={() => {
				clearSelection?.();
				reloadTable?.();
			}}
		/>,
		<ModalMove
			open={moveOpen}
			selectedRow={moveRow}
			onOpenChange={setMoveOpen}
			onSuccess={() => {
				clearSelection?.();
				reloadTable?.();
			}}
		/>,
		<Button size='small' style={{ ...compactBtnStyle, backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }} onClick={openOutModal} disabled={loading || outLoading} loading={outLoading}>
			包材库出库
		</Button>,
		<ModalOut
			open={outOpen}
			selectedRow={outRow}
			stockData={outStock}
			onOpenChange={setOutOpen}
			onSuccess={() => {
				clearSelection?.();
				reloadTable?.();
			}}
		/>,
		<Button size='small' type='primary' style={compactBtnStyle} onClick={() => modalOperate('create', {})}>
			手动创建其他出库单(WMS)
		</Button>,
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
