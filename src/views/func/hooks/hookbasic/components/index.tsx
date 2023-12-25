import { Card } from "antd";
import { WaterMark } from "./WaterMark";
import UseState from "./UseState";
import UseEffect from "./UseEffect";
import UseMemo from "./UseMemo";
import UseRef from "./UseRef";
import UseContext from "./UseContext";
import UseReducer from "./UseReducer";

const Intro = () => {
  return (
    <div>
      <Card title="介绍Hooks" bordered={false} style={{ width: 300 }}>
        <p>
          <b>UseState</b>
        </p>
        <p>
          <b>UseEffect</b>
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
  { label: "Hooks", key: "1", children: <Intro /> },
  { label: "UseState", key: "2", children: <UseState /> },
  { label: "UseEffect", key: "3", children: <UseEffect /> },
  { label: "UseMemo", key: "4", children: <UseMemo /> },
  { label: "UseRef", key: "5", children: <UseRef /> },
  { label: "UseContext", key: "6", children: <UseContext /> },
  { label: "UseReducer", key: "7", children: <UseReducer /> }
];
export { Item, WaterMark };
