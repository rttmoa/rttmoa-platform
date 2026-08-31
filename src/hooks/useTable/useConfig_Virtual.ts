import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

const horizontalScrollbarHeight = 18;
const virtualTableClassName = 'mater-stock-detail-virtual-table';

interface UseConfigVirtualOptions {
	Virtual?: boolean;
	innerHeight?: number;
	openSearch: boolean;
	selectedRowsLength: number;
	tableScrollX: number;
}

const useConfigVirtual = ({ Virtual = false, innerHeight, openSearch, selectedRowsLength, tableScrollX }: UseConfigVirtualOptions) => {
	const [tableScrollY, setTableScrollY] = useState(400);

	useEffect(() => {
		if (!Virtual) return;

		const tableRoot = document.querySelector(`.${virtualTableClassName}`);
		if (!tableRoot) return;

		const updateScrollHeight = () => {
			const tableHeader = tableRoot.querySelector('.ant-table-thead');
			if (!tableHeader) return;

			const pagination = tableRoot.querySelector('.ant-table-pagination');
			const paginationStyle = pagination ? window.getComputedStyle(pagination) : null;
			const paginationHeight = pagination
				? pagination.getBoundingClientRect().height + Number.parseFloat(paginationStyle?.marginTop || '0') + Number.parseFloat(paginationStyle?.marginBottom || '0')
				: 64;
			const footer = document.querySelector('footer');
			const footerHeight = footer?.getBoundingClientRect().height || 0;

			const nextHeight = Math.max(240, Math.floor(window.innerHeight - tableHeader.getBoundingClientRect().bottom - paginationHeight - footerHeight - 12));
			setTableScrollY(current => (current === nextHeight ? current : nextHeight));
		};

		let frameId = window.requestAnimationFrame(updateScrollHeight);
		const scheduleUpdate = () => {
			window.cancelAnimationFrame(frameId);
			frameId = window.requestAnimationFrame(updateScrollHeight);
		};
		const resizeObserver = new ResizeObserver(scheduleUpdate);
		const layoutElements = [
			tableRoot.querySelector('.ant-pro-table-search'),
			tableRoot.querySelector('.ant-pro-table-list-toolbar'),
			tableRoot.querySelector('.ant-table-pagination'),
		].filter((element): element is Element => Boolean(element));
		layoutElements.forEach(element => resizeObserver.observe(element));

		return () => {
			window.cancelAnimationFrame(frameId);
			resizeObserver.disconnect();
		};
	}, [Virtual, innerHeight, openSearch, selectedRowsLength]);

	const virtualProps = useMemo(() => {
		if (!Virtual) return { scroll: { x: tableScrollX, y: '100vh' } };

		const tableBodyScrollY = Math.max(230, tableScrollY - horizontalScrollbarHeight);
		return {
			style: {
				'--mater-stock-table-scroll-y': `${tableScrollY}px`,
				'--mater-stock-table-body-scroll-y': `${tableBodyScrollY}px`,
			} as CSSProperties,
			virtual: true,
			scroll: { x: tableScrollX, y: tableBodyScrollY },
		};
	}, [Virtual, tableScrollX, tableScrollY]);

	return {
		virtualClassName: Virtual ? ` ${virtualTableClassName}` : '',
		virtualProps,
	};
};

export default useConfigVirtual;
