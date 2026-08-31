import { FullscreenOutlined, PlusOutlined, ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
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
	dataList: Array<any>[];
	ImportData: (data: any) => void;
	columnsCfg: any;
	ops?: { allowCreate?: boolean; allowBatchEdit?: boolean };
	tableInfo: { tableName: string; collection: string };
	columnSchema: Object;
	initColumnSchema?: Object;
	reloadTable?: () => void;
	findApi?: () => Promise<any>;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { openSearch, setOpenSearch, modalOperate, dataList, tableInfo, ImportData, columnsCfg, ops, loading, columnSchema, initColumnSchema, reloadTable, findApi } = props;

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
	const showMaximize = () => {
		dispatch(setGlobalState({ key: 'maximize', value: true }));
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
		// <Search placeholder='快捷搜索...' allowClear onSearch={quickSearch} style={{ width: 200 }} />,
		ops?.allowCreate && (
			<Button size='small' style={compactBtnStyle} onClick={CreateBtn} disabled={loading} loading={loading}>
				新建
			</Button>
		),
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
