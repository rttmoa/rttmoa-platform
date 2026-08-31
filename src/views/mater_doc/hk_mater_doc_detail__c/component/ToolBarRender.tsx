import { FullscreenOutlined, PlusOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Popover, Space, Tooltip } from 'antd';
import { hk_mater_doc_detail__c_API } from '@/api/modules/mater';
import { message } from '@/hooks/useMessage';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
import { useState } from 'react';
import ModaLeiEntry from '../unique/Moda_lei_entry';
import ModalTieEntry from '../unique/Modal_tie_entry';
import ModalLeiOut from '../unique/Modal_lei_out';
import ModalTieOut from '../unique/Modal_tie_out';
import TableListView from '@/components/TableListView';

type ToolBarProps = {
	quickSearch: () => void;
	openSearch: string;
	setOpenSearch: any;
	modalOperate: (type: string, data: any) => void;
	tableName: string;
	tableData: Array<any>[];
	ImportData: (data: any) => void;
	columnsCfg: any;
	ops?: { allowCreate?: boolean; allowBatchEdit?: boolean };
	loading?: boolean;
	transferLoading?: boolean;
	setTransferLoading?: (loading: boolean) => void;
	selectedRows?: any[];
	columnSchema?: object;
	initColumnSchema?: object;
	reloadTable?: () => void | Promise<void>;
	clearSelection?: () => void;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let {
		quickSearch,
		openSearch,
		setOpenSearch,
		modalOperate,
		tableData,
		tableName,
		ImportData,
		columnsCfg,
		ops,
		loading,
		transferLoading,
		setTransferLoading,
		selectedRows = [],
		columnSchema,
		initColumnSchema,
		reloadTable,
		clearSelection,
	} = props;
	const dispatch = useDispatch();
	const [leiEntryOpen, setLeiEntryOpen] = useState(false);
	const [leiEntryRow, setLeiEntryRow] = useState<any>({});
	const [tieEntryOpen, setTieEntryOpen] = useState(false);
	const [tieEntryRow, setTieEntryRow] = useState<any>({});
	const [leiOutOpen, setLeiOutOpen] = useState(false);
	const [leiOutRow, setLeiOutRow] = useState<any>({});
	const [leiOutStock, setLeiOutStock] = useState<any>({});
	const [leiOutLoading, setLeiOutLoading] = useState(false);
	const [tieOutOpen, setTieOutOpen] = useState(false);
	const [tieOutRow, setTieOutRow] = useState<any>({});
	const [tieOutStock, setTieOutStock] = useState<any>({});
	const [tieOutLoading, setTieOutLoading] = useState(false);

	const compactBtnStyle = {
		height: 28,
		paddingInline: 10,
		fontSize: 12,
		borderRadius: 4,
	};

	const CreateBtn = () => {
		modalOperate('create', null);
	};

	const getTransferApiPath = (selectedRow: any) => {
		const documentType = String(selectedRow.document_type__c || '').trim();
		const cmdType = String(selectedRow.cmdtype__c || '').trim();
		const area = String(selectedRow.area__c || '').trim();
		const receptArea = String(selectedRow.recept_area__c || '').trim();
		const pathMap: Record<string, string> = {
			采购入库单: '/api/Scheduled/transfer_sap/Material_e_purchase',
			销售出库单: '/api/Scheduled/transfer_sap/Material_o_sale',
			需求出库单: '/api/Scheduled/transfer_sap/Material_o_demand',
			其他出库单: '/api/Scheduled/transfer_sap/Material_o_other',
			销售退货单: '/api/Scheduled/transfer_sap/material_e_sale_back',
		};
		const moveSuffixMap: Record<string, string> = {
			'原料雷马外租冻库->原料一号冻库': '01',
			'原料中铁外租冻库->原料一号冻库': '02',
			'原料雷马外租冻库->原料二号冻库': '03',
			'原料中铁外租冻库->原料二号冻库': '04',
			'线边库->原料一号冻库': '05',
			'线边库->原料二号冻库': '06',
		};
		const moveTypeMap: Record<string, string> = {
			需求出库单: 'demand',
			其他出库单: 'other',
		};
		const moveSuffix = moveSuffixMap[`${area}->${receptArea}`];
		const moveType = moveTypeMap[documentType];

		if (cmdType === '出库任务' && moveType && moveSuffix) {
			return `/api/Scheduled/transfer_sap/Material_o_${moveType}_move${moveSuffix}`;
		}

		return pathMap[documentType];
	};

	const transferSapResult = async () => {
		if (selectedRows.length === 0) {
			message.error('请选择一条数据后再回传SAP', 5);
			return;
		}

		if (selectedRows.length > 1) {
			message.error('回传SAP时只允许勾选一条数据', 5);
			return;
		}

		const selectedRow = selectedRows[0] || {};
		const documentType = String(selectedRow.document_type__c || '').trim();
		const requestUrl = getTransferApiPath(selectedRow);
		if (!requestUrl) {
			message.error(`当前单据类型${documentType ? `“${documentType}”` : ''}暂不支持回传SAP`, 5);
			return;
		}

		setTransferLoading?.(true);
		try {
			const requestBody = {
				documentType,
				selectedRow,
				selectedRows: [selectedRow],
			};
			const data: any = await hk_mater_doc_detail__c_API.transferSap(requestUrl, requestBody);
			const responseData = data?.data ?? {};
			if (responseData.success) {
				message.success(responseData.message || '回传SAP成功');
			} else {
				message.error(responseData.message || '当前状态不可回传SAP', 5);
			}
			reloadTable?.();
		} catch (error: any) {
			if (!error?.msg) {
				message.error(error?.message || '回传SAP失败', 5);
			}
		} finally {
			clearSelection?.();
			setTransferLoading?.(false);
		}
	};

	const confirmTransferSapResult = () => {
		if (selectedRows.length === 0) {
			message.error('请先勾选数据后再确认回传SAP', 5);
			return;
		}

		Modal.confirm({
			title: '确认回传SAP',
			content: '是否对当前勾选的数据进行回传SAP？',
			okText: '确认',
			cancelText: '取消',
			onOk: transferSapResult,
		});
	};

	const createWmsOutStockTask = async () => {
		if (selectedRows.length === 0) {
			message.error('请先勾选数据后再执行出库任务', 5);
			return;
		}

		if (selectedRows.length > 1) {
			message.error('出库时只允许勾选一条数据', 5);
			return;
		}

		setTransferLoading?.(true);
		try {
			const requestUrl = '/api/Wcs/Material_OutStock_Find';
			const requestBody = {
				selectedRows,
			};
			const data: any = await hk_mater_doc_detail__c_API.transferSap(requestUrl, requestBody);
			const responseData = data?.data ?? {};
			if (responseData.success) {
				message.success(responseData.message || '执行出库任务成功');
			} else {
				message.error(responseData.message || responseData.msg || '执行出库任务失败', 5);
			}
			reloadTable?.();
		} catch (error: any) {
			if (!error?.msg) {
				message.error(error?.message || '执行出库任务失败', 5);
			}
		} finally {
			clearSelection?.();
			setTransferLoading?.(false);
		}
	};

	const confirmCreateWmsOutStockTask = () => {
		if (selectedRows.length === 0) {
			message.error('请先勾选数据后再确认执行出库任务', 5);
			return;
		}

		Modal.confirm({
			title: '确认执行出库任务',
			content: '是否对当前勾选的数据执行出库任务？',
			okText: '确认',
			cancelText: '取消',
			onOk: createWmsOutStockTask,
		});
	};

	// Excel 头
	const excelHeader = columnsCfg
		.filter((v: any) => {
			return v?.title != '操作' && v?.title != '创建日期';
		})
		.map((v: any) => v?.title);
	const exportExcel: any = tableData.map((v: any) => {
		return {
			岗位名称: v.postName,
			岗位排序: v.postSort,
			岗位状态: v.status,
			创建时间: v.createTime,
			岗位描述: v.desc,
		};
	});
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
	// console.log('导入表格字段：', excelHeader);
	// console.log('导出表格数据（需要处理）：', exportExcel);

	const showMaximize = () => {
		dispatch(setGlobalState({ key: 'maximize', value: true }));
	};

	const getCheckedEntryRow = (operationName: string, expectedArea: string) => {
		if (selectedRows.length === 0) {
			message.error(`请先勾选一条数据后再执行${operationName}`, 5);
			return null;
		}
		if (selectedRows.length > 1) {
			message.error(`${operationName}只允许勾选一条数据`, 5);
			return null;
		}

		const selectedRow = selectedRows[0] || {};
		if (String(selectedRow.cmdtype__c || '').trim() !== '入库任务') {
			message.error('勾选数据的任务类型必须是入库任务', 5);
			return null;
		}
		if (String(selectedRow.area__c || '').trim() !== expectedArea) {
			message.error(`勾选数据的库区必须是${expectedArea}`, 5);
			return null;
		}

		return selectedRow;
	};

	const openLeiEntryModal = () => {
		const selectedRow = getCheckedEntryRow('原料雷马入库', '原料雷马外租冻库');
		if (!selectedRow) return;
		setLeiEntryRow(selectedRow);
		setLeiEntryOpen(true);
	};

	const openTieEntryModal = () => {
		const selectedRow = getCheckedEntryRow('原料中铁入库', '原料中铁外租冻库');
		if (!selectedRow) return;
		setTieEntryRow(selectedRow);
		setTieEntryOpen(true);
	};

	const openLeiOutModal = async () => {
		if (selectedRows.length !== 1) {
			message.error(selectedRows.length === 0 ? '请先勾选一条数据后再执行原料雷马出库' : '原料雷马出库只允许勾选一条数据', 5);
			return;
		}
		const selectedRow = selectedRows[0] || {};
		if (String(selectedRow.cmdtype__c || '').trim() !== '出库任务') {
			message.error('勾选数据的任务类型必须是出库任务', 5);
			return;
		}
		if (String(selectedRow.area__c || '').trim() !== '原料雷马外租冻库') {
			message.error('勾选数据的库区必须是原料雷马外租冻库', 5);
			return;
		}

		setLeiOutLoading(true);
		try {
			const res: any = await hk_mater_doc_detail__c_API.getMaterLeiOutStock(selectedRow);
			const responseData = res?.data ?? {};
			if (responseData.success !== true) {
				message.error(responseData.message || res?.msg || '获取原料雷马库存失败', 5);
				return;
			}
			const stockList = Array.isArray(responseData.data) ? responseData.data : [];
			if (!stockList.length) {
				message.error('未获取到原料雷马库存数据', 5);
				return;
			}
			setLeiOutRow(selectedRow);
			setLeiOutStock(stockList[0]);
			setLeiOutOpen(true);
		} catch (error: any) {
			message.error(error?.message || error?.msg || '获取原料雷马库存失败', 5);
		} finally {
			setLeiOutLoading(false);
		}
	};

	const openTieOutModal = async () => {
		if (selectedRows.length !== 1) {
			message.error(selectedRows.length === 0 ? '请先勾选一条数据后再执行原料中铁出库' : '原料中铁出库只允许勾选一条数据', 5);
			return;
		}
		const selectedRow = selectedRows[0] || {};
		if (String(selectedRow.cmdtype__c || '').trim() !== '出库任务') {
			message.error('勾选数据的任务类型必须是出库任务', 5);
			return;
		}
		if (String(selectedRow.area__c || '').trim() !== '原料中铁外租冻库') {
			message.error('勾选数据的库区必须是原料中铁外租冻库', 5);
			return;
		}
		setTieOutLoading(true);
		try {
			const res: any = await hk_mater_doc_detail__c_API.getMaterTieOutStock(selectedRow);
			const responseData = res?.data ?? {};
			if (responseData.success !== true) {
				message.error(responseData.message || res?.msg || '获取原料中铁库存失败', 5);
				return;
			}
			const stockList = Array.isArray(responseData.data) ? responseData.data : [];
			if (!stockList.length) {
				message.error('未获取到原料中铁库存数据', 5);
				return;
			}
			setTieOutRow(selectedRow);
			setTieOutStock(stockList[0]);
			setTieOutOpen(true);
		} catch (error: any) {
			message.error(error?.message || error?.msg || '获取原料中铁库存失败', 5);
		} finally {
			setTieOutLoading(false);
		}
	};

	const flatWarehouseOperations = ['原料雷马入库', '原料雷马出库', '原料中铁入库', '原料中铁出库', '原料二号库出库'];
	const flatWarehouseOperationContent = (
		<Space direction='vertical' size={6}>
			{flatWarehouseOperations.map(operation => (
				<Button
					key={operation}
					size='small'
					style={{ ...compactBtnStyle, width: 128 }}
					onClick={
						operation === '原料雷马入库'
							? openLeiEntryModal
							: operation === '原料雷马出库'
								? openLeiOutModal
								: operation === '原料中铁入库'
									? openTieEntryModal
									: operation === '原料中铁出库'
										? openTieOutModal
										: () => message.info(`${operation}功能待接入`)
					}
					loading={(operation === '原料雷马出库' && leiOutLoading) || (operation === '原料中铁出库' && tieOutLoading)}
				>
					{operation}
				</Button>
			))}
		</Space>
	);

	return [
		<Popover content={flatWarehouseOperationContent} trigger='click' placement='bottom'>
			{/* <div style={{ cursor: 'pointer', userSelect: 'none' }}>平库出入库操作</div> */}
			<Button size='small' type='primary' style={compactBtnStyle}>
				平库出入库操作
			</Button>
		</Popover>,
		<ModaLeiEntry
			open={leiEntryOpen}
			selectedRow={leiEntryRow}
			onOpenChange={setLeiEntryOpen}
			onSuccess={() => {
				clearSelection?.();
				reloadTable?.();
			}}
		/>,
		<ModalTieEntry
			open={tieEntryOpen}
			selectedRow={tieEntryRow}
			onOpenChange={setTieEntryOpen}
			onSuccess={() => {
				clearSelection?.();
				reloadTable?.();
			}}
		/>,
		<ModalLeiOut
			open={leiOutOpen}
			selectedRow={leiOutRow}
			stockData={leiOutStock}
			onOpenChange={setLeiOutOpen}
			onSuccess={() => {
				clearSelection?.();
				reloadTable?.();
			}}
		/>,
		<ModalTieOut
			open={tieOutOpen}
			selectedRow={tieOutRow}
			stockData={tieOutStock}
			onOpenChange={setTieOutOpen}
			onSuccess={() => {
				clearSelection?.();
				reloadTable?.();
			}}
		/>,
		!loading && ops?.allowCreate && (
			<Button size='small' type='primary' style={compactBtnStyle} onClick={CreateBtn}>
				手动创建其他出库单(WMS)
			</Button>
		),
		!loading && ops?.allowCreate && (
			<Button size='small' style={{ ...compactBtnStyle, backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff' }} loading={transferLoading} onClick={confirmCreateWmsOutStockTask}>
				执行出库任务(WMS)
			</Button>
		),
		!loading && ops?.allowBatchEdit && (
			<Button size='small' style={{ ...compactBtnStyle, backgroundColor: '#eb2f96', borderColor: '#eb2f96', color: '#fff' }} loading={transferLoading} onClick={confirmTransferSapResult}>
				回传SAP单据结果
			</Button>
		),
		!loading && (
			<Excel
				TableName={tableName} // 表格名称
				tableHeaders={excelHeader} // 表头数据
				ExportData={exportExcel} // 接口数据：所有表数据
				ImportData={handleImport} // 表格数据
			>
				<Button size='small' style={compactBtnStyle} icon={<SettingOutlined className='hover:cursor-pointer' />}>
					Excel Setting
				</Button>
			</Excel>
		),
		<TableListView columnSchema={columnSchema as any} initColumnSchema={initColumnSchema as any} disabled={loading} reloadTable={reloadTable} />,
		<Tooltip title={!openSearch ? '关闭表单搜索' : '开启表单搜索'} className='text-lg'>
			<span onClick={() => setOpenSearch(!openSearch)}>
				<SearchOutlined />
			</span>
		</Tooltip>,
		<Tooltip title='全屏' className='text-lg'>
			<span onClick={showMaximize}>
				<FullscreenOutlined />
			</span>
		</Tooltip>,
	];
};
export default ToolBarRender;
