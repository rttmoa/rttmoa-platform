import { Card, Col, Row } from "antd";
import React, { useState } from "react";
import MarkdownComp from "./component";

export default function Markdown() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const callback = (data: any) => {
    setMarkdown(data.markdown);
    setHtml(data.html);
  };
  return (
    <div>
      <Card>
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Markdown编辑器">
              <MarkdownComp value="**Markdown**" callback={callback} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="同步转换Markdown">
              <pre>{markdown}</pre>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="同步转换HTML">
              <pre>{html}</pre>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
