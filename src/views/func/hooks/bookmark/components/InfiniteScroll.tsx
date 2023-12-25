import { Card, Col, Row } from "antd";
import { Component } from "react";
import List from "./component/InfintiteScroll/List";
import List2 from "./component/InfintiteScroll/List2";

/** #### 无限滚动组件，需要引入List、List1、useInfiniteScroll  */
class InfiniteScroll extends Component {
  render() {
    return (
      <div>
        <Card title="InfiniteScroll" bordered style={{ width: 500, height: 500 }}>
          <Row>
            <Col span={12}>
              <h1>React Hooks Infinite Scroller</h1>
              <h3 className="text-muted">
                An <u>infinite scroll</u> component, built using React and custom React Hooks.
                <br />
                <small>Scroll down to see it in action</small>
              </h3>
            </Col>
            <Col span={12}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.open("https://upmostly.com/tutorials/", "_blank")}
              >
                View Full Tutorial at Upmostly.com
              </button>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <List />
            </Col>
            <Col span={6}>
              <List2 />
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default InfiniteScroll;
