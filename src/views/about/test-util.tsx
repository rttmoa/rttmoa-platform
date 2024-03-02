import { changeToChinese } from "@/utils/common/Others";
import { clipboardObj, connectInfo, getGeolocation, mediaDevicesObj, navigatorAttr, queryPermissions } from "@/utils/common/navigator";
import { changeCase, checkPwd, trim } from "@/utils/common/string";
import React from "react";
import { useState, useEffect } from "react";

export default () => {
	function getStorageValue(key: any, defaultValue: any) {
		if (typeof window !== "undefined") {
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

	const [value, setValue] = useLocalStorage("zs", 33);
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

	return null;
};
