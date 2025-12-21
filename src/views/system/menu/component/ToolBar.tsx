import { ArrowsAltOutlined, FullscreenOutlined, MinusSquareOutlined, PlusOutlined, PlusSquareOutlined, SearchOutlined, ShrinkOutlined } from '@ant-design/icons';
import { Button, message, Tooltip } from 'antd';
import { useDispatch } from '@/redux';
import { setGlobalState } from '@/redux/modules/global';
import { sleep } from '@/utils';

type ToolBarProps = {
	openSearch: string;
	SetOpenSearch: any;
	handleOperator: (type: string, data: any) => void;
	setRowKeys: any;
	SetLoading: any;
	menuList: any[];
};

// * 渲染工具栏 组件
const ToolBarRender = (props: ToolBarProps) => {
	let { openSearch, SetOpenSearch, handleOperator, setRowKeys, SetLoading, menuList } = props;
	const dispatch = useDispatch();

	const CreateBtn = () => handleOperator('create', null);
	const ExportBtn = () => {};
	const ImportBtn = () => {};

	const menuExpand = async () => {
		SetLoading(true);
		await sleep(1000);
		let setExpandKey: any = [];
		const handleMenu = (menuConfig: any) => {
			return menuConfig?.map((item: any) => {
				if (item.children && item.children.length) {
					setExpandKey.push(item.unique);
					handleMenu(item.children);
				}
				return item;
			});
		};
		handleMenu(menuList);
		setRowKeys(setExpandKey);
		SetLoading(false);
	};
	const menuClosed = () => {
		setRowKeys([]);
	};
	return [
		<Button type='primary' icon={<PlusOutlined />} onClick={CreateBtn}>
			新建菜单
		</Button>,
		<Button type='primary' icon={<PlusSquareOutlined />} onClick={menuExpand}>
			展开全部菜单
		</Button>,
		<Button type='primary' icon={<MinusSquareOutlined />} onClick={menuClosed}>
			折叠全部菜单
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
