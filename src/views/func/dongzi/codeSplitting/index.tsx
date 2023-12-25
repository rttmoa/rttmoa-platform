import React from "react";
import { Row, Col, Card } from "antd";
import { asyncComponent } from "@/assets/markdown/knowledge";

export default () => (
  <div>
    <Row className="gutter-row">
      <Col md={24} className="gutter-col">
        <Card title="组件按需加载（Code Splitting）">
          <div className="fmt" dangerouslySetInnerHTML={{ __html: asyncComponent }}></div>
        </Card>
      </Col>
    </Row>
  </div>
);
