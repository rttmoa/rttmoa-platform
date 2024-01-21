import { Card } from "antd";
import React from "react";
import Normal from "./component/normal";
import ReactCssModules from "./component/reactCssModules";

export default function CSSModules() {
  return (
    <>
      <Card className="mb30">
        <Normal />
      </Card>
      <Card className="mb30">
        <ReactCssModules />
      </Card>
    </>
  );
}
