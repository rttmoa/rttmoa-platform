import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux'
import { configureStore, combineReducers, Middleware, AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist' // todo 持久化
import storage from 'redux-persist/lib/storage'
import reduxThunk from 'redux-thunk'

import global from './modules/global' // ! 设置全局属性：是否黑暗模式，是否色弱模式、侧边栏开关，头部，底部开关
import tabs from './modules/tabs' // ! 存储Tabs、添加Tabs、溢出Tabs、关闭Tabs、关闭其他Tabs、设置Tabs标题
import auth from './modules/auth' // ! 菜单权限、按钮权限
import user from './modules/user' // ! 用户Token、用户个人信息
// import todos from "../views/func/hooks/todos/store/reducer";
const reducer = combineReducers({ global: global, tabs, auth, user })

// redux persist
const persistConfig = {
	key: 'redux-state',
	storage: storage,
	blacklist: ['auth'],
}
const persistReducerConfig = persistReducer(persistConfig, reducer)

// redux middleWares(self configuration)
const middleWares: Middleware[] = [reduxThunk]

// store
export const store = configureStore({
	reducer: persistReducerConfig,
	middleware: middleWares,
	devTools: true,
})

// create persist store
export const persistor = persistStore(store)

// ? redux hooks;  TS 配置
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch = () => useReduxDispatch<AppDispatch>()

// ! main.tsx
// <Provider store={store}>
//   <PersisitGate persistor={persistor}>
//     <App />
//   </PersisitGate>
// </Provider>
