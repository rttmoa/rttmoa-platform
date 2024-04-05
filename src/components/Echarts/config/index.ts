// @代码编辑-TS、完整代码-按需导入 查询配置
// 折线图： https://echarts.apache.org/examples/zh/editor.html?c=pictorialBar-body-fill&lang=ts

import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	// 数据集组件
	DatasetComponent,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent,
	LegendComponent,
	PolarComponent,
	GeoComponent,
	ToolboxComponent,
	MarkLineComponent,
	MarkLineComponentOption,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import {
	// 组件类型的定义后缀都为 ComponentOption
	BarSeriesOption,
	LineSeriesOption,
	LinesSeriesOption,
	PieSeriesOption,
	ScatterSeriesOption,
	RadarSeriesOption,
	GaugeSeriesOption,
	PictorialBarSeriesOption,
	PictorialBarChart,
} from 'echarts/charts'
import type { TitleComponentOption, TooltipComponentOption, GridComponentOption, DatasetComponentOption, LegendComponentOption } from 'echarts/components'
import type { ComposeOption } from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| LinesSeriesOption
	| PieSeriesOption
	| RadarSeriesOption
	| GaugeSeriesOption
	| TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| DatasetComponentOption
	| ScatterSeriesOption
	| MarkLineComponentOption
	| LegendComponentOption
	| PictorialBarSeriesOption
>

import * as echarts from 'echarts/core'
import { BarChart, LineChart, LinesChart, PieChart, ScatterChart, RadarChart, GaugeChart } from 'echarts/charts'
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LegendComponent,
	PolarComponent,
	GeoComponent,
	ToolboxComponent,
	BarChart,
	LineChart,
	LinesChart,
	PieChart,
	ScatterChart,
	RadarChart,
	GaugeChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
	MarkLineComponent,
	PictorialBarChart,
])

export default echarts
