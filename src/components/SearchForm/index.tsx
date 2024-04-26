import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BreakPoint } from '../Grid/interface'
import { Button, Form, Space } from 'antd'
import Grid from '../Grid'
import GridItem from '../Grid/components/GridItem'
import { ColumnProp } from '../ProTable/interface'
import { Icon } from '../Icon'
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'

interface ProTableProps {
	// columns?: ColumnProp[] // 搜索配置列
	columns: any
	searchParam?: { [key: string]: any } // 搜索参数
	searchCol: number | Record<BreakPoint, number>
	search: (params: any) => void // 搜索方法
	reset: (params: any) => void // 重置方法
}

export default function SearchForm(props: ProTableProps) {
	const { columns = () => [], searchParam = () => ({}) } = props

	const [collapsed, setCollapsed] = useState(false)

	const gridRef = useRef<any>('xl')
	const [breakPoint, setBreakPoint] = useState<BreakPoint>('xl')

	useEffect(() => {
		// 获取响应式断点
		const newBreakPoint = gridRef.current?.breakPoint
		if (newBreakPoint !== breakPoint) {
			setBreakPoint(newBreakPoint || 'xl')
		}
	})

	// 获取响应式设置
	const getResponsive = (item: ColumnProp) => {
		return {
			span: item.search?.span,
			offset: item.search?.offset ?? 0,
			xs: item.search?.xs,
			sm: item.search?.sm,
			md: item.search?.md,
			lg: item.search?.lg,
			xl: item.search?.xl,
		}
	}

	// props.columns.slice(0,2)
	const column = props.columns.slice(0, 15)

	// 判断是否显示 展开/合并 按钮
	const showCollapse = useMemo(() => {
		let show = false
		column?.reduce((prev: any, current: any) => {
			prev += (current.search![breakPoint]?.span ?? current.search?.span ?? 1) + (current.search![breakPoint]?.offset ?? current.search?.offset ?? 0)
			if (typeof props.searchCol !== 'number') {
				if (prev >= props.searchCol[breakPoint]) show = true
			} else {
				if (prev >= props.searchCol) show = true
			}
			return prev
		}, 0)
		return show
	}, [props.columns])

	return (
		column.length > 0 && (
			<div>
				<Form>
					<Grid collapsed gap={[20, 10]} cols={props.searchCol}>
						{column?.map((item: ColumnProp, index: number) => {
							const obj = getResponsive(item)
							return (
								<GridItem {...obj} className="bg-slate-300" index={`${index}`}>
									123
								</GridItem>
							)
						})}
						<GridItem suffix index="">
							<Space size="small">
								<Button icon={<SearchOutlined />} type="primary" onClick={() => props.search({})}>
									搜索
								</Button>
								<Button icon={<ReloadOutlined />} type="default" onClick={() => props.reset({})}>
									重置
								</Button>
								{showCollapse && (
									<Button
										className="inline-flex items-center"
										type="link"
										onClick={() => {
											setCollapsed(!collapsed)
										}}>
										{collapsed ? '展开' : '合并'}
										<Icon className="" name={collapsed ? 'DownOutlined' : 'UpOutlined'} />
									</Button>
								)}
							</Space>
						</GridItem>
					</Grid>
				</Form>
			</div>
		)
	)
}
