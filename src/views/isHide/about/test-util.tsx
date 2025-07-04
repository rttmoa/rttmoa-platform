import { changeToChinese } from '@/utils/common/Others';
import { clipboardObj, connectInfo, getGeolocation, mediaDevicesObj, navigatorAttr, queryPermissions } from '@/utils/common/navigator';
import { changeCase, checkPwd, trim } from '@/utils/common/string';
import { decimals } from '@/utils/decimals';
import React from 'react';
import { useState, useEffect } from 'react';

export default () => {
	function getStorageValue(key: any, defaultValue: any) {
		if (typeof window !== 'undefined') {
			return defaultValue;
		}
	}

	const useLocalStorage = (key: any, defaultValue: any) => {
		const [value, setValue] = useState(() => getStorageValue(key, defaultValue));

		useEffect(() => {
			// localStorage.setItem(key, JSON.stringify(value));
		}, [key, value]);

		return [value, setValue];
	};

	const [value, setValue] = useLocalStorage('zs', 33);
	// console.log(value);

	const onChange = () => {
		setValue((value: number) => value + 1);
	};

	// console.log(checkPwd("xxAbc123."));
	console.log(123);

	// ! 测试 navigator 属性方法
	// navigatorAttr()
	// console.log(connectInfo());
	// console.log(getGeolocation());
	// queryPermissions()
	// console.log(mediaDevicesObj.getMediaDevices().then(res => console.log(res)));
	// console.log(mediaDevicesObj.startCapture({video:true, audio:true}));
	// console.log(mediaDevicesObj.startMediaInput({ video: true, audio: true }));

	// console.log(clipboardObj.getClipboardText());
	// console.log(clipboardObj.getClipboardContents());

	// ! 测试 JS中浮点数精度问题
	// console.log("JS中浮点数精度问题");
	// let com = decimals.add(0.1, 0.2, 0)!
	// console.log(com >> 0.2); // 0.3
	// 加法
	// console.log(0.1 + 0.2); // 0.30000000000000004
	// console.log(0.1 + 0.2222); // 0.32220000000000004
	// console.log(decimals.add(0.1, 0.2, 0)); // 0.3
	// console.log(decimals.add(0.1, 0.2222, 2)); // 0.3222
	// 减法
	// console.log(1.5 - 1.2); // 0.30000000000000004
	// console.log(0.03 - 0.02); // 0.009999999999999998
	// console.log(decimals.subtract(1.5, 1.2, 0)); // 0.3
	// console.log(decimals.subtract(0.03, 0.02, 0)); // 0.01
	// 乘法
	// console.log(19.9 * 100); // 1989.9999999999998
	// console.log(0.8 * 3); // 2.4000000000000004
	// console.log(decimals.multiply(19.9, 100, 0)); // 1990
	// console.log(decimals.multiply(0.8, 3, 0)); // 2.4
	// 除法
	// console.log(0.69 / 10); // 0.06899999999999999
	// console.log(decimals.divide(0.69, 10, 0)); // 0.069

	return null;
};
