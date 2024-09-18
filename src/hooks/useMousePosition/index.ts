import React, { useEffect, useState } from 'react'

export default function useMousePosition() {
	const [x, setX] = useState(0)
	const [y, setY] = useState(0)

	useEffect(() => {
		const updateMove = () => {
			window.addEventListener('mousemove', e => {
				setX(e.clientX)
				setY(e.clientY)
			})
		}
		window.addEventListener('mousemove', updateMove)
		return () => {
			window.removeEventListener('mousemove', updateMove)
		}
	}, [])

	return { x, y }
}
