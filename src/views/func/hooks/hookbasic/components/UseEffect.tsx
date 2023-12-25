import React, { useState, useEffect, useLayoutEffect } from "react";
import { Card } from "antd";

const UseEffect = () => {
  const [hook, setHook] = useState("react hooks");
  const [name] = useState("baby张");
  return (
    <header className="UseEffect-header">
      <Card title="UseEffect" bordered={false} style={{ width: 300 }}>
        <button onClick={() => setHook("我改变了react hook 的值" + new Date().getTime())}>改变hook</button>
        <br />
        <br />
        <Child hook={hook} name={name} />
      </Card>
    </header>
  );
};
const Child = (props: any) => {
  const [newhook, setNewHook] = useState(props.hook);
  useEffect(() => {
    console.log("frist componentMount 首次渲染");
  }, []);
  useEffect(() => {
    setNewHook(props.hook + "22222");
    console.log("useEffect 中");
    return () => {
      console.log("componentWillUnmount 卸载1");
    };
  }, [props.hook]);
  // TODO: useLayoutEffect 强制useeffect的执行为同步，并且先执行useLayoutEffect内部的函数
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    return () => {
      console.log("useLayoutEffect componentWillUnmount 卸载2");
    };
  }, [props.hook]);
  return (
    <div>
      <p>{props.name}</p>
      {newhook}
    </div>
  );
};
export default UseEffect;
