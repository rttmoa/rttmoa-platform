import React from "react";
import { Card, Col, Row } from "antd";
import GitHub from "@/component/Github";
import IconFont from "@/components/SvgIcon";
import "./index.less";

export default () => {
  return (
    <div className="github_wrapper">
      <Row className="gutter-row">
        <Col md={24} className="gutter-col">
          <Card title="Github图标 实例展示（封装组件）">
            <GitHub link="http://dzblog.cn" size="100"></GitHub>
            <GitHub link="http://dzblog.cn" className="yellow"></GitHub>
            <GitHub link="http://dzblog.cn" className="pink"></GitHub>
            <GitHub link="http://dzblog.cn" style={{ fill: "blue", color: "#fff" }}></GitHub>
          </Card>
        </Col>
        <Col md={24} className="gutter-col">
          <Card title="iconFont阿里巴巴矢量图 实例展示 (字体在 /assets/iconfont 中)">
            <div className="icon_svg_wrapper">
              <IconFont name="fangda" color="red"></IconFont>
              <i className="iconfont icon-zhuti" style={{ color: "#178fff" }}></i>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
