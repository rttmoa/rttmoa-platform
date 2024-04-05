import { Alert, Card, Col, Row } from 'antd'
import MyEditor from './component'
import Link from 'antd/lib/typography/Link'

export default function Draft() {
	const message = (
		<span>
			富文本使用 wangEditor 5 插件完成，官方文档请查看 ：
			<Link href="https://www.wangeditor.com/" target="_blank">
				wangEditor 5
			</Link>
		</span>
	)
	return (
		<div>
			<Card>
				<Alert className="mb-4" message={message} type="info" showIcon />
				<MyEditor />
			</Card>
		</div>
	)
}
