import { FullscreenOutlined, PlusOutlined, ReloadOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import { message } from '@/hooks/useMessage';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
import TableListView from '@/components/TableListView';

type ToolBarProps = {
	loading?: boolean;
	quickSearch: () => void;
	openSearch: string;
	setOpenSearch: any;
	modalOperate: (type: string, data: any) => void;
	tableData: any[];
	findApi?: () => Promise<any>;
	ImportData: (data: any) => void;
	columnsCfg: any;
	ops?: { allowCreate?: boolean; allowBatchEdit?: boolean };
	tableInfo: { tableName: string; collection: string };
	columnSchema: Object;
	reloadTable?: () => void;
	selectedRows?: any[];
	roundupLoading?: boolean;
	handleRoundup?: () => Promise<boolean>;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { quickSearch, openSearch, setOpenSearch, modalOperate, tableData, findApi, tableInfo, ImportData, columnsCfg, ops, loading, columnSchema, reloadTable, selectedRows = [], roundupLoading, handleRoundup } = props;

	const dispatch = useDispatch();
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

	const CreateBtn = () => {
		modalOperate('create', null);
	};

	const handleConfirmRoundup = () => {
		if (selectedRows.length === 0) {
			message.warning('请先勾选需要出库的数据');
			return;
		}

		Modal.confirm({
			title: '确认出库',
			content: `是否选择 ${selectedRows.length} 条数据进行出库？`,
			okText: '确定',
			cancelText: '取消',
			onOk: () => handleRoundup?.(),
		});
	};

	const showMaximize = () => {
		dispatch(setGlobalState({ key: 'maximize', value: true }));
	};

	// Excel 头
	const excelHeader = columnsCfg
		.filter((v: any) => {
			return v?.title != '操作' && v?.title != '创建日期';
		})
		.map((v: any) => v?.title);
	const exportExcel = tableData;
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

	return [
		// <Search placeholder='快捷搜索...' allowClear onSearch={quickSearch} style={{ width: 200 }} />,
		ops?.allowCreate && (
			<Button size='small' style={compactBtnStyle} onClick={handleConfirmRoundup} disabled={loading || roundupLoading} loading={roundupLoading}>
				盘点
			</Button>
		),
		// !loading && ops?.allowBatchEdit && (
		// 	<Button icon={<PlusOutlined />} onClick={CreateBtn}>
		// 		批量修改
		// 	</Button>
		// ),
		<Excel
			TableName={tableInfo.tableName} // 表格名称
			tableHeaders={excelHeader} // 表头数据
			ExportData={exportExcel} // 接口数据：所有表数据
			ImportData={handleImport} // 表格数据
			columnSchema={columnSchema as any}
			findApi={findApi}
		>
			<Button size='small' style={compactBtnStyle} icon={<SettingOutlined className='hover:cursor-pointer' />} disabled={loading}>
				Excel Setting
			</Button>
		</Excel>,
		<TableListView columnSchema={columnSchema as any} disabled={loading} toolbarIconStyle={toolbarIconStyle} reloadTable={reloadTable} />,
		// <Tooltip title='刷新表格数据' className='text-lg'>
		// 	<span style={toolbarIconStyle} onClick={() => reloadTable?.()}>
		// 		<ReloadOutlined />
		// 	</span>
		// </Tooltip>,
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
