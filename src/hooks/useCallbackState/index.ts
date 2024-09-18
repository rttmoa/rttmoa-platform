import React, { useEffect, useRef, useState } from 'react'

export default function useCallbackState(initialValue: any) {
	const [state, _setState] = useState(initialValue)
	const callbackQueue = useRef<any>([])

	useEffect(() => {
		callbackQueue.current.forEach((cb: any) => cb(state))
		callbackQueue.current = []
	}, [state])

	const setState = (newValue: any, callback: any) => {
		_setState(newValue)
		if (callback && typeof callback === 'function') {
			callbackQueue.current.push(callback)
		}
	}

	return [state, setState]
}

// setState('HHH', () => {
// ...
// })
