import { createElement, useMemo, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import type { ProTableProps } from '@ant-design/pro-components';

const MIN_COLUMN_WIDTH = 80;
const DEFAULT_COLUMN_WIDTH = 120;
const DARK_RESIZE_CURSOR =
	'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2728%27 height=%2714%27 viewBox=%270 0 28 14%27%3E%3Cpath d=%27M2 7 8 2v3h12V2l6 5-6 5V9H8v3z%27 fill=%27%23000%27 stroke=%27%23000%27 stroke-width=%271%27 stroke-linejoin=%27round%27/%3E%3C/svg%3E") 14 7, col-resize';

const getColumnKey = (column: any, index: number, parentKey = '') => {
	const dataIndex = Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex;
	return `${parentKey}${column.key || dataIndex || `column-${index}`}`;
};

const getColumnWidth = (width: any, fallback = DEFAULT_COLUMN_WIDTH) => {
	if (typeof width === 'number') return width;
	if (typeof width === 'string') {
		const parsedWidth = Number.parseInt(width, 10);
		if (!Number.isNaN(parsedWidth)) return parsedWidth;
	}
	return fallback;
};

const getColumnsWidth = (columns: any[]) =>
	columns.reduce((total, column) => {
		if (column.children?.length) return total + getColumnsWidth(column.children);
		return total + getColumnWidth(column.width);
	}, 0);

const ResizableTitle = (props: any) => {
	const { onResize, width, style, children, ...restProps } = props;

	const handleMouseDown = (event: ReactMouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();

		const startX = event.clientX;
		const startWidth = getColumnWidth(width);

		const handleMouseMove = (moveEvent: MouseEvent) => {
			const nextWidth = Math.max(MIN_COLUMN_WIDTH, startWidth + moveEvent.clientX - startX);
			onResize?.(nextWidth);
		};

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
			document.body.style.cursor = '';
			document.body.style.userSelect = '';
		};

		document.body.style.cursor = DARK_RESIZE_CURSOR;
		document.body.style.userSelect = 'none';
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return createElement(
		'th',
		{
			...restProps,
			style: { ...style, position: 'relative', width },
		},
		children,
		createElement('span', {
			onMouseDown: handleMouseDown,
			style: {
				position: 'absolute',
				top: 0,
				right: -4,
				zIndex: 1,
				width: 8,
				height: '100%',
				cursor: DARK_RESIZE_CURSOR,
				userSelect: 'none',
			},
		})
	);
};

const useHeaderStretch = (proTableProps: ProTableProps<any, any>) => {
	const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

	const columns = useMemo(() => {
		const addResizeProps = (tableColumns: any[] = [], parentKey = '') =>
			tableColumns.map((column, index) => {
				const columnKey = getColumnKey(column, index, parentKey);
				const width = columnWidths[columnKey] || getColumnWidth(column.width);
				const nextColumn = {
					...column,
					width,
					onHeaderCell: (col: any) => ({
						...(typeof column.onHeaderCell === 'function' ? column.onHeaderCell(col) : {}),
						width,
						onResize: (nextWidth: number) => setColumnWidths(prev => ({ ...prev, [columnKey]: nextWidth })),
					}),
				};

				if (column.children?.length) {
					nextColumn.children = addResizeProps(column.children, `${columnKey}.`);
				}

				return nextColumn;
			});

		return addResizeProps(proTableProps.columns as any[]);
	}, [proTableProps.columns, columnWidths]);

	const components = useMemo(
		() => ({
			...(proTableProps as any).components,
			header: {
				...(proTableProps as any).components?.header,
				cell: ResizableTitle,
			},
		}),
		[(proTableProps as any).components]
	);

	const scroll = useMemo(
		() => ({
			...proTableProps.scroll,
			x: Math.max(getColumnsWidth(columns), 1000),
		}),
		[proTableProps.scroll, columns]
	);

	return { columns, components, scroll };
};

export default useHeaderStretch;
