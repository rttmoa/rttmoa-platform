import { Pagination, Table } from 'antd';
import React, { useEffect, useRef } from 'react';

// 如果要使用不回行的table，那么就要设置table的className为nowrap，并且不能对td设置特定的宽度，且scroll={{ y: true, x: true }}的X值必须为true
export default function TableList(props: any) {
	const timer = useRef<any>(null);

	const tableWidthAdaptive = () => {
		if (props.className && props.className.indexOf('nowrap') > -1) {
			timer.current = setInterval(() => {
				// 通过定时器循环的方式，看看真实节点是否加载到dom中了
				const tds = document.querySelector('.ant-table-row') && document.querySelector('.ant-table-row')!.querySelectorAll('td');
				const ths: any = document.querySelectorAll('.ant-table-header th');
				if (tds && tds.length) {
					clearInterval(timer.current);
					for (let i = 0; i < tds.length; i += 1) {
						const tdw = tds[i].offsetWidth;
						const thw = ths[i].offsetWidth;
						const w = tdw > thw ? tdw : thw;
						tds[i].style.minWidth = `${w}px`;
						ths[i].style.minWidth = `${w}px`;
					}
				}
			}, 100);
		}
	};
	useEffect(() => {
		tableWidthAdaptive();
		return () => {
			clearInterval(timer.current);
		};
	});

	const { currentPage, pageSize, totalCount, onShowSizeChange, onChange, columns } = props;
	// console.log(props);
	const hasMultiHead = columns.filter((one: any) => !!one.children).length > 0;
	return (
		<div className={`table-content ${hasMultiHead ? 'clear-overlap-border' : ''}`}>
			<Table rowClassName={props.rowClassName} pagination={false} bordered={true} rowKey='id' {...props} />
			{currentPage ? (
				<Pagination
					total={totalCount || 0}
					showSizeChanger // 是否可以改变pageSize
					showQuickJumper={false} // 是否可以快速跳转某一页
					onShowSizeChange={onShowSizeChange}
					onChange={onChange}
					showTotal={_totalCount => `共 ${_totalCount} 条`}
					current={currentPage || 1}
					pageSize={pageSize || 10}
					{...props}
				/>
			) : null}
		</div>
	);
}
