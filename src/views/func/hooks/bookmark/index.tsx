import "./index.less";
import React from "react";
import { Tabs } from "antd";

import Item from "./components"; // 第一个Tab
import Apply1 from "./apply1";
import Apply2 from "./apply2";

// hooks：
// 	一、不数不知道，React已经有22个hook了
// 	https://mp.weixin.qq.com/s/ez9oeTSdjuOUkj7s8EqZKg

// 	二、搞懂这12个Hooks，保证让你玩转React
// 	https://mp.weixin.qq.com/s/qXqlWjULWRMeEEGLizLojw

// 	三、React Hooks — 👍
// 	https://github.com/streamich/react-use

const Hooks1: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="App">
      <div>
        <Tabs className="tab" defaultActiveKey="1" onChange={onChange} items={Item} />
      </div>
      <div>
        <Tabs className="tab" defaultActiveKey="1" onChange={onChange} items={Apply1} />
      </div>
      <div>
        <Tabs className="tab" defaultActiveKey="1" onChange={onChange} items={Apply2} />
      </div>
    </div>
  );
};

export default Hooks1;
