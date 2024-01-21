import { Card, Col, Row } from "antd";
import React from "react";
import Line from "./component/line";
import Bar from "./component/bar";
import Radar from "./component/radar";
import Circle from "./component/circle";
import TreeMap from "./component/treemap";

export default function Recharts() {
  return (
    <div>
      <Row gutter={16} className="mb30">
        <Col md={24} className="gutter-row">
          <Card title="折线图">
            <Line />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mb30">
        <Col md={24} className="gutter-row">
          <Card title="树状图">
            <Bar />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mb30">
        <Col md={12} className="gutter-row">
          <Card title="圆形图">
            <Circle />
          </Card>
        </Col>
        <Col md={12} className="gutter-row">
          <Card title="雷达图">
            <Radar />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} className="mb30">
        <Col md={24} className="gutter-row">
          <Card title="树形图">
            <TreeMap />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
