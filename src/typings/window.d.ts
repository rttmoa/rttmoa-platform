import { NavigateFunction } from "react-router-dom";
import { NetworkState } from "@/hooks/useNetworkStatus";

// https://wangdoc.com/typescript/declare
// d.ts 仅供 声明类型
declare global {
	interface Navigator {
		msSaveOrOpenBlob: (blob: Blob, fileName: string) => void;
		browserLanguage: string;
		connection: NetworkState;
		mozConnection: NetworkState;
		webkitConnection: NetworkState;
	}
	interface Window {
		$navigate: NavigateFunction;
		EyeDropper: new () => {
			open(options?: { signal: AbortSignal }): Promise<{ sRGBHex: string }>;
		};
	}
}

export {};

// const languageType = Navigator.browserLanguage;
// const navigate = Window.$navigate;
