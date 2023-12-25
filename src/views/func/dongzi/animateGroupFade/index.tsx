/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Card, Col, Row, Button } from "antd";
import { AnimateGroupFade } from "@/assets/markdown";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./index.less";

let num = 1;
const animateGroupFade: React.FC = () => {
  const [items, setItems] = useState(["hello", "world", "click", "me"]);

  const handleAdd = () => {
    setItems([...items, `test - ${num++}`]);
  };
  const handleRemove = (i: number) => {
    let newItems = items.slice();
    newItems.splice(i, 1);
    setItems(newItems);
  };
  const Fade = ({ children, ...props }: any) => {
    return (
      <CSSTransition {...props} timeout={1000}>
        {children}
      </CSSTransition>
    );
  };

  return (
    <Row className="gutter-row fmt">
      <Col className="gutter-col" md={8}>
        <Card title="实例展示（添加一行）">
          <TransitionGroup className="todo-list">
            {items.map((item, i) => {
              return (
                <Fade key={item}>
                  <div>
                    {item}
                    <button onClick={() => handleRemove(i)}>&times;</button>
                  </div>
                </Fade>
              );
            })}
          </TransitionGroup>
          <Button type="primary" onClick={handleAdd}>
            Add Item
          </Button>
        </Card>
      </Col>

      <Col className="gutter-col" md={24}>
        <Card title="react-transition-group">
          <div dangerouslySetInnerHTML={{ __html: AnimateGroupFade }}></div>
        </Card>
      </Col>
    </Row>
  );
};

export default animateGroupFade;
