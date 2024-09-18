import React, { useRef } from 'react'

export default function useRefVariable(value: any) {
	const ref = useRef()
	ref.current = value
	return ref
}
