import { Card } from "antd";
import React, { useState, useRef, useImperativeHandle, forwardRef, memo } from "react";

const UseRef = () => {
  const [name, setname] = useState("baby张");
  const refvalue = useRef<any>(null);
  const testRef = useRef<any>("test");

  function addRef() {
    refvalue.current.value = name;
    // refvalue.current = name  //这样写时，即使ref没有绑定在dom上，值依然会存在创建的ref上，并且可以使用它
    console.log("子组件的值：", testRef.current?.value);
    testRef.current?.onchange();
    testRef.current.focus();
  }
  return (
    <div>
      <Card title="UseRef" bordered={false} style={{ width: 500 }}>
        <input
          defaultValue={name}
          onChange={e => {
            setname(e.target.value);
          }}
        />
        <button onClick={addRef}>给下面插入名字</button>
        <p>给我个UseRef名字：</p>
        <input ref={refvalue} />
        <br />
        <span style={{ border: "1px solid red" }}>
          <Child ref={testRef} />
        </span>
      </Card>
    </div>
  );
};
const TestChild = (props: any, ref: any) => {
  const childRef = useRef<any>();
  const [value, setValue] = useState<number>(1);

  useImperativeHandle(ref, () => ({
    value: value,
    onchange: () => setValue(value + 1),
    focus: () => childRef.current?.focus()
  }));
  return <input type="text" ref={childRef} value={value} placeholder="useImperativeHandle" />;
};
const Child = memo(forwardRef(TestChild));

export default UseRef;
