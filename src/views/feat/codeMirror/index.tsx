import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { Alert, Card, Divider, Typography } from 'antd'
import { tempJsx } from './tempJsx'
import { tempJava } from './tempJava'
import { asyncComponent } from '@/assets/dangerouslySetInnerHTML/knowledge'

function App() {
	const [jsxValue, setJsx] = React.useState(tempJsx)
	const [javaValue, setJava] = React.useState(tempJava)
	const onChangeJsx = React.useCallback((val: React.SetStateAction<string>, viewUpdate: any) => {
		console.log('val:', val)
		setJsx(val)
	}, [])
	const onChangeJava = React.useCallback((val: React.SetStateAction<string>, viewUpdate: any) => {
		console.log('val:', val)
		setJava(val)
	}, [])
	return (
		<Card className="px-12">
			<Alert message="React CodeMirror 🌈" type="info" showIcon className="mb20" />
			<Divider />
			<Typography.Title level={5} className="mb20">
				jsx
			</Typography.Title>
			<CodeMirror value={jsxValue} height="300px" extensions={[javascript({ jsx: true })]} onChange={onChangeJsx} />
			<Divider />
			<Typography.Title level={5} className="mb20">
				java
			</Typography.Title>
			<CodeMirror value={javaValue} height="300px" extensions={[java()]} onChange={onChangeJava} />
			<Divider />
			<Typography.Title level={5} className="mb20">
				dangerouslySetInnerHTML
			</Typography.Title>
			<div className="fmt" dangerouslySetInnerHTML={{ __html: asyncComponent }}></div>
		</Card>
	)
}
export default App
