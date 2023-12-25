import { Card, Col, Descriptions, Row, Typography } from "antd";
import { RootState, useSelector } from "@/redux";
import { option1Fn, option2Fn, option3Fn, option4Fn, option5Fn, option6Fn, option7Fn } from "./config";
import ECharts from "@/components/Echarts";
import "./index.less";

const { Link } = Typography;

// todo
// todo <Descriptions /> https://ant.design/components/descriptions-cn
// todo <Row /> https://ant.design/components/grid-cn
// todo 响应式栅格 <Col />
// todo <Col /> https://ant.design/components/grid-cn#col
const EChartsPage: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.global.isDark);

  return (
    <Row gutter={[12, 10]}>
      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
        <Card hoverable title="柱状图">
          <ECharts height={284} option={option1Fn(isDark)} />
        </Card>
      </Col>
      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
        <Card hoverable title="折线图">
          <ECharts height={284} option={option2Fn(isDark)} />
        </Card>
      </Col>
      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
        <Card hoverable title="散点图">
          <ECharts height={284} option={option3Fn(isDark)} />
        </Card>
      </Col>
      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
        <Card hoverable title="雷达图">
          <ECharts height={284} option={option4Fn()} />
        </Card>
      </Col>
      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
        <Card hoverable title="饼状图">
          <ECharts height={284} option={option5Fn()} />
        </Card>
      </Col>
      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
        <Card hoverable title="仪表图">
          <ECharts height={284} option={option6Fn()} />
        </Card>
      </Col>
      <Col xl={8} lg={12} md={12} sm={24} xs={24}>
        <Card hoverable title="仪表图">
          <ECharts height={284} option={option7Fn()} />
        </Card>
      </Col>

      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
        <Card>
          <Descriptions title="配置项 📚" bordered column={1} labelStyle={{ width: "200px" }}>
            <Descriptions.Item label="option">
              ECharts option：
              <Link href="https://echarts.apache.org/zh/option.html#title" target="_blank">
                https://echarts.apache.org/zh/option.html#title
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="isResize"> ECharts 响应式：默认为 true </Descriptions.Item>
            <Descriptions.Item label="width"> ECharts 宽度：默认为 100% </Descriptions.Item>
            <Descriptions.Item label="height"> ECharts 高度：默认为 100% </Descriptions.Item>
            <Descriptions.Item label="onClick"> ECharts 点击事件 </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};

export default EChartsPage;
