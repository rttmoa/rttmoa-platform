import { FullscreenOutlined, PlusOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { hk_main_cost_center__c_API } from '@/api/modules/global_wms';
import { message } from '@/hooks/useMessage';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import Excel from '@/components/TableExcel';
import { hk_main_warehouse__c_API } from '@/api/modules/global_wms';

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
	syncSapLoading?: boolean;
	setSyncSapLoading?: (loading: boolean) => void;
	reloadTable?: () => void;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { quickSearch, openSearch, setOpenSearch, modalOperate, tableData, tableName, ImportData, columnsCfg, ops, loading, syncSapLoading, setSyncSapLoading, reloadTable } = props;
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

	const syncSapLatestData = async () => {
		setSyncSapLoading?.(true);
		try {
			const res: any = await hk_main_warehouse__c_API.syncSapUnit();
			const responseData = res?.data;
			if (responseData?.success) {
				message.success(responseData.message || '同步SAP接口最新数据成功');
				reloadTable?.();
				return;
			}
			message.warning(responseData?.message || res?.msg || '当前状态不可同步SAP接口最新数据');
		} catch (error: any) {
			if (!error?.msg) {
				message.error(error?.message || '同步SAP接口最新数据失败');
			}
		} finally {
			setSyncSapLoading?.(false);
		}
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

	return [
		// <Search placeholder='快捷搜索...' allowClear onSearch={quickSearch} style={{ width: 200 }} />,
		// !loading && ops?.allowCreate && (
		// 	<Button size='small' style={compactBtnStyle} loading={syncSapLoading} onClick={syncSapLatestData}>
		// 		同步SAP接口最新数据
		// 	</Button>
		// ),
		// !loading && ops?.allowBatchEdit && (
		// 	<Button icon={<PlusOutlined />} onClick={CreateBtn}>
		// 		批量修改
		// 	</Button>
		// ),
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
		<Tooltip title={!openSearch ? '关闭表单搜索' : '开启表单搜索'} className='text-lg'>
			<span onClick={() => setOpenSearch(!openSearch)}>
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
