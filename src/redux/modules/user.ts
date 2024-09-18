import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '@/redux/interface'

const userState: UserState = {
	token: '',
	userInfo: { name: '艾利斯' },
}

const userSlice = createSlice({
	name: 'hooks-user',
	initialState: userState,
	reducers: {
		setToken(state, { payload }: PayloadAction<UserState['token']>) {
			state.token = payload
		},
		setUserInfo(state, { payload }: PayloadAction<UserState['userInfo']>) {
			state.userInfo = payload
		},
	},
})

export const { setToken, setUserInfo } = userSlice.actions
export default userSlice.reducer
