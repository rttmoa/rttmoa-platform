import React from "react";
import { Card, Col, Row } from "antd";
import Markdown from "../../../../component/Markdown";
import "./index.less";

const editorMarkdown = () => {
  return (
    <div className="markdown_wrapper">
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Markdown编辑器">{/* <Markdown props={undefined} value={undefined}></Markdown> */}</Card>
        </Col>
        <Col span={12}>
          <Card title="同步转换Markdown" bordered>
            <pre></pre>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="同步转换HTML" bordered>
            <pre></pre>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default editorMarkdown;
