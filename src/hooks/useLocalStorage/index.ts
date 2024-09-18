import { useState, useEffect } from 'react'

function getStorageValue(key: string, defaultValue: any) {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem(key)
		return saved !== null ? JSON.parse(saved) : defaultValue
	}
}

// ? useLocalStorage
const useLocalStorage = (key: string, defaultValue: any) => {
	const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}

export default useLocalStorage

// const [value, setValue] = useLocalStorage("userInfo", {userName: "Meeting", sex: "男"})
