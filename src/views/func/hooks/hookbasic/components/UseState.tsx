import React, { useState } from "react";
import { Card } from "antd";

// 箭头函数的函数写法,改变状态
const UseState = () => {
  const [hook, setHook] = useState("react hook 是真的好用啊");
  return (
    <header className="UseState-header">
      <Card title="UseState" bordered={false} style={{ width: 300 }}>
        <button onClick={() => setHook("我改变了Hook的值")}>改变Hook值</button>
        <br />
        <br />
        {hook}
      </Card>
    </header>
  );
};

export default UseState;

// 函数式写法,改变状态
// function UseState() { }
// export default UseState
