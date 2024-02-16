import { Card, Col, Row } from "antd";
import MyEditor from "./component";

export default function Draft() {
	return (
		<div>
			<Card>
				<Row gutter={16}>
					<Col span={24}>
						<Card>
							<MyEditor />
						</Card>
					</Col>
					<Col span={12}>
						<Card title="同步转换Markdown" bordered></Card>
					</Col>
					<Col span={12}>
						<Card title="同步转换Html" bordered></Card>
					</Col>
				</Row>
			</Card>
		</div>
	);
}
