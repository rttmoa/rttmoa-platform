import { useEffect, useState } from "react";

export interface NetworkState {
	// 网络下行速度
	downlink: number;
	downlinkMax: number;
	// 网络类型
	effectiveType: "slow-2g" | "2g" | "3g" | "4g";
	// 估算的往返时间
	rtt: number;
	type: "bluetooth" | "cellular" | "ethernet" | "none" | "wifi" | "wimax" | "other" | "unknown";
	// 打开/请求数据保护模式
	saveData: string;
	// 有值代表网络状态变更
	onchange: any;
}

function getConnection() {
	return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
}

// * 用来获取设备的网络连接信息。
export default function useNetworkStatus(): NetworkState {
	const [connection, updateNetworkConnection] = useState<any>(getConnection());

	useEffect(() => {
		function updateConnectionStatus() {
			updateNetworkConnection(getConnection());
		}
		connection.addEventListener("change", updateConnectionStatus);
		return () => {
			connection.removeEventListener("change", updateConnectionStatus);
		};
	}, [connection]);

	return connection;
}

// function MyComponent() {
//   let connection = useNetworkStatus();
//   return (
//     <div>
//       <div>downlink: {connection.downlink}</div>
//       <div>effectiveType: {connection.effectiveType}</div>
//       <div>rtt: {connection.rtt}</div>
//       <div>saveData: {connection.saveData ? "yes" : "no"}</div>
//     </div>
//   );
// }
