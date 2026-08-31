import { DeleteOutlined } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';

type SummaryItem = {
	label: string;
	field: string | ((row: any) => any);
};

type FooterComponentProps = {
	selectedRows: any;
	modalResult: (type: any, data: any) => void;
	allowBatchDelete?: boolean;
	summaryItems?: SummaryItem[];
};

// {showFooter && <FooterComponent {...footerProps} summaryItems={footerSummaryItems} />}
const FooterComponent: React.FC<FooterComponentProps> = props => {
	const { selectedRows, modalResult, allowBatchDelete = true, summaryItems = [] } = props;
	const rows = Array.isArray(selectedRows) ? selectedRows : [];

	const toNumber = (value: any) => {
		const num = Number(value);
		return Number.isFinite(num) ? num : 0;
	};

	const formatNumber = (value: number) => {
		const fixed = value.toFixed(3);
		return fixed.replace(/\.?0+$/, '');
	};

	const summaries = summaryItems.map(item => {
		const total = rows.reduce((sum: number, row: any) => {
			const value = typeof item.field === 'function' ? item.field(row) : row?.[item.field];
			return sum + toNumber(value);
		}, 0);

		return { label: item.label, value: formatNumber(total) };
	});

	return (
		<FooterToolbar
			className='px-[50px]'
			extra={
				<div
					className='font-mono'
					style={
						summaries.length
							? {
									display: 'grid',
									gridTemplateColumns: '1fr auto 1fr',
									alignItems: 'center',
									width: 'calc(100vw - 260px)',
								}
							: undefined
					}
				>
					<div>
						已选择 <a style={{ fontWeight: 700 }}>{rows.length}</a> 项 &nbsp;&nbsp;&nbsp;&nbsp;
					</div>
					{/* 汇总：件数、重量 等信息 */}
					{summaries.length > 0 && (
						<div style={{ whiteSpace: 'nowrap' }}>
							{summaries.map((item, index) => (
								<span key={item.label}>
									{index > 0 && <>&nbsp;&nbsp;&nbsp;&nbsp;</>}
									{item.label}
									<a style={{ fontWeight: 700 }}>{item.value}</a>
								</span>
							))}
						</div>
					)}
					{summaries.length > 0 && <div />}
				</div>
			}
		>
			{allowBatchDelete && (
				<Popconfirm
					title='删除多个任务！'
					description={`是否要删除这 ${rows.length} 个任务`}
					onConfirm={() => {
						// 	await handle.handleRemove(selectedRows);
						// 	setSelectedRows([]);
						// 	actionRef.current?.reloadAndRest?.();
						modalResult('moreDelete', null);
					}}
					okText='确认'
					cancelText='取消'
				>
					<Button key='deleteAll' size='middle' icon={<DeleteOutlined />} danger>
						批量删除
					</Button>
				</Popconfirm>
			)}
			{/* <Button type='primary'>批量批准</Button> */}
		</FooterToolbar>
	);
};
export default FooterComponent;
