/* eslint-disable react/display-name */
import { Card } from "antd";

export default () => {
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
