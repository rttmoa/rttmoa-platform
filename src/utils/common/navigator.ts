//navigator 拓宽前端视野  https://blog.csdn.net/qq_38974163/article/details/129713507
/**
 * navigator 9.其他属性/方法
 */
export function navigatorAttr() {
	console.log('--------------------- 分割 ----------------------')
	console.log('navigator对象属性：', navigator)
	console.log('用户代理字符串： \n', navigator.userAgent)
	console.log('浏览器全名： \n', navigator.appName)
	console.log('页面是否启用cookie： \n', navigator.cookieEnabled)
	console.log('设备内存容量，单位为GB： \n', navigator.deviceMemory)
	console.log('当前设备支持的最大同时触摸点数： \n', navigator.maxTouchPoints)
	console.log('浏览器是否联网： \n', navigator.onLine)
	console.log('浏览器是否支持加载PDF文件： \n', navigator.pdfViewerEnabled)
}

//* 1. clipboard（剪切板）
// clipboard属性返回一个可以读写剪切板内容的Clipboard对象。
// 该对象实例有四个方法：
// 		read： 从剪贴板读取数据（比如图片），返回一个Promise对象。
// 		readText： 从操作系统读取文本；返回一个 Promise，在从剪切板中检索到文本后，promise返回剪贴板里面的文本数据；
// 		write： 用于将任意数据写入剪贴板，可以是文本数据，也可以是二进制数据，这是一个异步操作；
// 		writeText： 用于将文本内容写入剪贴板。
// 用途：实现web端剪切、复制、粘贴的功能。
// 兼容性：还不错，大胆用！

//read ? 从剪贴板读取数据（比如图片），返回一个Promise对象
async function getClipboardContents() {
	try {
		const clipboardItems = await navigator.clipboard.read()

		for (const clipboardItem of clipboardItems) {
			for (const type of clipboardItem.types) {
				const blob = await clipboardItem.getType(type)
				// we can now use blob here
				console.log('blob', blob) // Blob {size: 12016, type: 'image/png'}
			}
		}
	} catch (err: any) {
		console.error(err.name, err.message)
	}
}
//readText ? 从操作系统读取文本；返回一个 Promise，在从剪切板中检索到文本后，promise返回剪贴板里面的文本数据
async function getClipboardText() {
	const text = await navigator.clipboard.readText()
	console.log('剪贴板内容：', text)
}
//write ?  用于将任意数据写入剪贴板，可以是文本数据，也可以是二进制数据，这是一个异步操作
async function copyImage() {
	const input: any = document.getElementById('file')
	const blob = new Blob(['sample 2'], { type: 'text/plain' })
	const clipboardItem = new ClipboardItem({
		'text/rt': blob,
		'image/png': input.files[0],
	})
	const response = await navigator.clipboard.write([clipboardItem])
	console.log(response)
}
//writeText ? 用于将文本内容写入剪贴板
async function writeDataToClipboard() {
	const result = await navigator.clipboard.writeText('Hello')
	console.log(result)
}
export const clipboardObj = {
	getClipboardContents,
	getClipboardText, // clipboardObj.getClipboardText()
	copyImage,
	writeDataToClipboard,
}

//* 2. connection（网络连接状态）
//* src/hooks/useNetworkStatus.ts  获取网络连接状态
export const connectInfo = () => {
	console.log('connection', navigator.connection.downlink)
	return navigator.connection
}

//* 3. geolocation（地理位置）
export const getGeolocation = () => {
	navigator.geolocation.getCurrentPosition(
		function (position) {
			console.log(position.coords.latitude, position.coords.longitude) // 纬度,精度： 35.6764225 139.650027
		},
		function (error) {
			console.error(error.message)
		},
		{
			enableHighAccuracy: true,
			timeout: 5000,
		}
	)
}

//* 4. mediaDevices（媒体捕获和流媒体）
// Navigator.mediaDevices 属性返回一个MediaDevices对象，MediaDevices 界面提供对连接的媒体输入设备（如相机和麦克风）以及屏幕共享的访问。
// 从本质上讲，它可以让您访问媒体数据的任何硬件源。
// 该对象提供对连接的媒体输入设备（如相机和麦克风）以及屏幕共享的访问。该对象提供了5个api：
// enumerateDevices()、getDisplayMedia()、getSupportedConstraints()、getUserMedia()、selectAudioOutput()
// 用途：web端屏幕共享，用于webRTC进行实时音视频，例如远程协作、在线会议演示文件、在线课堂等。
// 兼容性：ie不支持

