/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import CachePng from '@/assets/images/cache.png'
import { Alert, Button, Space, Tag } from 'antd'

// ? 错误边界
function ErrorBoundary(props: any) {
	const [error, setError] = useState(false)
	const [errMessage, setErrMessage] = useState<string>('')

	useEffect(() => {
		const handleErrors = (err: any) => {
			// console.log("错误边界捕捉：", err);
			if (err.isTrusted) {
				if (err?.error?.message) {
					const str = err.error.stack.replace(/\n/g, '<br/>')
					setErrMessage(str)
					// setError(true);
				}
				if (['IMG', 'LINK', 'SCRIPT'].includes(err.target.tagName)) {
					setErrMessage(`静态资源加载错误：${err.target.src || err.target.href}`)
					console.log('文件地址：', err.target.baseURI)
				}
			}
		}
		window.addEventListener('error', handleErrors, true)
		return () => {
			window.removeEventListener('error', handleErrors, true)
		}
	}, [])

	if (error) {
		const desc = (
			<div>
				<Tag>错误消息</Tag>
				<span dangerouslySetInnerHTML={{ __html: errMessage }} />
			</div>
		)
		return (
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<div className="mb30" style={{ marginTop: 130 }}>
					<img src={CachePng} alt="ErrorBoundary" style={{ width: 500 }} />
				</div>
				<div style={{ width: 1000, marginBottom: 25 }}>
					<Alert type="error" showIcon message="SomeThing went wrong" description={desc} />
				</div>
				<div>
					<Space size="large">
						<Button
							onClick={() => {
								window.location.reload()
							}}
							size="large">
							重新加载
						</Button>
						<Button
							onClick={() => {
								window.open('/')
								// window.replace("/");
								// window.history.back(-1);
								// window.location.href("/");
							}}
							size="large">
							跳转新界面
						</Button>
					</Space>
				</div>
			</div>
		)
	}
	return props.children
}
export default ErrorBoundary
