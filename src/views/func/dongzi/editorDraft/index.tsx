import React from "react";
import { Row, Col, Card } from "antd";
import Draft from "@/component/Draft";
// import Draft from "@/component/dr";
// import draftToHtml from "draftjs-to-html";
// import draftToMarkdown from "draftjs-to-markdown";
import "./index.less";

const DraftView = () => {
  return (
    <div className="draft_wrapper">
      <Row gutter={16}>
        <Col span={24}>
          <div className="draft-box">
            <Card title="富文本编辑器">
              <Draft />
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
    </div>
  );
};
export default DraftView;
