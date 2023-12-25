/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Card, Col, Row, Button } from "antd";
import { AnimateFadeHtml } from "@/assets/markdown";
import { Transition } from "react-transition-group";

const animateFade: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);
  const duration = 500;
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    padding: 20,
    display: "inline-block",
    backgroundColor: "#8787d8",
    borderRadius: 15
  };
  const transitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 }
  };
  const AnimateComponent = ({ in: inPro }: any) => {
    return (
      <Transition in={inPro} timeout={duration}>
        {(status: any) => {
          let opac = 0;
          if (status == "entering") {
            opac = 0;
          }
          if (status == "entered") {
            opac = 1;
          }
          // const opac = transitionStyles[status];
          return <div style={{ ...defaultStyle, opacity: opac }}>Fade动画</div>;
        }}
      </Transition>
    );
  };
  const handleToggle = () => {
    setShow(!show);
  };
  // console.log(show);
  return (
    <Row className="gutter-row fmt">
      <Col className="gutter-col" md={24}>
        <Card title="实例展示">
          <Button type="primary" onClick={handleToggle}>
            toggle
          </Button>
          <br />
          <AnimateComponent in={show} />
        </Card>
      </Col>

      <Col className="gutter-col" md={24}>
        <Card title="react-transition-group">
          <div dangerouslySetInnerHTML={{ __html: AnimateFadeHtml }}></div>
        </Card>
      </Col>
    </Row>
  );
};

export default animateFade;
