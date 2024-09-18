/* eslint-disable prettier/prettier */
import { TabsState, TabsListProp } from '@/redux/interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUrlWithParams } from '@/utils'

const tabsState: TabsState = {
	tabsList: [], // ? 选项卡列表
}

const tabsSlice = createSlice({
	name: 'hooks-tabs',
	initialState: tabsState,
	reducers: {
		// ? -----> 设置 tab
		setTabsList(state, { payload }: PayloadAction<TabsState['tabsList']>) {
			// console.log(payload);
			state.tabsList = payload
		},
		// ? -----> 添加 tab
		addTab(state, { payload }: PayloadAction<TabsListProp>) {
			// console.log("STATE", JSON.parse(JSON.stringify(state)));
			if (state.tabsList.every(item => item.path !== payload.path)) {
				state.tabsList.push(payload)
			}
		},
		// ? -----> 关闭当前 tab
		removeTab(state, { payload }: PayloadAction<{ path: string; isCurrent: boolean }>) {
			if (!state.tabsList.find(item => item.path === payload.path)?.closable) return
			if (payload.isCurrent) {
				state.tabsList.forEach((item, index) => {
					if (item.path !== payload.path) return
					const nextTab = state.tabsList[index + 1] || state.tabsList[index - 1]
					if (!nextTab) return
					window.$navigate(nextTab.path)
				})
			}
			state.tabsList = state.tabsList.filter(item => item.path !== payload.path)
		},
		// ? -----> 关闭左侧/右侧 tab
		closeTabsOnSide(state, { payload }: PayloadAction<{ path: string; type: 'left' | 'right' }>) {
			const currentIndex = state.tabsList.findIndex(item => item.path === payload.path)
			if (currentIndex !== -1) {
				const range = payload.type === 'left' ? [0, currentIndex] : [currentIndex + 1, state.tabsList.length]
				state.tabsList = state.tabsList.filter((item, index) => {
					return index < range[0] || index >= range[1] || !item.closable
				})
			}
		},
		// ? -----> 关闭其他/所有 tab
		closeMultipleTab(state, { payload }: PayloadAction<{ path?: string }>) {
			state.tabsList = state.tabsList.filter(item => {
				return item.path === payload.path || !item.closable // 关闭其他，除当前外，首页不能关闭
			})
		},
		// ? -----> 设置 tab 标题
		setTabTitle(state, { payload }: PayloadAction<string>) {
			state.tabsList = state.tabsList.map(item => {
				if (item.path == getUrlWithParams()) {
					// 标签栏设置标题； item.path=地址栏path (#/feat/tabs)
					return { ...item, title: payload }
				}
				return item
			})
		},
	},
})

export const { setTabsList, addTab, removeTab, closeMultipleTab, closeTabsOnSide, setTabTitle } = tabsSlice.actions
export default tabsSlice.reducer
