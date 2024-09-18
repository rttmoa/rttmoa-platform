import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from '@/redux/interface'
import { getFlatMenuList, getShowMenuList } from '@/utils'

const authState: AuthState = {
	// 菜单权限列表 ==> 接口菜单列表
	authMenuList: [],
	// 菜单权限列表 ==> 过滤菜单列表isHide: true
	showMenuList: [],
	// 菜单权限列表 ==> 扁平化数组
	flatMenuList: [],
	// 按钮权限列表
	authButtonList: {},
}

const authSlice = createSlice({
	name: 'hooks-auth',
	initialState: authState,
	reducers: {
		// ! 设置 按钮权限列表
		setAuthButtonList(state, { payload }: PayloadAction<AuthState['authButtonList']>) {
			state.authButtonList = payload
		},
		// ! 设置 菜单列表
		setAuthMenuList(state, { payload }: PayloadAction<AuthState['authMenuList']>) {
			state.authMenuList = payload
			state.flatMenuList = getFlatMenuList(payload)
			state.showMenuList = getShowMenuList(payload)
		},
	},
})

export const { setAuthButtonList, setAuthMenuList } = authSlice.actions
export default authSlice.reducer
