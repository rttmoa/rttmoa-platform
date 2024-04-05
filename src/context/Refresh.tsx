/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react'

interface RefreshContextType {
	count: number
	outletShow: boolean
	updateOutletShow: (val: boolean) => void
	setCount: (val: number) => void
}
export const RefreshContext = createContext<RefreshContextType>({
	count: 0,
	outletShow: true,
	updateOutletShow: () => {},
	setCount: () => {},
})

// 参考React createContext 与 useContext 的基本使用；https://developer.aliyun.com/article/1293831
// 参考React.createContext官网的解读；https://blog.51cto.com/u_15955675/6040948
export const RefreshProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [outletShow, setOutletShow] = useState(true)
	const [count, setCount] = useState(1)

	const updateOutletShow = (val: boolean) => {
		console.log('TabsView中 刷新操作，调用全局函数 RefreshContext')
		setOutletShow(val)
	}
	const contextValue = { count, outletShow, updateOutletShow, setCount }
	return <RefreshContext.Provider value={contextValue}>{children}</RefreshContext.Provider>
}

// ? 使用：
// import { RefreshContext } from "@/context/Refresh";
// const { updateOutletShow } = useContext(RefreshContext);
// <button onClick={updateOutletShow(false);setTimeout(() => updateOutletShow(true));}>点击</button>
