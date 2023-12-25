import { Card } from "antd";
import UseCounter from "./UseCounter";
import UseAsync from "./UseAsync";
import UseScroll from "./UseScroll";
import BlogList from "./BlogList";

// 介绍：
// 1.抽离业务逻辑层；

// 2.封装通用逻辑

// 3.监听浏览器状态

// 4.拆分复杂组件。

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
/** #### TODO: https://www.cnblogs.com/qiaozhiming123/p/15919537.html  */
const Item = [
  { label: "Demo", key: "1", children: <Intro /> },
  { label: "UseCounter", key: "2", children: <UseCounter /> },
  { label: "UseAsync", key: "3", children: <UseAsync /> },
  { label: "UseScroll", key: "4", children: <UseScroll /> },
  { label: "BlogList", key: "5", children: <BlogList /> }
];
export default Item;
