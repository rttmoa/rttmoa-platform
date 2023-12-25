import { Card } from "antd";
import React, { useState, useContext, createContext } from "react";

let num = 1;
const ContextName = createContext<any>(null);
// 这里为了方便写博客，爷爷孙子组件都写在一个文件里，正常需要在爷爷组件和孙子组件挨个引入创建的 Context

const UseContext = () => {
  const [name, setname] = useState("baby张");
  return (
    <div>
      <Card title="UseContext" bordered={false} style={{ width: 500 }}>
        <button
          onClick={() => {
            setname("baby张" + num++);
          }}
        >
          改变名字
        </button>
        <br />
        <br />
        <ContextName.Provider value={{ name: name, age: 18 }}>
          {/** 需要用到变量的子组件一定要写在provider中间，才能实现共享 */}
          <Child />
        </ContextName.Provider>
      </Card>
    </div>
  );
};
const Child = () => {
  //创建一个儿子组件，里面引入孙子组件
  return (
    <div style={{ border: "1px solid black", padding: "5px 10px" }}>
      Child 儿子组件
      <br />
      <ChildChild />
    </div>
  );
};
const ChildChild = () => {
  //创建孙子组件，接受爷爷组件的状态，用useContext,获取到爷爷组件创建的ContextName的value值
  let childname = useContext(ContextName);
  return (
    <div style={{ border: "1px solid black", padding: "5px 10px" }}>
      ChildChild 孙子组件 <br />
      <p>
        姓名：{childname.name} --- 年龄：{childname.age}
      </p>
    </div>
  );
};
export default UseContext;
