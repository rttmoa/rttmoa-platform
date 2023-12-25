import { Card } from "antd";
import Scroll from "./Scroll";
import CropperPro from "./CropperPro";
import InfiniteScroll from "./InfiniteScroll";
// import UseRef from './UseRef'
// import UseContext from "./UseContext"
// import UseReducer from './UseReducer'

const Intro = () => {
  return (
    <div>
      <Card title="介绍Hooks" bordered style={{ width: 300 }}>
        <p>
          <b>防抖&节流</b>
        </p>
        <p>
          <b>Redux</b>
        </p>
        <p>
          <b>UseMemo</b>
        </p>
        <p>
          <b>UseRef</b>
        </p>
        <p>
          <b>UseContext</b>
        </p>
        <p>
          <b>UseReducer</b>
        </p>
      </Card>
    </div>
  );
};
const Item = [
  { label: "Demo", key: "1", children: <Intro /> },
  { label: "防抖&节流", key: "2", children: <Scroll timerId={null} /> },
  { label: "Redux", key: "3", children: "具体可查看 Redux.tsx 文件" },
  { label: "CropperPro", key: "4", children: <CropperPro /> },
  { label: "InfiniteScroll", key: "5", children: <InfiniteScroll /> },
  { label: "OthersDemo", key: "6", children: "OthersDemo" }
];
export default Item;
