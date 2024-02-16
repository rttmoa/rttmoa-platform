import { useEffect, useState } from "react";

function getOnlineStatus() {
	return typeof navigator !== "undefined" && typeof navigator.onLine === "boolean" ? navigator.onLine : true;
}

// * React Hook 获取在线状态
export function useOnlineStatus() {
	const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

	const goOnline = () => setOnlineStatus(true);

	const goOffline = () => setOnlineStatus(false);

	useEffect(() => {
		window.addEventListener("online", goOnline);
		window.addEventListener("offline", goOffline);

		return () => {
			window.removeEventListener("online", goOnline);
			window.removeEventListener("offline", goOffline);
		};
	}, []);

	return onlineStatus;
}

// function MyComponent() {
//   const onlineStatus = useOnlineStatus();
//   return (
//     <div>
//       <h1>You are {onlineStatus ? "Online" : "Offline"}</h1>
//     </div>
//   );
// }
