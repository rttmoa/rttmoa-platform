import React, { useEffect, useState } from 'react'
import { Icon } from '../Icon'
import './index.less'

export interface selectdProps {
	[key: string]: string | string[]
}
interface OptionsProps {
	value: string | number
	label: string
	icon?: string
}
interface SelectDataProps {
	title: string // 列表标题
	key: string // 当前筛选项 key 值
	multiple?: boolean // 是否为多选
	options: OptionsProps[] // 筛选数据
}
interface SelectFilterProps {
	data: SelectDataProps[] // 选择的列表数据
	defaultValue: selectdProps // 默认值
	selectChange: (value: selectdProps) => void
}

export default function SelectFilter({ data, defaultValue, selectChange }: SelectFilterProps) {
	// console.log(data, defaultValue, selectChange);
	// console.log("object", defaultValue); // {type: ['1', '3'], state: '1'}

	const [selectd, setSelectd] = useState<any>({}) // {type: ['1', '3'], state: '1'}

	useEffect(() => {
		data.forEach(item => {
			if (item.multiple) setSelectd((state: selectdProps) => ({ ...state, [item.key]: defaultValue[item.key] || [''] }))
			else setSelectd((state: selectdProps) => ({ ...state, [item.key]: defaultValue[item.key] || '' }))
		})
	}, [])

	const onclickItem = (item: SelectDataProps, option: OptionsProps) => {
		if (!item.multiple) {
			// 是单选
			if (selectd[item.key] !== option.value) setSelectd((state: selectdProps) => ({ ...state, [item.key]: option.value }))
		} else {
			// 是多选
			// 如果选中的是第一个值，则直接设置
			if (item.options[0].value === option.value) {
				setSelectd((state: selectdProps) => ({ ...state, [item.key]: [option.value] }))
			}
			// 如果选择的值已经选中了，则删除选中的值
			if (selectd[item.key].includes(option.value)) {
				let currentIndex = selectd[item.key].findIndex((s: any) => s === option.value) // selectd中的index位置
				setSelectd((state: selectdProps) => {
					return { ...state, [item.key]: selectd[item.key].filter((value: any) => value !== selectd[item.key].splice(currentIndex, 1)) }
				})
				// 当全部删光时，把第第一个值选中
				// if (selectd.value[item.key].length == 0) selectd.value[item.key] = [item.options[0].value];
			} else {
				// 未选中点击值的时候，追加选中值
				// console.log('push', selectd[item.key].push(option.value));
				setSelectd((state: selectdProps) => ({ ...state, [item.key]: [...state[item.key], option.value] }))
				// 单选中全部并且点击到了未选中的值，把第一个值删除掉
				if (selectd[item.key].includes(item.options[0].value)) {
					//
				}
			}
		}
		selectChange && selectChange(selectd)
	}

	return (
		<div className="select-filter">
			{data.map((item: SelectDataProps, index: number) => {
				return (
					<div key={item.key} className="select-filter-item">
						<div className="select-filter-item-title">
							<span>{item.title}：</span>
						</div>
						<div>
							{item.options?.length ? (
								<ul className="select-filter-list">
									{item.options.map((opt: OptionsProps, idx: number) => {
										const Single = opt.value === selectd[item.key] // 单选控制类
										const Multiple = Array.isArray(selectd[item.key]) && selectd[item.key].includes(opt.value) // 多选控制类
										return (
											<li
												className={`${(Single && 'active') || (Multiple && 'active')}`}
												key={opt.value}
												onClick={() => {
													onclickItem(item, opt)
												}}>
												{opt.icon && <Icon name={opt.icon} />}
												<span>{opt.label}</span>
											</li>
										)
									})}
								</ul>
							) : (
								<span className="select-filter-noData">暂无数据</span>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}
