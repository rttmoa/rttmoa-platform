import echarts, { ECOption } from '@/components/Echarts/config';
import tasks from './database';
import stockRows from './database_stock';

// Product Sale Overview
export const overviewOptionsFn = (isDark: boolean): ECOption => {
	const inRows = tasks.filter(t => t.instruct_type__c === '入库任务');
	const outRows = tasks.filter(t => t.instruct_type__c === '出库任务');

	const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
	const parseMs = (t: string) => {
		const [d, tm] = String(t).split(' ');
		const [y, m, da] = String(d).split('/').map(Number);
		const [hh = 0, mm = 0, ss = 0] = String(tm || '00:00:00')
			.split(':')
			.map(Number);
		return new Date(y, (m || 1) - 1, da || 1, hh, mm, ss).getTime();
	};
	const fmt = (t: string) => {
		const [d, tm] = String(t).split(' ');
		const [, m, da] = String(d)
			.split('/')
			.map(v => Number(v));
		const [hh = '00', mm = '00'] = String(tm || '00:00').split(':');
		return `${pad(m)}-${pad(da)} ${hh}:${mm}`;
	};

	const buildSeriesData = (rows: any[]) => {
		const map = new Map<string, { ms: number; total: number }>();
		for (const r of rows) {
			const key = fmt(r.time__c);
			const ms = parseMs(r.time__c);
			const prev = map.get(key);
			map.set(key, { ms, total: (prev?.total || 0) + 1 });
		}
		return Array.from(map.entries())
			.map(([k, v]) => ({ k, ms: v.ms, total: v.total }))
			.sort((a, b) => a.ms - b.ms);
	};

	const inAgg = buildSeriesData(inRows);
	const outAgg = buildSeriesData(outRows);
	const union = new Map<string, number>();
	for (const i of inAgg) union.set(i.k, i.ms);
	for (const o of outAgg) union.set(o.k, o.ms);
	const categoriesAll = Array.from(union.entries())
		.sort((a, b) => a[1] - b[1])
		.map(([k]) => k);
	const categories = categoriesAll.slice(-30); // 最近 30 个时间点

	const inData = categories.map(c => inAgg.find(i => i.k === c)?.total ?? 0);
	const outData = categories.map(c => outAgg.find(o => o.k === c)?.total ?? 0);

	return {
		legend: { top: 8, left: 'center', orient: 'horizontal', itemGap: 20, data: ['入库任务（绿色）', '出库任务（蓝色）'], textStyle: { color: isDark ? '#c5c5c5' : '#222' } },
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'line' },
			formatter: (params: any) => {
				const p = Array.isArray(params) ? params : [];
				const time = p[0]?.axisValue || '';
				const inVal = p.find((x: any) => (x?.seriesName || '').includes('入库'))?.data ?? 0;
				const outVal = p.find((x: any) => (x?.seriesName || '').includes('出库'))?.data ?? 0;
				return `时间：${time}<br/>入库条数：${inVal}<br/>出库条数：${outVal}`;
			},
		},
		// 直角坐标系 grid 中的 x 轴
		xAxis: {
			name: '时间',
			type: 'category',
			data: categories,
			axisLabel: { rotate: 25, color: isDark ? '#c5c5c5' : '#595959' },
			axisLine: { show: true },
		},
		// 直角坐标系内绘图网格
		grid: {
			left: '7%',
			right: '12%',
			bottom: '6%',
			top: '16%',
			containLabel: true,
		},
		// 直角坐标系 grid 中的 y 轴
		yAxis: {
			name: '条数',
			type: 'value',
			splitLine: {
				show: true,
				lineStyle: {
					color: isDark ? '#5e5e5e' : '#e0e6f1',
				},
			},
		},
		series: [
			{
				name: '入库任务（绿色）',
				data: inData,
				type: 'line',
				smooth: true,
				showSymbol: true,
				symbol: 'circle',
				symbolSize: 8,
				itemStyle: { color: '#2fce9e' },
				lineStyle: { width: 4, color: '#2fce9e' },
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(47,206,158,0.35)' },
						{ offset: 1, color: 'rgba(47,206,158,0.05)' },
					]),
				},
			},
			{
				name: '出库任务（蓝色）',
				data: outData,
				type: 'line',
				smooth: true,
				showSymbol: true,
				symbol: 'circle',
				symbolSize: 8,
				itemStyle: { color: '#1890FF' },
				lineStyle: { width: 4, color: '#1890FF' },
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(24,144,255,0.35)' },
						{ offset: 1, color: 'rgba(24,144,255,0.05)' },
					]),
				},
			},
		],
	};
};

export const stockOverviewOptionsFn = (isDark: boolean): ECOption => {
	const pad = (n: number) => (n < 10 ? '0' + n : '' + n);
	const parseMs = (t: string) => {
		const [d, tm] = String(t).split(' ');
		const [y, m, da] = String(d).split('/').map(Number);
		const [hh = 0] = String(tm || '00:00:00')
			.split(':')
			.map(Number);
		return new Date(y, (m || 1) - 1, da || 1, hh, 0, 0).getTime();
	};
	const fmt = (t: string) => {
		const [d, tm] = String(t).split(' ');
		const [, m, da] = String(d)
			.split('/')
			.map(v => Number(v));
		const [hh = '00'] = String(tm || '00:00').split(':');
		return `${pad(m)}-${pad(da)} ${hh}:00`;
	};

	const map = new Map<string, { ms: number; total: number }>();
	for (const r of stockRows as any[]) {
		const key = fmt(r.time__c);
		const ms = parseMs(r.time__c);
		const prev = map.get(key);
		const qty = Number(r.final_quantity__c ?? r.now_quantity__c ?? 0);
		map.set(key, { ms, total: (prev?.total || 0) + qty });
	}
	const agg = Array.from(map.entries())
		.map(([k, v]) => ({ k, ms: v.ms, total: v.total }))
		.sort((a, b) => a.ms - b.ms);
	const categories = agg.map(a => a.k).slice(-30);
	const data = categories.map(c => agg.find(a => a.k === c)?.total ?? 0);

	return {
		legend: { top: 8, left: 'center', orient: 'horizontal', itemGap: 20, data: ['每小时入库总数量'], textStyle: { color: isDark ? '#c5c5c5' : '#222' } },
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'line' },
			formatter: (params: any) => {
				const p = Array.isArray(params) ? params : [];
				const time = p[0]?.axisValue || '';
				const val = p.find((x: any) => (x?.seriesName || '').includes('入库'))?.data ?? 0;
				return `时间：${time}<br/>入库数量：${val}`;
			},
		},
		xAxis: {
			name: '时间',
			type: 'category',
			data: categories,
			axisLabel: { rotate: 25, color: isDark ? '#c5c5c5' : '#595959' },
			axisLine: { show: true },
		},
		grid: { left: '7%', right: '12%', bottom: '6%', top: '16%', containLabel: true },
		yAxis: {
			name: '每小时入库总数量',
			type: 'value',
			splitLine: { show: true, lineStyle: { color: isDark ? '#5e5e5e' : '#e0e6f1' } },
		},
		series: [
			{
				name: '每小时入库总数量',
				data,
				type: 'line',
				smooth: true,
				showSymbol: true,
				symbol: 'circle',
				symbolSize: 8,
				itemStyle: { color: '#f5222d' },
				lineStyle: { width: 4, color: '#f5222d' },
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{ offset: 0, color: 'rgba(245,34,45,0.35)' },
						{ offset: 1, color: 'rgba(245,34,45,0.05)' },
					]),
				},
			},
		],
	};
};
