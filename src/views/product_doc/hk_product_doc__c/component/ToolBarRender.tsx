import { FullscreenOutlined, PlusOutlined, PrinterOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { message } from '@/hooks/useMessage';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
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
	selectedRows: any[];
	openPrintModal: (record: any) => void;
	columnSchema?: object;
	initColumnSchema?: object;
	reloadTable?: () => void | Promise<void>;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { quickSearch, openSearch, setOpenSearch, modalOperate, tableData, tableName, ImportData, columnsCfg, ops, loading, selectedRows, openPrintModal, columnSchema, initColumnSchema, reloadTable } = props;
	const dispatch = useDispatch();

	const compactBtnStyle = {
		height: 28,
		paddingInline: 10,
		fontSize: 12,
		borderRadius: 4,
	};

	const CreateBtn = () => {
		modalOperate('create', null);
	};
	const PrintBtn = () => {
		if (selectedRows.length !== 1) {
			message.warning('请勾选一条单据后再打印');
			return;
		}
		openPrintModal(selectedRows[0]);
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
			<Button size='small' type='primary' style={compactBtnStyle} onClick={CreateBtn}>
				创建采购/销售/需求单据(SAP)
			</Button>
		),
		!loading && ops?.allowBatchEdit && (
			<Button size='small' style={compactBtnStyle} icon={<PrinterOutlined />} onClick={PrintBtn}>
				打印单据(勾选)
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
