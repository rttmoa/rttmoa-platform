import { ArrowsAltOutlined, FullscreenOutlined, PlusOutlined, SearchOutlined, SecurityScanTwoTone, ShrinkOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search'; // ! antd/lib/input
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';

// * 渲染工具栏
const ToolBarRender = (Params: any) => {
	let { setModalIsVisible, quickSearch, openSearch, SetOpenSearch, handleOperator } = Params;
	const dispatch = useDispatch();

	const CreateBtn = () => {
		handleOperator('create', null);
	};
	const ExportBtn = () => {};
	const ImportBtn = () => {};
	return [
		<Search size='small' placeholder='快捷搜索...' allowClear onSearch={quickSearch} style={{ width: 150 }} />,
		<Button size='small' type='dashed' key='button' icon={<PlusOutlined />} onClick={CreateBtn}>
			新建
		</Button>,
		<Button size='small' type='dashed' key='button' icon={<ArrowsAltOutlined />} onClick={ExportBtn}>
			导出EXCEL
		</Button>,
		<Button size='small' type='dashed' key='button' icon={<ShrinkOutlined />} onClick={ImportBtn}>
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
