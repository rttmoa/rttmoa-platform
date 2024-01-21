import { Card, Col, Row } from "antd";
import React, { useState } from "react";
import DraftComp from "./component";

export default function Draft() {
  const [content, setContent] = useState("");
  const callback = (data: any) => {
    setContent(data.content);
  };
  return (
    <div>
      <Card>
        <Row gutter={16}>
          <Col span={24}>
            <div className="draft-box">
              <Card title="富文本编辑器">
                <DraftComp callback={callback} />
              </Card>
            </div>
          </Col>
          <Col span={12}>
            <Card title="同步转换MarkDown" bordered={true}>
              {/* <pre style={{ whiteSpace: "pre-wrap" }}>{draftToMarkdown(this.state.content)}</pre> */}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="同步转换HTML" bordered={true}>
              {/* <pre>{draftToHtml(this.state.content)}</pre> */}
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
