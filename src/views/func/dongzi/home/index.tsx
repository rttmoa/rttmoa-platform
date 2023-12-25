import React from "react";
import { Row, Col, Card, Timeline, Progress } from "antd";
import "./index.less";

// 人数、收藏、邮件、图片 - 卡片组件
const Panel = () => {
  return (
    <Row>
      <Col md={6} className="gutter-row">
        <Card bordered={false}>
          <div className="box">
            <div>{/* <Icon /> */}</div>
            <div>
              <span>人数</span>
              <h2>1423</h2>
            </div>
          </div>
        </Card>
      </Col>
      <Col md={6} className="gutter-row">
        <Card bordered={false}>
          <div className="box">
            <div>{/* <Icon /> */}</div>
            <div>
              <span>收藏</span>
              <h2>3467</h2>
            </div>
          </div>
        </Card>
      </Col>
      <Col md={6} className="gutter-row">
        <Card bordered={false}>
          <div className="box">
            <div>{/* <Icon /> */}</div>
            <div>
              <span>邮件</span>
              <h2>2352</h2>
            </div>
          </div>
        </Card>
      </Col>
      <Col md={6} className="gutter-row">
        <Card bordered={false}>
          <div className="box">
            <div>{/* <Icon /> */}</div>
            <div>
              <span>图片</span>
              <h2>4845</h2>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
const Todo = () => {
  return <div>123</div>;
};
const Info = () => {
  return (
    <div className="info_wrapper">
      <div className="info_header">
        <img src="" alt="" />
      </div>
      <div className="info_body">
        <div className="info_title">
          <div className="info_avatar" bg-cover-all></div>
          <div className="info_name">东子</div>
        </div>
      </div>
      <ul>
        <li>
          <span>JavaScript</span>
          <Progress percent={50} />
        </li>
        <li>
          <span>CSS</span>
          <Progress percent={40} />
        </li>
        <li>
          <span>Vue</span>
          <Progress percent={30} />
        </li>
        <li>
          <span>Webpacl</span>
          <Progress percent={20} />
        </li>
        <li>
          <span>React</span>
          <Progress percent={10} />
        </li>
        <li>
          <span>Nodejs</span>
          <Progress percent={1} />
        </li>
      </ul>
    </div>
  );
};
const Steps = () => {
  const list = [
    { desc: "登陆验证- 2018/3", color: "green" },
    { desc: "路由监控- 2018/4", color: "green" },
    { desc: "版本迭代- 2018/5", color: "red" },
    { desc: "版本迭代- 2018/6", color: "blue" },
    { desc: "版本迭代- 2018/7", color: "yellow" },
    { desc: "版本迭代- 2018/8", color: "blue" }
  ];
  const Item = Timeline.Item;
  return (
    <div className="home-task">
      <small>10个已经完成，2个待完成，1个正在执行中</small>
      <Timeline>
        {list.map((item, index) => {
          return (
            <Item key={index} color={item.color}>
              {item.desc}
            </Item>
          );
        })}
      </Timeline>
    </div>
  );
};
const Home = () => {
  return (
    <div className="home_wrapper">
      <Panel />
      <Row className="home_body">
        <Col md={9} className="gutter-row">
          <Card bordered={false}>
            <Steps />
          </Card>
        </Col>
        <Col md={9} className="gutter-row">
          <Card bordered={false}>
            <Todo />
          </Card>
        </Col>
        <Col md={6} className="gutter-row">
          <Card bordered={false}>
            <Info />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
