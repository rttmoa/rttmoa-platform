import { FullscreenOutlined, PlusOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import { product_doc_detail_API } from '@/api/modules/product_task';
import { message } from '@/hooks/useMessage';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
import TableListView from '@/components/TableListView';

type ToolBarProps = {
	quickSearch: () => void;
	openSearch: string;
	setOpenSearch: any;
	modalOperate: (type: string, data: any, modalScene?: 'other' | 'product') => void;
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

	const compactBtnStyle = {
		height: 28,
		paddingInline: 10,
		fontSize: 12,
		borderRadius: 4,
	};

	const CreateBtn = (modalScene: 'other' | 'product') => {
		modalOperate('create', null, modalScene);
	};

	const getTransferApiPath = (documentType: string) => {
		const pathMap: Record<string, string> = {
			生产入库单: '/api/Scheduled/transfer_sap/Product_e_production',
			销售出库单: '/api/Scheduled/transfer_sap/Product_o_sale',
			需求出库单: '/api/Scheduled/transfer_sap/Product_o_demand',
			其他出库单: '/api/Scheduled/transfer_sap/Product_o_other',
		};
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
		const requestUrl = getTransferApiPath(documentType);
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
			const data: any = await product_doc_detail_API.transferSap(requestUrl, requestBody);
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

		if (selectedRows.length > 1) {
			message.error('回传SAP时只允许勾选一条数据', 5);
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
			const requestUrl = '/api/Wcs/Product_OutStock_Find';
			const requestBody = {
				selectedRows,
			};
			const data: any = await product_doc_detail_API.transferSap(requestUrl, requestBody);
			const responseData = data?.data ?? {};
			if (responseData.success) {
				message.success(responseData.message || '执行出库任务成功', 5);
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
			message.error('请先勾选数据后再确认执行出库任务');
			return;
		}
		if (selectedRows.length > 1) {
			message.error('出库时只允许勾选一条数据', 5);
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

	return [
		!loading && ops?.allowCreate && (
			<Button size='small' type='primary' style={compactBtnStyle} onClick={() => CreateBtn('product')}>
				手动创建生产入库单(WMS)
			</Button>
		),
		!loading && ops?.allowCreate && (
			<Button size='small' type='primary' style={compactBtnStyle} onClick={() => CreateBtn('other')}>
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