// enumerateDevices() 列举可用的媒体输入和输出设备，例如麦克风、相机、耳机等。返回结果未可用设备信息的数组；
async function getMediaDevices() {
	if (!navigator.mediaDevices?.enumerateDevices) {
		console.log('enumerateDevices() not supported.')
	} else {
		// 列出摄像头和麦克风。
		let mediaDevicesList
		try {
			mediaDevicesList = await navigator.mediaDevices.enumerateDevices()
		} catch (err) {
			console.error(`Error: ${err}`)
		}
		return mediaDevicesList // (3) [InputDeviceInfo, InputDeviceInfo, MediaDeviceInfo]
	}
}
// getDisplayMedia(opitons) 调用后会提示用户选择并授予权限，以将显示内容或其一部分（例如窗口）捕获为MediaStream（媒体内容流），即共享屏幕内容；
// 配置项: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia#examples
async function startCapture(displayMediaOptions: DisplayMediaStreamOptions) {
	let captureStream
	try {
		let defaultOption = { video: { displaySurface: 'browser' }, audio: { suppressLocalAudioPlayback: false } }
		captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions || defaultOption)
	} catch (err) {
		console.error(`Error: ${err}`)
	}
	return captureStream
}
// getUserMedia(options) 方法询问用户是否允许使用媒体输入，开启录制视频/录音
// 说明：options 该参数只有video和audio两个属性，即授予录制视频和录音权限。
// http://localhost:9527 想要 使用您的摄像头 && 使用您的麦克风
async function startMediaInput(displayMediaOptions: MediaStreamConstraints) {
	let stream = null
	try {
		stream = await navigator.mediaDevices.getUserMedia(displayMediaOptions)
		return stream
		/* use the stream */
	} catch (err) {
		/* handle the error */
	}
}
//selectAudioOutput() 选择音频输出设备
function selectAudioOutput(displayMediaOptions: any) {
	// if (!navigator.mediaDevices?.selectAudioOutput) {
	// 	alert("selectAudioOutput() not supported.");
	// 	return;
	// }
	// 显示提示并记录所选设备或错误
	// navigator.mediaDevices.selectAudioOutput().then(device => {
	// 		console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
	// 	})
	// 	.catch(err => {
	// 		console.error(`${err.name}: ${err.message}`);
	// 	});
}
export const mediaDevicesObj = {
	getMediaDevices, // mediaDevicesObj.getMediaDevices().then(res => console.log(res))
	startCapture, // mediaDevicesObj.startCapture({ video:true, audio:true })
	startMediaInput, // mediaDevicesObj.startMediaInput({ video: true, audio: true })
	selectAudioOutput,
}

//* 5. permissions（权限管理）
// query() 用于查询指定权限的权限状态，例如：navigator.permissions.query({ name: "camera" })
// 可查询的权限有：camera相机，clipboard-read剪切板读取，clipboard-write剪切板写入、geolocation地理位置、microphone麦克风、notifications通知、persistent-storage持久化存储、gyroscope陀螺仪，push推送通知
export const queryPermissions = () => {
	// Array of permissions
	const permissions: any = [
		'accelerometer',
		'accessibility-events',
		'ambient-light-sensor',
		'background-sync',
		'camera',
		'clipboard-read',
		'clipboard-write',
		'geolocation',
		'gyroscope',
		'local-fonts',
		'magnetometer',
		'microphone',
		'midi',
		'notifications',
		'payment-handler',
		'persistent-storage',
		'push',
		'screen-wake-lock',
		'storage-access',
		'top-level-storage-access',
		'window-management',
	]

	processPermissions()

	// 遍历权限并记录结果
	async function processPermissions() {
		for (const permission of permissions) {
			const result = await getPermission(permission)
			console.log('查询权限结果：', result)
		}
	}

	// 在 try...catch 块中查询单个权限并返回结果
	async function getPermission(permission: PermissionName) {
		try {
			const result = await navigator.permissions.query({ name: permission })
			return `${permission}: ${result.state}`
		} catch (error) {
			return `${permission} (not supported)`
		}
	}
}

//* 6. WakeLock（屏幕唤醒）
// WakeLock在开启屏幕自动息屏时，浏览器会尝试阻止设备屏幕变暗、完全关闭或显示屏幕保护程序
// navigator.wakeLock 保持屏幕唤醒状态：
// 兼容性：兼容性一般，慎用！

//* 7. userActivation（用户是否交互检查）
// userActivation 返回一个UserActivation对象，该对象包含有关当前窗口的用户激活状态的信息。
// 		该对象有两个属性：isActive，hasBeenActive
// 用途：常用来检查最近是否执行了用户手势或检查是否曾经执行过用户手势
// 兼容性：IE不支持，safari 16.4版本以上才支持

//* 8. serial（串口通信，连接计算机的外围设备）
