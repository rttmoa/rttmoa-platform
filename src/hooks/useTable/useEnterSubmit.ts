import { useEffect, useRef } from 'react';

export default function useEnterSubmit(modalIsVisible: boolean, submit: () => void, cooldownMs: number = 2000) {
	const lastTimeRef = useRef(0);
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key !== 'Enter') return;
			e.preventDefault();
			const now = Date.now();
			if (now - lastTimeRef.current < cooldownMs) return;
			lastTimeRef.current = now;
			submit();
		};
		if (modalIsVisible) {
			window.addEventListener('keydown', handleKeyDown);
		} else {
			window.removeEventListener('keydown', handleKeyDown);
		}
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [modalIsVisible, submit, cooldownMs]);
}
