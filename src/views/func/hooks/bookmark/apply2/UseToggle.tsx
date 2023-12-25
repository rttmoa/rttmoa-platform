import React, { useState } from "react";

// 状态的切换Hook
function useToggle(dafaultValue: any) {
  const [value, setValue] = useState(dafaultValue);
  function toggleValue(value: boolean) {
    setValue((currentValue: any) => {
      return typeof value === "boolean" ? value : !currentValue;
    });
  }
  return [value, toggleValue];
}

export default function ToggleComponent() {
  const [value, toggleValue] = useToggle(false); // 不可传入 undefined和null

  return (
    <div>
      <div style={{ fontWeight: "bold" }}>ToggleValue：{value.toString()}</div>
      <br />
      <button onClick={toggleValue}>Toggle</button>
      <button onClick={() => toggleValue(true)}>make Ture</button>
      <button onClick={() => toggleValue(false)}>make False</button>
    </div>
  );
}
