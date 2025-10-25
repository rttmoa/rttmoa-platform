import { FullscreenOutlined, PlusOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
import TableColumnsConfig from './Column';

type ToolBarProps = {
	quickSearch: () => void;
	openSearch: string;
	SetOpenSearch: any;
	modalOperate: (type: string, data: any) => void;
	tableName: string;
	tableData: Array<any>[];
	ImportData: (data: any) => void;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { quickSearch, openSearch, SetOpenSearch, modalOperate, tableData, tableName, ImportData } = props;
	const dispatch = useDispatch();

	const CreateBtn = () => {
		modalOperate('create', null);
	};
	// Excel 头
	const excelHeader = TableColumnsConfig(1, 1)
		.filter((v: any) => {
			return v.title != '操作' && v.title != '创建日期';
		})
		.map((v: any) => v.title);
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

	return [
		// <Search placeholder='快捷搜索...' allowClear onSearch={quickSearch} style={{ width: 200 }} />,
		<Button icon={<PlusOutlined />} onClick={CreateBtn}>
			新建
		</Button>,
		<Excel
			TableName={tableName} // 表格名称
			tableHeaders={excelHeader} // 表头数据
			ExportData={exportExcel} // 接口数据：所有表数据
			ImportData={handleImport} // 表格数据
		>
			<Button icon={<SettingOutlined className='hover:cursor-pointer' />}>Excel Setting</Button>
		</Excel>,
		<Tooltip title={!openSearch ? '关闭表单搜索' : '开启表单搜索'} className='text-lg'>
			<span onClick={() => SetOpenSearch(!openSearch)}>
				<SearchOutlined />
			</span>
		</Tooltip>,
		<Tooltip title='全屏' className='text-lg'>
			<span onClick={() => dispatch(setGlobalState({ key: 'maximize', value: true }))}>
				<FullscreenOutlined />
			</span>
		</Tooltip>,
	];
};
export default ToolBarRender;
