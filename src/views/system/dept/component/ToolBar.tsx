import { ArrowsAltOutlined, FullscreenOutlined, PlusOutlined, SearchOutlined, SecurityScanTwoTone, ShrinkOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search'; // ! antd/lib/input
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';

type ToolBarProps = {
	quickSearch: () => void;
	openSearch: string;
	SetOpenSearch: any;
	handleOperator: (type: string, data: any) => void;
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { quickSearch, openSearch, SetOpenSearch, handleOperator } = props;
	const dispatch = useDispatch();

	const CreateBtn = () => {
		handleOperator('create', null);
	};
	const ExportBtn = () => {};
	const ImportBtn = () => {};
	return [
		<Search placeholder='快捷搜索...' allowClear onSearch={quickSearch} style={{ width: 200 }} />,
		<Button icon={<PlusOutlined />} onClick={CreateBtn}>
			新建
		</Button>,
		<Button icon={<ArrowsAltOutlined />} onClick={ExportBtn}>
			导出EXCEL
		</Button>,
		<Button icon={<ShrinkOutlined />} onClick={ImportBtn}>
			导入EXCEL
		</Button>,
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
