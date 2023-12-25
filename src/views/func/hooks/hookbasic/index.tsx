import "./index.less";
import { Tabs, Radio, Card, Typography, Space } from "antd";
import { Item, WaterMark } from "./components";

/** #### baby张的React Hook, 10种hook Demo实例  */
// Github：	https://github.com/babybrotherzb
// 掘金：		https://juejin.cn/post/6844903989696282631
// CSDN：		https://blog.csdn.net/weixin_43648947
const Hooks1: React.FC = () => {
  // WaterMark({ content: "Screen" })

  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div className="App">
      <Tabs defaultActiveKey="1" onChange={onChange} items={Item} />
    </div>
  );
};

export default Hooks1;
