import { useState, useEffect } from 'react';

/**
 * 根据屏幕宽度自动计算 FormItem span
 */
export const useSearchSpan = () => {
	const [searchSpan, setSearchSpan] = useState(6); // 默认值

	useEffect(() => {
		const updateSpan = () => {
			const width = window.innerWidth;

			if (width >= 1600) {
				setSearchSpan(4);
			} else if (width >= 1200) {
				setSearchSpan(6);
			} else if (width >= 768) {
				setSearchSpan(8);
			} else {
				setSearchSpan(12);
			}
		};

		updateSpan(); // 初始化执行
		window.addEventListener('resize', updateSpan);

		return () => window.removeEventListener('resize', updateSpan);
	}, []);

	return searchSpan;
};
