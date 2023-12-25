import React, { useState, useMemo, useCallback } from "react";
import { Card } from "antd";
//用来优化子组件的渲染问题，或者监听子组件状态变化来处理事件，这一点在以前是很难做到的，
//因为shouldComponentUpdate 里能监听到是否变化，但没法控制其他的外部方法，只能返回true和false,
//而componentDidUpdate只能在更新后执行，所以想在渲染之前做些事情就不好搞了。

const UseMemo = () => {
  const [name, setname] = useState("baby张");
  const [age, setage] = useState("18");
  return (
    <div>
      <Card title="UseMemo" bordered={false} style={{ width: 500 }}>
        <button
          onClick={() => {
            setname("baby张" + new Date().getTime());
          }}
        >
          改名字
        </button>
        <button
          onClick={() => {
            setage("年龄" + new Date().getTime());
          }}
        >
          改年龄
        </button>
        <p>
          名字： {name} <br />
          年龄： {age}
        </p>
        <Child age={age} name={name}>
          {name}的children
        </Child>
      </Card>
    </div>
  );
};
const Child = (props: any) => {
  const { name, age, children } = props;
  //在不用useMemo做处理的时候，只要父组件状态改变了，子组件都会渲染一次，用了useMemo可以监听某个状态name，当name变化时候执行useMemo里第一个函数
  console.log("--------------------分割----------------");
  console.log(age, name, children, "11111111");

  const namechange = useCallback(() => {
    return name + "change";
  }, [name]);

  const changedname = useMemo(() => {
    return namechange();
  }, [namechange]);

  return (
    <div style={{ border: "1px solid green" }}>
      <p>children：{children}</p>
      <p>name：{name}</p>
      <p>changed：{changedname}</p>
      <p>age：{age}</p>
    </div>
  );
};
export default UseMemo;
