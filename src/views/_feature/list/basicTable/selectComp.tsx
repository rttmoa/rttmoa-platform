/* eslint-disable prettier/prettier */
import { Select, Space, Typography } from 'antd';

export const selectOption = [
	{ label: '表格基本用法 Basic', value: 'TableBasic' },
	{ label: '表格基本用法 优化', value: 'TableBasicHigt' },
	// 选择和操作：<Table rowSelection={{ selectedRowKeys, onChange: onSelectChange }} columns={columns} dataSource={data} />
	{ label: '表头自定义选择项 SelectCustom', value: 'TableSelectCustom' },
	{ label: '表头筛选和排序 FilterSort', value: 'TableFilterSort' },
	{ label: '表头自定义筛选的搜索 FilterSearch', value: 'TableFilterSearch' },
	{ label: '表头自定义筛选菜单 FilterPanel', value: 'TableFilterPanel' },
	{ label: '表头远程加载数据 Ajax', value: 'TableAjax' },
	{ label: '** 树形数据展示 TreeData', value: 'TableTreeData' },
	{ label: '固定表头 FixedHeader', value: 'TableFixedHeader' },
	{ label: '固定列 FixedColumns', value: 'TableFixedColumns' },
	{ label: '固定头和列 FixedHeaderColumns', value: 'TableFixedHeaderColumns' },
	{ label: '** 隐藏列 HiddenColumns', value: 'TableHiddenColumns' },
	{ label: '表头分组 Grouping', value: 'TableGrouping' },
	{ label: '可编辑单元格 EditCell', value: 'TableEditCell' },
	{ label: '** 可编辑行 EditRow', value: 'TableEditRow' },
	{ label: '嵌套子表格 Sub', value: 'TableSub' },
	{ label: '拖拽排序', value: '1' },
	{ label: '拖拽手柄列', value: '2' },
	{ label: '总结栏', value: '3' },
	{ label: '单元格省略提示 Ellipsis', value: 'TableEllipsis' },
	{ label: '** 虚拟列表 Virtual', value: 'TableVirtual' },
	{ label: '** 响应式 Responsive', value: 'TableResponsive' },
	{ label: '随页面滚动的固定表头和滚动条 Sticky', value: 'TableSticky' },
	{ label: '动态控制表格属性 Dynamic', value: 'TableDynamic' },
];
interface Params {
	handleChange: (value: string) => void;
	initValue: string;
}
const SelectComp = ({ handleChange, initValue }: Params) => {
	return (
		<Select
			// defaultValue="FromCollectUser" // 指定默认选中的条目
			style={{ width: 250 }}
			listHeight={850} // 设置弹窗滚动高度
			onChange={handleChange} // 选中 option，或 input 的 value 变化时，调用此函数
			options={selectOption} // 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能
			value={initValue} // 指定当前选中的条目，多选时为一个数组。（value 数组引用未变化时，Select 不会更新）
			// loading
			// disabled
			// autoFocus
			// defaultActiveFirstOption={false}
			// defaultOpen // 是否默认展开下拉菜单
			// dropdownStyle={{color: '#f5f5f5', backgroundColor:'#f5f5f5'}}
			// virtual
			// size="middle"
			showSearch // 配置是否可搜索
			// onMouseEnter={() => {console.log("鼠标移入");}}
			// onMouseLeave={() => {console.log("鼠标移出");}}
			// onSearch={() => {console.log("文本框值变化时回调");}}
			// allowClear
			// onClear={() => {console.log("清除内容时回调");}}
		/>
	);
};

export default SelectComp;
