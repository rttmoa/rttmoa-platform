import { useRef, useEffect } from 'react';

// * 【事件监听】：resize、movemose、scroll、keydown、load 等等
const useEventListener = (eventName: string, handler: Function) => {
	const eventRef = useRef<any>(undefined);

	useEffect(() => {
		eventRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const isClient = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
		if (!isClient) return;
		if (!window.addEventListener) return;

		const eventListener = (event: any) => eventRef.current(event);
		window.addEventListener(eventName, eventListener);
		return () => {
			window.removeEventListener(eventName, eventListener);
		};
	}, [eventName]);
};
export default useEventListener;
