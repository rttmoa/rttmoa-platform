import { ProColumns } from '@ant-design/pro-components';
import { TableRowEdit, TableRenderAction } from '@/components/TableAction';
import Link from 'antd/lib/typography/Link';

const ColumnsConfig = (modalOperate?: any, modalResult?: any, columnsSchemaField?: any, ops?: { allowRowEdit?: boolean; allowEdit?: boolean; allowDelete?: boolean }): ProColumns<any>[] => {
	const columnsField = columnsSchemaField || [];
	if (columnsField.length == 0) {
		return [];
	}
	// 序号
	const t1 = [
		{
			title: <span className='text-[12px] font-sans'>索引</span>,
			dataIndex: 'index',
			valueType: 'index',
			width: 60,
			fixed: 'left',
			align: 'center',
			render: (text: any, entity: any, index: any) => <Link onClick={() => modalOperate('detail', entity)}>{index + 1}</Link>,
			responsive: ['sm'],
		},
	];
	const allowRowEdit = ops?.allowRowEdit !== false;
	// 行内编辑 & 操作
	const t2: ProColumns<any>[] = [];
	if (allowRowEdit) {
		t2.push({
			title: <span className='text-[13px] font-sans'>行内编辑</span>,
			valueType: 'option',
			align: 'center',
			fixed: 'right',
			width: 120,
			render: (text: any, record: any, index: number, action: any) => TableRowEdit(record, index, action),
		} as any);
	}
	t2.push({
		key: 'option',
		title: <span className='text-[13px] font-sans'>操作</span>,
		align: 'center',
		fixed: 'right',
		width: 135,
		editable: () => false,
		tooltip: '操作按钮分别是：详情、编辑、删除',
		hideInSearch: true,
		render: (_: any, record: any) => TableRenderAction(record, modalOperate, modalResult, { allowEdit: ops?.allowEdit, allowDelete: ops?.allowDelete }),
	});
	let totalColumn = [...t1, ...columnsField, ...t2];
	// console.log('totalColumn', totalColumn);
	return totalColumn;
};
export default ColumnsConfig;
